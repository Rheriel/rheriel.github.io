---
title: "Circuit Breaker"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 7
summary: "A circuit breaker stops calls to a failing dependency for a while so failures do not spread through the system."
---

## Problem It Solves

Distributed systems call other services, databases, queues, and APIs. Those dependencies are sometimes slow, overloaded, or down. If callers keep waiting on them, they can tie up threads, fill connection pools, build queues, and become slow too.

A circuit breaker lets the caller stop calls that are likely to fail or time out. Instead of waiting on the same unhealthy dependency again and again, the caller fails fast for a short time. That protects the caller's own resources.

## One-Sentence Definition

A circuit breaker is a caller-side pattern that blocks calls to a dependency after enough failures or slow responses, then later allows a few test calls to check recovery.

## How I Probably Think About It

"If this dependency is clearly failing, stop hammering it for a bit and fail fast."

## Interview Explanation (30 Seconds)

A circuit breaker protects a service from repeatedly calling a dependency that is failing or too slow. In the closed state, calls go through normally. In the open state, the caller blocks calls and fails fast. In the half-open state, the caller lets a few test calls through. If they work, the breaker closes. If they fail, it opens again. The trade-off is that you may reject some requests while the dependency is recovering. In return, you avoid tying up your own service on calls that are likely to fail.

## When To Use It

- A service calls a remote dependency that can be slow or down.
- Repeated failures could exhaust threads, connections, memory, or queue space.
- Fast failure is better than making users wait for timeouts.
- The caller can return a fallback, cached response, or clear error.
- The dependency needs time to recover from overload.
- A small outage in one service should not spread through the whole system.

## When NOT To Use It

- The call is local, cheap, and unlikely to block shared resources.
- The caller must try the operation even during an outage.
- A simple timeout and retry policy is enough.
- The caller cannot return a useful error, fallback, or cached result.
- The failure rate is low and does not threaten the caller.
- The breaker settings cannot be tuned or observed.

## Alternatives

- Use timeouts so calls do not wait forever.
- Use retries for short, temporary failures.
- Use exponential backoff to avoid retrying too aggressively.
- Use rate limiting to protect a service from too much traffic.
- Use bulkheads to isolate resources for different dependencies.
- Use load balancing and health checks to avoid unhealthy instances.

## Pros

- Stops callers from wasting resources on calls that are likely to fail.
- Fails fast instead of waiting for repeated timeouts.
- Helps stop cascading failures between services.
- Gives overloaded dependencies time to recover.
- Makes dependency health visible through breaker state and metrics.
- Works well with timeouts, retries, and fallbacks.

## Cons

- Bad failure or slow-call thresholds can open the breaker too early or too late.
- Fast failures can reject requests while the dependency is coming back.
- Half-open behavior needs care, or many callers may test recovery at once.
- It adds another state machine to configure, monitor, and debug.
- It does not fix the failing dependency.
- Fallbacks can hide real outages if teams do not monitor them.

## Common Interview Questions

- What is a circuit breaker?
- Why use a circuit breaker in distributed systems?
- What are closed, open, and half-open states?
- How is a circuit breaker different from a retry?
- How do circuit breakers stop failures from spreading?
- What thresholds and timeouts matter for a circuit breaker?
- What can go wrong with circuit breakers?
- How do timeouts, retries, and circuit breakers work together?

## Related Concepts

- Retry
- Exponential Backoff
- Bulkhead Pattern
- Rate Limiting
- Heartbeats
- Load Balancing
- Service Discovery

## What I'd Probably Say Instead

"I would put a circuit breaker around this remote call. If the dependency starts failing or timing out, the breaker opens and we fail fast instead of tying up resources. After a short wait, it lets a few test calls through. If they work, normal traffic resumes. If not, it stays open. It does not fix the dependency, but it helps stop the failure from spreading."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Stop calling the broken thing | Open circuit |
| Calls are allowed normally | Closed circuit |
| Try a few calls to see if it recovered | Half-open circuit |
| Fail right away instead of waiting | Fail fast |
| One service failure spreads to others | Cascading failure |
| Return cached or simpler behavior | Fallback |
| How many failures before stopping calls | Failure threshold |
| How many slow calls before stopping calls | Slow-call threshold |
| How long before testing again | Reset timeout |
