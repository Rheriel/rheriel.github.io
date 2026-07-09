# MVCC

**Level:** ⭐⭐⭐⭐ Explain implementation

## Problem It Solves

Databases need to handle readers and writers at the same time. If every read had to block every write, the system would slow down quickly. If reads ignored concurrent writes completely, transactions could see confusing or incorrect data.

MVCC helps the database give readers a stable view while allowing writers to keep working.

## One-Sentence Definition

MVCC, or multi-version concurrency control, lets a database keep multiple versions of a row so transactions can read a consistent snapshot without blocking most writes.

## How I Probably Think About It

"Let readers see the version that was valid when they started, while writers create a newer version."

## Interview Explanation (30 Seconds)

MVCC is a database concurrency technique where updates create new row versions instead of overwriting data in place immediately. A transaction reads the version that matches its snapshot, so readers usually do not block writers and writers usually do not block readers. This is how many databases implement snapshot-style isolation. The trade-off is that the database must track row versions, clean up old versions, and still detect write conflicts when two transactions try to change the same data.

## When To Use It

- Many reads and writes need to happen at the same time.
- Readers need a stable view of data during a transaction.
- Blocking reads would hurt throughput or latency.
- The database already provides MVCC-based isolation.

## When NOT To Use It

- You need to prevent another transaction from changing a row before you act on it.
- The workload has heavy write conflicts on the same rows.
- Old row versions are not being cleaned up and storage bloat is becoming a problem.
- The real issue is cross-service consistency, not local database concurrency.

## Alternatives

- Pessimistic locking with explicit row locks.
- Optimistic locking with a version column.
- Serializable isolation when the business rule needs stronger guarantees.
- Single atomic update with a `WHERE` condition.
- Queueing writes through one worker when conflicts are very high.

## Pros

- Lets reads and writes overlap more.
- Gives transactions a consistent snapshot.
- Reduces read blocking compared with simple locking.
- Works well for read-heavy systems with moderate write contention.

## Cons

- Old row versions need cleanup.
- Long-running transactions can keep old versions alive.
- Write conflicts can still happen and may require retries.
- Behavior differs between databases and isolation levels.

## Common Interview Questions

- What is MVCC?
- How does MVCC reduce locking?
- How does MVCC relate to isolation levels?
- Does MVCC mean writes never conflict?
- Why can long-running transactions be a problem with MVCC?
- What is the difference between MVCC and optimistic locking?

## Related Concepts

- Transactions
- ACID
- Isolation Levels
- Optimistic Locking
- Pessimistic Locking
- Deadlocks

## What I'd Probably Say Instead

"I would rely on the database's MVCC behavior so normal reads do not block normal writes. Each transaction reads from a snapshot, while updates create newer versions. That helps concurrency, but it does not remove every conflict. If two requests update the same row, I still need conflict handling, retries, constraints, or explicit locking depending on the business rule."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Let readers keep seeing the old value | Snapshot read |
| Save a newer copy instead of replacing it immediately | Row versioning |
| Reads should not block writes | MVCC read/write concurrency |
| This transaction sees a stable view | Transaction snapshot |
| Two writers changed the same thing | Write conflict |
| Clean up old copies | Vacuum / garbage collection |
