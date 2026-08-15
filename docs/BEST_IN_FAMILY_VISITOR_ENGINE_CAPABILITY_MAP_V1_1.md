# Best-In-Family Visitor Engine Capability Map V1.1

Status: archaeology gap closure only.  
Target repo: `Juanmaes83/visitor-locomotion-immersive-worlds`  
Target branch: `codex/archaeology-visitor-presence-engine-v1`  
Base V1 commit: `e4e056ccff3001e614d0f65a81fae3b91fbea740`  
Museum source repo/branch: `Juanmaes83/escaparates-pro`, `docs/museum-premium-personalization-platform`

This document does not implement runtime code, add dependencies, edit donors, edit the Playbook, or modify the V1 document. It closes the V1 evidence gaps around Museum ownership, camera authority, guided/focus interaction, visitor state, footprints, and camera collision.

## V1 -> V1.1 Changelog

### KEEP

- Keep the V1 donor families and the overall Visitor Presence Engine goal.
- Keep Sakura / District / Claude / skills / Gauntlet / TheVertMenthe as useful archaeology inputs.
- Keep the "implementation later" boundary: this is still documentation only.
- Keep physics as provisional until implemented and verified in the target sandbox.

### CORRECTED

- Museum is no longer a weak or secondary donor for experience architecture. It is the primary proven source for WorldState, CameraAuthority, Focus, Directed guided mode, Hotspot/Portal separation, ActionDispatch, SpaceLifecycle, and QA invariants.
- Focus camera is not a future VisitorRuntime feature. Museum already proves `FocusController`; VisitorRuntime should only request/handoff focus through existing contracts.
- Guided/free mode is not primarily a District route problem. Museum proves Explore and Guided sharing the same WorldState through `ExperienceDirector`.
- `currentSpace` is not future-only. Museum proves `WorldState.activeSpaceId`; Visitor state should expose it as a projection/reference, not duplicate ownership.
- Interaction and current POI should be expressed through Museum `Hotspot`, `Entity`, `Action`, and spatial `ProximitySystem` first. District POI/view anchors remain secondary inspiration.
- Claude does not prove visual footprints/decals from feet. It proves footstep events, foot contact coordinates, surface sampling, and generic projected decals.
- Claude does not prove third-person camera obstruction. It proves first-person camera feel and general physics queries/capsule sweeps. Third-person obstruction remains a new Visitor Engine capability.

### UPGRADED

- Target architecture is now explicitly subordinate to Immersive Worlds engine authorities: WorldStore, WorldState, SpaceLifecycle, SceneKit, CameraAuthority, ExperienceDirector, Proximity, and ActionDispatch.
- `ExploreThirdPersonController` becomes a new camera controller registered under `CameraAuthority`, not an independent camera system.
- `VisitorRuntime` becomes a locomotion/presence module that feeds visitor position/intents to existing Museum contracts.
- First implementation slices are revised to start with an architecture harness before movement feel.

### DOWNGRADED

- District POI/navigation is downgraded from primary Museum interaction owner to secondary spatial/UX reference.
- Claude decals are downgraded from "footprint proof" to "generic projected decal technique".
- Claude camera is downgraded from "third-person camera collision donor" to "first-person feel + physics query donor".

### NEW EVIDENCE

- `labs/immersive-worlds/engine/camera/camera-authority.js`
- `labs/immersive-worlds/engine/camera/controllers/explore-controller.js`
- `labs/immersive-worlds/engine/camera/controllers/focus-controller.js`
- `labs/immersive-worlds/engine/camera/controllers/directed-controller.js`
- `labs/immersive-worlds/engine/camera/controllers/author-controller.js`
- `labs/immersive-worlds/engine/experience/experience-director.js`
- `labs/immersive-worlds/engine/world/world-state.js`
- `labs/immersive-worlds/engine/world/world-store.js`
- `labs/immersive-worlds/engine/world/space-lifecycle.js`
- `labs/immersive-worlds/engine/world/world-graph.js`
- `labs/immersive-worlds/engine/interaction/proximity.js`
- `labs/immersive-worlds/engine/interaction/action-dispatch.js`
- `labs/immersive-worlds/engine/schema/types.js`
- `labs/immersive-worlds/engine/schema/validate.js`
- `labs/immersive-worlds/app/experience-app.js`
- `labs/immersive-worlds/app/ui/input.js`
- `labs/immersive-worlds/qa/run-qa.mjs`
- Claude: `src/player/camera.js`, `src/player/movement.js`, `src/player/index.js`, `src/physics/index.js`, `src/physics/character.js`, `src/fx/decals.js`

### STILL OPEN

- Third-person avatar/body visual implementation.
- Third-person camera obstruction implementation and QA proof.
- Footprint visual implementation tied to visitor feet/contact state.
- Tap-to-move or authored mobile navigation beyond existing touch walk/look.
- Final Rapier vs custom kinematic decision for the target sandbox.

## Museum Evidence Table

| Museum capability | File / contract | Status | Proven? | Owner | Visitor Engine impact |
| --- | --- | --- | --- | --- | --- |
| Semantic schema vocabulary | `engine/schema/types.js` | Existing implementation | Yes | Schema | Visitor records must use existing Space, Anchor, Entity, Hotspot, Portal, Action, Route vocabulary. |
| Schema invariants | `engine/schema/validate.js` | Existing implementation | Yes | Validator | Do not place render/camera/mesh state in semantic records; keep Hotspot trigger and Portal connection separate. |
| Canonical object registry | `engine/world/world-store.js` | Existing implementation | Yes | WorldStore | VisitorRuntime references canonical records by id; it does not create duplicate POIs/entities. |
| World state | `engine/world/world-state.js` | Existing implementation | Yes | WorldState | `currentSpaceId`, focus, route, visited sets should be projected from WorldState, not re-owned. |
| Space lifecycle | `engine/world/space-lifecycle.js` | Existing implementation | Yes | SpaceLifecycle + SceneKit | Visitor movement must ask active/ready space information; it does not stream rooms itself. |
| World graph | `engine/world/world-graph.js` | Existing implementation | Yes | WorldGraph | VisitorRuntime may consume graph/path results but does not own route topology. |
| SceneKit contract | `engine/scenekit/scene-kit.js` | Existing implementation | Yes | SceneKit | VisitorRuntime consumes `navigationVolume`, `poseForAnchor`, subject/framing measurements; visual realization stays in SceneKit. |
| One camera authority per frame | `engine/camera/camera-authority.js` | Existing implementation | Yes | CameraAuthority | Third-person exploration must be a registered controller; no separate camera writer. |
| First-person Explore | `engine/camera/controllers/explore-controller.js` | Existing implementation | Yes | ExploreController | Proven abstract input, navigation volume, clamped/blocker collision. Third-person is a sibling capability. |
| Focus / detail inspection | `engine/camera/controllers/focus-controller.js` | Existing implementation | Yes | FocusController | VisitorRuntime should request focus through actions/handoff, not rebuild detail camera logic. |
| Directed guided camera | `engine/camera/controllers/directed-controller.js` | Existing implementation | Yes | DirectedController + CameraAuthority | Guided remains under Directed authority; VisitorRuntime should not own guided camera. |
| Author camera separation | `engine/camera/controllers/author-controller.js`, `author.html` | Existing implementation | Yes | AuthorController | Author mode is separate from visitor published experience. |
| Experience orchestration | `engine/experience/experience-director.js` | Existing implementation | Yes | ExperienceDirector | Guided/free transitions, route steps, return pose, and action orchestration belong here. |
| Shared Explore/Guided WorldState | `world-state.js`, `experience-director.js`, QA `SHARED-WORLD-STATE` | Existing implementation | Yes | WorldState + ExperienceDirector | VisitorRuntime feeds position/intents into the same state rather than creating a guided copy. |
| Spatial proximity | `engine/interaction/proximity.js` | Existing implementation | Yes | ProximitySystem | Current POI/nearest artwork should be derived from visitor position and Museum hotspots. |
| Semantic actions | `engine/interaction/action-dispatch.js` | Existing implementation | Yes | ActionDispatch | Activate/focus/open/start-route intents should dispatch declared actions. |
| Mobile walk/look controls | `app/ui/input.js`, README controls | Existing implementation | Yes | InputSystem | Existing touch uses left-half movement and right-half look; tap-to-move remains new/future. |
| QA architectural probe | `app/experience-app.js`, `qa/run-qa.mjs` | Existing implementation | Yes | QA harness | Slice 0 must reproduce these invariant checks before adding feel-heavy movement. |

## Corrected Target Architecture

VisitorRuntime should sit inside the Immersive Worlds runtime boundary:

```text
Immersive Worlds Engine
  WorldStore / WorldState / WorldGraph / SpaceLifecycle
  SceneKit measurement + presentation contract
  CameraAuthority
    AuthorController              existing
    ExploreController             existing first-person
    ExploreThirdPersonController  new
    FocusController               existing
    DirectedController            existing
  ExperienceDirector              existing
  ProximitySystem + ActionDispatch existing
  VisitorRuntime                  new
    input intent bridge
    locomotion / grounding / character collision
    body presence / foot contact / surface response
    third-person camera adapter registered with CameraAuthority
    VisitorState projection from WorldState + locomotion telemetry
    evidence telemetry
```

Key rule: VisitorRuntime owns visitor locomotion and embodied presence. It does not own world identity, room lifecycle, camera arbitration, guided route semantics, focus semantics, or visual representation of the world.

## Revised Capability Rows

### Camera Authority

Primary donor: Museum.  
Status: proven implementation.  
Correction: V1.1 forbids creating a parallel camera arbiter. Any third-person controller must register with `CameraAuthority` and write only through the one-shot token contract.

### Third-Person Follow Camera

Primary donor: new Visitor Engine capability.  
Secondary donors: Claude camera feel/springs, Museum CameraAuthority, Museum SceneKit measurement, Claude physics query APIs.  
Status: not proven in donors.  
Correction: Claude proves first-person camera feel, recoil, bob, landing, and springs. It does not prove a third-person boom, target obstruction, shoulder switching, or camera pull-in. These must be implemented and tested later.

### Focus / Detail Handoff

Primary donor: Museum.  
Status: proven implementation.  
Correction: Focus is existing `FocusController` plus `ActionDispatch`/`CameraAuthority` handoff. VisitorRuntime only supplies activate intent and preserves/restores visitor locomotion state around focus.

### Guided / Free Exploration

Primary donor: Museum `ExperienceDirector` + `WorldState`.  
Secondary donor: District as route/wayfinding inspiration only.  
Status: proven in Museum.  
Correction: guided mode owns orchestration; VisitorRuntime remains locomotion/presence. Exit/return behavior must follow Museum's return pose and active-space safeguards.

### Visitor State

Primary donor: Museum WorldState + new VisitorRuntime telemetry.  
Status: partially proven.  
Required V1.1 shape:

```text
VisitorState
  visitorPosition
  visitorVelocity
  yaw / facing
  grounded
  locomotionMode
  currentSpaceId        projection of WorldState.activeSpaceId
  focusedEntityId       projection of WorldState.focusedEntityId
  activeRouteId         projection of WorldState.activeRouteId
  activeStepId          projection of WorldState.activeStepId
  nearestHotspotId      from ProximitySystem
  footContacts          new
  surfaceUnderFoot      from collision/surface query
```

Rule: projected fields may be mirrored for convenience, but WorldState remains authoritative.

### Interaction / Current POI

Primary donor: Museum `Hotspot`, `Entity`, `ProximitySystem`, `ActionDispatch`.  
Secondary donor: District POI/view anchor semantics.  
Status: proven in Museum.  
Correction: artwork proximity and activation should not be a bespoke District-style POI layer for Museum worlds. Use canonical Museum records first.

### Footprints

Primary donor: new Visitor Engine capability.  
Supporting donors: Claude `player:footstep` events, foot coordinates, surface sampling; Claude `DecalSystem` generic projection technique.  
Status: not proven as visual footprints.  
Correction: V1 overclaimed donor evidence if it implied Claude already had footstep decals/footprints. V1.1 treats footprints as new visual presence work requiring its own implementation and QA.

### Camera Collision

Primary donor: new Visitor Engine capability.  
Supporting donors: Claude physics `raycast`, `sphereCast`, `capsuleCast`, `checkCapsule`; Museum `navigationVolume` and `CameraAuthority`.  
Status: not proven as third-person camera collision.  
Correction: V1.1 should specify obstruction handling as a new controller behavior: cast from avatar/target toward desired camera, pull camera forward, smooth recovery, avoid wall clipping, and report evidence.

### Mobile Input

Primary donor: Museum `InputSystem`.  
Status: proven for touch walk/look.  
Correction: existing mobile behavior is left-half walk and right-half look. Tap-to-move, on-screen joystick visuals, and museum-friendly one-thumb navigation remain future work.

## Revised First Implementation Slices

### Slice 0: Architecture Harness

Goal: prove the target sandbox respects Museum-style authority before adding body feel.

Must include:

- Runtime shell with WorldState projection.
- CameraAuthority-like single writer invariant.
- Placeholder third-person camera controller registered as an authority participant.
- Proximity/action bridge using semantic activate/focus actions.
- QA report proving no duplicate world/camera ownership and no donor/runtime pollution.

Exit criteria:

- One camera owner per frame.
- WorldState contains no camera pose.
- VisitorState projects active space/focus/route fields without becoming source of truth.
- Activation dispatch path exists, even if locomotion is still minimal.

### Slice 1: Presence

Goal: embodied visitor locomotion without breaking Slice 0 contracts.

Must include:

- Character collision/grounding.
- Visitor position/velocity/yaw telemetry.
- Foot contact events and surface sampling.
- Optional temporary avatar proxy.
- Third-person follow camera using CameraAuthority.

Exit criteria:

- Movement updates visitor state.
- Proximity receives visitor position.
- Third-person camera never writes outside authority.
- No footprint visual claims unless implemented.

### Slice 2: Museum Interaction

Goal: make the embodied visitor operate Museum interactions through existing contracts.

Must include:

- Nearest hotspot/current artwork through ProximitySystem.
- Activate nearest -> ActionDispatch.
- Focus handoff through existing FocusController.
- Exit focus restores visitor exploration.
- Guided route entry/exit coexists with VisitorRuntime.

Exit criteria:

- Explore and Guided share WorldState.
- Focus and Guided use CameraAuthority.
- VisitorRuntime does not own route, focus, or semantic object identity.

## Human Decisions Remaining

1. Approve V1.1 architecture: `ExploreThirdPersonController` under Museum `CameraAuthority`, with VisitorRuntime as locomotion/presence only.
2. Approve revised slice order: Slice 0 Architecture Harness, Slice 1 Presence, Slice 2 Museum Interaction.
3. Decide whether the target sandbox imports/ports Museum contracts directly or clean-room reimplements the same contracts.
4. Choose physics path for first implementation: custom kinematic first, Rapier first, or dual abstraction with one backend enabled.
5. Define first surface vocabulary for visitor foot contacts if footprints/audio/surface response are implemented together.

## Audit Conclusion

V1.1 changes the implementation direction in one important way: the Visitor Presence Engine should not become a parallel game runtime beside Immersive Worlds. It should become the embodied visitor module inside Immersive Worlds, using Museum's existing authority, state, action, proximity, and QA contracts as the primary architecture.

