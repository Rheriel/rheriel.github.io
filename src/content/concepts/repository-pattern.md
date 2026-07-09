---
title: "Repository Pattern"
level: "Explain the concept"
volume: "02-architecture"
order: 5
summary: "The repository pattern hides data access details behind a collection-like interface for domain objects."
---

## Problem It Solves

Business code becomes harder to test and change when database queries are scattered through services, controllers, or domain logic. A feature might know too much about SQL, ORM methods, table names, joins, and transaction details.

The repository pattern puts data access behind a focused interface. The rest of the application asks for domain objects or saves domain objects. It does not need to know exactly how those objects are loaded or stored.

## One-Sentence Definition

The repository pattern provides an abstraction for loading and saving domain objects without exposing the underlying data access details.

## How I Probably Think About It

"Put the database access behind a small object so the business logic does not care whether the data came from SQL, an ORM, or something else."

## Interview Explanation (30 Seconds)

The repository pattern separates business logic from persistence logic. Instead of letting services build queries directly, they call a repository with methods like `findById`, `save`, or `findActiveCustomers`. The repository hides whether the data comes from SQL, an ORM, an API, or a cache. That makes the business code easier to test and keeps data access decisions in one place. The main trade-off is that a repository can become a thin wrapper over an ORM, or it can grow into a dumping ground for unrelated queries if the boundary is not clear.

## When To Use It

- Business logic is mixed with SQL, ORM calls, or storage details.
- You want a clear boundary between domain logic and persistence.
- Data access rules are reused across several use cases.
- Tests need to replace persistence with an in-memory or fake implementation.
- You may change storage details without rewriting business logic.
- You want repositories to express domain-oriented queries.

## When NOT To Use It

- The application is a simple CRUD app and the ORM already provides a clear model.
- The repository would only pass every call straight through to the ORM.
- Query flexibility matters more than hiding persistence details.
- The abstraction hides important performance behavior, such as joins or pagination.
- The domain model is thin and most work is just reading and writing records.

## Alternatives

- Use the ORM directly in application services for simple CRUD cases.
- Use query objects for complex read queries.
- Use data mappers to translate between records and domain objects.
- Use CQRS when reads and writes need very different models.
- Use a service layer when the main problem is workflow coordination.
- Use dependency injection to pass data access collaborators into business code.

## Pros

- Keeps business logic away from persistence details.
- Makes data access easier to test in isolation.
- Gives storage operations domain-focused names.
- Centralizes common queries and save behavior.
- Makes it easier to swap or wrap persistence implementations.
- Works well with dependency injection and unit of work patterns.

## Cons

- Can add unnecessary ceremony around a capable ORM.
- Can become a generic dumping ground for queries.
- May hide performance costs if methods look too simple.
- Can lead to leaky abstractions when callers still need storage-specific behavior.
- Large repositories can become hard to understand and maintain.
- Read-heavy applications may need more direct query models.

## Common Interview Questions

- What is the repository pattern?
- Why use a repository instead of calling the database directly?
- How is a repository different from a DAO?
- How does the repository pattern help with testing?
- When is a repository unnecessary?
- What problems can repositories create?
- How does a repository relate to Unit of Work?
- Should repositories return domain objects or database records?

## Related Concepts

- Separation of Concerns
- Dependency Injection
- Unit of Work
- Transactions
- CQRS
- Clean Architecture
- Hexagonal Architecture
- Domain-Driven Design

## What I'd Probably Say Instead

"I would keep the business logic from knowing about SQL or ORM details. I would put that behind a repository with methods that describe what the domain needs, like loading an account or saving an order. I would avoid wrapping every ORM method just for the sake of a pattern. The repository should create a useful boundary, not just another layer."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep database code out of the business logic | Repository Pattern |
| Give me the customer by ID | Domain-oriented query |
| Save this aggregate or entity | Persistence abstraction |
| The service should not know SQL | Separation of concerns |
| Swap the database in a test | Fake repository / test double |
| This method just calls the ORM | Thin wrapper |
| This repository has every query in it | Bloated repository |
| Commit these repository changes together | Unit of Work |
