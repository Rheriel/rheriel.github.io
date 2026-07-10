---
title: "Retry"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 8
summary: "A retry tries a failed operation again when the failure may be temporary."
---

## Problem It Solves

Distributed systems fail in small, temporary ways. A connection may drop. A service may restart. A database may reject a request during a short failover. A caller may time out even though the dependency works again a moment later.

Without retries, these short failures become errors the user sees. With retries, the caller can recover without asking a person to press the button again.

## One-Sentence Definition

A retry is a second or later attempt to run an operation after a failure that might be temporary.

## How I Probably Think About It

"That failed, but it might work if we try again once or twice."

## Interview Explanation (30 Seconds)

A retry is useful when a request fails for a reason that may clear quickly, like a timeout, dropped connection, `503 Service Unavailable`, or service restart. The caller tries the same operation again instead of failing right away. Retries need a small attempt limit, a timeout for each attempt, and usually backoff so they do not hit an unhealthy dependency too hard. They are safest when the operation is idempotent. The first attempt may have worked even if the caller did not get the response. Retries can hide short failures, but they can also add latency, repeat side effects, and increase load during an outage.

## When To Use It

- The failure is likely to be temporary and retryable.
- The operation is idempotent or safe to repeat.
- The caller has a clear timeout and retry limit.
- A short delay is better than showing an error immediately.
- The dependency may be restarting, failing over, returning `503`, or briefly unavailable.
- Retry counts and failures are measured.

## When NOT To Use It

- The operation is not safe to repeat.
- The failure is permanent, such as invalid input, not found, or authorization failure.
- Retrying would add pressure to an already overloaded dependency.
- The caller has already spent most of its allowed response time.
- The user needs a fast, clear failure instead of a slow response.
- There is no timeout, retry limit, or monitoring.

## Alternatives

- Return the error and let the caller, worker, or user decide what to do.
- Use exponential backoff, often with jitter, to space out retry attempts.
- Use a circuit breaker to fail fast when a dependency is unhealthy.
- Use idempotency keys to make retryable writes safe.
- Put work on a queue and retry it later.
- Use rate limiting or backpressure when the real problem is overload.

## Pros

- Hides short, temporary failures from users.
- Makes network calls and service-to-service calls more reliable.
- Works well with idempotent APIs and message consumers.
- Can recover from brief restarts, leader changes, and failovers.
- Is simple to understand for many remote calls.

## Cons

- Can repeat side effects if the operation is not idempotent.
- Adds latency because the caller waits for more attempts.
- Can increase traffic during an outage.
- Can cause retry storms when many callers retry together, especially without jitter.
- Needs careful limits, timeouts, and backoff.
- Can hide dependency problems if retry metrics are missing.

## Common Interview Questions

- What is a retry?
- When should a system retry a failed request?
- Why do retries need timeouts and limits?
- How are retries related to idempotency?
- What is a retry storm?
- How is a retry different from a circuit breaker?
- Why use exponential backoff with retries?
- Which errors are retryable, and which errors should not be retried?

## Related Concepts

- Idempotency
- Circuit Breaker
- Exponential Backoff
- Rate Limiting
- Message Queues
- Leader Election
- Heartbeats

## What I'd Probably Say Instead

"I would retry only failures that are likely to be temporary, like timeouts, connection errors, or a `503`. I would keep the retry count small, use timeouts, and add backoff so we do not hit the dependency too hard. For writes, I would make the operation idempotent first, because the first attempt may have succeeded even if we did not get the response."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Try it again | Retry |
| Try only a few times | Retry limit |
| Stop waiting after a while | Timeout |
| Wait longer between attempts | Backoff |
| Wait longer each time | Exponential backoff |
| Add randomness to retry timing | Jitter |
| Many clients retry at once | Retry storm |
| It is safe to run again | Idempotent operation |
| The first call may have worked | Ambiguous failure |
