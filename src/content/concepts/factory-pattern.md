---
title: "Factory Pattern"
level: "Explain the concept"
volume: "02-architecture"
order: 7
summary: "The factory pattern centralizes object creation when construction has logic, choices, or dependencies."
---

## Problem It Solves

Some objects are easy to create directly. Others need setup, validation, configuration, or a choice between several concrete implementations. If that construction logic is scattered across the codebase, every caller needs to know too much about how the object is built.

The factory pattern puts that creation logic in one place. Callers ask for the object they need, and the factory decides how to create it.

## One-Sentence Definition

The factory pattern is a creational pattern that uses a dedicated function or object to create other objects instead of making callers construct them directly.

## How I Probably Think About It

"Put the setup logic in one place so callers do not need to know exactly how this thing is built."

## Interview Explanation (30 Seconds)

The factory pattern centralizes object creation. Instead of spreading `new` calls, configuration choices, validation, or dependency wiring through the codebase, callers ask a factory to create the object. That is useful when construction is more than a simple constructor call, or when the concrete type depends on input or configuration. It keeps callers focused on what they need, not how the object is assembled. The trade-off is that factories can add ceremony if object creation is already simple.

## When To Use It

- Object creation has conditional logic.
- Different inputs or configuration values choose different concrete types.
- Construction needs several dependencies or setup steps.
- You want to keep callers away from low-level construction details.
- Object creation rules are reused in several places.
- You want one place to enforce valid object setup.

## When NOT To Use It

- Creating the object is a simple constructor call.
- The factory would only wrap `new` without adding useful meaning.
- The codebase already uses dependency injection to wire long-lived services.
- The factory hides important dependencies from the caller.
- The pattern makes simple code harder to read.
- A clearer named constructor or plain function would be enough.

## Alternatives

- Use direct construction for simple objects.
- Use dependency injection for long-lived dependencies.
- Use a builder when object setup has many optional steps.
- Use a strategy when the main problem is choosing behavior at runtime.
- Use static factory methods or named constructors for simple creation variants.
- Use configuration at application startup to choose implementations.

## Pros

- Keeps construction logic in one place.
- Reduces duplication in callers.
- Hides concrete implementation choices when callers do not need them.
- Makes complex setup easier to test in isolation.
- Gives creation rules a clear name.
- Works well with dependency injection when runtime creation is still needed.

## Cons

- Adds an extra abstraction.
- Can be overused for objects that are easy to create directly.
- Can hide dependencies if the factory reaches into global state or containers.
- Large factories can become dumping grounds for unrelated creation logic.
- May make control flow harder to follow.
- Does not remove complexity; it moves creation complexity to a named place.

## Common Interview Questions

- What is the factory pattern?
- Why use a factory instead of calling a constructor directly?
- When is a factory useful?
- When is a factory unnecessary?
- How does a factory relate to dependency injection?
- What is the difference between a factory and a builder?
- What problems can factories create?
- Should a factory return an interface or a concrete type?

## Related Concepts

- Dependency Injection
- Composition vs Inheritance
- Strategy Pattern
- Builder
- Adapter
- Clean Architecture
- Hexagonal Architecture
- Domain-Driven Design

## What I'd Probably Say Instead

"I would use a factory when creating the object has real logic behind it. For example, if the code needs to choose an implementation based on configuration, validate inputs, or assemble several dependencies, I would put that in a factory instead of repeating it in every caller. If construction is just `new User(...)`, I would not add a factory just to use a pattern."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Put the setup logic in one place | Factory Pattern |
| Choose which implementation to create | Factory method / object creation policy |
| Do not make every caller know the constructor details | Encapsulated construction |
| This object needs several setup steps | Complex object creation |
| This is just wrapping `new` | Unnecessary abstraction |
| The app wires long-lived services at startup | Dependency injection / composition root |
| I need different behavior based on input | Strategy selection |
| Too many optional setup values | Builder Pattern |
