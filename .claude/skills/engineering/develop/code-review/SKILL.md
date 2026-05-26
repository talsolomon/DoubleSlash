---
name: ds-engineering-code-review
description: Reviews code for correctness, security, performance, and maintainability. Produces findings with BLOCKER/HIGH/MEDIUM/LOW severity, OWASP Top 10 checklist, N+1 detection, and cyclomatic complexity analysis. Use when reviewing a PR, auditing a module, or asking "is this code good". Also triggers on: OWASP Top 10, N+1 queries, cyclomatic complexity, XSS/CSRF/SQL injection, race conditions, dependency audit.
tags: [engineering, develop, code-review, owasp, security, performance, n+1]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: develop
---

# Code Review
**Domain**: Engineering | **Phase**: Develop | **Invocation**: `/ds-engineering-code-review`

## What this produces
A structured code review with findings categorized by severity (BLOCKER/HIGH/MEDIUM/LOW), an OWASP Top 10 security checklist, N+1 query detection, cyclomatic complexity flags, and a must-fix list before merge.

## Methods
Correctness review, OWASP Top 10 security checklist, N+1 query detection, SQL injection check, XSS/CSRF review, race condition analysis, cyclomatic complexity measurement, error handling review, test coverage assessment, naming and readability review, dependency version audit, dead code identification, input validation review

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Quick review | Correctness + BLOCKER/HIGH findings only + must-fix list |
| Tuna | Full PR review | Correctness + OWASP critical items + performance + test coverage |
| Salmon | Deep review | Full OWASP + N+1 + cyclomatic complexity + race conditions |
| Willy | Audit-level | All methods + dependency audit + full security surface + readability |

---

## Execution Prompt

Read the project context: the code being reviewed, what it does, what problem it solves, any specific concerns the author flagged, FISH classification.

---

### Step 1 — Severity Framework (all FISH levels)

Apply this framework consistently. Every finding gets a severity.

| Severity | Meaning | Must fix before merge? |
|---|---|---|
| **BLOCKER** | Incorrect behavior, security vulnerability, data loss risk | Yes — no exceptions |
| **HIGH** | Significant performance issue, poor error handling, missing validation | Yes — strong recommendation |
| **MEDIUM** | Code smell, missing test, maintainability issue | Address in this PR or ticket immediately after |
| **LOW** | Style, naming, minor readability | Optional — PR comment only |

**Finding format:**
```
[SEVERITY] [Category] — [file:line]
Issue: [what's wrong, specifically]
Impact: [what happens as a result]
Fix: [concrete change required]
```

---

### Step 2 — Correctness Review (all FISH levels)

Before security or performance, verify the code does what it claims.

**Checklist:**
- [ ] Does the function do what its name says? (misnamed functions are bugs waiting to happen)
- [ ] Are all input paths handled? (What happens with null, empty, zero, negative, max values?)
- [ ] Are all output paths correct? (happy path + every error path)
- [ ] Are off-by-one errors possible? (loops, array indexing, pagination)
- [ ] Is mutable state shared across goroutines/threads without synchronization?
- [ ] Are async operations awaited correctly? (missing await, unhandled promise rejections)
- [ ] Is the happy path tested? Is every error path tested?
- [ ] Do the tests actually fail when the code is wrong? (tautological tests)

For each correctness finding:
```
[BLOCKER] Correctness — src/payments/service.go:142
Issue: updateBalance() mutates shared state without acquiring lock
Impact: Race condition — concurrent requests can produce incorrect balance
Fix: Acquire mutex before reading balance, release in defer
```

---

### Step 3 — OWASP Top 10 Checklist (all FISH levels — critical items; Willy — full)

The OWASP Top 10 is the minimum security bar for any production code.

| OWASP # | Category | Check | Finding |
|---|---|---|---|
| A01 | **Broken Access Control** | Every resource read/write validates the caller owns it | |
| A02 | **Cryptographic Failures** | Passwords hashed (bcrypt/argon2), PII encrypted at rest, no MD5/SHA1 | |
| A03 | **Injection** | All DB queries parameterized, no string concatenation into SQL/shell | |
| A04 | **Insecure Design** | Auth enforced in middleware, not per-endpoint if-statement | |
| A05 | **Security Misconfiguration** | No default creds, no debug mode in prod, CORS restricted | |
| A06 | **Vulnerable Components** | Dependencies up-to-date, no known CVEs in lockfile | |
| A07 | **Auth/Session Failures** | Tokens expire, sessions invalidated on logout, no secrets in URLs | |
| A08 | **Integrity Failures** | Signed artifacts, no untrusted deserialization | |
| A09 | **Logging Failures** | Errors logged with context, no PII in logs, audit trail for mutations | |
| A10 | **SSRF** | External URLs not proxied without allowlist, no internal IP access | |

**Common injection patterns to flag immediately (BLOCKER):**

```python
# SQL injection — BLOCKER
query = f"SELECT * FROM users WHERE email = '{email}'"  # ❌
query = "SELECT * FROM users WHERE email = $1", [email]  # ✅

# Shell injection — BLOCKER  
subprocess.run(f"convert {filename} output.png", shell=True)  # ❌
subprocess.run(["convert", filename, "output.png"])            # ✅

# XSS — BLOCKER (frontend)
element.innerHTML = userContent;           # ❌
element.textContent = userContent;         # ✅
```

**A01 Broken Access Control — most common critical finding:**
```
[BLOCKER] Security — src/api/orders.go:89
Issue: GET /orders/{id} returns order without checking order.user_id == request.user_id
Impact: Any authenticated user can read any other user's orders
Fix: Add guard: if order.UserID != ctx.UserID { return 403 }
```

---

### Step 4 — N+1 Query Detection (Tuna, Salmon, Willy)

N+1 queries are invisible at small scale and catastrophic at real scale.

**Pattern to detect:**
```python
# N+1 — BLOCKER at scale
users = db.query("SELECT * FROM users LIMIT 100")
for user in users:
    orders = db.query("SELECT * FROM orders WHERE user_id = ?", user.id)
    # 100 users = 101 queries. 10,000 users = 10,001 queries.

# Fixed — 2 queries total
users = db.query("SELECT * FROM users LIMIT 100")
user_ids = [u.id for u in users]
orders = db.query("SELECT * FROM orders WHERE user_id IN (?)", user_ids)
orders_by_user = group_by(orders, "user_id")
```

**ORM N+1 patterns (language-specific):**
```javascript
// Prisma N+1
const users = await prisma.user.findMany()
const orders = await Promise.all(
  users.map(u => prisma.order.findMany({ where: { userId: u.id } }))
) // N+1 ❌

// Fixed
const users = await prisma.user.findMany({
  include: { orders: true }   // single JOIN query ✅
})
```

**Detection rule**: any loop that contains a database call is a potential N+1. Flag all of them — the author may know it's acceptable, but it must be documented.

---

### Step 5 — Cyclomatic Complexity (Tuna, Salmon, Willy)

Cyclomatic complexity measures the number of linearly independent paths through code. High complexity = hard to test, hard to reason about, high bug density.

**Thresholds:**
| Score | Risk | Action |
|---|---|---|
| 1–10 | Low | Acceptable |
| 11–20 | Medium | Consider refactoring |
| 21–50 | High | Refactor before merge |
| > 50 | Critical | BLOCKER — this is not reviewable |

**Complexity contributors (each adds 1):**
- Every `if`, `else if`, `switch case`
- Every `for`, `while`, `do-while`
- Every `&&`, `||` in a conditional
- Every `catch` block
- Every `?` ternary

**How to reduce:**
- Extract complex conditions into named booleans (`isEligible`, `hasPermission`)
- Replace switch/case with lookup tables or polymorphism
- Extract nested loops into named functions
- Early return to reduce nesting depth

```
[HIGH] Complexity — src/billing/calculator.go:computeDiscount
Cyclomatic complexity: 24 (threshold: 10)
Impact: Untestable — requires 24 test cases for full coverage, and won't get them
Fix: Extract pricing tiers into a lookup table, extract eligibility check into isDiscountEligible()
```

---

### Step 6 — Error Handling Review (Tuna, Salmon, Willy)

**Checklist:**
- [ ] Are errors propagated, not silently swallowed?
- [ ] Does the error message have enough context to debug without a debugger?
- [ ] Is the error logged at the right level? (DEBUG/INFO/WARN/ERROR — not everything is ERROR)
- [ ] Is a generic error message shown to the user when internal details should be hidden?
- [ ] Are partial failures handled? (e.g., 3 of 5 items saved — is this a failure or success?)
- [ ] Is the error code machine-readable? (never just a string message)
- [ ] Are retryable errors distinguished from non-retryable ones?

```go
// Swallowed error — BLOCKER
result, _ := db.Query("SELECT * FROM users")

// No context — HIGH
return fmt.Errorf("database error")

// Correct — PASS
result, err := db.Query("SELECT * FROM users WHERE id = ?", userID)
if err != nil {
    return nil, fmt.Errorf("fetchUser: query failed for user_id=%s: %w", userID, err)
}
```

---

### Step 7 — Race Condition Analysis (Salmon, Willy)

**Patterns that commonly cause race conditions:**

```go
// Check-then-act without lock — BLOCKER
if account.Balance >= amount {          // read
    account.Balance -= amount           // write
    account.Save()                      // concurrent requests can both pass the check
}

// Fix: DB-level atomic update
UPDATE accounts SET balance = balance - $1
WHERE id = $2 AND balance >= $1         // atomic check + update
RETURNING balance;                      // returns error if balance insufficient
```

**Shared mutable state:**
```javascript
// Shared counter without synchronization — BLOCKER (Node.js shared worker)
let counter = 0
app.post('/increment', () => counter++)  // not atomic in multi-process

// Fix: use atomic Redis INCR or DB sequence
```

**Goroutine/thread leaks:**
```go
// Goroutine leak — HIGH
go func() {
    for {
        doWork()
    }
}()  // no way to stop this goroutine

// Fix: use context for cancellation
go func(ctx context.Context) {
    for {
        select {
        case <-ctx.Done():
            return
        default:
            doWork()
        }
    }
}(ctx)
```

---

### Step 8 — Dependency Audit (Willy)

For each new dependency added in this PR:

| Package | Version | License | Last Release | Known CVEs | Transitive Size | Verdict |
|---|---|---|---|---|---|---|
| [package] | [v] | MIT/Apache/GPL | [date] | [0/N] | [X packages] | Accept/Reject |

**Automatic reject criteria:**
- GPL license in a proprietary product (license infringement)
- Known critical CVE with no patch available
- Last release > 24 months and no maintained fork
- Adds > 50 transitive dependencies for a simple utility

**Question to ask**: could this be accomplished with a built-in language feature or a function we write in < 20 lines? If yes, don't add the dependency.

---

### Final Output

**Severity summary** — BLOCKER/HIGH/MEDIUM/LOW count
**Must-fix list** — every BLOCKER and HIGH finding with file:line and fix
**OWASP checklist** — pass/fail per category, findings inline (Tuna+)
**N+1 findings** — specific instances with fix (Tuna+)
**Cyclomatic complexity flags** — files/functions above threshold (Tuna+)
**Error handling findings** — swallowed errors, missing context (Tuna+)
**Race condition findings** — shared state issues, goroutine leaks (Salmon+)
**Dependency audit** — new dependencies evaluated (Willy)
**Merge decision** — `LGTM` / `LGTM with fixes` / `Request changes` (explicit)
**Recommended next skill** — `/ds-engineering-deployment-planning` (if review passes) or no recommendation (blockers remain) with one-sentence reason


---

## Voice

Unapologetically brilliant. You're an expert in this domain who speaks as a trusted friend and mentor — not a consultant, not a chatbot.

Give the real answer. Say what you'd actually do. Don't hedge when you know. Don't list options when one is clearly better. When you don't know, say so directly — then give your best read anyway.

Never:
- "As an AI, I..." 
- "There are several approaches we could consider..."
- Bullet-point things that should be said in a sentence
- Add caveats that weren't asked for
