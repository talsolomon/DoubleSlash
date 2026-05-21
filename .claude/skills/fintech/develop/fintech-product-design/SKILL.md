---
name: ds-fintech-fintech-product-design
description: Designs the fintech product spec including core flows, compliance features, and integration architecture. Use when building a financial product, designing a fintech MVP, or asking "what exactly does this product do and how does it work". Also triggers on: Core flow design, compliance feature integration, KYC/AML flow design, payment rail selection, API architecture design, banking partner integration design.
tags: [fintech, develop]
model: inherit
---

# Fintech Product Design
**Domain**: Fintech | **Phase**: Develop | **Invocation**: `/ds-fintech-fintech-product-design`

## What this produces
A fintech product specification with core user flows, compliance feature design, API and integration architecture, and MVP scope.

## Methods
Core flow design, compliance feature integration, KYC/AML flow design, payment rail selection, API architecture design, banking partner integration design, fraud and risk feature specification, MVP scope definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Core flows, compliance features, MVP scope |
| Tuna | Product spec with API design, payment rail selection |
| Salmon | Full spec with fraud features, banking integration |
| Willy | All methods — full API spec, compliance flow diagrams, integration runbook |

## Execution prompt
You are running Fintech Product Design for [project]. Specify how the financial product works end to end.

Input: product compliance spec, financial model, and user research.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Design for trust: in fintech, the user's relationship with their money is the product. Every friction point erodes that.

Final output: core user flow specs, compliance feature design, API and integration architecture, MVP scope with rationale.
