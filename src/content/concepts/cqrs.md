---
title: "CQRS"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 23
summary: "CQRS separates write operations from read operations so each side can use a model that fits its job."
---

## Problem It Solves

Many systems start with one model for both reads and writes. That works well while the use cases are simple. Over time, writes may need validation, business rules, and consistency checks, while reads may need fast queries, joins, filters, search, or dashboards.

CQRS gives each side a model that fits its purpose. The write side protects state changes. The read side is shaped for queries. This can make complex systems easier to scale and reason about, but it also adds moving parts and often introduces eventual consistency.

## One-Sentence Definition

CQRS means separating commands that change data from queries that read data, often with different models for each side.

## How I Probably Think About It

"Use one path for changing the system and another path for reading it efficiently."

## Interview Explanation (30 Seconds)

CQRS stands for Command Query Responsibility Segregation. The main idea is to separate writes from reads. Commands go through a write model that handles validation, business rules, and state changes. Queries use a read model that is optimized for returning data quickly. In simple systems, CQRS is usually unnecessary because one model is easier. It becomes useful when reads and writes have very different needs, or when read traffic is much heavier than write traffic. The trade-off is extra complexity, especially if the read model is updated asynchronously and can be briefly stale.

## When To Use It

- Reads and writes have very different shapes or performance needs.
- Read traffic is much heavier than write traffic.
- The write path has important business rules or invariants.
- The read side needs denormalized views, search indexes, dashboards, or projections.
- Different teams or services own the read and write workflows.
- Eventual consistency between writes and read models is acceptable.

## When NOT To Use It

- A simple CRUD model is enough.
- Reads must always reflect the latest write immediately.
- The team does not need separate read and write models.
- The extra code, messaging, projections, and monitoring are not worth it.
- The domain rules are simple and fit cleanly in one data model.
- Stale read models would create unsafe or confusing behavior.

## Alternatives

- Use a single CRUD model for reads and writes.
- Add indexes to improve read performance.
- Use database views or materialized views for query-heavy screens.
- Denormalize a few fields in the same database.
- Use caching for expensive reads.
- Use read replicas when the main problem is read scale.

## Pros

- Lets the write model focus on correctness and business rules.
- Lets the read model focus on fast, convenient queries.
- Can scale reads and writes independently.
- Supports denormalized views without polluting the write model.
- Works well with event-driven systems and projections.
- Makes complex domain workflows easier to separate from reporting needs.

## Cons

- Adds architectural complexity.
- Often introduces eventual consistency.
- Requires code to keep read models in sync.
- Needs monitoring for failed or delayed projections.
- Can duplicate data and logic across models.
- Is easy to overuse for simple CRUD applications.

## Common Interview Questions

- What is CQRS?
- What is the difference between a command and a query?
- Why would you separate read and write models?
- How does CQRS relate to eventual consistency?
- Is CQRS the same as event sourcing?
- When is CQRS overkill?
- How would you keep the read model updated?
- What can go wrong if a projection falls behind?

## Related Concepts

- Eventual Consistency
- Message Queues
- Caching
- Replication
- Indexes
- Normalization
- REST
- Event Sourcing

## What I'd Probably Say Instead

"CQRS means I do not force reads and writes through the same model when they have different needs. Commands use a write model that protects the rules for changing state. Queries use a read model shaped for fast responses. I would reach for it when the domain or query needs are complex enough to justify the extra moving parts, and I would be explicit about how stale the read side can be."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Change something | Command |
| Ask for data | Query |
| The path that validates and saves changes | Write model |
| The path optimized for returning data | Read model |
| A prebuilt view for a screen or query | Projection |
| Data copied into a query-friendly shape | Denormalized read model |
| The read side catches up later | Eventual consistency |
| Keep the query view updated | Project events / update projections |
| One model handles everything | CRUD model |
