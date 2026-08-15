import { ACTION, HOTSPOT_STATE } from './contracts.js';

export class ActionDispatch {
  constructor({ worldState }) {
    this.worldState = worldState;
    this.handlers = new Map();
    this.log = [];
    this.lastAction = null;
    this.register(ACTION.FOCUS_ENTITY, (action, context) => {
      this.worldState.setFocus(action.target);
      if (context.sourceId) this.worldState.setHotspotState(context.sourceId, HOTSPOT_STATE.ACTIVE);
      return { focusRequested: action.target };
    });
    this.register(ACTION.RELEASE_FOCUS, () => {
      this.worldState.setFocus(null);
      return { focusReleased: true };
    });
  }

  register(type, handler) {
    if (!Object.values(ACTION).includes(type)) throw new Error(`Unknown semantic action: ${type}`);
    this.handlers.set(type, handler);
  }

  dispatch(action, context = { source: 'QA' }) {
    if (!Object.values(ACTION).includes(action?.type)) throw new Error(`Cannot dispatch unknown action: ${action?.type}`);
    const handler = this.handlers.get(action.type);
    if (!handler) throw new Error(`No handler for action: ${action.type}`);
    const entry = {
      type: action.type,
      target: action.target || null,
      source: context.source,
      sourceId: context.sourceId || null,
      frame: context.frame || 0
    };
    this.lastAction = entry;
    this.log.push(entry);
    if (this.log.length > 80) this.log.shift();
    return handler(action, context);
  }

  summary() {
    return { total: this.log.length, lastAction: this.lastAction, recent: this.log.slice(-10) };
  }
}
