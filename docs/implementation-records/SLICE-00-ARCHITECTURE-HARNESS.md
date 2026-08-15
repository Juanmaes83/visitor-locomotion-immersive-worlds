# SLICE-00-ARCHITECTURE-HARNESS — IMPLEMENTATION RECORD

## A. Mission

- Mission: `SLICE-00-ARCHITECTURE-HARNESS`
- Requested outcome: build the first executable clean-room architecture harness proving Visitor Runtime can exist under Immersive Worlds-style authorities.
- Acceptance criteria: explicit update order, one camera writer, VisitorState projection, activeSpace transition, proximity from visitor position, semantic action dispatch, diagnostics, browser runtime, evidence, storyboard, critic, implementation record, human review.
- Starting branch: `codex/archaeology-visitor-presence-engine-v1`
- Starting SHA: `8145a38d55eff0faeb2b58ad8d169df0ee220400`
- Starting `git status`: clean
- Implementation branch: `codex/slice-00-architecture-harness`
- Ending SHA: recorded in final delivery and GitHub branch HEAD.
- Protected baselines: donors read-only; no Museum/Sakura/District/Escaparates/Claude modifications.
- Explicit human gates: no PR, no merge, no Slice 1, no Museum integration.

## B. Architecture / Donors

| Donor | File | Capability | Action | Why | Rejected |
| --- | --- | --- | --- | --- | --- |
| Museum / Escaparates Pro | `engine/camera/camera-authority.js` | one camera authority and write token invariant | REIMPLEMENT CLEANLY | Slice 0 needs compatible contract without importing Museum. | Full transition machinery and Focus/Directed controllers. |
| Museum / Escaparates Pro | `engine/interaction/proximity.js` | visitor position -> hotspot proximity | REIMPLEMENT CLEANLY | Same ownership model: proximity observes visitor, does not own camera. | Full Hotspot states/lifecycle complexity. |
| Museum / Escaparates Pro | `engine/interaction/action-dispatch.js` | closed semantic action path | REIMPLEMENT CLEANLY | Proves activate nearest -> semantic dispatch. | Full action vocabulary. |
| Museum / Escaparates Pro | `engine/world/world-state.js` | WorldState not camera; activeSpace/focus/route fields | REIMPLEMENT CLEANLY | VisitorState must project, not own semantics. | Store/graph/lifecycle integration. |
| Claude-of-Duty | `src/core/engine.js` | explicit loop order and fixed-step accumulator | ADAPT CONCEPT | Proves sequencing and deterministic-enough fixed update. | Registry, Three scene ownership, subsystem engine wholesale copy. |
| Claude-of-Duty | `src/player/movement.js` | simple kinematic movement owned outside camera | ADAPT CONCEPT | Slice 0 needs minimal position/velocity/grounded. | Sprint/jump/crouch/slide/mantle/feel. |
| Museum / Escaparates Pro | `app/ui/input.js` | raw input -> abstract snapshot | ADAPT CONCEPT | DOM key/pointer separated from locomotion. | Full touch system and detail navigation. |

Provenance/license notes: no donor code was copied wholesale. The Slice 0 modules are clean-room implementations of documented contracts and previously inspected patterns.

Architecture decisions:

- Runtime is static and dependency-free for Slice 0.
- Visualization is schematic canvas, not final Three.js/Museum rendering.
- CameraAuthority owns camera pose; ExploreThirdPersonController writes only via token.
- WorldState owns `activeSpaceId`, `focusedEntityId`, `activeRouteId`, `activeStepId`.
- VisitorState mirrors/project fields for diagnostics only.

## C. How It Was Implemented

Files created:

- `index.html`
- `package.json`
- `src/slice-00/*`
- `scripts/verify-slice-00.mjs`
- `scripts/serve-slice-00.mjs`
- `scripts/qa-slice-00.mjs`
- `scripts/browser-qa-slice-00.mjs`
- `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/*`

Update order:

1. `input.beginFrame`
2. `runtime.fixedUpdate`
3. `worldState.update`
4. `visitorRuntime.update`
5. `proximity.update`
6. `cameraAuthority.update`
7. `telemetry.sample`
8. `renderer.render`
9. `input.endFrame`

State ownership:

| Mutable state | Owner | Readers | Writers | Source of truth |
| --- | --- | --- | --- | --- |
| visitor position | VisitorRuntime | Camera, Proximity, Renderer, Telemetry | VisitorRuntime | VisitorRuntime |
| visitor velocity | VisitorRuntime | Telemetry, Diagnostics | VisitorRuntime | VisitorRuntime |
| grounded | VisitorRuntime | Telemetry, Diagnostics | VisitorRuntime | VisitorRuntime |
| locomotionMode | VisitorRuntime | Telemetry, Diagnostics | VisitorRuntime | VisitorRuntime |
| camera transform | CameraAuthority | Renderer, Telemetry | active camera controller via token | CameraAuthority |
| camera authority | CameraAuthority | Diagnostics, Telemetry | CameraAuthority.request/register | CameraAuthority |
| activeSpaceId | WorldState | VisitorState, Proximity, Diagnostics | WorldState.setActiveSpace | WorldState |
| focusedEntityId | WorldState | VisitorState, Diagnostics | ActionDispatch | WorldState |
| activeRouteId | WorldState | VisitorState, Diagnostics | none in Slice 0 | WorldState |
| activeStepId | WorldState | VisitorState, Diagnostics | none in Slice 0 | WorldState |
| nearestHotspotId | ProximitySystem | VisitorState, Diagnostics, ActionDispatch | ProximitySystem | ProximitySystem |

Algorithms/math:

- Fixed-step accumulator at 60 Hz, max 5 substeps.
- Minimal kinematic movement from input intents in yaw basis.
- Bounds/doorway/plinth collision clamps for sandbox-only walkable area.
- Hotspot nearest query by Euclidean X/Z distance in active space.
- Third-person camera pose from visitor yaw, target, distance, and height.
- CameraAuthority write token rejects stale/non-authoritative/double writes.

Runtime/build changes:

- `npm.cmd run build` runs contract verification.
- `npm.cmd run start` serves static runtime with Node HTTP server.
- `npm.cmd run qa:browser` captures Edge CDP screenshots/video/diagnostics.

## D. Problems Encountered

### Problem 1

- PROBLEM: `npm --version` failed in PowerShell.
- SYMPTOM: `npm.ps1` blocked by execution policy.
- WHERE / WHEN: environment safety check.
- CLASSIFICATION: PROCESS BUG
- ROOT CAUSE: known; PowerShell script execution policy blocks npm shim.
- ATTEMPTS MADE: retried with `npm.cmd --version`.
- WHAT FAILED: direct `npm --version`.
- WHAT WORKED: `npm.cmd --version`.
- FINAL FIX / CURRENT MITIGATION: use `npm.cmd` in all commands/docs.
- REGRESSION CHECK: `npm.cmd run build` and `npm.cmd run qa:browser` pass.
- REUSABLE LEARNING: On this Windows setup, prefer `npm.cmd` from Codex.

### Problem 2

- PROBLEM: Node test failed because core input module assumed `window`.
- SYMPTOM: `ReferenceError: window is not defined`.
- WHERE / WHEN: first `npm.cmd run build`.
- CLASSIFICATION: SYSTEM BUG
- ROOT CAUSE: known; `InputIntents` constructor default used browser global.
- ATTEMPTS MADE: changed default to `globalThis`, guarded attach/detach for non-browser.
- WHAT FAILED: Node import before browser runtime.
- WHAT WORKED: environment-neutral input class.
- FINAL FIX / CURRENT MITIGATION: `InputIntents` is testable in Node.
- REGRESSION CHECK: `npm.cmd run build` passes.
- REUSABLE LEARNING: Slice 0 core modules must not assume DOM at import/constructor time.

### Problem 3

- PROBLEM: Playwright package was not available.
- SYMPTOM: `ERR_MODULE_NOT_FOUND` importing `playwright`.
- WHERE / WHEN: `npm.cmd run qa:slice-00`.
- CLASSIFICATION: INSTRUMENT BUG
- ROOT CAUSE: known; repo has no Playwright dependency and no local package.
- ATTEMPTS MADE: recorded `playwright-status.json`; did not install. After explicit user permission, added `PLAYWRIGHT_MODULE_PATH` fallback and reran the harness using an existing local Playwright package outside this repo.
- WHAT FAILED: initial bare package import.
- WHAT WORKED: installed Microsoft Edge controlled directly through CDP; external local Playwright package loaded through explicit environment path.
- FINAL FIX / CURRENT MITIGATION: `browser-qa-slice-00.mjs` uses Edge CDP without project dependency; `qa-slice-00.mjs` can use an external Playwright tool path without adding dependencies.
- REGRESSION CHECK: `npm.cmd run qa:browser` passes; external Playwright harness passes with invariants OK and zero console errors.
- REUSABLE LEARNING: CDP can provide dependency-free browser evidence when Playwright is not approved; `PLAYWRIGHT_MODULE_PATH` can verify with local tooling without contaminating project dependencies.

### Problem 4

- PROBLEM: First CDP connection targeted browser endpoint, not page endpoint.
- SYMPTOM: `'Page.enable' wasn't found`.
- WHERE / WHEN: first `npm.cmd run qa:browser`.
- CLASSIFICATION: INSTRUMENT BUG
- ROOT CAUSE: known; `/json/version` returns browser WebSocket, not page target.
- ATTEMPTS MADE: switched to `/json/list` and selected `type === "page"`.
- WHAT FAILED: browser-level CDP connection.
- WHAT WORKED: page-level target connection.
- FINAL FIX / CURRENT MITIGATION: script connects to page target.
- REGRESSION CHECK: Edge CDP captures screenshots/video and diagnostics.
- REUSABLE LEARNING: Page domain commands require page target WebSocket.

### Problem 5

- PROBLEM: Pre-activation diagnostic showed semantic action path as FAIL.
- SYMPTOM: contact sheet proximity frame displayed red `FAIL SEMANTIC-ACTION-PATH`.
- WHERE / WHEN: photographer/designer review.
- CLASSIFICATION: EVIDENCE BUG
- ROOT CAUSE: known; invariant only considered dispatched actions, not armed dispatchable hotspot.
- ATTEMPTS MADE: changed invariant to pass if nearest hotspot has semantic action or an action has already dispatched.
- WHAT FAILED: original invariant wording.
- WHAT WORKED: "armed or dispatched" invariant.
- FINAL FIX / CURRENT MITIGATION: telemetry now reports `armed=FOCUS_ENTITY` before activation and `actions=2` after.
- REGRESSION CHECK: browser QA and contact sheet regenerated; no red FAIL in main sequence.
- REUSABLE LEARNING: Evidence diagnostics must distinguish "not yet exercised" from "broken".

### Problem 6

- PROBLEM: Fresh critic found overclaimed or brittle evidence after the first pass.
- SYMPTOM: Critic verdict was ADJUST, citing update-order overclaim, mutable VisitorState mirrors, weak action invariant, Playwright non-green artifact, and noisy Edge profile evidence.
- WHERE / WHEN: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/critic/CRITIC_VERDICT.md`.
- CLASSIFICATION: PROCESS BUG / EVIDENCE BUG
- ROOT CAUSE: known; first implementation proved behavior but documentation/instrumentation still blurred ownership and evidence boundaries.
- ATTEMPTS MADE: moved `WorldState.setActiveSpace` out of VisitorRuntime into runtime phase; changed VisitorState semantic projection to private field plus getters; split action invariant into armed and dispatched checks; moved future Edge profiles to `.tmp`; documented Playwright as blocked, not passed.
- WHAT FAILED: treating first critic pass as close enough would have carried ambiguous evidence into Slice 1.
- WHAT WORKED: local fixes plus build/browser QA rerun.
- FINAL FIX / CURRENT MITIGATION: post-critic adjustments applied in runtime, telemetry, scripts, docs, and ignores.
- REGRESSION CHECK: `npm.cmd run build` PASS; `npm.cmd run qa:browser` PASS.
- REUSABLE LEARNING: Critic ADJUST should produce a builder response and re-QA before handoff.

## E. QA Performed

### Functional QA

- Tests: `npm.cmd run build`
- Result: PASS. Verified active space change, VisitorState projection, proximity, action dispatch, focus request/release state, no camera state in WorldState, camera owner, no camera violations, double write detection.

### Visual QA

- Method: Microsoft Edge headless CDP screenshots and contact sheet.
- Result: PASS for Slice 0 reviewability.

### Feel QA

- Method: limited manual/browser visual path; no premium feel judged.
- Result: N/A for final feel. Basic movement is sufficient to drive ownership/proximity evidence.

### Temporal / Instrumented QA

- Metrics: average FPS 60 desktop, frame time 16.67 ms, fixed-step count 298, camera writes/frame 1, proximity candidates final state 1, browser console errors 0, video frames 57.
- Method/instrument: Edge CDP runtime report and screencast; FFmpeg WebM assembly.
- Result: PASS.
- Instrument limitations: headless browser metrics are not physical-device performance.

## F. Photographer / Storyboard

- Photographer/Designer role: performed and recorded in `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/PHOTOGRAPHER_DESIGNER_REVIEW.md`.
- Capture environment: Microsoft Edge headless via CDP.
- Runtime URL / launch method: `npm.cmd run start`, `http://127.0.0.1:4173`.
- Viewports/devices: desktop 1440x900; mobile emulation 390x844.
- Storyboard: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/storyboard/DEMO_STORYBOARD.md`.
- Contact sheet: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/storyboard/storyboard-contact-sheet.png`.
- Screenshots: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/screenshots/`.
- Video: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/video/slice-00-primary-demo.webm`.
- Before/after: N/A; first executable slice.
- Missing evidence + reason: Playwright trace absent because Slice 0 records screenshots/video/status JSON rather than trace packaging; Playwright browser automation itself now passes through an external local tool.

## G. Critic

- Critic role/agent: fresh/amnesiac critic subagent requested.
- Fresh/amnesiac context used: YES.
- Quality bar/reference: Slice 0 acceptance criteria and evidence paths only.
- Critic input path: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/critic/CRITIC_INPUT.md`.
- Verdict: ADJUST on first pass; KEEP on post-adjust pass.
- Evidence cited: see `critic/CRITIC_VERDICT.md` and `critic/CRITIC_VERDICT_POST_ADJUST.md`.
- Required adjustments: update-order precision, Playwright wording, VisitorState projection hardening, action invariant hardening, Edge profile noise.
- Re-loop executed: YES; fixes applied and build/browser QA rerun. See `critic/BUILDER_RESPONSE_TO_CRITIC.md`.

## H. Human Status

- Human Review path: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/HUMAN_REVIEW.md`.
- Juanma verdict: PENDING.
- Explicit decisions: accept Slice 0 baseline, decide Slice 1 authorization, decide whether Slice 1 should move to Three.js rendering.
- Remaining questions: none blocking Slice 0 audit.

## I. Final State

- Ending branch: `codex/slice-00-architecture-harness`
- Ending SHA: recorded in final delivery and GitHub branch HEAD.
- Ending `git status`: to be recorded after final commit.
- Exact files changed: see final delivery and git commit.
- Known limitations: schematic harness, no final feel/avatar/footprints/audio/camera collision/Focus/Guided/Museum/Rapier.
- Rollback point: `8145a38d55eff0faeb2b58ad8d169df0ee220400`
- Next safe action: human audit by Juanma + ChatGPT; do not start Slice 1 until authorized.

## J. Learning Promotion

- npm PowerShell shim issue: PROJECT-SPECIFIC LEARNING.
- DOM-free core modules for testability: VISITOR-ENGINE REUSABLE LEARNING.
- CDP browser QA fallback when Playwright unavailable: VISITOR-ENGINE REUSABLE LEARNING; PLAYBOOK PROMOTION CANDIDATE.
- External local Playwright fallback through `PLAYWRIGHT_MODULE_PATH`: VISITOR-ENGINE REUSABLE LEARNING; useful when Playwright exists on the workstation but must not become a repo dependency.
- Page target vs browser target for CDP: LOCAL IMPLEMENTATION DETAIL.
- Armed vs dispatched invariant distinction: IMMERSIVE-WORLDS REUSABLE LEARNING; PLAYBOOK PROMOTION CANDIDATE.
- Critic ADJUST re-loop response: GENERIC PLAYBOOK CANDIDATE.
