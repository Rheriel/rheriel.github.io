---
title: "Concurrency vs Parallelism"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 1
summary: "Concurrency is about managing multiple tasks in progress, while parallelism is about running multiple tasks at the same time."
---

## Problem It Solves

People often use concurrency and parallelism as if they mean the same thing. That makes design discussions fuzzy.

Concurrency is about structuring a program so multiple tasks can make progress over the same period. Parallelism is about actually executing multiple tasks at the same instant, usually on different CPU cores.

## One-Sentence Definition

Concurrency is multiple tasks in progress at once; parallelism is multiple tasks running at the same time.

## How I Probably Think About It

"Concurrency is juggling tasks. Parallelism is having more hands."

## Interview Explanation (30 Seconds)

Concurrency means a system can handle multiple tasks whose lifetimes overlap. It might switch between them on one core, like an event loop handling many requests. Parallelism means the system is executing work at the same time on multiple cores or machines. A program can be concurrent without being parallel, and parallel execution is one way to implement concurrency. The trade-off is that concurrency improves responsiveness and throughput for waiting-heavy work, while parallelism helps CPU-heavy work, but both can introduce coordination problems around shared state.

## When To Use It

- Use concurrency when tasks spend time waiting on I/O, locks, timers, or other services.
- Use concurrency when a server needs to keep many requests in progress.
- Use parallelism when CPU-heavy work can be split into independent chunks.
- Use parallelism when there are enough cores or workers to run work at the same time.
- Use the distinction when explaining why async code may improve throughput without making CPU work faster.

## When NOT To Use It

- Do not add concurrency when simple sequential code is fast enough and easier to reason about.
- Do not expect concurrency alone to speed up CPU-bound work.
- Do not parallelize work that constantly waits on the same shared resource.
- Do not share mutable state casually just because tasks are small.
- Do not use more workers than the bottleneck can support.

## Alternatives

- Keep the code sequential when the workload is small or correctness is more important than throughput.
- Batch work to reduce per-task overhead.
- Use asynchronous I/O for many waiting-heavy operations.
- Use worker pools for bounded concurrent execution.
- Use message queues to decouple work across processes or services.
- Use data partitioning when CPU-bound work can be split safely.

## Pros

- Concurrency can improve responsiveness while one task waits.
- Parallelism can reduce wall-clock time for CPU-bound work.
- Separating the ideas makes architecture discussions clearer.
- Both can improve throughput when matched to the real bottleneck.
- The distinction helps choose between async I/O, threads, processes, and queues.

## Cons

- Concurrent code is harder to test and reason about than sequential code.
- Shared mutable state can create race conditions.
- Parallel execution adds coordination and scheduling overhead.
- More tasks can overload databases, APIs, or queues if concurrency is unbounded.
- Debugging timing-dependent bugs is often difficult.

## Common Interview Questions

- What is the difference between concurrency and parallelism?
- Can a single-core machine run concurrent code?
- Can concurrent code run without parallelism?
- When does parallelism help more than async I/O?
- Why can adding more threads make a system slower?
- How do concurrency and race conditions relate?

## Related Concepts

- Threads
- Async/Await
- Thread Pools
- Race Conditions
- Locks
- Semaphores
- Message Queues

## What I'd Probably Say Instead

"Concurrency means multiple tasks are in progress at the same time period. Parallelism means multiple tasks are literally running at the same instant. Async I/O can give concurrency on one thread because work waits without blocking the whole process. Parallelism helps when the bottleneck is CPU work that can be split across cores."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Multiple things are active | Concurrency |
| Multiple things are running right now | Parallelism |
| One thread switches between tasks | Interleaving |
| Work is waiting on the network | I/O-bound workload |
| Work is burning CPU | CPU-bound workload |
| Too many tasks hit the same bottleneck | Contention |
| Limit how many run at once | Bounded concurrency |
