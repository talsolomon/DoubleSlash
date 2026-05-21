---
name: ds-blockchain-web3-protocol-design
description: Designs the full protocol architecture including mechanism design, economic model, and technical architecture. Use when building a new DeFi protocol, NFT platform, or Web3 application, or asking "how does this protocol work end to end". Also triggers on: Mechanism design and incentive modeling, tokenomics model design, liquidity and market design, protocol parameter selection, technical architecture (chain selection, L2.
tags: [blockchain-web3, develop]
model: inherit
---

# Protocol Design
**Domain**: Blockchain/Web3 | **Phase**: Develop | **Invocation**: `/ds-blockchain-web3-protocol-design`

## What this produces
A protocol design document with mechanism design, tokenomics model, technical architecture, and security model.

## Methods
Mechanism design and incentive modeling, tokenomics model design, liquidity and market design, protocol parameter selection, technical architecture (chain selection, L2, bridges), oracle and data feed design, security model, composability design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Mechanism design, tokenomics model, technical approach |
| Tuna | Protocol design with liquidity model, chain selection |
| Salmon | Full design with oracle design, security model |
| Willy | All methods — full mechanism spec, composability design, formal parameters |

## Execution prompt
You are running Protocol Design for [project]. Design the protocol that is economically sound and technically safe.

Input: tokenomics research, smart contract spec, and DAO framework.
FISH classification: [Nemo/Tuna/Salmon/Willy]

The most dangerous protocols are ones where the incentive model works until it doesn't. Stress-test at the boundaries.

Final output: mechanism design, tokenomics model, technical architecture, chain and L2 rationale, oracle approach, security model summary.
