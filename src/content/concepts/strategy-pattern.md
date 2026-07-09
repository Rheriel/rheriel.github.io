---
title: "Strategy Pattern"
level: "Explain trade-offs"
volume: "02-architecture"
order: 8
summary: "The strategy pattern lets code choose between interchangeable behaviors without putting every choice in the caller."
---

## Problem It Solves

Code often needs to do the same kind of work in different ways. A payment flow may support several payment providers. A pricing service may support several discount rules. A sorter may support several sort orders.

Without a clear boundary, this often turns into a large `if` or `switch`. The caller knows every option, every rule, and every special case. Adding one behavior means editing that central block again.

The strategy pattern moves each behavior into its own implementation. The caller uses a shared interface and runs the strategy it receives.

## One-Sentence Definition

The strategy pattern puts interchangeable behaviors behind one interface so code can use one behavior without knowing all the others.

## How I Probably Think About It

"Give each option the same shape, then pass in the option this case needs."

## Interview Explanation (30 Seconds)

The strategy pattern is useful when code supports several ways to do the same job. Instead of putting every option in a big `if` or `switch`, each option becomes a separate strategy with the same interface. The caller uses that interface and does not need the details of each option. This works well when behavior changes by configuration, customer, feature flag, or input. The trade-off is extra structure, so I would not use it for one or two simple branches that are unlikely to grow.

## When To Use It

- Several behaviors do the same kind of job.
- The behavior needs to change by configuration, tenant, feature flag, or runtime input.
- A large conditional is growing around one decision.
- You want to test each behavior independently.
- You want callers to use one interface instead of many concrete types.
- You expect new behavior options to be added over time.

## When NOT To Use It

- There is only one behavior.
- The branches are simple and unlikely to grow.
- A named function or small conditional would be clearer.
- The shared interface would not have a clear meaning.
- The caller still needs to know too much about every implementation.
- The pattern would spread one simple decision across too many files.

## Alternatives

- Use a simple conditional for small, stable choices.
- Use a lookup table or map from key to function for simple choices.
- Use polymorphism when behavior belongs naturally to existing domain types.
- Use a factory when the main problem is creating the right object.
- Use dependency injection when the strategy is chosen at application startup.
- Use configuration rules when behavior is data-driven rather than code-driven.

## Pros

- Replaces large conditionals with focused implementations.
- Makes behavior easier to add without changing the caller.
- Keeps each algorithm or rule easier to test.
- Makes behavior selection explicit.
- Works well with composition and dependency injection.
- Helps keep callers focused on the task, not every possible variant.

## Cons

- Adds more types, functions, or files.
- Can be overkill for small conditionals.
- Requires a good shared interface.
- Can hide which implementation is used if the selection code is unclear.
- Too many tiny strategies can make the code harder to navigate.
- Does not remove the decision; it moves the decision to a named place.

## Common Interview Questions

- What is the strategy pattern?
- When would you use Strategy instead of an `if` or `switch`?
- How does Strategy relate to composition?
- How is Strategy different from Factory?
- How does Strategy improve testability?
- What are the downsides of the strategy pattern?
- Where should strategy selection happen?
- Can Strategy be implemented with functions instead of classes?

## Related Concepts

- Composition vs Inheritance
- Dependency Injection
- Factory Pattern
- SOLID
- Separation of Concerns
- Decorator
- Adapter

## What I'd Probably Say Instead

"I would use a strategy when code has several ways to do the same job, and those ways are likely to change or grow. I would put each behavior behind the same interface. Then the setup code, factory, or request-handling code can choose which one to pass in. That keeps the caller simple. If it is just two small branches, I would keep the conditional until the pattern is actually useful."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Pass in the behavior this case needs | Strategy Pattern |
| These options all do the same kind of work | Interchangeable algorithms |
| The caller should not know every special case | Encapsulated behavior |
| This big conditional is growing | Replace conditional with polymorphism |
| Choose the implementation from config or input | Runtime strategy selection |
| Pass the behavior in | Composition / dependency injection |
| Build the right strategy object | Factory Pattern |
| This simple branch does not need a pattern | Unnecessary abstraction |
