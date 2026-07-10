---
title: "Reverse Proxy"
level: "Explain trade-offs"
volume: "03-distributed-systems"
order: 12
summary: "A reverse proxy receives client requests on behalf of backend servers and forwards each request to an internal target."
---

## Problem It Solves

Clients should not need to know the private address, port, or layout of every backend server. Backend services also often need one shared network layer before requests reach application code.

A reverse proxy gives clients one endpoint. It accepts requests for backend servers, forwards them to internal targets, and can handle shared network tasks like TLS termination, routing, compression, caching, and logging.

## One-Sentence Definition

A reverse proxy is a server or proxy layer that sits in front of backend servers, receives client requests for them, and forwards each request to an internal target.

## How I Probably Think About It

"Put a proxy in front of the app servers so clients do not need to know where those servers are."

## Interview Explanation (30 Seconds)

A reverse proxy sits in front of backend servers. Clients call the proxy, and the proxy forwards each request to an internal target. This hides the backend layout and gives the system one place to handle network work like TLS, routing, headers, compression, caching, and access logs. A reverse proxy may also load balance, but they are not the same thing. The reverse proxy is the entry point for the servers behind it. Load balancing means spreading requests across healthy targets. The main risk is that every request may depend on the proxy, so it needs redundancy, careful configuration, and good monitoring.

## When To Use It

- Clients need one endpoint in front of one or more backend services.
- Backend servers should stay private and not be exposed directly.
- You want TLS termination before requests reach application servers.
- You need host-based or path-based routing.
- You want common request logging, header handling, compression, or caching.
- You need a stable public address while backend services move or scale.

## When NOT To Use It

- A single service can safely be called directly and needs no shared network layer.
- The proxy would add another hop without solving a real routing, security, or operations problem.
- The team cannot run the proxy with enough redundancy.
- Application-specific business rules would be pushed into proxy configuration.
- Service-to-service calls are better handled by service discovery or a load balancer.

## Alternatives

- Let clients call the backend service directly.
- Use a load balancer when the main problem is spreading traffic across healthy instances.
- Use an API gateway when the boundary needs API rules, auth, rate limits, protocol translation, or response shaping.
- Use service discovery for internal services that need to find each other.
- Use a CDN when the main goal is caching and serving content closer to users.
- Put shared behavior in the application when it depends on business logic.

## Pros

- Hides internal server addresses and layout from clients.
- Gives clients one stable public endpoint.
- Centralizes network concerns such as TLS, routing, compression, and logging.
- Keeps backend servers private.
- Can reduce application server work by handling static files, caching, or compression.
- Can route traffic during deploys, migrations, or service splits.

## Cons

- Adds another network hop.
- Can become a bottleneck if it is not scaled enough.
- Can become a single point of failure if it is not highly available.
- Misconfiguration can break many routes at once.
- Debugging can be harder because requests pass through another layer.
- Proxy rules can become complex over time.

## Common Interview Questions

- What is a reverse proxy?
- Why put a reverse proxy in front of application servers?
- How is a reverse proxy different from a forward proxy?
- How is a reverse proxy different from a load balancer?
- How is a reverse proxy different from an API gateway?
- What is TLS termination?
- What can go wrong with a reverse proxy?
- How would you make a reverse proxy highly available?

## Related Concepts

- API Gateway
- Load Balancing
- CDN
- Service Discovery
- Caching
- Rate Limiting
- REST

## What I'd Probably Say Instead

"I would use a reverse proxy when clients need one stable entry point in front of private backend servers. The proxy can terminate TLS, route by host or path, add common headers, log traffic, and sometimes cache or compress responses. I would keep business logic out of it and run more than one proxy instance, because if the proxy is down or misconfigured, the whole API can look down."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| One public server in front of the app | Reverse proxy |
| Keep app servers private | Backend topology hiding |
| End HTTPS at the proxy | TLS termination |
| Send `/api` here and `/static` there | Path-based routing |
| Send this domain to this service | Host-based routing |
| Add or remove request metadata | Header manipulation |
| Spread requests across app servers | Load balancing |
| The proxy is the only way in | Public entry point |
| Proxy rules broke many requests | Proxy misconfiguration |
