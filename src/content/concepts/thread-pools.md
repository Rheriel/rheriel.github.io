---
title: "Thread Pools"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 9
summary: "A thread pool reuses a fixed set of worker threads to run many tasks without creating a new thread for each one."
---

## Problem It Solves

Creating a new thread for every task can be expensive. Threads use memory. They take time to start. The operating system also has to schedule them. If a busy server creates unlimited threads, it can spend too much time switching between threads.

A thread pool keeps worker threads ready. New work is submitted as tasks. Tasks usually wait in a queue until a worker is free. A worker takes a task, runs it, and then takes another task.

The pool also gives the system a clear limit. Only active workers can run tasks at the same time.

## One-Sentence Definition

A thread pool is a reusable group of worker threads that run queued tasks with a bounded amount of concurrency.

## How I Probably Think About It

"Keep workers ready instead of starting a new thread for every job."

## Interview Explanation (30 Seconds)

A thread pool keeps worker threads alive and gives them tasks from a queue. That saves the cost of creating a new thread for every request or job. It also limits concurrency. Only active workers can run tasks. I would use one for many independent tasks, like request handling, background jobs, or blocking I/O work. The trade-off is pool size and queue behavior. If the pool is too small, work waits. If it is too large, the system wastes memory and CPU on scheduling.

## When To Use It

- Use a thread pool when many tasks can run independently of each other.
- Use it when creating a new thread per task would be too expensive.
- Use it to bound how many tasks run at once.
- Use it for repeated background work, request handling, or blocking I/O tasks.
- Use it when tasks are short enough that reusing workers is helpful.
- Use it when queue limits, rejected tasks, and shutdown behavior are clear.

## When NOT To Use It

- Do not use a thread pool when tasks must run one at a time in one strict order.
- Do not use it to hide slow work without finding the bottleneck.
- Do not use an unbounded queue if overload should be visible.
- Do not put long-running tasks in a small pool that latency-sensitive tasks also use.
- Do not make the pool much larger than the system or dependency can handle.
- Do not assume a thread pool makes shared state safe.

## Alternatives

- Use direct threads for a small number of long-lived workers.
- Use async I/O when tasks mostly wait on network or disk I/O.
- Use a semaphore when you only need to limit entry to a resource.
- Use a producer-consumer queue when the main design is handing work from producers to workers.
- Use an actor or single-owner queue when state changes must happen in one ordered place.
- Use a process pool for CPU-heavy work that benefits from process isolation.

## Pros

- Thread pools avoid creating a new thread for every task.
- They cap how many tasks run at the same time.
- They reuse workers across many tasks.
- They can improve throughput when many short tasks arrive over time.
- They make overload easier to handle with a bounded queue and a clear rejection policy.

## Cons

- A poorly sized pool can make the system slower.
- Too few workers make tasks wait too long.
- Too many workers waste memory and CPU.
- Long tasks can starve short tasks if they share the same pool.
- An unbounded queue can hide overload until latency or memory use becomes a problem.
- Thread pools do not fix race conditions inside the tasks.

## Common Interview Questions

- What is a thread pool?
- Why not create a new thread for every task?
- How does a thread pool limit concurrency?
- How do you choose the size of a thread pool?
- What should happen when the queue fills up?
- Why can long-running tasks cause problems in a shared pool?
- How is a thread pool different from a semaphore?
- How does a thread pool relate to producer-consumer?

## Related Concepts

- Threads
- Processes
- Semaphore
- Producer-Consumer
- Race Conditions
- Thread Safety
- Connection Pooling

## What I'd Probably Say Instead

"A thread pool means I keep worker threads alive and send tasks to them through a queue. It saves the cost of creating a thread for every job. It also caps how much work runs at once. I would use it for repeated independent tasks. I would be careful with pool size, queue limits, rejected tasks, and mixing long tasks with short tasks."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep workers ready | Thread pool |
| Jobs waiting to run | Work queue |
| A worker takes the next job | Worker thread scheduling |
| Only this many jobs run now | Bounded concurrency |
| Too many jobs are waiting | Queue backlog |
| Stop accepting endless work | Bounded queue |
| Short jobs cannot get a worker | Thread starvation |
