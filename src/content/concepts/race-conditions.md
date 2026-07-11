---
title: "Race Conditions"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 4
summary: "A race condition happens when a program's result depends on unsafe timing between concurrent operations."
---

## Problem It Solves

Concurrent code often has more than one task touching the same state or resource. If two tasks read and write it without coordination, the final result may depend on which steps happen first.

That is a race condition. The code may look correct when you read it top to bottom, but concurrent code does not always run in that order.

## One-Sentence Definition

A race condition is a bug where the result depends on unsafe timing between concurrent operations.

## How I Probably Think About It

"Two things change the same data, and the answer depends on who gets there first."

## Interview Explanation (30 Seconds)

A race condition means the code only works if concurrent steps happen in a certain order, but the program does not enforce that order. A common example is a shared counter. Two threads read the same value, both add one, and both write back the same result. One increment disappears because the read, add, and write were not one atomic step. The problem is not concurrency by itself. The problem is uncoordinated access to shared state or a shared resource. I would fix it by removing the sharing, locking the critical section, using an atomic operation, using a transaction, or sending all updates through one owner.

## When To Use It

- Use the term when a bug depends on the timing between concurrent tasks.
- Use it when more than one thread, process, request, or worker can change the same state or resource.
- Use it when an operation looks simple but is really a read, a change, and a write.
- Use it when tests pass most of the time but fail under load or different scheduling.
- Use it when explaining why synchronization or atomicity is needed.

## When NOT To Use It

- Do not call every concurrent bug a race condition.
- Do not use the term for a normal logic bug that happens the same way every time.
- Do not use it when work is independent and no shared state or shared resource is involved.
- Do not assume a race condition only happens with threads; it can also happen across requests, processes, services, or database updates.
- Do not use "data race" and "race condition" as exact synonyms. A data race is a specific case where memory is accessed without the required synchronization.
- Do not fix it by adding sleeps. That only changes timing.

## Alternatives

- Avoid shared mutable state.
- Make the data immutable and return new values instead of changing shared data.
- Use a mutex or lock around the critical section.
- Use atomic operations for small, simple state changes.
- Use database transactions or conditional updates for shared database state.
- Use queues or actors so one owner processes changes in order.

## Pros

- Naming the problem makes timing bugs easier to explain.
- It points the discussion toward shared state and missing coordination instead of vague "concurrency is hard" answers.
- It helps justify locks, atomic operations, transactions, or single-owner designs.
- It reminds you to test under load and with realistic concurrency.
- It separates correctness problems from performance problems.

## Cons

- Race conditions can be hard to reproduce.
- The bad order may be rare and depend on machine speed, CPU count, or runtime scheduling.
- Fixes can add locks, contention, or design complexity.
- Overusing locks can create deadlocks or slow paths.
- Some races are hidden by caches, retries, or distributed state.

## Common Interview Questions

- What is a race condition?
- How is a race condition different from a deadlock?
- Can a race condition happen on a single CPU core?
- Why is `counter = counter + 1` not always safe in concurrent code?
- How do you prevent race conditions?
- How would you debug a race condition?
- Can race conditions happen in databases or distributed systems?

## Related Concepts

- Concurrency vs Parallelism
- Threads
- Processes
- Mutex
- Atomic Operations
- Thread Safety
- Memory Visibility
- Transactions

## What I'd Probably Say Instead

"A race condition means the answer depends on timing. Two operations change the same state without enough coordination, and a different order gives a different result. I would first look for shared mutable state and read-modify-write steps. Then I would remove the sharing, lock the critical section, use an atomic operation, use a transaction, or make one owner handle the updates in order."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The answer changes depending on who runs first | Race condition |
| Two things touch the same changing data | Shared mutable state |
| Read, change, then write back | Read-modify-write |
| Only one task should run this part at a time | Critical section |
| The scheduler mixes the steps together | Interleaving |
| One update overwrites another update | Lost update |
| Coordinate access to shared data | Synchronization |
