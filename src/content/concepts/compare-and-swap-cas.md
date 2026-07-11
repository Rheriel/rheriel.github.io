---
title: "Compare-and-Swap (CAS)"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 8
summary: "Compare-and-swap updates a value only if it still matches the value you expected."
---

## Problem It Solves

Concurrent code sometimes needs to update a small shared value without using a mutex. The value might be a counter, a pointer, a flag, or a reference to an immutable object.

The problem is that another thread may change the value after you read it. If you write your new value anyway, you may overwrite work that happened in between.

Compare-and-swap prevents that kind of overwrite. It reads the current value, compares it with the value you expected, and writes the new value only if they match. That whole check-and-write happens as one atomic step.

## One-Sentence Definition

Compare-and-swap is an atomic operation that replaces a value only if the current value still matches the value you expected.

## How I Probably Think About It

"Change this only if nobody changed it since I last looked."

## Interview Explanation (30 Seconds)

Compare-and-swap, or CAS, is an atomic check-and-write operation. I use it when I want to say, "Change this value, but only if it is still the value I saw earlier." If another thread changed the value first, CAS fails instead of overwriting that work. A common pattern is to read the value, compute the next value, try CAS, and retry if it failed. CAS is useful for small atomic state changes and lock-free code. The trade-off is that retry loops and memory-ordering rules can be harder to explain than a plain mutex.

## When To Use It

- Use CAS for small atomic read-modify-write state transitions.
- Use it when you need to update a value only if it has not changed.
- Use it for counters, flags, references, and simple lock-free structures.
- Use it when the retry loop stays simple.
- Use it when avoiding a mutex matters and the shared state stays small.
- Use it when the language or runtime provides CAS directly.

## When NOT To Use It

- Do not use CAS for large critical sections.
- Do not use it when several fields must change together as one invariant.
- Do not use it when a plain mutex would be clearer and fast enough.
- Do not use it if retry loops can spin heavily under load.
- Do not use it if nobody on the team can explain the memory-ordering rules involved.
- Do not build custom lock-free algorithms unless the benefit is worth the risk.

## Alternatives

- Use a mutex when several steps or fields must be protected together.
- Use atomic increment, atomic exchange, or fetch-and-add when the runtime already provides the exact operation.
- Use optimistic locking or conditional updates for shared database state.
- Avoid shared mutable state.
- Use immutable data and swap a whole reference.
- Use a queue or actor so one owner applies changes in order.

## Pros

- CAS prevents overwriting another thread's update.
- It can avoid blocking on a mutex for small shared values.
- It can support lock-free data structures and algorithms.
- It makes the rule explicit: update only if unchanged.
- It works well when contention is low and the state change is simple.

## Cons

- CAS loops can waste CPU when many threads compete.
- The code can be harder to read than a lock.
- CAS only protects the value used by that one atomic operation.
- It does not make a larger object thread-safe by itself.
- Lock-free code can be hard to test because bugs depend on timing.
- Some CAS designs must handle the ABA problem, where a value changes and then changes back before CAS checks it.

## Common Interview Questions

- What is compare-and-swap?
- Why is CAS called an atomic read-modify-write operation?
- How does CAS avoid overwriting another thread's update?
- How is CAS different from a mutex?
- What is a CAS retry loop?
- When would CAS be worse than a lock?
- What is the ABA problem?
- How does CAS relate to lock-free programming?

## Related Concepts

- Atomic Operations
- Race Conditions
- Mutex
- Optimistic Locking
- Thread Safety
- Memory Visibility
- Happens-Before

## What I'd Probably Say Instead

"CAS means: update this value only if it is still the value I saw earlier. The check and the write happen as one atomic operation. If another thread changed the value first, my update fails, so I can read the new value and try again. I would use CAS for a small state transition. I would use a mutex if the logic touched several fields or needed a larger protected section."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Change it only if nobody changed it first | Compare-and-swap |
| The value I saw earlier | Expected value |
| The value I want to write | New value |
| Try again with the latest value | CAS retry loop |
| Do not overwrite another thread's work | Prevent lost update |
| The code does not wait for a mutex | Lock-free algorithm |
| The value changed and then changed back | ABA problem |
