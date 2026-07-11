---
title: "Semaphore"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 6
summary: "A semaphore limits how many threads or tasks may use a shared resource at the same time."
---

## Problem It Solves

Sometimes one task at a time is too strict. Unlimited access is also unsafe. A service may have only a fixed number of database connections. A worker may run only a few downloads at once. A queue consumer may need to keep active jobs under a limit.

A counting semaphore solves this with permits. A task takes a permit before it starts the limited work. If no permits are left, it waits. When the task finishes, it returns the permit.

## One-Sentence Definition

A semaphore is a synchronization primitive that uses permits to control how many threads or tasks can use something at the same time.

## How I Probably Think About It

"Only this many things are allowed in at once."

## Interview Explanation (30 Seconds)

A semaphore is a counter for access. A counting semaphore lets up to a fixed number of threads or tasks enter. Each task takes a permit before it uses the limited resource. It releases the permit when it is done. If all permits are taken, new tasks wait. I would use it for bounded concurrency, like limiting database connections, downloads, or active jobs. A binary semaphore has one permit, but if I am protecting shared state, I would usually call that a mutex.

## When To Use It

- Use a semaphore when a resource can handle several users, but not unlimited users.
- Use it to cap concurrent requests, jobs, downloads, or expensive operations.
- Use it when the limit is about capacity rather than ownership of one piece of state.
- Use it when tasks should wait instead of failing immediately once the limit is reached.
- Use it when the protected work is clear and every path releases the permit.
- Use it when a simple concurrency cap is enough.

## When NOT To Use It

- Do not use a semaphore when the main rule is ownership of shared mutable state; use a mutex.
- Do not use it to hide an overloaded dependency without understanding the bottleneck.
- Always release the permit on errors, cancellation, or timeouts.
- Do not use it when tasks should be rejected or rate-limited instead of waiting.
- Do not set the permit count without measuring or knowing the resource capacity.
- Do not use it as a general ordering tool; it limits entry, but it does not define the work order.

## Alternatives

- Use a mutex when only one task may enter a critical section that protects shared state.
- Use a thread pool when the main goal is to reuse and bound worker threads.
- Use a bounded queue when producers should wait or slow down.
- Use rate limiting when the goal is to control requests over time.
- Use a connection pool when the limited resource is database or network connections.
- Use an actor or single-owner queue when changes must happen in one ordered place.

## Pros

- A semaphore gives a simple way to limit concurrency.
- It allows more throughput than a mutex when several tasks can safely run at once.
- It can protect a limited resource from overload.
- It makes the capacity rule explicit in the code.
- It works with threads, async tasks, workers, and request handlers.

## Cons

- Waiting tasks can pile up if the limit is too low or the work is too slow.
- A missing release can leak a permit and eventually block other work.
- A high limit can still overload the resource.
- Semaphores limit entry, but they do not make shared mutable state safe by themselves.
- Debugging can be hard when permit leaks only appear under load.

## Common Interview Questions

- What is a semaphore?
- How is a semaphore different from a mutex?
- What is a permit?
- What is a binary semaphore?
- When would you use a semaphore to limit concurrency?
- What happens if a task forgets to release a semaphore?
- How is a semaphore different from rate limiting?
- How does a semaphore relate to thread pools or connection pools?

## Related Concepts

- Mutex
- Race Conditions
- Thread Pools
- Producer-Consumer
- Thread Safety
- Rate Limiting
- Connection Pooling

## What I'd Probably Say Instead

"A semaphore is a counter for access. If it has five permits, up to five tasks can enter at once. Each task takes a permit before it starts and gives it back when it finishes. I would use it when a resource supports some concurrency but still needs a cap, like downloads or database connections. If I am protecting shared state one task at a time, I would usually call that a mutex instead."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Only this many can enter | Bounded concurrency |
| A slot is available | Permit |
| Take a slot | Acquire a semaphore |
| Give the slot back | Release a semaphore |
| No slots are left | Blocking on a semaphore |
| The limit is one | Binary semaphore |
| A missing release uses up a slot forever | Permit leak |
