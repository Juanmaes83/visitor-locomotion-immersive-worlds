# BEST-IN-FAMILY VISITOR ENGINE CAPABILITY MAP V1

Status: ARCHITECTURE / REUSE GATE, not implementation approval.
Date: 2026-08-15
Branch: codex/archaeology-visitor-presence-engine-v1
Repository: Juanmaes83/visitor-locomotion-immersive-worlds

## 0. Environment Safety Report

- PWD: `C:\Users\temp123\.codex\visualizations\2026\08\15\01a00738-9d74-7ab0-aed7-17d82d5e95cb\visitor-locomotion-immersive-worlds`
- Remote: `https://github.com/Juanmaes83/visitor-locomotion-immersive-worlds.git`
- Branch: `codex/archaeology-visitor-presence-engine-v1`
- HEAD: `5c2cf77ac23c6957ea3adb15241da2510f943106`
- Status before this document: clean
- Playbook branch read: `docs/visitor-presence-engine-playbook-v1`
- Playbook SHA: `9fdd1541c2a3ea4d159cd716b7e0136756b78738`

No donor repository was modified. No runtime engine files were created. No physics dependency was installed.

## 1. Playbook Confirmation

Codex confirms work under these rules:

- Authority order: latest explicit Juanma decision, frozen contracts/Playbook, current mission, approved baseline, proven first-party donor capability, canonical quality reference, existing implementation, agent inference.
- Isolation contract: Escaparates Pro/Museum, Sakura, District/RUBIK SOTA 2, Claude-of-Duty, threejs-game-skills and Gauntlet are read-only donors.
- Reuse-before-invention: proven owned capability wins until evidence proves a better need.
- Donor roles: Museum is receiving/product contract; Sakura is traversal donor; District is visitor/navigation/productization donor; Claude-of-Duty is engine-discipline/movement-math donor; threejs-game-skills is process/physics/QA donor; Gauntlet is builder-critic-loop donor; TheVertMenthe is experience/feel reference only.
- Best-in-Family gate: architecture must compare subsystem candidates before first implementation.
- Builder != Critic: implementation and final criticism must be separated when practical.
- Human QA: navigable runtime is required for interaction/feel claims later.
- QA layers: functional, visual, feel, temporal/instrumented.
- Continuous execution/handoff: ordinary checkpoints continue, explicit human gates stop. This mission ends at the architecture/reuse gate.
- Museum Integration Gate: not authorized.
- Initial R&D Gate: no engine implementation until Juanma + ChatGPT review this map.

## 2. Donor Evidence Snapshot

### Museum / Escaparates Pro

- Repo: `Juanmaes83/escaparates-pro`
- Default branch: `master`
- License metadata: none returned by GitHub; treat provenance as unresolved and read-only unless Juanma clarifies.
- Evidence found: product/studio/effects/labs, QA workflows, source-experience wrappers, Infinite Worlds brand-expression lab.
- Relevant contract evidence: `labs/infinite-worlds-brand-expression-v1-2/README.md` protects `App -> World -> Portal`, render target, camera synchronization, OrbitControls/raycast interaction, spatial audio, and additive world/brand layers.
- Maturity for Visitor Engine: strong receiving/product-contract donor; weak direct locomotion donor from public files inspected.

### Sakura Crossing

- Repo: `Juanmaes83/sakura-crossing`
- Default branch: `main`
- License: MIT
- Key evidence: `src/core/player.js`
- Proven capability: real first-person world traversal in a complex Three.js world: pointer lock, WASD/arrows, acceleration/deceleration, walk/run, AABB collision, terrain height following, step/height logic, substepping against tunneling, raycast interaction, spherical presentation camera, e-bike mount/dismount and mobility-specific nose probe.
- Maturity: primary first-party traversal donor, but first-person only and not avatar/foot-contact/camera-authority ready.

### Central Distric Rubik Sota / RUBIK SOTA 2

- Repo: `Juanmaes83/central-distric-rubik-sota`
- Default branch: `main`
- License: MIT
- Key evidence: `src/core/player.js`, `src/navigation/navigationUi.js`, `src/navigation/poiRegistry.js`, `src/navigation/visitorProgress.js`
- Proven capability: inherits Sakura player stack; adds canonical POIs, viewing anchors, approach radii, facing checks, visitor/author map mode, visitor position marker, selected destination, local visitor progress/discovery, detail surface, pointer-lock handoff around map/detail.
- Maturity: primary first-party visitor/navigation/productization donor.

### Claude-of-Duty

- Repo: `Juanmaes83/Claude-of-Duty`, fork of `mshumer/Claude-of-Duty`
- Default branch: `main`
- License: MIT
- Key evidence: `ARCHITECTURE.md`, `src/core/engine.js`, `src/core/input.js`, `src/player/movement.js`, `src/player/camera.js`, `src/player/springs.js`, `src/player/tuning.js`, `src/player/feeltest.mjs`, `src/physics/character.js`, `src/physics/surfaces.js`
- Proven capability: subsystem ownership, fixed timestep, input snapshot, kinematic swept-capsule character controller, step/slope/anti-tunneling, surface vocabulary, stride-derived footstep events with left/right state and per-foot surface probe, camera springs/micro-layers, tuning table, deterministic feel bench.
- Maturity: strongest engine-discipline donor; combat/FPS specificity must be rejected.

### threejs-game-skills

- Repo: `Juanmaes83/threejs-game-skills`, fork of `majidmanzarpour/threejs-game-skills`
- Default branch: `main`
- License: MIT
- Key evidence: `skills/threejs-gameplay-systems/references/gameplay-workflows.md`, `game-feel.md`, `physics-engine-selection.md`
- Proven guidance: first playable slice, input intents, explicit update order, lightest reliable physics choice, fixed-step physics, real input/browser verification, diagnostics, movement-camera co-tuning, feel feedback as state communication.

### Gauntlet

- Repos: `Juanmaes83/gauntlet-loop` (CC-BY-4.0), `Juanmaes83/gauntlet-loop-aim-prompt-skill` (MIT)
- Proven guidance: named/fetchable/comparable quality bar, builder and fresh critic, blind comparison, no soft scores, loop until the critic selects ours or human stops it.

### TheVertMenthe

- Role only: quality reference for free gallery traversal, character-led presence, spatial continuity, contemplative pacing, art/body/space relation.
- No code/assets/identity reuse authorized.

## 3. Executive Architecture Recommendation

Build the Visitor Presence Engine as a Museum-shaped but engine-generic runtime using:

- Museum/Escaparates as receiving contract and camera/focus authority target.
- Sakura traversal as the proven first-party feel baseline for continuous world walking and interaction ray/probe semantics.
- District as primary owner model for POI, visitor progress, arrival anchors, selected destination, current visitor position, and free/guided bridge.
- Claude-of-Duty as primary implementation pattern for fixed timestep, input snapshot, movement/physics separation, springs, surface-aware foot contact, and temporal QA.
- threejs-game-skills as process/physics-selection/QA discipline.
- Gauntlet as high-value feel/visual review method.

Recommended V1 architecture should be custom kinematic, not generic rigid-body-first. It should adapt Claude's swept-capsule character controller ideas and event discipline, while preserving Sakura/District semantics. Rapier should remain a fallback if custom character/camera collision cannot meet Museum requirements.

## 4. Sakura -> RUBIK SOTA 2 Capability Evolution

WHAT DISTRICT INHERITED:
- `Player` locomotion stack remains essentially Sakura-derived: pointer lock, acceleration, collision, height following, substeps, raycast interaction, e-bike mount/dismount.

WHAT DISTRICT MODIFIED:
- Look sensitivity became configurable/split for walking/riding.
- World content and product layers evolved around the traversal, not by replacing it.

WHAT DISTRICT GENERALIZED:
- Media surfaces and POIs became canonical registry entries.
- Object position and viewing anchor are separated.
- Visitor and author map views read from the same canonical POI data.

WHAT DISTRICT PRODUCTIZED:
- Visitor onboarding/help, map access, destination selection, progress/discovery, detail panels, clean pointer-lock exit/resume.

WHAT DISTRICT ADDED:
- `navigationUi`, `poiRegistry`, `visitorProgress`, current-position map marker, arrival states: FAR / APPROACHING / AT_ANCHOR / INTERACTABLE.

WHAT DISTRICT LEFT SOURCE-SPECIFIC:
- First-person Sakura-like traversal, spherical world math, district-specific content, no visible visitor body.

WHAT IS MORE MATURE IN SAKURA:
- Source traversal simplicity and original world-walking proof.

WHAT IS MORE MATURE IN DISTRICT:
- Visitor journey semantics, POIs, discovery state, product-facing navigation, author/visitor separation.

PRIMARY FOR VISITOR ENGINE:
- Sakura for low-level proven traversal baseline; District for visitor/navigation/progress semantics.

Engineering lesson: do not rebuild locomotion merely to productize visitor state. Preserve the proven walker concept, then separate and upgrade it.

## 5. Claude-of-Duty vs Sakura Player Stack

Sakura strengths:
- Proven in a real explorable world.
- Simple, readable, dependency-light.
- Acceleration/deceleration already feels intentionally damped.
- Collision works for authored AABB street colliders and terrain `heightAt`.
- Integrated camera/world basis and interactions.

Sakura limitations:
- Variable-frame `update(dt)` rather than fixed-step gameplay authority.
- Player, input, collision, camera and interaction are tightly coupled.
- Axis-separated AABB collision, not swept capsule.
- Substepping reduces tunneling but does not prove continuous collision.
- No third-person camera, avatar body, foot-contact event, surface response, diagnostics or temporal feel bench.

Claude-of-Duty strengths:
- Fixed 120 Hz engine loop and input snapshots.
- Movement owns velocity/state; physics owns collision resolution.
- Swept capsule with depenetration, step offset, slope limit, snap distance, ground probe, surface IDs.
- Stride-derived footstep cadence, left/right alternation, foot-specific surface raycast.
- Camera feel via springs, bob locked to gait, event impulses, deterministic noise.
- Central tuning and feeltest instrumentation.

Claude-of-Duty limitations:
- FPS/combat feature set creates excess: sprint/tacsprint/slide/jump/prone/mantle/recoil/health/weapons.
- First-person camera assumptions.
- Tuning is combat-aggressive and must be softened for museum traversal.

Optimal combination:
- Use Sakura/District as product/traversal semantics proof.
- Use Claude architecture/math for runtime separation, fixed-step, character collision, springs and foot-contact telemetry.
- Reject wholesale inheritance of combat states and camera aggression.

## 6. Best-in-Family Capability Map

| # | Capability | Primary | Secondary | Reuse action | Prohibited reinvention | Key risks |
|---|---|---|---|---|---|
| 01 | Runtime loop | Claude `Engine` | threejs workflows | Extract fixed accumulator/update order | Yes: do not invent variable-delta loop | Overengineering full registry too early |
| 02 | Fixed timestep | Claude | threejs physics guide | Direct pattern/adapt | Yes | Must tune 60 vs 120 Hz for mobile |
| 03 | Input abstraction | Claude `Input` | threejs input intents | Adapt to desktop+touch intents | Yes | Pointer lock not mobile-ready |
| 04 | Input snapshot/intents | Claude | threejs workflows | Extract snapshot model | Yes | Edge events across fixed substeps |
| 05 | Movement vector | Sakura + Claude | District | Adapt: camera-relative third-person | Yes | First-person assumptions |
| 06 | Acceleration | Sakura for contemplative, Claude for structure | threejs feel | Adapt damped curves | Yes | Claude values too aggressive |
| 07 | Deceleration | Sakura | Claude | Adapt Sakura braking feel with instrumentation | Yes | Floaty stop if too soft |
| 08 | Turn model | New V1 from evidence | Sakura yaw, Claude yawRate | R&D/adapt | No | Third-person body/camera split |
| 09 | Grounding | Claude | Sakura `heightAt` | Extract ground probe contract | Yes | Museum ramps/stairs |
| 10 | Collision | Claude swept capsule | Sakura AABB | Adapt custom kinematic controller | Yes unless Rapier trigger hit | Complexity |
| 11 | Anti-tunneling | Claude sweep | Sakura substeps | Extract sweep; fallback substeps | Yes | BVH/static mesh integration |
| 12 | Step handling | Claude | Sakura STEP | Extract step offset/snap | Yes | Stair nose edge cases |
| 13 | Slope handling | Claude | Sakura height smoothing | Extract slope limit/project-on-ground | Yes | Museum ramps need proof |
| 14 | Body representation | New | Claude capsule | R&D abstract avatar over capsule | No | Visual foot/body mismatch |
| 15 | Third-person suitability | New | Claude/Sakura math | R&D | No | Donors are first-person |
| 16 | Camera follow | New | Claude camera layers | Adapt springs/damping | No | Third-person collision/framing |
| 17 | Camera smoothing | Claude springs | Sakura damped y/roll | Extract springs/approach | Yes | Too much lag |
| 18 | Camera collision | Claude physics masks | Rapier fallback | Adapt ray/sphere/capsule probes | No | Doorway clipping |
| 19 | Camera authority | Museum contract | District modal handoff | Extract authority state machine | Yes at contract level | Multiple writers |
| 20 | Springs/easing | Claude `springs.js` | threejs feel | Direct conceptual reuse | Yes | Combat recoil channels rejected |
| 21 | Foot cadence | Claude | none | Extract stride accumulator | Yes | Avatar animation later |
| 22 | Left/right foot state | Claude | none | Extract `_footLeft` model | Yes | Abstract foot placement |
| 23 | Surface probe | Claude physics | Sakura/District none | Extract per-foot raycast | Yes | Surface taxonomy mapping |
| 24 | Foot Contact Event | New from Claude stepEvent | Playbook | Define V1 event | Yes once defined | Overclaiming animation contact |
| 25 | Footstep audio arch | Claude events/audio | threejs audio hooks | Adapt hooks only | Yes | No final audio assets yet |
| 26 | Footprints/trails | New | Claude decals concept | R&D | No | Decal budget/perf |
| 27 | Surface response | Claude surfaces | Playbook vocabulary | Adapt enum/properties | Yes | Museum material names |
| 28 | Interaction probe | Sakura raycast | District arrival | Adapt as InteractionProbe | Yes | Third-person camera vs avatar origin |
| 29 | Proximity | District approach radius | Museum routes | Direct semantic reuse | Yes | Needs currentSpace/entity mapping |
| 30 | POIs | District `poiRegistry` | Museum receiving contract | Adapt registry shape | Yes | Avoid District-specific IDs |
| 31 | Navigation UI bridge | District `navigationUi` | Museum UI later | Extract bridge contract | Yes | Do not hardcode UI |
| 32 | Visitor position | District map marker + player.pos | Sakura pos | Direct semantic reuse | Yes | Coordinate spaces |
| 33 | Visitor progress | District `visitorProgress` | Museum future | Adapt local progress contract | Yes | Storage/versioning |
| 34 | Visitor state | New aggregation | District + Claude + Sakura | Define minimal V1 | No | Owner boundaries |
| 35 | Guided/free mode | District selectedPoi/free walk | Museum routes | Adapt bridge | Yes conceptually | Node-only trap |
| 36 | Artwork approach | District viewing anchors | Museum Focus | Adapt | Yes | Needs artwork entity schema |
| 37 | Focus Camera handoff | Museum contract target | District pointer-lock detail | Mock interface V1 | No runtime yet | Real Museum integration not authorized |
| 38 | Mobile abstraction | threejs input guidance | Claude gamepad | Design in InputController | No | Tap-to-move pathfinding not V1 |
| 39 | Tap-to-move compatibility | New | District selected destination | R&D later | No | Navmesh/pathfinding |
| 40 | Virtual-stick compatibility | threejs input intent | Claude stick | Adapt intent API | Yes | Touch UX quality |
| 41 | Accessibility | threejs feel rules | Playbook | Include reduced motion/camera intensity | Yes | Not hiding motion sickness issues |
| 42 | Diagnostics | threejs workflows | Claude feeltest | Extract `window` snapshot | Yes | Debug leaking to release |
| 43 | Telemetry | Claude feeltest metrics | Playbook | Define EvidenceTelemetry | No | Privacy/analytics later |
| 44 | Browser QA | threejs workflows | District Playwright pattern | Direct process reuse | Yes | Screenshots don't prove feel |
| 45 | Visual QA | Playbook + Gauntlet | threejs visual checks | Process reuse | Yes | Static-only false pass |
| 46 | Feel QA | Claude feeltest + human | threejs game-feel | Extract measured + human loop | Yes | Metrics replacing human judgment |
| 47 | Temporal QA | Claude `feeltest.mjs` | Playbook | Adapt bench | Yes | Needs deterministic harness |
| 48 | Reproducible evidence | Claude capture discipline | Gauntlet | Adapt | Yes | Browser nondeterminism |
| 49 | Performance budgets | Claude architecture | threejs diagnostics | Adapt budgets | Yes | Mobile unknown |
| 50 | Lifecycle/disposal | Claude architecture | threejs workflows | Direct discipline | Yes | Event/listener leaks |

## 7. Physics Decision Matrix

### Sakura-derived custom collision

- Strengths: proven in Sakura/District; simple; no dependency; good for authored AABB worlds.
- Weaknesses: not continuous; no capsule; no true slope/step/stairs proof; first-person coupled.
- Best use: semantic baseline and fallback for simple static galleries.

### Claude-of-Duty-derived custom controller

- Strengths: swept capsule, depenetration, step offset, slope limit, snap distance, surface IDs, deterministic fixed-step.
- Weaknesses: more complex; extracted from combat game; requires simplified static collision/BVH discipline.
- Best use: recommended V1 for Museum-shaped sandbox.

### Rapier

- Strengths: robust maintained physics, sensors, rigid bodies, ramps, moving platforms, mobile-capable.
- Weaknesses: dependency/WASM, integration overhead, determinism and character feel require careful wrapper.
- Best use: fallback/escalation if custom controller fails against stairs/ramps/camera collision or if future dynamic sculptures/platforms are required.

### cannon-es

- Strengths: JS-only, simpler than WASM.
- Weaknesses: weaker default for robust character controller and serious geometry.
- Best use: not recommended unless WASM is explicitly forbidden and collision needs remain modest.

RECOMMENDED V1: Claude-derived custom kinematic swept-capsule controller, softened and simplified for visitor traversal.

FALLBACK: Sakura-style simple static collision for earliest paper prototype only, or Rapier if Museum-shaped requirements exceed custom controller confidence.

TRIGGER TO ESCALATE TO RAPIER:
- repeated failure on stairs/ramps/doorways;
- need for dynamic moving colliders;
- custom BVH maintenance cost exceeds value;
- camera collision needs robust scene queries beyond simple probes;
- mobile perf or correctness is worse than Rapier in measured tests.

No physics dependency should be installed before this decision is reviewed.

## 8. Visitor State Source Map

Target:

```js
VisitorState {
  position,
  orientation,
  velocity,
  grounded,
  locomotionMode,
  currentSpace,
  nearestEntity,
  currentPOI,
  focusedEntity,
  activeRoute,
  visitedSpaces,
  visitedEntities
}
```

V1 ownership/source:

- `position`: Locomotion/CharacterController, proven in Sakura/District `player.pos`, Claude `character.position`.
- `orientation`: Locomotion/CharacterController; Sakura yaw, Claude yaw/pitch.
- `velocity`: LocomotionController; Sakura `vel`, Claude `velocity`.
- `grounded`: GroundingController; Claude strongest.
- `locomotionMode`: LocomotionController; new profile field, informed by Claude states but reject combat states.
- `currentSpace`: Museum/World bridge; future.
- `nearestEntity`: InteractionProbe; new, with District nearest POI as precedent.
- `currentPOI`: NavigationBridge; District primary.
- `focusedEntity`: FocusBridge/Museum camera authority; future mock first.
- `activeRoute`: RouteBridge; District journey selectedPoi is V1 precedent.
- `visitedSpaces`: VisitorState/Progress; future.
- `visitedEntities`: VisitorProgress; District discovered POIs primary.

Minimal V1:

```js
position, orientation, velocity, grounded, locomotionMode,
nearestEntity, currentPOI, focusedEntity, activeRoute, visitedEntities
```

Future:

```js
currentSpace, visitedSpaces, accessibility state, analytics session
```

## 9. Foot Contact / Surface Response Source Map

Target event:

```js
FootContactEvent {
  foot,
  worldPosition,
  surfaceId,
  surfaceType,
  speed,
  stride,
  locomotionMode,
  timestamp
}
```

Sources:

- Claude provides the strongest real basis: stride accumulator, `_footLeft`, lateral foot offset, per-foot downward raycast, surface name, running flag, footstep event.
- Sakura/District do not have foot-contact events; they only have camera bob and movement speed.
- threejs-game-feel supports the principle: feedback is state communication and must be synchronized.
- Museum/Escaparates is future consumer via floor materials/artwork spaces, not current source.

V1 event should be derived from locomotion/stride, not `setInterval`.

Direct reuse:
- left/right alternation model;
- stride length per locomotion profile;
- surface probe under foot;
- one master contact event driving audio/footprints/camera/body/telemetry.

Reject:
- blind timer footsteps;
- decorative footprints disconnected from gait;
- camera shake as dominant step feedback.

R&D later:
- animation-authored foot contacts once real avatar animation exists.

## 10. Proposed Visitor Runtime Architecture

Corrected target architecture:

```text
VisitorRuntime
├── RuntimeLoop
├── InputController
├── LocomotionController
├── CharacterCollisionController
├── GroundingController
├── SurfaceRegistry
├── FootContactSystem
├── BodyPresenceController
├── ThirdPersonCameraController
├── InteractionProbe
├── FocusBridge
├── NavigationBridge
├── RouteBridge
├── VisitorStateStore
└── EvidenceTelemetry
```

Ownership rules:

- CharacterCollisionController owns collision resolution and grounded contact facts.
- LocomotionController owns desired velocity, movement mode and stride distance.
- ThirdPersonCameraController is the only runtime writer of camera transform unless FocusBridge has explicit authority.
- FocusBridge owns authority transitions: FREE_WALK -> SETTLE -> FOCUS -> RETURN.
- NavigationBridge owns currentPOI/route intent, not raw movement.
- VisitorStateStore publishes semantic state but does not mutate low-level movement directly.

## 11. Proposed Museum-Shaped Sandbox

Do not build yet. Future proof environment:

- One gallery room plus doorway into a second smaller bay.
- Static walls with collision proxies.
- Several artworks with object position, viewing anchor, approach radius, facing requirement.
- Floor material zones: marble, wood, carpet/stone.
- One sculpture/obstacle requiring collision/camera avoidance.
- Visitor avatar: abstract body with visible direction and simple left/right foot markers.
- Focus handoff mock: artwork detail camera authority takes over and returns.
- Debug overlay: visitor state, surface under each foot, foot contact log, camera authority state, collision penetration, FPS/frame time.

This is not a cube demo and not the real Museum.

## 12. QA / Evidence Architecture

Functional QA:
- input -> movement;
- stop/reverse/turn;
- wall/doorway/sculpture collision;
- approach/facing/interact;
- focus handoff return;
- visitor state coherence.

Visual QA:
- avatar grounded;
- no camera clipping;
- feet/footprints align plausibly;
- gallery/art framing remains elegant.

Feel QA:
- input-to-motion response under 100 ms target;
- acceleration feels weighted, not sluggish;
- stop distance intentional;
- camera supports control rather than fighting it;
- footsteps/footprints feel synchronized, not ornamental.

Temporal/instrumented QA:
- input latency;
- time to target speed;
- stopping distance;
- turn rate;
- camera lag;
- foot contact timestamps;
- surface probe under foot;
- collision penetration;
- frame time/FPS and dropped frames.

Human navigable QA:
- local preview URL;
- controls;
- recommended test path;
- known limitations;
- branch/SHA;
- screenshots/video as supporting evidence only.

## 13. Risks

- Museum/Escaparates public files inspected do not yet expose a canonical Focus Camera API; integration contract may need Juanma/ChatGPT confirmation.
- Escaparates Pro license metadata is unresolved; treat as read-only architecture/product contract, not code reuse.
- Claude controller is strong but heavy; extraction must avoid bringing combat complexity.
- Third-person body/camera is not solved by donors; this is the biggest legitimate R&D area.
- Footprints can become visual clutter; decal budget and fade policy are mandatory.
- Mobile tap-to-move implies pathing/navmesh later; do not pretend V1 free movement solves it.
- Metrics can explain feel, but Juanma remains final feel authority.

## 14. Explicit Human Decisions Needed

1. Confirm whether Escaparates Pro/Museum has a specific Focus Camera / Scene Kit contract file not visible in the inspected public paths.
2. Confirm preferred initial surface vocabulary for Museum: use Playbook set (`marble`, `wood`, `concrete`, `carpet`, `stone`, `metal`, `sand`, `other`) or map from Claude set.
3. Confirm whether V1 should prioritize desktop third-person free walk before any tap-to-move prototype.
4. Confirm whether the first implementation may adapt Claude-style custom collision before evaluating Rapier in code.
5. Confirm whether repository memory files should now be created as empty/known/proposed ledgers.
6. Confirm TheVertMenthe review source/path for human quality comparison.

## 15. Exact Proposed First Implementation Slice

After approval only:

Slice name: `museum-shaped-third-person-presence-v0`

Create documentation/memory first:

- `CURRENT_TRUTH.md`
- `ACTIVE_MISSION.md`
- `DECISION_LOG.md`
- `REFERENCE_REUSE_LEDGER.md`
- `QUALITY_BAR.md`
- `STATUS_REGISTRY.md`

Then create the smallest navigable sandbox:

- Vite/Three.js app shell.
- Fixed-step loop.
- Input intents for desktop and touch abstraction stubs.
- Static Museum-shaped gallery with collision proxies and material zones.
- Kinematic visitor capsule using Claude-derived movement/collision pattern, no combat states.
- Abstract avatar marker.
- Third-person camera with soft follow and explicit authority state.
- FootContactEvent log with left/right alternation and surface probe.
- POI/artwork approach mock using District-style viewing anchors.
- Diagnostics overlay and first temporal metrics.

Not in first slice:

- production Museum integration;
- Rapier/Cannon install;
- real avatar animation;
- final audio assets;
- authoring panel;
- tap-to-move pathfinding;
- PR/push/merge.

## 16. Hard Stop

Initial R&D Gate reached. Engine implementation remains NOT AUTHORIZED.
