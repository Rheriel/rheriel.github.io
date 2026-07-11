---
title: "Mutex"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 5
summary: "A mutex lets only one thread or task enter a critical section at a time."
---

## Problem It Solves

Concurrent code often has a small part where two threads must not run at the same time. Two threads might update the same object, write to the same file, or change the same in-memory cache.

A mutex protects that section by giving one thread the lock. A thread takes the mutex before it enters the critical section. Other threads that need the same mutex wait until the lock is released.

## One-Sentence Definition

A mutex is a mutual exclusion lock that allows only one thread or task to enter a protected critical section at a time.

## How I Probably Think About It

"Only one thing is allowed in this part at once."

## Interview Explanation (30 Seconds)

A mutex is a lock around a small section of code that touches shared state. A thread takes the mutex before it reads or changes that state. While it holds the mutex, other threads that need the same mutex wait. That makes access happen one at a time instead of mixed together in an unsafe order. It prevents races like lost updates when every access follows the same rule. The trade-off is waiting. Locks can reduce concurrency, and bad lock ordering can cause deadlocks.

## When To Use It

- Use a mutex when multiple threads can access the same mutable state.
- Use it when a read-modify-write step must behave like one protected operation.
- Use it when a shared resource must be used by only one task at a time.
- Use it when the critical section is small and clear.
- Use it when every access to the protected state can use the same lock.
- Use it when safe access matters more than parallel access for that part of the code.

## When NOT To Use It

- Do not use a mutex when each task has its own independent data.
- Do not hold it while doing long network calls or slow work unless that is really required.
- Do not use it to hide unclear ownership of state.
- Do not use many locks without a clear lock order.
- Do not protect the same data with different locks in different places.
- Do not assume a mutex makes every part of an object thread-safe; it only protects code that uses the same mutex correctly.

## Alternatives

- Avoid shared mutable state.
- Use immutable data and return new values instead of changing shared data.
- Use atomic operations for small, simple updates.
- Use a semaphore when several tasks may enter, but the number must be limited.
- Use a queue or actor so one owner handles all changes in order.
- Use database transactions for shared database state.

## Pros

- A mutex is easy to explain and common in interviews.
- It stops protected code from running in an unsafe order.
- It can prevent lost updates and other race conditions.
- It works for multi-step operations that are bigger than one atomic instruction.
- It makes the rule explicit: hold this mutex before touching this state.

## Cons

- A mutex can make threads wait.
- Holding a lock too long can become a bottleneck.
- Taking locks in inconsistent order can cause deadlocks.
- Skipping the mutex on one access can break the safety guarantee.
- Lock-heavy code can be hard to test because bugs depend on timing.

## Common Interview Questions

- What is a mutex?
- How does a mutex prevent race conditions?
- What is a critical section?
- How is a mutex different from a semaphore?
- Can a mutex cause a deadlock?
- Why should critical sections be small?
- When would you use an atomic operation instead of a mutex?

## Related Concepts

- Threads
- Race Conditions
- Semaphore
- Atomic Operations
- Thread Safety
- Deadlocks
- Memory Visibility

## What I'd Probably Say Instead

"A mutex is a lock around a critical section that touches shared state. If one thread holds it, another thread has to wait before entering the protected code. I would use it for a small section where multiple threads might read and write the same data. It prevents races only if every access uses the same lock. The cost is waiting, and bad lock ordering can create deadlocks."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Only one thing can enter here | Mutual exclusion |
| The protected part of the code | Critical section |
| Take the lock | Acquire a mutex |
| Give the lock back | Release a mutex |
| Other threads wait their turn | Blocking on a lock |
| Two locks wait on each other | Deadlock |
| Every access must use the same lock | Lock discipline |
