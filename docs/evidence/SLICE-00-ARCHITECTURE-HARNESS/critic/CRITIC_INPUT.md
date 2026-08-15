# Critic Input

Mission: `SLICE-00-ARCHITECTURE-HARNESS`

Evaluate only observable Slice 0 output. Do not judge final locomotion feel, avatar fidelity, footprints, Focus camera, Guided mode, or Museum integration because those are explicitly out of scope.

Acceptance criteria to check:

- Isolated repo/branch.
- Clean-room Museum-compatible contracts.
- Explicit update order.
- One camera writer per frame.
- VisitorState does not own WorldState semantics.
- activeSpaceId can change without duplication.
- Proximity derives from visitor position.
- Semantic action dispatch works.
- ExploreThirdPersonController operates under CameraAuthority.
- Diagnostics make ownership visible.
- Browser runtime works.
- Console has no unexplained critical errors.
- Evidence package, storyboard, screenshots, video, diagnostics, implementation record, and human review exist.

Evidence to inspect:

- `diagnostics/runtime-report.json`
- `diagnostics/invariant-report.json`
- `storyboard/storyboard-contact-sheet.png`
- `video/slice-00-primary-demo.webm`
- `screenshots/`

