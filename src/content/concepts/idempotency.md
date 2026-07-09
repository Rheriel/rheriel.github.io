---
title: "Idempotency"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 14
summary: "Idempotency makes repeated attempts of the same operation have the same effect as one attempt."
---

## Problem It Solves

Distributed systems retry work. A client may not know whether a request failed before the server received it, while the server was processing it, or after the response was already sent.

Without idempotency, a retry can repeat the side effect. That can create two orders, charge a customer twice, send duplicate emails, or process the same message more than once.

## One-Sentence Definition

Idempotency means the same operation can be safely repeated and still have the same effect as running it once.

## How I Probably Think About It

"If the client retries this, do not do the important work twice."

## Interview Explanation (30 Seconds)

Idempotency makes retries safe. If a client sends the same operation more than once, the system treats the later attempts as repeats instead of doing the side effect again. This is common in APIs, payment flows, message consumers, and background jobs. The usual implementation is an idempotency key, a unique constraint, or a record of processed messages. For APIs, the server often stores the original result and returns it for the same key. The trade-off is extra state and careful key design, but it prevents duplicate writes when networks, clients, or workers retry.

## When To Use It

- A request or job may be retried.
- The operation has an external or business side effect.
- Duplicate execution would be harmful.
- Clients need a safe way to recover from timeouts.
- Message consumers may receive the same message more than once.
- Payment, order, booking, or account changes must avoid duplicates.

## When NOT To Use It

- The operation is read-only and has no side effect.
- Repeating the operation is harmless by nature.
- The action is intentionally repeatable, such as adding one more item each time.
- The system cannot define what makes two attempts the same operation.
- The storage and retention cost is larger than the duplicate risk.

## Alternatives

- Use a database transaction for one local unit of work.
- Use a unique constraint to reject duplicate business records.
- Make the operation naturally overwrite the same state.
- Use optimistic locking to detect conflicting updates.
- Use a queue with deduplication support when available.
- Use compensating actions when duplicates cannot be fully prevented.

## Pros

- Makes retries safer.
- Prevents duplicate side effects.
- Improves reliability when clients see timeouts or network errors.
- Works well with message queues and background jobs.
- Gives APIs clearer behavior for repeated requests.

## Cons

- Requires storing idempotency keys or processed message IDs.
- Key design can be tricky because the key must match the real operation.
- Old keys need a retention policy.
- It can hide bugs if unrelated requests accidentally reuse the same key.
- It does not automatically make the whole workflow transactional.

## Common Interview Questions

- What does idempotency mean?
- Why is idempotency important for retries?
- How would you make a payment API idempotent?
- What is an idempotency key?
- How is idempotency different from a transaction?
- How do message queues relate to idempotency?
- What can go wrong with bad idempotency key design?

## Related Concepts

- Transactions
- Optimistic Locking
- Caching
- Rate Limiting
- REST
- Message Queues
- Eventual Consistency

## What I'd Probably Say Instead

"I would make this operation idempotent so retries do not repeat the side effect. The client can send an idempotency key, and the server can store the result for that key. If the same operation comes in again, we return the original result instead of charging, creating, or processing again."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Do not do it twice | Idempotency |
| This retry is the same request | Idempotency key |
| We already handled this message | Deduplication |
| Save the result for this request key | Idempotent response |
| The important action happened outside our process | Side effect |
| The client did not get the response | Ambiguous failure |
| Try again safely | Retry-safe operation |
