---
name: ds-engineering-code-review
description: Reviews code for correctness, security, performance, and maintainability. Use when reviewing a PR, auditing a module, or asking "is this code good" or "what could go wrong here". Also triggers on: Correctness review, security vulnerability scan (OWASP top 10), performance analysis, N+1 query detection, SQL injection check, XSS/CSRF review.
tags: [engineering, develop]
model: inherit
---

# Code Review
**Domain**: Engineering | **Phase**: Develop | **Invocation**: `/ds-engineering-code-review`

## What this produces
A structured code review with categorized findings — bugs, security issues, performance problems, and maintainability concerns — each with severity and suggested fix.

## Methods
Correctness review, security vulnerability scan (OWASP top 10), performance analysis, N+1 query detection, SQL injection check, XSS/CSRF review, race condition analysis, error handling review, test coverage assessment, naming and readability review, dependency version check, dead code identification

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | Correctness review, security scan (critical only), error handling |
| Tuna | Correctness, security, performance, test coverage |
| Salmon | Full review: security, performance, N+1, error handling, readability |
| Willy | All methods — race conditions, dependency audit, full OWASP checklist |

## Execution prompt
You are running Code Review for [project]. Review the provided code and produce actionable findings.

Input: code to review, context about what it does, and any specific concerns.
FISH classification: [Nemo/Tuna/Salmon/Willy]

For each finding:
1. State the issue clearly
2. Assign severity: Critical / High / Medium / Low
3. Provide a concrete fix or recommendation

Final output: findings grouped by severity, must-fix list before merge, suggested improvements.
