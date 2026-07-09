---
title: "GraphQL"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 18
summary: "GraphQL is an API query language that lets clients ask for exactly the data shape they need."
---

## Problem It Solves

REST APIs often expose fixed responses. That works well for many resource APIs, but it can be awkward when different clients need different shapes of related data.

A mobile screen might need a user, recent orders, and a few fields from each order. With REST, that may require several requests or a large response with fields the client does not use. GraphQL gives the client one endpoint where it can ask for the exact fields and related objects it needs.

## One-Sentence Definition

GraphQL is an API query language and runtime where clients request a specific data shape from a typed schema.

## How I Probably Think About It

"Let the client describe the response it wants, instead of forcing it into one fixed endpoint response."

## Interview Explanation (30 Seconds)

GraphQL is an API style where the server exposes a typed schema and clients send queries that describe the exact fields they want. Instead of calling several REST endpoints, a client can ask for nested data in one request, such as a user and that user's recent orders. This helps avoid over-fetching and under-fetching, especially for frontends with different data needs. The trade-off is that GraphQL moves more complexity to the server. You need schema design, resolvers, authorization per field or object, query limits, caching strategy, and protection against expensive nested queries.

## When To Use It

- Different clients need different shapes of the same data.
- Frontends often need nested data from several resources.
- Over-fetching or under-fetching is causing real API friction.
- A typed API schema and generated client types would help teams move faster.
- The product changes screens often and needs flexible reads.
- You can invest in query limits, monitoring, and schema governance.

## When NOT To Use It

- A simple resource API already works well.
- The API is mostly straightforward CRUD.
- HTTP caching with standard URLs is very important.
- The team does not want the operational complexity of query planning and limits.
- The main workload is commands, streaming, or async processing.
- You need a very small public API surface that is easy to reason about.

## Alternatives

- Use REST when resources, URLs, and standard HTTP semantics are a clean fit.
- Use gRPC for strongly typed service-to-service APIs with efficient binary payloads.
- Use REST endpoints with includes or sparse fieldsets for limited response shaping.
- Use backend-for-frontend APIs when each client needs a tailored API layer.
- Use message queues for asynchronous work that does not need an immediate response.

## Pros

- Clients can request only the fields they need.
- One query can fetch related data that would otherwise require multiple calls.
- The schema gives a clear contract between client and server.
- Generated types can improve client and server development.
- It can reduce frontend coordination work for changing screens.
- It works well as an aggregation layer over multiple backend services.

## Cons

- Server implementation is more complex than simple REST.
- Expensive nested queries need depth, cost, or rate limits.
- Caching is less automatic than URL-based HTTP caching.
- Authorization can be subtle at field and object boundaries.
- Resolver design can create N+1 query problems.
- Schema changes need discipline to avoid breaking clients.

## Common Interview Questions

- What is GraphQL?
- How is GraphQL different from REST?
- What problem does GraphQL solve?
- What is a GraphQL schema?
- What are queries, mutations, and resolvers?
- How do you prevent expensive GraphQL queries?
- How do you handle authorization in GraphQL?
- What are the downsides of GraphQL?

## Related Concepts

- REST
- Pagination
- Rate Limiting
- Caching
- gRPC
- Message Queues

## What I'd Probably Say Instead

"I would consider GraphQL when clients need flexible reads across related data and REST endpoints are causing too much over-fetching, under-fetching, or request chaining. I would still be careful with it. The schema needs ownership, resolvers need to avoid N+1 queries, and the API needs query limits and authorization checks. If the API is simple and resource-shaped, REST is usually easier to operate."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Let the client choose fields | GraphQL query |
| The API contract | Schema |
| A read operation | Query |
| A write operation | Mutation |
| Code that fetches a field | Resolver |
| Related nested data | Graph traversal |
| Asking for too much nested data | Expensive query |
| Too many database calls from nested fields | N+1 resolver problem |
