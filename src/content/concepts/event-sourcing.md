---
title: "Event Sourcing"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 24
summary: "Event sourcing stores each state change as an event and rebuilds current state from the event history."
---

## Problem It Solves

Most systems store the current state of an entity. For example, an order row might say the order is paid and shipped. That is simple, but it can hide how the system got there.

Event sourcing keeps the history of changes as the source of truth. Instead of only storing the current order state, the system stores events like `OrderCreated`, `PaymentCaptured`, and `OrderShipped`. The current state can then be rebuilt by replaying those events.

This is useful when the history matters, but it adds complexity because the system must manage event schemas, replay, projections, and versioning.

## One-Sentence Definition

Event sourcing is a persistence pattern where the source of truth is an append-only log of events, and current state is derived by replaying those events.

## How I Probably Think About It

"Store what happened, not just what the object looks like now."

## Interview Explanation (30 Seconds)

Event sourcing means storing a sequence of domain events instead of only storing the latest state. For example, an account balance can be derived from events like money deposited and money withdrawn. The event log is append-only and becomes the source of truth. Read models or projections are built from that log so the application can query current state efficiently. The benefit is a full audit history and the ability to rebuild derived views. The trade-off is extra complexity around event design, schema changes, replay, ordering, and eventual consistency.

## When To Use It

- The history of every change is important.
- The domain is naturally described as a sequence of events.
- Auditability is a core requirement.
- You need to rebuild read models, projections, or derived views.
- Multiple downstream systems need to react to the same facts.
- Eventual consistency between the event log and read models is acceptable.

## When NOT To Use It

- The system only needs simple CRUD operations.
- Current state is enough and detailed history has little value.
- The team is not ready to manage event versioning and replay.
- The read side must always be immediately consistent with writes.
- The domain events are unclear or would mostly mirror database updates.
- Operational simplicity matters more than audit history.

## Alternatives

- Store current state in normal database tables.
- Add audit tables for selected changes.
- Use change data capture to publish database changes.
- Use message queues for async workflows without making events the source of truth.
- Use CQRS with normal persistence on the write side.
- Store immutable snapshots for specific business records.

## Pros

- Preserves a complete history of state changes.
- Makes audits and debugging easier when event data is well designed.
- Allows read models to be rebuilt from the event log.
- Fits domains where business facts matter more than table updates.
- Works well with CQRS and projections.
- Can support temporal questions, such as what the system knew at a past time.

## Cons

- Adds significant design and operational complexity.
- Event schemas need careful versioning.
- Replaying events can be slow without snapshots.
- Queries usually need separate read models or projections.
- Bugs in old events are hard to fix cleanly.
- Event ordering, duplicate handling, and projection lag need explicit design.

## Common Interview Questions

- What is event sourcing?
- How is event sourcing different from storing current state?
- Is event sourcing the same as CQRS?
- Why are events append-only?
- What is a projection?
- How do snapshots help with event sourcing?
- How do you handle event schema changes?
- When is event sourcing overkill?

## Related Concepts

- CQRS
- Message Queues
- Eventual Consistency
- Idempotency
- Transactions
- Replication
- Caching

## What I'd Probably Say Instead

"Event sourcing means I treat the event history as the real data. I append facts like order created, payment captured, or order shipped, then build the current view from those facts. I would use it when the history itself has business value, not just because events sound nice. The main things I would call out are projections, replay, snapshots, event versioning, and eventual consistency."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Store what happened | Event sourcing |
| A fact that already happened | Domain event |
| The list of all facts | Event log / event stream |
| Add a new fact | Append an event |
| Rebuild state from history | Replay events |
| A query-friendly view built from events | Projection |
| Save a current-state checkpoint | Snapshot |
| The latest object state | Aggregate state |
| The read side catches up later | Eventual consistency |
| Change an event format over time | Event versioning |
