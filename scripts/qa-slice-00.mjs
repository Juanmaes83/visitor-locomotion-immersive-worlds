import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs/evidence/SLICE-00-ARCHITECTURE-HARNESS');
const PORT = Number(process.env.SLICE00_PORT || 4173);
const BASE = `http://127.0.0.1:${PORT}`;

async function loadPlaywright() {
  try {
    return { module: await import('playwright'), source: 'project-or-node-resolution' };
  } catch (error) {
    if (!process.env.PLAYWRIGHT_MODULE_PATH) {
      throw error;
    }

    const stats = await fs.stat(process.env.PLAYWRIGHT_MODULE_PATH);
    const modulePath = stats.isDirectory()
      ? path.join(process.env.PLAYWRIGHT_MODULE_PATH, 'index.mjs')
      : process.env.PLAYWRIGHT_MODULE_PATH;

    return { module: await import(pathToFileURL(modulePath).href), source: modulePath };
  }
}

async function main() {
  let chromium;
  let playwrightSource = null;
  try {
    const loaded = await loadPlaywright();
    ({ chromium } = loaded.module);
    playwrightSource = loaded.source;
  } catch (error) {
    await fs.mkdir(path.join(OUT, 'diagnostics'), { recursive: true });
    await fs.writeFile(
      path.join(OUT, 'diagnostics', 'playwright-status.json'),
      `${JSON.stringify({
        status: 'NOT AVAILABLE',
        installRequired: true,
        projectDependency: false,
        temporaryLocalTool: false,
        reason: error.message
      }, null, 2)}\n`
    );
    console.log('PLAYWRIGHT AUTOMATION = BLOCKED / PENDING TOOL APPROVAL');
    return;
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: path.join(OUT, 'video'), size: { width: 1440, height: 900 } } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await fs.mkdir(path.join(OUT, 'screenshots'), { recursive: true });
  await fs.mkdir(path.join(OUT, 'diagnostics'), { recursive: true });
  await fs.mkdir(path.join(OUT, 'video'), { recursive: true });
  await page.goto(BASE, { waitUntil: 'load' });
  await page.waitForFunction(() => document.documentElement.dataset.slice00Ready === 'true');
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(OUT, 'screenshots', '01-runtime.png') });

  await page.keyboard.down('W');
  await page.waitForTimeout(900);
  await page.screenshot({ path: path.join(OUT, 'screenshots', '02-visitor-state.png') });
  await page.screenshot({ path: path.join(OUT, 'screenshots', '03-camera-authority.png') });
  await page.waitForTimeout(2600);
  await page.keyboard.up('W');
  await page.screenshot({ path: path.join(OUT, 'screenshots', '04-space-transition.png') });

  await page.evaluate(() => {
    const rt = window.__SLICE00.runtime;
    rt.visitorState.position.x = 8.35;
    rt.visitorState.position.z = -1.75;
    rt.worldState.setActiveSpace('gallery-b');
    rt.step(1 / 60, { moveX: 0, moveY: 0, lookX: 0, lookY: 0, activate: false, cancel: false });
  });
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(OUT, 'screenshots', '05-proximity.png') });
  await page.keyboard.press('KeyE');
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(OUT, 'screenshots', '06-action-dispatch.png') });
  await page.keyboard.press('Escape');
  await page.waitForTimeout(250);
  await page.screenshot({ path: path.join(OUT, 'screenshots', '07-invariants.png') });

  const report = await page.evaluate(() => window.__SLICE00.report());
  await fs.writeFile(path.join(OUT, 'diagnostics', 'runtime-report.json'), `${JSON.stringify({ consoleErrors, report }, null, 2)}\n`);
  await fs.writeFile(path.join(OUT, 'diagnostics', 'invariant-report.json'), `${JSON.stringify(report.invariants, null, 2)}\n`);
  await fs.writeFile(
    path.join(OUT, 'diagnostics', 'playwright-status.json'),
    `${JSON.stringify({
      status: 'PASS',
      installRequired: false,
      projectDependency: false,
      temporaryLocalTool: true,
      source: playwrightSource,
      consoleErrors,
      averageFps: report.averageFps,
      invariantsOk: report.invariants.ok
    }, null, 2)}\n`
  );

  const mobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobile.goto(BASE, { waitUntil: 'load' });
  await mobile.waitForFunction(() => document.documentElement.dataset.slice00Ready === 'true');
  await mobile.waitForTimeout(250);
  await mobile.screenshot({ path: path.join(OUT, 'screenshots', '08-mobile-viewport.png') });
  await mobile.close();

  const recordedVideo = page.video();
  await page.close();
  await context.close();
  if (recordedVideo) {
    const recordedVideoPath = await recordedVideo.path();
    await fs.copyFile(recordedVideoPath, path.join(OUT, 'video', 'slice-00-playwright-demo.webm'));
  }
  await browser.close();
  console.log(JSON.stringify({ ok: report.invariants.ok && consoleErrors.length === 0, consoleErrors, averageFps: report.averageFps }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
