---
title: "Adapter"
level: "Explain the concept"
volume: "02-architecture"
order: 9
summary: "An adapter lets code use a dependency through the interface the code expects."
---

## Problem It Solves

Code often needs to use something with the wrong interface. A payment provider has a different API. A legacy class uses old method names. A third-party library returns data in a format that does not match the rest of the app.

Without an adapter, that mismatch leaks into the calling code. Callers start translating names, formats, errors, and return values in many places.

An adapter puts that translation in one place. It exposes the interface the application wants and calls the dependency with the different interface.

## One-Sentence Definition

An adapter wraps an incompatible dependency and exposes the interface the calling code already understands.

## How I Probably Think About It

"Wrap this thing so the rest of the code can call it in the usual way."

## Interview Explanation (30 Seconds)

The adapter pattern is useful when code needs to call something with the wrong interface. The adapter implements the interface the application wants. Inside, it calls the external or legacy component. It translates inputs, outputs, and errors into the format the application uses. That keeps vendor or legacy details out of business logic. I would use it around third-party APIs, old code, database clients, queue clients, and framework code. The trade-off is one more layer, so I would keep the adapter small and focused.

## When To Use It

- A third-party library does not match the interface your code expects.
- Legacy code has an interface you do not want to spread through new code.
- You want business logic to depend on an interface your application owns.
- External API data needs translation before the rest of the app uses it.
- Different implementations need to fit the same interface.
- You want to keep vendor-specific details in one place.

## When NOT To Use It

- The existing interface is already clear and stable.
- The wrapper only renames methods and does not reduce coupling.
- The adapter would hide important behavior or failure modes.
- The translation rules are too broad for one small wrapper.
- The caller genuinely needs the full external API.
- A direct dependency would be simpler and just as clear.

## Alternatives

- Use the external API directly when it already fits the code.
- Change the caller's interface if the caller owns the abstraction.
- Use a facade when the main problem is simplifying a larger subsystem, not fitting one interface to another.
- Use dependency injection to pass the chosen implementation in.
- Use a repository when the mismatch is about database or storage access.
- Use a mapper when the problem is only converting data, not adapting behavior.

## Pros

- Keeps incompatible interfaces out of business logic.
- Gives third-party or legacy code a clear boundary.
- Makes callers easier to test with fake implementations.
- Keeps translation logic in one place.
- Makes vendor-specific code easier to find and replace.
- Works well with dependency injection and clean architecture.

## Cons

- Adds another layer to follow.
- Can become a dumping ground for unrelated translation logic.
- May hide important differences between the local interface and the real dependency.
- Needs maintenance when the external API changes.
- Can be overkill for simple one-off use.
- Does not remove incompatibility; it contains it.

## Common Interview Questions

- What is the adapter pattern?
- When would you use an adapter?
- How is Adapter different from Facade?
- How does Adapter help with third-party APIs?
- How does Adapter relate to dependency injection?
- What problems can adapters create?
- Should adapters expose the application's interface or the vendor's interface?
- Where would you place adapters in clean or hexagonal architecture?

## Related Concepts

- Dependency Injection
- Composition vs Inheritance
- Factory Pattern
- Strategy Pattern
- Repository Pattern
- Clean Architecture
- Hexagonal Architecture
- Facade

## What I'd Probably Say Instead

"I would use an adapter when the thing I need to call does not fit the interface my code expects. I would wrap the third-party client, legacy class, or framework object behind an interface my app owns. The adapter translates between the two. The business logic stays focused on the use case instead of knowing vendor method names, response formats, and error details."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Wrap this thing so it fits | Adapter Pattern |
| This library has the wrong interface | Incompatible interface |
| Keep vendor details out of the app code | Application-owned boundary |
| Translate this response into our format | Interface adaptation / mapping |
| Make old code fit new code | Legacy adapter |
| The app should own the interface | Dependency inversion |
| Pass the wrapped version in | Dependency injection |
| This wrapper is hiding too much | Leaky abstraction |
