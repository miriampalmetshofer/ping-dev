# 0001: Prove Codex Runtime Before Telegram

## Status

Accepted

## Context

The desired product experience is a Telegram bot that can receive product
requests, let Codex implement code changes, and create GitHub PRs.

The largest unknown is whether Codex can run unattended on an Oracle Cloud VM
with an acceptable authentication and cost model.

## Decision

Build the project in POC order:

1. VM runtime
2. Codex authentication
3. target repo build/test
4. manual Codex branch/commit/PR loop
5. programmatic TypeScript invocation
6. Telegram integration

## Consequences

This delays visible UX work, but prevents building orchestration around an
unsupported or unreliable Codex runtime.
