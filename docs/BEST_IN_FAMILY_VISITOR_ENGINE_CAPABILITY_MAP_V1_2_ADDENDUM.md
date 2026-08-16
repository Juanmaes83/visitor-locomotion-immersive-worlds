# BEST-IN-FAMILY VISITOR ENGINE CAPABILITY MAP — V1.2 ADDENDUM

Status: ACTIVE CORRECTION / ADDENDUM TO V1.1

This document does not replace or rewrite the full V1.1 map. It records a material new donor discovered after Slice 1 was implemented:

`StarKnightt/night-street`

Canonical donor audit:

`docs/NIGHT_STREET_VISITOR_MOVEMENT_DONOR_AUDIT_V1.md`

---

## 1. Why this addendum exists

Night Street contains stronger proven evidence than previously known for several Visitor Presence movement capabilities.

The Best-in-Family map must therefore change before those Slice 1 subsystems are promoted to a protected baseline.

---

## 2. Updated primary assignments

| Capability | Updated PRIMARY | SECONDARY / supporting | Decision |
|---|---|---|---|
| Human walk / jog movement feel | Night Street | Sakura / Claude-of-Duty | ADAPT |
| Acceleration / deceleration behavior | Night Street | Sakura / Claude-of-Duty | ADAPT |
| Step length / cadence / gait phase | Night Street | Claude-of-Duty | ADAPT / EXTRACT |
| Left/right foot-contact timing | Night Street | Claude-of-Duty | EXTRACT timing into Visitor FootContactEvent |
| Head bob / sway / roll movement signal | Night Street | Claude-of-Duty | ADAPT to third-person/body/camera layers |
| Ground following / small step response | Night Street | Claude-of-Duty | ADAPT |
| Planar obstacle collision / wall slide | Night Street PRIMARY-CANDIDATE | Claude-of-Duty | TARGETED COMPARISON / ADAPT |
| Movement temporal QA | Night Street | Playwright/tooling hierarchy + Claude QA discipline | DIRECTLY ADAPT QA ideas |
| Deterministic movement capture | Night Street | existing Evidence Protocol | ADAPT |
| Museum CameraAuthority | Museum / Immersive Worlds | — | MUST PRESERVE; Night Street camera ownership REJECT |
| Third-person visible body | NEW Visitor Presence capability | Night Street movement signals as donor | BUILD/ADAPT |
| Third-person camera obstruction | NEW Visitor Presence capability | Museum authority + collision/query donors | R&D / later |
| Semantic FootContactEvent | Visitor Presence Engine | Night Street timing + surface probe | BUILD contract, reuse timing |
| Museum semantics / Focus / Guided | Museum / Immersive Worlds | District where applicable | MUST PRESERVE |
| Mobile walk/look | Museum | threejs-game-skills/process | PRESERVE / later adapt |

---

## 3. Prohibited misreadings

```text
NIGHT STREET PRIMARY FOR GAIT
≠ NIGHT STREET OWNS CAMERA.

NIGHT STREET FOOTFALL EVENT
≠ FINAL FOOTCONTACTEVENT.

NIGHT STREET COLLISION
≠ ALL FUTURE MUSEUM PHYSICS SOLVED.

NIGHT STREET FIRST-PERSON BODY SIGNALS
≠ THIRD-PERSON BODY PRESENCE SOLVED.
```

---

## 4. Slice 1 impact

Published Slice 1:

`e97f5b3b90b43bc761c350bb88d58d5f564315d6`

is a valid implementation/evidence gate but was produced without this donor in the capability map.

Therefore the gate changes from:

```text
READY FOR FINAL KEEP / ADJUST / REJECT
```

to:

```text
TARGETED BEST-IN-FAMILY RECONCILIATION REQUIRED.
```

This is not a full restart.

The following Slice 1 areas are specifically reopened:

- pace and acceleration/deceleration;
- stride/cadence/gait phase;
- alternating foot contact timing;
- movement/body signal;
- ground response;
- collision slide/depenetration;
- temporal movement QA.

The following remain protected unless a real bug is demonstrated:

- Slice 0 ownership architecture;
- WorldState/VisitorState boundary;
- CameraAuthority;
- Three.js clean-room Museum-shaped sandbox;
- semantic event shape;
- diagnostics/evidence framework;
- Human Review / Critic / Learning protocols.

---

## 5. Required gate before Slice 2

Before Slice 2 may start, Codex must perform a targeted reconciliation of the reopened Slice 1 capabilities against Night Street and publish a revised Slice 1 gate with appropriate evidence.

The agent must prefer proven Night Street capability where it materially improves correctness/feel and preserve existing Visitor Presence architecture.

No Museum integration is authorized by this addendum.
