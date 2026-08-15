import { HOTSPOT_STATE } from './contracts.js';

export class ProximitySystem {
  constructor({ world, worldState }) {
    this.world = world;
    this.worldState = worldState;
    this.nearestHotspotId = null;
    this.candidateCount = 0;
  }

  update(visitorPosition) {
    let nearest = null;
    let nearestDistance = Infinity;
    this.candidateCount = 0;
    for (const hotspot of this.world.hotspots) {
      if (hotspot.spaceId !== this.worldState.activeSpaceId) continue;
      this.candidateCount += 1;
      const d = Math.hypot(visitorPosition.x - hotspot.x, visitorPosition.z - hotspot.z);
      const inside = d <= hotspot.radius;
      const current = this.worldState.hotspotState(hotspot.id);
      if (current !== HOTSPOT_STATE.ACTIVE && current !== HOTSPOT_STATE.VISITED) {
        this.worldState.setHotspotState(hotspot.id, inside ? HOTSPOT_STATE.NEAR : HOTSPOT_STATE.AVAILABLE);
      }
      if (inside && d < nearestDistance) {
        nearest = hotspot;
        nearestDistance = d;
      }
    }
    this.nearestHotspotId = nearest?.id || null;
    return nearest;
  }

  report() {
    return {
      nearestHotspotId: this.nearestHotspotId,
      candidates: this.candidateCount,
      states: Object.fromEntries(this.world.hotspots.map((h) => [h.id, this.worldState.hotspotState(h.id)]))
    };
  }
}
