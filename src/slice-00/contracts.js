export const CAMERA_AUTHORITY = Object.freeze({
  EXPLORE_THIRD_PERSON: 'EXPLORE_THIRD_PERSON'
});

export const ACTION = Object.freeze({
  FOCUS_ENTITY: 'FOCUS_ENTITY',
  RELEASE_FOCUS: 'RELEASE_FOCUS'
});

export const HOTSPOT_STATE = Object.freeze({
  AVAILABLE: 'AVAILABLE',
  NEAR: 'NEAR',
  ACTIVE: 'ACTIVE',
  VISITED: 'VISITED'
});

export const UPDATE_ORDER = Object.freeze([
  'input.beginFrame',
  'runtime.fixedUpdate',
  'worldState.update',
  'visitorRuntime.update',
  'proximity.update',
  'cameraAuthority.update',
  'telemetry.sample',
  'renderer.render',
  'input.endFrame'
]);
