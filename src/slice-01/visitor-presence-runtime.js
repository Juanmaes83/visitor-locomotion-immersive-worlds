import { damp, dampAngle, length2, normalize2 } from './math.js';
import { resolveCharacterCollision, resolveSpaceId, surfaceProbe } from './presence-world.js';

export class VisitorPresenceRuntime {
  constructor({ world, worldState, visitorState }) {
    this.world = world;
    this.worldState = worldState;
    this.state = visitorState;
    this.radius = 0.34;
    this.height = 1.72;
    this.maxSpeed = 2.65;
    this.accel = 8.8;
    this.decel = 11.5;
    this.turnResponsiveness = 12;
    this.bodyYawResponsiveness = 9;
    this.verticalVelocity = 0;
    this.strideDistance = 0.86;
    this.strideAccumulator = 0;
    this.nextFoot = 'left';
    this.footEvents = [];
    this.lastCollisionHit = false;
    this.collisionHitCount = 0;
    this.maxCollisionCorrection = 0;
    this.proposedSpaceId = worldState.activeSpaceId;
    this.body = { yaw: this.state.yaw, lean: 0, bob: 0, leftFootPhase: 0, rightFootPhase: Math.PI };
  }

  fixedUpdate(dt, intents) {
    this.state.yaw -= intents.lookX * 0.0046;
    const desired = this.desiredVelocity(intents);
    const currentSpeed = length2(this.state.velocity.x, this.state.velocity.z);
    const desiredSpeed = length2(desired.x, desired.z);
    const lambda = desiredSpeed > currentSpeed ? this.accel : this.decel;
    this.state.velocity.x = damp(this.state.velocity.x, desired.x, lambda, dt);
    this.state.velocity.z = damp(this.state.velocity.z, desired.z, lambda, dt);

    const start = { ...this.state.position };
    let candidate = {
      x: start.x + this.state.velocity.x * dt,
      y: start.y + this.verticalVelocity * dt,
      z: start.z + this.state.velocity.z * dt
    };
    this.verticalVelocity += this.world.gravity * dt;
    const ground = surfaceProbe(this.world, candidate);
    if (candidate.y <= ground.height + 0.002) {
      candidate.y = ground.height;
      this.verticalVelocity = 0;
      this.state.grounded = true;
    } else {
      this.state.grounded = false;
    }

    const unresolved = { ...candidate };
    const resolved = resolveCharacterCollision(this.world, candidate, this.radius);
    candidate = resolved.position;
    this.lastCollisionHit = resolved.hit;
    if (resolved.hit) {
      this.collisionHitCount += 1;
      this.maxCollisionCorrection = Math.max(this.maxCollisionCorrection, Math.hypot(candidate.x - unresolved.x, candidate.z - unresolved.z));
      this.state.velocity.x = (candidate.x - start.x) / dt;
      this.state.velocity.z = (candidate.z - start.z) / dt;
    }

    this.state.position.x = candidate.x;
    this.state.position.y = candidate.y;
    this.state.position.z = candidate.z;
    this.state.surface = surfaceProbe(this.world, this.state.position);
    this.state.collisionHit = resolved.hit;
    this.state.collisionObserved = this.collisionHitCount > 0;
    this.state.collisionHitCount = this.collisionHitCount;
    this.state.maxCollisionCorrection = this.maxCollisionCorrection;
    this.state.speed = length2(this.state.velocity.x, this.state.velocity.z);
    this.state.locomotionMode = this.state.speed > 0.12 ? 'walk' : 'idle';
    this.proposedSpaceId = resolveSpaceId(this.world, this.state.position) || this.proposedSpaceId;
    this.updateBody(dt);
    this.updateFootContacts(dt, start);
  }

  desiredVelocity(intents) {
    const input = normalize2(intents.moveX, intents.moveY);
    if (!input.len) return { x: 0, z: 0 };
    const yaw = this.state.yaw;
    const sin = Math.sin(yaw);
    const cos = Math.cos(yaw);
    const x = (cos * input.x + sin * input.z) * this.maxSpeed;
    const z = (-sin * input.x + cos * input.z) * this.maxSpeed;
    const facing = Math.atan2(x, z);
    this.state.yaw = dampAngle(this.state.yaw, facing, this.turnResponsiveness, 1 / 60);
    return { x, z };
  }

  updateBody(dt) {
    const movingYaw = this.state.speed > 0.08 ? Math.atan2(this.state.velocity.x, this.state.velocity.z) : this.state.yaw;
    this.body.yaw = dampAngle(this.body.yaw, movingYaw, this.bodyYawResponsiveness, dt);
    this.body.lean = damp(this.body.lean, Math.min(this.state.speed / this.maxSpeed, 1) * 0.08, 8, dt);
    this.body.bob += dt * this.state.speed * 6.2;
    this.body.leftFootPhase = this.body.bob;
    this.body.rightFootPhase = this.body.bob + Math.PI;
    this.state.bodyYaw = this.body.yaw;
  }

  updateFootContacts(dt, previousPosition) {
    if (!this.state.grounded || this.state.speed < 0.35) {
      this.strideAccumulator = Math.max(0, this.strideAccumulator - dt * 0.4);
      return;
    }
    const travelled = Math.hypot(this.state.position.x - previousPosition.x, this.state.position.z - previousPosition.z);
    this.strideAccumulator += travelled;
    while (this.strideAccumulator >= this.strideDistance) {
      this.strideAccumulator -= this.strideDistance;
      this.emitFootContact(this.nextFoot);
      this.nextFoot = this.nextFoot === 'left' ? 'right' : 'left';
    }
  }

  emitFootContact(foot) {
    const side = foot === 'left' ? -1 : 1;
    const yaw = this.body.yaw;
    const right = { x: Math.cos(yaw), z: -Math.sin(yaw) };
    const forward = { x: Math.sin(yaw), z: Math.cos(yaw) };
    const event = {
      foot,
      worldPosition: {
        x: this.state.position.x + right.x * side * 0.16 + forward.x * 0.1,
        y: this.state.surface.height,
        z: this.state.position.z + right.z * side * 0.16 + forward.z * 0.1
      },
      surfaceId: this.state.surface.surfaceId,
      surfaceType: this.state.surface.surfaceType,
      speed: Number(this.state.speed.toFixed(3)),
      stride: this.strideDistance,
      locomotionMode: this.state.locomotionMode,
      timestamp: performance.now()
    };
    this.footEvents.push(event);
    this.state.footContacts = [...this.state.footContacts, event].slice(-12);
  }
}
