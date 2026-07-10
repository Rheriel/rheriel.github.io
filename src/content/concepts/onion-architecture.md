---
title: "Onion Architecture"
level: "Explain the concept"
volume: "02-architecture"
order: 17
summary: "Onion architecture puts the domain model at the center and points code dependencies inward."
---

## Problem It Solves

Applications become hard to change when domain rules depend on frameworks, databases, or UI details. For example, an order entity might know about ORM annotations, HTTP request data, or a payment client. Then changing the database or framework can force changes in the business code.

Onion architecture protects the domain model from those outside concerns. The domain model and domain services sit in the center. Application services coordinate use cases around them. Infrastructure, database, and UI code sit farther out. Code dependencies point inward. Outer layers can depend on inner layers, but inner layers do not depend on outer layers.

## One-Sentence Definition

Onion architecture organizes an application in layers around the domain model, with source-code dependencies pointing inward toward the domain.

## How I Probably Think About It

"Put the business model in the middle. Database, API, and framework code should depend on it, not own it."

## Interview Explanation (30 Seconds)

Onion architecture keeps the domain model at the center of the system. The domain contains the business rules. It should not depend on persistence, UI, or framework code. Application services sit around the domain and coordinate use cases. Infrastructure code sits outside and handles databases, external APIs, and delivery details. The dependency rule is simple: source-code dependencies point inward. Outer layers can reference the domain, but the domain cannot reference outer layers. This is useful when the domain is important and long-lived. It is often too much for simple CRUD.

## When To Use It

- The domain model contains important business rules, not just data fields.
- Business logic is mixed with ORM models, controllers, or framework classes.
- You want the domain to be testable without a database or web server.
- Infrastructure choices may change over time.
- The same domain behavior is reused by several use cases or entry points.
- The team needs a clear rule for what domain code can import.

## When NOT To Use It

- The application is mostly simple CRUD with little domain behavior.
- The framework's active record or ORM model is good enough for the problem.
- The team would create layers without enforcing dependency direction.
- Mapping between database models and domain models would add more cost than value.
- Feature organization matters more than a central domain model.
- The system is small enough that the extra structure would slow down simple changes.

## Alternatives

- Use layered architecture when broad technical layers are enough.
- Use clean architecture when use cases and the dependency rule are the main focus.
- Use hexagonal architecture when ports and adapters best describe external boundaries.
- Use vertical slice architecture when grouping by feature is more useful.
- Use a simple modular structure for small applications.
- Use transaction scripts for straightforward procedural workflows.

## Pros

- Keeps domain rules independent from frameworks and infrastructure.
- Makes domain behavior easier to test.
- Gives the system a clear center.
- Makes source-code dependency direction explicit.
- Protects long-lived business rules from changing technical details.
- Works well with domain-driven design when the domain model is rich.

## Cons

- Adds layers and mapping code.
- Can feel heavy for simple CRUD systems.
- Requires discipline to keep source-code dependencies pointing inward.
- Can create duplicated models if database and domain shapes differ.
- Teams may focus on folder names instead of dependency rules.
- It can spread a simple request flow across too many files.

## Common Interview Questions

- What is onion architecture?
- What problem does onion architecture solve?
- What belongs in the center of onion architecture?
- What does it mean for source-code dependencies to point inward?
- How is onion architecture different from layered architecture?
- How is onion architecture related to clean architecture?
- How is onion architecture different from hexagonal architecture?
- When is onion architecture too much?

## Related Concepts

- Separation of Concerns
- Dependency Injection
- Repository Pattern
- Unit of Work
- Layered Architecture
- Vertical Slice Architecture
- Clean Architecture
- Hexagonal Architecture
- Domain-Driven Design

## What I'd Probably Say Instead

"I would keep the domain model in the middle and make everything else depend on it. The domain should hold the business rules, not database or framework details. Application services can coordinate use cases around the domain. Database adapters, API clients, and controllers live outside. That lets me test the business rules directly and change infrastructure without rewriting the domain."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Put the business model in the middle | Onion Architecture |
| The important rules should not import database code | Dependency rule |
| Outer code can call inner code | Inward dependency direction |
| This model represents the business, not a table | Domain model |
| This service coordinates the use case | Application service |
| Database code belongs outside the core | Infrastructure layer |
| Test the business rules without the server | Domain test |
| Too much structure for a simple app | Onion architecture trade-off |
