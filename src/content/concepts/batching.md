---
title: "Batching"
level: "Explain trade-offs"
volume: "06-performance"
order: 10
summary: "Batching groups many small operations into fewer larger operations to reduce repeated overhead."
---

## Problem It Solves

Small operations often have a cost that repeats every time. Each database call, network request, queue publish, or disk write may pay for serialization, protocol handling, connection use, and round-trip time.

When a system sends one operation at a time, that repeated cost can be larger than the work itself. Batching groups several operations together so the system pays that cost fewer times.

## One-Sentence Definition

Batching is grouping similar operations so they can run with fewer calls, round trips, or writes.

## How I Probably Think About It

"Do the same kind of work in chunks."

## Interview Explanation (30 Seconds)

Batching means doing a group of small, similar operations together. It helps when each call has a repeated cost. Common examples are database round trips, network calls, queue publishes, and disk writes. Instead of inserting one row at a time, the app might insert 100 rows in one statement. The trade-off is that some items may wait for the batch to fill. Failure handling is harder too. Part of the batch may succeed, and part may fail. I would cap the batch size, cap the wait time, make retries idempotent, and measure throughput, latency, error rate, and memory use.

## When To Use It

- Use it when many small, similar operations repeat the same call cost.
- Use it to reduce database round trips.
- Use it to send many network requests as one request when the API supports it.
- Use it to publish or consume messages in groups.
- Use it when throughput matters more than the fastest possible response for each item.
- Use it when you can set both a maximum batch size and a maximum wait time.

## When NOT To Use It

- Do not use it when each item needs an immediate response.
- Do not use unbounded batches.
- Do not make batches so large that they cause timeouts, memory spikes, or long-held locks.
- Do not batch unrelated work if the system cannot report or retry per-item failures.
- Do not use batching to hide slow queries, missing indexes, or bad data access patterns.

## Alternatives

- Process one item at a time when each item needs low latency or separate failure handling.
- Use caching to avoid repeated reads.
- Use eager loading or batch loading to fix N+1 query patterns.
- Use streaming when the data set is too large to hold in memory at once.
- Use asynchronous queues to move slow work out of the request path.

## Pros

- Reduces repeated round-trip overhead.
- Improves throughput for many similar operations.
- Can reduce connection pool pressure.
- Can reduce repeated serialization and protocol work.
- Often makes database writes and message publishing more efficient.

## Cons

- Can add wait time while a batch fills.
- Makes partial failure handling more complex.
- Can increase memory use.
- Large batches can cause timeouts or long database locks.
- Retries need idempotency or deduplication so items are not duplicated or skipped.

## Common Interview Questions

- What is batching?
- How does batching improve performance?
- How can batching improve throughput but add latency?
- How would you choose a batch size?
- Why should batches be bounded?
- How do retries change when a batch partially fails?
- How is batching related to fixing N+1 queries?
- What metrics would you watch after adding batching?

## Related Concepts

- Profiling
- Connection Pooling
- N+1 Queries
- Lazy Loading
- Eager Loading
- Compression
- Message Queues
- Idempotency

## What I'd Probably Say Instead

"I would use batching when the system is spending too much time paying the cost of each call. Instead of one call per item, I would send a limited group of similar items together. I would cap the batch size, cap the wait time, make retries idempotent, and then check throughput, latency, memory, and failure behavior."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Do many items in one go | Batching |
| The cost paid every time you make a call | Per-call overhead |
| One trip to another service or database | Round trip |
| How many items fit in one group | Batch size |
| How long an item waits for a group | Batch wait time |
| Some items worked and some failed | Partial failure |
| Send the same item again without duplicating work | Idempotent retry |
| Work completed per second | Throughput |
