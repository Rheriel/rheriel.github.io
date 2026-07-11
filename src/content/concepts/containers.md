---
title: "Containers"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 1
summary: "A container runs one or more application processes from an image with isolated runtime settings."
---

## Problem It Solves

Applications need a predictable way to run on laptops, test machines, and production servers. Without that, a service may work on one machine and fail on another. The package versions, runtime version, environment variables, or file paths may be different.

Containers make the runtime more repeatable. An image packages the application with the libraries and tools it needs. A container starts from that image and runs one or more processes on a host machine. The host kernel is still shared. The container still gets its own view of files, processes, users, network interfaces, and environment settings.

## One-Sentence Definition

A container is a running instance of an image that isolates one or more processes while sharing the host operating system kernel.

## How I Probably Think About It

"A container is the running copy of a packaged service, with its dependencies and settings kept under control."

## Interview Explanation (30 Seconds)

A container is a repeatable way to run an application process. It starts from an image that contains the app, its runtime, and its dependencies. Unlike a virtual machine, it shares the host kernel. That usually makes it faster to start and cheaper to run. It still gets isolation for files, processes, networking, and resource limits. In an interview, I would say containers mostly solve packaging and deployment consistency. They do not remove the need to handle config, secrets, logs, storage, security, or orchestration.

## When To Use It

- Use containers when an application needs a repeatable runtime across environments.
- Use containers when services should be packaged and deployed independently.
- Use containers when dependency versions should be packaged with the application.
- Use containers when multiple services need to run on the same host without mixing their files and dependencies.
- Use containers when a platform will schedule, restart, and scale service instances.
- Use containers when local development should resemble production more closely.

## When NOT To Use It

- Do not use containers just to avoid understanding what the app needs to run.
- Do not put many unrelated services in one container if they have separate lifecycles.
- Do not treat containers as a full security boundary without hardening the host, runtime, and permissions.
- Do not use containers when a simple process or script is enough.
- Do not assume containers remove the need for configuration, logging, monitoring, and patching.
- Do not store important persistent data only in the container's writable layer.

## Alternatives

- Run the application directly on a host when the deployment is simple and stable.
- Use virtual machines when stronger operating system isolation matters more than startup speed and host density.
- Use serverless functions when the platform should manage most runtime and scaling work.
- Use platform-as-a-service hosting when the team wants simpler deployment more than runtime control.
- Use configuration management tools when the main problem is setting up long-lived servers.

## Pros

- Images make runtime dependencies explicit, and containers run them repeatably.
- Containers usually start faster and use fewer resources than virtual machines.
- Containers make packaging and deployment more consistent.
- Containers support independent deployment of services.
- Containers work well with orchestration platforms.
- Containers make local, test, and production environments easier to keep similar.

## Cons

- Containers still share the host kernel, so isolation is not the same as a virtual machine.
- Poorly maintained images can carry vulnerable packages or unnecessary tools.
- Networking, storage, secrets, and observability still need clear design.
- Large images slow down builds, pulls, and deployments.
- Stateful workloads need explicit volumes, backups, and recovery plans.
- Debugging can be harder when the container has very few files or tools.

## Common Interview Questions

- What is a container?
- How is a container different from a virtual machine?
- How is a container different from an image?
- Why are containers useful for deployment?
- What does it mean that containers share the host kernel?
- What should usually run inside one container?
- What are common container security risks?
- How do containers relate to orchestration?

## Related Concepts

- Processes
- Images
- Orchestration
- Kubernetes Basics
- Horizontal Scaling
- Health Checks
- Secrets Management

## What I'd Probably Say Instead

"I would use a container when I want a service to run the same way in development, test, and production. The image contains the app, runtime, and dependencies. The container is the running instance of that image. It is lighter than a virtual machine because it shares the host kernel. It still isolates files, processes, networking, and resource usage. I would still need to handle config, secrets, logs, monitoring, security, and persistent data."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Package the service so it runs the same way | Containerization |
| The running packaged service | Container |
| The template used to start it | Image |
| The machine running it | Host |
| It shares the operating system core | Shared kernel |
| It gets its own process and file view | Namespace isolation |
| Limit CPU and memory use | Resource limits |
| Data disappears when the container is replaced | Ephemeral writable layer |
| Something schedules and restarts it | Orchestration |
