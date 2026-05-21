---
name: ds-blockchain-web3-smart-contract-spec
description: Writes the technical specification for smart contracts including logic, access control, and security requirements. Use when scoping a protocol, briefing a dev team, or asking "exactly what does each contract do and what are the security requirements". Also triggers on: Contract architecture design, function specification, state variable design, access control and role model, event and logging specification, upgrade and proxy pattern selection.
tags: [blockchain-web3, define]
model: inherit
---

# Smart Contract Spec
**Domain**: Blockchain/Web3 | **Phase**: Define | **Invocation**: `/ds-blockchain-web3-smart-contract-spec`

## What this produces
A smart contract specification with function definitions, state variables, access control model, event design, and security requirements.

## Methods
Contract architecture design, function specification, state variable design, access control and role model, event and logging specification, upgrade and proxy pattern selection, security requirement definition, audit scope definition

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Contract architecture, key functions, access control |
| Tuna | Spec with state variables, event design, upgrade pattern |
| Salmon | Full spec with security requirements, audit scope |
| Willy | All methods — full function library, security checklist, threat model |

## Execution prompt
You are running Smart Contract Spec for [project]. Define what each contract does before a single line of Solidity is written.

Input: protocol design and tokenomics model.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Vague specs produce buggy contracts. A contract deployed with incorrect logic can cost millions and can't be corrected without migration.

Final output: contract list with purpose, function specs, access control model, event schema, upgrade pattern, security requirements, audit scope.
