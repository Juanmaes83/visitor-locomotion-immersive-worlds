import { HOTSPOT_STATE } from './contracts.js';

export class WorldState {
  constructor(world) {
    this.world = world;
    this.activeSpaceId = world.startSpaceId;
    this.focusedEntityId = null;
    this.activeRouteId = null;
    this.activeStepId = null;
    this.hotspotStates = new Map(world.hotspots.map((h) => [h.id, HOTSPOT_STATE.AVAILABLE]));
    this.revision = 0;
  }

  setActiveSpace(spaceId) {
    if (spaceId && spaceId !== this.activeSpaceId) {
      this.activeSpaceId = spaceId;
      this.revision += 1;
    }
  }

  setFocus(entityId) {
    if (entityId !== this.focusedEntityId) {
      this.focusedEntityId = entityId;
      this.revision += 1;
    }
  }

  setHotspotState(id, state) {
    if (this.hotspotStates.get(id) !== state) {
      this.hotspotStates.set(id, state);
      this.revision += 1;
    }
  }

  hotspotState(id) {
    return this.hotspotStates.get(id) || HOTSPOT_STATE.AVAILABLE;
  }

  assertNoCameraState() {
    for (const key of Object.keys(this)) {
      if (/camera|pose|fov/i.test(key)) throw new Error(`WorldState owns forbidden camera-like key: ${key}`);
    }
    return true;
  }

  snapshot() {
    return {
      activeSpaceId: this.activeSpaceId,
      focusedEntityId: this.focusedEntityId,
      activeRouteId: this.activeRouteId,
      activeStepId: this.activeStepId,
      revision: this.revision
    };
  }
}
