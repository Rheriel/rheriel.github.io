---
title: "Decorator"
level: "Explain the concept"
volume: "02-architecture"
order: 10
summary: "The decorator pattern adds behavior around an object without changing the object itself."
---

## Problem It Solves

Sometimes code needs to add behavior to an object without changing the original class. A service may need logging. A client may need retries. A response writer may need compression. A repository may need caching.

Without a clear boundary, these extra behaviors often get mixed into the main object. The core logic starts doing its real job plus logging, caching, metrics, retries, validation, or access checks.

The decorator pattern puts the extra behavior in a wrapper. The wrapper has the same interface as the object it wraps. It can run code before, after, or around the call, then call the wrapped object.

## One-Sentence Definition

The decorator pattern wraps an object in another object with the same interface, then adds behavior before, after, or around the call to the wrapped object.

## How I Probably Think About It

"Wrap this thing, add the extra behavior, and let callers keep using it the same way."

## Interview Explanation (30 Seconds)

The decorator pattern is useful when I want to add behavior around an object without changing that object or its callers. The decorator has the same interface as the wrapped object. It calls the wrapped object and adds something extra, like logging, caching, metrics, retries, authorization, or compression. Callers still use the same interface. I would use it when the extra behavior is optional, reusable, or stackable. The trade-off is that too many wrappers can make the call path hard to follow.

## When To Use It

- You want to add behavior without changing the original class.
- The added behavior can live outside the core logic.
- Callers should keep using the same interface.
- The behavior is optional, reusable, or configurable.
- Several behaviors may need to be combined.
- You want to avoid a large subclass tree for small feature combinations.

## When NOT To Use It

- The behavior is part of the object's core responsibility.
- The wrapper would change the contract of the interface.
- A simple function call before or after the operation would be clearer.
- The code already has too many layers around one call.
- The added behavior needs deep access to private state.
- The wrapper would hide important side effects or failure modes.

## Alternatives

- Add the behavior directly when it is part of the core responsibility.
- Use middleware when the behavior applies to a request pipeline.
- Use a proxy when the main concern is controlling access, lazy loading, or remote communication.
- Use inheritance when the variation is simple and naturally fits a subtype.
- Use composition with a helper service when callers should see the extra behavior.
- Use aspect-oriented tooling when the platform already supports it.

## Pros

- Adds behavior without changing the original object.
- Keeps cross-cutting concerns out of core logic.
- Preserves the same interface for callers.
- Allows behavior to be reused across implementations.
- Allows wrappers to be combined in different ways.
- Can reduce subclass growth for feature combinations.

## Cons

- Adds another layer to follow.
- Several decorators can make debugging harder.
- Order matters when decorators are stacked.
- A decorator can hide slow calls, retries, or side effects.
- The interface contract must still be true after wrapping.
- Overuse can make simple code harder to read.

## Common Interview Questions

- What is the decorator pattern?
- When would you use Decorator instead of inheritance?
- How is Decorator different from Adapter?
- How is Decorator different from Proxy?
- Why does a decorator implement the same interface as the wrapped object?
- What are common examples of decorators?
- Can decorators be stacked?
- What problems can too many decorators create?
- How does Decorator relate to composition?

## Related Concepts

- Composition vs Inheritance
- Dependency Injection
- Strategy Pattern
- Adapter
- Repository Pattern
- Clean Architecture
- Hexagonal Architecture
- Middleware

## What I'd Probably Say Instead

"I would use a decorator when I want to add behavior around an object without changing the object or its callers. The decorator has the same interface, holds the original object, and calls it. Around that call, it can add logging, caching, metrics, retries, or authorization. It is useful when wrapper behavior is reusable or optional. I would avoid stacking so many decorators that the real call path becomes hard to understand."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Wrap this thing and add behavior | Decorator Pattern |
| Keep the same contract for callers | Same interface |
| Call the real object inside the wrapper | Delegation |
| Add logging or caching around the call | Cross-cutting concern |
| Combine small behaviors | Stacked decorators |
| Do not create a subclass for every combination | Composition over inheritance |
| The wrappers are hard to follow | Indirection / wrapper chain |
| This wrapper changes what callers were promised | Broken interface contract |
