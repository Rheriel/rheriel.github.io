---
title: "Leader Election"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 4
summary: "Leader election lets a cluster choose one node to be in charge when the current leader is gone or unsafe."
---

## Problem It Solves

Distributed systems often need one node to be in charge of shared work. That node might accept writes, assign work, own a shard, or manage cluster metadata.

The hard part is partial failure. The old leader might crash, pause, or lose network contact with the cluster. Leader election lets the cluster choose a new leader without letting two leaders make conflicting decisions.

## One-Sentence Definition

Leader election is the process a distributed system uses to choose one leader, usually after the current leader fails, times out, or cannot reach enough nodes.

## How I Probably Think About It

"If the node in charge disappears, the group needs a safe way to pick a replacement."

## Interview Explanation (30 Seconds)

Leader election is how a cluster picks one node to be in charge. It usually happens when the current leader stops sending heartbeats or cannot reach enough voting nodes. A safe election normally uses a majority quorum. That means a node becomes leader only after enough nodes vote for it. Because majorities overlap, two separated parts of the cluster cannot both safely elect leaders. Systems also use terms, epochs, or generation numbers so nodes can reject stale leaders. Safe elections take time, but unsafe elections can create split brain.

## When To Use It

- A cluster needs one node to coordinate writes or metadata changes.
- Only one node should own a shard, lock, lease, or scheduled job at a time.
- Failover must be automatic but still safe.
- Two active leaders would corrupt data or claim the same work.
- Followers need a clear authority for accepting or forwarding writes.
- The system can wait briefly while a new leader is chosen.

## When NOT To Use It

- Any node can safely handle the work independently.
- Duplicate work is acceptable and can be cleaned up later.
- The system already has one external authority, such as a primary database or managed coordination service.
- A short outage is better than adding cluster coordination.
- The work can be split so each node owns a separate piece.
- A simple manual failover process is enough for a rare operation.

## Alternatives

- Use a single primary database when it already provides the authority you need.
- Use a managed coordination service instead of building election logic yourself.
- Use leases when time-limited ownership is enough.
- Use consistent hashing or shard ownership so nodes own separate work.
- Use idempotent workers when duplicate processing is cheaper than coordination.
- Use manual failover for rare, high-risk decisions.

## Pros

- Allows automatic failover when the current leader fails.
- Gives clients and followers one clear authority.
- Helps prevent two nodes from owning the same critical role.
- Fits well with replicated logs and consensus systems.
- Can reduce manual operations during outages.
- Makes ownership changes explicit through terms, epochs, generation numbers, or leases.

## Cons

- Adds coordination code and operational complexity.
- Usually needs a quorum before it can make a safe decision.
- Can pause writes while an election runs.
- Timeout settings are hard to tune when the network is slow or unstable.
- Poor election design can cause split brain.
- Old leaders must be blocked or rejected so they cannot keep making changes.

## Common Interview Questions

- What is leader election?
- Why do distributed systems need leader election?
- How does leader election help with failover?
- What can go wrong if two leaders exist at the same time?
- Why do leader election systems often use a quorum?
- What are heartbeats used for in leader election?
- What is a term, epoch, or generation number?
- How is leader election related to consensus?

## Related Concepts

- Consensus
- Raft
- Paxos
- Heartbeats
- Replication
- CAP Theorem
- Service Discovery
- Load Balancing

## What I'd Probably Say Instead

"Leader election is how a cluster safely picks one node to be in charge. If the current leader stops responding or loses contact with enough nodes, the other nodes wait for a timeout and run an election. A new leader usually needs votes from a majority. That helps prevent split brain. The system also needs a term, epoch, or generation number, so stale leaders can be rejected after a newer leader is chosen."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Pick one node to be in charge | Leader election |
| The old coordinator stopped answering | Failure detection |
| The leader checks in regularly | Heartbeats |
| Enough nodes voted for this node | Majority quorum |
| Two coordinators are active at once | Split brain |
| This leadership period has a number | Term, epoch, or generation |
| Block the old leader from writing | Fencing token |
| A node is allowed to own something for a limited time | Lease |
