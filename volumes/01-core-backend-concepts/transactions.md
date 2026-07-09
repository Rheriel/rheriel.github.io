# Transactions

**Level:** ⭐⭐⭐⭐ Explain implementation

## Problem It Solves

Sometimes several database operations must succeed or fail as one unit. Without a transaction, a partial failure can leave the system in a state that no business rule actually allows, such as charging a customer without recording the order.

## One-Sentence Definition

A transaction is a group of operations treated as a single unit of work, usually with commit and rollback behavior.

## How I Probably Think About It

"Do these writes together, and if one of them fails, undo the whole thing."

## Interview Explanation (30 Seconds)

A transaction lets me group related database operations so they either all commit or all roll back. I use it when partial success would corrupt the business state, like moving money between accounts or creating an order with its line items. The trade-off is that transactions can hold locks, increase contention, and make distributed workflows harder, so I keep them as small as possible and avoid mixing slow external calls into the transaction boundary.

## When To Use It

- Multiple writes must stay consistent.
- A failure halfway through would create invalid business state.
- A read-modify-write sequence needs protection from concurrent updates.
- The database can enforce the consistency boundary locally.

## When NOT To Use It

- The workflow spans services that cannot share one database transaction.
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

- Protects important invariants.
- Gives clear commit and rollback semantics.
- Simplifies reasoning about local database changes.
- Works well for short, bounded units of work.

## Cons

- Can increase lock contention.
- Long transactions reduce concurrency.
- Distributed transactions are complex and often avoided.
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

"I would wrap that in a transaction so the database changes commit together. I would keep the transaction small and avoid doing network calls inside it. If the workflow crosses service boundaries, I would usually move to idempotency, an outbox, or a saga instead of trying to force one big transaction."

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
