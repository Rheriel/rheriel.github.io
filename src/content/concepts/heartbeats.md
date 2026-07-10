---
title: "Heartbeats"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 5
summary: "Heartbeats are regular check-ins that help other nodes decide whether a service is still reachable."
---

## Problem It Solves

Distributed systems need a way to notice when another node stops responding. A leader may need to show it is still active. A service registry may need to remove unhealthy instances. A worker pool may need to replace a worker that stopped answering.

The hard part is that silence does not always mean the node died. It may have crashed, but it may also be slow, paused, overloaded, or cut off by the network. Heartbeats give the system a simple sign that a node is reachable, but the system still needs a timeout and a careful reaction when that sign stops.

## One-Sentence Definition

Heartbeats are small, regular messages that one process sends so other processes can treat it as still reachable and part of the system.

## How I Probably Think About It

"Keep checking in, and if you stop checking in for long enough, the system treats you as unavailable."

## Interview Explanation (30 Seconds)

Heartbeats are regular "I am still here" messages between nodes. They show up in leader election, service discovery, replication, and health checks. If other nodes stop receiving heartbeats for long enough, they may mark that node unhealthy, fail over, or stop routing traffic to it. The main trade-off is the timeout. A short timeout finds problems faster, but it can overreact to a slow network or a paused process. A long timeout avoids some false alarms, but it waits longer after a real failure.

## When To Use It

- Nodes need a simple way to show they are still reachable.
- A leader must show it is still active to followers.
- A cluster needs to notice failed or unreachable members.
- A service registry needs to remove unhealthy instances from routing.
- A worker coordinator needs to replace workers that stop answering.
- Fast failure detection matters, but proof of death is not required.

## When NOT To Use It

- A simple health check request is enough.
- The system can rely on a managed load balancer or platform health check.
- A false failure signal would be more harmful than waiting.
- The network is so unstable that heartbeats would constantly flap.
- The work does not require tracking live members.
- You need proof that a node is dead rather than a suspicion that it is unreachable.

## Alternatives

- Use normal request failures and retries instead of background checks.
- Use a load balancer health check to decide where traffic should go.
- Use leases when ownership should expire unless renewed.
- Use gossip when many nodes need to share membership state.
- Use manual failover for rare operations where automation is risky.
- Use application-level metrics and alerts when operators, not code, should react.

## Pros

- Simple to explain and implement at a basic level.
- Detects many crashes and network breaks before user traffic hits the node.
- Helps automate failover, routing changes, and worker replacement.
- Works well with leader election and service discovery.
- Can carry small status details, such as load or current role.
- Makes cluster membership changes visible quickly.

## Cons

- Missing heartbeats show that a node is not reachable from the node doing the check, not that it is dead.
- Timeout values are hard to tune across slow networks and busy systems.
- Short intervals add background traffic and processing work.
- Bad timeout settings can cause false failover or split brain.
- Too many heartbeat checks can create a lot of background traffic.
- A paused or overloaded process may look failed even if it later recovers.

## Common Interview Questions

- What are heartbeats in a distributed system?
- Why are heartbeats used in leader election?
- What happens when a node misses heartbeats?
- How do heartbeat intervals and timeouts affect failover?
- Why can heartbeats create false positives?
- What is the difference between a failed node and an unreachable node?
- How are heartbeats related to service discovery?
- How would you reduce heartbeat overhead in a large cluster?

## Related Concepts

- Leader Election
- Raft
- Consensus
- Service Discovery
- Load Balancing
- Circuit Breaker
- Retry
- Gossip Protocol

## What I'd Probably Say Instead

"Heartbeats are regular check-ins between nodes. If a leader, worker, or service instance keeps sending them, the rest of the system treats it as reachable. If the check-ins stop for longer than a timeout, the system marks it unhealthy and may fail over, reroute traffic, or start a replacement. The key point is that missed heartbeats mean the node is unreachable from here, not necessarily dead, so the timeout matters."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep checking in | Heartbeat |
| The check-in stopped | Missed heartbeat |
| Wait this long before reacting | Timeout |
| The node seems gone | Failure detection |
| The node might be alive but unreachable from here | Partial failure |
| Remove it from traffic | Mark unhealthy |
| It keeps switching between healthy and unhealthy | Flapping |
| Renew this ownership before it expires | Lease renewal |
