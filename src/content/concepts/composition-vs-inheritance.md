---
title: "Composition vs Inheritance"
level: "Compare trade-offs"
volume: "02-architecture"
order: 4
summary: "Composition builds behavior by combining smaller pieces, while inheritance reuses behavior through parent-child type relationships."
---

## Problem It Solves

Code often needs to share behavior between several types. The easy answer is sometimes inheritance: put common behavior in a parent class and let child classes reuse it. That can work, but it can also create a rigid hierarchy where small changes in the parent affect many children.

Composition gives another option. Instead of saying one type is a special kind of another type, it builds behavior by giving an object smaller collaborators. This often makes the design easier to change, test, and extend.

## One-Sentence Definition

Composition means building behavior by combining objects or functions, while inheritance means building behavior by deriving one type from another.

## How I Probably Think About It

"Prefer plugging behavior in over forcing everything into a parent-child hierarchy."

## Interview Explanation (30 Seconds)

Composition and inheritance are two ways to reuse and organize behavior. Inheritance models an "is-a" relationship, where a child type should safely behave like its parent type. Composition models a "has-a" relationship, where an object gets behavior by holding or using other objects. I usually prefer composition because it keeps behavior more flexible and avoids deep class hierarchies. I still use inheritance when the domain really has a stable subtype relationship or when a framework expects it.

## When To Use It

- You want to reuse behavior without creating a deep class hierarchy.
- Different behaviors need to be mixed and matched.
- Tests need to replace part of the behavior with a fake or stub.
- A type needs to delegate work to another focused component.
- The relationship is better described as "has-a" than "is-a".
- You expect behavior to vary by configuration, feature, or runtime choice.

## When NOT To Use It

- A simple inheritance relationship is already clear, stable, and small.
- A framework requires subclassing for lifecycle methods or integration points.
- Composition would create many tiny objects with unclear purpose.
- The behavior is not likely to vary or be reused.
- The extra indirection would make the code harder to follow.

## Alternatives

- Use inheritance for stable "is-a" relationships.
- Use interfaces or protocols to define behavior without sharing implementation.
- Use strategy objects when an algorithm needs to vary.
- Use decorator objects to add behavior around an existing object.
- Use simple helper functions when shared behavior does not need object state.
- Use dependency injection to provide collaborators from the outside.

## Pros

- Makes behavior easier to combine and replace.
- Avoids fragile parent-child hierarchies.
- Keeps classes focused on smaller responsibilities.
- Makes testing easier because collaborators can be swapped.
- Reduces the risk that a parent change breaks many child classes.
- Works well with dependency injection and strategy-style designs.

## Cons

- Can add more objects and wiring.
- Can make control flow less obvious if delegation is overused.
- May feel more verbose than a small base class.
- Poorly named collaborators can make the design harder to understand.
- Does not remove the need to choose good boundaries.
- Some frameworks and languages make inheritance the easier path.

## Common Interview Questions

- What is the difference between composition and inheritance?
- Why do people say "favor composition over inheritance"?
- When is inheritance still a good choice?
- What is an "is-a" relationship?
- What is a "has-a" relationship?
- How does composition improve testability?
- How can inheritance violate Liskov Substitution?
- How do Strategy and Decorator relate to composition?

## Related Concepts

- SOLID
- Dependency Injection
- Strategy Pattern
- Decorator
- Adapter
- Factory Pattern
- Clean Architecture

## What I'd Probably Say Instead

"I would use inheritance only when the child really is a safe substitute for the parent. If I just need to reuse behavior or swap part of the implementation, I would usually compose the object from smaller pieces. That keeps the design more flexible and avoids a base class becoming a place where unrelated behavior collects."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Plug this behavior in | Composition |
| This object uses another object to do part of the work | Delegation |
| This type is a specialized version of that type | Inheritance |
| A child should work anywhere the parent is expected | Liskov Substitution Principle |
| A `Car` has an `Engine` it delegates to | Composition / has-a relationship |
| A `SavingsAccount` is a kind of `Account` | Inheritance / is-a relationship |
| Choose an implementation at runtime | Strategy Pattern |
| Wrap an object to add behavior | Decorator Pattern |
| The base class is doing too much | Fragile base class / tight coupling |
