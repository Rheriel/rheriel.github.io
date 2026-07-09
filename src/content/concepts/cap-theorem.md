---
title: "CAP Theorem"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 22
summary: "CAP theorem describes the trade-off a distributed data system makes between consistency and availability when the network is unreliable."
---

## Problem It Solves

Distributed systems run on more than one node. Those nodes talk over a network, and networks can fail, slow down, or split parts of the system from each other.

CAP theorem gives interviewers and engineers a shared way to talk about what happens during a network partition. When nodes cannot reliably communicate, the system must choose between returning only correct, up-to-date answers or staying available for requests that might see stale or conflicting data.

## One-Sentence Definition

CAP theorem says that when a distributed data system has a network partition, it must choose between consistency and availability.

## How I Probably Think About It

"If parts of the system cannot talk to each other, do we reject some requests or accept answers that might be stale?"

## Interview Explanation (30 Seconds)

CAP theorem applies to distributed data systems during a network partition. Partition tolerance is not really optional, because network failures happen. So the real trade-off is usually between consistency and availability during that failure. A CP system prefers correctness: it may reject or block some requests rather than return stale data. An AP system prefers availability: it keeps serving requests, but different nodes may temporarily disagree and must reconcile later. CAP is not a reason to label a whole system forever. It is a way to explain behavior under partition.

## When To Use It

- You are discussing distributed databases or replicated services.
- A system must handle network partitions between nodes.
- You need to explain consistency versus availability trade-offs.
- You are comparing CP and AP behavior during failure.
- You are reasoning about stale reads, split brain, failover, or replication lag.
- An interviewer asks why a system cannot always be perfectly consistent and always available.

## When NOT To Use It

- The system is not distributed.
- You are talking about normal latency trade-offs without a network partition.
- You need a full consistency model, such as read-after-write or linearizability.
- You are choosing an API style like REST, GraphQL, or gRPC.
- You are trying to replace concrete requirements with a broad label like "CP" or "AP".
- The business problem needs a more specific failure-mode analysis.

## Alternatives

- Define the exact consistency guarantees the feature needs.
- Use strong consistency for data with strict invariants.
- Use eventual consistency when stale data is acceptable.
- Route critical writes through a single leader or primary.
- Use quorum reads and writes to balance correctness and availability.
- Design compensating actions for conflicts that appear after recovery.

## Pros

- Gives a concise vocabulary for distributed-system trade-offs.
- Keeps the discussion focused on network partitions.
- Helps explain why some systems reject requests during failures.
- Helps explain why some systems keep serving stale data during failures.
- Connects naturally to replication, failover, and eventual consistency.

## Cons

- Easy to oversimplify into "pick two" without mentioning partitions.
- Does not describe all consistency levels.
- Does not say which trade-off is right for a business case.
- Real systems often mix behaviors across features or operations.
- Can hide important details like latency, durability, conflict resolution, and recovery.

## Common Interview Questions

- What is CAP theorem?
- What do consistency, availability, and partition tolerance mean?
- Why is partition tolerance usually not optional?
- What is the difference between CP and AP systems?
- Can a distributed system be both consistent and available when there is no partition?
- How does CAP relate to eventual consistency?
- How does CAP relate to replication?
- Why is "pick two" an oversimplification?

## Related Concepts

- Replication
- Eventual Consistency
- Message Queues
- Transactions
- Isolation Levels
- Sharding
- Caching
- CQRS

## What I'd Probably Say Instead

"CAP is about what a distributed data system does when the network splits. Since partitions can happen, the practical choice is whether the system preserves consistency by rejecting some requests, or preserves availability by serving requests that might be stale and reconciling later. I would not use CAP as the whole design answer; I would tie it back to the feature's real consistency and failure requirements."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The nodes cannot talk to each other | Network partition |
| Always return the latest correct answer | Consistency |
| Keep accepting requests | Availability |
| Survive communication failures between nodes | Partition tolerance |
| Reject requests instead of risking stale data | CP behavior |
| Keep serving and fix disagreement later | AP behavior |
| Two sides both think they can accept writes | Split brain |
| Copies disagree for a while | Temporary inconsistency |
| Copies catch up after the failure | Reconciliation / convergence |
