export class ExploreThirdPersonController {
  constructor(visitorState) {
    this.visitorState = visitorState;
    this.distance = 4.9;
    this.height = 3.2;
  }

  update(dt, commit) {
    const v = this.visitorState;
    const backX = -Math.sin(v.yaw) * this.distance;
    const backZ = -Math.cos(v.yaw) * this.distance;
    commit({
      position: {
        x: v.position.x + backX,
        y: this.height,
        z: v.position.z + backZ
      },
      target: {
        x: v.position.x,
        y: 1.15,
        z: v.position.z
      },
      yaw: v.yaw,
      pitch: -0.35,
      fov: 54
    });
  }
}
