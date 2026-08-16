import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const ROOT = process.cwd();
const OUT = path.join(ROOT, 'docs/evidence/SLICE-01-PRESENCE');
const PORT = Number(process.env.SLICE00_PORT || 4173);
const BASE = `http://127.0.0.1:${PORT}`;

async function loadPlaywright() {
  try {
    return { module: await import('playwright'), source: 'project-or-node-resolution' };
  } catch (error) {
    if (!process.env.PLAYWRIGHT_MODULE_PATH) throw error;
    const stats = await fs.stat(process.env.PLAYWRIGHT_MODULE_PATH);
    const modulePath = stats.isDirectory() ? path.join(process.env.PLAYWRIGHT_MODULE_PATH, 'index.mjs') : process.env.PLAYWRIGHT_MODULE_PATH;
    return { module: await import(pathToFileURL(modulePath).href), source: modulePath };
  }
}

async function main() {
  await fs.mkdir(path.join(OUT, 'screenshots'), { recursive: true });
  await fs.mkdir(path.join(OUT, 'diagnostics'), { recursive: true });
  await fs.mkdir(path.join(OUT, 'video'), { recursive: true });
  let loaded;
  try {
    loaded = await loadPlaywright();
  } catch (error) {
    await fs.writeFile(path.join(OUT, 'diagnostics/playwright-status.json'), `${JSON.stringify({
      status: 'NOT AVAILABLE',
      installRequired: true,
      projectDependency: true,
      reason: error.message
    }, null, 2)}\n`);
    console.log('PLAYWRIGHT AUTOMATION = BLOCKED');
    return;
  }

  const { chromium } = loaded.module;
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, recordVideo: { dir: path.join(OUT, 'video'), size: { width: 1440, height: 900 } } });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  page.on('pageerror', (err) => consoleErrors.push(err.message));

  await page.goto(BASE, { waitUntil: 'load' });
  await page.waitForFunction(() => document.documentElement.dataset.slice01Ready === 'true');
  await page.waitForTimeout(350);
  await page.screenshot({ path: path.join(OUT, 'screenshots/01-runtime-3d.png') });

  await page.keyboard.down('W');
  await page.waitForTimeout(2600);
  await page.screenshot({ path: path.join(OUT, 'screenshots/02-locomotion-grounding.png') });
  await page.waitForTimeout(2200);
  await page.keyboard.up('W');
  await page.screenshot({ path: path.join(OUT, 'screenshots/03-foot-contact-surface.png') });
  await page.keyboard.press('KeyC');
  await page.waitForTimeout(5200);
  await page.screenshot({ path: path.join(OUT, 'screenshots/04-collision-camera.png') });
  const report = await page.evaluate(() => window.__SLICE01.report());
  const playwrightReport = { tool: 'Playwright', source: loaded.source, consoleErrors, report };
  await fs.writeFile(path.join(OUT, 'diagnostics/runtime-report-playwright.json'), `${JSON.stringify(playwrightReport, null, 2)}\n`);
  let cdp = null;
  try {
    const aggregate = JSON.parse(await fs.readFile(path.join(OUT, 'diagnostics/runtime-report.json'), 'utf8'));
    cdp = aggregate.cdp || null;
  } catch {}
  await fs.writeFile(path.join(OUT, 'diagnostics/runtime-report.json'), `${JSON.stringify({ cdp, playwright: playwrightReport }, null, 2)}\n`);
  await fs.writeFile(path.join(OUT, 'diagnostics/invariant-report.json'), `${JSON.stringify(report.latest.invariants, null, 2)}\n`);
  await fs.writeFile(path.join(OUT, 'diagnostics/playwright-status.json'), `${JSON.stringify({
    status: report.latest.invariants.ok && consoleErrors.length === 0 ? 'PASS' : 'FAIL',
    source: loaded.source,
    consoleErrors,
    averageFps: report.averageFps,
    invariantsOk: report.latest.invariants.ok
  }, null, 2)}\n`);

  const video = page.video();
  await page.close();
  await context.close();
  if (video) await fs.copyFile(await video.path(), path.join(OUT, 'video/slice-01-playwright-presence.webm'));
  await browser.close();
  console.log(JSON.stringify({ ok: report.latest.invariants.ok && consoleErrors.length === 0, averageFps: report.averageFps, consoleErrors }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
