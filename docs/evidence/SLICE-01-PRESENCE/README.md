# SLICE-01-PRESENCE Evidence

Mission: first embodied 3D visitor presence in a clean-room Museum-shaped Three.js sandbox.

Branch: `codex/slice-01-presence`  
Baseline: `b9cc2c2d781684f1fc81aeedaf02de93af9e16b6`  
Runtime: `npm.cmd run start`, then open `http://127.0.0.1:4173`

## Proved In This Slice

- Three.js runtime renders a navigable Museum-shaped sandbox.
- VisitorPresenceRuntime owns locomotion, acceleration/deceleration, grounding, character radius collision, surface probe, body orientation, and foot contact events.
- WorldState remains the owner of active space/focus/route semantic fields.
- CameraAuthority remains the only camera writer; `PRESENCE_THIRD_PERSON` follows through token commit.
- FootContactEvent alternates left/right and carries surface id/type, speed, stride, locomotion mode, and world position.
- Browser QA includes temporal video, screenshots, runtime diagnostics, and desktop/mobile canvas pixel checks.

## Evidence Index

- Manifest: `EVIDENCE_MANIFEST.md`
- Human review: `HUMAN_REVIEW.md`
- Photographer/designer review: `PHOTOGRAPHER_DESIGNER_REVIEW.md`
- Storyboard: `storyboard/DEMO_STORYBOARD.md`
- Contact sheet: `storyboard/storyboard-contact-sheet.png`
- Screenshots: `screenshots/`
- CDP video: `video/slice-01-cdp-presence.webm`
- Playwright video: `video/slice-01-playwright-presence.webm`
- Diagnostics: `diagnostics/runtime-report.json`, `diagnostics/runtime-report-cdp.json`, `diagnostics/runtime-report-playwright.json`, `diagnostics/invariant-report.json`, `diagnostics/browser-qa-status.json`, `diagnostics/playwright-status.json`
- Critic: `critic/`

## Known Limits

- Abstract capsule avatar only; no final character art or animation graph.
- No Focus, Guided, Museum integration, audio, visual footprints, camera collision avoidance, Rapier/navmesh, jump/crouch/sprint.
- `preserveDrawingBuffer` is enabled only to make canvas pixel QA auditable in this sandbox.
