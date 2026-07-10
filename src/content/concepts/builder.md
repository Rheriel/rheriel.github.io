---
title: "Builder"
level: "Explain the concept"
volume: "02-architecture"
order: 12
summary: "The builder pattern creates complex objects step by step instead of forcing callers through one large constructor."
---

## Problem It Solves

Some objects need many values before they are valid. Some values are required. Others are optional. Some values must be set together. A long constructor call can become hard to read and easy to misuse. Many constructor overloads can create the same problem in another form.

The builder pattern gives object creation a small, named flow. Callers set the parts they need, then ask the builder to create the final object. In pattern language, that final object is often called the product.

## One-Sentence Definition

The builder pattern is a creational design pattern that builds a complex object step by step and returns it when the required setup is complete.

## How I Probably Think About It

"Let me fill in the parts in a readable way, then create the object when everything is ready."

## Interview Explanation (30 Seconds)

I use the builder pattern when a constructor call is starting to hide meaning. A call like `new Report(a, b, c, true, null, 30)` is hard to read because the names are gone. A builder gives each part a name, collects the values, checks that the required parts are present, and then creates the object. It is most useful when there are many options or setup rules. I would skip it when a normal constructor is still clear.

## When To Use It

- An object has many constructor parameters.
- Some parameters are optional.
- Several values must be combined before the object is valid.
- There are many constructor overloads, meaning many constructor versions with different arguments.
- You want named construction steps instead of positional arguments.
- You want one place to validate object setup before creation.

## When NOT To Use It

- The object has only a few clear required values.
- A simple constructor or named constructor is easier to read.
- The builder would only mirror every field without adding clarity.
- The object should be created in one obvious way.
- The setup rules are simple and unlikely to change.
- The builder API would hide which values are actually required.

## Alternatives

- Use a normal constructor for simple required values.
- Use named constructors or static factory methods for a few clear ways to create the object.
- Use a factory when the main problem is choosing which concrete type to create.
- Use optional parameters or defaults when the language supports them clearly.
- Use a configuration object when the values are just data.
- Split the object if it has too many unrelated options.

## Pros

- Makes complex object creation easier to read.
- Avoids long positional constructor calls.
- Handles optional values without many constructor overloads.
- Gives setup steps clear names.
- Can validate required values before returning the object.
- Keeps construction rules in one place.

## Cons

- Adds more code and another abstraction.
- Can be overkill for simple objects.
- Can hide required fields if the builder API is weak.
- May let callers build an incomplete object if required values are not enforced.
- Can duplicate validation that already belongs inside the object.
- Does not fix an object that has too many unrelated responsibilities.

## Common Interview Questions

- What is the builder pattern?
- When would you use a builder?
- How is Builder different from Factory?
- Why is a long constructor a problem?
- How can a builder improve readability?
- What are the downsides of Builder?
- Should the builder validate the object?
- How do you keep a builder from creating invalid objects?
- When is a builder just unnecessary ceremony?

## Related Concepts

- Factory Pattern
- Dependency Injection
- Composition vs Inheritance
- Separation of Concerns
- Clean Architecture
- Domain-Driven Design

## What I'd Probably Say Instead

"I would use a builder when the constructor call is getting hard to understand at the call site. If I see a long list of values, booleans, and optional fields, I want named steps instead. The builder can collect the values, check the required parts, and create the final object. If the constructor is still short and obvious, I would not add a builder."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| This constructor call is hard to read | Long parameter list |
| I want named setup steps | Builder Pattern |
| Some values are optional | Optional configuration |
| Create it after all parts are set | Step-by-step construction |
| Check the setup before returning the object | Validation at construction time |
| Too many constructor overloads | Telescoping constructors |
| The final object created by the builder | Product |
| This is just choosing which type to make | Factory Pattern |
| This object has too many unrelated options | Low cohesion / object doing too much |
