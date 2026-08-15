# Photographer / Designer Review

Role: evidence photographer/designer pass after builder candidate.  
Runtime opened: `http://127.0.0.1:4173` through Microsoft Edge headless CDP and Codex browser panel.  
Viewport coverage: desktop 1440x900, mobile 390x844.  
Evidence principle: representative, not advertising.

## Captured States

- Runtime loaded: `screenshots/01-runtime.png`
- Visitor state / movement: `screenshots/02-visitor-state.png`
- Camera authority: `screenshots/03-camera-authority.png`
- Space transition: `screenshots/04-space-transition.png`
- Proximity: `screenshots/05-proximity.png`
- Action dispatch: `screenshots/06-action-dispatch.png`
- Invariants: `screenshots/07-invariants.png`
- Mobile viewport: `screenshots/08-mobile-viewport.png`
- Contact sheet: `storyboard/storyboard-contact-sheet.png`
- Video: `video/slice-00-primary-demo.webm`

## Visual Findings

- KEEP: Diagnostics are readable on desktop and expose the right ownership fields.
- KEEP: Gallery A, doorway, Gallery B/Bay, artworks, sculpture placeholder, visitor, camera line, and hotspot radius are distinguishable.
- KEEP: Contact sheet makes the system reviewable quickly.
- ADJUST LATER: This is not a final 3D/premium visual style; it is a schematic harness.
- ADJUST LATER: Mobile viewport is readable enough for Slice 0, but the diagnostics panel consumes much of the screen.

## Evidence Defects Found And Fixed

- Initial proximity screenshot showed `SEMANTIC-ACTION-PATH` as FAIL before activation. That was misleading because the action path was armed but not yet dispatched. The invariant was corrected to pass when a nearest hotspot has a dispatchable semantic action, and browser QA was rerun.
- Fresh critic then asked for a stronger distinction between an armed action and a dispatched action. Telemetry now reports `SEMANTIC-ACTION-ARMED` and `SEMANTIC-ACTION-DISPATCHED` separately when dispatch has occurred.
