---
title: "Memory Visibility"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 12
summary: "Memory visibility is about whether one thread can reliably see changes made by another thread."
---

## Problem It Solves

Concurrent code often shares state between threads. One thread may update a flag, write a result, or finish building an object. Another thread may read that state.

The risk is that "later" in the source code does not always mean "visible" to another thread. CPUs, compilers, and runtimes can cache values. They can also reorder reads and writes when the language allows it. Without synchronization, another thread may see an old value, miss a flag update, or see an object before it is ready to share.

Memory visibility is the guarantee that says when a write by one thread can be observed by another thread.

## One-Sentence Definition

Memory visibility means one thread's writes can be seen by another thread when the synchronization rules allow it.

## How I Probably Think About It

"If one thread updates this value, will the other thread definitely see it?"

## Interview Explanation (30 Seconds)

Memory visibility is about whether one thread can reliably see what another thread wrote. A write can happen in the writer thread, but the reader may still see an old value. The program needs a visibility guarantee. That usually comes from synchronization: a mutex, an atomic variable, a language-specific `volatile` or equivalent field, or a safe queue handoff. I would bring this up when one thread reads a shared flag, result, or object written by another thread. Without the guarantee, the code may pass tests and still fail under real concurrency.

## When To Use It

- Use the term when one thread writes state and another thread reads it.
- Use it when a flag, result, reference, or object is shared between threads.
- Use it when explaining why a plain shared boolean may not stop a worker reliably.
- Use it when a thread may see stale data even though another thread already wrote a new value.
- Use it when one thread finishes an object and another thread starts using it.
- Use it when discussing mutexes, atomics, volatile fields, or happens-before rules.
- Use it when the bug is about seeing the right value, not only updating it atomically.

## When NOT To Use It

- Do not use it for state that is owned by one thread only.
- Do not use it when data is passed through a safe queue, channel, or message system and the handoff guarantee is already the point you are explaining.
- Do not treat visibility as the same thing as atomicity. Seeing a value and updating it safely are different guarantees.
- Do not assume a write is visible because it appears earlier in the source code.
- Do not rely on sleep calls to make values visible.
- Do not use low-level memory-ordering options unless the team can explain the exact rule.

## Alternatives

- Avoid shared mutable state.
- Pass data through a queue, channel, actor, or message handler.
- Use immutable data and share it through a synchronized handoff.
- Use a mutex so readers and writers follow the same lock rule.
- Use atomic variables for small shared values.
- Use language-specific visibility tools such as `volatile` only when the language's exact guarantee fits the problem.
- Keep ownership on one thread and send commands to that owner.

## Pros

- Memory visibility explains why a thread can keep reading an old value.
- It makes shared-state handoff rules explicit.
- It separates "can I see it?" from "can I update it safely?"
- It points toward clear synchronization instead of timing tricks.
- It helps explain why safe publication matters when sharing objects between threads.

## Cons

- Visibility rules are language-specific and easy to oversimplify.
- Low-level memory-ordering choices can be hard to review.
- Fixing visibility may add synchronization cost or reduce concurrency.
- A visibility guarantee does not make a whole workflow thread-safe by itself.
- Bugs can be rare because they depend on the runtime, CPU, compiler, and timing.

## Common Interview Questions

- What is memory visibility?
- How can one thread miss a value written by another thread?
- How is memory visibility different from atomicity?
- Why is a plain shared flag unsafe in some languages?
- How do mutexes help with visibility?
- How do atomic variables relate to visibility?
- What does safe publication mean?
- How is memory visibility related to happens-before?

## Related Concepts

- Threads
- Race Conditions
- Mutex
- Atomic Operations
- Compare-and-Swap (CAS)
- Thread Safety
- Producer-Consumer
- Happens-Before

## What I'd Probably Say Instead

"Memory visibility means that if one thread writes a value, another thread has a real guarantee that it can see that write. Without synchronization, the reader may keep seeing an old value or see an object before it is ready to share. I would use a lock, atomic variable, language-supported volatile field, or queue handoff instead of relying on timing."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The other thread should see the new value | Memory visibility |
| It keeps reading the old value | Stale read |
| Share this object only after it is ready | Safe publication |
| The write becomes visible before the read | Happens-before relationship |
| Put a real handoff between threads | Synchronization |
| This flag is shared between threads | Shared flag |
| The CPU or runtime may keep its own copy | Cached value |
