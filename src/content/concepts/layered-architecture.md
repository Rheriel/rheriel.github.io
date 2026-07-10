---
title: "Layered Architecture"
level: "Explain the concept"
volume: "02-architecture"
order: 13
summary: "Layered architecture organizes code into horizontal technical layers with clear responsibilities."
---

## Problem It Solves

Applications become hard to change when UI code, business rules, database access, and integration details are mixed together. A controller might validate a request, run business rules, build SQL, call another service, and format the response. Then one small change can touch too many files.

Layered architecture gives the system broad technical boundaries. Each layer has a clear job. In a traditional layered design, outer layers, such as controllers, call application, domain, and infrastructure code through known boundaries.

## One-Sentence Definition

Layered architecture separates an application into horizontal technical layers, such as presentation, application, domain, and infrastructure.

## How I Probably Think About It

"Keep request handling, use case flow, business rules, and database details in separate places."

## Interview Explanation (30 Seconds)

Layered architecture is a way to keep different kinds of code apart. In a backend, I usually think about a presentation layer for HTTP, an application layer for use cases, a domain layer for business rules, and an infrastructure layer for databases and external systems. The point is that a controller should not know SQL and a database class should not own business rules. The benefit is simpler testing and clearer change boundaries. The downside is that strict layers can turn a small feature into a tour through too many files.

## When To Use It

- The application has clear technical jobs, such as request handling, business logic, and persistence.
- Business rules are mixed with controllers, database queries, or framework code.
- You want a simple architecture that most engineers already understand.
- Several teams need clear ownership of different parts of the system.
- You want tests that can exercise business behavior without starting the whole application.
- You need a structure that can grow without putting everything in one module.

## When NOT To Use It

- The application is small enough that layers would add more files than clarity.
- A feature is easier to understand when its code stays together.
- The team is adding layers only because the pattern feels familiar.
- Every request has to pass through empty pass-through classes.
- The system mainly needs feature boundaries instead of technical layers.
- A high-traffic path needs fewer calls and less indirection.

## Alternatives

- Use a simple modular structure for small applications.
- Use vertical slice architecture to group code by feature instead of by technical layer.
- Use clean architecture when business logic needs a stricter dependency rule.
- Use hexagonal architecture when ports and adapters around external systems are the main concern.
- Use onion architecture when the domain model should sit at the center of the design.
- Use a transaction script style for simple procedural business flows.

## Pros

- Gives the application a structure that is easy to explain.
- Separates UI, workflow, business rules, and infrastructure concerns.
- Keeps many changes local to one layer.
- Makes testing easier when business logic is not tied to frameworks.
- Helps new engineers find where code belongs.
- Works well as a starting point for many business applications.

## Cons

- Can create too much boilerplate for simple features.
- Can hide a feature flow across many files.
- Can become a set of pass-through layers with little value.
- Does not automatically create good domain boundaries.
- Can group code by technical role when grouping by feature would be clearer.
- Dependency rules can become unclear if layers call each other without a clear direction.

## Common Interview Questions

- What is layered architecture?
- What are common layers in a backend application?
- Why separate presentation, business logic, and persistence?
- How does layered architecture relate to separation of concerns?
- What direction should calls or dependencies go in a layered architecture?
- When can layered architecture become over-engineered?
- How is layered architecture different from clean architecture?
- How is layered architecture different from vertical slice architecture?
- What are the downsides of putting every feature through every layer?

## Related Concepts

- Separation of Concerns
- Dependency Injection
- Repository Pattern
- Unit of Work
- Vertical Slice Architecture
- Clean Architecture
- Hexagonal Architecture
- Onion Architecture
- Domain-Driven Design

## What I'd Probably Say Instead

"I would split the app so request handling, use case flow, business rules, and persistence do not all live in the same place. A controller should not be full of SQL and business decisions. It should hand off to application code, which can use domain logic and call infrastructure through clear boundaries. I would also keep the layers honest. If a layer only forwards data and adds no value, I would question it."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep API code away from database code | Layered Architecture |
| This part handles requests | Presentation layer |
| This part runs the use case | Application layer / service layer |
| This part contains business rules | Domain layer |
| This part talks to databases and external systems | Infrastructure layer |
| Each layer can only call certain other layers | Dependency rule / dependency direction |
| This class only forwards the call | Pass-through layer |
| This feature is spread across too many files | Layered architecture trade-off |
| Group by feature instead | Vertical slice architecture |
