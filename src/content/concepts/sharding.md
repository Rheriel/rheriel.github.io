---
title: "Sharding"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 12
summary: "Sharding splits a large dataset across multiple database nodes so each node owns only part of the data."
---

## Problem It Solves

A single database can become too large or too busy for one machine. Indexes and replication can help, but they do not always solve write load, storage limits, or very large tables.

Sharding splits the data across multiple database nodes. Each node handles only a slice of the data, so the system can spread storage and traffic.

## One-Sentence Definition

Sharding is a database scaling technique where rows are partitioned across multiple nodes, usually based on a shard key.

## How I Probably Think About It

"Split the table across machines so one database does not have to hold or serve everything."

## Interview Explanation (30 Seconds)

Sharding means splitting data across multiple database nodes. For example, users with certain `user_id` ranges or hashes might live on different shards. This can increase write capacity and storage capacity because each shard owns only part of the data. The hard part is choosing a good shard key. A bad key can create hot shards, uneven data distribution, and painful cross-shard queries. I would usually try indexes, query tuning, caching, and replication first, then shard when one database is no longer enough.

## When To Use It

- One database node cannot handle the write load.
- The dataset is too large for one database node.
- Traffic can be routed by a stable key, such as `user_id`, `tenant_id`, or account id.
- Most queries access data within one shard.
- The team can operate resharding, routing, backups, and failures across many nodes.

## When NOT To Use It

- The database is slow because queries or indexes are poorly designed.
- Read scaling can be handled with replicas or caching.
- Queries often need joins or transactions across many shards.
- The shard key is unclear or changes often.
- The operational complexity is not worth the current scale problem.

## Alternatives

- Add indexes or rewrite slow queries.
- Scale the database vertically.
- Use replication for read scaling and failover.
- Use caching for repeated read-heavy access.
- Partition a table within one database.
- Denormalize or precompute read models for specific hot paths.

## Pros

- Increases storage capacity beyond one node.
- Can increase write throughput by spreading writes across shards.
- Limits the amount of data each node must index and scan.
- Can isolate tenants or user groups if the shard key matches the business model.
- Reduces the blast radius of some failures when shards are independent.

## Cons

- Adds serious operational complexity.
- Choosing the wrong shard key can create hot shards.
- Cross-shard joins and transactions are harder.
- Rebalancing or resharding data can be expensive.
- Application code often needs shard routing logic.
- Backups, migrations, and incident response become more complicated.

## Common Interview Questions

- What is sharding?
- How is sharding different from replication?
- What is a shard key?
- How would you choose a shard key?
- What causes a hot shard?
- Why are cross-shard queries hard?
- When would you shard a database?

## Related Concepts

- Indexes
- Joins
- Normalization
- Replication
- Caching
- CAP Theorem

## What I'd Probably Say Instead

"I would shard when one database can no longer handle the storage or write load, and the data has a natural key I can route by. The benefit is spreading data and traffic across nodes. The cost is complexity: shard keys, hot shards, cross-shard queries, rebalancing, and operations all become much harder."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Split the data across machines | Sharding |
| Decide where this row belongs | Shard key |
| One shard gets too much traffic | Hot shard |
| Spread rows evenly | Data distribution |
| Move data because shards are uneven | Resharding |
| Find the right database node | Shard routing |
| Query needs data from several shards | Cross-shard query |
| Each customer gets its own slice | Tenant-based sharding |
