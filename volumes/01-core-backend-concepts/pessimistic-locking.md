# Pessimistic Locking

**Level:** ⭐⭐⭐ Explain trade-offs

## Problem It Solves

Sometimes it is not enough to detect a conflict after it happens. A request may need to make a decision based on data and then safely update that same data before anyone else changes it.

Pessimistic locking prevents another transaction from changing locked data while the current transaction is using it.

## One-Sentence Definition

Pessimistic locking protects data by taking a lock before working with it, so other transactions must wait before they can change the same data.

## How I Probably Think About It

"Reserve this row while I decide what to do with it."

## Interview Explanation (30 Seconds)

Pessimistic locking assumes conflicts are likely or expensive, so it prevents them upfront. A transaction reads data with a lock, often using a row-level lock such as `SELECT ... FOR UPDATE`. Other transactions that want to update the same row usually have to wait until the first transaction commits or rolls back. This is useful when the business rule cannot tolerate another update sneaking in, but the trade-off is lower concurrency, possible blocking, and deadlocks if locks are taken in inconsistent orders.

## When To Use It

- Conflicts are common enough that retrying would waste too much work.
- A decision and update must be protected as one short transaction.
- Two requests must not process the same item at the same time.
- The operation touches a small, known set of rows.
- Waiting is better than returning a conflict to the caller.

## When NOT To Use It

- The transaction includes slow external calls or user think time.
- Conflicts are rare and optimistic locking would be cheaper.
- The lock would cover many rows or a whole table.
- High throughput matters more than strict serialization of one resource.
- The operation can be written as one atomic update.

## Alternatives

- Optimistic locking with a version column.
- Single atomic update with a `WHERE` condition.
- Serializable isolation for stronger transaction-level protection.
- Database constraints for rules the database can enforce directly.
- Queueing work so only one worker handles a resource at a time.

## Pros

- Prevents conflicting updates before they happen.
- Makes exclusive access explicit.
- Works well for short, high-conflict critical sections.
- Can simplify application logic when waiting is acceptable.

## Cons

- Reduces concurrency because other transactions may block.
- Long transactions can cause lock contention.
- Deadlocks can happen when transactions take locks in different orders.
- Locks must be scoped carefully to avoid hurting performance.

## Common Interview Questions

- What is pessimistic locking?
- How is pessimistic locking different from optimistic locking?
- What does `SELECT ... FOR UPDATE` do?
- When would you choose pessimistic locking?
- Why should transactions with locks be short?
- How can pessimistic locking lead to deadlocks?

## Related Concepts

- Transactions
- Isolation Levels
- MVCC
- Optimistic Locking
- Deadlocks
- Idempotency

## What I'd Probably Say Instead

"I would lock the row inside a short transaction before making the decision. That way another request cannot update the same row until I commit or roll back. I would only do this for a small amount of data and keep the transaction short, because blocking other work can hurt throughput and can lead to deadlocks."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Reserve this row while I work | Pessimistic locking |
| Make others wait before changing it | Blocking concurrent writers |
| Lock only this record | Row-level lock |
| Read it and lock it for update | `SELECT ... FOR UPDATE` |
| Keep the locked work small | Short critical section |
| Two transactions wait on each other | Deadlock |
