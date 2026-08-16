# Human Review — SLICE-01-PRESENCE

Mission: `SLICE-01-PRESENCE`  
Branch: `codex/slice-01-presence`  
Baseline: `b9cc2c2d781684f1fc81aeedaf02de93af9e16b6`  
SHA: recorded in final delivery and GitHub branch HEAD.

## Launch

```powershell
npm.cmd install
npm.cmd run start
```

Open `http://127.0.0.1:4173`.

## Controls

- `WASD` / arrows: move
- Mouse drag: look/yaw
- `C`: scripted collision route toward plinth
- `R`: reset

## Recommended Human Test Path

1. Load the page and confirm the orange abstract visitor appears in a 3D gallery.
2. Hold `W` until the visitor crosses from Gallery A through the doorway to Gallery B.
3. Watch acceleration, deceleration when releasing, and body orientation response.
4. Confirm diagnostics show `grounded=true`, changing position/velocity/yaw, surface id/type, foot contacts, and `PRESENCE_THIRD_PERSON`.
5. Press `C`; confirm the visitor route collides with the plinth without passing through it.
6. Review `storyboard/storyboard-contact-sheet.png` and both videos.

## Human Decision Needed

Juanma + ChatGPT should decide KEEP / ADJUST / REJECT for Slice 1. Agent KEEP is not product approval.

## Known Limits

No Slice 2 work: no Focus, Guided, Museum integration, visual footprints, audio, final avatar, camera collision avoidance, Rapier/navmesh, or production mobile controls.
