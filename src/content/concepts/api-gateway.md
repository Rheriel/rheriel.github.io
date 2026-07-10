---
title: "API Gateway"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 11
summary: "An API gateway gives clients one API entry point and handles shared API concerns before sending requests to backend services."
---

## Problem It Solves

In a system with many backend services, clients should not need to know where every service lives. They also should not need to repeat the same auth, rate limit, routing, and response-shaping code.

An API gateway gives clients one stable API entry point. It handles shared API concerns at the boundary and forwards each request to the right backend service.

## One-Sentence Definition

An API gateway is a service at the API boundary that receives client requests, applies shared rules, and forwards those requests to backend services.

## How I Probably Think About It

"Put one API front door in front of the services."

## Interview Explanation (30 Seconds)

An API gateway sits between clients and backend services. Clients call the gateway instead of calling each service directly. The gateway handles shared API concerns like auth, rate limits, routing, protocol translation, response shaping, and logging. This keeps clients simpler and gives the system one place to enforce common rules. Compared with a reverse proxy or load balancer, a gateway usually owns more API rules, not just traffic forwarding. The trade-off is that the gateway becomes critical infrastructure. If too much domain logic moves into it, it can become a bottleneck and make service ownership unclear.

## When To Use It

- Clients need one stable entry point into several backend services.
- You want shared auth, rate limiting, or logging at the API boundary.
- Clients should not know internal service locations.
- Mobile and web clients need different API shapes.
- You need protocol translation, such as HTTP outside and gRPC inside.
- You want one public API while backend services can change behind it.

## When NOT To Use It

- The system has one simple backend service and no real routing problem.
- Adding a gateway would only add another hop without removing complexity.
- Service teams need independent releases and the gateway would centralize too much change.
- The gateway would contain domain rules that belong in services.
- Internal services can safely call each other through service discovery, a reverse proxy, or a load balancer instead.
- You cannot operate the gateway as highly available infrastructure.

## Alternatives

- Let clients call a single backend service directly.
- Use a reverse proxy for simpler HTTP routing, TLS termination, or header handling.
- Use a load balancer when the main problem is spreading traffic across healthy instances.
- Use a backend-for-frontend when each client type needs its own API shape.
- Use service discovery for internal service-to-service calls.
- Put shared behavior in libraries when all callers are controlled by the same team.

## Pros

- Gives clients one stable API entry point.
- Hides internal service locations and topology.
- Puts shared API rules such as auth, rate limits, and logging in one place.
- Simplifies clients by handling routing and response shaping.
- Lets backend services change without exposing every internal endpoint.
- Makes the public API easier to observe and protect.

## Cons

- Adds another network hop.
- Can become a bottleneck if it is not scaled enough.
- Can become a single point of failure if it is not highly available.
- Can collect too much domain logic over time.
- Can slow teams down if every API change must go through one shared gateway team.
- One bad configuration change can affect many services.

## Common Interview Questions

- What is an API gateway?
- Why use an API gateway in a microservices system?
- What responsibilities should an API gateway have?
- What should not go into an API gateway?
- How is an API gateway different from a reverse proxy?
- How is an API gateway different from a load balancer?
- What are the risks of putting too much logic in the gateway?
- How would you make an API gateway highly available?

## Related Concepts

- Reverse Proxy
- Load Balancing
- Service Discovery
- Rate Limiting
- REST
- gRPC
- Circuit Breaker

## What I'd Probably Say Instead

"I would use an API gateway when clients need one stable entry point into several services. The gateway can handle shared API concerns like auth, rate limits, routing, and logging before forwarding requests to backend services. I would keep domain logic out of it, run it as highly available infrastructure, and make sure it does not become a bottleneck or a place every team has to change."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| One front door for the API | API gateway |
| Hide the internal services | Service abstraction |
| Send this request to the right service | Request routing |
| Check common rules at the boundary | API policy enforcement |
| One public API in front of many services | API facade |
| Change the request or response for clients | Request or response transformation |
| HTTP outside, gRPC inside | Protocol translation |
| Business rules leaked into the gateway | Domain logic leakage |
| Too much traffic or logic in the front door | Gateway bottleneck |
