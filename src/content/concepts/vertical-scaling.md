---
title: "Vertical Scaling"
level: "Explain trade-offs"
volume: "05-cloud-infrastructure"
order: 6
summary: "Vertical scaling increases capacity by giving one instance more CPU, memory, storage, or network resources."
---

## Problem It Solves

A service sometimes needs more capacity, but adding more instances is not always the first or best move. The service may be stateful. The workload may be hard to split across many instances. The team may need a simple short-term fix while it investigates a deeper bottleneck.

Vertical scaling handles this by making one running instance bigger. That can mean a larger virtual machine, more CPU or memory assigned to a container, faster storage, more network bandwidth, or a larger database instance class. The architecture mostly stays the same. The overloaded part gets more resources.

## One-Sentence Definition

Vertical scaling means increasing or decreasing capacity by changing the resources available to one instance instead of changing the number of instances.

## How I Probably Think About It

"Make one machine bigger before adding more machines."

## Interview Explanation (30 Seconds)

Vertical scaling means giving one instance more resources. That instance might be a server, container, database, or service process. For example, I might move to a larger VM, give a pod more reserved CPU and memory, or choose a bigger database instance class. In Kubernetes, the cluster still needs nodes with enough free capacity for that larger pod. Vertical scaling is often simpler than adding more instances because the app does not need to split work across copies. The trade-off is the limit: one machine can only get so large, and one large instance can still fail. I would use it when the bottleneck is clearly CPU, memory, storage, or network capacity on one instance.

## When To Use It

- Use vertical scaling when one instance is maxed out and a larger instance can fix the bottleneck.
- Use vertical scaling when the workload is hard to split across many instances.
- Use vertical scaling when a stateful service needs more CPU, memory, storage throughput, or network bandwidth.
- Use vertical scaling when moving to a larger machine or resource class is the simplest safe fix.
- Use vertical scaling when the system is small enough that horizontal scaling would add unnecessary complexity.
- Use vertical scaling as short-term relief while investigating slow code, slow queries, or poor capacity planning.

## When NOT To Use It

- Do not rely only on vertical scaling when the service needs high availability across multiple machines.
- Do not expect vertical scaling to fix a shared bottleneck in another system.
- Do not keep scaling up forever without checking cost and hardware limits.
- Do not use vertical scaling to hide a memory leak, inefficient query, or unbounded queue.
- Do not rely on one large instance when traffic spikes can exceed its maximum capacity.
- Do not assume larger resources fix bad concurrency limits, connection pool settings, or lock contention.

## Alternatives

- Use horizontal scaling when many instances can share the work safely.
- Use caching when repeated reads create avoidable load.
- Use sharding when data or traffic must be split across independent partitions.
- Use read replicas when read traffic overloads one database.
- Use asynchronous processing when work can move out of the request path.
- Optimize code, queries, indexes, memory use, or connection pools before buying larger resources.

## Pros

- Vertical scaling is usually simple to understand and run.
- It can improve capacity without changing application architecture.
- It works well for workloads that are hard to split across instances.
- It can help stateful services that need more CPU, memory, storage throughput, or network bandwidth.
- It can be faster to apply than redesigning the service for horizontal scaling.
- It keeps deployment, routing, and coordination simpler than adding many instances.

## Cons

- Vertical scaling has a hard upper limit.
- One large instance can still be a single point of failure.
- Larger machines or database classes can be expensive.
- Some changes require restarts, downtime, or planned maintenance.
- It does not improve availability by itself.
- It can delay fixes for inefficient code, slow queries, awkward data models, or poor operating limits.

## Common Interview Questions

- What is vertical scaling?
- How is vertical scaling different from horizontal scaling?
- When would you scale up instead of scaling out?
- What are the limits of vertical scaling?
- Why can vertical scaling be simpler than horizontal scaling?
- Why can vertical scaling hurt availability?
- How would you decide whether to scale up or scale out?
- What should you check before moving to a bigger machine?

## Related Concepts

- Horizontal Scaling
- Kubernetes Basics
- Orchestration
- Load Balancing
- Sharding
- Caching
- Indexes
- Connection Pooling

## What I'd Probably Say Instead

"I think of vertical scaling as making one instance bigger. If a service or database is clearly running out of CPU, memory, storage throughput, or network bandwidth, moving it to a larger resource class can be the simplest fix. It keeps the system easier to understand than adding more instances. The downside is that one bigger instance has a limit, can cost a lot, and does not solve availability by itself."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Make the machine bigger | Vertical scaling |
| Give one instance more resources | Scale up |
| Give one instance fewer resources | Scale down |
| More reserved CPU or memory for a container | Resource requests and limits |
| A bigger VM or database class | Larger instance type |
| The instance is maxed out | Resource-bound workload |
| One big thing everything depends on | Single point of failure |
| The largest size available | Scaling ceiling |
