# SLICE-00-ARCHITECTURE-HARNESS — HUMAN REVIEW

## Identity

- Mission: `SLICE-00-ARCHITECTURE-HARNESS`
- Branch: `codex/slice-00-architecture-harness`
- SHA: recorded in final delivery and GitHub branch HEAD.
- Working directory: `C:\Users\temp123\.codex\visualizations\2026\08\15\01a00738-9d74-7ab0-aed7-17d82d5e95cb\visitor-locomotion-immersive-worlds`
- Runtime URL / local launch command: run `npm.cmd run start`, then open `http://127.0.0.1:4173`

## What changed

- Added a clean-room Slice 0 runtime harness.
- Added minimal gallery-shaped sandbox with Gallery A, doorway, Gallery B/Bay, artwork placeholders, and sculpture obstacle placeholder.
- Added RuntimeLoop, input intents, WorldState-compatible model, VisitorState projection, CameraAuthority, ExploreThirdPersonController, ProximitySystem, ActionDispatch, diagnostics, test scripts, and evidence capture scripts.
- Added evidence package with screenshots, video, contact sheet, diagnostics, photographer review, critic files, implementation record, and this human review package.

## What Juanma should test

1. Launch the app and confirm diagnostics appear.
2. Move with `WASD` or arrow keys and cross the doorway from Gallery A to Gallery B/Bay.
3. Approach or use the QA evidence path for the Gallery B artwork and activate with `E` / `Enter`.
4. Confirm diagnostics show camera owner, one camera write, activeSpaceId, nearestHotspotId, focusedEntityId, and last action.

## Controls

- `WASD` / arrow keys: move.
- Mouse drag: look/yaw.
- `E` / `Enter`: activate nearest hotspot.
- `Esc`: release focus request state.

## Recommended demo path

1. Start in Gallery A.
2. Hold `W` until passing the doorway.
3. Review `activeSpaceId`.
4. Approach the artwork hotspot in Gallery B/Bay.
5. Press `E`.
6. Verify `last action = FOCUS_ENTITY -> artwork.b-01`.
7. Press `Esc`.
8. Verify `focusedEntityId = null` and invariant panel stays PASS.

## Expected behavior

- Camera owner remains `EXPLORE_THIRD_PERSON`.
- Camera writes stay at `1`.
- `activeSpaceId` changes from `gallery-a` to `doorway`/`gallery-b`.
- `nearestHotspotId` resolves only from visitor position and active space.
- Action dispatch updates WorldState focus; VisitorState only projects it.

## Known issues / limitations

- Schematic 2D/canvas visualization, not final Museum 3D rendering.
- No final movement feel, avatar, animation, footprints, audio, camera collision, Focus camera, Guided route, Museum integration, Rapier, or navmesh.
- Mobile viewport was checked in Edge emulation only; no physical-device claim.
- Playwright is not installed as a project dependency. After explicit permission, `scripts/qa-slice-00.mjs` was rerun with an external local Playwright package and now records PASS in `diagnostics/playwright-status.json`.
- Edge temporary profile and screencast frames are ignored and not part of the published review package.

## Evidence index

- Storyboard: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/storyboard/DEMO_STORYBOARD.md`
- Contact sheet: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/storyboard/storyboard-contact-sheet.png`
- Screenshots: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/screenshots/`
- Video: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/video/slice-00-primary-demo.webm`
- Diagnostics: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/diagnostics/`
- Evidence manifest: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/EVIDENCE_MANIFEST.md`

## Critic verdict

- Verdict: KEEP after post-adjust critic review. First critic pass was ADJUST; builder addressed the in-scope issues and reran QA.
- Critic file: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/critic/CRITIC_VERDICT.md`
- Post-adjust critic file: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/critic/CRITIC_VERDICT_POST_ADJUST.md`
- Builder response: `docs/evidence/SLICE-00-ARCHITECTURE-HARNESS/critic/BUILDER_RESPONSE_TO_CRITIC.md`

## Decisions needed from Juanma

- Decide whether Slice 0 is accepted as the architecture harness baseline for Slice 1.
- Decide whether the schematic canvas harness is sufficient as the R&D proving surface or whether Slice 1 should move immediately to Three.js rendering.
- Decide whether to authorize Slice 1 Presence.

## Human verdict

- APPROVED / ADJUST / REJECTED / PENDING
- Notes:
