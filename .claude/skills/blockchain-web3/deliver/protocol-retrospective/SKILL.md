---
name: ds-blockchain-web3-protocol-retrospective
description: Reviews protocol performance, economic health, and governance effectiveness. Use at regular protocol reviews, after incidents, or asking "is the protocol healthy and what needs to change". Also triggers on: TVL and protocol revenue review, token price and holder analysis, governance participation assessment, security and exploit review, protocol parameter performance review, community health assessment.
tags: [blockchain-web3, deliver]
model: inherit
---

# Protocol Retrospective
**Domain**: Blockchain/Web3 | **Phase**: Deliver | **Invocation**: `/ds-blockchain-web3-protocol-retrospective`

## What this produces
A protocol retrospective report with economic health metrics, governance participation review, security incident analysis, and protocol improvement recommendations.

## Methods
TVL and protocol revenue review, token price and holder analysis, governance participation assessment, security and exploit review, protocol parameter performance review, community health assessment, competitive protocol comparison, improvement proposal backlog

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Protocol health scores, top 3 issues, improvement recommendations |
| Tuna | Retro with governance review, security incident summary |
| Salmon | Full retro with competitive comparison, parameter review |
| Willy | All methods — community health, full economic review, protocol improvement plan |

## Execution prompt
You are running Protocol Retrospective for [project]. Assess whether the protocol is economically healthy and governance-effective.

Input: on-chain data, governance activity, security logs, and community metrics.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Final output: protocol health scorecard (TVL, revenue, governance participation), security incident summary, top 3 systemic risks, protocol improvement recommendations for next governance cycle.
