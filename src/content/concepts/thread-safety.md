---
title: "Thread Safety"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 11
summary: "Thread safety means code stays correct when multiple threads use it at the same time."
---

## Problem It Solves

Concurrent code often has objects, functions, or data structures that more than one thread can use. If that code reads and changes shared state without synchronization, the result can depend on timing.

Thread safety means the code still follows its correctness rules when multiple threads call it at the same time. It does not mean the code is fast. It means concurrent use does not corrupt the state or expose a half-finished change.

The protection can come from locks, atomic operations, immutable data, thread-local state, or a design where only one owner changes the state.

## One-Sentence Definition

Thread safety means code stays correct when multiple threads access it at the same time.

## How I Probably Think About It

"Can several threads use this without corrupting the state?"

## Interview Explanation (30 Seconds)

Thread safety means multiple threads can use the same code or object at the same time without breaking it. The usual risk is shared state that changes. If two threads read and write the same state without synchronization, you can get race conditions or memory visibility bugs. I would make code thread-safe by removing shared state, making the data immutable, locking the critical section, using atomics for small values, or routing changes through one owner. The trade-off is waiting, complexity, or stricter usage rules.

## When To Use It

- Use the term when code may be called by multiple threads at the same time.
- Use it when a shared object, cache, collection, counter, or connection manager must stay correct while many threads use it.
- Use it when explaining the contract of a library or data structure.
- Use it when deciding whether callers need to add their own locks or other synchronization.
- Use it when shared changing state cannot be removed.
- Use it when correct behavior matters more than letting every operation run at once.
- Use it when the access rules are clear and can be documented.

## When NOT To Use It

- Do not assume code is thread-safe because it works in single-threaded tests.
- Do not call code thread-safe if callers can still combine operations in a way that breaks its rules.
- Do not use thread safety as a vague label without saying what state is protected.
- Do not make code thread-safe by adding locks everywhere without a clear ownership rule.
- Do not assume a thread-safe collection makes the objects inside it thread-safe.
- Do not assume thread-safe means lock-free, wait-free, or highly parallel.

## Alternatives

- Avoid shared changing state.
- Use immutable data and publish new values instead of changing data in place.
- Use thread-local state so each thread has its own copy.
- Use a mutex when several steps or fields must be protected together.
- Use atomic operations for small shared values.
- Use a queue or actor so one owner handles all changes in order.
- Use process isolation when stronger isolation is more important than cheap sharing.

## Pros

- Thread safety gives callers a clear rule for concurrent use.
- It prevents common races around shared changing state.
- It can make shared caches, counters, and services safe to reuse across threads.
- It reduces the chance that correct behavior depends on thread timing.
- It lets concurrent code share useful state without corrupting it.

## Cons

- Thread-safe code can be slower because threads may wait.
- Locks and atomic operations can make the code harder to reason about.
- The guarantee only applies to the operations, state, and usage patterns it covers.
- A thread-safe object can still be used in a larger workflow that is not thread-safe.
- Testing thread safety is hard because timing bugs may be rare.
- Too much synchronization can reduce concurrency and hide unclear ownership.

## Common Interview Questions

- What does thread-safe mean?
- What makes code not thread-safe?
- Is a thread-safe collection enough to make the whole workflow safe?
- How do you make a class thread-safe?
- How is thread safety related to race conditions?
- How are mutexes and atomic operations used for thread safety?
- What is the difference between thread-safe and immutable?
- Does thread-safe mean lock-free?

## Related Concepts

- Threads
- Race Conditions
- Mutex
- Atomic Operations
- Compare-and-Swap (CAS)
- Producer-Consumer
- Memory Visibility
- Happens-Before

## What I'd Probably Say Instead

"Thread safety means more than one thread can use this code at the same time without corrupting its state or breaking its rules. I would first look for shared state that changes. Then I would remove the sharing, make the data immutable, lock the critical section, use atomics for small values, or route changes through a single owner."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Several threads can use this safely | Thread-safe |
| The state should not get corrupted | Preserve invariants |
| Two threads touch the same changing data | Shared mutable state |
| Put a rule around access | Synchronization |
| Only this part needs protection | Critical section |
| Each thread has its own copy | Thread-local state |
| One owner changes the state | Single-owner design |
