---
title: "Unit of Work"
level: "Explain the concept"
volume: "02-architecture"
order: 6
summary: "Unit of Work tracks related changes and commits them together as one business operation."
---

## Problem It Solves

Business operations often change more than one object. Creating an order might update the order, order items, inventory, and payment state. If each repository saves changes on its own, part of the operation might succeed while another part fails.

Unit of Work gives the application one place to track those changes and commit them together. It keeps the business operation aligned with the transaction boundary.

## One-Sentence Definition

Unit of Work tracks a set of related changes and commits or rolls them back as one operation.

## How I Probably Think About It

"Collect all the changes for this use case, then save them together once."

## Interview Explanation (30 Seconds)

Unit of Work is a pattern for grouping related persistence changes into one commit. Instead of each repository immediately writing and committing, the application performs a use case, tracks the changed objects, and commits once at the end. That usually maps to a database transaction. It helps keep business operations consistent, especially when several repositories are involved. The trade-off is that it adds coordination logic, and it can become confusing if the unit of work lives too long or hides when data is actually written.

## When To Use It

- One business operation changes several entities.
- Several repositories need to participate in the same transaction.
- Partial success would leave invalid business data.
- You want one clear commit point for a use case.
- The ORM or database context already tracks changed objects.
- You need consistent rollback behavior for local persistence changes.

## When NOT To Use It

- Each operation changes one record with one simple save.
- The ORM already provides a clear unit of work and another wrapper would add noise.
- The workflow crosses service boundaries and cannot share one database transaction.
- The operation includes slow external calls that should not run inside a transaction.
- You only need eventual consistency.
- The abstraction hides important transaction behavior from callers.

## Alternatives

- Use a plain database transaction directly in the application service.
- Let the ORM's session or database context act as the unit of work.
- Use repository methods that save immediately for simple CRUD flows.
- Use an outbox pattern when committing data and publishing events together.
- Use a saga or compensating action for workflows across services.
- Use idempotency and retries when the operation can safely be repeated.

## Pros

- Gives a use case one clear commit point.
- Keeps related repository changes in the same transaction.
- Reduces partial-write bugs.
- Makes rollback behavior easier to reason about.
- Fits naturally with repositories and ORMs.
- Helps express business operations as atomic units.

## Cons

- Adds ceremony for simple persistence code.
- Can duplicate features the ORM already provides.
- Long-lived units of work can hold locks or stale data.
- Can hide when writes actually happen.
- Can become a vague transaction manager if responsibilities are not clear.
- Does not solve consistency across independent services by itself.

## Common Interview Questions

- What is Unit of Work?
- How does Unit of Work relate to transactions?
- How does Unit of Work relate to the repository pattern?
- Why not let each repository save immediately?
- When is Unit of Work unnecessary?
- What problems can a long-lived Unit of Work cause?
- How do ORMs often implement Unit of Work?
- Can Unit of Work coordinate changes across services?

## Related Concepts

- Repository Pattern
- Transactions
- ACID
- Dependency Injection
- Eventual Consistency
- Idempotency
- CQRS
- Domain-Driven Design

## What I'd Probably Say Instead

"I would treat the whole use case as one save boundary. The service can load and change objects through repositories, but it should commit once at the end so the related changes succeed or fail together. If the ORM already tracks changes, I would use that instead of building a heavy wrapper. If the workflow crosses services, I would not rely on Unit of Work alone. I would look at an outbox, saga, or idempotent retry."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Save all these changes together | Unit of Work |
| Commit once at the end | Transaction boundary |
| Do not let one repository half-save the use case | Atomic business operation |
| The ORM remembers what changed | Change tracking |
| Undo all changes if one part fails | Rollback |
| This use case is the save boundary | Application service transaction |
| Publish events after the data is committed | Outbox pattern |
| This cannot be one database transaction | Distributed workflow / saga |
