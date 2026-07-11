---
title: "Health Checks"
level: "Explain the concept"
volume: "05-cloud-infrastructure"
order: 10
summary: "Health checks tell infrastructure whether a service instance is alive, ready for traffic, or still starting."
---

## Problem It Solves

Infrastructure needs a way to decide whether a service instance should receive traffic or be restarted. A process can be running but still be unable to serve requests. It might still be starting. It might be waiting for a database connection. It might be stuck or overloaded.

Health checks give load balancers and orchestration platforms simple signals. A readiness check controls whether an instance gets traffic. A liveness check controls whether the platform should restart it. A startup check gives a slow-starting service more time before liveness checks begin.

## One-Sentence Definition

A health check is a small test that infrastructure uses to decide whether a service instance is alive, ready for traffic, or still starting.

## How I Probably Think About It

"Check whether this copy of the service should get traffic or be restarted."

## Interview Explanation (30 Seconds)

Health checks tell the platform what to do with a service instance. Readiness answers, "Can this instance get traffic now?" Liveness answers, "Is this process stuck enough that restarting it is better than waiting?" Startup checks give slow services time to finish booting before liveness checks begin. Each check should match the action it controls. A readiness failure should remove the instance from traffic. A liveness failure may restart it. Mixing those up can cause outages.

## When To Use It

- Use readiness checks when a load balancer needs to know which instances can receive traffic.
- Use liveness checks when an orchestration platform should restart stuck instances.
- Use readiness checks when a service needs time to warm up before serving requests.
- Use liveness checks when a process can get stuck in a state where restart is the best recovery.
- Use startup checks when boot time can take longer than normal liveness limits.
- Use health checks during deployments so new instances receive traffic only after they are ready.

## When NOT To Use It

- Do not make every dependency failure a liveness failure. That usually belongs in readiness.
- Do not restart an instance just because one downstream service is slow.
- Do not use health checks that are expensive enough to create real load.
- Do not use checks that pass before the service can actually serve traffic.
- Do not rely only on health checks for correctness, monitoring, or alerting.
- Do not make checks so strict that a temporary problem restarts the whole fleet.

## Alternatives

- Use monitoring and alerts when humans need to know why the service is unhealthy.
- Use circuit breakers to stop callers from repeatedly hitting a failing dependency.
- Use autoscaling when the problem is not broken instances but not enough capacity.
- Use graceful shutdown so an instance stops receiving new traffic before it exits.
- Use deployment rollback when many new instances fail after a release.
- Fix the instance by hand when automatic restart would make the problem worse.

## Pros

- Readiness checks keep traffic away from instances that are not ready.
- Liveness checks help orchestration platforms recover from stuck or crashed instances.
- They make rolling deployments and canary releases safer.
- They give load balancers a clear signal for removing bad targets.
- They reduce hands-on work for simple failures.
- They can catch startup and warm-up problems before users hit them.

## Cons

- A bad health check can make a healthy instance look broken.
- A shallow readiness check can let broken instances keep receiving traffic.
- Checks that include too many dependencies can cause restart loops.
- Checks that are too slow or too frequent can add load.
- Health checks do not explain why a service is unhealthy.
- They can hide deeper problems if the platform keeps restarting instances and nobody investigates.

## Common Interview Questions

- What is a health check?
- What is the difference between liveness and readiness?
- What should go into a readiness check?
- What should go into a liveness check?
- Why can a bad health check cause an outage?
- How do health checks support rolling deployments?
- Should a health check call the database or downstream services?
- How would you design health checks for a web API?

## Related Concepts

- Load Balancing
- Orchestration
- Kubernetes Basics
- Rolling Deployments
- Canary Releases
- Blue/Green Deployments
- Circuit Breaker
- Monitoring

## What I'd Probably Say Instead

"I think of health checks as the service telling the platform what action is safe. Readiness means this instance can get traffic now. Liveness means the process is stuck enough that a restart is probably the best recovery. Startup checks handle slow boot time. The key is not mixing them up. If a database is briefly slow, this instance may need to stop receiving traffic, but the process may not need a restart."

## Vocabulary Mapping

| I naturally think... | Interview terminology |
| --- | --- |
| Should this instance get traffic? | Readiness check |
| Is this process stuck? | Liveness check |
| Give it more time to start | Startup check |
| Stop sending requests here | Remove from rotation |
| The check passes | Healthy |
| The check fails | Unhealthy |
| Keep restarting the same instance | Restart loop |
| Stop traffic before shutdown | Graceful shutdown |
