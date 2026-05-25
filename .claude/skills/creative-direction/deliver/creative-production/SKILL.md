---
name: ds-creative-direction-creative-production
description: Plans and manages creative production from approved concept to delivered assets — asset list, vendor assignments, timeline, quality checkpoints, and delivery spec. Use when moving approved concepts into production.
tags: [creative-direction, deliver]
model: inherit
---

# Creative Production
**Domain**: Creative Direction | **Phase**: Deliver | **Invocation**: `/ds-creative-direction-creative-production`

## What this produces
A production plan with full asset list and specs, vendor/resource assignments, timeline with milestones, quality checkpoints, file naming conventions, and delivery handoff checklist.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | Asset list, timeline, delivery spec |
| Tuna | Production plan with resource assignments, quality checkpoints, milestone schedule |
| Salmon | Full plan with vendor briefs, file naming conventions, handoff checklist |
| Willy | All methods — full production management framework with contingency planning |

---

## Execution Prompt

You are running Creative Production for [project]. Plan the full production process from approved concept to delivered assets.

**Input**: approved creative concept, asset requirements list, timeline, budget, vendor/team roster.

---

### 1. Asset List and Specs

Document every asset required for production.

| # | Asset Name | Format | Dimensions / Duration | File Format | Quantity | Priority | Owner |
|---|---|---|---|---|---|---|---|
| 1 | [Hero social static] | JPEG/PNG | 1080×1080, 1200×628 | PNG, max 1MB | 2 sizes | P1 | [Designer name] |
| 2 | [Video ad] | MP4 | 1080×1920, 1920×1080 | H.264, <50MB | 2 ratios | P1 | [Video editor] |
| 3 | [Email header] | PNG | 600px wide | PNG | 1 | P2 | |
| 4 | [Landing page hero] | JPEG | 1440×800 | JPEG <200KB | 1 | P2 | |
| 5 | [OOH / print] | PDF | 4800×3000px @300dpi | PDF/X-1a | 3 variants | P3 | |

**Primary asset** (everything else waits for this to be approved): [Asset #]

---

### 2. File Naming Convention

Apply consistently across all files to prevent version chaos.

**Standard format**: `[ProjectCode]_[AssetName]_[Format]_[Version]_[Date]`

**Example**: `PROJ24_HeroSocial_1080x1080_v2_20260525`

**Version control rules**:
- `_v1` = first draft to review
- `_vF` = final approved, ready for handoff
- `_LIVE` = version that went live (archive, never overwrite)
- Never save over a previous version — always increment

**Folder structure**:
```
/[Project]/
  /01_Briefs/
  /02_References/
  /03_InProgress/
  /04_ForReview/
  /05_Approved/
  /06_LIVE/
```

---

### 3. Production Timeline

Work backward from delivery date. Include buffer for review rounds.

| Milestone | Date | Owner | Dependencies | Status |
|---|---|---|---|---|
| Kickoff — brief confirmed | [Date] | [CD/PM] | Approved concept | |
| Asset specs locked | [Date+1] | [CD] | Asset list signed off | |
| First drafts: P1 assets | [Date+X] | [Designer/editor] | Specs locked | |
| Internal review round 1 | [Date+X] | [Creative director] | P1 drafts in | |
| Revisions: P1 assets | [Date+X] | [Designer] | Review notes | |
| Client/stakeholder review | [Date+X] | [PM] | Revised P1 | |
| First drafts: P2 assets | [Date+X] | [Designer] | P1 in review | |
| Final approvals | [Date+X] | [Decision maker] | All revisions done | |
| Final files packaged | [Date+X] | [Designer] | Full approval | |
| Delivery / handoff | [Date+X] | [PM] | Files packaged | |

**Buffer rule**: add 20% to any timeline where a vendor is involved. Add 10% for internal-only production.

---

### 4. Vendor / Resource Assignments

| Role | Name / Agency | Contact | Rate / Budget | Deliverables Assigned |
|---|---|---|---|---|
| Creative director | [Name] | [Email] | [Rate] | Review, final approval |
| Graphic designer | [Name/Agency] | | | Assets 1-4 |
| Video editor | [Name/Agency] | | | Asset 2 |
| Copywriter | [Name] | | | Copy review only |
| Photographer | [Name/Agency] | | | Shoot date: [Date] |

**Vendor brief format** (send to each external vendor):
- Project: [Name]
- Deliverables: [Their specific assets only]
- Specs: [Exact technical specs]
- Timeline: [Their milestones only]
- Contact: [Who they go to with questions]
- Brand guidelines: [Link]
- Reference: [Link to approved concept]

---

### 5. Quality Checkpoints

| Checkpoint | What to verify | Who | Pass criteria |
|---|---|---|---|
| Draft intake | Files received, named correctly, correct dimensions | PM | All specs match asset list |
| Brand compliance | Colors, fonts, logo usage, visual style | Creative director | Zero brand violations |
| Copy accuracy | All copy matches approved brief, no typos, disclaimers included | Copywriter / Legal | Copy locked sign-off |
| Technical QA | File formats, weight, resolution, color profile (RGB vs CMYK) | Designer | All specs met |
| Legal / compliance | Claims, required disclosures, image rights confirmed | Legal | Legal clearance |
| Final approval | Decision maker sign-off on all assets | [Stakeholder] | Written approval |

---

### 6. Delivery Spec and Handoff Checklist

**Delivery format**: [Shared drive / Dropbox / WeTransfer / Brand asset management system]

**Delivery package includes**:
- [ ] All approved final files named per convention
- [ ] Final files in required output formats (web + print versions where applicable)
- [ ] Asset index spreadsheet (name, format, specs, use case)
- [ ] Source files archived (PSD/AI/Figma — not just exports)
- [ ] Usage rights documentation (for any licensed photography or music)
- [ ] Brand guidelines version used (so the recipient has the right reference)
- [ ] Production notes (anything the next team needs to know to extend or repurpose)

**Post-delivery**:
- [ ] LIVE versions archived in `/06_LIVE/`
- [ ] Project folder backed up
- [ ] Vendor invoices collected and filed
- [ ] Production timeline actuals recorded (for estimating future projects)
