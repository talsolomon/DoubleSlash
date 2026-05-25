---
name: ds-ai-ml-data-requirements
description: Specifies the data needed to train, validate, and run an ML model — feature engineering spec, volume targets, train/val/test split design, labeling schema, collection plan, and data governance requirements.
tags: [ai-ml, define]
model: inherit
---

# Data Requirements
**Domain**: AI/ML | **Phase**: Define | **Invocation**: `/ds-ai-ml-data-requirements`

## What this produces
A data requirements specification with feature list and engineering notes, volume and diversity targets, train/val/test split design, labeling schema and annotation guidelines, collection/acquisition plan, and governance requirements.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | Feature list, volume target, labeling schema |
| Tuna | Requirements with split design, collection plan |
| Salmon | Full spec with annotation guidelines, governance review |
| Willy | All methods — pipeline requirements, privacy review, full schema documentation |

---

## Execution Prompt

You are writing Data Requirements for [project]. Specify exactly what data the ML system needs to work. "More data" is not a spec — be precise about quantity, quality, and provenance.

**Input**: ML problem framing and data landscape assessment.

---

### 1. Feature Specification

For each feature the model will use as input:

| Feature | Type | Source | Engineering required | Missing value strategy | Notes |
|---|---|---|---|---|---|
| [user_age] | Numerical | user_profiles.age | Normalize 0-1 | Impute with median | Cap at 100 |
| [text_content] | Text | posts.body | Tokenize, truncate 512 tokens | Drop if null | Use SentencePiece |
| [category_id] | Categorical | products.category | One-hot encode (N=47 classes) | Use "unknown" class | — |
| [purchase_history] | Sequence | orders table | Last 10 items, pad to length | Pad with 0s | Recency-weighted |

**Feature engineering pipeline steps** (in order):
1. [Data extraction from source]
2. [Join / aggregation]
3. [Cleaning and validation]
4. [Transformation (normalization, encoding, tokenization)]
5. [Feature store / serving layer]

**Feature store design** (for production):
- Training features: computed offline, stored in [BigQuery/S3/feature store]
- Serving features: available at inference time via [API/cache/database]
- Training-serving skew risk: [Any features computed differently offline vs. online?]

---

### 2. Volume and Diversity Targets

```
Total dataset size target: [N examples]
Rationale: [Why this volume — benchmark from similar tasks, model capacity requirements]

Required diversity:
  - [Geographic coverage]: [What regions/languages/markets must be represented]
  - [Temporal coverage]: [What time range — avoid stale data for time-sensitive tasks]
  - [Demographic coverage]: [What user types must be represented to avoid bias]
  - [Edge case coverage]: [What rare-but-important scenarios need explicit examples]

Class balance:
  Class distribution in training data: [Target distribution — not necessarily real-world]
  Rationale: [Why this balance — for imbalanced tasks, oversample minority class to X%]
```

---

### 3. Train/Validation/Test Split

```
Training set:   [70–80%] — used to train model weights
Validation set: [10–15%] — used for hyperparameter tuning and early stopping
Test set:       [10–15%] — held out until final evaluation (touch only once)

Split method: [Random / Stratified / Temporal / Group-based]
  - Random: appropriate when examples are independent
  - Stratified: required when class distribution must be preserved per split
  - Temporal: required for time-series — train on past, test on future (prevents data leakage)
  - Group-based: required when examples are grouped (e.g., same user) — never split a group across train/test

Data leakage check:
  [ ] No features computed using test-set information
  [ ] No test-set examples seen during preprocessing fitting (e.g., scaler fitted on train only)
  [ ] Temporal splits use strict cutoff dates, not random sampling
  [ ] Group splits verified — no user/entity appears in both train and test
```

---

### 4. Labeling Schema

```
Label type: [Binary / Multi-class / Multi-label / Continuous / Sequence / Bounding box]

Label schema:
  [Label 1]: [Definition — precise enough that two annotators independently agree]
  [Label 2]: [Definition]
  
Annotation guidelines:
  - When to choose [Label 1] vs. [Label 2]: [Decision rule with examples]
  - Edge cases: [Common ambiguous cases with prescribed handling]
  - Inter-annotator agreement target: [Cohen's Kappa > 0.7 for classification tasks]
  
Label quality checks:
  - [X]% of examples double-annotated for agreement measurement
  - Disagreements reviewed by [senior annotator / domain expert]
  - Annotation interface: [Labelbox / Scale AI / custom / internal tool]
```

---

### 5. Data Collection and Acquisition Plan

| Data need | Source | Collection method | Timeline | Cost | Owner |
|---|---|---|---|---|---|
| [Labeled examples for task X] | [Internal DB] | [Export + annotation] | [2 weeks] | [$X] | [Name] |
| [Domain-specific text corpus] | [Web scrape] | [Scrapy pipeline] | [1 week] | [Compute cost] | [Name] |
| [Third-party dataset] | [HuggingFace / Kaggle] | [Download + validate] | [2 days] | [Free] | [Name] |

---

### 6. Data Governance and Privacy

| Requirement | Status | Action needed |
|---|---|---|
| Data minimization: use only necessary features | [Met/Not met] | [Remove PII features not needed for model] |
| User consent for model training | [Met/Not met] | [Review terms of service] |
| Data retention limits respected | [Met/Not met] | [Set deletion schedule] |
| GDPR/CCPA right to deletion honored | [Met/Not met] | [Implement data removal from training sets] |
| Model trained on licensed/owned data only | [Met/Not met] | [Audit data sources] |
| Sensitive attributes removed or anonymized | [Met/Not met] | [List attributes: [age/race/gender/health]] |
