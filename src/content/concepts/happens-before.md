---
title: "Happens-Before"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 13
summary: "Happens-before says when one action's effects must be visible to another action."
---

## Problem It Solves

Concurrent code needs more than "this line appears first in the file." One thread may write a value, unlock a mutex, or put work on a queue. Another thread may read the value, lock the mutex, or take the work from the queue.

The hard question is simple: is the second thread guaranteed to see what the first thread did? Without that guarantee, the reader may see stale data or part of a change.

Happens-before is the interview term for that ordering guarantee.

## One-Sentence Definition

Happens-before means the concurrency rules guarantee that one action's effects are visible to another action.

## How I Probably Think About It

"Is there a real handoff from this write to that read?"

## Interview Explanation (30 Seconds)

Happens-before explains when one thread can trust data from another thread. It does not mean one line is earlier in the file. It also does not mean one action happened first on the clock. It means the language or runtime gives a real guarantee: the effects of one action are visible to another action. Unlocking a mutex before another thread locks that same mutex is a common example. A safe queue, channel, thread start, or thread join can also create this handoff when the language defines it.

## When To Use It

- Use the term when explaining why one thread can trust another thread's writes.
- Use it when a mutex, atomic variable, queue, channel, thread start, or thread join creates a defined handoff.
- Use it when source-code order is not enough.
- Use it when talking about stale reads, safe publication, or memory visibility.
- Use it when checking whether a shared flag, object, or result has a real synchronization rule.
- Use it when a race condition comes from missing ordering between operations.

## When NOT To Use It

- Do not use it to mean "this line appears earlier in the file" or "this probably happened first in time."
- Do not use it for code that is owned by one thread and never shared.
- Do not assume sleep calls, logging, or timing delays create a happens-before relationship.
- Do not assume every atomic operation gives the exact visibility and ordering needed for a larger workflow.
- Do not use it as a vague way to say "this probably runs first."
- Do not rely on low-level memory ordering unless you can explain the rule clearly.

## Alternatives

- Avoid shared mutable state.
- Pass data through a safe queue, channel, actor, or message handler.
- Use a mutex so writes before unlock are visible to reads after a later lock.
- Use atomic variables with the language's required ordering rules.
- Use immutable data and share it through a synchronized handoff.
- Keep one owner thread responsible for changing the state.

## Pros

- Happens-before gives clear language for visibility and ordering guarantees.
- It explains why synchronization makes another thread's writes safe to trust.
- It separates real guarantees from timing assumptions.
- It helps find missing handoffs in shared-state code.
- It makes safe publication easier to explain in interviews.

## Cons

- Happens-before rules are language-specific.
- The term can sound abstract unless you tie it to a concrete handoff.
- Low-level ordering rules can be hard to review.
- A happens-before relationship between two actions does not automatically make a whole workflow correct.
- Bugs can still be hard to test because missing ordering may fail rarely.

## Common Interview Questions

- What does happens-before mean in concurrent code?
- How is happens-before related to memory visibility?
- Does source-code order or wall-clock order create a happens-before relationship?
- How can a mutex create a happens-before relationship?
- How do queues or channels help with happens-before?
- Why are sleep calls not synchronization?
- How is happens-before different from atomicity?
- How does happens-before help with safe publication?

## Related Concepts

- Threads
- Race Conditions
- Mutex
- Atomic Operations
- Compare-and-Swap (CAS)
- Producer-Consumer
- Thread Safety
- Memory Visibility

## What I'd Probably Say Instead

"Happens-before is the rule that proves one thread's write is visible to another thread's later read. I would look for a real handoff: unlock and lock the same mutex, pass data through a safe queue, join a thread, or use the right atomic operation. If the only reason I think it works is timing or source-code order, I do not have a real concurrency guarantee."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The reader must see the writer's change | Happens-before relationship |
| There is a real handoff between threads | Synchronization |
| This write is visible before that read | Memory visibility guarantee |
| The object is shared only after it is ready | Safe publication |
| The lock makes the change visible | Lock release/acquire ordering |
| Sleeping should not be the rule | Timing is not synchronization |
| The program has no ordering guarantee here | Data race or missing synchronization |
