---
name: ds-blockchain-web3-dao-framework
description: Designs the governance framework for a DAO including voting mechanics, proposal process, and treasury management. Use when launching or restructuring a DAO, or asking "how should our community govern this protocol". Also triggers on: Governance model selection (token-weighted, delegation, multisig), voting mechanism design, proposal lifecycle design, quorum and threshold setting.
tags: [blockchain-web3, define]
model: inherit
---

# DAO Framework
**Domain**: Blockchain/Web3 | **Phase**: Define | **Invocation**: `/ds-blockchain-web3-dao-framework`

## What this produces
A DAO governance framework with voting mechanics, proposal process, quorum and threshold design, treasury model, and governance attack mitigations.

## Methods
Governance model selection (token-weighted, delegation, multisig), voting mechanism design, proposal lifecycle design, quorum and threshold setting, treasury management framework, delegation and representative design, governance attack mitigation, off-chain vs. on-chain governance split

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Governance model, voting mechanics, proposal process |
| Tuna | Framework with quorum design, treasury model |
| Salmon | Full framework with delegation, attack mitigations |
| Willy | All methods — off/on-chain split, full governance spec, emergency mechanisms |

## Execution prompt
You are running DAO Framework for [project]. Design governance that is decentralized, functional, and attack-resistant.

Input: protocol context, token distribution, and community characteristics.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Most DAO governance fails due to low participation or plutocracy. Design for both — make voting easy and make concentrated voting power less decisive.

Final output: governance model rationale, voting mechanics, proposal process, quorum/threshold settings, treasury framework, top 3 attack mitigations.
