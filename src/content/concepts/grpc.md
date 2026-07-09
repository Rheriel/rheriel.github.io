---
title: "gRPC"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 19
summary: "gRPC is an RPC framework for strongly typed service-to-service APIs using Protocol Buffers."
---

## Problem It Solves

Backend services often need to call each other with clear contracts, low overhead, and predictable behavior. REST can work for this, but JSON payloads, hand-written clients, and loosely defined request shapes can become noisy between internal services.

gRPC gives teams a schema-first way to define service methods and messages. From that schema, teams can generate clients and servers in different languages. It is useful when services need a strict contract, efficient binary payloads, streaming, and consistent cross-language tooling.

## One-Sentence Definition

gRPC is a remote procedure call framework where services call typed methods defined in Protocol Buffers, usually over HTTP/2.

## How I Probably Think About It

"Call another service like a typed method, with generated clients and compact messages."

## Interview Explanation (30 Seconds)

gRPC is a service-to-service API style based on remote procedure calls. Instead of exposing resources like REST, a service defines methods such as `GetOrder` or `CreatePayment` in a `.proto` file. That file describes the request and response messages, and tooling generates client and server code. gRPC usually uses Protocol Buffers for compact binary payloads and HTTP/2 for features like multiplexing and streaming. The trade-off is that gRPC is fast and strongly typed, but it is less human-readable than JSON REST APIs and can be harder to use directly from browsers or simple external integrations.

## When To Use It

- Internal services need a strong typed contract.
- Multiple languages need generated clients from the same API definition.
- Low latency or compact payloads matter.
- Service calls are command-like methods rather than resource operations.
- Streaming, deadlines, cancellation, or bidirectional communication are useful.
- You control both the client and server.

## When NOT To Use It

- The API is public and should be easy to call with basic HTTP tools.
- Browser clients are the main consumers and you do not want extra proxy support.
- Human-readable JSON requests and responses are important for debugging.
- The API maps cleanly to resources and standard HTTP semantics.
- The team does not want schema generation or Protocol Buffers in the workflow.
- Loose, ad hoc integration is more important than strict contracts.

## Alternatives

- Use REST for simple resource-oriented HTTP APIs and broad client compatibility.
- Use GraphQL when clients need flexible nested reads and control over response shape.
- Use message queues for asynchronous work that does not need an immediate response.
- Use plain HTTP RPC endpoints when you want command-style APIs without gRPC tooling.
- Use WebSockets or server-sent events for browser-friendly real-time communication.

## Pros

- Strong API contracts through `.proto` files.
- Generated clients and servers reduce hand-written integration code.
- Compact binary payloads can be faster and smaller than JSON.
- Works well across languages.
- Supports streaming, deadlines, cancellation, and rich status codes.
- Good fit for internal service-to-service communication.

## Cons

- Binary payloads are harder to inspect than JSON.
- Browser support usually needs extra tooling or a proxy layer.
- Public consumers may find it harder to adopt than REST.
- Schema evolution needs discipline to avoid breaking clients.
- Generated code and Protocol Buffers add build complexity.
- It is less natural for cacheable, resource-oriented APIs.

## Common Interview Questions

- What is gRPC?
- How is gRPC different from REST?
- What are Protocol Buffers?
- Why would you use gRPC between services?
- What are the downsides of gRPC?
- How does gRPC handle streaming?
- How do you evolve a gRPC API without breaking clients?
- When would you choose REST instead of gRPC?

## Related Concepts

- REST
- GraphQL
- Message Queues
- Idempotency
- Rate Limiting
- Caching

## What I'd Probably Say Instead

"I would use gRPC for internal service calls where I control both sides and want a strict, generated contract. It is a good fit for low-latency service-to-service communication, especially when there are multiple languages or streaming needs. I would still prefer REST for public APIs, browser-heavy clients, or cases where simple HTTP debugging and broad compatibility matter more."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Call another service method | Remote procedure call |
| API definition file | `.proto` file |
| Shared contract | Protocol Buffers schema |
| Generated service client | Stub |
| Generated server interface | Service implementation |
| Compact request data | Binary serialization |
| Ongoing request or response flow | Streaming RPC |
| Stop waiting after a time limit | Deadline |
| Cancel an in-flight call | Cancellation |
