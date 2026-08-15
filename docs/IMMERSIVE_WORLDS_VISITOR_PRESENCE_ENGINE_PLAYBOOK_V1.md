# IMMERSIVE WORLDS — VISITOR PRESENCE ENGINE
## AUTONOMOUS ENGINEERING / VISUAL PRODUCT OPERATING PLAYBOOK V1
### Museum-first · Codex execution profile · Isolated R&D

**Status:** ACTIVE OPERATING CONTRACT — V1  
**Repository:** `Juanmaes83/visitor-locomotion-immersive-worlds`  
**Primary implementation agent:** Codex  
**Product / visual / final decision authority:** Juanma  
**Architecture / documentation / audit role:** ChatGPT  
**First proving ground:** Museum / Immersive Worlds  
**Integration status:** NOT AUTHORIZED  

---

# 0. PURPOSE

This repository exists to develop an isolated, reusable **Visitor Presence Engine** for Immersive Worlds.

The immediate proving ground is the Museum / Gallery experience, but the capability must be designed so it can later support other Immersive Worlds verticals without forcing a new engine per project.

The target is not merely “a character that walks”. The target is the runtime layer that makes an immersive world feel **inhabited, traversable, responsive, cinematic, spatially coherent and physically present**.

```text
VISITOR PRESENCE ENGINE
│
├── Input
├── Locomotion
├── Avatar / Body Presence
├── Camera
├── Grounding
├── Collision
├── Surface Response
├── Foot Contact
├── Footsteps
├── Footprints / Trails
├── Interaction / Proximity
├── Artwork Approach
├── Focus Handoff
├── Navigation / POIs
├── Visitor State
├── Free Exploration
├── Guided Traversal
├── Mobile Traversal
├── Accessibility
└── QA / Telemetry
```

This Playbook governs how agents research, choose donors, implement, test, criticize, prove, document and hand off work in this repository.

---

# 1. OPERATING MODEL / AUTHORITY

The working model is explicit:

```text
JUANMA
Director / Product Owner / Visual Authority / Final Decision Authority / Merge Authority
        ↓
CHATGPT
Product Architect / System Designer / Documentation Owner / Auditor / Quality Critic
        ↓
CODEX
Implementation Engineer / Local Builder / Evidence Producer
```

Other agents may later participate, but no agent receives implicit product authority by implementing code.

## 1.1 Authority order

When sources conflict, use this order:

1. **Latest explicit Juanma decision**
2. **Frozen / approved project contracts and Playbook rules**
3. **Current mission mandate**
4. **Approved Visitor Presence Engine baseline**
5. **Proven first-party donor capability**
6. **Canonical quality reference**
7. **Existing implementation**
8. **Agent inference**

Agent inference may never silently override higher authority.

## 1.2 Agent output is not approval

```text
AGENT KEEP ≠ HUMAN APPROVAL
AGENT PASS ≠ PRODUCT APPROVAL
TECHNICAL PASS ≠ VISUAL APPROVAL
```

Juanma remains the final human authority for product, feel, visual quality and integration.

---

# 2. ABSOLUTE ISOLATION CONTRACT

This workstream is intentionally isolated.

The following repositories/projects are **READ-ONLY DONORS / REFERENCES** unless Juanma explicitly authorizes otherwise:

- `Juanmaes83/escaparates-pro`
- Museum / Immersive Worlds inside Escaparates Pro
- `Juanmaes83/sakura-crossing`
- `Juanmaes83/central-distric-rubik-sota`
- `Juanmaes83/Claude-of-Duty`
- `Juanmaes83/threejs-game-skills`
- `Juanmaes83/gauntlet-loop`
- `Juanmaes83/gauntlet-loop-aim-prompt-skill`

Rules:

- Do not modify donor repositories.
- Do not commit to donor repositories.
- Do not merge into donor repositories.
- Do not use active donor worktrees as implementation sandboxes.
- Do not refactor Museum to make this experiment easier.
- Do not couple Sakura or District back into this repository by destructive dependency.
- Do not copy entire projects when a smaller capability extraction is sufficient.

Critical distinction:

```text
READ-ONLY DONOR ≠ UNUSED DONOR
DO NOT MODIFY A DONOR ≠ DO NOT REUSE A DONOR
```

The correct pattern is:

```text
READ
UNDERSTAND
TRACE DEPENDENCIES
CLASSIFY
EXTRACT / ADAPT
REIMPLEMENT CLEANLY IF NEEDED
CITE PROVENANCE
```

---

# 3. LOCAL-FIRST / BRANCH / MERGE SAFETY

Permanent workflow:

```text
verified clone
→ git status
→ isolated branch
→ local implementation
→ local/browser QA
→ evidence
→ critic
→ human navigable runtime
→ Juanma review
→ explicit merge authorization
```

Hard rules:

- Never develop directly on `main` or `master`.
- Never merge to stable without explicit Juanma approval.
- Never push over another agent's active branch.
- Never delete working capability merely to simplify architecture.
- Preserve rollback and reversibility.
- One material causal change at a time when risk is high.
- Before any material work, record repo, branch, HEAD and `git status`.
- If local uncommitted work belongs to another active stream, stop and isolate elsewhere.

For this repository, `main` is a protected conceptual baseline even if branch protection is not yet configured in GitHub.

---

# 4. REPOSITORY = OPERATIONAL MEMORY

Chat is not the permanent source of truth.

```text
CHAT
= immediate intent / discussion / correction

REPOSITORY
= durable authority / decisions / references / state / evidence / learning
```

An agent must not require old conversation context to understand the project.

The repository will progressively maintain:

```text
CURRENT_TRUTH.md
ACTIVE_MISSION.md
DECISION_LOG.md
REFERENCE_REUSE_LEDGER.md
STATUS_REGISTRY.md
ERROR_LEARNING_LOG.md
QUALITY_BAR.md
HUMAN_QA_STATUS.md
implementation-records/
evidence/
gauntlet/
```

A new competent agent should eventually be able to read the standard operating documents and answer:

- What are we building?
- Why does it exist?
- What is approved?
- What is only proposed?
- What is frozen?
- What may change?
- Which donors already solve parts of the problem?
- Which donor is PRIMARY for each subsystem?
- What is forbidden to reinvent?
- What is currently broken or blocked?
- What evidence exists?
- What requires Juanma?
- What is the next safe action?

---

# 5. PRIME DIRECTIVES

These rules override convenience.

## 5.1 Reuse before invention

```text
PROVEN CAPABILITY BEFORE NEW CAPABILITY.
PROVEN FLOW BEFORE NEW FLOW.
```

Before creating a new subsystem, search owned proven work first.

A new implementation is justified only when:

- no suitable proven donor exists;
- the donor is incompatible with the receiving architecture;
- adaptation cost exceeds a clean implementation;
- legal/licensing provenance prevents reuse;
- or the new implementation is explicitly approved as R&D.

## 5.2 Preserve quality ownership

```text
THE ENGINE OWNS QUALITY.
THE EXPERIENCE SELECTS APPROVED PROFILES.
```

Future authoring/configuration may select safe locomotion/camera/avatar profiles, but must not expose raw engine complexity that can destroy the premium experience.

## 5.3 Functional correctness is not enough

```text
FUNCTIONAL PASS ≠ PRODUCT PASS.
MECHANICALLY CORRECT ≠ GOOD FEEL.
CODE QUALITY ≠ MOVEMENT QUALITY.
```

A visitor controller can have perfect tests and still feel floaty, cheap, delayed, nauseating or visually disconnected.

## 5.4 Static proof is insufficient

```text
A SCREENSHOT CANNOT PROVE LOCOMOTION.
```

For movement systems:

```text
STATIC EVIDENCE
≠ TEMPORAL EVIDENCE
≠ INTERACTIVE EVIDENCE
≠ INSTRUMENTED EVIDENCE
```

Each proves different claims.

## 5.5 Global outcome stability

A local subsystem may continue autonomously only when its change cannot silently destabilize a globally protected outcome.

If global impact is uncertain:

```text
UNCERTAIN GLOBAL IMPACT
= PREPARATION / ISOLATED PROOF ONLY
```

Do not integrate “because the local demo works”.

---

# 6. PRODUCT NORTH STAR

The Visitor Presence Engine exists so that **moving through the world is itself part of the experience**.

The visitor should feel:

- weight;
- presence;
- contact with the floor;
- control;
- freedom;
- continuity;
- readable intention;
- spatial scale;
- elegance;
- cinematic movement;
- premium game-like responsiveness without combat-game aggression.

The target is not FPS spectacle.

Avoid by default:

- aggressive sprint fantasy;
- combat movement;
- exaggerated camera bob;
- shake for its own sake;
- motion sickness;
- hard instantaneous turns unless deliberately chosen;
- floating-camera feel;
- arbitrary teleportation;
- node-only navigation presented as free exploration;
- technically correct but visually weightless motion.

Museum-first target:

```text
FREE WALK
→ APPROACH
→ CHARACTER SETTLES
→ CAMERA AUTHORITY HANDOFF
→ ARTWORK FOCUS
→ EXIT DETAIL
→ CAMERA RETURNS
→ VISITOR CONTINUES FROM SAME WORLD STATE
```

---

# 7. TARGET CAPABILITY MODEL

The long-term architecture should be able to express approved profiles such as:

```text
LOCOMOTION PROFILE
├── FIRST_PERSON
├── THIRD_PERSON
├── TAP_TO_MOVE
└── GUIDED

CHARACTER PROFILE
├── none
├── abstract
├── institutional
└── branded
```

The first major proof is expected to prioritize:

```text
THIRD_PERSON
+
ABSTRACT CHARACTER
+
CINEMATIC / CONTEMPLATIVE MOVEMENT
```

Desktop target:

```text
WASD / ARROWS
+ mouse/pointer
+ free continuous traversal
+ approach/interact
```

Mobile target architecture:

```text
DEFAULT
Tap destination → visitor walks there

ADVANCED
Virtual stick → manual free movement
```

Mobile is not a post-launch adaptation. It must be considered in input abstraction and performance budgets from the start.

---

# 8. FIRST-PARTY DONOR FAMILY / ROLE MAP

Donor roles are not interchangeable.

## 8.1 Museum / Immersive Worlds

**Role:** CANONICAL RECEIVING ARCHITECTURE / PRODUCT CONTRACT

Use it to understand:

- World / Space / Entity semantics;
- camera authority;
- interaction boundaries;
- Focus Camera;
- routes / guided traversal;
- scene-kit separation;
- visitor vs authoring authority;
- human QA expectations;
- integration contracts.

Museum is not the place where R&D is performed during this phase.

## 8.2 Sakura Crossing

**Role:** PRIMARY FIRST-PARTY LOCOMOTION / WORLD-TRAVERSAL DONOR

Audit especially:

- `src/core/player.js`
- interaction/raycast logic;
- collision behavior;
- terrain / height query;
- acceleration/deceleration;
- sub-stepping / anti-tunneling;
- first-person traversal;
- mobility mount/dismount;
- coordinate/navigation utilities;
- world traversal under real complexity.

Sakura is valuable because it is a **real explorable world**, not a cube demo.

## 8.3 Central Distric Rubik Sota / RUBIK SOTA 2

**Role:** PRIMARY FIRST-PARTY VISITOR EXPERIENCE / NAVIGATION / PRODUCTIZATION DONOR

Audit especially:

- `src/core/player.js`
- `src/navigation/navigationUi.js`
- `src/navigation/poiRegistry.js`
- `src/navigation/visitorProgress.js`
- Studio / Viewer separation;
- navigation feel work;
- visitor onboarding;
- current position;
- POIs;
- discovery/progress;
- mobility productization;
- Playwright/browser QA;
- evolution of Sakura without destroying the donor baseline.

Key lesson:

```text
PROVEN SYSTEM
→ PRESERVE CORE
→ EXTEND
→ PRODUCTIZE
→ ADD CONFIGURATION
→ ADD NAVIGATION / QA
```

## 8.4 Claude-of-Duty

**Role:** PRIMARY ENGINE-DISCIPLINE / MOVEMENT-MATH / GAME-FEEL DONOR

Audit especially:

- architecture / subsystem ownership;
- fixed timestep;
- deterministic input snapshots;
- movement controller separation;
- interpolation;
- springs / smoothing;
- centralized tuning;
- footstep cadence / surface events;
- camera micro-layers;
- lifecycle / disposal;
- performance discipline;
- capture / QA patterns.

Reject combat-specific inheritance unless independently justified.

## 8.5 threejs-game-skills

**Role:** ENGINEERING PROCESS / PHYSICS-SELECTION / GAME-FEEL / QA DONOR

Use for:

- first playable slice discipline;
- input intents;
- update order;
- physics engine selection;
- browser diagnostics;
- movement/camera co-tuning;
- gameplay verification patterns.

Do not inherit score/fail/retry competitive-game structure.

## 8.6 Gauntlet family

**Role:** CREATOR → CRITIC → COMPARE → LOOP PROCESS

Canonical pattern:

```text
build [THING]
at the level of [REFERENCE]

fan out
critic
compare
loop
```

The critic must be meaningfully independent from the builder.

## 8.7 TheVertMenthe

**Role:** PRIMARY EXPERIENCE / FEEL QUALITY REFERENCE

Use it as a perceptual reference for:

- free gallery traversal;
- visible visitor presence;
- spatial continuity;
- relationship between character and art;
- character-led exploration;
- contemplative movement;
- sense of being in a place rather than navigating a slideshow.

Do not treat it as source code authority.

Do not copy its proprietary visual identity, character, assets or implementation.

---

# 9. MANDATORY BEST-IN-FAMILY AUDIT BEFORE IMPLEMENTATION

No final subsystem architecture may be chosen merely because an agent can code it.

Before implementation, compare at minimum:

```text
CURRENT MUSEUM
vs
SAKURA
vs
DISTRICT RUBIK SOTA 2
vs
CLAUDE-OF-DUTY
vs
THREEJS GAME SKILLS
```

For each capability:

- runtime loop;
- input abstraction;
- movement vector / intent;
- acceleration;
- deceleration;
- grounding;
- collision;
- step handling;
- slope handling;
- camera follow;
- camera smoothing;
- camera authority;
- interaction ray/probe;
- proximity;
- POI/navigation;
- visitor progress/state;
- foot cadence;
- surface detection;
- foot contact;
- springs/easing;
- telemetry;
- QA;
- mobile input;
- Focus handoff.

Every row must classify candidates using:

```text
PRIMARY
SECONDARY
DIRECT REUSE
ADAPT
EXTRACT
FALLBACK
REJECT
R&D LATER
PROHIBITED REINVENTION
```

A `PROHIBITED REINVENTION` item means a proven internal solution exists and a new replacement requires explicit justification/approval.

---

# 10. REFERENCE / PROVENANCE DISCIPLINE

Every donor entry should eventually record:

- repository;
- branch / SHA where relevant;
- subsystem;
- role;
- what to extract;
- what not to copy;
- dependencies;
- license/provenance status;
- adaptation notes;
- PRIMARY / FALLBACK status.

A quality reference may guide feel without authorizing code reuse.

A source repository may contain code worth adapting without becoming the target architecture.

Keep these concepts separate:

```text
QUALITY REFERENCE
TECHNICAL DONOR
ARCHITECTURAL AUTHORITY
PRODUCT AUTHORITY
```

---

# 11. VISITOR RUNTIME / SUBSYSTEM OWNERSHIP

Target conceptual decomposition:

```text
VISITOR RUNTIME
│
├── InputController
├── LocomotionController
├── CharacterController
├── CameraController
├── GroundingController
├── CollisionController
├── SurfaceResponse
├── FootContactSystem
├── InteractionProbe
├── FocusBridge
├── NavigationBridge
├── RouteBridge
├── VisitorState
└── EvidenceTelemetry
```

One subsystem must have one clear owner for each mutable state.

Avoid multiple writers for:

- camera transform;
- visitor world position;
- velocity;
- grounded state;
- active locomotion mode;
- active Focus state.

If ownership is ambiguous, architecture is not ready.

---

# 12. FOOT CONTACT AS A FIRST-CLASS EVENT

Footsteps and footprints are not decoration. They are movement feedback and presence cues.

Preferred conceptual event:

```text
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

One contact event may drive:

```text
FOOT CONTACT
├── animation contact
├── footstep audio
├── footprint / decal
├── surface response
├── subtle camera/body response
└── telemetry
```

Cadence should derive from motion/stride or actual animation contact, not a blind timer.

Left/right alternation and per-foot surface detection should be preserved when technically meaningful.

Potential surface vocabulary:

```text
marble
wood
concrete
carpet
stone
metal
sand
other
```

Future surface response may affect:

- sound;
- footprint visual;
- friction;
- particles;
- reverb/acoustic hook;
- body/camera micro-response.

---

# 13. CAMERA CONTRACT

Third-person camera quality is a product subsystem, not a debug attachment.

Target composition may include:

```text
base follow
+ position damping
+ turn anticipation
+ velocity lag
+ subtle step response
+ collision avoidance
+ artwork Focus handoff
```

Principle:

> Many small coherent effects are preferable to one dominant “cinematic” effect.

Avoid:

- aggressive bob;
- arbitrary shake;
- lag that makes control feel disconnected;
- clipping through walls/works;
- hidden multiple writers;
- snapping without a designed reason.

Camera handoff must preserve visitor state.

---

# 14. VISITOR STATE CONTRACT

The engine should evolve toward a semantic visitor state that other systems can consume without inspecting locomotion internals.

Conceptual direction:

```text
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

Do not implement every field prematurely. The contract exists to prevent future subsystems from coupling directly to low-level controller state.

Potential consumers:

- AI Guide;
- audio guide;
- routes/tours;
- proximity content;
- analytics;
- visitor memory;
- accessibility;
- Focus Camera;
- navigation UI.

---

# 15. PHYSICS / COLLISION DECISION POLICY

No physics engine choice is canonical until compared.

Candidate families may include:

- Sakura-derived custom/static collision;
- Claude-of-Duty-derived custom controller patterns;
- Rapier;
- cannon-es;
- other proven owned capability.

Compare using Museum/Visitor requirements:

- walls;
- narrow doorways;
- ramps;
- steps;
- sculptures/obstacles;
- moving geometry if needed;
- third-person stability;
- camera collision;
- mobile performance;
- determinism;
- complexity;
- maintenance cost.

Do not install a large physics engine merely because it is sophisticated.

Do not keep custom collision merely because it is simple if it fails the real quality bar.

---

# 16. STANDARD MISSION LIFECYCLE

Every material mission follows:

```text
1. READ CURRENT TRUTH / PLAYBOOK / MISSION
2. VERIFY ENVIRONMENT / BRANCH / STATUS
3. IDENTIFY PROTECTED BASELINES
4. SEARCH PROVEN DONORS / FLOWS
5. DEFINE ACCEPTANCE CRITERIA
6. DEFINE REQUIRED EVIDENCE
7. IMPLEMENT SMALLEST MEANINGFUL SLICE
8. FUNCTIONAL QA
9. VISUAL QA
10. FEEL QA
11. TEMPORAL / INSTRUMENTED QA
12. FRESH CRITIC
13. KEEP / ADJUST / REJECT
14. LOOP IF REQUIRED
15. GLOBAL STABILITY CHECK
16. UPDATE MEMORY / STATUS / LEARNING
17. CONTINUE OR HANDOFF AT A REAL GATE
```

Do not invert this into:

```text
code → tests pass → done
```

---

# 17. CONTINUOUS EXECUTION / HANDOFF PROTOCOL

Definitions:

```text
CHECKPOINT
= record progress and continue

REPORT
= summarize progress and continue

HANDOFF
= return control because a real human decision,
  authorization or blocker prevents safe continuation
```

Rules:

```text
CHECKPOINT ≠ STOP
REPORT ≠ HANDOFF
COMMIT ≠ HANDOFF
PHASE END ≠ HANDOFF
```

An agent should not ask “shall I continue?” after every routine phase.

However:

```text
EXPLICIT HUMAN GATE IN MISSION
= STOP THERE
```

Human gates override continuous execution.

---

# 18. BUILDER ≠ CRITIC

The builder and final critic should be separated whenever practical.

Critic qualities:

- fresh context where possible;
- no attachment to implementation choices;
- comparison against named reference/quality bar;
- defect-first language;
- binary or observable judgments where possible;
- no reward for effort;
- no assumption that technical sophistication equals product quality.

Canonical critic verdicts:

```text
KEEP
ADJUST
REJECT
```

`KEEP` means the agent critic accepts the candidate against its criteria. It does **not** mean Juanma has approved it.

---

# 19. GAUNTLET QUALITY LOOP

Use the Gauntlet method for high-value feel/visual subsystems:

```text
build [THING]
at the level of [REFERENCE]

fan out
critic
compare
loop
```

For this project:

```text
THING
= Premium Visitor Presence / Locomotion capability

PRIMARY EXPERIENCE REFERENCE
= TheVertMenthe-like cultural traversal quality
```

The objective is not to imitate TheVertMenthe. It is to compare against its strengths in visitor presence and gallery traversal while exceeding it where our system has explicit goals such as:

- foot-contact synchronization;
- surface-aware response;
- footprints;
- camera stability;
- collision quality;
- artwork handoff;
- mobile architecture;
- reproducible QA;
- semantic visitor state.

---

# 20. FOUR-LAYER QA MODEL

## 20.1 Functional QA

Questions:

- Does input produce the intended movement?
- Does collision prevent traversal through protected geometry?
- Does visitor state remain coherent?
- Does Focus handoff restore control correctly?

## 20.2 Visual QA

Questions:

- Does the avatar appear grounded?
- Do feet/footprints align visually?
- Does the camera frame the visitor/space elegantly?
- Are transitions visibly coherent?

## 20.3 Feel QA

Questions:

- Does movement have weight?
- Is acceleration responsive without twitchiness?
- Does braking feel intentional?
- Does turning feel natural?
- Does camera damping support control instead of fighting it?
- Does walking feel premium rather than browser-demo-like?

## 20.4 Temporal / Instrumented QA

Measure where useful:

- input-to-motion latency;
- time to target speed;
- braking distance;
- turn rate;
- camera lag/damping;
- foot-contact timestamps;
- footstep timestamps;
- footprint spawn timing;
- grounding deltas;
- collision penetration;
- frame time / FPS;
- dropped frames during effects;
- mobile performance.

Instrumentation exists to explain and reproduce feel defects, not to replace human feel judgment.

---

# 21. HUMAN QA / NAVIGABLE RUNTIME PROTOCOL

For an interactive traversal capability:

```text
PREVIEW ACCESS IS PART OF THE DELIVERABLE.
```

A human review package must include, when applicable:

- exact branch/SHA or pinned build;
- exact local/preview launch steps;
- controls;
- known limitations;
- a short recommended test path;
- expected behaviors;
- visual/temporal evidence;
- critic verdict;
- blockers or decisions needed.

Screenshots and recorded video are useful evidence but **do not replace a navigable runtime** when the claim concerns interaction or feel.

The reviewer must be able to test actions such as:

```text
walk
turn
stop
reverse
approach
collide
interact
focus
return
```

without reconstructing the developer environment from memory.

---

# 22. ERROR / LEARNING SYSTEM

Classify defects so knowledge can generalize.

Core categories:

```text
PRODUCT BUG
= behavior contradicts desired product outcome

SYSTEM BUG
= subsystem logic/state is incorrect

FEEL BUG
= technically valid behavior feels wrong

VISUAL BUG
= rendered result is wrong or degraded

PERFORMANCE BUG
= runtime cost harms target experience

INSTRUMENT BUG
= measuring/capture tool cannot be trusted

EVIDENCE BUG
= evidence does not prove the claim

PROCESS BUG
= workflow allowed avoidable failure/rework
```

Each important fixed defect should answer:

- What happened?
- Why did it happen?
- How was it detected?
- What fixed it?
- What regression check prevents recurrence?
- Is the learning local or reusable?
- Should it become a Playbook rule?

---

# 23. DECISION MEMORY

Decisions must be recorded with explicit status.

Recommended states:

```text
PRODUCT DECISION — EXPLICIT
APPROVED
PROPOSED
R&D
REJECTED
SUPERSEDED
FROZEN
```

A proposal is not silently promoted to approval because code exists.

Typical Visitor Engine decisions may include:

- primary locomotion mode;
- camera contract;
- foot-contact event schema;
- collision technology;
- mobile control model;
- integration boundary with Museum.

---

# 24. STATUS / HEALTH REGISTRY

The project must maintain a global operational picture.

Example:

```text
SYSTEM                     STATUS
Locomotion Core            PROPOSED
Acceleration               NOT STARTED
Collision                  NOT STARTED
Third-Person Camera        NOT STARTED
Avatar                     NOT STARTED
Foot Contact               NOT STARTED
Footstep Audio             NOT STARTED
Footprints                 NOT STARTED
Surface Detection          NOT STARTED
Artwork Handoff            NOT STARTED
Navigation Bridge          NOT STARTED
Visitor State              NOT STARTED
Tap-to-Move                R&D
Virtual Stick              R&D
Mobile QA                  NOT STARTED
Human QA                   PENDING
Museum Integration         NOT AUTHORIZED
```

Use severity/priority markers (P0/P1/P2) when useful, but status must remain understandable at first glance.

---

# 25. PROTECTED BASELINES

A proven baseline may be frozen even inside an R&D repository.

When a baseline is declared protected:

- preserve a reproducible branch/SHA;
- do not overwrite it with “improvements”;
- evolve additively;
- maintain rollback;
- compare new candidates against it.

Museum’s active canonical runtime remains externally protected throughout this workstream.

---

# 26. IMPLEMENTATION RECORDS

Material phases should eventually leave an implementation record containing:

- mission;
- starting SHA;
- ending SHA;
- files changed;
- donor capabilities used;
- architecture decisions;
- QA executed;
- evidence paths;
- critic verdict;
- known limitations;
- human approval state;
- next safe action.

An implementation record is durable memory, not marketing copy.

---

# 27. VISUAL PRODUCT CHECKPOINT

Do not allow technical progress to hide product regression.

At material checkpoints ask:

```text
CAN THE USER STILL SEE / FEEL THE PRODUCT GETTING BETTER?
```

If many technical PASS results coexist with reduced clarity, movement quality, spatial presence or reviewability, the checkpoint is not healthy.

For motion systems, first-glance product quality includes:

- immediately readable avatar/visitor;
- grounded motion;
- camera coherence;
- understandable controls;
- absence of obvious clipping;
- no unexplained visual noise;
- smooth start/stop/turn behavior.

---

# 28. MUSEUM-FIRST, ENGINE-GENERIC

Museum is the first proving ground, not the permanent hardcoded identity of the engine.

Design rule:

```text
CAN A SECOND IMMERSIVE WORLD USE THIS CAPABILITY
WITHOUT REWRITING THE VISITOR ENGINE?
```

But do not prematurely generalize abstractions that have not been proved in Museum.

Correct sequence:

```text
PROVE IN MUSEUM-SHAPED SANDBOX
→ IDENTIFY TRUE CONTRACTS
→ EXTRACT REUSABLE CAPABILITY
→ INTEGRATE ONLY AFTER APPROVAL
```

Avoid both extremes:

- museum-specific hacks inside core locomotion;
- speculative universal architecture before real use.

---

# 29. MUSEUM INTEGRATION GATE

This repository does **not** have authority to integrate itself into Museum.

Integration requires all of:

1. stable isolated capability;
2. Best-in-Family audit complete;
3. architecture documented;
4. functional QA PASS;
5. visual QA PASS;
6. feel QA PASS;
7. temporal/instrumented QA appropriate to claims;
8. navigable Human QA package;
9. critic KEEP;
10. Juanma explicit approval;
11. receiving Museum workstream judged safe for integration.

Until then:

```text
MUSEUM INTEGRATION STATUS = NOT AUTHORIZED
```

---

# 30. CODEX EXECUTION PROFILE

Codex is expected to behave as a disciplined implementation agent, not as autonomous Product Owner.

Before each material mission Codex must:

1. read this Playbook;
2. read current project memory documents that exist;
3. verify repo/branch/HEAD/status;
4. identify protected external donors;
5. search proven donor capability before invention;
6. state acceptance criteria;
7. state evidence plan;
8. respect explicit human gates.

Codex may continue automatically across ordinary checkpoints when no real gate exists.

Codex must stop when:

- explicit mission gate is reached;
- Juanma decision is required;
- donor/license provenance is unresolved and affects reuse;
- global integration impact is uncertain;
- active uncommitted work cannot be safely isolated;
- a protected baseline would be modified;
- evidence is insufficient to claim success.

Codex must not stop merely because:

- a commit was created;
- a phase number ended;
- a report can be written;
- one test suite passed.

---

# 31. INITIAL R&D GATE — BEFORE FIRST ENGINE IMPLEMENTATION

The first implementation authorization is intentionally blocked until the donor archaeology is complete.

Required first deliverable in this repository:

# BEST-IN-FAMILY VISITOR ENGINE CAPABILITY MAP V1

It must deeply compare at least:

- Museum / Immersive Worlds;
- Sakura Crossing;
- Central Distric Rubik Sota / RUBIK SOTA 2;
- Claude-of-Duty;
- threejs-game-skills;
- Gauntlet process;
- TheVertMenthe as experience/feel reference.

Required output per subsystem:

```text
CAPABILITY
CANDIDATES
PRIMARY
SECONDARY
DIRECT REUSE
ADAPT / EXTRACT
REJECT
FALLBACK
PROHIBITED REINVENTION
DEPENDENCIES
PROVENANCE / LICENSE NOTE
WHY THIS CHOICE
```

Then propose the target Visitor Presence Engine architecture and exact implementation slice.

**STOP at this architecture/reuse gate.**

No locomotion engine implementation is authorized before Juanma reviews this first Best-in-Family result with ChatGPT.

---

# 32. INITIAL QUALITY THESIS

The engine is successful when the visitor does not merely move through coordinates, but **occupies the world convincingly**.

Target thesis:

```text
INPUT
→ INTENT
→ MOTION
→ BODY / AVATAR RESPONSE
→ GROUND CONTACT
→ SURFACE RESPONSE
→ CAMERA RESPONSE
→ WORLD / POI AWARENESS
→ HUMAN PERCEPTION OF PRESENCE
```

Every subsystem should support that chain.

If a subsystem is technically sophisticated but does not improve presence, control, clarity, performance or reuse, its value must be questioned.

---

# 33. CURRENT STATE AT PLAYBOOK V1 CREATION

```text
Repository created                 PASS
Isolation from active donors       PASS
Playbook V1                        ACTIVE
Implementation                     NOT AUTHORIZED
Best-in-Family audit               NOT STARTED IN THIS REPO
Target engine architecture         PROPOSED / NOT FROZEN
Physics decision                   OPEN
Third-person visitor               TARGET / NOT IMPLEMENTED
TheVertMenthe quality comparison   REQUIRED
Museum integration                 NOT AUTHORIZED
Human QA runtime                   NOT YET AVAILABLE
```

Immediate next mission:

> Codex must clone/read this repository and perform the Best-in-Family donor archaeology and target architecture proposal under this Playbook. It must not implement the engine yet.

---

# 34. FINAL OPERATING RULE

The purpose of this Playbook is not bureaucracy. It is to allow long, ambitious autonomous engineering work **without losing product authority, provenance, quality, reversibility, evidence, human visibility or reusable learning**.

When speed conflicts with safety or product truth:

```text
PRODUCT TRUTH WINS.
```

When invention conflicts with proven owned capability:

```text
PROVEN CAPABILITY WINS UNTIL A BETTER CASE IS DEMONSTRATED.
```

When technical PASS conflicts with lived experience:

```text
THE RUNTIME EXPERIENCE WINS.
```

When agent confidence conflicts with human product authority:

```text
JUANMA DECIDES.
```
