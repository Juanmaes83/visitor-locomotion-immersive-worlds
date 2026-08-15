# SLICE-00-ARCHITECTURE-HARNESS Evidence

Mission: prove that a clean-room Visitor Runtime can exist under Immersive Worlds-style ownership contracts before Slice 1 presence/feel work.

Branch: `codex/slice-00-architecture-harness`  
Starting SHA: `8145a38d55eff0faeb2b58ad8d169df0ee220400`  
Ending SHA: recorded in final delivery and GitHub branch HEAD.
Runtime: static app at repository root, launched with `npm.cmd run start`  
Local URL while server is active: `http://127.0.0.1:4173`

## What This Proves

- Runtime loop has explicit order and fixed-step capability.
- DOM/raw input is translated into intent fields before locomotion.
- VisitorState projects WorldState fields instead of owning Museum semantics.
- CameraAuthority owns camera transform and enforces one writer per frame.
- ExploreThirdPersonController exists as a separate authority-registered controller.
- activeSpaceId changes when the visitor crosses the doorway.
- Proximity is derived from visitor position and active space.
- Activating nearest hotspot dispatches a semantic action and requests focus state.
- Diagnostics expose frame metrics, ownership, camera owner, visitor state, WorldState projection, proximity, actions, and invariants.

## Evidence Index

- Manifest: `EVIDENCE_MANIFEST.md`
- Human review: `HUMAN_REVIEW.md`
- Photographer/designer review: `PHOTOGRAPHER_DESIGNER_REVIEW.md`
- Storyboard: `storyboard/DEMO_STORYBOARD.md`
- Contact sheet: `storyboard/storyboard-contact-sheet.png`
- Screenshots: `screenshots/`
- Video: `video/slice-00-primary-demo.webm`, `video/slice-00-playwright-demo.webm`
- Diagnostics: `diagnostics/runtime-report.json`, `diagnostics/invariant-report.json`
- Critic: `critic/CRITIC_INPUT.md`, `critic/CRITIC_VERDICT.md`

## Known Limits

- The visual sandbox is deliberately schematic and 2D/canvas-based for Slice 0 clarity. It is not final Museum rendering.
- No final locomotion feel, jump, crouch, sprint, avatar animation, footprints, footstep audio, camera collision, Focus camera, Guided mode, Museum integration, Rapier, or navmesh.
- Playwright is not a project dependency. After explicit tool permission, the QA script was rerun using an external local Playwright package and recorded PASS in `diagnostics/playwright-status.json`.
- Edge's temporary browser profile is ignored and not part of the published evidence package.
