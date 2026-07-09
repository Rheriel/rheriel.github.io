---
title: "Joins"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 9
summary: "A join combines related rows from two or more tables so a query can return data that is stored separately."
---

## Problem It Solves

Relational databases store related data in separate tables. A user might be in one table, their orders in another table, and the order items in a third table.

A join lets a query bring that related data together without storing the same fields in every table.

## One-Sentence Definition

A join combines rows from two or more tables by matching related columns, usually a primary key in one table to a foreign key in another.

## How I Probably Think About It

"Look up the related rows and return them together."

## Interview Explanation (30 Seconds)

A join is how a relational database combines related rows from separate tables. For example, an `orders` table can join to a `users` table through `orders.user_id = users.id`. The common types are inner joins, which return only matching rows, and outer joins, which keep rows from one side even when there is no match. Joins are useful because they keep data normalized, but they can become expensive on large tables if the join columns are not indexed or the query returns too much data.

## When To Use It

- Data is naturally related but stored in separate tables.
- You need fields from more than one table in one result.
- A foreign key connects one table to another.
- Normalized data should be read without duplicating it.
- The join columns are indexed or small enough to join cheaply.

## When NOT To Use It

- The query joins many large tables and is too slow for the request path.
- The result duplicates too many rows because the relationship is one-to-many.
- The data belongs in a precomputed read model or report table.
- A simple lookup or cache would avoid repeated expensive joins.
- You are joining across services or databases that do not share a relational model.

## Alternatives

- Fetch related data in separate queries when the data set is small and controlled.
- Denormalize selected fields for hot read paths.
- Use a materialized view or read model for expensive reporting queries.
- Cache common joined results.
- Use a document model when data is usually read and written as one aggregate.

## Pros

- Keeps related data normalized and avoids unnecessary duplication.
- Lets one query return data from multiple tables.
- Works well with foreign keys and indexes.
- Makes relationships explicit in the query.
- Reduces application-side stitching for common relational reads.

## Cons

- Can be slow on large tables without useful indexes.
- Can produce many duplicate-looking rows in one-to-many relationships.
- More joins can make queries harder to read and tune.
- Outer joins can hide missing data if the caller does not handle nulls.
- Heavy joins can put significant load on the database.

## Common Interview Questions

- What is a join?
- What is the difference between an inner join and a left join?
- How do indexes help joins?
- Why can joins become slow?
- What is a foreign key?
- When would you denormalize instead of joining?
- How do joins relate to normalization?

## Related Concepts

- Indexes
- Normalization
- Pagination
- Caching
- Sharding

## What I'd Probably Say Instead

"A join is how I pull related rows together from separate tables, usually by matching a foreign key to a primary key. I use joins when the data is relational and normalized. I watch the join columns, indexes, and result size, because joins over large tables can get expensive quickly."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Pull related rows together | Join |
| Only keep rows that match | Inner join |
| Keep the left row even if nothing matches | Left outer join |
| Match this child row to its parent | Foreign key relationship |
| This table has the main id | Primary key |
| The query returns repeated parent data | One-to-many join result |
| Make the join lookup fast | Index the join column |
