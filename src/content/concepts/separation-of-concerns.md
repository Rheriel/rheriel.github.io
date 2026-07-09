---
title: "Separation of Concerns"
level: "Explain the concept"
volume: "02-architecture"
order: 2
summary: "Separation of concerns keeps different responsibilities in different parts of the code."
---

## Problem It Solves

Code becomes hard to change when unrelated responsibilities are mixed together. A function might validate input, run business rules, query the database, format a response, and send a notification. Then a small change in one area can break another area.

Separation of concerns gives each part of the system a clear job. It helps keep changes local and makes the code easier to test, replace, and explain.

## One-Sentence Definition

Separation of concerns means organizing code so each part focuses on one kind of responsibility.

## How I Probably Think About It

"Do not mix business rules, storage details, UI formatting, and integration code in the same place."

## Interview Explanation (30 Seconds)

Separation of concerns is the idea that different responsibilities should live in different parts of the code. For example, business rules should not be buried inside HTTP handlers, database queries, or UI formatting. This makes code easier to change because a database change should not force a business rule change, and a UI change should not affect persistence logic. In interviews, I would describe it as a way to reduce coupling and make each part of the system easier to reason about.

## When To Use It

- A file or class is doing several unrelated jobs.
- Business rules are mixed with framework or database details.
- Tests are hard to write because one behavior pulls in many dependencies.
- A change in one layer often breaks another layer.
- Several teams or features need clear ownership boundaries.
- You want architecture that is easier to explain and evolve.

## When NOT To Use It

- The code is a tiny script or short-lived prototype.
- Splitting the code would add more ceremony than clarity.
- The boundaries are still unknown and a simple version would teach more.
- The separation would hide a flow that is easier to understand in one place.
- The team is creating abstractions only because a pattern says so.

## Alternatives

- Keep simple code together until real change pressure appears.
- Use small functions without creating extra layers.
- Use modules or packages to group related behavior.
- Use layered architecture for broad technical boundaries.
- Use vertical slices to group code by feature instead of by technical layer.
- Use dependency injection to separate policy from concrete details.

## Pros

- Makes code easier to read and explain.
- Keeps changes more local.
- Reduces coupling between unrelated responsibilities.
- Makes testing easier because details can be replaced or isolated.
- Helps prevent business rules from depending on framework details.
- Gives teams clearer ownership boundaries.

## Cons

- Can create too many files, layers, or interfaces.
- Can make simple flows harder to follow.
- Poor boundaries can move complexity instead of reducing it.
- It requires judgment because responsibilities are not always obvious.
- Over-separation can slow down small changes.

## Common Interview Questions

- What is separation of concerns?
- Why is it useful in large codebases?
- How does it relate to SOLID?
- What is an example of mixed concerns?
- When can separation of concerns lead to over-engineering?
- How would you separate business logic from infrastructure code?
- How does separation of concerns improve testing?
- What is the difference between separation of concerns and layered architecture?

## Related Concepts

- SOLID
- Dependency Injection
- Repository Pattern
- Layered Architecture
- Vertical Slice Architecture
- Clean Architecture
- Hexagonal Architecture
- Domain-Driven Design

## What I'd Probably Say Instead

"I would keep the business rules separate from the transport, database, and formatting details. That way a change to the API shape or storage layer does not leak into the core behavior. I would not split everything by default, but once a piece of code has multiple reasons to change, I would give those responsibilities clearer boundaries."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| This code is doing too many different jobs | Mixed concerns |
| Keep business rules away from database details | Separation of concerns |
| A change here should not break that other thing | Low coupling |
| This piece should have one clear job | Single responsibility |
| Hide framework details from the core logic | Boundary / abstraction |
| Group related behavior together | Cohesion |
| This is split into too many pieces | Over-engineering |
