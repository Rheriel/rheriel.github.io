---
title: "Domain-Driven Design"
level: "Explain the concept"
volume: "02-architecture"
order: 18
summary: "Domain-driven design models software around the business domain and its language."
---

## Problem It Solves

Software becomes hard to understand when the code uses different words than the business. The business may talk about accounts, subscriptions, invoices, and renewals. The code may talk about rows, DTOs, handlers, and generic services. Over time, the real rules get buried in conditionals and database updates.

Domain-driven design helps teams put the business domain at the center of the design. It gives names to the important concepts, defines where those names are valid, and keeps business rules close to the code that represents them.

## One-Sentence Definition

Domain-driven design is an approach to software design that models complex business domains with shared language, clear boundaries, and code that expresses business rules.

## How I Probably Think About It

"Use the business words in the code, keep each business area separate, and put important rules near the data they control."

## Interview Explanation (30 Seconds)

Domain-driven design, or DDD, is useful when the hard part is the business, not the framework or database. The team works with domain experts to agree on the important words. Those words show up in the code. DDD also splits the system into bounded contexts, because a model only makes sense inside a clear business area. For example, "customer" may mean one thing in billing and another thing in support. Inside one context, entities, value objects, aggregates, repositories, and domain services help keep rules close to the data they protect. I would use DDD for complex business behavior, not for simple CRUD.

## When To Use It

- The business rules are complex and easy to misunderstand.
- Different teams or workflows use the same words with different meanings.
- Important logic is spread across controllers, services, jobs, and database scripts.
- You need a model that business people and engineers can discuss together.
- The domain will change over time and needs clear boundaries.
- The system has several business areas that should not share one large set of objects.

## When NOT To Use It

- The application is mostly simple CRUD.
- The domain is small and already easy for the team to understand.
- The team is looking for folder structure instead of business modeling.
- The cost of modeling would be higher than the business value.
- The business rules mostly live in another system.
- The team cannot get enough access to domain experts or real users.

## Alternatives

- Use layered architecture when broad technical separation is enough.
- Use vertical slice architecture when organizing by feature is the main need.
- Use clean architecture when dependency direction is the main concern.
- Use onion architecture when a rich domain model should sit at the center.
- Use transaction scripts for straightforward procedural workflows.
- Use simple CRUD models when the business behavior is simple.

## Pros

- Makes code use the same words as the business.
- Helps teams define clear boundaries between business areas.
- Keeps important rules close to the code that owns the data.
- Reduces confusion when one word has different meanings in different contexts.
- Helps engineers explain design choices in business terms.
- Works well with repositories, aggregates, and architecture styles that protect the domain.

## Cons

- Can add too much structure for simple applications.
- Requires time with people who understand the business.
- Terms like aggregate and bounded context can be misused as buzzwords.
- A poor model can make the system harder to change.
- Can create extra mapping between domain objects and database records.
- Teams may focus on patterns instead of learning the domain.

## Common Interview Questions

- What is domain-driven design?
- What problem does DDD solve?
- What is a bounded context?
- What is ubiquitous language?
- What is the difference between an entity and a value object?
- What is an aggregate?
- How does DDD relate to repositories?
- When is DDD too much?

## Related Concepts

- Separation of Concerns
- Repository Pattern
- Unit of Work
- Layered Architecture
- Vertical Slice Architecture
- Clean Architecture
- Hexagonal Architecture
- Onion Architecture
- Event Sourcing
- CQRS

## What I'd Probably Say Instead

"I would use domain-driven design when the business rules are the hard part. I would work with domain experts to agree on the important words and use those words in the code. I would split the system into bounded contexts so each business area has a clear boundary. Inside one context, I would keep important rules close to entities, value objects, aggregates, or domain services instead of scattering them through generic services."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Use the business words in the code | Ubiquitous language |
| This word means something different in billing | Bounded context |
| This object has identity over time | Entity |
| This object is defined by its values | Value object |
| Save this group as one consistency boundary | Aggregate |
| The business rule belongs near the data | Rich domain model |
| This rule does not fit one entity | Domain service |
| Load and save domain objects | Repository |
