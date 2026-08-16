import { damp } from './math.js';

export class PresenceFollowCameraController {
  constructor(visitorState) {
    this.visitor = visitorState;
    this.distance = 4.9;
    this.height = 2.65;
    this.targetHeight = 1.05;
    this.positionLambda = 5.8;
    this.targetLambda = 8.5;
    this._position = null;
    this._target = null;
  }

  update(dt, commit, previousPose) {
    const yaw = this.visitor.bodyYaw;
    const backward = { x: -Math.sin(yaw), z: -Math.cos(yaw) };
    const speedLag = Math.min(this.visitor.speed / 2.65, 1) * 0.45;
    const desiredPosition = {
      x: this.visitor.position.x + backward.x * (this.distance + speedLag),
      y: this.visitor.position.y + this.height,
      z: this.visitor.position.z + backward.z * (this.distance + speedLag)
    };
    const desiredTarget = {
      x: this.visitor.position.x,
      y: this.visitor.position.y + this.targetHeight,
      z: this.visitor.position.z
    };
    if (!this._position) this._position = { ...previousPose.position };
    if (!this._target) this._target = { ...previousPose.target };
    for (const axis of ['x', 'y', 'z']) {
      this._position[axis] = damp(this._position[axis], desiredPosition[axis], this.positionLambda, dt);
      this._target[axis] = damp(this._target[axis], desiredTarget[axis], this.targetLambda, dt);
    }
    commit({
      position: { ...this._position },
      target: { ...this._target },
      yaw,
      pitch: -0.32,
      fov: 52
    });
  }
}
