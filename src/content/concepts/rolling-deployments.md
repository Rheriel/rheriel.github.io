---
title: "Rolling Deployments"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 7
summary: "Rolling deployments replace old service instances with new ones a few at a time while the service keeps running."
---

## Problem It Solves

Stopping all old instances before starting the new version creates downtime. Replacing every instance at once is risky too. If the new version has a bug, the whole service may fail at the same time.

Rolling deployments reduce that risk by changing the service in small batches. Some old instances keep serving traffic while new instances start and pass readiness checks. Then traffic can move to the new instances. The rollout continues until all available instances run the new version.

## One-Sentence Definition

A rolling deployment is a release strategy that replaces old service instances with new ones in small batches while keeping enough healthy, ready instances available.

## How I Probably Think About It

"Replace the service a few copies at a time instead of swapping everything at once."

## Interview Explanation (30 Seconds)

A rolling deployment updates a service a few instances at a time. The platform starts a few new instances, waits until they are ready, sends traffic to them, and then removes some old instances. That repeats until the new version has replaced the old version. In Kubernetes, a Deployment usually handles this with readiness probes and rollout settings like max unavailable and max surge. The main benefit is that the service can stay up during the release. The main risk is version overlap: old and new code run at the same time, so both versions must work with the same data, APIs, and messages.

## When To Use It

- Use rolling deployments when the service has multiple instances.
- Use rolling deployments when the service should stay available during a release.
- Use rolling deployments when new instances can pass readiness checks before receiving traffic.
- Use rolling deployments when old and new versions can run safely at the same time.
- Use rolling deployments when changing a few instances at a time is safer than changing all of them at once.
- Use rolling deployments for stateless web services, API services, and workers that can handle version overlap.

## When NOT To Use It

- Do not use rolling deployments when there is only one instance and downtime is not acceptable.
- Do not use rolling deployments when old and new versions cannot run together.
- Do not use rolling deployments when a schema, API, or message change requires all code to switch at the same moment.
- Do not use rolling deployments without readiness checks that show a new instance can handle traffic.
- Do not assume rolling deployments catch every bug. Some problems appear only after more users, more traffic, or specific data.
- Do not use rolling deployments as a replacement for rollback plans, monitoring, or alerts.

## Alternatives

- Use blue/green deployments when you want two complete environments and a fast traffic switch.
- Use canary releases when you want a small share of traffic to try the new version first.
- Use recreate deployments when downtime is acceptable and old/new overlap is unsafe.
- Use feature flags when code can deploy separately from when a feature becomes active.
- Use expand-and-contract database changes when schema changes must work with both old and new code.

## Pros

- Rolling deployments can keep the service available during the release.
- They reduce the risk of moving every instance to a bad version at once.
- They work well with orchestration platforms and health checks.
- They let new instances pass readiness checks before receiving traffic.
- They do not require a full second production environment.
- They support routine releases for services that can run mixed versions safely.

## Cons

- Old and new versions run at the same time during the rollout.
- APIs, messages, caches, and database schema must stay backward compatible.
- A bad readiness check can send traffic to broken instances.
- Rollback still needs care if the new version changed data, sent messages, or called external systems differently.
- Slow rollouts keep the system in a mixed-version state for longer.
- A one-instance service cannot get zero-downtime benefits from rolling deployment alone.

## Common Interview Questions

- What is a rolling deployment?
- How does a rolling deployment avoid downtime?
- What role do readiness checks play in a rolling deployment?
- How is a rolling deployment different from blue/green deployment?
- How is a rolling deployment different from a canary release?
- Why must old and new versions be compatible during a rolling deployment?
- What can go wrong during a rolling deployment?
- How would you roll back a failed rolling deployment?

## Related Concepts

- Orchestration
- Kubernetes Basics
- Horizontal Scaling
- Health Checks
- Blue/Green Deployments
- Canary Releases
- Load Balancing
- Feature Flags

## What I'd Probably Say Instead

"I think of a rolling deployment as replacing a service a few copies at a time. The platform starts a few new instances, waits until they are ready, moves traffic to them, and then removes some old instances. It keeps the service available if enough healthy, ready instances stay running. The catch is version compatibility. During the rollout, old and new code are live at the same time, so database changes, APIs, messages, and caches have to work with both versions."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Replace a few copies at a time | Rolling deployment |
| The release is still in progress | Rollout |
| A running copy of the service | Instance |
| Keep enough copies serving users | Availability during deployment |
| Start extra copies before removing old ones | Surge |
| How many copies can be down during the update | Maximum unavailable |
| Check before sending traffic | Readiness probe |
| Old and new code both work | Backward compatibility |
| Go back to the old version | Rollback |
