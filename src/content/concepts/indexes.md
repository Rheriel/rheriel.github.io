---
title: "Indexes"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 8
summary: "An index is a data structure that helps the database find rows faster without scanning the whole table."
---

## Problem It Solves

As a table grows, searching every row becomes slow. A query that feels instant with a thousand rows can become expensive with millions of rows.

An index gives the database a faster path to the rows it needs. Instead of reading the whole table, the database can use the index to narrow the search.

## One-Sentence Definition

An index is a data structure that helps the database find rows faster, usually by keeping selected columns in a form that is quick to search.

## How I Probably Think About It

"Keep a lookup structure so the database does not have to scan every row."

## Interview Explanation (30 Seconds)

An index is like a lookup structure for a table. It lets the database find matching rows without scanning the entire table. Indexes are useful for columns used in filters, joins, sorting, and uniqueness checks. The trade-off is that indexes take storage and make writes slower because the database must update the index when rows are inserted, updated, or deleted. I would add indexes based on real query patterns, not just every column.

## When To Use It

- A query often filters by a column, such as `user_id` or `status`.
- A query joins tables on a foreign key.
- A query sorts or paginates by a stable column.
- A column or combination of columns must be unique.
- Query plans show expensive table scans on large tables.

## When NOT To Use It

- The table is small enough that a scan is cheap.
- The column has very low selectivity, such as a boolean flag, unless combined with other columns.
- The column changes often and the read benefit is small.
- The index does not match any real query pattern.
- You are adding indexes blindly without checking query plans or production-like data.

## Alternatives

- Rewrite the query so it can use an existing index.
- Use a composite index that matches the query pattern.
- Denormalize carefully when joins are too expensive.
- Cache frequently read results.
- Partition or shard very large data sets.
- Precompute read models for heavy reporting queries.

## Pros

- Makes reads much faster when the index matches the query.
- Helps joins find matching rows efficiently.
- Can support efficient sorting and pagination.
- Can enforce uniqueness at the database level.
- Reduces the amount of data the database needs to scan.

## Cons

- Takes extra storage.
- Slows down inserts, updates, and deletes.
- Too many indexes make write-heavy tables harder to maintain.
- A poorly chosen index may not be used by the query planner.
- Composite indexes depend on column order and query shape.

## Common Interview Questions

- What is a database index?
- Why does an index make reads faster?
- What is the trade-off of adding an index?
- What is a composite index?
- Why might the database ignore an index?
- How do indexes help joins?
- How do indexes relate to pagination?

## Related Concepts

- Joins
- Pagination
- Normalization
- Sharding
- Caching

## What I'd Probably Say Instead

"I would add an index if the query is repeatedly searching, joining, sorting, or paginating over a large table. The index gives the database a faster lookup path, but it costs storage and slows writes, so I would base it on actual query patterns and check the query plan."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Do not scan the whole table | Use an index |
| This column narrows the search well | High selectivity |
| Search by two fields together | Composite index |
| The database reads every row | Full table scan |
| Check how the database will run it | Query plan |
| Keep values unique | Unique index |
| The index matches the filter and sort | Index-friendly query |
