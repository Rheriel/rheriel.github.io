---
title: "Pagination"
level: "Explain trade-offs"
volume: "01-core-backend-concepts"
order: 16
summary: "Pagination splits a large result set into smaller pages so clients and databases do not have to handle everything at once."
---

## Problem It Solves

Large result sets are expensive to return in one response. They use more memory, take longer to query, increase network cost, and make clients harder to use.

Pagination breaks a large list into smaller chunks. It keeps responses fast, limits backend work, and gives users or clients a controlled way to move through the data.

## One-Sentence Definition

Pagination is splitting a result set into ordered chunks and returning one chunk at a time.

## How I Probably Think About It

"Do not load the whole list. Return a small slice and a way to get the next slice."

## Interview Explanation (30 Seconds)

Pagination is how an API or database returns a large list in smaller pages. The simple approach is offset pagination, where the client asks for `limit=50&offset=100`. That is easy to understand, but it can get slow on large tables because the database may still need to skip many rows. It can also behave badly when rows are inserted or deleted between requests. Cursor or keyset pagination uses a stable sort key, like `created_at` plus `id`, and asks for rows after the last item seen. That is usually better for large, changing data sets, but it is less flexible for jumping to arbitrary page numbers.

## When To Use It

- A query can return more rows than a client should load at once.
- An API returns lists, search results, feeds, logs, or history.
- Users need to browse data in small chunks.
- The backend needs predictable response size and query cost.
- The result order is stable and clearly defined.
- Large tables need index-friendly reads.

## When NOT To Use It

- The result set is always small and bounded.
- The client really needs a full export or batch file.
- The list has no stable ordering.
- The user needs exact random access to every page and the data changes constantly.
- Aggregated summaries would answer the question better than returning raw rows.

## Alternatives

- Return a capped recent list, such as the latest 20 items.
- Provide filtering or search so the result set is smaller.
- Use infinite scroll backed by cursor pagination.
- Use a background export job for very large data.
- Precompute read models for expensive list views.
- Stream results when the consumer can process a sequence safely.

## Pros

- Keeps response size manageable.
- Reduces memory, network, and client rendering cost.
- Makes large lists easier to browse.
- Helps protect databases from unbounded queries.
- Cursor pagination can stay fast on large indexed tables.
- It gives APIs a clear contract for list endpoints.

## Cons

- Offset pagination can become slow for deep pages.
- Offset pagination can skip or duplicate rows when data changes.
- Cursor pagination requires a stable sort order.
- Cursor tokens can make APIs less transparent to humans.
- Exact total counts can be expensive on large filtered data sets.
- Sorting and filtering must match the available indexes.

## Common Interview Questions

- What is pagination?
- Why is pagination important for APIs?
- What is the difference between offset pagination and cursor pagination?
- Why can offset pagination be slow?
- How do inserts and deletes affect paginated results?
- What makes a good cursor?
- How do indexes help pagination?
- When would you return a total count?

## Related Concepts

- Indexes
- REST
- Caching
- Sharding
- Rate Limiting

## What I'd Probably Say Instead

"I would paginate any endpoint that can return a large list. For simple admin views, offset pagination is often fine because it is easy to use and supports page numbers. For large or frequently changing data, I would prefer cursor or keyset pagination using a stable indexed order, such as `created_at` and `id`, so the database can continue from the last item instead of skipping a large number of rows."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Return a small slice | Pagination |
| How many items to return | Limit / page size |
| Skip the first N rows | Offset pagination |
| Continue after this item | Cursor pagination |
| Use the last seen values | Keyset pagination |
| Keep the order predictable | Stable sort order |
| Do not make the database skip too much | Deep offset problem |
| Tell the client if more exists | `has_next_page` |
