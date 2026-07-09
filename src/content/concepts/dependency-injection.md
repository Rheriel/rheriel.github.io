---
title: "Dependency Injection"
level: "Explain the concept"
volume: "02-architecture"
order: 3
summary: "Dependency injection passes a component's dependencies in from the outside instead of creating them inside."
---

## Problem It Solves

Code becomes hard to test and change when a component creates all of its own dependencies. A service might directly create a database client, an email sender, a logger, or a payment gateway. That makes the service tied to those exact details.

Dependency injection moves that choice outside the component. The component says what it needs, and something else provides it. This makes the component easier to test, configure, and reuse.

## One-Sentence Definition

Dependency injection means giving an object or function the dependencies it needs from the outside instead of making it create them itself.

## How I Probably Think About It

"Pass in the thing this code needs so I can swap it in tests or configuration."

## Interview Explanation (30 Seconds)

Dependency injection is a way to reduce coupling. Instead of a class creating its own database client or API client, it receives that dependency through a constructor, method, or framework container. The class depends on the behavior it needs, often through an interface, not on how the dependency is built. That makes the code easier to test because I can pass in a fake implementation. It also makes production wiring more flexible because configuration happens at the edge of the application, not inside business logic.

## When To Use It

- A component depends on external systems like databases, queues, APIs, or file storage.
- You want to replace a dependency in tests.
- Business logic is tied too closely to infrastructure details.
- Different environments need different implementations.
- Object creation is becoming scattered across the codebase.
- You want dependencies to be visible instead of hidden inside methods.

## When NOT To Use It

- The dependency is a simple value or local helper with no real reason to swap.
- The code is a small script or short-lived prototype.
- Injecting everything would make the code harder to read.
- A framework container is hiding the actual object graph.
- The abstraction exists only for testing and has no production meaning.

## Alternatives

- Create simple objects directly when there is no useful boundary.
- Use factory functions to centralize object creation.
- Use configuration at startup for environment-specific choices.
- Use modules or packages to hide construction details.
- Use service locator only when framework constraints make injection awkward.
- Refactor toward dependency inversion when high-level code depends on low-level details.

## Pros

- Makes dependencies explicit.
- Reduces coupling to concrete implementations.
- Makes unit tests easier to write.
- Keeps business logic away from setup and configuration code.
- Allows different implementations for different environments.
- Supports dependency inversion and clean boundaries.

## Cons

- Can add ceremony for simple code.
- Can create too many interfaces or tiny wrappers.
- Constructor lists can grow if a component has too many responsibilities.
- Framework containers can make wiring harder to follow.
- Poor use can move complexity into configuration instead of removing it.
- It can be confused with dependency inversion, which is related but not the same thing.

## Common Interview Questions

- What is dependency injection?
- Why does dependency injection improve testability?
- How is dependency injection related to dependency inversion?
- What are constructor injection and method injection?
- What problems can dependency injection cause?
- When would you avoid dependency injection?
- How does dependency injection reduce coupling?
- What is the difference between dependency injection and a service locator?

## Related Concepts

- SOLID
- Separation of Concerns
- Repository Pattern
- Factory Pattern
- Strategy Pattern
- Adapter
- Clean Architecture
- Hexagonal Architecture

## What I'd Probably Say Instead

"I would not let the business logic create its own database client or external service client. I would pass those in, usually through the constructor, so the core code only knows what behavior it needs. In tests, I can pass a fake. In production, the application startup code wires in the real implementation. That keeps the important logic easier to test and less tied to infrastructure."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Pass this thing in instead of creating it here | Dependency injection |
| This code should not know how the client is built | Inversion of control |
| Depend on what it can do, not the exact class | Dependency inversion |
| Replace the real dependency in a test | Test double / mock / fake |
| The setup code connects all the parts | Object graph / composition root |
| This constructor needs too many things | Too many responsibilities |
| The framework gives me the dependency | DI container |
