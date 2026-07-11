---
title: "Lazy Loading"
level: "Explain trade-offs"
volume: "06-performance"
order: 6
summary: "Lazy loading waits to fetch data or create a value until the application actually needs it."
---

## Problem It Solves

Some data is expensive to load and may not be needed for every request. A user profile page might need the user record first, but not every request needs the user's orders, permissions, image metadata, or audit history.

Lazy loading avoids doing that work up front. It waits to run the database query, network call, file read, or value creation until code asks for it.

## One-Sentence Definition

Lazy loading means waiting to fetch data or create a value until code first needs it.

## How I Probably Think About It

"Do not fetch the extra data unless the code really uses it."

## Interview Explanation (30 Seconds)

Lazy loading means the application waits to fetch data or create a value until code first asks for it. That can make the first step faster and avoid wasted work when optional data is not used. For example, an ORM might load a user first and only query the user's orders when code reads `user.orders`. The trade-off is that the query now starts from a property read, so the I/O is easy to miss. If code loops over many users and lazily loads orders for each one, it can create an N+1 query problem. I would use lazy loading for optional data, but I would watch query counts, request latency, and where hidden I/O happens.

## When To Use It

- Use it when related data is optional.
- Use it when loading all data up front would waste time or memory.
- Use it when a derived value or object is expensive to create and is not always used.
- Use it when the delayed load is still easy to measure and control.
- Use it when the access pattern is small and predictable.

## When NOT To Use It

- Do not use it when it hides database queries in hot request paths.
- Do not use it when it can create many small queries inside a loop.
- Do not use it when callers need predictable latency for the whole operation.
- Do not use it when the value might be accessed after the database session or request context has closed.
- Do not use it when eager loading or batching would make the access pattern clearer.

## Alternatives

- Use eager loading when you know the related data is needed.
- Use batching to load related data for many records in one call.
- Use explicit queries so the I/O is visible at the call site.
- Use caching for data that is reused often.
- Use projections or read models that include only the fields needed by the request.

## Pros

- Avoids unnecessary work.
- Can reduce memory use.
- Can make the first step faster.
- Keeps optional data out of the common path.
- Can make simple cases use fewer resources.

## Cons

- Can hide database or network calls.
- Can cause N+1 queries.
- Can make latency harder to predict.
- Can fail if the delayed fetch needs a database session or request context that has already closed.
- Can make performance problems harder to spot in code review.

## Common Interview Questions

- What is lazy loading?
- How does lazy loading improve performance?
- What are the risks of lazy loading?
- How can lazy loading cause N+1 queries?
- What is the difference between lazy loading and eager loading?
- When would you avoid lazy loading?
- How would you detect hidden lazy-load queries?

## Related Concepts

- Profiling
- Memory Allocation
- Connection Pooling
- Eager Loading
- N+1 Queries
- Batching
- Caching Strategies

## What I'd Probably Say Instead

"I would load the required data first and delay optional data until code actually uses it. That can avoid wasted work, but I would be careful with ORMs because lazy loading can hide queries and turn a loop into an N+1 problem."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Wait to fetch it until it is used | Lazy loading |
| Fetch everything now | Eager loading |
| The query happens when code reads the property | Deferred loading or lazy association |
| The extra query is not obvious in the code | Hidden I/O |
| A loop triggers one query per row | N+1 query problem |
| Load many related rows together | Batching |
| Load only the fields this screen needs | Projection |
