---
title: "Producer-Consumer"
level: "Explain trade-offs"
volume: "04-concurrency"
order: 10
summary: "Producer-consumer separates the code that creates work from the code that processes it."
---

## Problem It Solves

Concurrent systems often have one part that creates work and another part that handles it. A web request may queue an email job. A file scanner may queue files for parsing. A message reader may queue events for workers.

If producers call consumers directly, slow processing can block the part that creates work. If producers create work faster than consumers can handle it, the waiting work can grow without a clear limit.

The producer-consumer pattern puts a queue between them. Producers add work to the queue. Consumers take work from the queue and process it. A bounded queue makes overload visible. When the queue is full, producers must wait or fail.

## One-Sentence Definition

Producer-consumer is a concurrency pattern where producers put work on a queue and consumers take work from that queue to process it.

## How I Probably Think About It

"One side drops off jobs. Another side picks them up."

## Interview Explanation (30 Seconds)

Producer-consumer means one part creates work and another part processes it. Producers put tasks or messages on a queue. Consumers pull from the queue and run them, often with worker threads. This helps with bursts because producers do not need to wait for each task to finish. The key trade-off is what happens when the queue fills up. Producers may wait, new work may fail, or latency may keep growing.

## When To Use It

- Use producer-consumer when work can be handed off and processed later.
- Use it when producers and consumers run at different speeds.
- Use it to smooth short bursts of work.
- Use it when several workers can process independent tasks from the same queue.
- Use it when the queue makes ownership of work clear.
- Use it when a bounded queue can show how much waiting work the system allows.
- Use it when queue size, retry behavior, and shutdown behavior are clear.

## When NOT To Use It

- Do not use producer-consumer when the caller needs the result immediately.
- Do not use it when tasks must complete in one strict order and multiple consumers would break that order.
- Do not use an unbounded queue if overload should be visible.
- Do not use it to hide slow processing without handling backpressure.
- Do not use it when tasks are not safe to retry or resume after failure.
- Do not assume a queue makes the task code thread-safe.

## Alternatives

- Use a direct call when the work must finish before the caller continues.
- Use a thread pool when the main need is reusable workers.
- Use a semaphore when the main need is a concurrency limit.
- Use a message queue when the handoff must cross process or service boundaries.
- Use an actor or single-owner queue when one owner must update state in order.
- Use batching when small units of work are cheaper to process together.

## Pros

- Producer-consumer separates work creation from work processing.
- It can smooth short bursts of incoming work.
- It lets several consumers share a queue of independent tasks.
- It gives a clear place to apply backpressure with a bounded queue.
- It makes the handoff point explicit.
- It can improve throughput when producers and consumers can run concurrently.

## Cons

- A growing queue can hide overload until latency or memory use becomes a problem.
- Consumers can fall behind if processing is slower than production.
- Retries can create duplicate work unless tasks are idempotent.
- A queue may hand out jobs in order, but multiple consumers can still finish jobs out of order.
- Shutdown and cancellation need care so waiting work is not lost.
- The queue does not make shared state inside tasks safe.

## Common Interview Questions

- What is the producer-consumer pattern?
- Why put a queue between the producer and the consumer?
- What happens when producers are faster than consumers?
- How does a bounded queue apply backpressure?
- How is producer-consumer different from a thread pool?
- How do multiple consumers affect completion order?
- Why do retries and idempotency matter?
- How would you shut down producer-consumer workers safely?

## Related Concepts

- Thread Pools
- Semaphore
- Message Queues
- Idempotency
- Race Conditions
- Thread Safety
- Backpressure

## What I'd Probably Say Instead

"Producer-consumer means one part of the system creates jobs and puts them on a queue. Another part pulls jobs from the queue and runs them. It is useful when work can happen later or when producers and consumers run at different speeds. I would be careful about bounded queues, backpressure, retries, completion order, and safe shutdown."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Drop off a job | Produce work |
| Pick up a job | Consume work |
| Jobs waiting to run | Work queue |
| The queue is getting too long | Backlog |
| Slow the sender down | Backpressure |
| Only keep this many waiting | Bounded queue |
| More workers take jobs | Multiple consumers |
| Jobs do not finish in queue order | Out-of-order completion |
