---
name: ds-engineering-api-design
description: Designs API contracts — endpoints, schemas, auth, versioning, and error handling. Use when building a new API, integrating services, or asking "what should our API look like". Also triggers on: RESTful API design, GraphQL schema design, OpenAPI/Swagger spec, authentication and authorization design, rate limiting strategy, versioning strategy.
tags: [engineering, define]
model: inherit
---

# API Design
**Domain**: Engineering | **Phase**: Define | **Invocation**: `/ds-engineering-api-design`

## What this produces
A complete API contract with endpoint definitions, request/response schemas, auth model, versioning strategy, and error codes.

## Methods
RESTful API design, GraphQL schema design, OpenAPI/Swagger spec, authentication and authorization design, rate limiting strategy, versioning strategy, pagination design, error response standardization, webhook design, idempotency key design, backward compatibility analysis, SDK design

## FISH Guide
| Fish | Run these methods |
|---|---|
| Nemo | RESTful endpoints, request/response schema, auth model |
| Tuna | OpenAPI spec, auth design, error standardization, versioning strategy |
| Salmon | Full API contract, rate limiting, pagination, webhook design |
| Willy | All methods — SDK design, idempotency, backward compatibility, full OpenAPI spec |

## Execution prompt
You are running API Design for [project]. Produce a complete API contract that can be handed to frontend and backend engineers simultaneously.

Input: feature requirements or integration needs.
FISH classification: [Nemo/Tuna/Salmon/Willy]

Design the API systematically: resources first, then endpoints, then schemas, then auth, then errors.

Final output: endpoint list with methods and paths, request/response schemas for each, auth model, error code catalogue, versioning decision.
