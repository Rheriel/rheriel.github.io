---
title: "Processes"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 3
summary: "A process is a running program with its own memory and operating system resources."
---

## Problem It Solves

A system often needs clear boundaries between running work. One service should not be able to corrupt another service's memory. One failed worker should not always take down the whole application.

Processes give running programs that boundary. Each process has its own virtual address space and operating system resources, such as file handles and environment variables. Processes can run at the same time on different CPU cores. When processes need to talk, they use inter-process communication: sockets, pipes, files, shared memory, or message queues.

## One-Sentence Definition

A process is a running instance of a program with its own virtual address space and operating system resources.

## How I Probably Think About It

"A process is the whole running program, with a memory boundary around it."

## Interview Explanation (30 Seconds)

A process is the operating system's unit for running a program. Each process has its own virtual address space, file handles, environment, and execution state. Threads live inside a process and share that process's address space. Separate processes do not share memory by default. That makes processes useful for failure isolation, security boundaries, and independent scaling. The trade-off is communication. Processes usually need sockets, pipes, files, shared memory, or another explicit channel to exchange data.

## When To Use It

- Use processes when isolation matters more than cheap shared memory.
- Use processes when a crash in one worker should not corrupt another worker.
- Use processes when separate programs need to run independently.
- Use processes when CPU-bound work can be split across CPU cores without much shared state.
- Use processes when language runtimes, security rules, or deployment boundaries make separate execution useful.

## When NOT To Use It

- Do not use separate processes when simple function calls or threads are enough.
- Do not split work into processes if the tasks constantly need the same small state.
- Do not use processes to avoid designing clear communication rules.
- Do not create unbounded processes for incoming requests or jobs.
- Do not assume process isolation removes the need for timeouts, retries, and resource limits.

## Alternatives

- Use threads when shared memory is useful and synchronization rules are clear.
- Use async I/O when one thread can coordinate many waiting operations.
- Use a thread pool when many small jobs should use bounded workers.
- Use containers when you need packaging and resource limits around processes.
- Use message queues when work should be durable and decoupled across services.
- Keep the work in one process when the isolation cost is not worth it.

## Pros

- Processes provide stronger isolation than threads.
- A crash in one process is less likely to corrupt another process.
- Processes can use multiple CPU cores for parallel work.
- Processes make ownership and deployment boundaries clear.
- Operating systems can apply permissions and resource limits per process.

## Cons

- Process creation is usually more expensive than thread creation.
- Communication between processes is more explicit and often slower than sharing memory inside one process.
- Sharing state requires serialization, IPC, shared memory, or an external store.
- More processes add runtime and operational overhead.
- Debugging behavior across processes can be harder than debugging one process.

## Common Interview Questions

- What is a process?
- How is a process different from a thread?
- Why do processes provide stronger isolation than threads?
- How do processes communicate with each other?
- When would you choose processes over threads?
- Can processes run in parallel?
- What are the costs of using multiple processes?

## Related Concepts

- Concurrency vs Parallelism
- Threads
- Race Conditions
- Thread Pools
- Message Queues
- Service Discovery
- Containers

## What I'd Probably Say Instead

"A process is the whole running program from the operating system's point of view. It has its own address space, so separate processes are more isolated than threads in the same process. That makes processes good for failure isolation, security, and independent scaling. The cost is communication. Processes usually talk through IPC, sockets, files, shared memory, or another explicit channel instead of just reading normal in-process memory."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The whole running program | Process |
| Memory view that belongs to that program | Virtual address space |
| One process cannot touch another by default | Process isolation |
| Two processes need to talk | Inter-process communication |
| A connection between processes | Socket or pipe |
| Several processes run at the same time | Parallel execution |
| The operating system controls what a process can use | Resource limits and permissions |
