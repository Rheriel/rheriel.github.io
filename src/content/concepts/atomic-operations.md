---
title: "Atomic Operations"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 7
summary: "Atomic operations make one small shared-state action behave as an indivisible step."
---

## Problem It Solves

Concurrent code often needs to share one small value. It might be a counter, a flag, a reference, or a simple state.

The code may look like one line, but it may not run as one step. A thread can read a value, change it, and write it back. Another thread can run between those steps and cause a lost update.

Atomic operations make that small action behave like one safe step.

## One-Sentence Definition

An atomic operation behaves as one indivisible step, so other threads cannot see it halfway done.

## How I Probably Think About It

"This tiny action either fully happens or has not happened yet."

## Interview Explanation (30 Seconds)

An atomic operation behaves like one step, even when multiple threads use the same value. A common example is an atomic counter increment. Two threads cannot both read the same old value and write back the same new value. Atomics are useful for simple shared state like counters, flags, and references. They can be lighter than a mutex because they protect one operation, not a whole block of code. The trade-off is scope. An atomic operation protects that one action. It does not make a larger workflow safe by itself.

## When To Use It

- Use atomic operations for small shared values like counters, flags, and references.
- Use them when one read, write, or read-modify-write operation must be safe across threads.
- Use them when a mutex would protect only one tiny state change.
- Use them when the language or runtime provides the exact atomic operation you need.
- Use them when the state change is simple enough to explain in one sentence.
- Use them when reducing lock contention matters and the logic stays simple.

## When NOT To Use It

- Do not use atomic operations for large critical sections.
- Do not use them when several fields must change together as one invariant.
- Do not assume one atomic field makes an entire object thread-safe.
- Do not use them as a shortcut around clear ownership or synchronization design.
- Do not use them when the team cannot explain the memory-ordering rules involved.
- Do not build complex lock-free logic unless the benefit is worth the risk.

## Alternatives

- Use a mutex when several steps or fields must be protected together.
- Use a semaphore when the goal is to limit how many tasks run at once.
- Avoid shared mutable state.
- Use immutable data and publish a new value instead of changing shared data in place.
- Use a queue or actor so one owner handles all changes in order.
- Use database transactions or conditional updates for shared database state.

## Pros

- Atomic read-modify-write operations can prevent lost updates for simple shared values.
- They can avoid lock waiting for one small operation.
- They are useful for counters, flags, reference swaps, and simple state transitions.
- They make a small synchronization rule explicit.
- They work well in high-traffic code when the shared state is small and simple.

## Cons

- Atomic operations only protect the specific action you perform atomically.
- They do not make surrounding code or related fields safe.
- Complex atomic logic can be harder to read than a plain lock.
- Some atomic operations still require careful memory-ordering and visibility rules.
- Lock-free code can be hard to test because bugs depend on timing.

## Common Interview Questions

- What does atomic mean in concurrent code?
- Why is `counter = counter + 1` not always atomic?
- How is an atomic operation different from a mutex?
- When would you use an atomic counter?
- Do atomic operations make an object thread-safe?
- What is a read-modify-write operation?
- How do atomic operations relate to compare-and-swap?
- Why can memory visibility still matter with atomics?

## Related Concepts

- Race Conditions
- Mutex
- Semaphore
- Compare-and-Swap (CAS)
- Thread Safety
- Memory Visibility
- Happens-Before

## What I'd Probably Say Instead

"An atomic operation is a tiny shared-state action that behaves as one indivisible step. If two threads increment an atomic counter, they cannot both read the same old value and lose one increment. I would use atomics for simple counters, flags, or reference swaps. If I need to protect several fields or several steps, I would use a mutex or change the design."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| This action happens all at once | Atomic operation |
| No one can see it halfway done | Indivisible operation |
| Read, change, and write back safely | Atomic read-modify-write |
| Two increments should not collapse into one | Prevent lost updates |
| A tiny safe shared value | Atomic variable |
| Swap the value only if it still matches | Compare-and-swap |
| The update is safe, but not the whole object | Limited synchronization scope |
