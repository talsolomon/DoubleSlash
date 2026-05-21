---
name: ds-manufacturing-manufacturing-spec
description: Writes the manufacturing specification for a product including materials, tolerances, and production requirements. Use when moving from design to production, qualifying suppliers, or asking "exactly how does this product get made". Also triggers on: BOM (Bill of Materials) development, material and component specification, dimensional tolerance design, surface finish specification, process parameter definition, inspection point identification.
tags: [manufacturing, define]
model: inherit
---

# Manufacturing Spec
**Domain**: Manufacturing | **Phase**: Define | **Invocation**: `/ds-manufacturing-manufacturing-spec`

## What this produces
A manufacturing specification with BOM, material specifications, tolerances, production process requirements, and quality acceptance criteria.

## Methods
BOM (Bill of Materials) development, material and component specification, dimensional tolerance design, surface finish specification, process parameter definition, inspection point identification, packaging specification, supplier qualification requirements

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | BOM, key specifications, top 5 quality requirements |
| Tuna | Spec with tolerances, process parameters, inspection points |
| Salmon | Full spec with packaging, supplier qualification requirements |
| Willy | All methods — complete BOM, full tolerance stack, supplier audit checklist |

## Execution prompt
You are running Manufacturing Spec for [project]. Define exactly how this product must be made.

Input: product design files and quality requirements.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Ambiguous specs produce inconsistent products. Every critical dimension needs a tolerance and an inspection method.

Final output: BOM, material specifications, critical tolerances with inspection methods, process requirements, acceptance criteria.
