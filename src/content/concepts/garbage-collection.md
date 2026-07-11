---
title: "Garbage Collection"
level: "Explain trade-offs"
volume: "06-performance"
order: 4
summary: "Garbage collection is automatic memory cleanup for data a program can no longer reach."
---

## Problem It Solves

Programs create objects, strings, buffers, and other data while they run. Some of that data is needed for a long time. Some is only needed for one request, loop, or function call.

Garbage collection lets a runtime reclaim heap memory when the program can no longer reach the data. That makes memory management safer and simpler. Cleanup still costs CPU time, and it can affect latency.

## One-Sentence Definition

Garbage collection is automatic cleanup of heap memory for data the program can no longer reach.

## How I Probably Think About It

"The runtime cleans up objects after nothing can use them anymore."

## Interview Explanation (30 Seconds)

Garbage collection is how a managed runtime frees heap memory for objects the program can no longer reach. It prevents many manual memory bugs because developers usually do not call `free` themselves. The trade-off is that the runtime still has work to do. It must find live objects and clean up unreachable ones. Some collectors also pause application threads while part of that work runs. If GC looks like a performance problem, I would measure allocation rate, live heap size, retained memory, and pause time before changing the code.

## When To Use It

- Use a managed runtime where automatic cleanup is normal.
- Build application code where safety matters more than manual memory control.
- Handle many short-lived objects when the runtime can collect them efficiently.
- Let the runtime manage ordinary heap object lifetimes.
- Use profiling data before tuning heap settings or reducing allocation.

## When NOT To Use It

- Do not assume garbage collection removes every memory issue.
- Do not keep references to heap data longer than needed.
- Do not ignore heavy allocation on hot paths.
- Do not tune garbage collection settings before measuring the real issue.
- Do not choose a garbage-collected runtime when strict pause-time control is required and the platform cannot meet it.

## Alternatives

- Manual memory management, where code allocates and frees memory directly.
- Ownership-based memory management, where the language enforces lifetimes at compile time.
- Reference counting, where memory is freed when the number of references reaches zero.
- Object or buffer pooling for expensive objects when ownership and reset rules are clear.
- Streaming data instead of building large temporary objects.

## Pros

- Reduces many manual memory-management bugs.
- Keeps application code simpler.
- Reclaims heap memory that is no longer reachable.
- Works well for many normal server workloads.
- Means developers spend less time managing object ownership by hand.

## Cons

- Uses CPU time.
- Can cause pauses or latency spikes.
- Can run more often when code allocates heavily.
- Does not fix retained memory while live references still point to it.
- Tuning depends on the runtime and the workload.

## Common Interview Questions

- What is garbage collection?
- How does garbage collection decide what memory can be freed?
- What is the difference between garbage collection and memory allocation?
- Why can garbage collection affect latency?
- What is a garbage collection pause?
- What is allocation pressure?
- What is retained memory?
- How would you investigate garbage collection as a performance issue?

## Related Concepts

- Memory Allocation
- Profiling
- Big O
- Thread Safety
- Processes
- Caching

## What I'd Probably Say Instead

"Garbage collection means the runtime frees heap memory for objects the program can no longer reach. It makes code safer because I usually do not free memory by hand. The trade-off is that cleanup still costs CPU and can pause the app. If GC shows up as a problem, I would measure allocation rate, live heap size, retained objects, and pause time before changing code or tuning the runtime."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The runtime cleans old objects | Garbage collection |
| The object can still be used | Reachable or live object |
| Nothing can get to this object anymore | Unreachable object |
| Memory that should be reusable now | Reclaimed memory |
| The app stops while cleanup runs | GC pause |
| The code creates too many objects | Allocation pressure |
| Memory stays because something still points to it | Retained memory |
| The memory area managed by the runtime | Heap |
