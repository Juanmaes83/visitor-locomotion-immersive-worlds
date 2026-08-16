import { Slice01Runtime } from '../src/slice-01/presence-runtime-loop.js';

function assert(condition, id, detail = '') {
  if (!condition) {
    console.error(`fail  ${id}${detail ? ` - ${detail}` : ''}`);
    process.exitCode = 1;
    throw new Error(id);
  }
  console.log(`ok    ${id}${detail ? ` - ${detail}` : ''}`);
}

function step(runtime, seconds, intent) {
  const frames = Math.round(seconds * 60);
  let report = null;
  for (let i = 0; i < frames; i += 1) {
    report = runtime.step(1 / 60, intent);
  }
  return report;
}

const runtime = new Slice01Runtime({ autoStart: false, renderer: { ready: true, render() {} } });

let report = step(runtime, 0.05, { moveX: 0, moveY: 1, lookX: 0, lookY: 0, activate: false, cancel: false });
const earlySpeed = report.visitor.speed;
assert(earlySpeed > 0.05 && earlySpeed < 1.4, 'ACCELERATION-RAMP', `speed=${earlySpeed.toFixed(2)}`);

report = step(runtime, 0.45, { moveX: 0, moveY: 1, lookX: 0, lookY: 0, activate: false, cancel: false });
const beforeBrake = report.visitor.speed;
report = step(runtime, 0.55, { moveX: 0, moveY: 0, lookX: 0, lookY: 0, activate: false, cancel: false });
assert(report.visitor.speed < beforeBrake * 0.45, 'DECELERATION-RAMP', `${beforeBrake.toFixed(2)} -> ${report.visitor.speed.toFixed(2)}`);

report = step(runtime, 3.4, { moveX: 0, moveY: 1, lookX: 0, lookY: 0, activate: false, cancel: false });
assert(report.visitor.position.x > -2.2, 'LOCOMOTION-3D-MOVES', `x=${report.visitor.position.x.toFixed(2)}`);
assert(report.visitor.grounded === true, 'GROUNDING', report.visitor.surface.surfaceId);
assert(report.visitor.position.y >= 0, 'SURFACE-HEIGHT-VALID', `y=${report.visitor.position.y.toFixed(2)}`);

report = step(runtime, 1.8, { moveX: 0, moveY: 1, lookX: 0, lookY: 0, activate: false, cancel: false });
assert(report.visitor.currentSpaceId === 'gallery-b' || report.visitor.currentSpaceId === 'doorway', 'SPACE-PROJECTION-FROM-WORLDSTATE', report.visitor.currentSpaceId);
assert(report.visitor.footContacts.some((event) => event.foot === 'left'), 'FOOT-CONTACT-LEFT');
assert(report.visitor.footContacts.some((event) => event.foot === 'right'), 'FOOT-CONTACT-RIGHT');
assert(report.visitor.footContacts.every((event) => event.surfaceId && event.surfaceType), 'FOOT-CONTACT-SURFACE-PROBE');

runtime.visitorState.position.x = 3.45;
runtime.visitorState.position.z = -1.4;
runtime.visitorState.yaw = 0;
report = step(runtime, 1.1, { moveX: 0, moveY: 1, lookX: 0, lookY: 0, activate: false, cancel: false });
assert(report.visitor.collisionHit === true || runtime.presence.lastCollisionHit === true, 'CHARACTER-COLLISION', 'plinth push-out observed');
assert(report.visitor.collisionObserved === true && report.visitor.collisionHitCount > 0, 'COLLISION-OBSERVED-METRIC', `hits=${report.visitor.collisionHitCount}`);
assert(Number.isFinite(report.visitor.bodyYaw) && Math.abs(report.visitor.bodyYaw - report.visitor.yaw) < Math.PI, 'BODY-ORIENTATION-RESPONSE');
assert(report.camera.owner === 'PRESENCE_THIRD_PERSON' && report.camera.violations === 0 && report.camera.writesThisFrame === 1, 'CAMERA-AUTHORITY-FOLLOW');
assert(report.invariants.ok, 'PRESENCE-INVARIANTS-PASS');

console.log(JSON.stringify({ ok: true, report: runtime.report() }, null, 2));
