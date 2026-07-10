---
title: "Service Discovery"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 15
summary: "Service discovery lets services find healthy instances of other services without hardcoding their addresses."
---

## Problem It Solves

In a distributed system, service instances come and go. Deployments add new instances. Failed instances disappear. Autoscaling changes the number of running instances. In cloud systems, IP addresses and ports may change often.

Hardcoded addresses make this brittle. Clients need a way to find the healthy instances of another service. Service discovery provides that lookup so callers can connect to services that are available now.

## One-Sentence Definition

Service discovery is the runtime lookup process that maps a logical service name to currently available service instances.

## How I Probably Think About It

"Where do I find a healthy instance of this service right now?"

## Interview Explanation (30 Seconds)

Service discovery lets services find each other without hardcoding every instance address. A registry stores where instances are running and whether they look healthy. In client-side discovery, the caller asks the registry for targets and chooses one. In server-side discovery, the caller uses one stable endpoint. A load balancer or proxy finds the target for it. The main risk is stale data. An instance can fail right after discovery returns it, so the caller still needs timeouts, retries, and sometimes a circuit breaker.

## When To Use It

- Service instances are created, removed, or moved often.
- Clients need to call internal services by logical name rather than fixed address.
- Autoscaling changes the number of available instances.
- Deployments should add new instances without changing client configuration.
- A load balancer, proxy, or client library needs a current list of eligible targets.
- Routing needs to prefer instances in the same zone or region.

## When NOT To Use It

- The system has only one stable endpoint and a simple DNS record is enough.
- A managed load balancer already hides all backend instance changes.
- Service addresses rarely change and static configuration is simpler.
- The team cannot operate or trust the registry.
- The discovery layer would add more risk than value.
- The caller needs strong guarantees that a returned instance will stay healthy.

## Alternatives

- Use DNS when simple name-to-address lookup is enough.
- Use a load balancer when clients should call one stable endpoint.
- Use a reverse proxy for HTTP routing, TLS termination, or header handling.
- Use an API gateway for external API boundaries and cross-cutting API rules.
- Use static configuration for small, stable systems.
- Use gossip when nodes need to spread membership information without one central registry.

## Pros

- Removes hardcoded instance addresses from clients.
- Supports autoscaling and rolling deployments.
- Lets unhealthy instances be removed from routing.
- Gives clients or load balancers a current target list.
- Can include metadata such as zone, version, role, or weight.
- Lets internal services call each other by logical service name.

## Cons

- Adds a registry, agent, platform feature, or discovery layer to operate.
- Discovery data can be stale.
- Bad health checks can keep broken instances in the target list or remove healthy ones.
- A central registry can become a bottleneck or failure point if it is not replicated or highly available.
- Client-side discovery can make every caller handle target selection.
- It does not remove the need for timeouts, retries, and failure handling.

## Common Interview Questions

- What is service discovery?
- Why do distributed systems need service discovery?
- How is service discovery different from load balancing?
- What is a service registry?
- What is client-side service discovery?
- What is server-side service discovery?
- How do health checks or heartbeats relate to service discovery?
- What can go wrong with service discovery?

## Related Concepts

- Load Balancing
- Heartbeats
- Reverse Proxy
- API Gateway
- Gossip Protocol
- Circuit Breaker
- Retry

## What I'd Probably Say Instead

"I would use service discovery so callers do not need hardcoded addresses for every service instance. Each instance registers itself, or the platform detects it. Discovery then returns targets for a logical service name, like `payments` or `users`. The client can choose a target, or a load balancer can do that for it. I would still use timeouts and retries, because discovery data can be stale and an instance can fail right after it is returned."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Where is this service running? | Service discovery |
| The list of running instances | Service registry |
| Add this instance to the list | Registration |
| Remove this instance from traffic | Deregistration |
| Is this instance still usable? | Health check |
| Keep proving this instance is alive | Heartbeat |
| Call by service name instead of IP | Logical service name |
| Client chooses the instance | Client-side discovery |
| Load balancer chooses the instance | Server-side discovery |
| The registry has old data | Stale discovery data |
