---
card: ds-001-dashboard-empty-state
from: dora
to: sol
phase_from: explore
phase_to: solidify
sigil: nemo
date: 2026-05-10T09:04:00Z
---

<FLOW-handoff>

locked:
  problem: Dashboard.tsx renders KPI grid + heatmap unconditionally. When allSessions.length === 0 (new user, zero sessions), the user sees four KPI cards reading 0, an empty heatmap, and no guidance.
  root_cause: No guard on allSessions.length before the main render path. app-web/src/views/Dashboard.tsx:233
  scope: UI only. No backend, no data model, no route changes. Single file edit.
  conventions:
    - Tailwind utility classes only (no custom CSS)
    - Color tokens: text-ds-text, text-ds-text-secondary, text-ds-text-dim, text-ds-accent
    - Font: font-mono for labels/metadata, font-bold for headings
    - Existing component naming: PascalCase, functional components inline in the file
    - No new files for a Nemo — keep DashboardEmpty inside Dashboard.tsx

open:
  - Guard: allSessions.length === 0 is correct; spaces.length === 0 is not sufficient (user could have spaces with no sessions)
  - Sol AC must define what the empty state shows — do not leave "helpful message" as the criterion

methods_run: [HS]
artifacts: []

</FLOW-handoff>
