---
title: "Images"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 2
summary: "An image is a versioned, immutable package used to create containers with the same application files and dependencies."
---

## Problem It Solves

Applications need more than source code to run. They need a runtime, libraries, system packages, files, startup commands, and sometimes default environment settings. If each environment assembles those pieces differently, deployments become hard to repeat.

Images package those runtime pieces into one immutable build artifact. A team can build an image once, push it to a registry, and use the same image digest in test, staging, and production. That makes deployments easier to trace and roll back.

## One-Sentence Definition

An image is an immutable package of filesystem layers, dependencies, metadata, and startup instructions used to create containers.

## How I Probably Think About It

"An image is the saved package for the service. A container is what runs from it."

## Interview Explanation (30 Seconds)

An image is the package you build before you run a container. It usually contains the application, runtime, libraries, filesystem layers, and default startup command. Images should be immutable. If you need a change, build a new image. Images live in a registry. Tags are easy names like `v1.2.3`, but they can move. Digests point to exact image content. The key distinction is simple: the image is the package, and the container is the running instance created from it.

## When To Use It

- Use images when an application needs a repeatable runtime package.
- Use images when the same build artifact should move through test, staging, and production.
- Use images when deployments need clear versions and simple rollback.
- Use images when containers are scheduled by an orchestration platform.
- Use images when dependencies should be pinned instead of installed by hand on each host.
- Use images when building the app and running the app should be separate steps.

## When NOT To Use It

- Do not build a different image for each environment unless the difference really belongs in the package.
- Do not put secrets into an image.
- Do not use movable tags like `latest` in production unless the deployment system resolves them to an exact digest.
- Do not leave extra tools, package caches, or credentials in the final image.
- Do not treat an image scan as a fix. You still need to patch and rebuild.
- Do not store persistent application data inside the image.

## Alternatives

- Install the application directly on a host when the deployment is simple and controlled.
- Use virtual machine images when the full operating system is the deployment unit.
- Use language-specific packages when a platform already provides the runtime.
- Use serverless packages when the cloud platform controls most of the runtime.
- Use configuration management when the main problem is preparing long-lived machines.

## Pros

- Images make application dependencies explicit.
- Images give deployments a clear package to promote and roll back.
- Images help local, test, and production environments stay similar.
- Layered images can make builds and pulls faster when common layers are reused.
- Images work naturally with container registries and orchestration platforms.
- Immutable images reduce drift between hosts.

## Cons

- Large images slow down builds, pulls, scans, and deployments.
- Old base images can carry vulnerable packages.
- Tags can move, so a digest is better proof of exactly what ran.
- Images can leak secrets if credentials are copied during the build.
- Too many image variants make releases harder to understand.
- Minimal images can make debugging harder because common tools may be missing.

## Common Interview Questions

- What is a container image?
- How is an image different from a container?
- Why should images usually be immutable?
- What is a container registry?
- What is the difference between an image tag and an image digest?
- Why do image size and base image choice matter?
- How should secrets be handled when building images?
- How do images support rollback?

## Related Concepts

- Containers
- Orchestration
- Kubernetes Basics
- Rolling Deployments
- Blue/Green Deployments
- Canary Releases
- Secrets Management

## What I'd Probably Say Instead

"I think of an image as the packaged release for a service. It contains the app, runtime, dependencies, filesystem layers, and startup metadata. I build it once, store it in a registry, and start containers from it. In production, I want an exact digest, not only a movable tag. I avoid secrets in the image, keep it small, and rebuild it when the base image needs security updates."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| The packaged release | Image |
| The thing running from the package | Container |
| The place images are stored | Registry |
| A named version like `v1.2.3` | Image tag |
| The exact content identifier | Image digest |
| Reused build pieces | Image layers |
| The starting operating system files | Base image |
| Build it again instead of changing it live | Immutable artifact |
| Promote the same package through environments | Artifact promotion |
