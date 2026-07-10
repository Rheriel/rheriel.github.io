---
title: "Vertical Slice Architecture"
level: "Explain the concept"
volume: "02-architecture"
order: 14
summary: "Vertical slice architecture organizes code around features instead of broad technical layers."
---

## Problem It Solves

Layered architecture can make a feature hard to follow. A small change may require touching a controller, service, validator, mapper, repository, and several shared files. The code is separated by technical job, but the feature itself is spread across the project.

Vertical slice architecture keeps the code for one feature close together. A slice contains the request handling, validation, workflow, and persistence calls needed for that feature. It can still use shared infrastructure, authentication, logging, and transaction rules. The goal is to make each feature easier to understand, change, test, and remove.

## One-Sentence Definition

Vertical slice architecture organizes an application by feature or use case, with each slice owning most of the code needed to handle that use case.

## How I Probably Think About It

"Keep the code for this feature together instead of splitting it across every technical folder."

## Interview Explanation (30 Seconds)

Vertical slice architecture groups code by feature instead of by technical layer. Instead of putting every controller in one folder and every service in another, each feature keeps its handler, validation, workflow, and persistence calls close together. A slice might handle creating an order, updating a profile, or exporting a report. The benefit is that I can change one feature without hunting through the whole project. The trade-off is that the team has to be careful about what stays inside a slice and what belongs in shared infrastructure.

## When To Use It

- Features are hard to follow because their code is spread across many layers.
- Most changes are made feature by feature.
- Different features have different validation, workflow, authorization, or persistence needs.
- You want small, focused units that are easy to test.
- You want to reduce shared service classes that collect unrelated behavior.
- The team can keep common code shared only when it is truly common.

## When NOT To Use It

- The application is small and a simple layered structure is already clear.
- Most logic is shared across many features.
- The team would copy code instead of extracting stable shared behavior.
- The team needs people to own technical layers more than features.
- Each feature is too small to justify its own folder or module.
- The architecture would hide important shared transaction, authorization, or security rules.

## Alternatives

- Use layered architecture when technical separation is the clearest structure.
- Use clean architecture when dependency direction around business rules matters most.
- Use hexagonal architecture when external systems should sit behind ports and adapters.
- Use a modular monolith when larger business areas need clear module boundaries.
- Use simple folders and named functions when the application is still small.
- Use domain-driven design when the main challenge is modeling business boundaries.

## Pros

- Makes feature changes easier to find.
- Keeps request handling, workflow, and persistence calls for a use case close together.
- Reduces large shared service classes.
- Makes feature-level tests more natural.
- Helps teams reason about one user action at a time.
- Can make deleting or replacing a feature simpler.

## Cons

- Can duplicate code if shared behavior is not handled carefully.
- Can make rules like security, logging, and transactions harder to see.
- May feel unfamiliar to teams used to strict technical layers.
- Can create many small folders or modules.
- Does not remove the need for good boundaries.
- Shared code can appear too late if every slice is built in isolation.

## Common Interview Questions

- What is vertical slice architecture?
- How is vertical slice architecture different from layered architecture?
- Why group code by feature instead of by technical layer?
- What belongs inside a vertical slice?
- How do you avoid duplication between slices?
- How does vertical slice architecture affect testing?
- When can vertical slices become messy?
- How does vertical slice architecture relate to clean architecture or DDD?

## Related Concepts

- Separation of Concerns
- Layered Architecture
- Dependency Injection
- Repository Pattern
- Clean Architecture
- Hexagonal Architecture
- Domain-Driven Design
- CQRS

## What I'd Probably Say Instead

"I would organize the code around the thing the user or system is trying to do. For example, create order would have its handler, validation, workflow, and persistence calls close together. That makes the feature easier to change because I do not have to jump through every layer folder. I would still pull out shared code when it is stable and clearly used by multiple slices."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep this feature's code together | Vertical Slice Architecture |
| Group by user action or use case | Feature-based organization |
| This request has its own handler and rules | Slice |
| Stop putting every method in one service | Avoiding a large shared service |
| Share this only after it repeats for real | Extract stable shared behavior |
| This change should stay inside one feature | Localized change |
| Code is split across controller, service, and repository folders | Layered architecture trade-off |
| Test the whole use case path | Feature-level test |
