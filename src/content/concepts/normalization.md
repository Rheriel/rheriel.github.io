---
title: "Normalization"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 10
summary: "Normalization organizes relational data to reduce duplication and protect consistency."
---

## Problem It Solves

When the same data is stored in many places, it can drift out of sync. A customer's email might be updated in one row but stay old in another row.

Normalization reduces that duplication. It stores each fact in one logical place and connects related data with keys.

## One-Sentence Definition

Normalization is the process of organizing relational data into tables so each fact is stored once and relationships are represented with keys.

## How I Probably Think About It

"Do not copy the same business fact everywhere. Store it once and reference it."

## Interview Explanation (30 Seconds)

Normalization is a way to design relational tables so data is not unnecessarily duplicated. For example, instead of storing a customer's name and email on every order row, I would store the customer once in a `customers` table and have `orders.customer_id` point to it. That makes updates safer and keeps the data consistent. The trade-off is that reads often need joins, and heavily normalized models can be slower or harder to query for some read paths.

## When To Use It

- The data has clear entities and relationships.
- The same fact would otherwise be copied into many rows.
- Updates must stay consistent across the system.
- Foreign keys can model the relationships cleanly.
- The write model should protect business correctness.

## When NOT To Use It

- The data is mostly read as one document or aggregate.
- A hot read path cannot afford repeated joins.
- Reporting queries need precomputed or flattened data.
- The duplicated value is a deliberate snapshot, such as an order's historical price.
- The model becomes so abstract that normal queries are hard to understand.

## Alternatives

- Denormalize selected fields for faster reads.
- Use a materialized view or read model.
- Store data as a document when it is usually read and written together.
- Keep historical snapshots for values that must not change later.
- Cache common joined results.

## Pros

- Reduces duplicate data.
- Helps keep updates consistent.
- Makes relationships explicit with keys.
- Works well with constraints and foreign keys.
- Keeps the write model closer to the real business entities.

## Cons

- Reads may need more joins.
- Queries can become harder to write and tune.
- Over-normalization can make the model awkward.
- Some read-heavy paths may need denormalized copies anyway.
- Cross-service normalization can create tight coupling if pushed too far.

## Common Interview Questions

- What is normalization?
- Why does normalization reduce data duplication?
- What is denormalization?
- When would you denormalize data?
- How do normalization and joins relate?
- What is a foreign key?
- Why might a normalized schema be slower for reads?

## Related Concepts

- Joins
- Indexes
- Replication
- Sharding
- Caching

## What I'd Probably Say Instead

"I would normalize the write model so each important fact has one source of truth, then join through foreign keys when I need related data. If a read path becomes too slow or too complex, I would denormalize carefully for that specific use case."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Store this fact once | Normalization |
| Do not copy the same value everywhere | Reduce duplication |
| Point this row to the owner row | Foreign key relationship |
| This table has the main identity | Primary key |
| Copy a field for faster reads | Denormalization |
| Keep the value as it was at the time | Snapshot |
| Pull the related data together | Join |
