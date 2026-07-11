---
title: "Kubernetes Basics"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 4
summary: "Kubernetes runs containerized services across a cluster and keeps them close to the state you asked for."
---

## Problem It Solves

Containers are useful, but production systems need more than a command that starts one container. Services need a place to run. They need networking, health checks, scaling, safe deployments, and recovery when a machine or container fails.

Kubernetes gives teams a common API and control plane for that work. You describe what should be running, such as the image, replica count, and network rules. Kubernetes compares that request with the real cluster and keeps trying to make them match.

## One-Sentence Definition

Kubernetes is a container orchestration platform that runs workloads across machines and keeps moving them toward the state declared through its API.

## How I Probably Think About It

"Kubernetes is the platform that keeps my containerized services running across a group of machines."

## Interview Explanation (30 Seconds)

Kubernetes is a common platform for running containers in production. A cluster has worker machines called nodes and a control plane that manages the cluster through the Kubernetes API. The basic workload unit is a pod. A pod usually runs one application container, but it can also hold closely related containers that share networking and storage. A deployment keeps the right number of pod copies running and helps roll out new versions. A service gives those changing pods a stable network name and sends traffic to ready pods. The key interview point is simple: Kubernetes is the orchestrator, not the container runtime.

## When To Use It

- Use Kubernetes when many containerized services need the same deployment platform.
- Use Kubernetes when services need self-healing, rollout control, and horizontal scaling.
- Use Kubernetes when workloads must run across many machines instead of one host.
- Use Kubernetes when teams need standard ways to define networking, health checks, CPU and memory needs, and secrets.
- Use Kubernetes when the team can operate the platform or use a managed service.
- Use Kubernetes when the team wants similar deployment concepts across environments.

## When NOT To Use It

- Do not use Kubernetes when one simple app on one host is enough.
- Do not use Kubernetes just because the application uses containers.
- Do not use Kubernetes before the team can handle its operational complexity.
- Do not treat Kubernetes as a fix for an application that is hard to configure, observe, or scale.
- Do not assume Kubernetes removes the need for observability, security, backups, or incident response.
- Do not run stateful workloads without clear storage, backup, and recovery design.

## Alternatives

- Run containers directly when a small system only needs a few containers.
- Use platform-as-a-service hosting when the team wants simpler deployments and less platform control.
- Use serverless functions when the platform should manage runtime and scaling details.
- Use virtual machines with configuration management when long-lived servers fit the system better.
- Use a managed container platform when the team wants orchestration without running all of Kubernetes itself.

## Pros

- Kubernetes gives services one common deployment model.
- Desired state makes restarts, scaling, and deployments more repeatable.
- Deployments keep pod copies running and roll out new versions gradually.
- Services give changing pods a stable network target.
- Readiness probes help route traffic only to usable pods, and liveness probes can trigger restarts.
- The ecosystem has strong support for tooling, managed services, and operational patterns.

## Cons

- Kubernetes adds a lot of concepts and platform complexity.
- Misconfigured resource requests, limits, probes, or rollout settings can cause outages.
- Debugging can involve pods, nodes, networking, storage, images, and the control plane.
- Small systems may not justify the operational cost.
- Security requires careful access control, network policy, image hygiene, and secrets handling.
- Stateful workloads need extra care around storage, failover, backups, and upgrades.

## Common Interview Questions

- What is Kubernetes?
- What problem does Kubernetes solve?
- What is a cluster?
- What is the difference between a node, pod, deployment, and service?
- Why is a pod the basic deployable unit instead of a single container?
- What does the control plane do?
- How does Kubernetes use desired state?
- How is Kubernetes different from a container runtime?
- Why can Kubernetes be too much for a small system?

## Related Concepts

- Containers
- Images
- Orchestration
- Horizontal Scaling
- Rolling Deployments
- Health Checks
- Secrets Management
- Service Discovery
- Load Balancing

## What I'd Probably Say Instead

"I think of Kubernetes as the system that runs containerized services across a cluster. I describe what I want running: the image, replica count, CPU and memory needs, and health checks. Kubernetes schedules pods onto nodes, replaces failed pods, gives them stable networking through services, and rolls out new versions through deployments. It is useful when a team needs one platform for many services, but it adds real operational complexity."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The whole platform environment | Cluster |
| A machine that runs workloads | Node |
| The API and control processes managing the cluster | Control plane |
| The basic workload unit | Pod |
| Keep several updated copies of this app running | Deployment |
| A stable way to reach changing pods | Service |
| Make the real system match what I asked for | Desired state reconciliation |
| Restart or replace broken work | Self-healing |
| Increase or decrease the number of copies | Horizontal scaling |
