export class PresenceTelemetry {
  constructor() {
    this.frames = [];
    this.maxFrames = 180;
  }

  recordFrame(dt, fixedSteps, systems) {
    const visitor = systems.visitorState.snapshot();
    const camera = systems.camera.report();
    const checks = this.checks(systems, visitor, camera);
    const frame = {
      frame: camera.frame,
      fps: dt > 0 ? Math.round(1 / dt) : 0,
      frameMs: Number((dt * 1000).toFixed(2)),
      fixedSteps,
      visitor,
      camera,
      footContactCount: visitor.footContacts.length,
      lastFootContact: visitor.footContacts.at(-1) || null,
      invariants: { ok: checks.every((check) => check.pass), checks }
    };
    this.frames.push(frame);
    this.frames = this.frames.slice(-this.maxFrames);
    return frame;
  }

  checks(systems, visitor, camera) {
    const feet = new Set(visitor.footContacts.map((event) => event.foot));
    const footContactReady = visitor.footContacts.length === 0 && visitor.speed < 0.12;
    const collisionProofRequired = systems.collisionProofRequired === true;
    return [
      { id: 'THREE-RUNTIME-READY', pass: systems.renderer?.ready === true, detail: 'Three renderer mounted.' },
      { id: 'GROUNDING-PROBE', pass: visitor.grounded && Boolean(visitor.surface?.surfaceId), detail: visitor.surface?.surfaceId || 'none' },
      { id: 'COLLISION-OBSERVED', pass: !collisionProofRequired || (visitor.collisionObserved && visitor.collisionHitCount > 0 && visitor.maxCollisionCorrection > 0), detail: collisionProofRequired ? `hits=${visitor.collisionHitCount}, correction=${visitor.maxCollisionCorrection.toFixed(3)}` : 'ready; awaiting collision route' },
      { id: 'VISITOR-MOTION-TELEMETRY', pass: Number.isFinite(visitor.position.x) && Number.isFinite(visitor.velocity.x), detail: `speed=${visitor.speed.toFixed(2)}` },
      { id: 'BODY-ORIENTATION', pass: Math.abs(visitor.bodyYaw - visitor.yaw) < Math.PI, detail: `bodyYaw=${visitor.bodyYaw.toFixed(2)}` },
      { id: 'FOOT-CONTACT-LR', pass: footContactReady || (feet.has('left') && feet.has('right')), detail: footContactReady ? 'ready; awaiting movement' : `events=${visitor.footContacts.length}` },
      { id: 'SURFACE-PROBE', pass: Boolean(visitor.surface?.surfaceType), detail: visitor.surface?.surfaceType || 'none' },
      { id: 'CAMERA-AUTHORITY', pass: camera.owner === 'PRESENCE_THIRD_PERSON' && camera.violations === 0 && camera.writesThisFrame === 1, detail: `${camera.owner}, writes=${camera.writesThisFrame}` }
    ];
  }

  report(systems) {
    const latest = this.frames.at(-1);
    const averageFps = this.frames.length
      ? Math.round(this.frames.reduce((sum, frame) => sum + frame.fps, 0) / this.frames.length)
      : 0;
    const averageFrameMs = this.frames.length
      ? Number((this.frames.reduce((sum, frame) => sum + frame.frameMs, 0) / this.frames.length).toFixed(2))
      : 0;
    return {
      mission: 'SLICE-01-PRESENCE',
      baseline: 'b9cc2c2d781684f1fc81aeedaf02de93af9e16b6',
      updateOrder: [
        'input.beginFrame',
        'runtime.fixedUpdate',
        'worldState.update',
        'visitorPresence.update',
        'proximity.update',
        'cameraAuthority.update',
        'telemetry.sample',
        'threeRenderer.render',
        'input.endFrame'
      ],
      averageFps,
      averageFrameMs,
      latest,
      camera: systems.camera.report(),
      ownership: [
        { mutableState: 'visitor position/velocity/yaw', owner: 'VisitorPresenceRuntime', sourceOfTruth: 'VisitorPresenceRuntime' },
        { mutableState: 'grounded/surface/foot contacts/body response', owner: 'VisitorPresenceRuntime', sourceOfTruth: 'VisitorPresenceRuntime' },
        { mutableState: 'camera transform', owner: 'CameraAuthority', sourceOfTruth: 'CameraAuthority token commit' },
        { mutableState: 'activeSpaceId/focus/route fields', owner: 'WorldState', sourceOfTruth: 'WorldState' },
        { mutableState: 'nearest hotspot', owner: 'ProximitySystem', sourceOfTruth: 'ProximitySystem' }
      ]
    };
  }
}
