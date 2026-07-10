---
title: "Hexagonal Architecture"
level: "Explain the concept"
volume: "02-architecture"
order: 16
summary: "Hexagonal architecture keeps the application core separate from external systems by using ports and adapters."
---

## Problem It Solves

Applications often become tied to the systems around them. Business logic may call an HTTP framework, ORM, payment provider, queue client, or file system directly. Over time, the important rules become mixed with request handling, storage, and vendor code.

That makes the core behavior harder to test and harder to change. A use case may need a database, web server, or vendor client just to run in a test. Changing an external service can also force changes in business logic.

Hexagonal architecture puts the application core in the middle. Inbound ports describe how outside callers can use the application. Outbound ports describe what the application needs from storage, messaging, or external services. Adapters connect those ports to real outside tools, such as HTTP, databases, queues, and third-party APIs.

## One-Sentence Definition

Hexagonal architecture separates the application core from external systems by connecting them through ports and adapters.

## How I Probably Think About It

"Keep the core app logic in the middle, and plug databases, APIs, queues, and UI code into it through clear interfaces."

## Interview Explanation (30 Seconds)

Hexagonal architecture, also called ports and adapters, keeps the application core separate from outside systems. The core contains use cases and business rules. A port is the contract at the boundary. An inbound adapter, like a controller or message consumer, calls into the app. An outbound adapter, like a database or API client, connects the app to something it needs. This lets the same use case run from an API, job, or test without changing the core. The trade-off is extra structure, so I would use it when those outside systems need clear boundaries.

## When To Use It

- Business logic is tightly coupled to frameworks, databases, or vendor clients.
- The same use case needs to run from HTTP, background jobs, messages, or tests.
- External systems are likely to change over time.
- You want fast tests for core behavior without starting infrastructure.
- The application has important rules that should not depend on request or storage code.
- You need clear boundaries around integrations.

## When NOT To Use It

- The application is small and the extra interfaces would add little value.
- Most behavior is simple CRUD with few business rules.
- The team would create ports without a real external boundary to protect.
- A framework's normal structure is already clear and enough.
- The cost of mapping data in adapters is higher than the benefit.
- The system does not need to support multiple ways to call the same use case.

## Alternatives

- Use layered architecture when broad technical layers are enough.
- Use clean architecture when the main concern is dependency direction around business rules.
- Use onion architecture when the domain model is the clear center of the design.
- Use vertical slice architecture when feature organization matters more than adapter boundaries.
- Use a repository pattern for a narrower persistence boundary.
- Use a simple modular structure for small applications.

## Pros

- Keeps business rules independent from frameworks and infrastructure.
- Makes use cases easier to test without real external systems.
- Gives integrations clear boundaries.
- Makes replacing databases, vendor clients, or ways of calling the app less risky.
- Supports multiple ways to call the same use case.
- Makes dependency direction easier to discuss in interviews.

## Cons

- Adds interfaces, adapters, and mapping code.
- Can feel heavy for simple CRUD applications.
- Requires discipline to keep external details out of the core.
- Poorly named ports can make the design harder to understand.
- Too many small adapters can scatter a simple flow.
- Teams may confuse the pattern with folder shape instead of dependency boundaries.

## Common Interview Questions

- What is hexagonal architecture?
- What are ports and adapters?
- How is hexagonal architecture different from layered architecture?
- How is hexagonal architecture related to clean architecture?
- Where do databases, APIs, and message queues belong?
- Why does hexagonal architecture help testing?
- What is the difference between inbound and outbound ports or adapters?
- When is hexagonal architecture too much?

## Related Concepts

- Separation of Concerns
- Dependency Injection
- Adapter
- Repository Pattern
- Layered Architecture
- Vertical Slice Architecture
- Clean Architecture
- Onion Architecture
- Domain-Driven Design

## What I'd Probably Say Instead

"I would keep the use case and business rules in the middle. Controllers and message consumers call into that core. Database code and third-party clients sit outside it. The core defines the contracts it needs, such as saving an order or charging a payment. Adapters connect those contracts to the real database or provider. That means I can test the core with fakes and change infrastructure without rewriting the main behavior."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep the core app logic in the middle | Hexagonal Architecture |
| Plug outside tools into the app | Ports and adapters |
| The app defines what it needs | Port |
| The database code implements what the core needs | Outbound adapter |
| The controller calls into the app | Inbound adapter |
| Test without the real database or API | Test adapter / fake adapter |
| Keep vendor details out of business logic | Infrastructure boundary |
| The shape of the folders is not the point | Dependency boundary |
