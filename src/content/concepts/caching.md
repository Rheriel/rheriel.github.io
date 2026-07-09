---
title: "Caching"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 13
summary: "Caching stores frequently used data in a faster layer so reads are quicker and backend systems do less repeated work."
---

## Problem It Solves

Some data is read much more often than it changes. If every request recomputes the same result or hits the database, the system can become slow and expensive.

Caching keeps a copy of frequently used data in a faster layer. That can reduce latency, lower database load, and help the system handle more read traffic.

## One-Sentence Definition

Caching is storing a copy of data or computed results in a faster layer so future requests can reuse it.

## How I Probably Think About It

"Keep the answer nearby so we do not have to fetch or compute it every time."

## Interview Explanation (30 Seconds)

Caching means storing data in a faster layer, such as memory, a distributed cache, a CDN, or an application cache. It is useful when data is expensive to fetch or compute and is read many times. The main trade-off is freshness. Cached data can become stale if the original data changes, so the system needs a strategy for expiration, invalidation, or updating the cache. I would use caching for hot read paths after understanding the access pattern and the consistency requirements.

## When To Use It

- The same data is read often.
- Fetching or computing the data is slow or expensive.
- The system has a read-heavy hot path.
- Slightly stale data is acceptable, or freshness can be managed.
- The cache can reduce load on a database, API, or expensive service.

## When NOT To Use It

- The data changes constantly and must always be fresh.
- The slow path is caused by bad queries, missing indexes, or inefficient code that should be fixed first.
- The cached result depends on many inputs that are hard to key correctly.
- The system cannot tolerate stale reads.
- Cache invalidation would be more complex than the performance problem is worth.

## Alternatives

- Add indexes or rewrite slow queries.
- Precompute read models or materialized views.
- Denormalize data for a specific read path.
- Use replication to spread read traffic.
- Optimize the expensive computation.
- Paginate or limit large responses.

## Pros

- Reduces latency for repeated reads.
- Lowers load on databases and downstream services.
- Can improve throughput for read-heavy systems.
- Helps absorb traffic spikes for hot data.
- Can move frequently used data closer to users, such as with a CDN.

## Cons

- Cached data can become stale.
- Invalidation is hard when many things can change the source data.
- Adds another layer to operate and debug.
- Cache misses can still hit the slow path.
- Hot keys can overload one cache node.
- A cold cache after restart or deploy can cause a traffic spike to the database.

## Common Interview Questions

- What is caching?
- When would you add a cache?
- What are cache hits and cache misses?
- What is cache invalidation?
- How do you prevent stale data?
- What is a TTL?
- What is a cache stampede?
- How is caching different from replication?

## Related Concepts

- Indexes
- Replication
- Sharding
- Idempotency
- Rate Limiting
- Pagination
- Eventual Consistency

## What I'd Probably Say Instead

"I would use caching when the system repeatedly reads the same expensive data and can tolerate the freshness model. The cache can make reads faster and reduce backend load, but I need a clear plan for keys, TTLs, invalidation, misses, and stale data."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep the answer nearby | Cache |
| The cache had the value | Cache hit |
| The cache did not have the value | Cache miss |
| Throw away old cached data | Cache invalidation |
| Let cached data expire after a while | TTL |
| The cached value is old | Stale data |
| Everyone misses the cache at once | Cache stampede |
| One cached item gets too much traffic | Hot key |
