export class PresenceVisitorState {
  #projection = {
    currentSpaceId: null,
    focusedEntityId: null,
    activeRouteId: null,
    activeStepId: null
  };

  constructor(worldState, spawn) {
    this.worldState = worldState;
    this.position = { x: spawn.x, y: spawn.y, z: spawn.z };
    this.velocity = { x: 0, y: 0, z: 0 };
    this.yaw = spawn.yaw;
    this.bodyYaw = spawn.yaw;
    this.grounded = true;
    this.locomotionMode = 'idle';
    this.nearestHotspotId = null;
    this.surface = { surfaceId: 'floor.marble.a', surfaceType: 'marble', height: 0, normal: { x: 0, y: 1, z: 0 } };
    this.footContacts = [];
    this.collisionHit = false;
    this.collisionObserved = false;
    this.collisionHitCount = 0;
    this.maxCollisionCorrection = 0;
    this.speed = 0;
    this.projectFrom(worldState, null);
  }

  get currentSpaceId() { return this.#projection.currentSpaceId; }
  get focusedEntityId() { return this.#projection.focusedEntityId; }
  get activeRouteId() { return this.#projection.activeRouteId; }
  get activeStepId() { return this.#projection.activeStepId; }

  projectFrom(worldState, nearestHotspotId) {
    this.#projection = {
      currentSpaceId: worldState.activeSpaceId,
      focusedEntityId: worldState.focusedEntityId,
      activeRouteId: worldState.activeRouteId,
      activeStepId: worldState.activeStepId
    };
    this.nearestHotspotId = nearestHotspotId;
  }

  snapshot() {
    return {
      position: { ...this.position },
      velocity: { ...this.velocity },
      yaw: this.yaw,
      bodyYaw: this.bodyYaw,
      grounded: this.grounded,
      locomotionMode: this.locomotionMode,
      currentSpaceId: this.currentSpaceId,
      focusedEntityId: this.focusedEntityId,
      activeRouteId: this.activeRouteId,
      activeStepId: this.activeStepId,
      nearestHotspotId: this.nearestHotspotId,
      surface: this.surface,
      footContacts: this.footContacts.slice(-8),
      collisionHit: this.collisionHit,
      collisionObserved: this.collisionObserved,
      collisionHitCount: this.collisionHitCount,
      maxCollisionCorrection: this.maxCollisionCorrection,
      speed: this.speed
    };
  }
}
