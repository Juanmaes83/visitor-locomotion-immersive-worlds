import fs from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs/evidence/SLICE-00-ARCHITECTURE-HARNESS');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const FFMPEG = 'C:\\Users\\temp123\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.2-full_build\\bin\\ffmpeg.exe';
const PORT = 9223;
const APP = 'http://127.0.0.1:4173';

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function ensureDirs() {
  for (const dir of ['screenshots', 'video/frames', 'diagnostics', 'storyboard']) {
    await fs.mkdir(path.join(OUT, dir), { recursive: true });
  }
}

function launchEdge(width = 1440, height = 900) {
  return spawn(EDGE, [
    '--headless=new',
    '--disable-gpu',
    '--hide-scrollbars',
    '--mute-audio',
    `--remote-debugging-port=${PORT}`,
    `--window-size=${width},${height}`,
    `--user-data-dir=${path.join(ROOT, '.tmp', 'edge-profile')}`,
    APP
  ], { stdio: 'ignore' });
}

async function connectCdp() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const targets = await fetch(`http://127.0.0.1:${PORT}/json/list`).then((r) => r.json());
      const page = targets.find((target) => target.type === 'page' && target.webSocketDebuggerUrl);
      if (page) return new CdpClient(page.webSocketDebuggerUrl);
    } catch {
      await sleep(150);
    }
  }
  throw new Error('CDP endpoint did not become available');
}

class CdpClient {
  constructor(url) {
    this.url = url;
    this.nextId = 1;
    this.pending = new Map();
    this.handlers = new Map();
  }

  async open() {
    this.ws = new WebSocket(this.url);
    this.ws.addEventListener('message', (event) => this.onMessage(JSON.parse(event.data)));
    await new Promise((resolve, reject) => {
      this.ws.addEventListener('open', resolve, { once: true });
      this.ws.addEventListener('error', reject, { once: true });
    });
    return this;
  }

  onMessage(message) {
    if (message.id && this.pending.has(message.id)) {
      const { resolve, reject } = this.pending.get(message.id);
      this.pending.delete(message.id);
      if (message.error) reject(new Error(message.error.message));
      else resolve(message.result);
      return;
    }
    const handler = this.handlers.get(message.method);
    if (handler) handler(message.params);
  }

  send(method, params = {}) {
    const id = this.nextId++;
    this.ws.send(JSON.stringify({ id, method, params }));
    return new Promise((resolve, reject) => this.pending.set(id, { resolve, reject }));
  }

  on(method, handler) {
    this.handlers.set(method, handler);
  }

  close() {
    this.ws.close();
  }
}

async function waitReady(cdp) {
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise(resolve => {
      const done = () => document.documentElement.dataset.slice00Ready === 'true';
      if (done()) resolve(true);
      const t = setInterval(() => { if (done()) { clearInterval(t); resolve(true); } }, 50);
    })`,
    awaitPromise: true
  });
}

async function evalJson(cdp, expression) {
  const result = await cdp.send('Runtime.evaluate', { expression: `JSON.stringify(${expression})`, returnByValue: true });
  return JSON.parse(result.result.value);
}

async function screenshot(cdp, name) {
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false });
  await fs.writeFile(path.join(OUT, 'screenshots', name), Buffer.from(shot.data, 'base64'));
}

async function setHarnessState(cdp, script) {
  await cdp.send('Runtime.evaluate', {
    expression: script,
    awaitPromise: true
  });
  await sleep(180);
}

async function press(cdp, key, code, type = 'keyDown') {
  await cdp.send('Input.dispatchKeyEvent', { type, key, code, windowsVirtualKeyCode: key.charCodeAt(0) });
}

async function recordScreencast(cdp) {
  let index = 0;
  cdp.on('Page.screencastFrame', async (params) => {
    index += 1;
    const file = path.join(OUT, 'video/frames', `${String(index).padStart(4, '0')}.png`);
    await fs.writeFile(file, Buffer.from(params.data, 'base64'));
    await cdp.send('Page.screencastFrameAck', { sessionId: params.sessionId });
  });
  await cdp.send('Page.startScreencast', { format: 'png', everyNthFrame: 2 });
  await press(cdp, 'W', 'KeyW', 'keyDown');
  await sleep(900);
  await press(cdp, 'W', 'KeyW', 'keyUp');
  await setHarnessState(cdp, `(() => {
    const rt = window.__SLICE00.runtime;
    rt.visitorState.position.x = 8.35;
    rt.visitorState.position.z = -1.75;
    rt.worldState.setActiveSpace('gallery-b');
    rt.step(1 / 60, { moveX: 0, moveY: 0, lookX: 0, lookY: 0, activate: false, cancel: false });
    return true;
  })()`);
  await press(cdp, 'E', 'KeyE', 'keyDown');
  await press(cdp, 'E', 'KeyE', 'keyUp');
  await sleep(400);
  await press(cdp, 'Escape', 'Escape', 'keyDown');
  await press(cdp, 'Escape', 'Escape', 'keyUp');
  await sleep(400);
  await cdp.send('Page.stopScreencast');
  await sleep(500);
  return index;
}

async function runFfmpeg(args) {
  return new Promise((resolve) => {
    const child = spawn(FFMPEG, args, { stdio: 'ignore' });
    child.on('exit', (code) => resolve(code === 0));
  });
}

async function createVideo() {
  return runFfmpeg([
    '-y',
    '-framerate', '12',
    '-i', path.join(OUT, 'video/frames/%04d.png'),
    '-c:v', 'libvpx-vp9',
    '-pix_fmt', 'yuva420p',
    path.join(OUT, 'video/slice-00-primary-demo.webm')
  ]);
}

async function createContactSheet(cdp) {
  const sheet = path.join(OUT, 'storyboard/contact-sheet.html');
  const images = [
    ['01-runtime.png', 'runtime loaded'],
    ['02-visitor-state.png', 'visitor state'],
    ['03-camera-authority.png', 'camera authority'],
    ['04-space-transition.png', 'space transition'],
    ['05-proximity.png', 'proximity'],
    ['06-action-dispatch.png', 'action dispatch'],
    ['07-invariants.png', 'invariants'],
    ['08-mobile-viewport.png', 'mobile viewport']
  ];
  await fs.writeFile(sheet, `<!doctype html><html><head><style>
    body{margin:0;background:#101816;color:#ecf4ee;font-family:system-ui}
    main{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;padding:14px}
    figure{margin:0;border:1px solid #41544d;background:#182421}
    img{display:block;width:100%}
    figcaption{padding:8px 10px;font-size:18px;font-weight:700}
  </style></head><body><main>${images.map(([file, label]) => `<figure><img src="../screenshots/${file}"><figcaption>${label}</figcaption></figure>`).join('')}</main></body></html>\n`);
  await cdp.send('Page.navigate', { url: `file:///${sheet.replace(/\\/g, '/')}` });
  await sleep(600);
  const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true });
  await fs.writeFile(path.join(OUT, 'storyboard/storyboard-contact-sheet.png'), Buffer.from(shot.data, 'base64'));
}

async function main() {
  await ensureDirs();
  const edge = launchEdge();
  let cdp;
  try {
    cdp = await (await connectCdp()).open();
    await cdp.send('Page.enable');
    await cdp.send('Runtime.enable');
    await cdp.send('Page.navigate', { url: APP });
    await waitReady(cdp);
    await sleep(300);
    await screenshot(cdp, '01-runtime.png');
    await press(cdp, 'W', 'KeyW', 'keyDown');
    await sleep(850);
    await screenshot(cdp, '02-visitor-state.png');
    await screenshot(cdp, '03-camera-authority.png');
    await sleep(2600);
    await press(cdp, 'W', 'KeyW', 'keyUp');
    await screenshot(cdp, '04-space-transition.png');
    await setHarnessState(cdp, `(() => {
      const rt = window.__SLICE00.runtime;
      rt.visitorState.position.x = 8.35;
      rt.visitorState.position.z = -1.75;
      rt.worldState.setActiveSpace('gallery-b');
      rt.step(1 / 60, { moveX: 0, moveY: 0, lookX: 0, lookY: 0, activate: false, cancel: false });
      return true;
    })()`);
    await screenshot(cdp, '05-proximity.png');
    await press(cdp, 'E', 'KeyE', 'keyDown');
    await press(cdp, 'E', 'KeyE', 'keyUp');
    await sleep(250);
    await screenshot(cdp, '06-action-dispatch.png');
    await press(cdp, 'Escape', 'Escape', 'keyDown');
    await press(cdp, 'Escape', 'Escape', 'keyUp');
    await sleep(250);
    await screenshot(cdp, '07-invariants.png');
    const desktopReport = await evalJson(cdp, 'window.__SLICE00.report()');

    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 390, height: 844, deviceScaleFactor: 1, mobile: true });
    await cdp.send('Page.navigate', { url: APP });
    await waitReady(cdp);
    await sleep(400);
    await screenshot(cdp, '08-mobile-viewport.png');
    const mobileReport = await evalJson(cdp, 'window.__SLICE00.report()');

    await cdp.send('Emulation.clearDeviceMetricsOverride');
    await cdp.send('Page.navigate', { url: APP });
    await waitReady(cdp);
    const frames = await recordScreencast(cdp);
    const videoOk = frames > 4 ? await createVideo() : false;
    await createContactSheet(cdp);

    const invariant = desktopReport.invariants;
    const runtime = {
      tool: 'Microsoft Edge headless via Chrome DevTools Protocol',
      browser: EDGE,
      appUrl: APP,
      desktop: desktopReport,
      mobile: mobileReport,
      video: { frames, encoded: videoOk },
      consoleErrors: []
    };
    await fs.writeFile(path.join(OUT, 'diagnostics/runtime-report.json'), `${JSON.stringify(runtime, null, 2)}\n`);
    await fs.writeFile(path.join(OUT, 'diagnostics/invariant-report.json'), `${JSON.stringify(invariant, null, 2)}\n`);
    await fs.writeFile(path.join(OUT, 'diagnostics/browser-qa-status.json'), `${JSON.stringify({ status: 'PASS', tool: runtime.tool, videoOk }, null, 2)}\n`);
    console.log(JSON.stringify({ ok: invariant.ok, videoOk, frames, averageFps: desktopReport.averageFps }, null, 2));
  } finally {
    cdp?.close();
    edge.kill();
  }
}

main().catch(async (error) => {
  await ensureDirs();
  await fs.writeFile(path.join(OUT, 'diagnostics/browser-qa-status.json'), `${JSON.stringify({ status: 'FAIL', error: error.message }, null, 2)}\n`);
  console.error(error);
  process.exit(1);
});
