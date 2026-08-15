# IMMERSIVE WORLDS — VISITOR PRESENCE ENGINE
## AUTONOMOUS ENGINEERING / VISUAL PRODUCT OPERATING PLAYBOOK V1.1
### Evidence · Photographer/Designer · Storyboard · Amnesiac Critic · Learning Record

**Status:** ACTIVE OPERATING CONTRACT — V1.1  
**Repository:** `Juanmaes83/visitor-locomotion-immersive-worlds`  
**Supersedes operationally:** `IMMERSIVE_WORLDS_VISITOR_PRESENCE_ENGINE_PLAYBOOK_V1.md`  
**Relationship to V1:** V1 remains the inherited base contract. This V1.1 adds mandatory execution/evidence/learning rules and overrides V1 only where it is more explicit.  
**Product / visual / final decision authority:** Juanma  
**Architecture / documentation / audit role:** ChatGPT  
**Primary implementation agent:** Codex  
**First proving ground:** Museum / Immersive Worlds  
**Integration status:** NOT AUTHORIZED  

---

# 0. V1.1 PURPOSE

V1 already defines authority, isolation, reuse-before-invention, mission lifecycle, four-layer QA, Builder ≠ Critic, Human QA, Error/Learning, implementation records and Museum integration gates.

V1.1 makes those principles **operationally mandatory and auditable**.

The central rule is:

```text
AN AGENT DOES NOT ONLY DELIVER WORK.
AN AGENT DELIVERS WORK IN A FORM THAT ANOTHER AGENT
AND A HUMAN CAN INDEPENDENTLY VERIFY, REPLAY, CRITICIZE AND LEARN FROM.
```

For every material implementation phase:

```text
CODE
+
TESTS
+
REAL RUNTIME
+
REPRESENTATIVE VISUAL/TEMPORAL EVIDENCE
+
DEMO STORYBOARD
+
PHOTOGRAPHER / DESIGNER REVIEW
+
FRESH AMNESIAC CRITIC
+
IMPLEMENTATION / LEARNING RECORD
+
HUMAN REVIEW PACKAGE
```

No material implementation is complete without the evidence and learning appropriate to the claim.

---

# 1. EVIDENCE IS PART OF THE PRODUCT DELIVERY

```text
NO MATERIAL IMPLEMENTATION
WITHOUT A VISUAL / TEMPORAL EVIDENCE PACKAGE.
```

Different evidence proves different claims:

```text
STATIC EVIDENCE
= composition / pose / clipping / visual state

TEMPORAL EVIDENCE
= movement / timing / transition / synchronization

INTERACTIVE EVIDENCE
= real control / feel / free exploration / recovery

INSTRUMENTED EVIDENCE
= measurable behavior / reproducibility / diagnosis
```

Therefore:

```text
CODE ≠ PROOF
TESTS ≠ PRODUCT PROOF
SCREENSHOT ≠ PROOF OF MOTION
VIDEO ≠ HUMAN INTERACTIVE QA
METRIC ≠ HUMAN FEEL JUDGMENT
```

Use the evidence type required by the claim.

---

# 2. BUILDER EVIDENCE DUTY

The Builder/Codex must define the evidence plan **before** or alongside implementation.

For every material mission the Builder records:

- mission ID;
- starting branch/SHA/status;
- intended product outcome;
- acceptance criteria;
- protected baselines;
- donor capabilities used;
- planned evidence;
- expected Human QA path.

After implementation the Builder records:

- exact ending SHA;
- files changed;
- commands/tools used;
- tests executed;
- runtime launch steps;
- evidence paths;
- metrics produced;
- known limitations;
- unresolved defects;
- what was not tested;
- critic status;
- human approval status.

The Builder may report a technical PASS where proven, but may not self-approve premium visual/feel quality.

---

# 3. PHOTOGRAPHER / DESIGNER AGENT

Every material visual or interaction slice must have a **Photographer / Designer Agent** role separate from ordinary implementation reasoning whenever practical.

Its job is not advertising. Its job is to make the product independently reviewable.

Responsibilities:

1. open the real runtime;
2. inspect the actual user path;
3. identify the critical states/transitions that must be seen;
4. capture representative screenshots;
5. capture temporal evidence/video where motion matters;
6. create a demonstration storyboard;
7. create a storyboard contact sheet when practical;
8. capture adverse/edge cases, not only flattering views;
9. label files so Juanma + ChatGPT can review without guessing;
10. record capture environment, branch/SHA, viewport/device and runtime URL/launch method.

Mandatory principle:

```text
EVIDENCE MUST BE REPRESENTATIVE, NOT ADVERTISING.
```

The Photographer/Designer must not hide:

- clipping;
- awkward turns;
- braking defects;
- collision edge cases;
- bad foot placement;
- camera obstruction;
- low-FPS moments;
- mobile problems;
- known failures.

A beautiful screenshot set that hides the real product path is an **EVIDENCE BUG**.

---

# 4. DEMONSTRATION STORYBOARD PROTOCOL

Every significant interactive capability must define a reviewable demonstration sequence.

The storyboard exists **before or with the recording**, so evidence is not cherry-picked after implementation.

For locomotion/presence, an example sequence is:

```text
01 SPAWN / REST
02 INPUT BEGINS
03 ACCELERATION
04 LEFT FOOT CONTACT
05 RIGHT FOOT CONTACT
06 TURN
07 CAMERA SETTLE
08 STOP / BRAKE
09 REVERSE / DIRECTION CHANGE
10 DOORWAY / NARROW PASS
11 OBSTACLE / SCULPTURE
12 ARTWORK APPROACH
13 CHARACTER SETTLE
14 CAMERA AUTHORITY HANDOFF
15 ARTWORK FOCUS
16 RETURN
17 RESUME FROM SAME VISITOR STATE
```

The exact frames depend on the mission.

Each storyboard step should declare:

- intent;
- expected state;
- expected visual/temporal behavior;
- evidence file(s);
- known issue if any.

When practical create both:

```text
DEMO_STORYBOARD.md
storyboard-contact-sheet.png
```

The contact sheet is a fast visual audit surface for Juanma + ChatGPT.

---

# 5. CANONICAL EVIDENCE FOLDER CONTRACT

Use a stable per-mission structure:

```text
docs/evidence/<MISSION-ID>/
│
├── README.md
├── EVIDENCE_MANIFEST.md
├── HUMAN_REVIEW.md
│
├── storyboard/
│   ├── DEMO_STORYBOARD.md
│   └── storyboard-contact-sheet.png
│
├── screenshots/
│   ├── 01-...
│   ├── 02-...
│   └── ...
│
├── video/
│   ├── primary-demo.webm
│   └── edge-cases.webm
│
├── before-after/
│   ├── before-...
│   └── after-...
│
├── diagnostics/
│   ├── runtime-report.json
│   ├── movement-metrics.json
│   └── ...
│
└── critic/
    ├── CRITIC_INPUT.md
    ├── CRITIC_VERDICT.md
    └── issues/
```

Not every mission requires every file type. The mission must state what is applicable and why.

Do not create fake/empty evidence merely to satisfy the folder shape.

---

# 6. EVIDENCE MANIFEST

`EVIDENCE_MANIFEST.md` must explain what every important artifact proves.

Minimum fields:

```text
MISSION
BRANCH
SHA
RUNTIME / LAUNCH METHOD
CAPTURE DATE
CAPTURE ENVIRONMENT
VIEWPORT / DEVICE PROFILE
CAPTURE TOOL
EVIDENCE FILE
CLAIM PROVED
LIMITATIONS
```

The manifest must distinguish:

```text
OBSERVED
MEASURED
INFERRED
NOT VERIFIED
```

Never upgrade an inference to observed fact because the implementation appears plausible.

---

# 7. BEFORE / AFTER PROTOCOL

When changing an already existing material capability, produce before/after evidence whenever meaningful.

Prefer controlled comparison:

```text
SAME SPAWN
SAME TEST PATH
SAME INPUT SEQUENCE
SAME VIEWPORT
SAME DURATION
SAME REFERENCE STATE
```

Files should be paired clearly, for example:

```text
camera-v01-before.webm
camera-v02-after.webm
```

If before/after cannot be controlled, document why.

---

# 8. VIDEO / TEMPORAL EVIDENCE

Motion claims require temporal evidence.

Record the full relevant transition, not only the final state.

For Visitor Presence, video may need to prove:

- input response;
- acceleration;
- deceleration;
- turn behavior;
- stop distance;
- left/right cadence;
- foot-contact synchronization;
- camera follow/damping;
- camera obstruction recovery;
- collision behavior;
- artwork approach;
- Focus handoff;
- Return;
- continuity of VisitorState.

Temporal evidence must not be edited in a way that hides timing defects.

---

# 9. INSTRUMENTED EVIDENCE

Metrics are used to diagnose and reproduce feel, not to replace perception.

Useful candidates include:

- input-to-motion latency;
- time to target speed;
- stopping distance;
- turn rate;
- camera lag/damping;
- foot-contact timestamps;
- footstep timestamps;
- footprint spawn timing;
- grounding delta;
- collision penetration;
- frame time/FPS;
- dropped frames;
- mobile frame cost.

Every metric must identify:

- measurement method;
- tool/instrument;
- sample/run conditions;
- known measurement limitations.

If the measuring instrument is unreliable, classify the problem as `INSTRUMENT BUG`, not product failure.

---

# 10. FRESH / AMNESIAC CRITIC PROTOCOL

For high-value visual/feel work, the final critic should be **fresh / amnesiac** whenever practical.

The critic receives only what is needed to judge the output fairly:

- quality bar/reference;
- mission acceptance criteria;
- runtime or evidence package;
- controls/test path where needed.

The critic should NOT be biased by:

- Builder implementation rationale;
- hours/effort invested;
- technical difficulty;
- desired approval outcome;
- excuses for known defects;
- Builder self-score.

The critic evaluates observable outcome.

Canonical verdict:

```text
KEEP
ADJUST
REJECT
```

The critic must cite concrete evidence/timecodes/states where possible.

Good example:

```text
ADJUST
At the 90-degree direction change the camera commits before the body,
creating a short disconnected feeling.
Evidence: desktop-free-walk.webm 00:08–00:10.
```

Bad example:

```text
8.5/10, looks pretty good.
```

Record critic output in:

```text
docs/evidence/<MISSION-ID>/critic/CRITIC_VERDICT.md
```

And preserve:

```text
BUILDER CLAIM
vs
CRITIC VERDICT
vs
JUANMA VERDICT
```

This difference is learning data.

---

# 11. HUMAN REVIEW PACKAGE

`HUMAN_REVIEW.md` must make review immediate.

Minimum content:

```text
MISSION
BRANCH
SHA
RUNTIME URL / LOCAL LAUNCH COMMAND
WHAT CHANGED
WHAT TO TEST
CONTROLS
RECOMMENDED DEMO PATH
EXPECTED BEHAVIOR
KNOWN ISSUES
EVIDENCE INDEX
CRITIC VERDICT
DECISIONS NEEDED FROM JUANMA
```

The reviewer must not need old chat context to know where to look or what to test.

For interactive work:

```text
SCREENSHOTS + VIDEO
ARE SUPPORTING EVIDENCE
NOT A REPLACEMENT FOR NAVIGABLE RUNTIME.
```

---

# 12. PLAYWRIGHT / BROWSER AUTOMATION POLICY

Playwright is an **evidence / automation instrument**, not the final product judge.

Appropriate uses:

- open real runtime;
- verify load;
- set reproducible viewport;
- run deterministic states;
- capture screenshots;
- capture UI states;
- inspect browser console;
- mobile viewport checks;
- regression checks;
- automated capture helpers;
- support storyboard generation.

Playwright does not prove premium movement feel by itself.

Tool policy:

```text
EXISTING TOOL ALREADY AVAILABLE
→ use when mission authorizes QA

NEW PROJECT DEV DEPENDENCY
→ declare before adding; architecture/human approval when material

TEMPORARY LOCAL QA TOOL
→ isolate, document, do not pollute runtime dependencies

GLOBAL MACHINE CHANGE / PRIVILEGED INSTALL
→ explicit approval required
```

Prefer QA tooling as dev-only tooling, never as Visitor Runtime production dependency unless separately justified.

---

# 13. CLI / TOOL USE POLICY

Normal local development/QA commands do not require a human checkpoint each time.

Examples:

- git inspection;
- npm scripts;
- Vite/local server;
- tests;
- Playwright where already authorized/available;
- build;
- static server;
- diagnostics;
- screenshots/capture scripts.

Stop and ask/record a gate for:

- new material dependency;
- global machine changes;
- administrator/elevated permissions;
- credentials/login;
- destructive commands;
- modifying another repository;
- external publishing;
- merge/stable baseline changes;
- paid infrastructure/services.

This preserves continuous execution without hiding material environment changes.

---

# 14. IMPLEMENTATION RECORD — HOW IT WAS DONE

Every material implementation phase MUST leave a durable record under:

```text
docs/implementation-records/<MISSION-ID>_IMPLEMENTATION_RECORD.md
```

This is mandatory learning infrastructure.

Minimum record:

## A. Mission

- mission ID/name;
- requested outcome;
- acceptance criteria;
- starting branch/SHA/status;
- protected baselines;
- explicit human gates.

## B. Architecture / Donors

- donor files/capabilities inspected;
- PRIMARY / SECONDARY donors used;
- code/patterns adapted;
- code/patterns rejected;
- provenance/license notes;
- architecture decisions made.

## C. How It Was Implemented

Document concretely:

- sequence of implementation;
- files created/modified;
- important algorithms/math;
- state ownership;
- update order;
- configuration/tuning values introduced;
- runtime/build changes;
- tools/commands used;
- test harnesses used;
- capture tooling used.

Do not write only “implemented locomotion”. Explain the actual mechanism at the level needed by the next competent agent.

## D. Problems Encountered

For every material problem record:

```text
PROBLEM
SYMPTOM
WHERE / WHEN IT APPEARED
CLASSIFICATION
ROOT CAUSE (known / suspected)
ATTEMPTS MADE
WHAT FAILED
WHAT WORKED
FINAL FIX / CURRENT MITIGATION
REGRESSION CHECK
REUSABLE LEARNING
```

Do not erase failed attempts from history when they teach something useful.

Do not pretend the root cause is known if it is only suspected.

## E. QA Performed

- functional QA;
- visual QA;
- feel QA;
- temporal/instrumented QA;
- browser/device/viewport;
- commands/tests;
- pass/fail results;
- evidence paths;
- instrument limitations.

## F. Photographer / Storyboard

- Photographer/Designer role used;
- capture method;
- storyboard path;
- screenshot paths;
- video paths;
- contact-sheet path;
- missing evidence and why.

## G. Critic

- critic identity/role;
- what context it received;
- quality bar;
- verdict;
- evidence cited;
- adjustments requested;
- whether re-loop occurred.

## H. Human Status

- Human QA package path;
- Juanma verdict if available;
- approved / adjust / rejected / pending;
- exact unresolved decisions.

## I. Final State

- ending branch/SHA;
- git status;
- files changed;
- known limitations;
- rollback point;
- next safe action.

---

# 15. PROBLEM / ATTEMPT / LEARNING LEDGER

Important implementation problems must also be promotable to `ERROR_LEARNING_LOG.md` when reusable.

Canonical categories inherited from V1:

```text
PRODUCT BUG
SYSTEM BUG
FEEL BUG
VISUAL BUG
PERFORMANCE BUG
INSTRUMENT BUG
EVIDENCE BUG
PROCESS BUG
```

For each reusable learning answer:

```text
WHAT HAPPENED?
WHY?
HOW WAS IT DETECTED?
WHAT ATTEMPTS FAILED?
WHAT FIXED / MITIGATED IT?
HOW DO WE PREVENT REGRESSION?
LOCAL OR REUSABLE?
SHOULD IT CHANGE THE PLAYBOOK?
```

A failed attempt that prevents future wasted work is valuable project memory.

The goal is cumulative engineering intelligence, not a clean-looking history.

---

# 16. LEARNING PROMOTION RULE

At the end of every material phase, explicitly classify new knowledge:

```text
LOCAL IMPLEMENTATION DETAIL
PROJECT-SPECIFIC LEARNING
VISITOR-ENGINE REUSABLE LEARNING
IMMERSIVE-WORLDS REUSABLE LEARNING
GENERIC PLAYBOOK CANDIDATE
```

If a lesson repeatedly prevents defects/rework, promote it upward into the appropriate contract or Playbook.

This is how the operating system learns instead of merely accumulating commits.

---

# 17. MATERIAL PHASE COMPLETION GATE

A material implementation phase is not complete until applicable items are present:

```text
[ ] code/runtime candidate
[ ] tests
[ ] branch/SHA/status recorded
[ ] real runtime launch method
[ ] functional evidence
[ ] visual evidence
[ ] temporal/video evidence when motion matters
[ ] instrumented evidence when claimed
[ ] Photographer/Designer capture
[ ] demo storyboard
[ ] evidence manifest
[ ] fresh/amnesiac critic
[ ] critic verdict
[ ] implementation record
[ ] problems/attempts/learning recorded
[ ] Human Review package
[ ] known limitations
[ ] rollback point
[ ] next safe action
```

If an item is not applicable, record `N/A` and why.

Do not silently omit required evidence.

---

# 18. VISUAL PRODUCT CHECKPOINT — ENFORCED

At every material checkpoint ask:

```text
CAN JUANMA + CHATGPT ACTUALLY SEE AND JUDGE
THE PRODUCT CHANGE WITHOUT TRUSTING THE BUILDER'S DESCRIPTION?
```

If no:

```text
CHECKPOINT = NOT REVIEW-READY
```

Many technical PASS results do not compensate for invisible or unreviewable product change.

The review package should make regression visible, not merely success visible.

---

# 19. CURRENT APPLICATION OF V1.1

Archaeology/document-only missions do not require fake runtime photography.

For Archaeology V1.1 the evidence remains primarily:

- repository/code evidence;
- file/SHA provenance;
- architecture comparison;
- documented corrections;
- auditability in GitHub.

The full Photographer/Storyboard/Temporal/Human-runtime protocol becomes mandatory from the first executable implementation slice.

No implementation authorization is granted by this document.

---

# 20. FINAL V1.1 RULE

```text
BUILD
→ PROVE
→ SHOW
→ CRITICIZE
→ RECORD HOW IT WAS DONE
→ RECORD WHAT WENT WRONG
→ RECORD WHAT WAS LEARNED
→ MAKE HUMAN REVIEW EASY
→ THEN DECIDE
```

The repository must become progressively smarter after every mission.

A future agent should not only know **what exists**. It should know:

- why it exists;
- how it was built;
- which donor knowledge was used;
- which attempts failed;
- which defects appeared;
- how they were diagnosed;
- how they were fixed;
- how the result was proven;
- what the critic thought;
- what Juanma decided;
- and what must never be rediscovered from scratch.

That durable learning is part of the product.