import { ACTION, CAMERA_AUTHORITY } from './contracts.js';
import { SANDBOX_WORLD } from './sandbox-world.js';
import { WorldState } from './world-state.js';
import { VisitorState } from './visitor-state.js';
import { InputIntents } from './input-intents.js';
import { VisitorRuntime } from './visitor-runtime.js';
import { CameraAuthority } from './camera-authority.js';
import { ExploreThirdPersonController } from './explore-third-person-controller.js';
import { ProximitySystem } from './proximity-system.js';
import { ActionDispatch } from './action-dispatch.js';
import { EvidenceTelemetry } from './evidence-telemetry.js';

const FIXED_DT = 1 / 60;
const MAX_STEPS = 5;

export class Slice00Runtime {
  constructor({ canvas, renderer = null, autoStart = true } = {}) {
    this.canvas = canvas;
    this.world = SANDBOX_WORLD;
    this.worldState = new WorldState(this.world);
    this.visitorState = new VisitorState(this.worldState);
    this.input = new InputIntents();
    this.visitor = new VisitorRuntime({ world: this.world, worldState: this.worldState, visitorState: this.visitorState });
    this.proximity = new ProximitySystem({ world: this.world, worldState: this.worldState });
    this.actions = new ActionDispatch({ worldState: this.worldState });
    this.camera = new CameraAuthority({
      position: { x: -3.8, y: 3.2, z: 5.6 },
      target: { x: -3.8, y: 0.8, z: 0.8 },
      yaw: this.visitorState.yaw,
      pitch: -0.35,
      fov: 54
    });
    this.camera.register(CAMERA_AUTHORITY.EXPLORE_THIRD_PERSON, new ExploreThirdPersonController(this.visitorState));
    this.telemetry = new EvidenceTelemetry();
    this.renderer = renderer;
    this.accumulator = 0;
    this.last = 0;
    this.running = false;
    this.autoStart = autoStart;
    this.lastReport = null;
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
    const intents = overrideIntents || this.input.intent;
    this.input.beginFrame();
    this.accumulator += dt;
    let fixedSteps = 0;
    while (this.accumulator >= FIXED_DT && fixedSteps < MAX_STEPS) {
      this.visitor.fixedUpdate(FIXED_DT, intents);
      this.accumulator -= FIXED_DT;
      fixedSteps += 1;
    }
    if (fixedSteps === MAX_STEPS) this.accumulator = 0;
    this.worldState.setActiveSpace(this.visitor.proposedSpaceId);
    const nearest = this.proximity.update(this.visitorState.position);
    if (intents.activate && nearest) {
      this.actions.dispatch(nearest.action, { source: 'HOTSPOT', sourceId: nearest.id, frame: this.camera.frame });
    }
    if (intents.cancel) {
      this.actions.dispatch({ type: ACTION.RELEASE_FOCUS }, { source: 'INPUT', frame: this.camera.frame });
    }
    this.visitorState.projectFrom(this.worldState, this.proximity.nearestHotspotId);
    this.camera.update(dt);
    this.lastReport = this.telemetry.recordFrame(dt, fixedSteps, this.systems());
    this.renderer?.render(this.report());
    if (!overrideIntents) this.input.endFrame();
    return this.lastReport;
  }

  systems() {
    return {
      world: this.world,
      worldState: this.worldState,
      visitorState: this.visitorState,
      proximity: this.proximity,
      actions: this.actions,
      camera: this.camera
    };
  }

  report() {
    return this.telemetry.report(this.systems());
  }

  injectCameraDoubleWriteForTest() {
    const token = { frame: this.camera.frame, owner: this.camera.owner };
    try {
      this.camera.commit(token, this.camera.pose);
    } catch {
      return true;
    }
    return false;
  }
}
