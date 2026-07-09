---
title: "Isolation Levels"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 3
summary: "Isolation levels define how much a transaction is protected from other transactions running at the same time."
---

## Problem It Solves

Transactions can read and write the same data at the same time. Without clear isolation rules, one transaction may see unfinished work from another transaction. It may also see results change while it runs, or make a decision from data that was never really stable.

## One-Sentence Definition

Isolation levels define how much a transaction is protected from other transactions running at the same time.

## How I Probably Think About It

"How much should this transaction pretend it is running alone?"

## Interview Explanation (30 Seconds)

Isolation levels are how a database balances correctness and concurrency. Common levels include read uncommitted, read committed, repeatable read, and serializable. Lower isolation lets transactions overlap more, but it can expose problems like dirty reads or changing results. Higher isolation gives a more stable view of the data, but it may need more locks, blocking, conflict checks, or retries. In interviews, I describe it as a trade-off: stronger isolation is easier to reason about, while weaker isolation can be faster if the application can handle the risk.

## When To Use It

- A transaction reads data and then writes based on what it saw.
- Concurrent requests may update or depend on the same rows.
- The business rule depends on a stable view of the database.
- You need to explain or tune locking, blocking, or retry behavior.

## When NOT To Use It

- A single atomic statement already protects the operation.
- The data is append-only or does not have meaningful write conflicts.
- Slightly stale or changing reads are acceptable.
- The real issue is cross-service consistency, not local database isolation.

## Alternatives

- Single atomic update with a `WHERE` condition.
- Optimistic locking with a version column.
- Pessimistic locking with explicit row locks.
- Unique constraints or other database constraints.
- Idempotent retries when conflicts are expected.

## Pros

- Gives clear vocabulary for concurrent transaction behavior.
- Helps prevent incorrect reads and write decisions.
- Lets the system choose a trade-off between safety and throughput.
- Makes blocking, conflicts, and retries easier to explain.

## Cons

- Stronger isolation can reduce concurrency.
- Higher isolation may increase lock contention, deadlocks, or retries.
- Behavior varies between databases, especially around repeatable read and MVCC.
- Choosing too weak an isolation level can create subtle correctness bugs.

## Common Interview Questions

- What are isolation levels?
- What is a dirty read?
- What is a non-repeatable read?
- What is a phantom read?
- What is the difference between read committed and repeatable read?
- Why not always use serializable isolation?
- How do isolation levels relate to ACID?

## Related Concepts

- Transactions
- ACID
- MVCC
- Optimistic Locking
- Pessimistic Locking
- Deadlocks
- Eventual Consistency

## What I'd Probably Say Instead

"I would pick the weakest isolation level that still protects the business rule. If I only need each statement to avoid uncommitted data, read committed may be enough. If the transaction must make a decision from a stable snapshot, I would look at repeatable read or serializable, and I would expect possible blocking or retries. For specific write conflicts, I might use an atomic update, a constraint, or optimistic locking instead of raising isolation everywhere."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Do not let me see unfinished changes | Prevent dirty reads |
| Do not let the same row change under me | Prevent non-repeatable reads |
| Do not let matching rows appear or disappear | Prevent phantom reads |
| Let transactions overlap more | Weaker isolation |
| Make this behave like it ran alone | Serializable isolation |
| I saw a stable database view | Snapshot isolation / repeatable read |
| This may block or need a retry | Contention or serialization conflict |
