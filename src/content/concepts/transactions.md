---
title: "Transactions"
level: "Explain implementation"
volume: "01-core-backend-concepts"
order: 1
summary: "A transaction groups related operations so they commit together or roll back together."
---

## Problem It Solves

Sometimes several database changes need to succeed or fail together. Without a transaction, one change might succeed while another fails. That can leave the system in a state the business never wanted, like charging a customer without saving the order.

## One-Sentence Definition

A transaction groups operations so they commit together or roll back together.

## How I Probably Think About It

"Do these writes together, and if one of them fails, undo the whole thing."

## Interview Explanation (30 Seconds)

A transaction lets me group related database changes so they either all commit or all roll back. I use one when partial success would break the business state, like moving money between accounts or creating an order with its line items. The trade-off is that transactions can hold locks and slow down other work, so I keep them small. I also avoid slow network calls inside a transaction.

## When To Use It

- Multiple writes must stay consistent.
- A failure halfway through would leave bad business data.
- A read-modify-write flow must be protected from other updates.
- One database can protect the whole change.

## When NOT To Use It

- The workflow crosses services that cannot share one database transaction.
- The operation includes slow external calls, such as payment gateways or HTTP APIs.
- Eventual consistency is acceptable and simpler.
- A single atomic database statement is enough.

## Alternatives

- Single atomic database statement.
- Idempotent retry with a unique request key.
- Outbox pattern for reliable event publishing.
- Saga or compensating action for multi-service workflows.
- Optimistic locking for conflict detection without holding locks.

## Pros

- Protects important business rules.
- Gives clear commit and rollback semantics.
- Makes local database changes easier to reason about.
- Works well for short units of work.

## Cons

- Can increase lock contention.
- Long transactions reduce concurrency.
- Distributed transactions are hard and often avoided.
- Rollback does not undo external side effects outside the database.

## Common Interview Questions

- What is a transaction?
- What does commit mean?
- What does rollback mean?
- Why should transactions be short?
- Can a transaction include a call to another service?
- How do transactions relate to ACID?

## Related Concepts

- ACID
- Isolation Levels
- Optimistic Locking
- Pessimistic Locking
- Deadlocks
- Idempotency
- Eventual Consistency

## What I'd Probably Say Instead

"I would wrap that in a transaction so the database changes commit together. I would keep it small and avoid network calls inside it. If the workflow crosses service boundaries, I would usually use idempotency, an outbox, or a saga instead of trying to force one big transaction."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Do these changes together | Transaction |
| Save the whole thing | Commit |
| Undo the whole thing | Rollback |
| Do not leave it half-finished | Atomicity |
| Keep the business rules true | Consistency |
| Other requests should not mess this up | Isolation |
| It should still be there after success | Durability |
| Keep it small so it does not block others | Reduce lock contention |
