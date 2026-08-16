# Critic Input — SLICE-01-PRESENCE

Review this slice as a fresh critic.

Mission goal: first embodied 3D visitor presence in a Museum-shaped Three.js sandbox.

Must prove:

- locomotion 3D;
- grounding;
- character collision;
- visitor position / velocity / yaw;
- visible abstract avatar;
- orientation/body response;
- acceleration/deceleration;
- FootContactEvent left/right;
- surface probe;
- third-person follow camera under CameraAuthority;
- first damping/feel bases;
- diagnostics and temporal evidence.

Hard boundaries:

- Baseline is `b9cc2c2d781684f1fc81aeedaf02de93af9e16b6`.
- Donors read-only.
- No Slice 2, Focus, Guided, Museum integration, visual footprint claims.

Primary evidence:

- `npm.cmd test`
- `npm.cmd run qa:browser:slice-01`
- `docs/evidence/SLICE-01-PRESENCE/`
