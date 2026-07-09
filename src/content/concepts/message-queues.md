---
title: "Message Queues"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 20
summary: "Message queues let systems hand off work asynchronously through durable messages."
---

## Problem It Solves

Some work should not block the user request. Sending emails, processing payments, generating reports, updating search indexes, and calling slow external services can all make an API slower and less reliable if they happen inline.

Message queues let one part of the system publish work and another part process it later. This decouples services, smooths traffic spikes, and gives failed work a place to be retried.

## One-Sentence Definition

A message queue is a system where producers send messages to a queue and consumers process those messages asynchronously.

## How I Probably Think About It

"Put the work on a reliable todo list so another worker can handle it later."

## Interview Explanation (30 Seconds)

A message queue is used to move work between systems without requiring both sides to finish at the same time. A producer publishes a message, such as `OrderCreated`, and a consumer reads it later to do follow-up work. This is useful for background jobs, retries, traffic spikes, and decoupling services. Most queues provide durability, acknowledgments, retries, and dead-letter queues for messages that keep failing. The trade-off is that the system becomes asynchronous, so you need to handle duplicate messages, out-of-order processing, delays, and eventual consistency.

## When To Use It

- Work can happen after the request returns.
- A slow or unreliable dependency should not block the main path.
- Traffic arrives in bursts and workers need to process it steadily.
- Failed work should be retried.
- Multiple systems need to react to an event.
- You want to decouple the producer from the consumer.

## When NOT To Use It

- The caller needs an immediate answer from the work.
- The operation must be strongly consistent before returning.
- The extra operational complexity is not worth it.
- The workflow is simple enough to handle inline.
- Message delay, duplicates, or reordering would be hard to tolerate.
- The team does not have monitoring for stuck or failing messages.

## Alternatives

- Do the work synchronously inside the request.
- Use a database job table for simple background work.
- Use scheduled polling when real-time delivery is not needed.
- Use gRPC or REST when the caller needs an immediate response.
- Use event streaming when many consumers need an ordered event log.
- Use webhooks when another system should be notified over HTTP.

## Pros

- Decouples producers from consumers.
- Improves request latency by moving slow work out of the main path.
- Helps absorb traffic spikes.
- Supports retries for failed work.
- Lets workers scale independently.
- Makes asynchronous workflows easier to organize.

## Cons

- Adds operational complexity.
- Makes behavior eventually consistent.
- Consumers must handle duplicate messages.
- Message ordering may not be guaranteed.
- Failures can move from visible request errors to hidden backlog problems.
- Debugging is harder because work crosses process and time boundaries.

## Common Interview Questions

- What is a message queue?
- Why would you use a queue instead of a direct API call?
- What is the difference between a producer and a consumer?
- How do queues help with retries?
- What is a dead-letter queue?
- Why do consumers need to be idempotent?
- What can go wrong with message ordering?
- How would you monitor a queue-based system?

## Related Concepts

- Idempotency
- REST
- gRPC
- Eventual Consistency
- Replication
- Rate Limiting
- Caching

## What I'd Probably Say Instead

"I would use a message queue when the work does not need to finish during the user request. The API can publish a durable message and return quickly, while workers process the message in the background. I would make the consumer idempotent, add retries and a dead-letter queue, and monitor backlog size so failures do not hide."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Put work on a todo list | Enqueue a message |
| The service that adds work | Producer |
| The worker that handles work | Consumer |
| Mark the work as done | Acknowledgment / ack |
| Try failed work again | Retry |
| Failed too many times | Dead-letter queue |
| Same message might arrive twice | At-least-once delivery |
| Do not process duplicates | Idempotent consumer |
| Messages waiting to be processed | Queue backlog |
| Work happens later | Asynchronous processing |
