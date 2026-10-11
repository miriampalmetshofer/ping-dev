# OpenClaw Evaluation

OpenClaw is a candidate runtime/channel layer for this project.

## Why It Matters

The original architecture proposed a custom TypeScript orchestrator for:

- Telegram integration
- access control
- session mapping
- agent runtime supervision
- Codex process management

OpenClaw appears to already provide parts of this surface, including chat
channels, a gateway, plugins, session/runtime concepts, and a Codex harness.

## What We Should Not Outsource Blindly

This project still needs its own product and safety boundaries:

- Simon can request product changes.
- Miriam keeps final merge authority.
- every coding task has durable state
- every code change exits through a GitHub PR
- production secrets and deploy permissions stay outside the runner
- task/PR history remains inspectable without relying on hidden chat state

If OpenClaw hides these concerns, it is the wrong abstraction for the core
control plane.

## Evaluation Questions

### Runtime

- Does OpenClaw run on the Oracle ARM VM?
- What Node.js version does it require?
- Can it run under `systemd` after reboot?
- Can it survive SSH disconnects?

### Telegram

- Can it use a Telegram bot account?
- Can access be restricted to Simon and Miriam by immutable Telegram IDs?
- Can task creation and task continuation be made unambiguous?
- Can it route messages into one session per product task?

### Codex

- Can the Codex harness use device-authenticated Codex CLI state?
- Can it use API-key or access-token auth later without redesign?
- Can it expose enough structured state to detect:
  - clarification needed
  - run in progress
  - run failed
  - PR ready

### Task State

- Can we attach external task IDs to OpenClaw sessions?
- Can we persist branch, worktree, PR URL, and run status in our own DB?
- Can interrupted runs be resumed or marked clearly?

### Security

- Can dangerous actions be blocked outside model prompts?
- Can runner environment variables be allowlisted?
- Can production secrets be kept out of agent workspaces?
- Can GitHub credentials be scoped to branches and PRs only?

## Possible Outcomes

### Adopt OpenClaw As The Runtime

Use OpenClaw for Telegram, session routing, Codex harness, and runtime
supervision. Keep this project focused on task policy, repo config, and GitHub
PR workflow.

### Use OpenClaw Only For Codex Harnessing

Keep our TypeScript Telegram/task orchestrator, but call into OpenClaw for
Codex session execution.

### Do Not Adopt OpenClaw

Continue with the custom TypeScript orchestrator if OpenClaw is too heavy,
opaque, incompatible with the VM, or unable to preserve our task/PR boundaries.

## Initial Bias

Evaluate OpenClaw before writing custom Telegram/session plumbing.

Do not commit to OpenClaw until the VM proves:

- OpenClaw starts cleanly
- Telegram access control is understandable
- Codex auth works through its harness
- task-to-session mapping can be made durable
- our PR gate remains explicit
