export function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function damp(current, target, lambda, dt) {
  return current + (target - current) * (1 - Math.exp(-lambda * dt));
}

export function angleDelta(from, to) {
  return Math.atan2(Math.sin(to - from), Math.cos(to - from));
}

export function dampAngle(current, target, lambda, dt) {
  return current + angleDelta(current, target) * (1 - Math.exp(-lambda * dt));
}

export function length2(x, z) {
  return Math.hypot(x, z);
}

export function normalize2(x, z) {
  const len = length2(x, z);
  if (len < 1e-6) return { x: 0, z: 0, len: 0 };
  return { x: x / len, z: z / len, len };
}
