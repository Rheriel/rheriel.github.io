---
title: "Raft"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 2
summary: "Raft is a consensus algorithm that uses a leader and a replicated log so a cluster can agree safely."
---

## Problem It Solves

A distributed system may need several nodes to agree on the same sequence of changes. For example, a cluster may need to store configuration changes, choose one leader, or decide which writes are safe to apply.

This is hard because nodes can crash, restart, slow down, or lose network contact. Raft gives the cluster a clear process for keeping a replicated log consistent even when some nodes fail.

## One-Sentence Definition

Raft is a consensus algorithm where a cluster elects a leader, sends changes through that leader, and commits a log entry after a majority of nodes copy it.

## How I Probably Think About It

"Pick one leader, write changes to a replicated log, and count a change as committed only after a majority has it."

## Interview Explanation (30 Seconds)

Raft is a consensus algorithm that keeps a cluster on one ordered log. The cluster elects one leader for a term. Clients send writes to that leader. The leader records each write in its log and sends the entry to followers. When a majority of nodes have the entry and the leader commits it, the cluster can apply it in order. Raft uses heartbeats and election timeouts to notice when the leader is gone and elect a new one. The trade-off is that Raft gives safe coordination, but each committed write needs majority agreement.

## When To Use It

- A cluster needs one safe leader.
- Several nodes must agree on one ordered log of changes.
- Split brain would corrupt data or create two owners for the same resource.
- Configuration, metadata, locks, or control-plane state must stay strongly coordinated.
- The system can accept extra latency for majority agreement.
- Safe failover matters more than accepting writes through every network problem.

## When NOT To Use It

- The data can be eventually consistent.
- Temporary disagreement is acceptable.
- One database primary already gives enough coordination.
- The system mainly needs high write throughput for many independent pieces of data.
- The team can use an existing database or coordination service instead.
- Losing a majority should not stop writes.

## Alternatives

- Use a managed database or coordination service that already provides this behavior.
- Use a single primary node when one authority is enough.
- Use eventual consistency when temporary disagreement is acceptable.
- Use leases when weaker, time-limited ownership is acceptable.
- Use idempotent retries and cleanup when duplicate work is easier than global agreement.
- Use Paxos or another consensus algorithm when it fits the existing platform better.

## Pros

- Easier to explain than many older consensus algorithms.
- Gives the cluster one clear leader for writes.
- Keeps committed changes in the same order across nodes.
- Prevents two different committed histories when quorum rules are followed.
- Supports safe leader replacement after failure.
- Works well for small clusters that store critical metadata.

## Cons

- Requires a majority of voting nodes before it can make progress.
- Adds network round trips before a write is committed.
- The leader can become a bottleneck.
- Elections and timeouts need careful tuning.
- Adding or removing voting nodes is complex.
- It is still difficult to implement correctly.

## Common Interview Questions

- What is Raft?
- How does Raft relate to consensus?
- Why does Raft use a leader?
- What is a Raft term?
- What is a committed log entry?
- Why does Raft need a majority quorum?
- What happens when the leader fails?
- How is Raft different from Paxos at a high level?

## Related Concepts

- Consensus
- Paxos
- Leader Election
- Heartbeats
- Replication
- Eventual Consistency
- CAP Theorem
- Service Discovery

## What I'd Probably Say Instead

"Raft is a practical consensus algorithm for a replicated log. The cluster elects one leader, and writes go through that leader. The leader copies each log entry to followers. Once a majority has the entry and the leader commits it, the cluster can apply it in order. That gives safe failover and one agreed history, but it needs a quorum and adds latency."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The cluster picked one node to coordinate writes | Leader election |
| One numbered leadership period | Term |
| The ordered list of changes | Replicated log |
| Enough voting nodes copied the change | Majority quorum |
| This change is safe to apply | Committed log entry |
| The leader checks that followers are alive | Heartbeats |
| The leader seems gone | Election timeout |
| The cluster cannot agree right now | No quorum |
