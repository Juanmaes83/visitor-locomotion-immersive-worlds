import { ACTION } from './contracts.js';

export const SANDBOX_WORLD = Object.freeze({
  id: 'slice-00-gallery-world',
  startSpaceId: 'gallery-a',
  spaces: [
    { id: 'gallery-a', label: 'Gallery A', bounds: { minX: -6, maxX: 2, minZ: -4, maxZ: 4 } },
    { id: 'gallery-b', label: 'Gallery B / Bay', bounds: { minX: 4, maxX: 10, minZ: -3.5, maxZ: 3.5 } },
    { id: 'doorway', label: 'Doorway', bounds: { minX: 2, maxX: 4, minZ: -1.05, maxZ: 1.05 } }
  ],
  walls: [
    { x: -6, z: 0, w: 0.2, h: 8 },
    { x: 10, z: 0, w: 0.2, h: 7 },
    { x: -2, z: -4, w: 8, h: 0.2 },
    { x: -2, z: 4, w: 8, h: 0.2 },
    { x: 7, z: -3.5, w: 6, h: 0.2 },
    { x: 7, z: 3.5, w: 6, h: 0.2 },
    { x: 3, z: -1.75, w: 2, h: 0.22 },
    { x: 3, z: 1.75, w: 2, h: 0.22 }
  ],
  obstacles: [
    { id: 'sculpture.plinth-01', label: 'Sculpture placeholder', x: 5.5, z: 1.2, radius: 0.65 }
  ],
  entities: [
    { id: 'artwork.a-01', label: 'Artwork A-01', spaceId: 'gallery-a', x: -4.7, z: -2.9 },
    { id: 'artwork.a-02', label: 'Artwork A-02', spaceId: 'gallery-a', x: 0.8, z: 3.0 },
    { id: 'artwork.b-01', label: 'Artwork B-01', spaceId: 'gallery-b', x: 8.7, z: -2.5 }
  ],
  hotspots: [
    {
      id: 'hotspot.artwork.a-01',
      entityId: 'artwork.a-01',
      spaceId: 'gallery-a',
      x: -4.7,
      z: -2.2,
      radius: 1.15,
      action: { type: ACTION.FOCUS_ENTITY, target: 'artwork.a-01' }
    },
    {
      id: 'hotspot.artwork.a-02',
      entityId: 'artwork.a-02',
      spaceId: 'gallery-a',
      x: 0.55,
      z: 2.25,
      radius: 1.15,
      action: { type: ACTION.FOCUS_ENTITY, target: 'artwork.a-02' }
    },
    {
      id: 'hotspot.artwork.b-01',
      entityId: 'artwork.b-01',
      spaceId: 'gallery-b',
      x: 8.35,
      z: -1.75,
      radius: 1.25,
      action: { type: ACTION.FOCUS_ENTITY, target: 'artwork.b-01' }
    }
  ]
});

export function resolveSpaceId(world, position) {
  for (const space of world.spaces) {
    const b = space.bounds;
    if (position.x >= b.minX && position.x <= b.maxX && position.z >= b.minZ && position.z <= b.maxZ) {
      return space.id;
    }
  }
  return null;
}

export function clampToWalkable(world, position) {
  const next = { ...position };
  next.x = Math.max(-5.6, Math.min(9.6, next.x));
  next.z = Math.max(-3.6, Math.min(3.6, next.z));
  const inDoorX = next.x > 2 && next.x < 4;
  if (inDoorX && Math.abs(next.z) > 1.0) {
    next.z = Math.sign(next.z) * 1.0;
  }
  for (const obstacle of world.obstacles) {
    const dx = next.x - obstacle.x;
    const dz = next.z - obstacle.z;
    const d = Math.hypot(dx, dz);
    const min = obstacle.radius + 0.35;
    if (d > 0.0001 && d < min) {
      next.x = obstacle.x + (dx / d) * min;
      next.z = obstacle.z + (dz / d) * min;
    }
  }
  return next;
}
