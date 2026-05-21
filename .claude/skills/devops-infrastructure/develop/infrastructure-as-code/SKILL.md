---
name: ds-devops-infrastructure-infrastructure-as-code
description: Designs infrastructure-as-code strategy, module structure, and state management approach. Use when codifying infrastructure, planning IaC adoption, or asking "how do we manage infrastructure like software". Also triggers on: IaC tool selection (Terraform/Pulumi/CDK), module structure design, state backend configuration, environment separation strategy, secret management integration, policy-as-code design.
tags: [devops-infrastructure, develop]
model: inherit
---

# Infrastructure as Code
**Domain**: DevOps/Infrastructure | **Phase**: Develop | **Invocation**: `/ds-devops-infrastructure-infrastructure-as-code`

## What this produces
An IaC design specification with tooling selection, module structure, state management approach, secret handling, and testing strategy.

## Methods
IaC tool selection (Terraform/Pulumi/CDK), module structure design, state backend configuration, environment separation strategy, secret management integration, policy-as-code design, drift detection, IaC testing strategy

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Tool selection, module structure, state approach |
| Tuna | IaC spec with environment strategy, secret management |
| Salmon | Full spec with policy-as-code, drift detection |
| Willy | All methods — testing strategy, full module catalog, migration plan |

## Execution prompt
You are running Infrastructure as Code for [project]. Design how infrastructure is defined, versioned, and applied.

Input: infrastructure design, team skill set, and existing tooling.
FISH classification: [Nemo/Tuna/Salmon/Willy]

IaC is infrastructure managed like software — that means version control, review, testing, and CI. Design for the full lifecycle.

Final output: tool recommendation with rationale, module structure, state management approach, secret handling, testing strategy.
