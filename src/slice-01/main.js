import { Slice01Runtime } from './presence-runtime-loop.js';
import { ThreePresenceRenderer } from './three-presence-renderer.js';

const canvas = document.getElementById('slice-canvas');
const diagnostics = document.getElementById('diagnostics-panel');
const invariants = document.getElementById('invariants-panel');
const runtime = new Slice01Runtime({ canvas });
runtime.renderer = new ThreePresenceRenderer({
  canvas,
  world: runtime.world,
  visitorState: runtime.visitorState,
  cameraAuthority: runtime.camera
});
runtime.start();

window.__SLICE01 = {
  runtime,
  report: () => runtime.report(),
  startCollisionRoute: () => runtime.startCollisionRoute(),
  reset: () => runtime.reset()
};

window.addEventListener('keydown', (event) => {
  if (event.code === 'KeyC') runtime.startCollisionRoute();
  if (event.code === 'KeyR') runtime.reset();
});

function renderDiagnostics() {
  const report = runtime.report();
  const latest = report.latest;
  if (latest) {
    const v = latest.visitor;
    const rows = [
      ['fps', report.averageFps],
      ['frame ms', report.averageFrameMs],
      ['mode', v.locomotionMode],
      ['grounded', String(v.grounded)],
      ['space', v.currentSpaceId],
      ['pos', `${v.position.x.toFixed(2)}, ${v.position.y.toFixed(2)}, ${v.position.z.toFixed(2)}`],
      ['vel', `${v.velocity.x.toFixed(2)}, ${v.velocity.z.toFixed(2)}`],
      ['yaw / body', `${v.yaw.toFixed(2)} / ${v.bodyYaw.toFixed(2)}`],
      ['surface', `${v.surface.surfaceType}:${v.surface.surfaceId}`],
      ['collision', `${v.collisionObserved ? 'observed' : 'none'} (${v.collisionHitCount})`],
      ['foot contacts', String(v.footContacts.length)],
      ['last foot', latest.lastFootContact ? `${latest.lastFootContact.foot} ${latest.lastFootContact.surfaceType}` : 'none'],
      ['camera owner', latest.camera.owner],
      ['camera writes', latest.camera.writesThisFrame]
    ];
    diagnostics.innerHTML = rows.map(([key, value]) => `<dt>${key}</dt><dd>${value}</dd>`).join('');
    invariants.innerHTML = latest.invariants.checks.map((check) => (
      `<div class="check ${check.pass ? '' : 'fail'}">${check.pass ? 'PASS' : 'FAIL'} ${check.id}</div>`
    )).join('');
  }
  requestAnimationFrame(renderDiagnostics);
}

document.documentElement.dataset.slice01Ready = 'true';
renderDiagnostics();
