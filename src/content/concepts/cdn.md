---
title: "CDN"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 13
summary: "A CDN caches content near users so responses are faster and origin servers handle fewer repeated requests."
---

## Problem It Solves

Users may be far from the servers that generate or store content. If every image, script, video, or public page comes from one origin, users wait longer and the origin handles the same requests again and again.

A CDN puts cache servers in many edge locations, often called points of presence. Those servers serve common content near users. That lowers latency, reduces origin load, and helps absorb traffic spikes.

## One-Sentence Definition

A CDN is a distributed network of edge cache servers that serves content near users and fetches from the origin server when the edge does not have a valid cached copy.

## How I Probably Think About It

"Put cacheable content near users so every request does not go back to the main servers."

## Interview Explanation (30 Seconds)

A CDN, or content delivery network, sits in front of an origin server. It serves cacheable content from edge locations near users. If the edge already has a valid copy, it returns that copy. If not, it fetches the content from the origin and may cache it for later. This works well for static assets, downloads, videos, and public pages. The main trade-off is freshness. I need clear rules for what can be cached, which requests can share a cached copy, how long that copy can live, and how updates are purged or versioned.

## When To Use It

- Users are spread across regions and response time matters.
- The same assets or public pages are requested many times.
- You need to reduce load on origin servers.
- Traffic spikes are mostly for cacheable content.
- Large files, images, scripts, videos, or downloads need to load faster.
- Slightly stale content is acceptable, or the team has a clear update strategy.

## When NOT To Use It

- Content is private and cannot be cached safely.
- Most responses are unique to one user and change often.
- The system requires immediate freshness for every read.
- Cache keys depend on many headers, cookies, or query parameters and are hard to define safely.
- The extra DNS, TLS, and cache setup would not solve a real latency or load problem.
- The team cannot debug cache behavior when content looks wrong or stale.

## Alternatives

- Serve content directly from the origin.
- Use a reverse proxy for caching, TLS termination, and routing near the origin.
- Use application-level caching for responses that are computed by the app.
- Use object storage with regional replication for file delivery.
- Use read replicas when the main problem is database read load.
- Version static assets so browsers and CDNs can cache them for a long time.

## Pros

- Reduces latency by serving content closer to users.
- Sends fewer repeated requests to origin servers.
- Helps absorb traffic spikes when many users request the same content.
- Can keep serving cached content when the origin is slow or temporarily unreachable.
- Works well for static assets and large files.
- Can also handle shared network features such as TLS, compression, and basic request filtering.

## Cons

- Cached content can become stale.
- Cache invalidation and purge rules can be hard to get right.
- Wrong cache keys or `Vary` rules can leak data or serve the wrong response.
- Debugging is harder because different users may hit different cache locations.
- Dynamic or personalized content may get little benefit.
- CDN configuration, provider limits, purge delays, and costs add operational work.

## Common Interview Questions

- What is a CDN?
- Why would you put a CDN in front of a website?
- What kind of content is safe to cache at the CDN edge?
- What is a cache hit and a cache miss?
- How do cache keys, TTLs, and invalidation work with a CDN?
- How does a CDN reduce origin load?
- What can go wrong with CDN caching?
- How is a CDN different from a reverse proxy?

## Related Concepts

- Caching
- Reverse Proxy
- Load Balancing
- API Gateway
- Rate Limiting
- Eventual Consistency

## What I'd Probably Say Instead

"I would use a CDN when many users request the same cacheable content from different places. The CDN can serve assets or public pages from edge locations near those users, so responses are faster and the origin handles fewer repeated requests. I would be careful with private or personalized content. Before relying on it, I would define cache keys, TTLs, purge rules, and asset versioning."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Put files near users | CDN |
| The main server behind the cache | Origin server |
| CDN had the content | Cache hit |
| CDN had to fetch from origin | Cache miss |
| Cache server close to the user | Edge location or point of presence |
| How long the CDN can keep it | TTL |
| Force the CDN to remove old content | Cache purge or invalidation |
| Decide which requests share a cached copy | Cache key |
| Change the file name when it changes | Asset versioning |
| Avoid sending every request home | Origin offload |
