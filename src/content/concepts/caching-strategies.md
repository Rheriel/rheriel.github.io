---
title: "Caching Strategies"
level: "Explain trade-offs"
volume: "06-performance"
order: 11
summary: "Caching strategies define how cached data is read, written, expired, and refreshed."
---

## Problem It Solves

Caching can make reads faster, but a cache is not useful by itself. The system needs clear rules for reads, writes, expiration, and updates after the source data changes.

Without a strategy, a cache can return old data, send too much traffic to the database on misses, or make production bugs harder to explain.

## One-Sentence Definition

A caching strategy is the set of rules a system uses to read, fill, update, expire, and invalidate cached data.

## How I Probably Think About It

"Decide who checks the cache, who fills it, and how old values get removed."

## Interview Explanation (30 Seconds)

Caching strategies define how the app and cache work together. The common one is cache-aside: the app checks the cache, loads from the source of truth on a miss, and stores the result for next time. Read-through means the cache loads missing values itself. Write-through updates the cache and source of truth in the same request path. Write-behind accepts the write first and saves it later, so it can be faster but riskier. I would choose based on reads, writes, freshness needs, and what should happen if the cache fails.

## When To Use It

- Use cache-aside for read-heavy data where the application can handle cache misses.
- Use read-through when you want callers to use one cache abstraction instead of loading missing values themselves.
- Use write-through when the cache and source of truth should be updated in the same request path.
- Use write-behind when write latency matters and the system can tolerate delayed persistence.
- Use TTL-based caching when data can be slightly stale for a known amount of time.
- Use explicit invalidation when writes must remove or refresh specific cached values.
- Use refresh-ahead for hot keys that should be refreshed before they expire.

## When NOT To Use It

- Do not add a cache without knowing the access pattern.
- Do not cache data that must always be fresh unless the freshness rules are simple and enforceable.
- Do not use write-behind when losing recent writes would be unacceptable.
- Do not rely only on long TTLs for data that changes often.
- Do not cache values when the key leaves out data that affects the result, such as tenant, user, locale, or permissions.
- Do not use caching to hide broken queries, missing indexes, or unbounded responses.

## Alternatives

- Fix slow queries or add the right indexes.
- Use pagination, filtering, or smaller responses.
- Use materialized views or precomputed read models.
- Use read replicas to spread database read load.
- Use batching to reduce repeated round trips.
- Denormalize data for a specific read path.

## Pros

- Makes repeated reads faster.
- Reduces load on databases and downstream services.
- Lets different data use different freshness rules.
- Can smooth traffic spikes for hot keys.
- Can improve write latency when write-behind is acceptable.

## Cons

- Adds stale-data risk.
- Makes cache keys and invalidation harder to design.
- Cache misses can still hit the slow path.
- Cold caches can send sudden traffic to the source of truth.
- Write-behind can lose accepted writes if the cache, queue, or worker fails before persistence.
- Teams can get confused if the ownership rules are not clear.

## Common Interview Questions

- What is a caching strategy?
- How does cache-aside work?
- What is the difference between read-through and cache-aside?
- What is write-through caching?
- Why is write-behind caching faster but riskier?
- How do TTLs and invalidation work together?
- What is a cache stampede?
- How would you choose a caching strategy for a read-heavy service?

## Related Concepts

- Caching
- Profiling
- Connection Pooling
- Lazy Loading
- Eager Loading
- N+1 Queries
- Batching
- Compression
- Eventual Consistency

## What I'd Probably Say Instead

"I would not just add a cache and hope it helps. I would pick a strategy based on the reads, the writes, and how stale the data can be. For most read-heavy paths, I would start with cache-aside and a TTL. Then I would add invalidation or refresh-ahead only where the data or traffic needs it."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The app checks the cache, then loads from the source if needed | Cache-aside |
| The cache knows how to load missing data | Read-through cache |
| Write to the cache and database together | Write-through cache |
| Accept the write now and save it later | Write-behind cache |
| Remove cached data when the source changes | Cache invalidation |
| Let cached data expire after a set time | TTL |
| Rebuild hot data before users miss it | Refresh-ahead |
| Many callers miss at the same time | Cache stampede |
