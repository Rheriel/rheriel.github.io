---
title: "Big O"
level: "Explain trade-offs"
volume: "06-performance"
order: 1
summary: "Big O describes how an algorithm's cost changes as the input gets larger."
---

## Problem It Solves

Code that works well for small inputs can become slow when the input grows. A loop over ten items is cheap. A nested loop over millions of items can be too slow.

Big O gives us a common way to talk about growth. It helps compare approaches without focusing on machine speed, language runtime, or small fixed costs.

## One-Sentence Definition

Big O describes how an algorithm's time or memory cost changes as the input gets larger, usually as an upper bound.

## How I Probably Think About It

"How much worse does this get when the input gets bigger?"

## Interview Explanation (30 Seconds)

Big O describes how an algorithm's cost changes as the input gets larger. It usually talks about time, but it can also describe memory. A single pass over a list is O(n). A nested loop over the same list is often O(n^2). Binary search over sorted data is O(log n). Big O drops constant factors and smaller terms, so it does not predict exact latency. It tells me the cost shape and whether the approach will still make sense with much more data.

## When To Use It

- Compare two algorithms or data structures.
- Explain why one approach handles growth better than another.
- Reason about code where the input size can grow a lot.
- Choose between scanning, indexing, sorting, hashing, or searching.
- Estimate time cost or memory cost before measuring real code.

## When NOT To Use It

- Do not use Big O as a replacement for profiling real systems.
- Do not ignore fixed costs when inputs are small or latency is tight.
- Do not assume the better Big O always wins in practice.
- Do not use Big O alone for database, network, cache, disk, or other I/O-heavy code.
- Do not hide expensive setup work behind a simple-looking operation.

## Alternatives

- Use profiling to measure where real time is spent.
- Use benchmarks to compare actual implementations.
- Use query plans to understand database work.
- Use latency percentiles to understand user-facing performance.
- Use load testing to see how the whole system behaves under traffic.

## Pros

- Gives a simple language for comparing growth rates.
- Helps spot algorithms that will fail on large inputs.
- Works across languages, machines, and frameworks.
- Makes trade-offs easier to explain in interviews.
- Applies to both time and memory cost.

## Cons

- Hides constant factors that can matter in real code.
- Hides hardware, runtime, cache, and I/O effects.
- Can be misleading when input sizes are small.
- Worst-case or upper-bound notation can sound more exact than the real system is.
- Does not replace measurement.

## Common Interview Questions

- What is Big O?
- What is the difference between O(1), O(log n), O(n), and O(n^2)?
- Why do we drop constants in Big O?
- How do you find the time complexity of a loop?
- What is the time complexity of nested loops?
- How is time complexity different from space complexity?
- When can an O(n) solution beat an O(log n) solution in practice?
- Why is Big O not enough for system performance?

## Related Concepts

- Profiling
- Memory Allocation
- Garbage Collection
- Indexes
- Caching
- Batching

## What I'd Probably Say Instead

"I use Big O to describe how cost changes as the input gets larger. It does not tell me exact latency, but it tells me the cost shape. If one solution scans once and another compares every item with every other item, Big O explains why the second one may fail when the data gets large."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Same cost no matter how many items | O(1) |
| Cut the search space each step | O(log n) |
| Look at each item once | O(n) |
| Sort the items with a comparison sort | O(n log n) |
| Compare many pairs of items | O(n^2) |
| Memory grows with the input | Space complexity |
| Time grows with the input | Time complexity |
| Ignore small fixed costs | Drop constants |
