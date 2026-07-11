---
title: "Connection Pooling"
level: "Explain trade-offs"
volume: "06-performance"
order: 5
summary: "Connection pooling reuses open connections so requests do not pay setup cost every time."
---

## Problem It Solves

Opening a database or network connection can be slow. The client may need a TCP connection, a TLS handshake, authentication, and session setup before it can send useful work.

If every request opens a new connection, the system wastes time. It can also overload the database or downstream service. Connection pooling keeps a fixed-size set of open connections ready to reuse.

## One-Sentence Definition

Connection pooling is reusing a fixed-size set of open connections instead of opening a new one for every request.

## How I Probably Think About It

"Keep a few database connections open and share them between requests."

## Interview Explanation (30 Seconds)

Connection pooling means the application keeps a fixed-size set of open connections. When a request needs the database, it checks out a connection, uses it, and returns it. That avoids setup work on every request. It also limits how many requests can hit the database at once. The trade-off is pool size. If the pool is too small, requests wait. If it is too large, the database can run out of memory, worker threads, or connection slots. I would size it from measured traffic, how long each request holds a connection, database limits, and pool wait time.

## When To Use It

- Use it for database access in server applications.
- Use it when connection setup is expensive.
- Use it when many requests share the same downstream service.
- Use it to cap the number of open connections to a database or service.
- Use it when you can measure pool wait time, active connections, idle connections, and query latency.

## When NOT To Use It

- Do not use an unbounded pool.
- Do not make the pool larger than the database or service can handle.
- Do not use pooling to hide slow queries or missing indexes.
- Do not return broken or stale connections to the pool.
- Do not let multiple requests use the same connection at the same time unless the driver supports it.

## Alternatives

- Open a short-lived connection per operation when traffic is low and setup cost is not important.
- Use a managed proxy or external connection pooler.
- Use persistent HTTP connections for service-to-service calls.
- Reduce operation time so each connection is held for less time.
- Use batching or caching to reduce the number of calls.

## Pros

- Reduces connection setup cost.
- Improves latency for repeated database or network calls.
- Limits the number of concurrent connections.
- Helps protect databases and downstream services.
- Provides useful metrics like active connections, idle connections, and wait time.

## Cons

- Adds tuning and operational work.
- A pool that is too small can make requests queue up.
- A pool that is too large can overload the database.
- Leaked connections can exhaust the pool.
- Stale connections can cause errors if validation and reconnect logic are weak.

## Common Interview Questions

- What is connection pooling?
- Why is opening a new database connection expensive?
- How does connection pooling improve performance?
- What happens if the pool is too small?
- What happens if the pool is too large?
- What is connection pool exhaustion?
- How would you choose a connection pool size?
- What metrics would you watch for a connection pool?
- How would you debug requests waiting on the pool?

## Related Concepts

- Profiling
- Memory Allocation
- Load Balancing
- Retry
- Circuit Breaker
- Batching
- Caching

## What I'd Probably Say Instead

"I would keep a fixed-size pool of open connections and reuse them across requests. That saves setup time and stops the app from flooding the database. I would watch active connections, idle connections, wait time, request latency, and database limits before changing the pool size."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep a few connections open | Connection pooling |
| Take a connection for one request | Check out or borrow a connection |
| Give the connection back | Return a connection to the pool |
| All connections are busy and callers wait or fail | Pool exhaustion |
| Requests wait for a connection | Pool wait time |
| A request never gives the connection back | Connection leak |
| The database cannot handle more connections | Connection limit |
| Check whether a reused connection still works | Connection validation |
