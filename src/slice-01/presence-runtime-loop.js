import { WorldState } from '../slice-00/world-state.js';
import { InputIntents } from '../slice-00/input-intents.js';
import { CameraAuthority } from '../slice-00/camera-authority.js';
import { ProximitySystem } from '../slice-00/proximity-system.js';
import { PRESENCE_WORLD } from './presence-world.js';
import { PresenceVisitorState } from './presence-state.js';
import { VisitorPresenceRuntime } from './visitor-presence-runtime.js';
import { PresenceFollowCameraController } from './follow-camera-controller.js';
import { PresenceTelemetry } from './presence-telemetry.js';

const FIXED_DT = 1 / 60;
const MAX_STEPS = 5;
const CAMERA_OWNER = 'PRESENCE_THIRD_PERSON';

export class Slice01Runtime {
  constructor({ canvas, autoStart = true, renderer = null } = {}) {
    this.canvas = canvas;
    this.world = PRESENCE_WORLD;
    this.worldState = new WorldState(this.world);
    this.visitorState = new PresenceVisitorState(this.worldState, this.world.spawn);
    this.input = new InputIntents();
    this.presence = new VisitorPresenceRuntime({ world: this.world, worldState: this.worldState, visitorState: this.visitorState });
    this.proximity = new ProximitySystem({ world: this.world, worldState: this.worldState });
    this.camera = new CameraAuthority({
      position: { x: -7.6, y: 2.6, z: 0.7 },
      target: { x: this.visitorState.position.x, y: 1.05, z: this.visitorState.position.z },
      yaw: this.visitorState.yaw,
      pitch: -0.32,
      fov: 52
    });
    this.camera.register(CAMERA_OWNER, new PresenceFollowCameraController(this.visitorState));
    this.renderer = renderer || { ready: false, render() {} };
    this.telemetry = new PresenceTelemetry();
    this.accumulator = 0;
    this.last = 0;
    this.running = false;
    this.autoStart = autoStart;
    this.lastReport = null;
    this.scriptedRoute = null;
    this.collisionProofRequired = false;
  }

  start() {
    if (this.canvas) this.input.attach(this.canvas);
    this.running = true;
    this.last = performance.now();
    this.raf = requestAnimationFrame((now) => this.frame(now));
    return this;
  }

  stop() {
    this.running = false;
    if (this.raf) cancelAnimationFrame(this.raf);
    this.input.detach();
  }

  frame(now = performance.now()) {
    if (!this.running) return;
    this.step(Math.min(0.08, Math.max(0, (now - this.last) / 1000)));
    this.last = now;
    this.raf = requestAnimationFrame((next) => this.frame(next));
  }

  step(dt, overrideIntents = null) {
    this.input.beginFrame();
    const intents = overrideIntents || this.routeIntent() || this.input.intent;
    this.accumulator += dt;
    let fixedSteps = 0;
    while (this.accumulator >= FIXED_DT && fixedSteps < MAX_STEPS) {
      this.presence.fixedUpdate(FIXED_DT, intents);
      this.accumulator -= FIXED_DT;
      fixedSteps += 1;
    }
    if (fixedSteps === MAX_STEPS) this.accumulator = 0;
    this.worldState.setActiveSpace(this.presence.proposedSpaceId);
    this.proximity.update(this.visitorState.position);
    this.visitorState.projectFrom(this.worldState, this.proximity.nearestHotspotId);
    this.camera.update(dt);
    this.lastReport = this.telemetry.recordFrame(dt, fixedSteps, this.systems());
    this.renderer?.render(this.report());
    if (!overrideIntents) this.input.endFrame();
    return this.lastReport;
  }

  routeIntent() {
    if (!this.scriptedRoute) return null;
    this.scriptedRoute.elapsed += 1 / 60;
    const t = this.scriptedRoute.elapsed;
    if (t > 7.5) {
      this.scriptedRoute = null;
      return null;
    }
    if (t < 3.3) return { moveX: 0, moveY: 1, lookX: 0, lookY: 0, activate: false, cancel: false };
    if (t < 4.7) return { moveX: 1, moveY: 0.25, lookX: 0, lookY: 0, activate: false, cancel: false };
    return { moveX: 0, moveY: 1, lookX: 0, lookY: 0, activate: false, cancel: false };
  }

  startCollisionRoute() {
    this.scriptedRoute = { elapsed: 0 };
    this.collisionProofRequired = true;
  }

  reset() {
    this.stop();
    this.worldState = new WorldState(this.world);
    this.visitorState = new PresenceVisitorState(this.worldState, this.world.spawn);
    this.presence = new VisitorPresenceRuntime({ world: this.world, worldState: this.worldState, visitorState: this.visitorState });
    this.proximity = new ProximitySystem({ world: this.world, worldState: this.worldState });
    this.camera = new CameraAuthority({
      position: { x: -7.6, y: 2.6, z: 0.7 },
      target: { x: this.visitorState.position.x, y: 1.05, z: this.visitorState.position.z },
      yaw: this.visitorState.yaw,
      pitch: -0.32,
      fov: 52
    });
    this.camera.register(CAMERA_OWNER, new PresenceFollowCameraController(this.visitorState));
    this.renderer.visitorState = this.visitorState;
    this.renderer.cameraAuthority = this.camera;
    this.telemetry = new PresenceTelemetry();
    this.accumulator = 0;
    this.scriptedRoute = null;
    this.start();
  }

  systems() {
    return {
      world: this.world,
      worldState: this.worldState,
      visitorState: this.visitorState,
      presence: this.presence,
      proximity: this.proximity,
      camera: this.camera,
      renderer: this.renderer,
      collisionProofRequired: this.collisionProofRequired
    };
  }

  report() {
    return this.telemetry.report(this.systems());
  }
}
