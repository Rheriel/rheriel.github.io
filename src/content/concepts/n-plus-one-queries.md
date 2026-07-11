---
title: "N+1 Queries"
level: "Explain trade-offs"
volume: "06-performance"
order: 8
summary: "N+1 queries happen when one query loads parent rows and then one more query runs for each parent row."
---

## Problem It Solves

Database access can look cheap in code even when it is expensive at runtime. A request might load 100 users with one query, then read `user.orders` in a loop. If that relationship is lazy-loaded, the app may run 100 more queries.

That is the N+1 query problem: one query for the parent rows, plus one query for each parent row after that. The code looks simple, but the database sees many small round trips.

## One-Sentence Definition

An N+1 query problem happens when one query loads parent rows and then one extra query runs for each parent row.

## How I Probably Think About It

"The loop is calling the database once per row by accident."

## Interview Explanation (30 Seconds)

An N+1 query problem is when one query loads the parent rows, and then the code runs one more query for each parent row. For example, the app loads 100 users and then reads each user's orders in a loop. If orders are lazy-loaded, that request sends 101 SQL statements. The cost is usually database round trips, connection pool pressure, and repeated database work. I would fix it by eager-loading the needed data, batching the child lookup with an `IN` query, or using a projection. Then I would check query count and request latency to make sure it helped.

## When To Use It

- Use the term when one parent query triggers many child queries.
- Use it when explaining why a simple ORM loop gets slow.
- Use it when query count grows with the number of parent rows.
- Use it when round trips are the main bottleneck.
- Use it when comparing lazy loading, eager loading, and batching.

## When NOT To Use It

- Do not call every slow query an N+1 problem.
- Do not use the term when there is only one expensive query.
- Do not use it when the extra queries are fixed in number and do not grow with the parent result size.
- Do not fix it by eager-loading huge data sets without checking memory and row counts.
- Do not assume removing N+1 queries fixes missing indexes or bad query plans.

## Alternatives

- Use eager loading when the request always needs the related data.
- Use batching to load child rows for many parents in one planned query.
- Use projections to fetch only the fields the response needs.
- Use pagination to limit how many parent rows are loaded at once.
- Use caching when the same related data is read often and can tolerate staleness.

## Pros

- Gives a clear name to a common performance bug.
- Helps explain why query count matters, not just individual query speed.
- Points to practical fixes like eager loading and batching.
- Often improves latency by reducing database round trips.
- Can reduce pressure on the connection pool and database.

## Cons

- ORM lazy loading can hide the problem.
- Fixes can fetch too much data if applied too broadly.
- Large eager loads can increase memory use.
- Batch queries can get large if the parent list is not bounded.
- Query count alone is not enough; query plans, indexes, and payload size still matter.

## Common Interview Questions

- What is the N+1 query problem?
- How does lazy loading cause N+1 queries?
- How would you detect N+1 queries?
- How would you fix an N+1 query problem?
- What is the difference between eager loading and batching?
- When can eager loading be the wrong fix?
- What metrics would you check after fixing N+1 queries?

## Related Concepts

- Profiling
- Connection Pooling
- Lazy Loading
- Eager Loading
- Batching
- Caching Strategies
- Joins
- Indexes

## What I'd Probably Say Instead

"I would look for loops that touch lazy-loaded fields. If one query loads the parents and the loop runs one child query per parent, that is an N+1 problem. I would usually fix it with eager loading, batching, or a projection. Then I would check that query count and latency improved."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The loop calls the database once per row | N+1 query problem |
| One query loads the main rows | Parent query |
| One query runs for each parent row | Child query per parent |
| The ORM hides the extra database calls | Lazy loading |
| Load the related data up front | Eager loading |
| Load all child rows with one planned query | Batch loading |
| Count how many SQL statements ran | Query count |
