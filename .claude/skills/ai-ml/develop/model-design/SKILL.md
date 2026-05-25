---
name: ds-ai-ml-model-design
description: Designs the model architecture, training approach, and evaluation methodology — architecture options comparison, fine-tune vs. train-from-scratch analysis, experiment plan, infrastructure sizing, and MLOps pipeline design.
tags: [ai-ml, develop]
model: inherit
---

# Model Design
**Domain**: AI/ML | **Phase**: Develop | **Invocation**: `/ds-ai-ml-model-design`

## What this produces
A model design specification with architecture options and selection rationale, training approach, experiment plan, evaluation methodology, infrastructure sizing, and MLOps pipeline design.

## FISH Guide
| Fish | Depth |
|---|---|
| Nemo | Architecture recommendation, training approach, evaluation method |
| Tuna | Design spec with experiment plan, infrastructure requirements |
| Salmon | Full spec with architecture comparison, MLOps pipeline design |
| Willy | All methods — full experiment matrix, infrastructure sizing, serving architecture |

---

## Execution Prompt

You are running Model Design for [project]. Specify how the ML model should be built and evaluated. Default to the simplest approach that meets the success criteria — complexity in ML systems compounds, so justify every layer of it.

**Input**: ML problem framing and data requirements specification.

---

### 1. Architecture Selection

**Decision tree: what approach to use?**

```
Is a foundation model available for this task?
  Yes → Is fine-tuning sufficient? (i.e., task is close to foundation model's pretraining)
    Yes → Fine-tune → start with LoRA/PEFT for efficiency
    No → Is training from scratch justified by data volume + differentiation?
      Yes → Train from scratch
      No → Prompt engineering + retrieval augmentation
  No → Use task-specific architecture (see table below)
```

**Task-specific architecture reference:**
| Task Type | Recommended architecture | When to consider alternatives |
|---|---|---|
| Tabular classification | Gradient boosting (XGBoost/LightGBM) | Deep learning if > 1M rows and complex feature interactions |
| Tabular regression | Linear/ridge regression → gradient boosting | Deep if strong non-linearity |
| Text classification | Fine-tuned BERT/RoBERTa | Foundation model API if data is small |
| Text generation | Fine-tuned GPT / Claude / Llama | RAG if knowledge grounding needed |
| Image classification | Fine-tuned ResNet/ViT | Train from scratch if domain too specialized |
| Object detection | YOLOv8 / DETR | Task-specific if real-time constraint |
| Recommendation | Matrix factorization → two-tower neural | Transformer if context window needed |
| Time series | ARIMA baseline → LSTM/Transformer | Prophet for interpretable seasonality |

**Selected architecture**: [Architecture name]

**Architecture comparison** (document 2-3 options considered):
| Architecture | Pros | Cons | Score |
|---|---|---|---|
| [Option 1 — recommended] | | | |
| [Option 2] | | | |
| [Option 3] | | | |

**Rationale for selection**: [Why this architecture given the constraints — latency, data volume, team capability, cost]

---

### 2. Training Approach

```
Training strategy: [Fine-tuning / Training from scratch / Prompt-only / RAG / Ensemble]

If fine-tuning:
  Base model: [Model name + version + parameter count]
  Layers to fine-tune: [All / Last N layers / LoRA adapters / Classification head only]
  Why partial fine-tuning: [Compute constraint / regularization / catastrophic forgetting risk]

Training configuration:
  Loss function: [Cross-entropy / MSE / Contrastive / Custom — and why]
  Optimizer: [Adam / AdamW / SGD — and hyperparameter ranges]
  Learning rate: [Initial LR + scheduler — e.g., linear warmup + cosine decay]
  Batch size: [N — and hardware constraint if any]
  Max epochs: [N with early stopping on validation metric]
  Regularization: [Dropout / L2 weight decay / data augmentation]

Data augmentation (if applicable):
  [Text: back-translation, synonym replacement, random masking]
  [Image: random crop, flip, color jitter, mixup]
  [Tabular: SMOTE for class imbalance, feature noise]
```

---

### 3. Experiment Plan

Run experiments in order from cheapest to most expensive. Stop when success criteria are met.

| Experiment | What it tests | Compute | Expected outcome |
|---|---|---|---|
| E1: Naive baseline | Does the data signal exist at all? | Minimal | Validates problem framing |
| E2: Simple model (LR/GBDT) | Can a fast model hit the bar? | Low | Often enough for production |
| E3: Pre-trained model + frozen weights | Does transfer learning work? | Medium | — |
| E4: Fine-tuned model | Full fine-tuning improvement | High | Target architecture |
| E5: Ensemble | Can combining models push past target? | High | Only if E4 misses target |

**Experiment log template:**
```
Experiment: [name]
Config: [key hyperparameters]
Training set size: [N]
Val metric: [score]
Test metric: [score — only reported for final model]
Notes: [what worked / what failed]
Next step: [continue / tune / try next experiment]
```

---

### 4. Evaluation Methodology

```
Primary metric: [metric name + formula]
  Threshold: [minimum acceptable value]
  Measurement: [how computed — e.g., macro-average across all classes]

Evaluation set: [held-out test set — not touched during development]
  Size: [N examples]
  Composition: [how it was sampled — must reflect production distribution]

Subgroup evaluation (required for fairness-sensitive applications):
  [Demographic group A]: [metric — must be within X% of overall metric]
  [Demographic group B]: [metric]

Human evaluation (for generation tasks):
  Rubric: [Define each dimension and scoring scale]
  Sample size: [N examples rated by M raters]
  Inter-rater agreement target: [Cohen's Kappa > 0.7]

Calibration check (for probability-outputting models):
  Expected calibration error (ECE): [target < 5%]
  Reliability diagram: [plot predicted vs. actual probability]
```

---

### 5. Infrastructure Requirements

| Component | Requirement | Tool/Service | Cost estimate |
|---|---|---|---|
| Training compute | [GPU type, count, hours per run] | [AWS/GCP/Azure/local] | [$/run] |
| Data storage | [Dataset size] | [S3/GCS/BigQuery] | [$/month] |
| Experiment tracking | [MLflow/W&B/Neptune] | [Tool name] | [$/month] |
| Model registry | [Versioning, staging, production] | [MLflow/SageMaker/Vertex] | [$/month] |
| Serving | [Latency, throughput, scaling] | [FastAPI/TorchServe/SageMaker] | [$/month] |
| Monitoring | [Performance, drift, data quality] | [Evidently/WhyLabs/custom] | [$/month] |

**MLOps pipeline:**
```
Data → [Feature pipeline] → [Training pipeline] → [Evaluation] → [Registry]
                                                                      ↓
[Monitoring] ← [Production serving] ← [Deployment pipeline] ← [Approval gate]
     ↓
[Retraining trigger] → [Training pipeline] (automated loop)
```
