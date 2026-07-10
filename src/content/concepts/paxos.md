---
title: "Paxos"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 3
summary: "Paxos is a consensus algorithm that lets nodes choose one value safely even when some nodes fail."
---

## Problem It Solves

A distributed system sometimes needs several nodes to agree on one value. That value might be the current leader, a configuration change, or the next log entry.

This is hard because nodes can crash, restart, slow down, or miss messages. Paxos gives the system rules for making one safe choice even when some nodes do not answer.

## One-Sentence Definition

Paxos is a consensus algorithm where nodes propose numbered values, acceptors vote on them, and a value is chosen only after a majority accepts it.

## How I Probably Think About It

"If a majority may already have accepted something, later rounds cannot pretend it never happened."

## Interview Explanation (30 Seconds)

Paxos is a consensus algorithm for choosing one value in a distributed system. Nodes propose numbered values, and acceptors vote on them. A value is chosen only when a majority accepts it. If a later round starts, it must carry forward the strongest accepted value it finds. That is the key safety idea. It stops two different values from both being chosen for the same decision. Paxos matters because it works when some nodes fail, but in an interview I would keep it high level unless asked for the full algorithm.

## When To Use It

- A cluster needs to agree on one critical value.
- A replicated system needs a safe way to choose each log entry.
- Split brain would corrupt data or create two owners for the same thing.
- The system already uses Paxos or a Paxos-style protocol.
- Correctness matters more than simple implementation.
- The system can require a majority before making progress.

## When NOT To Use It

- The data can be eventually consistent.
- Temporary disagreement is acceptable.
- A simpler primary database or coordination service already solves the problem.
- The team can rely on an existing database, queue, or coordination system.
- The system needs to keep accepting writes when it cannot reach a majority.
- Raft would be easier to run and explain for the same need.

## Alternatives

- Use Raft when a leader and a replicated log are a better fit.
- Use a managed coordination service instead of implementing consensus yourself.
- Use a single primary node when one authority is enough.
- Use eventual consistency when temporary disagreement is acceptable.
- Use leases when temporary ownership is enough.
- Use idempotency and reconciliation when duplicate work is easier than global agreement.

## Pros

- Gives a safe way for nodes to choose one value.
- Tolerates some node failures as long as a majority quorum is available.
- Prevents two different chosen values for the same decision.
- Forms the basis for many real distributed systems.
- Does not depend on perfectly reliable clocks.
- Does not require any one machine to stay healthy forever.

## Cons

- Hard to explain without careful wording.
- Hard to implement and test correctly.
- Requires multiple message exchanges for each decision.
- Cannot make progress without a majority.
- The basic form, called single-decree Paxos, chooses one value. Practical systems need extra structure for logs.
- Its behavior in production is often harder to explain than leader-based protocols.

## Common Interview Questions

- What is Paxos?
- How does Paxos relate to consensus?
- Why does Paxos need majority quorums to overlap?
- What does it mean for a value to be chosen?
- Why is Paxos considered hard to understand?
- How is Paxos different from Raft at a high level?
- What happens if two nodes propose different values?
- Why can Paxos stop making progress when there is no quorum?

## Related Concepts

- Consensus
- Raft
- Leader Election
- Replication
- Eventual Consistency
- CAP Theorem
- Heartbeats
- Service Discovery

## What I'd Probably Say Instead

"Paxos is a consensus algorithm for choosing one value safely. Proposers suggest numbered values, and acceptors vote on them. A value only counts as chosen after a majority accepts it. If a later round starts, it has to preserve the strongest accepted value it learns about. Because majorities overlap, two different values cannot both win. I would usually explain Paxos at this level, then say that Raft is easier to talk through because it uses a leader and a replicated log."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| A node suggests an answer | Proposer |
| A numbered suggested answer | Proposal |
| A node votes for a proposal | Acceptor |
| Enough acceptors voted for it | Majority quorum |
| This value won | Chosen value |
| Later rounds cannot ignore the strongest earlier vote they learn about | Paxos safety rule |
| Two answers must not both win | Consensus safety |
| The cluster cannot decide right now | No quorum |
| One agreement step | Single-decree Paxos |
| A log built from many agreement steps | Multi-Paxos |
