---
title: "Blue/Green Deployments"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 8
summary: "Blue/green deployments release a new version by switching traffic between two complete environments."
---

## Problem It Solves

Some releases need a fast switch and a clear way back. A rolling deployment changes instances in batches, but old and new versions run together during the rollout. That is useful, but it can be risky when version overlap is hard to manage.

Blue/green deployments solve this by keeping two complete production-like environments. One serves users. The other gets the new version and is tested first. When the new environment is ready, routing moves traffic from the old environment to the new one.

## One-Sentence Definition

A blue/green deployment is a release strategy where one production-like environment serves traffic while a second one gets the new version, then routing switches traffic to the new environment.

## How I Probably Think About It

"Bring up the new production copy, test it, then move traffic to it."

## Interview Explanation (30 Seconds)

In a blue/green deployment, there are two complete production-like environments. Blue might be the current version serving users. Green might be the new version. The team deploys and tests green while blue keeps running. When green is ready, the load balancer, router, DNS, or service discovery setup sends traffic to green instead of blue. The main benefit is a fast switch and a clear rollback target: send traffic back to blue. The trade-off is cost and coordination. You need enough infrastructure for both environments. Shared state, especially the database, must work with both versions.

## When To Use It

- Use blue/green deployments when you want to switch traffic quickly.
- Use blue/green deployments when rollback should be simple to explain and operate.
- Use blue/green deployments when the new version can be tested in a production-like environment before serving users.
- Use blue/green deployments when old and new versions should not be mixed instance by instance.
- Use blue/green deployments when the service is important enough to justify duplicate capacity during the release.
- Use blue/green deployments when routing can move traffic cleanly by load balancer, router, DNS, or service discovery change.

## When NOT To Use It

- Do not use blue/green deployments when you cannot afford or operate two environments.
- Do not use blue/green deployments when the database change only works with one version of the code.
- Do not assume rollback is safe after the new version has changed data, sent messages, or called external systems in a way you cannot undo.
- Do not use blue/green deployments without health checks and smoke tests on the new environment.
- Do not rely on DNS switching alone when cached DNS records could keep sending traffic to the old place.
- Do not use blue/green deployments as a replacement for monitoring, alerts, or a rollback plan.

## Alternatives

- Use rolling deployments when changing a few instances at a time is enough.
- Use canary releases when you want a small share of real traffic to test the new version first.
- Use feature flags when code deployment should be separate from feature activation.
- Use recreate deployments when downtime is acceptable and duplicate environments are not worth the cost.
- Use expand-and-contract database changes when both versions must work during a release.

## Pros

- Blue/green deployments can make the user-facing switch very fast.
- They give a clear rollback target while the old environment is still healthy.
- They let the new version be tested before user traffic moves to it.
- They avoid a long mixed-instance rollout for the application tier.
- They work well with load balancers, routing rules, and orchestration platforms.
- They make it easy to compare the old and new environments before the switch.

## Cons

- Blue/green deployments require extra infrastructure during the release.
- They can be expensive for large services.
- Shared data stores still need changes that work with both versions.
- Rollback can be unsafe if the new version changed data, sent messages, or changed external state.
- Traffic switching needs care, especially with long-lived connections, client caches, server caches, and DNS caches.
- The idle environment can drift if it is not kept in sync with production.

## Common Interview Questions

- What is a blue/green deployment?
- How does blue/green deployment reduce release risk?
- How is blue/green deployment different from rolling deployment?
- How is blue/green deployment different from canary release?
- Why can rollback be fast in a blue/green deployment?
- What can make rollback unsafe?
- What infrastructure do you need for blue/green deployment?
- How do database changes affect blue/green deployments?

## Related Concepts

- Rolling Deployments
- Canary Releases
- Health Checks
- Load Balancing
- Orchestration
- Kubernetes Basics
- Feature Flags
- Backward Compatibility

## What I'd Probably Say Instead

"I think of blue/green deployment as running two production-like environments. Blue is serving users. Green gets the new version. After green passes health checks and smoke tests, traffic switches to green. If something is wrong, traffic can switch back to blue. The catch is that blue only helps rollback if the new version has not made incompatible database or state changes."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The current production copy | Blue environment |
| The new production copy | Green environment |
| Move users to the new copy | Traffic switch |
| Go back to the old copy | Rollback |
| Check the new copy before users hit it | Smoke test |
| The new copy is ready for traffic | Readiness |
| Two full sets of infrastructure | Duplicate capacity |
| Both versions work with the same data | Backward compatibility |
