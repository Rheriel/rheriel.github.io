---
title: "Deadlocks"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 7
summary: "A deadlock happens when transactions wait on each other in a cycle, so the database must abort one to make progress."
---

## Problem It Solves

When transactions take locks, they can block each other. Usually that just means one transaction waits for another to finish.

A deadlock is worse: two or more transactions are each waiting for a lock held by another transaction in the same group. None of them can continue unless the database breaks the cycle.

## One-Sentence Definition

A deadlock happens when transactions wait on each other in a cycle, so the database must abort one of them to let the others continue.

## How I Probably Think About It

"Two requests each hold something the other one needs, so neither can finish."

## Interview Explanation (30 Seconds)

A deadlock can happen when concurrent transactions take locks in different orders. For example, one transaction locks account A and then wants account B, while another locks account B and then wants account A. Each transaction is waiting for the other to release a lock, so neither can make progress. Databases usually detect this cycle and abort one transaction with a deadlock error. The application should retry the aborted transaction if the operation is safe to retry. To reduce deadlocks, keep transactions short, lock rows in a consistent order, and avoid locking more data than needed.

## When To Use It

- You do not use deadlocks intentionally, but you should expect them when transactions lock shared data.
- Treat deadlock handling as part of normal retry logic for write-heavy systems.
- Design for them when multiple transactions update the same set of resources.
- Pay special attention when one operation locks several rows or tables.

## When NOT To Use It

- Do not treat a deadlock as a business validation error.
- Do not solve frequent deadlocks only by increasing timeouts.
- Do not keep retrying if the operation has unsafe external side effects.
- Do not hold locks while waiting on slow network calls or user input.

## Alternatives

- Lock resources in a consistent order.
- Keep transactions shorter and smaller.
- Use optimistic locking when conflicts are rare.
- Use a single atomic update when the database can express the change directly.
- Queue work for one resource so only one worker updates it at a time.
- Use database constraints instead of application-level read-then-check logic.

## Pros

- Database deadlock detection prevents transactions from waiting forever.
- A deadlock error is clear enough for the application to retry.
- Understanding deadlocks helps design safer transaction flows.

## Cons

- One transaction must fail and roll back.
- Retrying can increase load during contention.
- Frequent deadlocks often point to inconsistent lock ordering or oversized transactions.
- Deadlocks can be hard to reproduce because they depend on timing.

## Common Interview Questions

- What is a deadlock?
- How can pessimistic locking lead to deadlocks?
- How do databases handle deadlocks?
- How can you reduce deadlocks?
- What should the application do when a deadlock happens?
- What is the difference between a deadlock and normal lock waiting?

## Related Concepts

- Transactions
- Isolation Levels
- Pessimistic Locking
- Optimistic Locking
- MVCC
- Idempotency

## What I'd Probably Say Instead

"A deadlock is when two transactions are each waiting for the other to release a lock. The database usually detects that cycle and aborts one transaction. I would keep the transaction short, lock rows in a consistent order, and retry the aborted transaction only if the operation is safe to retry."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Two requests are stuck waiting on each other | Deadlock |
| This transaction holds what the other one needs | Lock dependency |
| They are waiting in a loop | Wait cycle |
| The database kills one so the rest can move | Deadlock victim |
| Try the failed transaction again | Retry after deadlock |
| Always lock A before B | Consistent lock ordering |
