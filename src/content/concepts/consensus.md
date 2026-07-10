---
title: "Consensus"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 1
summary: "Consensus lets distributed nodes agree on one decision even when some nodes fail."
---

## Problem It Solves

Distributed systems often need several nodes to act like one reliable system. They may need to choose a leader, commit a log entry, promote a replica, or agree that a write is safely stored.

Failure makes this hard. Nodes can restart, slow down, or miss messages. Consensus gives the system a careful way to make one shared decision without letting different nodes make conflicting decisions.

## One-Sentence Definition

Consensus is a way for multiple nodes to agree on one decision and avoid deciding different things.

## How I Probably Think About It

"Before the cluster acts, enough nodes need to agree."

## Interview Explanation (30 Seconds)

Consensus is how a distributed system gets several nodes to agree on one decision. That decision might be who the leader is or whether a log entry is committed. It matters because nodes can fail or lose contact with each other. Many consensus systems use a majority quorum. That means two successful decisions must share at least one node. This stops two separated groups from safely making different decisions. The trade-off is cost: consensus adds latency and complexity, so I would use it only for decisions that must be correct across the cluster.

## When To Use It

- A cluster must choose one leader.
- A replicated log entry should be committed only after enough replicas accept it.
- Split brain would corrupt data or break ownership rules.
- Nodes need strong coordination before they act.
- Failover must be safe, not just fast.
- Conflicting cluster-level decisions would cause data corruption.

## When NOT To Use It

- The data can be eventually consistent.
- Temporary disagreement is acceptable.
- The decision affects only one process or one database transaction.
- Low latency matters more than global agreement.
- The system can tolerate duplicate work and clean it up later.
- A simpler primary database, queue, or lock is enough for the requirement.

## Alternatives

- Use a single primary node or database when one authority is acceptable.
- Use eventual consistency when temporary disagreement is acceptable.
- Use message queues for asynchronous work that does not need shared agreement.
- Use idempotency when duplicate work is easier to handle than global coordination.
- Use leases or timeouts when weaker guarantees are acceptable.
- Use manual approval for rare, high-risk failover decisions.

## Pros

- Prevents nodes from making conflicting critical decisions.
- Enables safe leader election and failover.
- Helps replicated systems decide when a log entry is committed.
- Gives a clear correctness model for important cluster decisions.
- Prevents split brain for decisions guarded by quorum rules.

## Cons

- Adds network round trips and latency.
- Reduces availability when a quorum cannot be reached.
- Increases implementation and operational complexity.
- Requires careful handling of timeouts, retries, node terms, and node membership.
- Can be too much for data that only needs eventual consistency.
- Still needs monitoring and recovery when nodes are slow, partitioned, or unhealthy.

## Common Interview Questions

- What does consensus mean in distributed systems?
- Why is consensus hard?
- What is a majority quorum?
- How does consensus help prevent split brain?
- How is consensus different from eventual consistency?
- When would you use a consensus algorithm?
- Why can consensus reduce availability?
- How do Raft and Paxos relate to consensus?

## Related Concepts

- Replication
- Eventual Consistency
- CAP Theorem
- Message Queues
- Idempotency
- Raft
- Paxos
- Leader Election
- Heartbeats

## What I'd Probably Say Instead

"Consensus is how a cluster agrees on one critical decision, like electing a leader or committing a replicated log entry. Usually a quorum has to agree. That stops two separated parts of the cluster from both making different decisions. I would use consensus when correctness matters more than speed, but not for every operation. It adds latency and can block if the cluster cannot reach enough nodes."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Enough nodes agreed | Majority quorum |
| The cluster picked one answer | Consensus decision |
| Only one side is allowed to continue | Preventing split brain |
| This replicated change is safe to count as saved | Committed log entry |
| The nodes need one boss | Leader election |
| Some nodes cannot be reached | Partial failure |
| The system waits for agreement | Coordination |
| The group cannot decide right now | No quorum |
