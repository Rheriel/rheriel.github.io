---
title: "Observer"
level: "Explain the concept"
volume: "02-architecture"
order: 11
summary: "The observer pattern lets one object notify other objects when something changes."
---

## Problem It Solves

Sometimes one object needs to tell other objects that something happened. An order was placed. A user changed their email. A job finished. A value changed.

Without a clear pattern, the object where the change happens starts calling every dependent object directly. It knows who needs the update, what each one does, and when to call it. That makes the object harder to change and harder to test.

The observer pattern moves those dependents behind a subscription list. The changing object, called the subject, sends a notification to its observers. Each observer reacts in its own code.

## One-Sentence Definition

The observer pattern lets a subject notify registered observers when something changes or an event happens.

## How I Probably Think About It

"When this thing changes, tell the code that asked to be notified."

## Interview Explanation (30 Seconds)

The observer pattern is useful when one object needs to announce a change, but should not know every piece of code that reacts to it. The object being watched is the subject. Other objects register as observers. When the change happens, the subject calls each observer through a known interface. That keeps the subject focused on its own job. I would use it for in-process notifications, UI updates, domain notifications, or extension points. The trade-off is that the work can be harder to trace because it happens indirectly.

## When To Use It

- One change may trigger several reactions.
- The subject should not depend directly on every observer implementation.
- Observers may be added or removed over time.
- The notification happens inside the same process.
- Observers can react independently to the same notification.
- You want to add reactions without changing the subject each time.

## When NOT To Use It

- There is only one clear caller and one clear callee.
- The subject must collect and handle every reaction result.
- The order of reactions is important and complex.
- The work needs reliable delivery across services or processes.
- A direct method call would be easier to read.
- Hidden side effects would make debugging hard.

## Alternatives

- Use a direct method call when the relationship is simple and stable.
- Use a callback for one small, local behavior hook.
- Use domain events when the event means something in the business model.
- Use a message queue when work must cross process boundaries or survive failures.
- Use publish-subscribe infrastructure when producers and consumers should stay separate.
- Use dependency injection when the subject should call one known collaborator.

## Pros

- Reduces direct coupling between the subject and its observers.
- Lets new reactions be added without changing the subject.
- Keeps each reaction in its own observer.
- Works well for UI updates and in-process notifications.
- Supports optional reactions.
- Helps avoid one large method that does every follow-up task.

## Cons

- Makes control flow less obvious.
- Can hide side effects behind a simple state change.
- Failure handling can be unclear when one observer fails.
- Notification order can matter more than expected.
- Too many observers can make behavior hard to trace.
- Does not solve delivery, retry, or durability across processes by itself.

## Common Interview Questions

- What is the observer pattern?
- When would you use Observer?
- How is Observer different from publish-subscribe?
- How is Observer different from a message queue?
- What are common examples of observers?
- What problems can observers create?
- How should observer failures be handled?
- Why can Observer make debugging harder?

## Related Concepts

- Dependency Injection
- Composition vs Inheritance
- Strategy Pattern
- Decorator
- Message Queues
- Eventual Consistency
- Domain-Driven Design
- Publish-Subscribe

## What I'd Probably Say Instead

"I would use an observer when one object needs to announce that something changed, and several other pieces may want to react. The subject should not need to know every reaction. Observers register with the subject. The subject notifies them, and each observer handles its own work. I would keep this for in-process notifications. If the work needs reliable delivery across services, I would use events or a message queue instead."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Tell everyone who registered | Observer Pattern |
| The thing being watched | Subject / observable |
| The thing reacting to the change | Observer |
| Let other code react without naming each piece directly | Loose coupling |
| Something happened in the app | Notification / event |
| Add another reaction later | Extension point |
| This is hard to trace | Indirect control flow |
| This should cross service boundaries | Message queue / publish-subscribe |
