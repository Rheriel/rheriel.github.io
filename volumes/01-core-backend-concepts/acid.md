# ACID

**Level:** ⭐⭐⭐ Explain trade-offs

## Problem It Solves

When data changes, the system needs clear rules for what "correct" means. ACID names the guarantees a database transaction tries to give you, so failures, concurrency, and crashes do not leave the data in a strange state.

## One-Sentence Definition

ACID is a set of transaction guarantees: atomicity, consistency, isolation, and durability.

## How I Probably Think About It

"If the database says this transaction succeeded, it should be complete, valid, protected from other work, and not disappear."

## Interview Explanation (30 Seconds)

ACID is the standard way to describe what a reliable database transaction gives you. Atomicity means all the work commits or none of it does. Consistency means the transaction keeps the database rules true. Isolation controls how much transactions can see or interfere with each other while they run. Durability means committed data survives crashes. In interviews, I connect ACID back to correctness: no half-finished writes, no broken rules, less confusing concurrency, and no lost committed data.

## When To Use It

- Important business rules must stay correct.
- Multiple writes need transaction guarantees.
- Concurrent requests may touch the same data.
- One database can protect the whole change.

## When NOT To Use It

- The workflow crosses services that cannot share one transaction.
- Eventual consistency is acceptable.
- Availability or latency matters more than strict immediate consistency.
- The operation is a single write that already has enough atomic behavior.

## Alternatives

- Eventual consistency with reconciliation.
- Idempotent operations and retries.
- Sagas or compensating actions.
- Outbox pattern for reliable event publishing.
- Application-level validation with database constraints.

## Pros

- Gives a shared vocabulary for transaction correctness.
- Protects against partial failures.
- Makes local database behavior easier to understand.
- Helps explain trade-offs around isolation and contention.

## Cons

- Strong guarantees can reduce concurrency.
- Higher isolation levels may increase blocking or retries.
- ACID is usually local to one database, not an entire distributed workflow.
- The word "consistency" has a different meaning than in CAP, which can confuse discussions.

## Common Interview Questions

- What does ACID stand for?
- How does ACID relate to transactions?
- What is the difference between atomicity and consistency?
- Which ACID property is affected by isolation levels?
- Does ACID apply across multiple services?
- How is ACID consistency different from CAP consistency?

## Related Concepts

- Transactions
- Isolation Levels
- MVCC
- Optimistic Locking
- Pessimistic Locking
- Deadlocks
- Eventual Consistency
- CAP Theorem

## What I'd Probably Say Instead

"I would rely on the database transaction for the local consistency boundary. ACID means the transaction should not half-apply, should keep the database rules true, should behave predictably around other transactions, and should survive after commit. If the workflow crosses services, I would not assume ACID covers the whole thing. I would design for retries, idempotency, and compensation."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Do all of it or none of it | Atomicity |
| Do not break the rules | Consistency |
| Other requests should not interfere | Isolation |
| Do not lose it after success | Durability |
| The database keeps this correct locally | Transaction boundary |
| Several services cannot share this easily | Distributed transaction trade-off |
