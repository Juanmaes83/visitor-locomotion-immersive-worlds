import { HarnessRenderer } from './renderer.js';
import { Slice00Runtime } from './runtime-loop.js';

const canvas = document.getElementById('slice-canvas');
const renderer = new HarnessRenderer({
  canvas,
  diagnosticsPanel: document.getElementById('diagnostics-panel'),
  invariantsPanel: document.getElementById('invariants-panel'),
  world: null
});

const runtime = new Slice00Runtime({ canvas, renderer, autoStart: false });
renderer.world = runtime.world;

function resize() {
  renderer.resize();
  renderer.render(runtime.report());
}

window.addEventListener('resize', resize);
resize();
runtime.start();

window.__SLICE00 = {
  runtime,
  report: () => runtime.report(),
  step: (dt, intents) => runtime.step(dt, intents),
  injectCameraDoubleWriteForTest: () => runtime.injectCameraDoubleWriteForTest()
};

document.documentElement.dataset.slice00Ready = 'true';
