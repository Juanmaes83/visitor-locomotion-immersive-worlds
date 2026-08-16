import * as THREE from '/node_modules/three/build/three.module.js';

export class ThreePresenceRenderer {
  constructor({ canvas, world, visitorState, cameraAuthority }) {
    this.canvas = canvas;
    this.world = world;
    this.visitorState = visitorState;
    this.cameraAuthority = cameraAuthority;
    this.ready = false;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x101816);
    this.camera = new THREE.PerspectiveCamera(52, 1, 0.05, 100);
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, preserveDrawingBuffer: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.clockObjects = [];
    this.buildScene();
    this.ready = true;
  }

  buildScene() {
    this.scene.add(new THREE.HemisphereLight(0xf4efe4, 0x25342f, 1.15));
    const key = new THREE.DirectionalLight(0xfff2dc, 1.45);
    key.position.set(-4, 7, 6);
    this.scene.add(key);
    const grid = new THREE.GridHelper(16, 32, 0x40635a, 0x243832);
    grid.position.y = 0.004;
    this.scene.add(grid);

    for (const space of this.world.spaces) this.addFloor(space);
    for (const collider of this.world.colliders) this.addCollider(collider);
    for (const hotspot of this.world.hotspots) this.addHotspot(hotspot);
    this.addAvatar();
  }

  addFloor(space) {
    const bounds = space.bounds;
    const geo = new THREE.BoxGeometry(bounds.x1 - bounds.x0, 0.035, bounds.z1 - bounds.z0);
    const color = space.surfaceType === 'wood' ? 0x466256 : space.surfaceType === 'stone' ? 0x747268 : 0x52685f;
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.82 }));
    mesh.position.set((bounds.x0 + bounds.x1) / 2, space.height - 0.02, (bounds.z0 + bounds.z1) / 2);
    mesh.receiveShadow = true;
    this.scene.add(mesh);
  }

  addCollider(collider) {
    const h = collider.type === 'wall' ? 2.35 : collider.top;
    const geo = new THREE.BoxGeometry(collider.x1 - collider.x0, h, collider.z1 - collider.z0);
    const color = collider.type === 'wall' ? 0xd9d0bc : collider.type === 'bench' ? 0x8f7b5e : 0x94a5c9;
    const mesh = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: 0.76 }));
    mesh.position.set((collider.x0 + collider.x1) / 2, h / 2, (collider.z0 + collider.z1) / 2);
    this.scene.add(mesh);
  }

  addHotspot(hotspot) {
    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(hotspot.radius, 0.015, 8, 48),
      new THREE.MeshBasicMaterial({ color: 0xf0c24f })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.set(hotspot.position.x, 0.04, hotspot.position.z);
    this.scene.add(ring);
  }

  addAvatar() {
    this.avatar = new THREE.Group();
    const body = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.26, 0.82, 7, 12),
      new THREE.MeshStandardMaterial({ color: 0xf06d3f, roughness: 0.48 })
    );
    body.position.y = 0.92;
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.19, 20, 14),
      new THREE.MeshStandardMaterial({ color: 0xffc09a, roughness: 0.58 })
    );
    head.position.y = 1.55;
    const facing = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.34),
      new THREE.MeshStandardMaterial({ color: 0x20332f, roughness: 0.5 })
    );
    facing.position.set(0, 1.23, 0.31);
    this.leftFoot = this.makeFoot(0x7fd1bd);
    this.rightFoot = this.makeFoot(0xb7d27c);
    this.leftFoot.position.set(-0.14, 0.06, 0.08);
    this.rightFoot.position.set(0.14, 0.06, -0.08);
    this.avatar.add(body, head, facing, this.leftFoot, this.rightFoot);
    this.scene.add(this.avatar);
  }

  makeFoot(color) {
    return new THREE.Mesh(
      new THREE.BoxGeometry(0.16, 0.08, 0.32),
      new THREE.MeshStandardMaterial({ color, roughness: 0.7 })
    );
  }

  render(report) {
    this.resize();
    const v = this.visitorState;
    this.avatar.position.set(v.position.x, v.position.y, v.position.z);
    this.avatar.rotation.y = v.bodyYaw;
    const phase = report.latest?.visitor?.speed || 0;
    this.leftFoot.position.z = 0.08 + Math.sin(v.speed + performance.now() * 0.01) * 0.05 * Math.min(phase, 1);
    this.rightFoot.position.z = -0.08 + Math.sin(v.speed + performance.now() * 0.01 + Math.PI) * 0.05 * Math.min(phase, 1);

    const pose = this.cameraAuthority.pose;
    this.camera.position.set(pose.position.x, pose.position.y, pose.position.z);
    this.camera.lookAt(pose.target.x, pose.target.y, pose.target.z);
    this.camera.fov = pose.fov;
    this.camera.updateProjectionMatrix();
    this.renderer.render(this.scene, this.camera);
  }

  resize() {
    const width = this.canvas.clientWidth || window.innerWidth;
    const height = this.canvas.clientHeight || window.innerHeight;
    if (this.canvas.width !== Math.floor(width * this.renderer.getPixelRatio()) || this.canvas.height !== Math.floor(height * this.renderer.getPixelRatio())) {
      this.renderer.setSize(width, height, false);
      this.camera.aspect = width / Math.max(1, height);
      this.camera.updateProjectionMatrix();
    }
  }
}
