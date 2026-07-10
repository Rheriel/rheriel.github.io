---
title: "Threads"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 2
summary: "Threads let one process run multiple flows of execution that share the same memory."
---

## Problem It Solves

A program often needs to keep working while part of it waits. A server may wait for a database call while another request is ready to run. A desktop app may keep the UI responsive while it loads a file. A batch job may split work across CPU cores.

Threads give one process more than one path of execution. The operating system or runtime decides when each thread runs. Threads can overlap waiting work. On multi-core machines, they may run at the same time.

## One-Sentence Definition

A thread is a schedulable flow of execution inside a process that shares the process's memory and resources.

## How I Probably Think About It

"Several paths of code run inside the same program, and they can touch the same memory."

## Interview Explanation (30 Seconds)

A thread is a schedulable unit of execution inside a process. Threads in the same process share memory, open files, and other process resources. Each thread still has its own call stack and current execution state. Threads help when a program needs more than one task in progress, such as handling many requests or doing useful work while another operation waits. The main trade-off is shared memory. Sharing data can be fast, but it can also create race conditions, deadlocks, and memory visibility bugs unless access is synchronized.

## When To Use It

- Use threads when one process needs more than one task in progress.
- Use threads when tasks spend time waiting and the program should keep doing other work.
- Use threads when CPU-bound work can be split across cores.
- Use threads when shared in-memory state is useful and the access rules are clear.
- Use threads behind a thread pool when task creation needs to be bounded.

## When NOT To Use It

- Do not use threads when simple sequential code is clear and fast enough.
- Do not use threads to hide a slow shared resource, such as one overloaded database.
- Do not create unbounded threads for incoming requests or jobs.
- Do not share mutable data between threads without a clear synchronization plan.
- Do not use threads when separate processes would give better isolation.

## Alternatives

- Use async I/O when the work mostly waits on the network, disk, or timers.
- Use processes when isolation matters more than cheap shared memory.
- Use a thread pool to reuse a fixed number of worker threads.
- Use message queues to move work out of the current process.
- Use an event loop when one thread can coordinate many waiting operations.
- Keep the work sequential when concurrency adds more risk than it removes.

## Pros

- Threads can keep a program responsive while some work waits.
- Threads can improve throughput for I/O-bound workloads.
- Threads can use multiple CPU cores for parallel work.
- Threads share an address space, so communication can be faster than crossing process boundaries.
- Threads are a common building block for servers, language runtimes, and background workers.

## Cons

- Shared mutable state can cause race conditions.
- Poor locking can cause deadlocks or slow the program down.
- Bugs can depend on timing and be hard to reproduce.
- Too many threads add scheduling and memory overhead.
- A bad write in one thread can affect the whole process.

## Common Interview Questions

- What is a thread?
- How is a thread different from a process?
- How do threads relate to concurrency and parallelism?
- Why can shared memory between threads be dangerous?
- What is the difference between a thread and a thread pool?
- When would you use async I/O instead of threads?
- What kinds of bugs are common in threaded code?

## Related Concepts

- Concurrency vs Parallelism
- Processes
- Race Conditions
- Mutex
- Thread Pools
- Thread Safety
- Memory Visibility

## What I'd Probably Say Instead

"A thread is one path of execution inside a process. Threads share the same process memory, so communication can be cheap. The downside is that shared data needs synchronization. I would use threads when I need overlapping work or CPU parallelism inside one process, and I would usually bound them with a thread pool instead of creating unlimited threads."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| One running path in the program | Thread |
| The whole running program | Process |
| Each thread's function calls | Call stack |
| Threads can access the same memory | Shared address space |
| Two threads touch the same data badly | Race condition |
| Control access to shared data | Synchronization |
| Only one thread can enter here | Critical section |
| Reuse a fixed set of workers | Thread pool |
