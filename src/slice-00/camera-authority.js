export class CameraAuthority {
  constructor(initialPose) {
    this.pose = initialPose;
    this.controllers = new Map();
    this.owner = null;
    this.frame = 0;
    this._token = null;
    this._tokenUsed = false;
    this.violations = [];
    this.history = [];
    this.lastWrites = 0;
  }

  register(name, controller) {
    if (typeof controller?.update !== 'function') throw new Error(`Camera controller ${name} has no update()`);
    this.controllers.set(name, controller);
    if (!this.owner) this.owner = name;
    return this;
  }

  request(name, reason = 'unspecified') {
    if (!this.controllers.has(name)) throw new Error(`No camera controller registered for ${name}`);
    if (name === this.owner) return false;
    const from = this.owner;
    this.controllers.get(from)?.onLose?.({ to: name });
    this.owner = name;
    this.controllers.get(name)?.onGain?.(this.clonePose(this.pose), { reason });
    this.history.push({ from, to: name, reason, frame: this.frame });
    return true;
  }

  update(dt) {
    this.frame += 1;
    this._tokenUsed = false;
    this.lastWrites = 0;
    const controller = this.controllers.get(this.owner);
    if (!controller) return this.pose;
    const token = { frame: this.frame, owner: this.owner };
    this._token = token;
    controller.update(dt, (pose) => this.commit(token, pose), this.clonePose(this.pose));
    this._token = null;
    return this.pose;
  }

  commit(token, pose) {
    if (token !== this._token || token.frame !== this.frame || token.owner !== this.owner) {
      return this.violate('stale, foreign, or non-authoritative camera token', token);
    }
    if (this._tokenUsed) return this.violate(`two camera writes in frame ${this.frame}`, token);
    this._tokenUsed = true;
    this.lastWrites = 1;
    this.pose = this.clonePose(pose);
    return this.pose;
  }

  violate(message, token) {
    const record = { message, frame: this.frame, owner: this.owner, tokenOwner: token?.owner || null };
    this.violations.push(record);
    throw new Error(`CameraAuthority violation: ${message}`);
  }

  clonePose(pose) {
    return {
      position: { ...pose.position },
      target: { ...pose.target },
      yaw: pose.yaw,
      pitch: pose.pitch,
      fov: pose.fov
    };
  }

  report() {
    return {
      owner: this.owner,
      frame: this.frame,
      writesThisFrame: this.lastWrites,
      violations: this.violations.length,
      recentViolations: this.violations.slice(-5),
      history: this.history.slice(-8),
      pose: this.clonePose(this.pose)
    };
  }
}
