import { CameraAuthority } from '../src/slice-00/camera-authority.js';
import { Slice00Runtime } from '../src/slice-00/runtime-loop.js';
import { CAMERA_AUTHORITY } from '../src/slice-00/contracts.js';

const failures = [];
const check = (id, pass, detail = '') => {
  const mark = pass ? 'ok' : 'FAIL';
  console.log(`${mark.padEnd(5)} ${id}${detail ? ` - ${detail}` : ''}`);
  if (!pass) failures.push({ id, detail });
};

const runtime = new Slice00Runtime({});

for (let i = 0; i < 260; i += 1) {
  runtime.step(1 / 60, { moveX: 0, moveY: 1, lookX: 0, lookY: 0, activate: false, cancel: false });
}
check('ACTIVE-SPACE-CHANGES', runtime.worldState.activeSpaceId === 'gallery-b', runtime.worldState.activeSpaceId);
check('VISITOR-PROJECTS-SPACE', runtime.visitorState.currentSpaceId === runtime.worldState.activeSpaceId);

runtime.visitorState.position.x = 8.35;
runtime.visitorState.position.z = -1.75;
runtime.step(1 / 60, { moveX: 0, moveY: 0, lookX: 0, lookY: 0, activate: false, cancel: false });
check('PROXIMITY-RESOLVES', runtime.visitorState.nearestHotspotId === 'hotspot.artwork.b-01', runtime.visitorState.nearestHotspotId);

runtime.step(1 / 60, { moveX: 0, moveY: 0, lookX: 0, lookY: 0, activate: true, cancel: false });
check('ACTION-DISPATCHES', runtime.actions.summary().total === 1, JSON.stringify(runtime.actions.summary().lastAction));
check('FOCUS-REQUEST-STATE', runtime.worldState.focusedEntityId === 'artwork.b-01', runtime.worldState.focusedEntityId);

runtime.step(1 / 60, { moveX: 0, moveY: 0, lookX: 0, lookY: 0, activate: false, cancel: true });
check('FOCUS-RELEASES', runtime.worldState.focusedEntityId === null, String(runtime.worldState.focusedEntityId));

check('WORLDSTATE-NO-CAMERA', runtime.worldState.assertNoCameraState() === true);
check('CAMERA-OWNER', runtime.camera.owner === CAMERA_AUTHORITY.EXPLORE_THIRD_PERSON, runtime.camera.owner);
check('CAMERA-NO-VIOLATIONS', runtime.camera.violations.length === 0, String(runtime.camera.violations.length));
check('INVARIANTS-PASS', runtime.report().invariants.ok === true);

const badAuthority = new CameraAuthority({
  position: { x: 0, y: 0, z: 0 },
  target: { x: 0, y: 0, z: 1 },
  yaw: 0,
  pitch: 0,
  fov: 50
});
badAuthority.register(CAMERA_AUTHORITY.EXPLORE_THIRD_PERSON, {
  update(dt, commit, pose) {
    commit(pose);
    commit(pose);
  }
});
let caughtDoubleWrite = false;
try {
  badAuthority.update(1 / 60);
} catch (error) {
  caughtDoubleWrite = /two camera writes/.test(error.message);
}
check('DOUBLE-CAMERA-WRITE-DETECTED', caughtDoubleWrite);

if (failures.length) {
  console.error(JSON.stringify({ ok: false, failures }, null, 2));
  process.exit(1);
}

console.log(JSON.stringify({ ok: true, report: runtime.report() }, null, 2));
