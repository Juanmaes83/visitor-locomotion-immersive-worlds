# SLICE-01-PRESENCE Demo Storyboard

1. Runtime 3D loaded: Museum-shaped Three.js sandbox, avatar proxy, diagnostics, CameraAuthority owner.
2. Locomotion + grounding: hold `W`; visitor accelerates, crosses the doorway, remains grounded.
3. Foot contact + surface: continued traversal accumulates left/right FootContactEvent records with marble/stone/wood surface probes.
4. Collision + camera authority: `C` starts a scripted route into the plinth; character collision pushes out while camera remains under `PRESENCE_THIRD_PERSON`.
5. Mobile viewport: emulated 390x844 render stays nonblank and readable enough for audit.
