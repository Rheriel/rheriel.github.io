---
title: "Horizontal Scaling"
level: "Explain trade-offs"
volume: "05-cloud-infrastructure"
order: 5
summary: "Horizontal scaling adds or removes service instances to handle changes in load."
---

## Problem It Solves

One service instance can only handle so much work. When traffic grows, that instance can run out of CPU, memory, network capacity, database connections, or worker threads.

Horizontal scaling handles more load by running more instances of the same service. A load balancer, service discovery system, or orchestrator sends work to instances that are healthy and ready. When load drops, the system can remove extra instances to save resources.

## One-Sentence Definition

Horizontal scaling means changing capacity by adding or removing service instances instead of making one instance bigger.

## How I Probably Think About It

"Run more copies of the service and spread traffic across them."

## Interview Explanation (30 Seconds)

Horizontal scaling means running more instances of a service when you need more capacity. It works best when any healthy instance can handle the next request. That usually means sessions, files, and other shared state live outside the instance, in a database, cache, queue, or storage service. Traffic is spread through a load balancer or service discovery layer. In Kubernetes, this often means increasing the deployment's replica count. The key trade-off is simple: adding service instances helps only if the service instances are the bottleneck.

## When To Use It

- Use horizontal scaling when one instance cannot handle the load.
- Use horizontal scaling when requests can be served by any healthy and ready instance.
- Use horizontal scaling when the system should keep serving traffic if one instance fails.
- Use horizontal scaling when demand changes and capacity should grow or shrink with it.
- Use horizontal scaling for stateless web services, API services, queue workers, and message consumers.
- Use horizontal scaling when a platform can add, remove, and route to instances safely.

## When NOT To Use It

- Do not use horizontal scaling when the service depends on local in-memory session state.
- Do not expect horizontal scaling to help when every instance waits on the same overloaded database, lock, or external API.
- Do not add instances before checking whether bad code, slow queries, or missing indexes are the real problem.
- Do not assume horizontal scaling fixes stateful systems without partitioning, replication, locking, or coordination.
- Do not scale background workers without checking queue ordering, idempotency, and downstream limits.
- Do not scale out if the added operating cost is larger than the capacity problem.

## Alternatives

- Use vertical scaling when one larger machine is enough and keeps the system simpler.
- Use caching when repeated reads create avoidable load.
- Use batching when many small operations can be grouped together.
- Use sharding when data or traffic must be split across independent partitions.
- Use asynchronous processing when work can move out of the request path.
- Optimize the code, queries, indexes, or data model before adding more instances.

## Pros

- Horizontal scaling can increase capacity without moving to one larger machine.
- It improves availability because traffic can move away from failed instances.
- It works well with container orchestration and deployments that use replicas.
- It lets the system match capacity to changing demand.
- It supports rolling deployments because old and new instances can run at the same time.
- It reduces the effect of one instance crashing or becoming unhealthy.

## Cons

- The application must handle multiple instances safely.
- Local memory, local files, and local sessions become unreliable places for shared state.
- Shared dependencies, such as databases or external APIs, can become the real bottleneck.
- More instances mean more logs, metrics, connections, network traffic, and deployment work.
- Load balancing and health checks must be correct.
- Autoscaling can react too late, react too often, or put more pressure on a downstream dependency.

## Common Interview Questions

- What is horizontal scaling?
- How is horizontal scaling different from vertical scaling?
- Why do stateless services scale horizontally more easily?
- What role does a load balancer play in horizontal scaling?
- What can prevent a service from scaling horizontally?
- How does Kubernetes support horizontal scaling?
- What bottlenecks can remain after adding more service instances?
- What should you check before scaling out a service?

## Related Concepts

- Vertical Scaling
- Load Balancing
- Kubernetes Basics
- Orchestration
- Health Checks
- Service Discovery
- Caching
- Sharding
- Idempotency

## What I'd Probably Say Instead

"I think of horizontal scaling as running more copies of the same service. If the service is mostly stateless, a load balancer or orchestrator can send traffic to any healthy copy. That helps with capacity and failure handling. I would still check the real bottleneck. Adding service instances will not help much if every request is blocked on the same database, lock, or external API."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Run more copies | Horizontal scaling |
| One running copy of the service | Instance |
| The desired number of running copies | Replica count |
| Send traffic across copies | Load balancing |
| Any copy can handle the request | Stateless service |
| Add copies when load grows | Scale out |
| Remove copies when load drops | Scale in |
| The thing all copies wait on | Shared bottleneck |
| Let the platform change copy count | Autoscaling |
