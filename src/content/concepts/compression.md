---
title: "Compression"
level: "Explain trade-offs"
volume: "06-performance"
order: 9
summary: "Compression makes payloads smaller by spending CPU to encode data in fewer bytes."
---

## Problem It Solves

Large payloads take longer to send. They use more bandwidth and put more pressure on clients and services. This matters for APIs, files, logs, events, and web assets.

Compression makes data smaller before it is stored or sent. For API responses and most backend payloads, this usually means lossless compression. The receiver gets the original data back exactly. The trade-off is simple: smaller payloads, but more CPU work.

## One-Sentence Definition

Compression is encoding data into fewer bytes so it is cheaper to transfer or store.

## How I Probably Think About It

"Make the payload smaller, but remember that shrinking it and reading it back costs CPU."

## Interview Explanation (30 Seconds)

Compression makes a payload smaller before sending or storing it. That helps when transfer size, bandwidth cost, or storage size is part of the problem. It works especially well for text-heavy data like JSON, HTML, CSS, logs, or repeated fields. The trade-off is CPU work. The sender has to compress the bytes, and the receiver has to decompress them. For HTTP, the client and server also need to agree on an encoding such as gzip or Brotli. I would use it when measurements show payload size matters. Then I would check response size, latency, CPU, compression ratio, and client support.

## When To Use It

- Use it for large responses or files that are expensive to transfer.
- Use it for text-heavy formats like JSON, HTML, CSS, JavaScript, logs, or CSV.
- Use it when bandwidth is limited or payload transfer is slow.
- Use it when smaller stored data reduces storage cost or disk I/O.
- Use it when clients and intermediaries support the chosen content encoding.

## When NOT To Use It

- Do not compress tiny payloads where CPU cost is larger than the size savings.
- Do not recompress data that is already compressed, such as JPEG, PNG, MP4, or gzip files.
- Do not enable expensive compression on a CPU-bound service without measuring the added CPU time.
- Do not use it when added latency hurts more than reduced transfer size helps.
- Do not use compression to hide slow queries, bad pagination, or over-fetching.

## Alternatives

- Send fewer fields in the response.
- Paginate or stream large result sets.
- Use a smaller serialization format when both sides support it.
- Cache compressed responses for repeated reads.
- Move static assets to a CDN that can compress and serve them near users.

## Pros

- Reduces network transfer size.
- Can lower response time when bandwidth is the bottleneck.
- Reduces storage or disk I/O for some data.
- Helps large text payloads move with fewer bytes.
- Can reduce cost when bandwidth or storage is charged by usage.

## Cons

- Uses CPU for compression and decompression.
- Can add latency, especially at high compression levels.
- Gives little benefit for already-compressed media.
- Requires clients and servers to agree on a supported encoding.
- Can make debugging raw payloads harder.

## Common Interview Questions

- What is compression?
- When does compression improve performance?
- What is the trade-off between smaller payloads and CPU cost?
- Why should you avoid compressing already-compressed files?
- How would you decide whether to enable response compression?
- How can compression improve latency in one case and hurt it in another?
- What metrics would you check after enabling compression?

## Related Concepts

- Profiling
- Big O
- Memory Allocation
- Garbage Collection
- Batching
- Caching Strategies
- CDN
- Pagination

## What I'd Probably Say Instead

"I would use compression when payload size is part of the problem. It can make network transfer and storage cheaper, especially for text data. The trade-off is CPU. I would measure response size, latency, CPU, compression ratio, and client support before calling it a win."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Make the response smaller | Compression |
| How much smaller it gets compared with the original | Compression ratio |
| Work spent shrinking the data | Compression cost |
| Work spent reading it back | Decompression cost |
| The network is the slow part | Bandwidth bottleneck |
| The server is already busy doing compute | CPU-bound service |
| The browser and server agree on a response encoding | Content encoding negotiation |
