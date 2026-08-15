# SLICE-00 Demo Storyboard

| Frame | Intent | Expected state | Actual state | Evidence file | Known issue |
| --- | --- | --- | --- | --- | --- |
| 01 | Runtime loaded / gallery overview | App loads; Gallery A visible; diagnostics visible. | Loaded in Edge CDP. | `../screenshots/01-runtime.png` | Schematic visual only. |
| 02 | Visitor at rest in Gallery A | Visitor position visible; activeSpaceId `gallery-a`. | Diagnostics show `gallery-a`. | `../screenshots/01-runtime.png` | None for Slice 0. |
| 03 | Input begins / visitor moves | Position/velocity update from input intents. | Visitor moves through keyboard input. | `../screenshots/02-visitor-state.png` | Basic walk only. |
| 04 | VisitorState updates | VisitorState changes without owning WorldState fields. | Diagnostics show visitor position/velocity. | `../screenshots/02-visitor-state.png` | No final locomotion feel. |
| 05 | CameraAuthority shows one owner | Owner is `EXPLORE_THIRD_PERSON`; writes/frame = 1. | Diagnostics show one owner/write. | `../screenshots/03-camera-authority.png` | No advanced camera collision. |
| 06 | Doorway crossing | Visitor reaches doorway and Gallery B/Bay. | Scene shows visitor at boundary/Bay. | `../screenshots/04-space-transition.png` | Schematic doorway only. |
| 07 | activeSpaceId changes | WorldState source changes to `gallery-b`; VisitorState projects it. | Runtime report final state shows `gallery-b`. | `../diagnostics/runtime-report.json` | Screenshot view is compact. |
| 08 | Approach artwork/hotspot | Proximity receives visitor position. | Nearest hotspot resolves around B artwork. | `../screenshots/05-proximity.png` | Position set deterministically by QA script for stable capture. |
| 09 | nearestHotspotId resolves | `nearestHotspotId = hotspot.artwork.b-01`. | Diagnostics show `hotspot.artwork.b-01`. | `../screenshots/05-proximity.png` | None for Slice 0. |
| 10 | Activate | E/Enter dispatches nearest hotspot action. | Action log receives `FOCUS_ENTITY`. | `../screenshots/06-action-dispatch.png` | Focus visual is intentionally absent. |
| 11 | Semantic action dispatch logged | `last action = FOCUS_ENTITY -> artwork.b-01`. | Runtime report logs action. | `../diagnostics/runtime-report.json` | None for Slice 0. |
| 12 | Focus request state | `focusedEntityId = artwork.b-01`. | Screenshot 06 shows focused entity state. | `../screenshots/06-action-dispatch.png` | No Focus camera. |
| 13 | Return to free exploration state | Escape dispatches release and focus becomes null. | Runtime report final state has `focusedEntityId = null`. | `../diagnostics/runtime-report.json` | Visual return is state-only. |
| 14 | Invariant diagnostic PASS | All Slice 0 invariants pass. | `invariant-report.json` ok true. | `../screenshots/07-invariants.png` | None. |

Contact sheet: `storyboard-contact-sheet.png`  
Video: `../video/slice-00-primary-demo.webm`

