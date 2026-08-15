export class InputIntents {
  constructor(target = globalThis) {
    this.target = target;
    this.intent = this.createEmpty();
    this._keys = new Set();
    this._dragging = false;
    this._lastPointer = null;
    this._onKeyDown = (event) => this.onKey(event, true);
    this._onKeyUp = (event) => this.onKey(event, false);
    this._onPointerDown = (event) => this.onPointerDown(event);
    this._onPointerMove = (event) => this.onPointerMove(event);
    this._onPointerUp = () => this.onPointerUp();
  }

  createEmpty() {
    return { moveX: 0, moveY: 0, lookX: 0, lookY: 0, activate: false, cancel: false };
  }

  attach(canvas) {
    this.canvas = canvas;
    if (typeof window === 'undefined') return;
    window.addEventListener('keydown', this._onKeyDown);
    window.addEventListener('keyup', this._onKeyUp);
    canvas.addEventListener('pointerdown', this._onPointerDown);
    window.addEventListener('pointermove', this._onPointerMove);
    window.addEventListener('pointerup', this._onPointerUp);
  }

  detach() {
    if (typeof window === 'undefined') return;
    window.removeEventListener('keydown', this._onKeyDown);
    window.removeEventListener('keyup', this._onKeyUp);
    this.canvas?.removeEventListener('pointerdown', this._onPointerDown);
    window.removeEventListener('pointermove', this._onPointerMove);
    window.removeEventListener('pointerup', this._onPointerUp);
  }

  beginFrame() {
    const k = this._keys;
    this.intent.moveY = (k.has('KeyW') || k.has('ArrowUp') ? 1 : 0) - (k.has('KeyS') || k.has('ArrowDown') ? 1 : 0);
    this.intent.moveX = (k.has('KeyD') || k.has('ArrowRight') ? 1 : 0) - (k.has('KeyA') || k.has('ArrowLeft') ? 1 : 0);
  }

  endFrame() {
    this.intent.lookX = 0;
    this.intent.lookY = 0;
    this.intent.activate = false;
    this.intent.cancel = false;
  }

  onKey(event, down) {
    if (down) this._keys.add(event.code);
    else this._keys.delete(event.code);
    if (down && !event.repeat && (event.code === 'KeyE' || event.code === 'Enter')) this.intent.activate = true;
    if (down && !event.repeat && event.code === 'Escape') this.intent.cancel = true;
    if (/^(KeyW|KeyA|KeyS|KeyD|Arrow)/.test(event.code)) event.preventDefault();
  }

  onPointerDown(event) {
    this._dragging = true;
    this._lastPointer = { x: event.clientX, y: event.clientY };
    this.canvas?.setPointerCapture?.(event.pointerId);
  }

  onPointerMove(event) {
    if (!this._dragging || !this._lastPointer) return;
    this.intent.lookX += event.clientX - this._lastPointer.x;
    this.intent.lookY += event.clientY - this._lastPointer.y;
    this._lastPointer = { x: event.clientX, y: event.clientY };
  }

  onPointerUp() {
    this._dragging = false;
    this._lastPointer = null;
  }
}
