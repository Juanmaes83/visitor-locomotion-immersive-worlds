export class HarnessRenderer {
  constructor({ canvas, diagnosticsPanel, invariantsPanel, world }) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.diagnosticsPanel = diagnosticsPanel;
    this.invariantsPanel = invariantsPanel;
    this.world = world;
    this.scale = 54;
    this.dpr = 1;
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    this.canvas.width = Math.max(1, Math.floor(rect.width * this.dpr));
    this.canvas.height = Math.max(1, Math.floor(rect.height * this.dpr));
  }

  render(report) {
    if (!report.latest) return;
    const ctx = this.ctx;
    const w = this.canvas.width;
    const h = this.canvas.height;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.scale(this.dpr, this.dpr);
    this.drawWorld(ctx, report);
    ctx.restore();
    this.drawDiagnostics(report);
  }

  worldToScreen(x, z, cameraPose) {
    const rect = this.canvas.getBoundingClientRect();
    const cx = rect.width * 0.5;
    const cy = rect.height * 0.52;
    const dx = x - cameraPose.target.x;
    const dz = z - cameraPose.target.z;
    return { x: cx + dx * this.scale, y: cy + dz * this.scale };
  }

  drawWorld(ctx, report) {
    const pose = report.camera.pose;
    ctx.lineWidth = 2;
    ctx.fillStyle = '#15211f';
    ctx.fillRect(0, 0, this.canvas.clientWidth, this.canvas.clientHeight);
    for (const space of this.world.spaces) {
      const b = space.bounds;
      const p0 = this.worldToScreen(b.minX, b.minZ, pose);
      const p1 = this.worldToScreen(b.maxX, b.maxZ, pose);
      ctx.fillStyle = space.id === report.latest.world.activeSpaceId ? '#263d38' : '#1b2b29';
      ctx.strokeStyle = '#76b7a2';
      ctx.fillRect(p0.x, p0.y, p1.x - p0.x, p1.y - p0.y);
      ctx.strokeRect(p0.x, p0.y, p1.x - p0.x, p1.y - p0.y);
      ctx.fillStyle = '#cfe8dc';
      ctx.font = '13px system-ui';
      ctx.fillText(space.label, p0.x + 10, p0.y + 22);
    }
    for (const wall of this.world.walls) {
      const p = this.worldToScreen(wall.x, wall.z, pose);
      ctx.fillStyle = '#d7cab3';
      ctx.fillRect(p.x - wall.w * this.scale * 0.5, p.y - wall.h * this.scale * 0.5, wall.w * this.scale, wall.h * this.scale);
    }
    for (const entity of this.world.entities) {
      const p = this.worldToScreen(entity.x, entity.z, pose);
      ctx.fillStyle = entity.id === report.latest.world.focusedEntityId ? '#ffcf5a' : '#f5ece0';
      ctx.fillRect(p.x - 22, p.y - 8, 44, 16);
      ctx.fillStyle = '#14201d';
      ctx.font = '10px system-ui';
      ctx.fillText(entity.label.replace('Artwork ', ''), p.x - 18, p.y + 4);
    }
    for (const obstacle of this.world.obstacles) {
      const p = this.worldToScreen(obstacle.x, obstacle.z, pose);
      ctx.fillStyle = '#8fa7d8';
      ctx.beginPath();
      ctx.arc(p.x, p.y, obstacle.radius * this.scale, 0, Math.PI * 2);
      ctx.fill();
    }
    for (const hotspot of this.world.hotspots) {
      const p = this.worldToScreen(hotspot.x, hotspot.z, pose);
      const state = report.latest.proximity.states[hotspot.id];
      ctx.strokeStyle = state === 'NEAR' || state === 'ACTIVE' ? '#ffcf5a' : '#5f756c';
      ctx.beginPath();
      ctx.arc(p.x, p.y, hotspot.radius * this.scale, 0, Math.PI * 2);
      ctx.stroke();
    }
    const visitor = report.latest.visitor.position;
    const vp = this.worldToScreen(visitor.x, visitor.z, pose);
    ctx.fillStyle = '#f36f45';
    ctx.beginPath();
    ctx.arc(vp.x, vp.y, 11, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#ffd2bf';
    ctx.beginPath();
    ctx.moveTo(vp.x, vp.y);
    ctx.lineTo(vp.x + Math.sin(report.latest.visitor.yaw) * 30, vp.y + Math.cos(report.latest.visitor.yaw) * 30);
    ctx.stroke();
    const cp = this.worldToScreen(pose.position.x, pose.position.z, pose);
    ctx.strokeStyle = '#8ce7ff';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(cp.x, cp.y);
    ctx.lineTo(vp.x, vp.y);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  drawDiagnostics(report) {
    const latest = report.latest;
    const rows = [
      ['FPS', report.averageFps],
      ['frame ms', report.averageFrameMs],
      ['fixed steps', report.fixedStepCount],
      ['camera owner', report.camera.owner],
      ['camera writes', report.camera.writesThisFrame],
      ['visitor pos', `${latest.visitor.position.x.toFixed(2)}, ${latest.visitor.position.z.toFixed(2)}`],
      ['visitor vel', `${latest.visitor.velocity.x.toFixed(2)}, ${latest.visitor.velocity.z.toFixed(2)}`],
      ['activeSpaceId', latest.world.activeSpaceId],
      ['nearestHotspotId', latest.proximity.nearestHotspotId || 'null'],
      ['focusedEntityId', latest.world.focusedEntityId || 'null'],
      ['activeRouteId', latest.world.activeRouteId || 'null'],
      ['last action', latest.actions.lastAction ? `${latest.actions.lastAction.type} -> ${latest.actions.lastAction.target}` : 'null']
    ];
    this.diagnosticsPanel.innerHTML = rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('');
    this.invariantsPanel.innerHTML = report.invariants.checks
      .map((c) => `<p class="${c.pass ? 'pass' : 'fail'}">${c.pass ? 'PASS' : 'FAIL'} ${c.id}</p>`)
      .join('');
  }
}
