---
name: ds-engineering-api-design
description: Designs complete API contracts — endpoints, schemas, auth, versioning, error handling, pagination, and idempotency. Use when building a new API, integrating services, or asking "what should our API look like". Also triggers on: RESTful API design, OpenAPI/Swagger spec, OAuth 2.0 + RBAC scopes, cursor-based pagination, idempotency key design, webhook design, SDK design.
tags: [engineering, define, api-design, rest, openapi, oauth, idempotency, pagination]
model: inherit
fish: [nemo, tuna, salmon, willy]
phase: define
---

# API Design
**Domain**: Engineering | **Phase**: Define | **Invocation**: `/ds-engineering-api-design`

## What this produces
A complete API contract that frontend and backend engineers can work from simultaneously — resource model, OpenAPI-compatible endpoint definitions, auth model, error catalogue, pagination, idempotency, and versioning strategy.

## Methods
RESTful resource modeling, GraphQL schema design, OpenAPI 3.x spec authoring, OAuth 2.0 + RBAC scope design, JWT validation, rate limiting, cursor-based pagination, idempotency key design, error response standardization, webhook design, backward compatibility analysis, SDK design, API versioning strategy

## FISH Guide
| Fish | Depth | What ships |
|---|---|---|
| Nemo | Contract sketch | Resource model + key endpoints + auth model + error codes |
| Tuna | Full contract | OpenAPI-compatible spec + auth + error catalogue + versioning |
| Salmon | Production API | All above + rate limiting + pagination + idempotency + webhooks |
| Willy | API platform | All methods + SDK design + backward compatibility + governance rules |

---

## Execution Prompt

Read the project context: what feature or integration requires an API, who the API consumers are (frontend, mobile, third parties, internal services), the auth model in use, FISH classification.

---

### Step 1 — Resource Modeling (all FISH levels)

Before designing endpoints, model the resources. Endpoints are derived from resources — not the other way around.

**Rules:**
- Resources are **nouns**, not verbs. `/payments`, not `/makePayment`
- Resources are **plural**. `/users`, not `/user`
- Nested resources express ownership: `/users/{id}/orders` (orders owned by a user)
- Avoid deep nesting (> 2 levels). Prefer: `/orders?user_id=X` over `/users/X/orders/Y/items`

**Resource map:**
```
[Resource]              [Represents]              [Parent]
/users                  User accounts             —
/users/{id}             Single user               users
/users/{id}/sessions    Auth sessions per user    users
/payments               Payment transactions      —
/payments/{id}          Single payment            payments
```

For each resource, define:
- **Ownership** — which service owns it and is authoritative
- **Mutability** — is it append-only, mutable, soft-deleted, or hard-deleted?
- **Visibility** — public / user-scoped / admin-only / service-to-service

---

### Step 2 — Endpoint Definitions (all FISH levels)

Design all endpoints for each resource following REST conventions.

**Standard REST verbs:**
| Method | Path | Semantics |
|---|---|---|
| GET | /resources | List (paginated) |
| POST | /resources | Create |
| GET | /resources/{id} | Read single |
| PUT | /resources/{id} | Replace (full) |
| PATCH | /resources/{id} | Update (partial) |
| DELETE | /resources/{id} | Delete |

**Full endpoint definition format:**
```
POST /api/v1/payments

Summary: Create a new payment transaction
Auth: Bearer token, scope: payments:write
Idempotency: Required (Idempotency-Key header)
Rate limit: 60 requests/minute per user

Request headers:
  Authorization: Bearer {access_token}
  Idempotency-Key: {uuid4}
  Content-Type: application/json

Request body:
  {
    "amount":        integer    // required — amount in cents (avoid floats for money)
    "currency":      string     // required — ISO 4217, e.g., "USD"
    "method_id":     string     // required — UUID of stored payment method
    "description?":  string     // optional — max 255 chars, shown on receipt
    "metadata?":     object     // optional — caller-defined key/value pairs
  }

Response 201 Created:
  {
    "id":            "pay_abc123",
    "status":        "pending",
    "amount":        5000,
    "currency":      "USD",
    "created_at":    "2026-05-24T10:00:00Z"
  }

Response 202 Accepted: [if async processing]
  {
    "id":            "pay_abc123",
    "status":        "processing",
    "poll_url":      "/api/v1/payments/pay_abc123"
  }
```

---

### Step 3 — Error Response Standardization (all FISH levels)

Every API must have a single, consistent error format. Inconsistent errors break client error handling.

**Standard error shape:**
```json
{
  "error": {
    "code":     "VALIDATION_ERROR",
    "message":  "Human-readable description",
    "field":    "amount",
    "docs_url": "https://docs.example.com/errors#VALIDATION_ERROR"
  }
}
```

**Error code catalogue:**
| HTTP Status | Error Code | When to use |
|---|---|---|
| 400 | `VALIDATION_ERROR` | Request body fails schema validation |
| 400 | `MALFORMED_REQUEST` | JSON parse error, missing required header |
| 401 | `UNAUTHORIZED` | Missing or invalid auth token |
| 401 | `TOKEN_EXPIRED` | Valid token format, but exp claim passed |
| 403 | `FORBIDDEN` | Authenticated, but missing required scope |
| 403 | `RESOURCE_FORBIDDEN` | Authenticated user doesn't own this resource |
| 404 | `NOT_FOUND` | Resource does not exist |
| 409 | `CONFLICT` | Duplicate idempotency key with different payload |
| 409 | `STATE_CONFLICT` | Action invalid given current resource state |
| 422 | `UNPROCESSABLE` | Semantically invalid (e.g., payment method expired) |
| 429 | `RATE_LIMITED` | Rate limit exceeded, Retry-After header set |
| 500 | `INTERNAL_ERROR` | Unexpected server failure |
| 503 | `SERVICE_UNAVAILABLE` | Dependency down, retry safe |

**Rules:**
- Never expose stack traces or internal identifiers in error messages
- `message` must be developer-friendly or user-facing — document which
- For 429 responses, always set `Retry-After: {seconds}` header
- For 500 errors, always return a `request_id` for support lookup

---

### Step 4 — Auth Model (all FISH levels)

**OAuth 2.0 with JWT:**
```
Token type: Bearer JWT
Signing: RS256 (asymmetric — public key verifiable without secret)
Expiry: access_token = 15 minutes, refresh_token = 30 days

JWT payload:
  {
    "sub":    "user_uuid",
    "iss":    "https://auth.example.com",
    "aud":    "https://api.example.com",
    "exp":    1234567890,
    "iat":    1234567000,
    "scopes": ["payments:read", "payments:write"]
  }
```

**RBAC scope design:**
| Scope | Grants |
|---|---|
| `{resource}:read` | GET on resource and collection |
| `{resource}:write` | POST, PUT, PATCH on resource |
| `{resource}:delete` | DELETE on resource |
| `{resource}:admin` | All above + admin-only fields and endpoints |

**Scope naming rules:**
- Format: `{resource}:{action}`
- Actions: `read`, `write`, `delete`, `admin`
- Service-to-service: `service:{service-name}` scope for M2M tokens

**Enforcement rule**: every endpoint must validate both:
1. Token is valid and not expired
2. Token contains the required scope for this endpoint
Never mix these checks — missing either is a different error code.

---

### Step 5 — Pagination (Salmon, Willy)

Use cursor-based pagination, not offset pagination. Offset pagination is inconsistent under concurrent writes.

**Cursor-based response envelope:**
```json
{
  "data": [...],
  "pagination": {
    "next_cursor":  "eyJpZCI6MTIzfQ==",
    "prev_cursor":  "eyJpZCI6MTAwfQ==",
    "has_next":     true,
    "has_prev":     true,
    "total_count":  1842
  }
}
```

**Pagination request params:**
```
GET /api/v1/payments?
  cursor=eyJpZCI6MTIzfQ==    // opaque cursor from previous response
  limit=25                    // items per page, default: 25, max: 100
  order=desc                  // sort direction
```

**Cursor implementation:**
- Cursor encodes the stable sort key (e.g., created_at + id)
- Cursor is base64-encoded and opaque to clients — don't document the internal format
- Cursor is stable: adding/removing other records doesn't invalidate it
- Never use row number or offset as cursor — they shift under inserts

---

### Step 6 — Idempotency (Salmon, Willy)

All state-mutating endpoints (POST, PUT, DELETE) must support idempotency.

**Request:**
```
POST /api/v1/payments
Idempotency-Key: 7f9c2ba4-e9d0-4d8a-b4e3-1a2b3c4d5e6f
```

**Server behavior:**
1. Hash the `Idempotency-Key` + authenticated user_id
2. Check idempotency store (cache or DB) for existing result
3. If found and < 24h old: return the stored response with `Idempotency-Replayed: true` header
4. If not found: process, store result, return response
5. If in-flight: return 409 Conflict with `status: processing`

**Idempotency store record:**
```
key:            hash(idempotency_key + user_id)
user_id:        string
request_hash:   hash(request body)  // detect different payload reuse
response_status: integer
response_body:  JSON
created_at:     timestamp
expires_at:     timestamp (24h TTL)
```

**Rule**: if `Idempotency-Key` is reused with a *different* request body, return 409 Conflict immediately — this is a client bug.

---

### Step 7 — Webhook Design (Salmon, Willy)

For async event notifications to external consumers:

**Webhook payload envelope:**
```json
{
  "id":         "evt_abc123",
  "type":       "payment.confirmed",
  "api_version": "2026-05-24",
  "created":    "2026-05-24T10:00:00Z",
  "data": {
    "object": { ... }
  }
}
```

**Delivery contract:**
- Delivery guarantee: at-least-once
- Retry policy: exponential backoff — 1s, 5s, 30s, 2m, 10m, 1h, 6h, 24h (8 attempts)
- Timeout per attempt: 30 seconds
- Success condition: HTTP 200 response from consumer
- Dead letter: after 8 failed attempts, event stored for manual retry

**Webhook security (HMAC signature):**
```
Header: Webhook-Signature: sha256=abc123...
Computed as: HMAC-SHA256(secret, "{timestamp}.{raw_body}")
Consumer validates: compute same HMAC and compare (constant-time comparison)
```

**Webhook failure guidance for consumers:**
- Respond within 30 seconds — do heavy processing async
- Return 200 even for events you don't handle — prevents unnecessary retries
- Validate the signature before processing

---

### Step 8 — Versioning Strategy (all FISH levels)

State the versioning strategy explicitly — changing it later is a breaking change.

**Versioning approaches and when to use each:**

| Strategy | Format | When to use |
|---|---|---|
| URL versioning | `/api/v1/`, `/api/v2/` | Public APIs with external consumers |
| Header versioning | `API-Version: 2026-05-24` | Internal APIs, Stripe-style |
| No versioning | — | Internal microservices with tight coupling |

**Recommended for external APIs: URL versioning**
- Clear to consumers
- Easy to deprecate (`v1` sunset date announced, returns 410 after)
- Simple routing

**Deprecation policy:**
```
Sunset timeline: 12 months notice before removing a version
Sunset header: Sunset: Sat, 24 May 2027 00:00:00 GMT
Deprecation header: Deprecation: true
```

**Backward compatibility rules** (what you can do without incrementing version):
- Add optional request fields
- Add response fields
- Add new endpoints
- Make previously required fields optional

**Breaking changes** (require new version):
- Remove or rename fields
- Change field types
- Change error codes
- Change auth requirements

---

### Final Output

**Resource model** — nouns, hierarchy, ownership, mutability
**Endpoint definitions** — full request/response contracts, all HTTP verbs
**Error catalogue** — standard error shape, code-to-status mapping
**Auth model** — OAuth 2.0 scopes, JWT format, enforcement rules
**Pagination design** — cursor-based, with request params and response envelope (Salmon+)
**Idempotency design** — key handling, store schema, conflict behavior (Salmon+)
**Webhook design** — payload envelope, delivery contract, HMAC security (Salmon+)
**Versioning strategy** — approach, deprecation timeline, backward compatibility rules
**Recommended next skill** — `/ds-engineering-architecture-design` or `/ds-engineering-technical-spec` with one-sentence reason
