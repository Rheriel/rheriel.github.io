---
title: "Rate Limiting"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 15
summary: "Rate limiting controls how many requests a client can make in a period of time to protect a system from overload or abuse."
---

## Problem It Solves

Public APIs and backend services can receive too much traffic from one client, tenant, user, IP address, or integration. Sometimes that traffic is accidental. Sometimes it is abusive. Either way, one caller can overload shared resources and hurt everyone else.

Rate limiting puts a boundary around how much work a caller can ask the system to do. It protects capacity, improves fairness, and gives the system a controlled way to reject excess traffic.

## One-Sentence Definition

Rate limiting is controlling the number of requests or actions allowed for a caller within a defined time window.

## How I Probably Think About It

"Do not let one caller use more than their fair share."

## Interview Explanation (30 Seconds)

Rate limiting protects a system by limiting how many requests a caller can make in a time period. The caller might be a user, API key, tenant, service, or IP address. If the caller exceeds the limit, the system usually rejects the request with a `429 Too Many Requests` response or asks the caller to retry later. Common approaches include fixed windows, sliding windows, leaky buckets, and token buckets. The trade-off is between protection, fairness, accuracy, and operational cost. For distributed systems, the hard part is sharing limit state across many servers without adding too much latency or creating a bottleneck.

## When To Use It

- An API is public or shared by many clients.
- One caller can overload a database, service, queue, or expensive operation.
- You need fair usage across users, tenants, or API keys.
- You need to reduce abuse, scraping, spam, or brute-force attempts.
- Expensive actions need stricter limits than cheap reads.
- Clients can handle retry responses cleanly.

## When NOT To Use It

- The real problem is inefficient code, slow queries, or missing indexes.
- The service cannot define who or what should be limited.
- Rejecting excess requests would break a critical internal workflow.
- A queue, backpressure, or capacity increase is a better fit for the bottleneck.
- The limit would be so loose that it adds complexity without protection.

## Alternatives

- Add authentication and quotas for long-term usage control.
- Use backpressure to slow producers when downstream systems are full.
- Put expensive work behind a queue.
- Cache repeated reads to reduce backend load.
- Scale the service or database when traffic is legitimate and sustained.
- Use circuit breakers to stop calling an unhealthy dependency.

## Pros

- Protects shared systems from overload.
- Makes usage fairer across clients or tenants.
- Reduces the blast radius of abusive or buggy clients.
- Gives clients a clear signal to slow down.
- Helps protect expensive operations such as login attempts, searches, and writes.

## Cons

- Requires choosing the right identity to limit, such as user, API key, tenant, or IP.
- Limits can reject legitimate traffic if they are too strict.
- Distributed rate limiting needs shared state or careful approximation.
- It can add latency on every request.
- Attackers may evade simple limits by rotating IPs or accounts.
- Different endpoints may need different limits.

## Common Interview Questions

- What is rate limiting?
- Why would you add rate limiting to an API?
- What should happen when a client exceeds the limit?
- What is the difference between rate limiting and throttling?
- How would you rate limit in a distributed system?
- What is a token bucket?
- How would you choose the key to rate limit by?
- How is rate limiting different from quotas?

## Related Concepts

- Caching
- Idempotency
- Pagination
- REST
- Message Queues
- Circuit Breaker
- Backpressure

## What I'd Probably Say Instead

"I would add rate limiting when one client can consume too much shared capacity. I would choose a limit key, like user id, tenant id, API key, or IP address, then set different limits for cheap and expensive endpoints. When the client exceeds the limit, I would return `429 Too Many Requests` with retry information. In a distributed system, I would be careful about where the limit state lives so the limiter does not become the bottleneck."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Do not let one caller use everything | Rate limiting |
| Who are we limiting? | Rate limit key |
| They made too many requests | Limit exceeded |
| Tell them to slow down | `429 Too Many Requests` |
| Let some bursts through but cap the average | Token bucket |
| Smooth requests over time | Leaky bucket |
| Count requests in a period | Fixed window |
| Count requests over a moving period | Sliding window |
| Long-term allowed usage | Quota |
