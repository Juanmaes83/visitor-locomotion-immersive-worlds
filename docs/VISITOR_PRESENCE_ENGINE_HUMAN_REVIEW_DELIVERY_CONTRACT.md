# VISITOR PRESENCE ENGINE — HUMAN REVIEW DELIVERY CONTRACT

**Status:** MANDATORY OPERATIVE ADDENDUM  
**Repository:** `Juanmaes83/visitor-locomotion-immersive-worlds`  
**Applies to:** every material Human QA handoff under the active Visitor Presence Engine Playbook  
**Source learning:** adapted from Museum V1 Human Review Delivery Contract  

> **A REVIEW LINK WITHOUT A REVIEW MAP IS AN INCOMPLETE HUMAN QA DELIVERY.**

---

# 1. PRIME RULE

A Human QA package must not merely provide a runtime URL, branch, screenshot folder or evidence index.

It must provide:

```text
CORRECT REVIEW SURFACE
+
WORKING HUMAN-ACCESSIBLE ACCESS
+
EXACT CHANGE / CLAIM UNDER REVIEW
+
MINI REVIEW MAP
+
EXPECTED BEHAVIOUR
+
PROTECTED BASELINE
+
KNOWN LIMITATIONS
+
REQUESTED HUMAN VERDICT
```

Juanma must never have to reconstruct from old reports:

- which surface to open;
- where inside the runtime the change lives;
- which control/path reaches it;
- what changed;
- what must remain unchanged;
- what to compare against;
- what evidence proves the claim;
- what verdict to return.

The delivery is incomplete if the reviewer has to discover the review path.

---

# 2. REVIEW SURFACE MUST BE NAMED BY ROLE

Every Human QA handoff must identify the role of each surface it exposes.

Current Visitor Presence Engine review surfaces:

```text
VISITOR RUNTIME QA
= the executable visitor-facing R&D runtime / sandbox

DIAGNOSTICS QA
= ownership, state, timing, invariant and telemetry surface

EVIDENCE QA
= screenshots, video, traces and measured reports

STORYBOARD QA
= contact sheet / demonstration sequence for fast visual review

MUSEUM INTEGRATION QA
= future receiving-product preview only after integration is explicitly authorized
```

Do not collapse these into a generic label such as `preview`.

A technically valid URL/file to the wrong review surface is an invalid Human QA handoff for that question.

`MUSEUM INTEGRATION QA` remains unavailable until Museum integration is explicitly authorized.

---

# 3. CANONICAL ACCESS RULE

For this R&D repository there is no permanent assumption that a specific filename or query parameter is canonical forever.

Therefore each mission must declare the exact current access contract.

Preferred delivery order:

```text
1. COMMIT-PINNED EXTERNAL REVIEW URL
2. STABLE HOSTED PREVIEW
3. BRANCH-HOSTED PREVIEW clearly marked as moving
4. REVIEWER-LOCAL RUNTIME with exact reproducible launch instructions
```

A local URL is not sufficient by itself unless the reviewer can actually reproduce or access the runtime.

Every handoff must state:

```text
SURFACE
BRANCH
COMMIT SHA
ACCESS TYPE: PINNED / MOVING / LOCAL
LAUNCH COMMAND if local
EXACT URL
EXPECTED SUCCESS SIGNAL
```

Never require Juanma to guess ports, routes, query parameters, controls or runtime modes.

---

# 4. MINI REVIEW MAP — REQUIRED

For each changed vertical, the Human QA handoff must contain:

```text
CHANGE
<what changed>

OPEN
<exact review surface + URL/path>

GO TO
<exact location / state / route / evidence frame>

DO
<1–5 short actions>

LOOK FOR
<visual / behavioural / temporal acceptance points>

MUST NOT CHANGE
<protected baseline / unrelated behaviour>

KNOWN LIMITATION
<what is intentionally incomplete or still wrong>

RETURN
KEEP / ADJUST / REJECT
+ one-line reason if ADJUST or REJECT
```

The review map should normally fit in a compact block. Deep diagnostics and implementation records belong elsewhere.

---

# 5. REVIEW THE CHANGE, THEN REVIEW THE CONTAINING PRODUCT SURFACE

Human QA always has two passes when the change is visually or interactively meaningful.

## PASS A — TARGETED CHANGE QA

Review the exact capability delivered.

Examples:

- locomotion acceleration / braking;
- character grounding;
- third-person camera follow;
- foot-contact cadence;
- surface probe;
- artwork approach;
- focus handoff;
- mobile traversal;
- camera obstruction solving.

## PASS B — CONTAINING-SURFACE REGRESSION QA

Then perform a short regression glance over the containing Visitor Runtime surface.

Examples:

```text
Locomotion change
→ also inspect camera coherence, collision, proximity, activeSpace and interaction readiness.

Camera change
→ also inspect visitor visibility, movement readability, clipping, Focus compatibility and controls.

Foot-contact change
→ also inspect body grounding, cadence, audio/visual event timing and movement continuity.

Interaction change
→ also inspect free exploration, nearest hotspot, state continuity and camera authority.
```

A narrow capability PASS does not close the vertical if the containing runtime visibly or behaviourally regressed.

---

# 6. VISITOR RUNTIME REVIEW MAP — BASELINE TEMPLATE

When visitor behaviour changes, review only the relevant subset, but the baseline universe is:

```text
FIRST GLANCE
- runtime loads correctly
- visitor is immediately readable
- no obvious broken/prototype state beyond declared R&D limits
- controls are understandable

MOVEMENT
- start response
- acceleration
- braking / stop
- reverse / direction change
- turn behaviour
- grounding
- collision / doorway / obstacle handling

BODY PRESENCE
- body orientation
- feet / contact readability
- no obvious sliding or floating
- surface relationship

CAMERA
- one authority
- stable follow
- framing
- damping
- obstruction behaviour when in scope
- no clipping / violent correction

WORLD / STATE
- activeSpace continuity
- VisitorState projection
- proximity
- semantic action path

INTERACTION
- approach
- activation
- Focus handoff when in scope
- return / resume continuity

MOBILE
- viewport integrity
- relevant input model
- no desktop-only assumption hidden as mobile support
```

Motion-critical behaviour must be reviewed in motion, not only in screenshots.

---

# 7. EVIDENCE SURFACE REVIEW

Human QA should not be forced to inspect the entire evidence tree.

The handoff must point to the smallest useful set:

```text
PRIMARY VIDEO
PRIMARY CONTACT SHEET
KEY SCREENSHOTS
KEY DIAGNOSTIC REPORT
CRITIC VERDICT
```

If Playwright trace or another diagnostic trace exists, include it only when useful for reproducing the claim or failure.

Evidence must remain representative, not advertising.

---

# 8. PROTECTED BASELINE RULE

Every material review map must explicitly say what must remain unchanged.

Examples:

```text
MUST NOT CHANGE
- Slice 0 camera ownership invariant
- WorldState remains camera-pose free
- VisitorState remains projection, not semantic authority
- Museum donors remain read-only
- approved prior movement/camera behaviour
```

If no protected baseline exists for the vertical, state:

```text
MUST NOT CHANGE
No additional protected product baseline beyond the active Playbook contracts.
```

The reviewer should not have to remember the regression boundary from previous phases.

---

# 9. HUMAN VERDICT FORMAT

For every review item request:

```text
KEEP
= correct enough to preserve as the current baseline

ADJUST
= direction is correct but needs bounded correction

REJECT
= solution should not become the baseline
```

For ADJUST / REJECT, request only the shortest useful human explanation:

```text
WHAT FEELS / LOOKS WRONG?
WHERE?
OPTIONAL: WHAT WOULD GOOD LOOK LIKE?
```

Do not require Juanma to write a technical report.

---

# 10. HUMAN QA DELIVERY TEMPLATE

Every future Human QA handoff should begin with a compact review block similar to:

```text
HUMAN QA — <MISSION>

BUILD
Branch: ...
Commit: ...
Access: pinned / moving / local

OPEN
Visitor Runtime: ...
Diagnostics: ...
Contact Sheet: ...
Primary Video: ...

REVIEW 1 — <change>
CHANGE: ...
OPEN: ...
GO TO: ...
DO: ...
LOOK FOR: ...
MUST NOT CHANGE: ...
KNOWN LIMITATION: ...
RETURN: KEEP / ADJUST / REJECT

REVIEW 2 — <change>
...

KNOWN ISSUE
...

DO NOT REVIEW YET
...
```

Deep evidence, metrics, critic reports and implementation records may follow or be linked separately.

---

# 11. DO NOT REVIEW YET — REQUIRED WHEN SCOPE COULD BE CONFUSED

If the runtime contains unfinished or placeholder areas adjacent to the reviewed change, explicitly state them.

Example:

```text
DO NOT REVIEW YET
- final avatar art direction
- final footstep audio
- footprints
- Focus camera polish
- Museum integration
```

This prevents Human QA from mixing a valid current gate with deliberately deferred capabilities.

---

# 12. CLOSURE RULE

A visually or interactively meaningful vertical cannot move from:

```text
TECHNICALLY CLOSED / HUMAN QA PENDING
```

to:

```text
CLOSED / BASELINE
```

until Juanma has been given:

```text
CORRECT REVIEW SURFACE
+
WORKING ACCESS
+
REVIEW MAP
+
REAL CHANGE TO INSPECT
+
PROTECTED BASELINE
+
KNOWN LIMITATIONS
+
VERDICT REQUEST
```

and a Human verdict has been recorded.

`CRITIC KEEP` does not replace Human QA.

---

# 13. CONTINUOUS EXECUTION RELATIONSHIP

Human QA pending on one vertical does not automatically block the whole mission.

Apply the active Continuous Execution / Handoff Protocol:

```text
BLOCK THE DEPENDENCY, NOT THE PROJECT.
```

If capability A requires Human verdict before dependent capability C:

```text
A → HUMAN QA PENDING
C → BLOCKED BY A

B → independent + authorized + safe
B → CONTINUE
```

The Human Review Delivery Contract determines **how to hand off A clearly**. The Continuous Execution Protocol determines **what the agent should continue while A is pending**.

---

# 14. LEARNING / IMPLEMENTATION RECORD RELATIONSHIP

If Human QA identifies a defect:

1. record the verdict;
2. classify the defect under the Playbook error taxonomy;
3. connect it to the relevant evidence;
4. record fix attempts and result;
5. rerun the appropriate QA;
6. regenerate affected evidence;
7. return an updated review map;
8. preserve reusable learning in the Implementation Record.

Human feedback is not a transient chat comment. It becomes project memory when material.

---

# 15. GENERALIZABLE RULES

Canonical lessons inherited and adapted from Museum:

> **A REVIEW LINK WITHOUT A REVIEW MAP IS AN INCOMPLETE HUMAN QA DELIVERY.**

> **THE HUMAN SHOULD NEVER HAVE TO DISCOVER WHERE THE CHANGE LIVES.**

> **TARGETED CHANGE QA MUST BE FOLLOWED BY A SHORT CONTAINING-SURFACE REGRESSION GLANCE.**

> **THE CORRECT ROLE / SURFACE IS PART OF THE EVIDENCE CONTRACT.**

Additional Visitor Presence rule:

> **MOTION CLAIMS REQUIRE A REVIEW PATH THAT LETS THE HUMAN SEE OR FEEL THE MOTION, NOT ONLY ITS FINAL STATE.**
