# SLICE-00-ARCHITECTURE-HARNESS Evidence Manifest

MISSION: `SLICE-00-ARCHITECTURE-HARNESS`  
BRANCH: `codex/slice-00-architecture-harness`  
SHA: recorded in final delivery and GitHub branch HEAD.  
CAPTURE DATE: 2026-08-16  
RUNTIME / LAUNCH METHOD: `npm.cmd run start`, then open `http://127.0.0.1:4173`  
CAPTURE ENVIRONMENT: Windows, Node `v24.14.1`, npm `11.14.1` via `npm.cmd`  
CAPTURE TOOL: Microsoft Edge headless via Chrome DevTools Protocol, FFmpeg for WebM assembly, and Playwright as an authorized external local QA tool  
PLAYWRIGHT STATUS: PASS via external local tool; see `diagnostics/playwright-status.json`

## Evidence Files

| Evidence file | Claim proved | Type | Limitations |
| --- | --- | --- | --- |
| `screenshots/01-runtime.png` | Runtime loads; gallery-shaped sandbox and diagnostics render. | OBSERVED | Static screenshot only. |
| `screenshots/02-visitor-state.png` | Input begins and VisitorState updates position/velocity. | OBSERVED | Captured during simple forward movement only. |
| `screenshots/03-camera-authority.png` | CameraAuthority owner and one camera write are visible. | OBSERVED | Does not prove final camera feel. |
| `screenshots/04-space-transition.png` | Doorway traversal reaches Gallery B / Bay and activeSpaceId changes. | OBSERVED | Schematic space model. |
| `screenshots/05-proximity.png` | Visitor position drives nearest hotspot resolution. | OBSERVED | Hotspot positions are placeholder records. |
| `screenshots/06-action-dispatch.png` | Activating hotspot logs semantic FOCUS_ENTITY action. | OBSERVED | Focus camera is intentionally not implemented. |
| `screenshots/07-invariants.png` | Invariant diagnostic panel reports PASS. | OBSERVED | Static view of latest report. |
| `screenshots/08-mobile-viewport.png` | Mobile viewport renders without horizontal overflow obvious in capture. | OBSERVED | Not a physical-device performance claim. |
| `video/slice-00-primary-demo.webm` | Temporal flow: load, movement, active space/proximity setup, activation, release. | OBSERVED | Headless capture; not a human feel judgment. |
| `video/slice-00-playwright-demo.webm` | Same representative browser flow captured through Playwright. | OBSERVED | Uses external local Playwright package; Playwright is not a repo dependency. |
| `storyboard/storyboard-contact-sheet.png` | Fast visual audit of the representative states. | OBSERVED | Contact sheet composed from real screenshots. |
| `diagnostics/runtime-report.json` | FPS/frame time, fixed steps, camera owner/writes, visitor/world/proximity/action state. | MEASURED | Edge headless conditions, not product performance benchmark. |
| `diagnostics/invariant-report.json` | WorldState no-camera, one camera writer, projection, proximity, action path. | MEASURED | Invariants are Slice 0-specific. |
| `diagnostics/browser-qa-status.json` | Edge CDP browser QA status. | MEASURED | CDP script is custom, not Playwright. |
| `diagnostics/playwright-status.json` | Playwright automation PASS status and external tool source. | MEASURED | Tool source is local and external to this repo; no dependency was added. |

## Metrics Observed

- Desktop average FPS: 60
- Desktop average frame time: 16.67 ms
- Desktop fixed-step count in QA run: 298
- Camera writes/frame: 1
- Camera authority violations: 0
- Proximity candidates in final desktop state: 1
- Browser console errors recorded by CDP harness: 0
- Browser console errors recorded by Playwright harness: 0
- Video frames captured before encoding: 57
