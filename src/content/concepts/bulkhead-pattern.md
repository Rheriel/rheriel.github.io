---
title: "Bulkhead Pattern"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 10
summary: "The bulkhead pattern gives different work separate capacity so one failing area does not exhaust the whole service."
---

## Problem It Solves

A service often talks to several dependencies. One dependency may become slow, overloaded, or unavailable. If all dependency calls share the same thread pool, connection pool, or worker queue, one bad dependency can use all of that shared capacity.

The bulkhead pattern limits the damage. It gives risky calls or groups of work their own limits, so trouble in one area does not take down the whole service.

## One-Sentence Definition

The bulkhead pattern gives different parts of a system separate resources so failure or overload in one part cannot use all shared capacity.

## How I Probably Think About It

"Do not let one slow dependency use all the threads, connections, or workers."

## Interview Explanation (30 Seconds)

The bulkhead pattern separates capacity for different kinds of work. For example, calls to a payment API might use a small connection pool and worker pool, while user reads use a different pool. If the payment API hangs, it can only fill its own pool. The rest of the service still has resources for other requests. Bulkheads do not detect recovery or stop calls by themselves. They limit how far a failure can spread. The trade-off is that capacity is split up, so one pool may be full while another pool is idle.

## When To Use It

- One dependency or workflow can become slow and use shared resources for too long.
- A service handles work with different priority or risk.
- You need to protect core user flows from optional or less important work.
- You can isolate threads, connections, workers, queues, or CPU-heavy tasks.
- A failure in one dependency should not stop unrelated requests.
- You can monitor each resource pool separately.

## When NOT To Use It

- The service is simple and does not share scarce resources across risky work.
- Separate pools add more overhead than the risk is worth.
- Traffic is too small to justify extra configuration.
- The isolated work needs to use all available capacity.
- You cannot size, monitor, or tune the separate pools.
- A timeout, retry policy, or circuit breaker is enough.

## Alternatives

- Use timeouts so slow calls stop holding resources.
- Use circuit breakers to fail fast when a dependency is unhealthy.
- Use retries with backoff for short, safe-to-repeat failures.
- Use rate limiting to reduce incoming load.
- Use priority queues when some work should run before other work.
- Split high-risk work into a separate service or worker.

## Pros

- Limits the blast radius of slow or failing dependencies.
- Protects important requests from less important work.
- Prevents one area from exhausting every shared pool.
- Makes capacity and failures easier to see for each dependency or workflow.
- Works well with timeouts, circuit breakers, and backpressure.
- Can improve graceful degradation during partial outages.

## Cons

- Adds more pools, limits, and metrics.
- Bad pool sizes can reject work too early or waste capacity.
- One pool can be full while another pool is idle.
- It does not fix the unhealthy dependency.
- Hidden resource limits can make debugging harder.
- Too many bulkheads can make the system rigid.

## Common Interview Questions

- What is the bulkhead pattern?
- Why use bulkheads in distributed systems?
- How do bulkheads prevent cascading failures?
- What resources can you isolate with bulkheads?
- How is a bulkhead different from a circuit breaker?
- What can go wrong with bulkheads?
- How would you choose bulkhead pool sizes?
- How do bulkheads work with timeouts, retries, and circuit breakers?

## Related Concepts

- Circuit Breaker
- Retry
- Exponential Backoff
- Rate Limiting
- Message Queues
- Load Balancing
- Service Discovery

## What I'd Probably Say Instead

"I would isolate this risky dependency so it cannot use all of the service's shared resources. For example, I might give it its own small thread pool, connection pool, or worker queue. If it gets slow, that pool fills up and those calls fail or wait, but the rest of the service keeps handling unrelated traffic. I would still use timeouts and circuit breakers, because bulkheads limit the damage but do not detect recovery or fix the dependency."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep this failure contained | Failure isolation |
| Do not let one thing take everything down | Limit blast radius |
| Give risky work its own pool | Resource isolation |
| One dependency uses all the threads | Resource exhaustion |
| One failure spreads through the service | Cascading failure |
| Keep important traffic working | Graceful degradation |
| Separate workers for separate jobs | Isolated worker pools |
| Separate connections for each dependency | Isolated connection pools |
