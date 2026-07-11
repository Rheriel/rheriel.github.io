---
title: "Eager Loading"
level: "Explain trade-offs"
volume: "06-performance"
order: 7
summary: "Eager loading fetches related data up front when the application already knows it will need that data."
---

## Problem It Solves

Some requests need related data every time. An order details page might need the order, customer, line items, shipping address, and payment status.

If the application loads the order first and then fetches each related value later, it may make many small database calls. Eager loading plans those related loads up front, often with a join or a small number of separate queries. That gives the request fewer trips to the database.

## One-Sentence Definition

Eager loading means fetching related data up front because the application already knows it will need that data.

## How I Probably Think About It

"Load the extra data now because this request is definitely going to use it."

## Interview Explanation (30 Seconds)

Eager loading means fetching related data up front because I know the request will need it. In an ORM, I might load a user and their orders with a join, or with a small number of planned queries. This makes the database work visible and usually reduces round trips. It also helps avoid N+1 queries because the child rows are loaded as a group. The trade-off is that I might load data the request never uses, which wastes database work, network bandwidth, and memory.

## When To Use It

- Use it when related data is required for the request.
- Use it when lazy loading would create many small queries.
- Use it when you want database calls to be visible and predictable.
- Use it when a page or API response needs a known set of related records.
- Use it when profiling shows round trips are the bottleneck.

## When NOT To Use It

- Do not use it when the related data is rarely used.
- Do not use it when it loads large collections that the request does not need.
- Do not use it when joins would repeat the same parent rows too many times.
- Do not use it when it makes the query harder for the database to optimize.
- Do not use it as a default fix without measuring query count, latency, and memory use.

## Alternatives

- Use lazy loading when related data is optional.
- Use batching to load related data for many records in a controlled way.
- Use explicit queries when the data shape is specific to one endpoint.
- Use projections to fetch only the fields the response needs.
- Use caching when the same related data is reused often.

## Pros

- Reduces database or network round trips.
- Makes data loading easier to see in code.
- Helps avoid N+1 query problems.
- Gives more predictable request latency.
- Can make response building simpler because the needed data is already loaded.

## Cons

- Can fetch data that the request never uses.
- Can increase memory use.
- Can make queries larger and more complex.
- Joins can repeat parent rows when they include large child collections.
- Can move work from many small queries into one expensive query.

## Common Interview Questions

- What is eager loading?
- How does eager loading improve performance?
- What is the difference between eager loading and lazy loading?
- How can eager loading prevent N+1 queries?
- What are the risks of eager loading?
- What is over-fetching?
- When would you use batching instead of eager loading?
- How would you verify that eager loading helped?

## Related Concepts

- Profiling
- Connection Pooling
- Lazy Loading
- N+1 Queries
- Batching
- Caching Strategies
- Joins

## What I'd Probably Say Instead

"If I know the request needs the related data, I would load it up front instead of letting each property access trigger another query. That keeps the database work predictable and can avoid N+1 queries. I would still watch for over-fetching, large joins, and extra memory use."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Fetch the related data now | Eager loading |
| Wait until code uses it | Lazy loading |
| The related loads are planned up front | Eager loading plan |
| Too much unused data is loaded | Over-fetching |
| One parent query causes many child queries | N+1 query problem |
| Load related rows in one planned step | Batch loading |
| Fetch only the fields the response needs | Projection |
