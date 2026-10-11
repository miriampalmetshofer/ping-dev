# 0005: Evaluate OpenClaw Before Custom Chat Runtime

## Status

Proposed

## Context

The original plan included a custom TypeScript orchestrator for Telegram,
access control, task/session routing, and Codex process management.

OpenClaw appears to provide overlapping infrastructure: a gateway, channel
integrations, plugins, session/runtime concepts, and a Codex harness.

## Decision

Before implementing custom Telegram/session orchestration, evaluate OpenClaw on
the VM.

OpenClaw may replace or shrink the custom orchestrator if it can preserve:

- durable task state
- explicit task-to-session mapping
- branch/worktree/PR metadata
- hard permission boundaries
- Codex authentication flexibility
- Miriam's PR review gate

## Consequences

The next POC work should include an OpenClaw spike. If it works, we avoid
maintaining plumbing that already exists. If it does not work, the existing
custom TypeScript plan remains valid.
