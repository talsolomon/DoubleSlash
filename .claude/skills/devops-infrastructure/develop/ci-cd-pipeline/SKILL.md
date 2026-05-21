---
name: ds-devops-infrastructure-ci-cd-pipeline
description: Designs CI/CD pipelines for fast, safe software delivery. Use when setting up automated builds and deploys, improving release velocity, or asking "how do we ship code reliably and quickly". Also triggers on: Pipeline stage design (build/test/scan/deploy), quality gate definition, test strategy integration, deployment strategy selection (blue-green/canary/rolling), rollback mechanism design, secret management.
tags: [devops-infrastructure, develop]
model: inherit
---

# CI/CD Pipeline
**Domain**: DevOps/Infrastructure | **Phase**: Develop | **Invocation**: `/ds-devops-infrastructure-ci-cd-pipeline`

## What this produces
A CI/CD pipeline design with stage definitions, quality gates, deployment strategy, rollback mechanism, and tooling recommendations.

## Methods
Pipeline stage design (build/test/scan/deploy), quality gate definition, test strategy integration, deployment strategy selection (blue-green/canary/rolling), rollback mechanism design, secret management, environment promotion model, pipeline-as-code specification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Pipeline stages, quality gates, deployment strategy |
| Tuna | Full pipeline design with rollback, environment model |
| Salmon | Pipeline spec with security scanning, secret management |
| Willy | All methods — pipeline-as-code spec, full security integration, metrics |

## Execution prompt
You are running CI/CD Pipeline for [project]. Design the automated delivery pipeline from commit to production.

Input: tech stack, deployment target, quality requirements, and current pain points.
FISH classification: [Nemo/Tuna/Salmon/Willy]

The pipeline is the product team's floor. Every minute of build time and every false failure is friction. Design for speed AND safety.

Final output: pipeline stage diagram, quality gates with failure criteria, deployment strategy, rollback design, tooling recommendations.
