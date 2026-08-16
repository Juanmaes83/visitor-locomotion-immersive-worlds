# NIGHT STREET — VISITOR MOVEMENT DONOR AUDIT V1

Status: ACTIVE REUSE / ARCHITECTURE INPUT

Repository audited READ-ONLY:

`StarKnightt/night-street`

Audited ref: `master` / tree `333f064778105640588a95d2c2d150780044e7bf`

License: MIT.

Purpose: determine whether Night Street materially changes the Best-in-Family map for Visitor Presence Engine and Museum visitor movement.

---

## 1. Executive conclusion

Night Street materially changes the Best-in-Family map.

It is not merely a visual reference or a simple WASD controller. It contains a measured first-person human locomotion stack with unusually strong gait, collision, grounding and temporal QA.

Canonical conclusion:

```text
NIGHT STREET
= PRIMARY / PRIMARY-CANDIDATE DONOR
FOR MULTIPLE SLICE-1 MOVEMENT CAPABILITIES.
```

It does NOT replace Immersive Worlds semantic authority, Museum CameraAuthority, third-person body presence, Focus, Guided, mobile interaction, or the Visitor Runtime ownership model.

The correct strategy is selective extraction/adaptation under existing Visitor Presence / Immersive Worlds contracts.

---

## 2. Proven relevant files

Primary implementation evidence:

- `src/scene/walker.ts`
- `src/scene/collide.ts`
- `src/scene/Rig.tsx`
- `src/audio/CityAudio.tsx`
- `src/audio/engine.ts`

Primary QA / evidence evidence:

- `tools/gait.mjs`
- `tools/motion.mjs`
- `tools/collide.mjs`
- `tools/collidelive.mjs`
- `tools/route.mjs`
- `tools/wallslide.mjs`
- `tools/reel.mjs`
- `tools/harness.mjs`
- `README.md`

---

## 3. Capability findings

### 3.1 Human walk / jog locomotion

Night Street implements deliberate human-scale locomotion rather than game-FPS defaults.

Observed design includes:

- walk speed 1.4 m/s;
- jog 3.1 m/s;
- acceleration and deceleration;
- held movement heading through rundown after input release;
- achieved-ground-speed awareness under collision;
- deliberate avoidance of shooter-like movement feel.

Classification:

```text
PRIMARY: Night Street
SECONDARY: Sakura Crossing
ENGINE-STRUCTURE SECONDARY: Claude-of-Duty
```

### 3.2 Step length / cadence / gait

Night Street derives cadence from ground speed divided by step length rather than from an arbitrary interval.

Its gait model links:

```text
GROUND SPEED
→ STEP LENGTH
→ CADENCE
→ GAIT PHASE
→ LEFT/RIGHT FOOTFALL
→ HEAD MOTION
```

This is materially stronger than a fixed stride threshold plus independently advancing body bob.

Classification:

```text
PRIMARY: Night Street
SECONDARY: Claude-of-Duty
PROHIBITED REINVENTION: arbitrary timer-based footsteps when distance/gait evidence exists.
```

### 3.3 Foot contact clock

`Walker.onFootstep(foot)` provides alternating left/right contact timing driven by gait phase.

This is NOT the final Visitor Presence semantic event. Adapt it into:

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

Classification:

```text
PRIMARY TIMING DONOR: Night Street
PRIMARY SEMANTIC CONTRACT: Visitor Presence Engine
```

### 3.4 Head / embodied movement signal

Night Street implements and explains:

- vertical bob;
- lateral sway;
- roll;
- differing walk vs jog profiles;
- smooth transition between them;
- registration of vertical trough relative to footfall;
- pace-dependent amplitude rather than scaling every signal together.

This is directly useful as a movement-feel donor even though our target includes a visible third-person body.

Classification:

```text
PRIMARY MOVEMENT-SIGNAL DONOR: Night Street
THIRD-PERSON BODY APPLICATION: NEW / ADAPT
```

### 3.5 Ground following / small height changes

Night Street separates raw ground height from filtered body/eye response and uses a one-pole lead into a critically damped spring.

It explicitly addresses kerb-like discontinuities without teleporting the body/camera vertically or overshooting.

Classification:

```text
PRIMARY SMALL-STEP / GROUND-RESPONSE DONOR: Night Street
GENERAL 3D GROUNDING / COMPLEX GEOMETRY: still requires Visitor Engine adaptation and escalation policy.
```

### 3.6 Collision and wall sliding

Night Street treats the body as a shoulder-radius disc against analytical SDF discs/boxes.

Relevant behaviors:

- substepping;
- projection of movement into contact normals;
- preservation of tangential motion;
- wall sliding;
- depenetration;
- sequential multi-contact handling;
- collision geometry derived from shared scene data where practical;
- explicit QA for corners and obstacles.

Classification:

```text
PRIMARY-CANDIDATE V1 PLANAR KINEMATIC COLLISION: Night Street
SECONDARY ENGINE DISCIPLINE: Claude-of-Duty
RAPIER: escalation fallback, not current default.
```

This does NOT prove all Museum geometry cases. Stairs, ramps, complex sculpture volumes, overhangs, moving geometry and camera obstruction remain separate evaluation domains.

### 3.7 Deterministic / temporal QA

Night Street exposes a development `window.__scene` surface and supports driven frame stepping instead of wall-clock-only execution.

Relevant ideas:

- deterministic-ish virtual stepping;
- exact camera placement;
- repeatable capture stations;
- real runtime numerical probes;
- CPU gait test independent of browser/GPU;
- movement video/capture validation;
- performance probes;
- collision/wall-slide route tools.

Classification:

```text
PRIMARY MOVEMENT TEMPORAL-QA DONOR: Night Street
PRIMARY GENERAL BROWSER AUTOMATION TOOLING: Playwright hierarchy from current Playbook/tooling policy.
```

### 3.8 Footstep audio architecture

Night Street wires gait footfalls directly to an audio engine and varies footstep rendering by cadence/effort.

Useful later for Slice 1/next movement polish but audio is not required to prove current presence mechanics unless explicitly authorized.

Classification:

```text
SECONDARY / LATER DIRECT-ADAPT DONOR: Night Street
```

---

## 4. What Night Street does NOT solve

Do not overclaim this donor.

It does NOT prove:

- third-person visible human/body architecture;
- skeletal animation;
- foot IK / real mesh foot planting;
- Museum CameraAuthority;
- third-person camera obstruction;
- Focus handoff;
- ExperienceDirector orchestration;
- Museum Hotspot/Action semantics;
- Guided mode;
- mobile/touch navigation;
- tap-to-move;
- complex full-3D physics for every institutional world;
- canonical VisitorState / WorldState ownership.

Its camera is first-person and directly coupled to walker eye/yaw/pitch/roll. That ownership model MUST NOT replace Museum CameraAuthority.

---

## 5. Slice 1 reconciliation finding

Published Slice 1 commit before this donor audit:

`e97f5b3b90b43bc761c350bb88d58d5f564315d6`

The existing Slice 1 proves architecture and a working presence path, but this new donor reveals several areas where the implementation should be re-evaluated before becoming the movement baseline.

Observed existing Slice 1 examples:

```text
strideDistance = 0.86
body bob phase advanced independently via speed * 6.2
collision = AABB push-out style resolution
maxSpeed = 2.65 m/s
```

Those choices were legitimate before Night Street was known, but are now lower-confidence than the measured donor capability.

Therefore:

```text
SLICE 1 STATUS AFTER NIGHT STREET DISCOVERY
= TARGETED RECONCILIATION REQUIRED BEFORE FINAL KEEP.
```

Do NOT discard Slice 1.
Do NOT rewrite architecture.
Do NOT integrate Night Street wholesale.

Perform a focused reuse reconciliation for:

1. human pace / acceleration-deceleration;
2. stride length / cadence / gait phase;
3. left-right foot-contact timing;
4. body/head movement signal mapping to third-person presence;
5. ground following and small height transitions;
6. collision slide/depenetration/multi-contact behavior;
7. deterministic movement QA.

Preserve:

- Visitor Runtime ownership;
- VisitorState semantic contract;
- WorldState projection rules;
- CameraAuthority;
- third-person controller boundary;
- Museum-shaped clean-room sandbox;
- evidence/critic/learning protocols.

---

## 6. Reuse policy

Night Street is MIT but remains a READ-ONLY donor.

For every capability adopted, record:

```text
SOURCE FILE
SOURCE CONCEPT
DIRECT REUSE / ADAPT / EXTRACT / CLEAN REIMPLEMENTATION
WHY
WHAT CHANGED FOR VISITOR PRESENCE
WHAT WAS REJECTED
TEST / EVIDENCE
```

Do not copy visual identity, world content, first-person camera ownership, street-specific constants, audio/world aesthetics or unrelated procedural-rendering code.

---

## 7. Canonical decision

```text
PROVEN CAPABILITY BEFORE NEW CAPABILITY.

NIGHT STREET IS NOW A REQUIRED DONOR
FOR VISITOR MOVEMENT WORK.

THE EXISTING SLICE 1 IS NOT INVALIDATED,
BUT ITS MOVEMENT SUBSYSTEMS MUST BE RECONCILED
AGAINST THIS STRONGER DONOR BEFORE FINAL BASELINE APPROVAL.
```
