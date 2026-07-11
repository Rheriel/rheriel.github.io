---
title: "Memory Allocation"
level: "Explain trade-offs"
volume: "06-performance"
order: 3
summary: "Memory allocation is reserving memory for data while a program runs."
---

## Problem It Solves

Programs need memory to store objects, buffers, strings, arrays, request data, and temporary results. Some data lives for a long time. Some data is only needed for one step.

Memory allocation gives the program space for that data while it runs. Allocation is normal, but it is not free. Heavy allocation can increase memory use, add CPU work, and put pressure on garbage collection in managed runtimes.

## One-Sentence Definition

Memory allocation is reserving memory for data a program needs while it is running.

## How I Probably Think About It

"How much new data does this code create while it runs?"

## Interview Explanation (30 Seconds)

Memory allocation is when a program reserves memory for data while it runs. That data might be an object, array, buffer, string, or temporary value. Allocation is normal, but heavy allocation on a hot path can use a lot of CPU, grow memory use, and make garbage collection run more often in managed runtimes. I would measure first with a memory profiler. Then I would reduce the biggest sources by streaming large data, using smaller structures, or reusing buffers when ownership is clear.

## When To Use It

- Create data that must live beyond the current operation.
- Build objects that represent real domain state.
- Store request data, query results, buffers, or collections.
- Create temporary data when it keeps code simple and the path is not hot.
- Trade memory for speed when caching or precomputing is worth it.

## When NOT To Use It

- Do not allocate large temporary objects on a hot path without measuring the cost.
- Do not load a whole file, response, or result set into memory when streaming would work better.
- Do not create many short-lived objects inside tight loops if a simpler representation would work.
- Do not reuse mutable objects if it makes correctness unclear.
- Do not optimize allocation before knowing it is part of the bottleneck.

## Alternatives

- Reuse buffers or object instances when lifetime, ownership, and reset rules are clear.
- Stream data instead of storing all of it in memory.
- Use pooling for expensive or scarce objects when the pool stays simple.
- Use simpler data structures that store less state.
- Move repeated work into a cache when memory use is acceptable.

## Pros

- Lets programs create data while they run.
- Keeps code flexible because memory can match the current workload.
- Makes many data structures possible.
- Can improve speed when using memory to avoid repeated work.
- Is usually handled safely by the language runtime or standard library.

## Cons

- Uses CPU and memory bandwidth.
- Can increase garbage collection work in managed runtimes.
- Can cause retained memory or leaks if references are kept too long.
- Can hurt latency when a hot path allocates heavily.
- Can make performance worse if pooling or reuse makes the code harder to reason about.

## Common Interview Questions

- What is memory allocation?
- Why can allocation affect performance?
- What is the difference between allocation and garbage collection?
- What is heap allocation?
- Why are many short-lived objects sometimes a problem?
- How would you reduce allocation in a hot path?
- When would you stream data instead of loading it all into memory?
- How would you find allocation problems in a service?

## Related Concepts

- Big O
- Profiling
- Garbage Collection
- Processes
- Caching
- Batching

## What I'd Probably Say Instead

"I would look at how much data the code creates while it runs. Allocation is normal, but heavy allocation on a hot path can add CPU work, grow memory use, and trigger more garbage collection in managed runtimes. I would measure it with a memory profiler. Then I would reduce the biggest sources by streaming, using smaller data structures, or reusing buffers where ownership is clear."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Create new data while running | Allocate memory |
| Memory for data with flexible lifetime | Heap allocation |
| Memory tied to a call frame or local scope | Stack allocation |
| Data that is created and discarded quickly | Short-lived allocation |
| Memory keeps growing | Memory leak or retained memory |
| Too much new data for the runtime to clean up easily | Allocation pressure |
| Check what memory is created | Allocation profiling |
| Read data piece by piece | Streaming |
