# SLICE-01-PRESENCE — IMPLEMENTATION RECORD

## A. Mission

- Mission: `SLICE-01-PRESENCE`
- Baseline: `b9cc2c2d781684f1fc81aeedaf02de93af9e16b6`
- Branch: `codex/slice-01-presence`
- Starting status: clean after removing untracked temporary Playwright page videos from prior Slice 0 evidence.
- Ending SHA: recorded in final delivery and GitHub branch HEAD.
- Protected baselines: Slice 0, donors, Museum/Sakura/District/Claude.

## B. Architecture / Donors

| Donor | Capability | Action |
| --- | --- | --- |
| Slice 0 | WorldState projection, CameraAuthority token contract, update order, diagnostics pattern | DIRECT REUSE / EXTEND |
| Museum | authority/state/proximity separation | CLEAN-ROOM COMPATIBLE CONTRACT |
| Sakura | acceleration/deceleration, AABB push-out, grounding by height/surface query | ADAPT CONCEPT |
| Claude / Best-in-Family map | fixed step, surface-aware foot contact event direction | ADAPT CONCEPT |

## C. Implemented

- `src/slice-01/`: Three.js renderer, Museum-shaped world, VisitorPresenceRuntime, PresenceVisitorState, follow camera controller, telemetry.
- `scripts/verify-slice-01.mjs`: functional/instrumented Node checks.
- `scripts/browser-qa-slice-01.mjs`: Edge CDP screenshots, video, contact sheet, desktop/mobile canvas pixel checks.
- `scripts/qa-slice-01.mjs`: Playwright QA with external local tool fallback.
- Evidence package under `docs/evidence/SLICE-01-PRESENCE/`.
- Dependency added: `three`.

## D. QA

- `npm.cmd test`: PASS.
- `npm.cmd run build`: PASS.
- `npm.cmd run qa:browser:slice-01`: PASS, video frames 252, pixel checks PASS.
- Playwright external local QA: PASS, average FPS 51, console errors 0.
- Post-critic rerun: `npm.cmd test` PASS; `npm.cmd run qa:browser` PASS, video frames 250, pixel checks PASS; Playwright PASS, average FPS 53.

## E. Problems / Learning

- Doorway too narrow for character radius: fixed by widening the gap, not shrinking the visitor.
- Idle screenshot showed foot-contact invariant as FAIL before movement: changed to ready/awaiting movement until locomotion evidence exists.
- WebGL pixel checks returned blank with default backbuffer behavior: enabled `preserveDrawingBuffer` for this evidence sandbox.
- Critic found browser collision evidence was not persistent: added `collisionObserved`, `collisionHitCount`, `maxCollisionCorrection`, and made CDP route require observed collision.
- Critic found Playwright overwrote CDP report: split `runtime-report-cdp.json` and `runtime-report-playwright.json`, with `runtime-report.json` as aggregate.
- Critic found `qa:browser` pointed to Slice 0: updated it to Slice 1 and preserved Slice 0 as `qa:browser:slice-00`.
- Post-adjust critic found stale manifest metrics: updated CDP frames to 250 and Playwright average FPS to 53.
- `npm.ps1` remains blocked by PowerShell policy: continue using `npm.cmd`.

## F. Known Limits

- Abstract avatar only.
- Procedural foot contacts, not final animation contacts.
- No visual footprints, audio, Focus, Guided, Museum integration, camera collision avoidance, Rapier/navmesh, or final mobile controls.

## G. Human Status

- Human review path: `docs/evidence/SLICE-01-PRESENCE/HUMAN_REVIEW.md`
- Juanma verdict: PENDING
- Next safe action: audit Slice 1; do not start Slice 2 without explicit approval.
