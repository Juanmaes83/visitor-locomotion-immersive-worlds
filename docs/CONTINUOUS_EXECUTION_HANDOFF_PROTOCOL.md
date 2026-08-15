# VISITOR PRESENCE ENGINE — CONTINUOUS EXECUTION / HANDOFF PROTOCOL

**Status:** ACTIVE OPERATIVE ADDENDUM  
**Applies to:** all Codex implementation / QA / evidence missions  
**Inherits:** `IMMERSIVE_WORLDS_VISITOR_PRESENCE_ENGINE_PLAYBOOK_V1_1.md`

---

# 1. DEFAULT STATE

```text
DEFAULT STATE = CONTINUE EXECUTION
```

A checkpoint, report, commit, failed test, QA finding, phase boundary, evidence capture, critic finding or blocked subtask does not automatically return control to Juanma.

```text
CHECKPOINT ≠ STOP
REPORT ≠ HANDOFF
COMMIT ≠ HANDOFF
PHASE END ≠ HANDOFF
FAILED TEST ≠ GLOBAL STOP
BLOCKED WORKSTREAM ≠ GLOBAL STOP
```

The agent must continue every next action that is still:

- authorized;
- bounded;
- independent of the blocker;
- reversible where required;
- globally safe;
- useful to the current mission.

---

# 2. PARALLEL / INDEPENDENT WORK RULE

If task A becomes blocked by a real Human Gate, validation dependency or unresolved decision, the agent must not invent an answer for A.

Instead:

```text
A = BLOCKED / AWAITING HUMAN OR QA
```

Then inspect the remaining mission.

If task B is independent of A and can be executed safely without assuming the unresolved result of A:

```text
CONTINUE B
```

The agent should preserve A exactly, record the blocker, and continue B/C/D as appropriate.

Example:

```text
A. Camera feel requires Juanma visual approval      → BLOCKED
B. Evidence manifest can be completed              → CONTINUE
C. Performance diagnostics are independent          → CONTINUE
D. Footprint implementation depends on A decision  → DO NOT START
```

A local blocker may stop only its dependency chain, not the whole mission.

---

# 3. HANDOFF TEST

Before stopping, the agent must be able to complete both lines concretely:

```text
I NEED JUANMA TO DECIDE / VALIDATE:
<specific unresolved decision or human QA result>

BEFORE I CAN SAFELY EXECUTE:
<specific next authorized action that genuinely depends on it>
```

If both lines cannot be filled concretely, there is no valid Human Gate for the whole mission.

Continue safe independent work.

---

# 4. VALID HANDOFF CONDITIONS

A real handoff exists when at least one of these applies:

1. explicit Human Gate in the mission has been reached;
2. a product / visual / feel decision requires Juanma;
3. required Human QA cannot be replaced by automated evidence;
4. external access / credential / environment blocker prevents the dependent work;
5. protected baseline would need modification;
6. donor / licence provenance prevents the dependent reuse decision;
7. global outcome stability cannot be demonstrated;
8. every remaining authorized task depends on the unresolved blocker.

If only one workstream is blocked and another independent workstream remains safe, continue the independent workstream.

---

# 5. STOP-GATE SELF CHECK

Before handoff, answer:

```text
1. Is the next action defined?
2. Is it authorized by the current mission / Playbook?
3. Is it bounded?
4. Can global outcome stability be demonstrated?
5. Does it genuinely require Juanma / external resolution first?
```

Decision:

```text
1–4 = YES
5   = NO
→ CONTINUE

5 = YES
→ BLOCK ONLY THE DEPENDENT WORKSTREAM

ALL REMAINING WORK DEPENDS ON 5
→ HANDOFF
```

---

# 6. QA / CRITIC RULE

A QA failure or critic `ADJUST` verdict is normally an instruction to iterate, not a handoff.

If the correction is:

- inside current scope;
- authorized;
- technically bounded;
- independent of a new human product decision;

then:

```text
FIX
→ RE-RUN QA
→ RE-CAPTURE EVIDENCE
→ RE-CRITIC
→ CONTINUE
```

If the critic exposes a genuine product-choice ambiguity, preserve the candidate and mark that dependency for Human QA while continuing unrelated safe work.

---

# 7. NO MISSION INVENTION

Continuous execution does not authorize inventing new scope.

```text
CONTINUE AUTHORIZED WORK
≠
INVENT NEW MISSION
```

When all authorized independent work is complete and the remaining work requires a Human Gate, stop and hand off.

---

# 8. HANDOFF PACKAGE

When a true handoff occurs, report:

- blocked workstream;
- exact blocker;
- exact decision / validation required;
- what has already been completed;
- what independent work continued after the blocker;
- what remains blocked by dependency;
- evidence / Human Review path;
- exact next action after approval.

Do not use a generic `waiting for approval` when only one subtask is blocked.

---

# 9. CANONICAL OPERATING RULE

```text
BLOCK THE DEPENDENCY, NOT THE PROJECT.

CONTINUE EVERYTHING THAT IS
AUTHORIZED + INDEPENDENT + SAFE.

HANDOFF ONLY WHEN THE NEXT SAFE AUTHORIZED ACTION
GENUINELY REQUIRES HUMAN OR EXTERNAL RESOLUTION.
```
