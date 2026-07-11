---
title: "Canary Releases"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 9
summary: "Canary releases send a small, controlled share of production traffic to a new version before a wider rollout."
---

## Problem It Solves

Some bugs only appear with real users, real traffic, or real production data. Tests, staging, and health checks help, but they cannot prove that a new version is safe for all users.

Canary releases reduce that risk by sending a small, controlled share of production traffic to the new version first. The old version still serves most users. If the new version looks healthy, it gets more traffic. If it looks unhealthy, traffic moves back to the old version before many users are affected.

## One-Sentence Definition

A canary release is a deployment strategy where a new version gets a small, controlled share of production traffic first, then gets more traffic if it stays healthy.

## How I Probably Think About It

"Try the new version with a small group first, then expand if it looks healthy."

## Interview Explanation (30 Seconds)

A canary release puts the new version in production but sends only a small share of traffic to it first. Most traffic stays on the old version. The team watches signals like error rate, latency, saturation, logs, and key business metrics. If those signals look normal, traffic moves up in steps. If they look bad, traffic moves back to the old version. The benefit is limited blast radius. The catch is that canary releases only work when you can trust your monitoring and you know when to roll back.

## When To Use It

- Use canary releases when a risky change can be exposed gradually.
- Use canary releases when there is enough traffic to compare the canary with the old version.
- Use canary releases when routing can send a controlled percentage of traffic to one version.
- Use canary releases when metrics, logs, traces, and alerts can show whether the canary is healthy.
- Use canary releases when rollback can be done quickly by shifting traffic away from the new version.
- Use canary releases for user-facing services, APIs, and changes where production behavior matters.

## When NOT To Use It

- Do not use canary releases when you cannot measure whether the canary is working.
- Do not use canary releases when all users must switch at the same time.
- Do not use canary releases when the new version makes incompatible database, API, or message changes.
- Do not rely on canary releases when traffic is too low to reveal problems quickly.
- Do not use canary releases without clear success criteria and a clear rollback trigger.
- Do not treat a healthy canary as proof that every workload, region, or user group is safe.

## Alternatives

- Use rolling deployments when replacing instances in batches is enough.
- Use blue/green deployments when you want a full new environment and a fast traffic switch.
- Use feature flags when deployment should be separate from feature exposure.
- Use shadow traffic when the new version should receive copied requests but not serve real responses.
- Use staged regional rollout when releasing one region at a time is the safest way to limit impact.
- Use recreate deployments when downtime is acceptable and gradual exposure is not needed.

## Pros

- Canary releases limit how many users see a bad release at first.
- They test the new version with real production traffic.
- They support gradual traffic increases instead of one large switch.
- They work well with load balancers, service meshes, and progressive delivery tools.
- They can catch issues that tests and staging miss.
- They give teams a clear point to stop, pause, or continue a release.

## Cons

- Canary releases need reliable monitoring and clear success criteria.
- Low traffic can make the canary result misleading.
- Old and new versions usually need to run at the same time.
- Routing rules can get complex when traffic is split by percentage, region, tenant, or user group.
- Rollback can still be unsafe if the canary changed data, sent messages, or changed external state.
- A small canary can miss rare bugs that only appear at larger scale.

## Common Interview Questions

- What is a canary release?
- How does a canary release reduce release risk?
- How is a canary release different from rolling deployment?
- How is a canary release different from blue/green deployment?
- What would you watch during a canary release?
- What makes canary results trustworthy?
- What can make rollback unsafe after a canary?
- How would you decide whether to increase traffic or roll back?

## Related Concepts

- Rolling Deployments
- Blue/Green Deployments
- Health Checks
- Load Balancing
- Orchestration
- Kubernetes Basics
- Service Mesh
- Feature Flags

## What I'd Probably Say Instead

"I think of a canary release as giving the new version a small, controlled share of production traffic first. Most users stay on the old version. If error rate, latency, saturation, logs, and key business metrics look normal, traffic moves up in steps. If the canary looks bad, we send traffic back to the old version. The point is to limit blast radius while using real production signals to decide whether to keep going."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Try it with a small group first | Canary release |
| Send only some traffic to the new version | Traffic split |
| Increase traffic slowly | Progressive rollout |
| Limit how many users are affected | Blast radius |
| Decide if the canary is healthy | Release criteria |
| Watch errors and latency | Observability |
| Move traffic back to the old version | Rollback |
| Compare new and old behavior | Baseline comparison |
