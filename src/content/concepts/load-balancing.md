---
title: "Load Balancing"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 14
summary: "Load balancing spreads requests across healthy backend targets so no single server has to handle all traffic."
---

## Problem It Solves

One server can only handle so much traffic. If every request goes to that server, it can become slow, overloaded, or unavailable.

Load balancing puts a traffic layer in front of multiple backend targets. It sends each request or connection to a target that can handle it. That helps the system use more than one server and keeps traffic moving when one target fails.

## One-Sentence Definition

Load balancing means spreading incoming requests or connections across multiple backend targets that are able to receive traffic.

## How I Probably Think About It

"Spread traffic across several servers instead of sending everything to one."

## Interview Explanation (30 Seconds)

Load balancing spreads client requests or connections across multiple backend instances. The load balancer uses health checks and routing rules to choose a target that should be able to handle the request. Common strategies include round robin, least connections, weighted routing, and hash-based routing when the same client should usually reach the same target. This improves availability and helps use capacity, but it does not fix a slow shared database or API by itself. In an interview, I would call out health checks, failover, uneven load, sticky sessions, and the need to run more than one load balancer.

## When To Use It

- More than one backend instance can handle the same kind of request.
- Traffic is too much for one server or one small group of servers.
- You need failover when an instance becomes unhealthy.
- You want to add or remove instances without changing client configuration.
- You need one stable endpoint in front of many targets.
- You want to send more traffic to larger servers, new versions, or nearby regions.

## When NOT To Use It

- There is only one backend instance and no failover path.
- Requests depend on local server state and cannot safely move to another instance.
- The real bottleneck is a shared database, external API, or lock.
- The extra network hop would not solve a capacity, availability, or routing problem.
- The team cannot define reliable health checks.
- A reverse proxy or direct connection is enough.

## Alternatives

- Scale one server vertically if the system is small and simple.
- Use a reverse proxy when the main need is HTTP routing, TLS termination, or header handling.
- Use an API gateway when the boundary needs API rules such as auth or rate limits.
- Use service discovery when internal clients can find and choose healthy instances themselves.
- Use a CDN when the main goal is serving cacheable content close to users.
- Use sharding when different requests must go to different data partitions.

## Pros

- Spreads traffic across multiple backend targets.
- Improves availability when unhealthy targets are removed from the eligible target set.
- Lets clients use one stable endpoint while servers scale behind it.
- Helps use available capacity more evenly.
- Supports gradual rollouts by sending only some traffic to a new version.
- Can centralize health checks, connection handling, and simple routing.

## Cons

- Adds another network hop.
- Can become a bottleneck if it is not scaled enough.
- Can become a single point of failure if it is not highly available.
- Bad health checks can keep sending traffic to broken targets or stop using working ones.
- Sticky sessions can create uneven load because one client or session keeps returning to the same target.
- It can hide the real bottleneck when all targets wait on the same slow database, queue, or external API.

## Common Interview Questions

- What is load balancing?
- Why put a load balancer in front of application servers?
- How is load balancing different from a reverse proxy?
- What are common load balancing algorithms?
- What is a health check?
- What are sticky sessions?
- What can go wrong with load balancing?
- How do you avoid making the load balancer a single point of failure?

## Related Concepts

- Reverse Proxy
- API Gateway
- CDN
- Service Discovery
- Sharding
- Rate Limiting
- Circuit Breaker

## What I'd Probably Say Instead

"I would use load balancing when several instances can serve the same request. Clients call one endpoint, and the load balancer sends each request or connection to a target that can handle it. That helps with capacity and failover. I would pay attention to health checks, routing strategy, sticky sessions, and whether there is more than one load balancer. I would also check whether the real bottleneck is somewhere else, like the database."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Spread traffic across servers | Load balancing |
| Server behind the load balancer | Backend target |
| Decide whether a target should receive traffic | Health check |
| Try each server in order | Round robin |
| Send traffic to the least busy server | Least connections |
| Send more traffic to bigger servers | Weighted routing |
| Keep one user or session on the same server | Sticky session |
| Stop using a broken server | Remove from rotation |
| One address in front of many servers | Stable endpoint |
