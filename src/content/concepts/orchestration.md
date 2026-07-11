---
title: "Orchestration"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 3
summary: "Orchestration manages where containers run, replaces failed ones, and scales them as demand changes."
---

## Problem It Solves

Running one container by hand is simple. Running many containers across many machines is not. Each service instance needs a place to run. It may crash and need replacement. It should receive traffic only when it is ready. It may need more copies when load grows.

Orchestration manages that work. It turns a desired state, such as "run five replicas of this service from this image," into real containers on available machines. It watches those containers and keeps moving the system back toward that desired state.

## One-Sentence Definition

Orchestration is the automated scheduling, scaling, health checking, and rollout of containers across a cluster of machines.

## How I Probably Think About It

"Orchestration keeps the right number of service containers running in the right places."

## Interview Explanation (30 Seconds)

Orchestration is what you need when containers are no longer a single-machine deployment. You describe the desired state: the image version, replica count, resource limits, and health checks. The orchestrator makes the cluster match that state. The container runtime starts containers on a host. The orchestrator decides which host should run them. It also replaces failed containers, connects them to networking, and helps with scaling and deployments. Kubernetes is the common example, but orchestration is the broader idea.

## When To Use It

- Use orchestration when containers need to run across multiple machines.
- Use orchestration when failed service instances should be replaced automatically.
- Use orchestration when deployments need controlled rollout and rollback.
- Use orchestration when traffic should go only to instances that are ready.
- Use orchestration when services need horizontal scaling.
- Use orchestration when teams need a common platform for many services.

## When NOT To Use It

- Do not use orchestration when one simple process on one host is enough.
- Do not use orchestration just because the application is containerized.
- Do not use orchestration before the team can run the platform safely.
- Do not use orchestration to hide application design problems.
- Do not assume orchestration removes the need for logging, metrics, alerts, backups, or security.
- Do not run stateful workloads on an orchestrator without clear storage, backup, and recovery plans.

## Alternatives

- Run containers directly on a single host for small deployments.
- Use platform-as-a-service hosting when the team wants less infrastructure control.
- Use serverless functions when the platform should manage runtime and scaling.
- Use virtual machines with configuration management when long-lived servers are a better fit.
- Use managed container services when a cloud provider should run most of the orchestration platform for you.

## Pros

- Orchestration keeps service instances close to the state you asked for.
- It can replace failed containers automatically.
- It supports horizontal scaling across a pool of machines.
- It helps send traffic only to ready instances.
- It makes rollouts and rollbacks more controlled.
- It gives teams a shared way to deploy and operate services.

## Cons

- Orchestration adds platform complexity.
- The orchestration platform needs monitoring, upgrades, and access control.
- Bad health checks or resource settings can make deployments unstable.
- Debugging can involve the app, container runtime, scheduler, networking, and storage.
- Small systems may not need the operational cost.
- Stateful systems still need careful data, backup, and recovery design.

## Common Interview Questions

- What is container orchestration?
- Why is orchestration useful after adopting containers?
- What does an orchestrator schedule?
- What is desired state?
- How does orchestration help with failures?
- How does orchestration relate to horizontal scaling?
- How is orchestration different from a container runtime?
- Why can orchestration make a system more complex?

## Related Concepts

- Containers
- Images
- Kubernetes Basics
- Horizontal Scaling
- Rolling Deployments
- Health Checks
- Load Balancing
- Service Discovery

## What I'd Probably Say Instead

"I think of orchestration as the layer that runs containers as a fleet. I say what I want running: which image, how many replicas, what resources they need, and how readiness and liveness should be checked. The orchestrator schedules the containers onto machines, replaces failed ones, connects them to networking, and helps with scaling and deployments. It helps when managing containers by hand becomes unreliable, but it also adds platform complexity."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Keep this many copies running | Desired state |
| Pick a machine for the container | Scheduling |
| The pool of machines | Cluster |
| One running copy of the service | Replica |
| Replace failed work automatically | Self-healing |
| Add or remove copies | Horizontal scaling |
| Send traffic only when it is usable | Readiness |
| Check whether it should be restarted | Liveness |
| Change versions safely | Rollout |
