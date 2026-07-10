---
title: "Exponential Backoff"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 9
summary: "Exponential backoff spaces retry attempts farther apart so callers do not overload a struggling dependency."
---

## Problem It Solves

Retries can help with short failures, but they can also make an outage worse. If many clients retry right away, they can send another wave of traffic to a service that is already slow or down.

Exponential backoff slows those retries down. Each failed attempt waits longer before trying again. This spreads retry traffic over time, so the failing service is not hit all at once.

## One-Sentence Definition

Exponential backoff is a retry strategy where the wait between attempts grows after each failure, usually up to a maximum delay.

## How I Probably Think About It

"Do not retry right away. Wait a bit longer each time."

## Interview Explanation (30 Seconds)

Exponential backoff is a retry policy for failures that may clear soon, like timeouts, `503` responses, or brief failovers. Instead of retrying right away, the caller waits a short time. If that attempt fails too, it waits longer, often doubling the delay until it reaches a maximum. Real systems usually add jitter, which adds randomness to the wait, so clients do not all retry at the same moment. Backoff helps prevent retry storms, but it still needs a retry limit and an overall deadline. Otherwise the caller may wait too long, or background work may keep retrying after the result no longer matters.

## When To Use It

- A request failed for a reason that may be temporary.
- Many clients or workers may retry the same dependency.
- Immediate retries could add load to a struggling service.
- The caller has a clear retry limit, per-attempt timeout, and overall deadline.
- The operation is idempotent or safe to repeat.
- The caller can wait briefly without hurting the user experience.

## When NOT To Use It

- The failure is permanent, such as invalid input or authorization failure.
- The operation is not safe to repeat.
- The user needs a fast answer and there is no time budget for retries.
- The dependency needs traffic to stop for a while, not only slow down.
- There is no maximum delay, retry limit, or monitoring.
- A circuit breaker is already open and calls should fail fast.

## Alternatives

- Retry immediately once for a cheap, safe failure.
- Return the error and let the caller decide what to do.
- Use a circuit breaker to fail fast when the dependency is unhealthy.
- Put work on a queue and retry it later.
- Use rate limiting or backpressure when the system needs less incoming work.
- Use a fixed retry delay when the timing needs to be predictable.

## Pros

- Reduces pressure on a failing dependency.
- Helps avoid retry storms.
- Gives temporary failures, restarts, and failovers time to clear.
- Works well with timeouts, deadlines, and idempotent operations.
- Is simple to explain.
- Jitter makes large groups of callers less synchronized.

## Cons

- Adds latency because the caller waits between attempts.
- Bad settings can make retries too slow or too frequent.
- Does not make unsafe operations safe to repeat.
- Can keep background jobs running longer than expected.
- Still adds load if too many callers keep retrying, even with longer delays.
- Needs metrics for attempts, waits, failures, and final results.

## Common Interview Questions

- What is exponential backoff?
- Why use backoff with retries?
- Why is jitter important?
- What is a retry storm?
- How would you choose retry limits, deadlines, and maximum delay?
- How is backoff different from a circuit breaker?
- When should you not retry with backoff?
- How does backoff relate to idempotency?

## Related Concepts

- Retry
- Circuit Breaker
- Rate Limiting
- Idempotency
- Message Queues
- Bulkhead Pattern

## What I'd Probably Say Instead

"I would use exponential backoff for retryable failures like timeouts or `503`s. Each failed attempt waits longer before trying again. I would add jitter so clients do not all retry at the same time. I would also cap the delay, cap the number of attempts, set an overall deadline, and make writes idempotent before retrying them."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Wait before trying again | Backoff |
| Wait longer each time | Exponential backoff |
| Do not let the wait grow forever | Maximum backoff |
| Stop after a few tries | Retry limit |
| Add randomness to the wait | Jitter |
| Everyone retries together | Retry storm |
| The call can be repeated safely | Idempotent operation |
| Stop waiting after the total budget | Overall deadline |
