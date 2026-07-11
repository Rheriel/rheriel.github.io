---
title: "Secrets Management"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 11
summary: "Secrets management stores sensitive values like passwords, API keys, tokens, and certificates in a controlled way."
---

## Problem It Solves

Applications often need sensitive values to connect to databases, call APIs, sign tokens, or prove who they are. These values are secrets. If they get copied into source code, images, logs, tickets, or chat messages, they spread quickly and become hard to replace.

Secrets management gives teams a controlled place to store and use those values. The application reads the secret at runtime, or the platform gives it to the app when it starts. Access is based on identity and permissions. The goal is to avoid passing secrets around by hand.

## One-Sentence Definition

Secrets management is the practice of storing, delivering, rotating, and auditing sensitive application values without putting them in code or shared config.

## How I Probably Think About It

"Keep passwords, tokens, keys, and certificates out of code and give each service only the secrets it needs."

## Interview Explanation (30 Seconds)

Secrets management is about keeping sensitive values out of places where they spread. A service may need a database password, API key, token signing key, or TLS private key. Those values should not live in source code, container images, logs, or plain config files. A secrets manager stores them, checks identity and permissions before access, records who accessed them, and supports rotation. In an interview, I would mention least privilege, runtime delivery, encryption at rest and in transit, audit logs, and rotation. Environment variables are common, but they still need care because they can leak through process dumps, logs, or debugging tools.

## When To Use It

- Use secrets management when an application needs passwords, tokens, API keys, certificates, or private keys.
- Use secrets management when different environments need different secret values.
- Use secrets management when access should be based on service identity instead of someone copying a value by hand.
- Use secrets management when secrets need rotation without rebuilding application images or committing new config.
- Use secrets management when you need to know which service or person read a secret.
- Use secrets management when a leaked value would create security, privacy, or compliance risk.

## When NOT To Use It

- Do not use secrets management for ordinary non-sensitive configuration.
- Do not put secrets in source code, build artifacts, container images, or public config.
- Do not give every service access to every secret.
- Do not rely only on encryption if too many services or people can read the secret.
- Do not rotate a secret without checking which services still depend on the old value.
- Do not log secrets, even during startup, debugging, or failed authentication.

## Alternatives

- Use normal configuration for values that are not sensitive.
- Use managed identities or workload identity when the platform can give the app short-lived credentials.
- Use certificates and mutual TLS when services need to prove identity to each other.
- Use feature flags when the value controls behavior but is not sensitive.
- Use manual credential handling only for small, temporary systems where the risk is clearly low.
- Use build-time configuration only for values that are not secret and do not need runtime rotation.

## Pros

- Secrets stay out of source code and application images.
- Access can be limited to the services and people that actually need it.
- Secret access can be logged and audited.
- Secrets can often be rotated without rebuilding images or changing source code.
- Different environments can use different secret values safely.
- It reduces the damage from leaked files, copied config, and credentials shared by hand.

## Cons

- The secrets manager becomes critical infrastructure that must stay available and protected.
- Applications still need a safe way to receive secrets at runtime.
- Rotation can break services if clients, caches, connection pools, or external systems still use old values.
- Too many manual secrets can become hard to track.
- Bad permissions can make a secrets manager look safe while still exposing too much.
- Secrets can still leak through logs, metrics, crash reports, shells, or debugging tools.

## Common Interview Questions

- What is secrets management?
- Why should secrets not be stored in source code?
- How are secrets different from normal configuration?
- How would you deliver secrets to a containerized service?
- What does secret rotation mean?
- What is least privilege for secrets?
- What are common ways secrets leak?
- How would you handle a leaked database password?

## Related Concepts

- Containers
- Images
- Orchestration
- Kubernetes Basics
- Health Checks
- Service Mesh
- Configuration
- Least Privilege

## What I'd Probably Say Instead

"I think of secrets management as keeping sensitive values out of code and copied config. A database password, API token, signing key, or private key should come from a controlled store at runtime. Each service should get only the secrets it needs. The important parts are service identity, least privilege, encryption, audit logs, and rotation. I would also be careful with environment variables. They are easy to use, but they can still leak through logs, process inspection, or debugging."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Passwords and API keys | Secrets |
| Keep secrets out of code | Secrets management |
| Give this service only what it needs | Least privilege |
| Change the password safely | Secret rotation |
| See who read the secret | Audit logging |
| Put the secret into the running app | Runtime injection |
| The app proves who it is | Workload identity |
| A short-lived access value | Temporary credential |
| Someone exposed the key | Secret leak |
