import { clamp } from './math.js';

export const PRESENCE_WORLD = {
  startSpaceId: 'gallery-a',
  spawn: { x: -4.2, y: 0, z: 0.7, yaw: Math.PI / 2 },
  gravity: -18,
  spaces: [
    { id: 'gallery-a', label: 'Gallery A', bounds: { x0: -7.2, x1: -1.1, z0: -3.2, z1: 4.2 }, surfaceId: 'floor.marble.a', surfaceType: 'marble', height: 0 },
    { id: 'doorway', label: 'Doorway', bounds: { x0: -1.1, x1: 1.1, z0: -1.08, z1: 1.08 }, surfaceId: 'floor.stone.doorway', surfaceType: 'stone', height: 0.03 },
    { id: 'gallery-b', label: 'Gallery B / Bay', bounds: { x0: 1.1, x1: 7.4, z0: -3.0, z1: 3.8 }, surfaceId: 'floor.wood.b', surfaceType: 'wood', height: 0 }
  ],
  colliders: [
    { id: 'wall.a.north', type: 'wall', x0: -7.5, x1: -0.85, z0: 4.2, z1: 4.55, top: 2.8 },
    { id: 'wall.a.south', type: 'wall', x0: -7.5, x1: -0.85, z0: -3.55, z1: -3.2, top: 2.8 },
    { id: 'wall.a.west', type: 'wall', x0: -7.55, x1: -7.2, z0: -3.55, z1: 4.55, top: 2.8 },
    { id: 'wall.a.east.upper', type: 'wall', x0: -1.1, x1: -0.75, z0: 1.18, z1: 4.55, top: 2.8 },
    { id: 'wall.a.east.lower', type: 'wall', x0: -1.1, x1: -0.75, z0: -3.55, z1: -1.18, top: 2.8 },
    { id: 'wall.b.north', type: 'wall', x0: 0.85, x1: 7.75, z0: 3.8, z1: 4.15, top: 2.8 },
    { id: 'wall.b.south', type: 'wall', x0: 0.85, x1: 7.75, z0: -3.35, z1: -3.0, top: 2.8 },
    { id: 'wall.b.east', type: 'wall', x0: 7.4, x1: 7.75, z0: -3.35, z1: 4.15, top: 2.8 },
    { id: 'wall.b.west.upper', type: 'wall', x0: 0.75, x1: 1.1, z0: 1.18, z1: 4.15, top: 2.8 },
    { id: 'wall.b.west.lower', type: 'wall', x0: 0.75, x1: 1.1, z0: -3.35, z1: -1.18, top: 2.8 },
    { id: 'plinth.sculpture.b', type: 'sculpture', x0: 3.2, x1: 4.45, z0: -0.7, z1: 0.55, top: 1.15, surfaceId: 'plinth.sculpture.b', surfaceType: 'stone' },
    { id: 'bench.a', type: 'bench', x0: -5.7, x1: -4.2, z0: -2.25, z1: -1.8, top: 0.55, surfaceId: 'bench.a', surfaceType: 'wood' }
  ],
  hotspots: [
    { id: 'hotspot.artwork.a-01', entityId: 'artwork.a-01', spaceId: 'gallery-a', x: -6.15, z: 3.7, position: { x: -6.15, y: 1.35, z: 3.7 }, radius: 1.05 },
    { id: 'hotspot.artwork.b-01', entityId: 'artwork.b-01', spaceId: 'gallery-b', x: 6.8, z: 2.95, position: { x: 6.8, y: 1.35, z: 2.95 }, radius: 1.15 }
  ]
};

export function resolveSpaceId(world, position) {
  return world.spaces.find((space) => inside(position, space.bounds))?.id || null;
}

export function surfaceProbe(world, position) {
  const space = world.spaces.find((item) => inside(position, item.bounds)) || world.spaces[0];
  let probe = {
    surfaceId: space.surfaceId,
    surfaceType: space.surfaceType,
    height: space.height,
    normal: { x: 0, y: 1, z: 0 }
  };
  for (const collider of world.colliders) {
    if (inside(position, collider) && collider.top <= 0.62) {
      probe = {
        surfaceId: collider.surfaceId || collider.id,
        surfaceType: collider.surfaceType || 'stone',
        height: collider.top,
        normal: { x: 0, y: 1, z: 0 }
      };
    }
  }
  return probe;
}

export function resolveCharacterCollision(world, position, radius) {
  const next = { ...position };
  const before = { x: next.x, z: next.z };
  if (!resolveSpaceId(world, next)) {
    const all = { x0: -7.2, x1: 7.4, z0: -3.2, z1: 4.2 };
    next.x = clamp(next.x, all.x0 + radius, all.x1 - radius);
    next.z = clamp(next.z, all.z0 + radius, all.z1 - radius);
  }
  for (const collider of world.colliders) {
    if (collider.top <= next.y + 0.2) continue;
    pushOut(next, collider, radius);
  }
  return { position: next, hit: Math.hypot(next.x - before.x, next.z - before.z) > 1e-5 };
}

function inside(position, bounds) {
  return position.x >= bounds.x0 && position.x <= bounds.x1 && position.z >= bounds.z0 && position.z <= bounds.z1;
}

function pushOut(position, box, radius) {
  const x0 = box.x0 - radius;
  const x1 = box.x1 + radius;
  const z0 = box.z0 - radius;
  const z1 = box.z1 + radius;
  if (position.x <= x0 || position.x >= x1 || position.z <= z0 || position.z >= z1) return;
  const dxL = position.x - x0;
  const dxR = x1 - position.x;
  const dzL = position.z - z0;
  const dzR = z1 - position.z;
  const m = Math.min(dxL, dxR, dzL, dzR);
  if (m === dxL) position.x = x0;
  else if (m === dxR) position.x = x1;
  else if (m === dzL) position.z = z0;
  else position.z = z1;
}
