---
title: "Replication"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 11
summary: "Replication copies data to other database nodes so the system can improve availability, read scale, or durability."
---

## Problem It Solves

A single database node is a single point of failure. If it goes down, the application may lose access to its data.

Replication keeps copies of the data on other nodes. Those copies can help with failover, read scaling, backups, and disaster recovery.

## One-Sentence Definition

Replication is the process of copying data from one database node to one or more other nodes so the data exists in more than one place.

## How I Probably Think About It

"Keep another copy of the database so the system can keep running or serve reads elsewhere."

## Interview Explanation (30 Seconds)

Replication means copying data from one database node to other nodes. In a common primary-replica setup, writes go to the primary, and replicas receive those changes. Replicas can serve read traffic, improve durability, or take over if the primary fails. The main trade-off is consistency. If replication is asynchronous, replicas may lag behind the primary. If it is synchronous, writes are safer but slower because more nodes must confirm the change.

## When To Use It

- The system needs better database availability.
- Read traffic is high and can be spread across replicas.
- The database needs a failover target.
- Backups or analytics should run away from the primary node.
- The system can tolerate the consistency model used by the replicas.

## When NOT To Use It

- The application expects every read to immediately see the latest write.
- The main bottleneck is write capacity, not read capacity.
- The team cannot operate failover, replica lag, and recovery safely.
- The data model needs partitioning more than duplicate copies.
- Replication would hide data consistency problems instead of solving them.

## Alternatives

- Use vertical scaling for a single database node.
- Use sharding to split data across nodes.
- Use caching for repeated read-heavy access.
- Use read models or materialized views for specific query patterns.
- Use managed database backups and point-in-time recovery for durability needs.

## Pros

- Improves availability if one node fails.
- Can scale read traffic across replicas.
- Helps isolate backups, reporting, and analytics from the primary.
- Improves durability by keeping more than one copy of the data.
- Supports disaster recovery across machines or regions.

## Cons

- Adds operational complexity.
- Replicas can lag behind the primary.
- Failover can cause brief downtime or data loss if not handled carefully.
- Synchronous replication can make writes slower.
- Read-after-write behavior can surprise callers when reads go to stale replicas.

## Common Interview Questions

- What is database replication?
- What is the difference between a primary and a replica?
- How does replication improve availability?
- How can replication help read scaling?
- What is replica lag?
- What is the difference between synchronous and asynchronous replication?
- Why does replication not solve write scaling by itself?

## Related Concepts

- Transactions
- Isolation Levels
- Normalization
- Sharding
- Caching
- Eventual Consistency
- CAP Theorem

## What I'd Probably Say Instead

"Replication means keeping copies of the same data on other database nodes. I usually think of a primary taking writes and replicas following along. It is useful for read scaling, failover, backups, and durability, but I have to account for replica lag and the consistency guarantees of the replication mode."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep another copy of the database | Replication |
| The main node takes writes | Primary |
| The copy follows the main node | Replica |
| The copy is behind | Replica lag |
| Reads may see older data | Stale read |
| Wait for copies before confirming the write | Synchronous replication |
| Confirm the write before every copy catches up | Asynchronous replication |
| Switch to another node after failure | Failover |
