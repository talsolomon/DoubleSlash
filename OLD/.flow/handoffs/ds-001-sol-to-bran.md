---
card: ds-001-dashboard-empty-state
from: sol
to: bran
phase_from: solidify
phase_to: build
sigil: nemo
date: 2026-05-10T09:10:00Z
---

<FLOW-handoff>

locked:
  shape: Add DashboardEmpty component to Dashboard.tsx. Early return in Dashboard when allSessions.length === 0.
  file: app-web/src/views/Dashboard.tsx
  archetype: nemo — one slice, no SL needed
  ac:
    - id: AC-1
      criterion: When allSessions.length === 0, Dashboard renders DashboardEmpty and does NOT render the KPI grid, heatmap, or RecentSessions.
    - id: AC-2
      criterion: DashboardEmpty renders exactly — (a) "duble//slash" in font-mono text-ds-text-dim; (b) "No sessions yet. Open any AI tool and press ⌘⇧/ to capture your first session." in text-ds-text-secondary; (c) "your context graph starts here" in text-ds-text-dim text-[10px].
    - id: AC-3
      criterion: When allSessions.length > 0, Dashboard renders identically to before — KPI grid, heatmap, and RecentSessions all present. No regression.
    - id: AC-4
      criterion: DashboardEmpty is defined inside Dashboard.tsx. No new files created.
  conventions:
    - Tailwind utility classes. No new CSS.
    - Color tokens: text-ds-text-dim, text-ds-text-secondary, text-ds-accent, font-mono
    - Component inline in Dashboard.tsx (above the main export, after the RecentSessions component)

open: []

methods_run: [SK, AC]

</FLOW-handoff>
