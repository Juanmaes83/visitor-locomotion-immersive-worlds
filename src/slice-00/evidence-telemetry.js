import { UPDATE_ORDER } from './contracts.js';

export class EvidenceTelemetry {
  constructor() {
    this.samples = [];
    this.errors = [];
    this.fixedSteps = 0;
    this.frameTimes = [];
  }

  recordFrame(dt, fixedSteps, systems) {
    this.fixedSteps += fixedSteps;
    this.frameTimes.push(dt * 1000);
    if (this.frameTimes.length > 180) this.frameTimes.shift();
    const sample = {
      frame: systems.camera.frame,
      fps: dt > 0 ? Math.round(1 / dt) : 0,
      frameMs: +(dt * 1000).toFixed(2),
      fixedSteps,
      cameraOwner: systems.camera.owner,
      cameraWrites: systems.camera.lastWrites,
      visitor: systems.visitorState.snapshot(),
      world: systems.worldState.snapshot(),
      proximity: systems.proximity.report(),
      actions: systems.actions.summary(),
      invariants: assertInvariants(systems)
    };
    this.samples.push(sample);
    if (this.samples.length > 120) this.samples.shift();
    return sample;
  }

  report(systems) {
    const avg = this.frameTimes.reduce((a, b) => a + b, 0) / Math.max(1, this.frameTimes.length);
    const latest = this.samples.at(-1) || null;
    return {
      mission: 'SLICE-00-ARCHITECTURE-HARNESS',
      updateOrder: UPDATE_ORDER,
      averageFps: avg > 0 ? Math.round(1000 / avg) : 0,
      averageFrameMs: +avg.toFixed(2),
      fixedStepCount: this.fixedSteps,
      errorCount: this.errors.length,
      latest,
      camera: systems.camera.report(),
      invariants: assertInvariants(systems),
      ownership: ownershipTable()
    };
  }
}

export function assertInvariants({ worldState, visitorState, camera, proximity, actions }) {
  const checks = [];
  const add = (id, pass, detail) => checks.push({ id, pass: !!pass, detail });
  try {
    worldState.assertNoCameraState();
    add('WORLDSTATE-NO-CAMERA', true, 'WorldState has no camera pose/fov keys.');
  } catch (error) {
    add('WORLDSTATE-NO-CAMERA', false, error.message);
  }
  add('ONE-CAMERA-WRITER', camera.violations.length === 0 && camera.lastWrites <= 1, `${camera.lastWrites} writes in latest frame; ${camera.violations.length} violations.`);
  add('VISITOR-PROJECTS-WORLDSTATE', visitorState.currentSpaceId === worldState.activeSpaceId && visitorState.focusedEntityId === worldState.focusedEntityId, 'VisitorState projection matches WorldState.');
  add('PROXIMITY-FROM-VISITOR', proximity.nearestHotspotId === visitorState.nearestHotspotId, `nearest=${proximity.nearestHotspotId}`);
  const nearest = visitorState.nearestHotspotId
    ? proximity.world.hotspots.find((hotspot) => hotspot.id === visitorState.nearestHotspotId)
    : null;
  add('SEMANTIC-ACTION-ARMED', visitorState.nearestHotspotId === null || Boolean(nearest?.action?.type), `armed=${nearest?.action?.type || 'none'}`);
  if (actions.summary().total > 0) {
    add('SEMANTIC-ACTION-DISPATCHED', true, `actions=${actions.summary().total}`);
  }
  return { ok: checks.every((c) => c.pass), checks };
}

export function ownershipTable() {
  return [
    ['visitor position', 'VisitorRuntime', 'Camera, Proximity, Renderer, Telemetry', 'VisitorRuntime', 'VisitorRuntime'],
    ['visitor velocity', 'VisitorRuntime', 'Telemetry, Diagnostics', 'VisitorRuntime', 'VisitorRuntime'],
    ['grounded', 'VisitorRuntime', 'Telemetry, Diagnostics', 'VisitorRuntime', 'VisitorRuntime'],
    ['locomotionMode', 'VisitorRuntime', 'Telemetry, Diagnostics', 'VisitorRuntime', 'VisitorRuntime'],
    ['camera transform', 'CameraAuthority', 'Renderer, Telemetry', 'active camera controller via token', 'CameraAuthority'],
    ['camera authority', 'CameraAuthority', 'Diagnostics, Telemetry', 'CameraAuthority.request/register', 'CameraAuthority'],
    ['activeSpaceId', 'WorldState', 'VisitorState, Proximity, Diagnostics', 'WorldState.setActiveSpace', 'WorldState'],
    ['focusedEntityId', 'WorldState', 'VisitorState, Diagnostics', 'ActionDispatch', 'WorldState'],
    ['activeRouteId', 'WorldState', 'VisitorState, Diagnostics', 'none in Slice 0', 'WorldState'],
    ['activeStepId', 'WorldState', 'VisitorState, Diagnostics', 'none in Slice 0', 'WorldState'],
    ['nearestHotspotId', 'ProximitySystem', 'VisitorState, Diagnostics, ActionDispatch', 'ProximitySystem', 'ProximitySystem']
  ].map(([mutableState, owner, readers, writers, sourceOfTruth]) => ({ mutableState, owner, readers, writers, sourceOfTruth }));
}
