---
title: "Clean Architecture"
level: "Explain the concept"
volume: "02-architecture"
order: 15
summary: "Clean architecture keeps business rules independent from frameworks, databases, and UI details."
---

## Problem It Solves

Applications become hard to change when business rules depend directly on frameworks, databases, HTTP details, or external services. For example, putting pricing rules inside a controller or ORM model ties those rules to one way of calling them. Testing the behavior then needs too much setup. Changing infrastructure can also change business logic by accident.

Clean architecture protects the core of the application from those details. Business rules and use cases sit near the center. Frameworks, databases, APIs, and UI code sit outside. The key rule is about code dependencies: inner code should not import or depend on outer details.

## One-Sentence Definition

Clean architecture puts business rules and use cases at the center, and makes outer details depend on them instead of the other way around.

## How I Probably Think About It

"Keep the important business logic away from the framework and database code."

## Interview Explanation (30 Seconds)

Clean architecture is a way to keep business logic from being owned by the framework or database. The use case should not import a controller, ORM, or external API client. Instead, outer code translates things like HTTP requests and database rows, then calls into the use case. If the use case needs storage or an external service, it depends on an interface, and infrastructure implements that interface. The benefit is that the important behavior is easy to test and easier to move. The trade-off is extra structure, so I would not use it for every small app.

## When To Use It

- Business rules are important and likely to outlive frameworks or storage choices.
- The core behavior needs fast tests without starting the whole application.
- Controllers, ORM models, or framework classes contain business decisions.
- The same use case can be called from HTTP, background jobs, or message consumers.
- Infrastructure choices may change over time.
- The team needs clear dependency rules around application and domain code.

## When NOT To Use It

- The application is small and the extra layers would add little value.
- The main problem is feature organization, not dependency direction.
- Most code is simple CRUD with little business behavior.
- The team would create interfaces and folders without enforcing the dependency rule.
- The framework's normal structure is more useful than extra architecture boundaries.
- The cost of mapping between layers is higher than the benefit.

## Alternatives

- Use layered architecture when broad technical layers are enough.
- Use vertical slice architecture when keeping feature code together matters most.
- Use hexagonal architecture when ports and adapters best describe the boundaries.
- Use onion architecture when the domain model is the center of the design.
- Use a simple modular structure for small applications.
- Use transaction scripts for straightforward procedural workflows.

## Pros

- Keeps business rules separate from frameworks and infrastructure.
- Makes core behavior easier to unit test.
- Reduces coupling to databases, UI, and external services.
- Makes dependency direction explicit.
- Allows multiple entry points to reuse the same use cases.
- Helps long-lived systems survive framework or infrastructure changes.

## Cons

- Adds structure and indirection.
- Can create boilerplate for simple CRUD behavior.
- Requires discipline to keep code dependencies pointing inward.
- Mapping external models to internal models can feel repetitive.
- Teams can overuse interfaces that do not protect a real boundary.
- It may hide simple flows behind too many files.

## Common Interview Questions

- What is clean architecture?
- What problem does clean architecture solve?
- What does the dependency rule mean in clean architecture?
- How is clean architecture different from layered architecture?
- How is clean architecture related to dependency inversion?
- Where do controllers, databases, and frameworks belong?
- When is clean architecture too much?
- How would you test a use case without starting the full application?

## Related Concepts

- Separation of Concerns
- Dependency Injection
- Repository Pattern
- Adapter
- Layered Architecture
- Vertical Slice Architecture
- Hexagonal Architecture
- Onion Architecture
- Domain-Driven Design

## What I'd Probably Say Instead

"I would keep the main use cases and business rules independent from the web framework and database. The controller can translate the HTTP request, then call the use case. The database adapter can translate rows into the shape the use case needs. The use case depends on interfaces owned by the core or application layer, not on a concrete ORM or API client. That keeps the important behavior easy to test and less tied to infrastructure."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep business logic away from framework code | Clean Architecture |
| Important code should not know about the database | Dependency rule |
| The core defines what it needs | Dependency inversion |
| The database code plugs into the core | Infrastructure adapter |
| This controller should only translate and call a use case | Interface adapter / controller |
| Test the use case without the server | Use case test / application layer test |
| Swap the database without changing business rules | Infrastructure independence |
| Too many folders for a simple feature | Clean architecture trade-off |
