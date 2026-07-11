---
title: "Service Mesh"
level: "Explain trade-offs"
volume: "05-cloud-infrastructure"
order: 12
summary: "A service mesh manages service-to-service traffic, security, and observability through infrastructure instead of application code."
---

## Problem It Solves

As a system grows, services need the same network behavior again and again. They need timeouts, retries, load balancing, mutual TLS, traffic splitting, access rules, and request metrics. If every team builds those features into each service, the code becomes uneven and hard to maintain.

A service mesh moves much of that behavior into infrastructure. Each service still handles business logic. The mesh handles common network behavior for internal calls between services.

## One-Sentence Definition

A service mesh is infrastructure that controls, secures, and observes internal service-to-service communication in a distributed system.

## How I Probably Think About It

"Handle common internal traffic rules in the platform instead of copying them into every service."

## Interview Explanation (30 Seconds)

A service mesh handles common behavior between internal services. That includes load balancing, retries, timeouts, mutual TLS, access rules, traffic splitting, and metrics. Applications still call other services normally, but the traffic goes through a mesh data plane, often sidecar proxies. A control plane configures those proxies. The benefit is consistency. Services do not all need to rebuild the same network behavior. The trade-off is complexity. A mesh adds moving parts, configuration, latency, and operational risk, so I would use it only when consistent service-to-service rules are worth that cost.

## When To Use It

- Use a service mesh when many services need the same internal traffic rules.
- Use a service mesh when services need mutual TLS, service identity, and access rules.
- Use a service mesh when teams need consistent retries, timeouts, traffic splitting, and load balancing between services.
- Use a service mesh when you need detailed metrics for calls between services.
- Use a service mesh when platform teams can operate the extra infrastructure safely.
- Use a service mesh when deployment patterns like canary releases need fine-grained internal traffic control.

## When NOT To Use It

- Do not use a service mesh for a small system with only a few services.
- Do not use a service mesh if normal load balancing, service discovery, and application libraries are enough.
- Do not add a mesh before the team understands how it can fail.
- Do not use a mesh to cover up poor API design or unreliable services.
- Do not rely on mesh retries without checking idempotency, timeouts, and request deadlines.
- Do not add a mesh if the platform team cannot monitor, upgrade, and debug it.

## Alternatives

- Use application libraries for retries, timeouts, metrics, and client behavior.
- Use a load balancer for basic traffic distribution.
- Use service discovery so services can find healthy instances.
- Use an API gateway for external API traffic, client-facing APIs, and edge policies.
- Use a reverse proxy for simpler internal routing or TLS termination.
- Use platform-native networking when it already provides the controls you need.

## Pros

- Gives services consistent traffic behavior.
- Moves common networking concerns out of application code.
- Can provide mutual TLS and service identity between services.
- Improves visibility into service-to-service calls.
- Supports traffic splitting for canary releases and gradual rollouts.
- Lets platform teams change some network rules without changing application code.

## Cons

- Adds infrastructure that must be installed, upgraded, monitored, and debugged.
- Can make request paths harder to understand.
- Bad mesh configuration can break many services at the same time.
- Adds some latency and resource overhead.
- Retries and timeouts can still cause problems if they do not match how the application works.
- Can be too much complexity for small teams or simple systems.

## Common Interview Questions

- What is a service mesh?
- Why would a system need a service mesh?
- How is a service mesh different from an API gateway?
- What is the difference between a control plane and a data plane?
- How does a service mesh help with mutual TLS?
- What problems can service mesh retries cause?
- When would you avoid using a service mesh?
- How does a service mesh support canary releases?

## Related Concepts

- Service Discovery
- Load Balancing
- Reverse Proxy
- API Gateway
- Retry
- Circuit Breaker
- Canary Releases
- Health Checks
- Secrets Management

## What I'd Probably Say Instead

"I think of a service mesh as shared infrastructure for internal service-to-service traffic. Instead of each service writing its own retry, timeout, mutual TLS, access, metrics, and routing behavior, the platform handles much of that through proxies and central rules. It can make behavior more consistent and easier to observe, but it also adds a serious operational layer. I would not add one unless the system and team are large enough to need it."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Shared rules for internal service calls | Service mesh |
| The proxy that handles each service's traffic | Data plane |
| The system that configures the proxies | Control plane |
| Services prove identity to each other | Mutual TLS |
| A service has a platform-level identity | Service identity |
| Route a small percent to the new version | Traffic splitting |
| Rules for retries, timeouts, and routing | Traffic policy |
| See calls between services | Service-to-service observability |
| A proxy beside the application | Sidecar proxy |
