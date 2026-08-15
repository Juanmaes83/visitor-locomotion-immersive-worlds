import { clampToWalkable, resolveSpaceId } from './sandbox-world.js';

export class VisitorRuntime {
  constructor({ world, worldState, visitorState }) {
    this.world = world;
    this.worldState = worldState;
    this.state = visitorState;
    this.speed = 2.15;
    this.lookSpeed = 0.006;
    this.proposedSpaceId = worldState.activeSpaceId;
  }

  fixedUpdate(dt, intents) {
    this.state.yaw -= intents.lookX * this.lookSpeed;
    const cos = Math.cos(this.state.yaw);
    const sin = Math.sin(this.state.yaw);
    const len = Math.hypot(intents.moveX, intents.moveY);
    const scale = len > 1 ? 1 / len : 1;
    const forward = intents.moveY * scale;
    const right = intents.moveX * scale;
    const vx = (cos * right + sin * forward) * this.speed;
    const vz = (-sin * right + cos * forward) * this.speed;
    const next = clampToWalkable(this.world, {
      x: this.state.position.x + vx * dt,
      y: 0,
      z: this.state.position.z + vz * dt
    });
    this.state.velocity.x = (next.x - this.state.position.x) / dt;
    this.state.velocity.y = 0;
    this.state.velocity.z = (next.z - this.state.position.z) / dt;
    this.state.position.x = next.x;
    this.state.position.y = 0;
    this.state.position.z = next.z;
    this.state.grounded = true;
    this.state.locomotionMode = len > 0.05 ? 'walk' : 'idle';
    this.proposedSpaceId = resolveSpaceId(this.world, this.state.position) || this.proposedSpaceId;
  }
}
