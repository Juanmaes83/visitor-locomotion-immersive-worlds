# SLICE-01-PRESENCE Evidence Manifest

MISSION: `SLICE-01-PRESENCE`  
BRANCH: `codex/slice-01-presence`  
BASELINE: `b9cc2c2d781684f1fc81aeedaf02de93af9e16b6`  
SHA: recorded in final delivery and GitHub branch HEAD.  
CAPTURE DATE: 2026-08-16  
RUNTIME: `npm.cmd run start`, `http://127.0.0.1:4173`  
CAPTURE TOOLS: Microsoft Edge headless via CDP, FFmpeg, Playwright external local tool  
DEPENDENCY ADDED: `three`

## Evidence Files

| Evidence file | Claim proved | Type | Limitations |
| --- | --- | --- | --- |
| `screenshots/01-runtime-3d.png` | Three.js sandbox loads and diagnostics render. | OBSERVED | Initial idle state. |
| `screenshots/02-locomotion-grounding.png` | Visitor moves through 3D space while grounded. | OBSERVED | Headless browser capture. |
| `screenshots/03-foot-contact-surface.png` | Foot contact and surface diagnostics are visible after traversal. | OBSERVED | Abstract foot blocks, not final animation. |
| `screenshots/04-collision-camera.png` | Character collision route and CameraAuthority diagnostics. | OBSERVED | No camera obstruction yet. |
| `screenshots/05-mobile-viewport.png` | Mobile viewport renders with diagnostics and controls. | OBSERVED | Emulated viewport, not physical device. |
| `video/slice-01-cdp-presence.webm` | Temporal movement, foot contact accumulation, collision route. | OBSERVED | Headless capture. |
| `video/slice-01-playwright-presence.webm` | Same representative flow captured by Playwright. | OBSERVED | Uses external local Playwright package; no repo dependency. |
| `storyboard/storyboard-contact-sheet.png` | Fast visual audit of representative states. | OBSERVED | Composed from real screenshots. |
| `diagnostics/runtime-report.json` | Aggregated CDP + Playwright reports. | MEASURED | Headless browser metrics only. |
| `diagnostics/runtime-report-cdp.json` | CDP FPS, visitor state, camera state, foot contacts, collision metrics, pixel checks. | MEASURED | Custom CDP harness. |
| `diagnostics/runtime-report-playwright.json` | Playwright FPS, visitor state, camera state, foot contacts, collision metrics. | MEASURED | External local Playwright package. |
| `diagnostics/invariant-report.json` | Slice 1 invariant status. | MEASURED | Slice-specific checks. |
| `diagnostics/browser-qa-status.json` | CDP browser QA status, video and pixel checks. | MEASURED | Custom CDP script. |
| `diagnostics/playwright-status.json` | Playwright QA status. | MEASURED | External local tool path. |

## Metrics Observed

- CDP browser QA: PASS
- CDP video frames: 250
- CDP desktop average FPS: 60
- CDP canvas pixel checks: PASS desktop initial, desktop final, mobile
- Playwright QA: PASS
- Playwright average FPS: 53
- Playwright console errors: 0
