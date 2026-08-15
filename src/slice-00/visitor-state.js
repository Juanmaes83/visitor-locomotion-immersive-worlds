export class VisitorState {
  #projection;

  constructor(worldState) {
    this.position = { x: -3.8, y: 0, z: 0.8 };
    this.velocity = { x: 0, y: 0, z: 0 };
    this.yaw = Math.PI * 0.5;
    this.grounded = true;
    this.locomotionMode = 'walk';
    this.nearestHotspotId = null;
    this.#projection = {
      currentSpaceId: worldState.activeSpaceId,
      focusedEntityId: worldState.focusedEntityId,
      activeRouteId: worldState.activeRouteId,
      activeStepId: worldState.activeStepId
    };
  }

  projectFrom(worldState, nearestHotspotId) {
    this.#projection = {
      currentSpaceId: worldState.activeSpaceId,
      focusedEntityId: worldState.focusedEntityId,
      activeRouteId: worldState.activeRouteId,
      activeStepId: worldState.activeStepId
    };
    this.nearestHotspotId = nearestHotspotId;
  }

  get currentSpaceId() {
    return this.#projection.currentSpaceId;
  }

  get focusedEntityId() {
    return this.#projection.focusedEntityId;
  }

  get activeRouteId() {
    return this.#projection.activeRouteId;
  }

  get activeStepId() {
    return this.#projection.activeStepId;
  }

  snapshot() {
    return {
      position: { ...this.position },
      velocity: { ...this.velocity },
      yaw: this.yaw,
      grounded: this.grounded,
      locomotionMode: this.locomotionMode,
      currentSpaceId: this.currentSpaceId,
      focusedEntityId: this.focusedEntityId,
      activeRouteId: this.activeRouteId,
      activeStepId: this.activeStepId,
      nearestHotspotId: this.nearestHotspotId
    };
  }
}
