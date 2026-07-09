---
title: "REST"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 17
summary: "REST is an API style that models resources with URLs and uses HTTP methods to read or change them."
---

## Problem It Solves

Backend systems need a clear way for clients to read and change data over the network. Without a common style, every API can invent its own verbs, paths, error handling, and request format.

REST gives APIs a simple shape based on resources, URLs, HTTP methods, status codes, and representations such as JSON. It makes APIs easier to understand, test, cache, document, and integrate with standard HTTP tools.

## One-Sentence Definition

REST is an API architectural style where clients interact with resources through URLs, standard HTTP methods, and resource representations.

## How I Probably Think About It

"Expose things as URLs, then use HTTP verbs to say what I want to do with them."

## Interview Explanation (30 Seconds)

REST is a common style for designing HTTP APIs. The API is organized around resources, such as users, orders, or invoices. Each resource has a URL, and clients use HTTP methods like `GET`, `POST`, `PUT`, `PATCH`, and `DELETE` to interact with it. A `GET /orders/123` reads an order, while `POST /orders` creates one. Good REST APIs use HTTP status codes, predictable resource names, pagination for large lists, and idempotency for retryable writes where needed. The trade-off is that REST is simple and widely supported, but it can become awkward for complex queries, chatty workflows, or strongly typed service-to-service calls.

## When To Use It

- You are building a public or internal HTTP API.
- Clients need a simple, widely understood integration style.
- The domain can be modeled as resources.
- Standard HTTP caching, status codes, headers, and tooling are useful.
- Human-readable request and response payloads are helpful.
- Backward-compatible API evolution matters.

## When NOT To Use It

- The client needs flexible nested queries across many resources.
- The workflow requires many small calls and becomes too chatty.
- Low latency and compact binary payloads matter more than readability.
- The API is mostly commands or streaming rather than resource operations.
- Strong schema contracts and generated clients are the main priority.

## Alternatives

- Use GraphQL when clients need flexible queries and control over response shape.
- Use gRPC for strongly typed service-to-service APIs with efficient binary transport.
- Use message queues for asynchronous work that does not need an immediate response.
- Use webhooks to notify another system when something changes.
- Use RPC-style HTTP endpoints when the operation is naturally a command.

## Pros

- Easy to understand and use with standard HTTP tools.
- Works well for CRUD-style resource APIs.
- Uses familiar HTTP methods and status codes.
- Can benefit from HTTP caching for safe reads.
- Simple to expose to browsers, mobile apps, and external integrations.
- Usually easier to debug than binary protocols.

## Cons

- Can lead to over-fetching or under-fetching data.
- Complex workflows may require many requests.
- Resource modeling can become forced for command-heavy domains.
- API versioning and backward compatibility still need discipline.
- Different teams may interpret REST rules differently.
- JSON payloads can be larger and less strict than typed binary contracts.

## Common Interview Questions

- What is REST?
- What makes an API RESTful?
- What is the difference between `GET`, `POST`, `PUT`, `PATCH`, and `DELETE`?
- Which HTTP methods should be idempotent?
- How should a REST API handle errors?
- How would you design a REST endpoint for a resource?
- How is REST different from GraphQL?
- How is REST different from RPC or gRPC?

## Related Concepts

- Pagination
- Idempotency
- Rate Limiting
- Caching
- GraphQL
- gRPC
- Message Queues

## What I'd Probably Say Instead

"I would use REST when the API maps cleanly to resources and I want a simple HTTP contract. I would name resources with nouns, use HTTP methods for actions, return clear status codes, and keep list endpoints paginated. For writes that clients may retry, I would think about idempotency. If clients need highly flexible queries or the services need strict generated contracts, I would consider GraphQL or gRPC instead."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Thing the API exposes | Resource |
| Address for that thing | URI / URL |
| Read the thing | `GET` |
| Create a new thing | `POST` |
| Replace the thing | `PUT` |
| Change part of the thing | `PATCH` |
| Remove the thing | `DELETE` |
| Data sent back to the client | Representation |
| Same request can be retried safely | Idempotent method |
| Use HTTP response meaning | Status code |
