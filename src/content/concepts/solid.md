---
title: "SOLID"
level: "Explain trade-offs"
volume: "02-architecture"
order: 1
summary: "SOLID is a set of object-oriented design principles for keeping code easier to change, test, and reason about."
---

## Problem It Solves

Code often starts simple and becomes harder to change as features are added. Classes grow too large. Dependencies point in awkward directions. Small changes force edits in many places. Tests become slow or brittle because behavior is tightly coupled.

SOLID gives names to common design habits that reduce that pain. It is not a checklist that makes code good by itself. It is a vocabulary for keeping responsibilities clear, dependencies manageable, and changes local.

## One-Sentence Definition

SOLID is a set of five object-oriented design principles that help keep software modular, testable, and easier to change.

## How I Probably Think About It

"Keep each piece focused, depend on stable boundaries, and avoid making callers care about details they do not use."

## Interview Explanation (30 Seconds)

SOLID is a group of five design principles for object-oriented code. Single Responsibility says a class should have one main reason to change. Open/Closed says behavior should often be extended without editing stable existing code. Liskov Substitution says subclasses should be usable wherever the parent type is expected. Interface Segregation says clients should not depend on methods they do not use. Dependency Inversion says high-level policy should depend on abstractions, not concrete low-level details. In interviews, I would explain SOLID as guidance for reducing coupling and making change safer, not as rules to apply blindly.

## When To Use It

- You are designing code that will change over time.
- Classes or modules are growing too large.
- Tests are difficult because dependencies are hard to replace.
- Business rules are mixed with infrastructure details.
- Several implementations need to share the same contract.
- You need common language for design trade-offs in a team.

## When NOT To Use It

- The code is a small script or throwaway prototype.
- Applying the principle would add abstractions with no clear benefit.
- The design is still unclear and a simple version would teach more.
- Performance or framework constraints make the abstraction awkward.
- The team would spend more time maintaining patterns than solving the problem.

## Alternatives

- Keep code simple and refactor when real change pressure appears.
- Use separation of concerns without naming every SOLID principle.
- Use functional composition instead of object-oriented inheritance.
- Use modules, packages, or service boundaries to manage coupling.
- Use tests and code review to catch painful coupling early.

## Pros

- Gives useful names for common design problems.
- Encourages small, focused units of code.
- Makes dependencies easier to replace in tests.
- Reduces the chance that one change breaks unrelated behavior.
- Helps separate business rules from infrastructure details.
- Makes design discussions more precise.

## Cons

- Can lead to too many interfaces and tiny classes.
- Can make simple code feel over-engineered.
- Some principles are easy to quote but hard to apply well.
- The principles can conflict with each other in real systems.
- It is often taught as strict rules instead of design guidance.
- It fits object-oriented code better than every programming style.

## Common Interview Questions

- What does SOLID stand for?
- Why is the Single Responsibility Principle useful?
- What does Open/Closed mean in practice?
- What is a Liskov Substitution violation?
- Why would you split an interface?
- How does Dependency Inversion relate to dependency injection?
- When can SOLID lead to over-engineering?
- Which SOLID principle do you use most often?

## Related Concepts

- Separation of Concerns
- Dependency Injection
- Composition vs Inheritance
- Strategy Pattern
- Adapter
- Clean Architecture
- Hexagonal Architecture

## What I'd Probably Say Instead

"SOLID is mostly a way to talk about code that is easier to change. I do not treat it as a checklist. I use it when code is becoming coupled, hard to test, or hard to extend. The practical version is: keep responsibilities focused, prefer stable contracts over concrete details, avoid surprising inheritance behavior, and do not force callers to depend on things they do not need."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| This class is doing too many jobs | Single Responsibility Principle |
| Add behavior without rewriting stable code | Open/Closed Principle |
| A child type should not surprise callers | Liskov Substitution Principle |
| Do not force callers to know methods they never use | Interface Segregation Principle |
| Depend on a contract, not a concrete implementation | Dependency Inversion Principle |
| Code is too tied together | Coupling |
| Hide details behind a stable shape | Abstraction |
| Replace this dependency in tests | Mock / test double |
| Too many patterns for a simple problem | Over-engineering |
