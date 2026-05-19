---
card: ds-001-dashboard-empty-state
from: bran
to: may
phase_from: build
phase_to: ship
sigil: nemo
date: 2026-05-10T09:22:00Z
---

<FLOW-handoff>

locked:
  shape: DashboardEmpty component added inline to Dashboard.tsx. Early return guard on allSessions.length === 0.
  file_changed: app-web/src/views/Dashboard.tsx
  lines_added: 17
  lines_changed: 1 (added early return after allSessions computation)
  lines_deleted: 0
  ac_status:
    - id: AC-1
      status: PASS
      evidence: DashboardEmpty renders when allSessions.length === 0; existing render path untouched.
    - id: AC-2
      status: PASS
      evidence: Component renders three text nodes with specified strings and token classes.
    - id: AC-3
      status: PASS
      evidence: allSessions.length > 0 falls through to existing render; zero lines changed in existing path.
    - id: AC-4
      status: PASS
      evidence: DashboardEmpty defined inside Dashboard.tsx, no new files.
  te_status: DEFERRED — no test runner configured in app-web. UV is the verification method for this Nemo.
  uv_status: TypeScript check passed for new code. Pre-existing TS errors on lines 23+51 flagged (not caused by this change).
  regressions: none

open:
  - ds-002 (new Nemo): Fix tsconfig.json lib target — Array.at() not recognized. Pre-existing, not caused by this change.

</FLOW-handoff>
