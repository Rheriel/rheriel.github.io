# Optimistic Locking

**Level:** ⭐⭐⭐ Explain trade-offs

## Problem It Solves

Two requests can read the same data, make different decisions, and then both try to save changes. Without conflict detection, the later save can silently overwrite the earlier one.

Optimistic locking catches that conflict before the overwrite happens.

## One-Sentence Definition

Optimistic locking detects concurrent updates by checking that a record has not changed since it was read, usually with a version number or timestamp.

## How I Probably Think About It

"Save this only if nobody changed it since I loaded it."

## Interview Explanation (30 Seconds)

Optimistic locking is a way to handle write conflicts without locking the row while the user or request is working. The application reads a record with a version, then includes that version when it updates the record. The database only applies the update if the version still matches. If another request updated the row first, the update affects no rows or raises a conflict, and the application must retry, reject, or ask the user to resolve it. It works well when conflicts are possible but not constant.

## When To Use It

- Users or requests edit data that may also be edited by someone else.
- Conflicts are rare enough that retrying is cheaper than blocking.
- You want to avoid holding database locks during long business logic or user think time.
- Lost updates would be incorrect or surprising.

## When NOT To Use It

- Many requests constantly update the same row.
- A conflict must be prevented before work starts, not detected at save time.
- The operation can be expressed as one atomic database statement.
- Automatic retries could repeat unsafe side effects.

## Alternatives

- Pessimistic locking with explicit row locks.
- Single atomic update with a `WHERE` condition.
- Serializable isolation for stronger transaction-level protection.
- Database constraints for rules the database can enforce directly.
- Queueing writes through one worker when conflicts are very frequent.

## Pros

- Avoids holding locks while work is happening.
- Prevents silent lost updates.
- Works well for low-conflict workloads.
- Makes conflict handling explicit in the application.

## Cons

- Conflicts are found late, at write time.
- The application must handle retries or conflict responses.
- High-conflict workloads can waste work through repeated failed updates.
- Version checks must be used consistently on every relevant update path.

## Common Interview Questions

- What is optimistic locking?
- How does optimistic locking prevent lost updates?
- What is a version column used for?
- How is optimistic locking different from pessimistic locking?
- What should the application do when an optimistic lock conflict happens?
- When would optimistic locking perform badly?

## Related Concepts

- Transactions
- Isolation Levels
- MVCC
- Pessimistic Locking
- Deadlocks
- Idempotency

## What I'd Probably Say Instead

"I would add a version column and update the row only if the version still matches what I read. If the update fails, that means someone else changed the row first. Then I can retry, return a conflict, or ask the user to reload. That avoids holding a lock for the whole workflow, but it only works well when conflicts are not happening all the time."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Save only if nobody changed it | Optimistic locking |
| The record changed since I opened it | Write conflict |
| Do not overwrite someone else's change | Prevent lost update |
| Check the version before saving | Version check |
| The save did not match any row | Optimistic lock conflict |
| Try again after re-reading | Retry after conflict |
