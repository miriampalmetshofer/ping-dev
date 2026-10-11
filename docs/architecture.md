# Architecture

## Status

Draft for VM proof of concept.

## Components

### Candidate: OpenClaw Gateway

OpenClaw may cover parts of the control plane:

- Telegram channel integration
- user/session routing
- Codex harness integration
- agent workspace/session management
- plugin-based extension points

This is promising, but not yet accepted as the system architecture. The
project-specific requirements remain:

- one product task maps to one durable task record
- Miriam remains the technical gatekeeper
- generated work exits through GitHub pull requests
- permissions are enforced outside model prompts
- repository-specific behavior stays in repo config and target-repo
  instructions

If OpenClaw is adopted, this project should become either a thin OpenClaw
plugin/config layer or a companion service that owns task policy and GitHub PR
state while delegating chat/runtime mechanics to OpenClaw.

### TypeScript Orchestrator

Owns:

- Telegram integration, once added
- authorized users and roles
- task state
- repo config selection
- process supervision
- run recovery after restart
- GitHub PR metadata

It should not make implementation decisions for target repos.

If OpenClaw satisfies the channel/session/runtime requirements, this component
should shrink rather than duplicate OpenClaw features.

### Runner

Owns one task attempt at a time:

- creates or resumes a worktree
- starts Codex with the right working directory and environment
- captures structured output
- records whether the run completed, failed, or was interrupted

For the POC the runner may be a native process. For real use, per-task
containers should be evaluated.

### Codex Worker

Owns software engineering inside a target repo:

- inspect code
- ask clarification questions when needed
- edit files
- run configured checks
- create commits
- prepare PR summary

### Target Repository

Each target repo should provide its own `AGENTS.md`. The orchestrator should
load repo config but not hardcode repo-specific architecture.

## State Model

Task state must be durable. A reboot should not erase what the system knows.

Minimum durable records:

- users
- repos
- tasks
- task events
- runs
- pull request URLs

Agent chat transcripts are useful but not sufficient. The orchestrator should
record concise task events so a future agent can reconstruct what happened.

## Security Boundary

`AGENTS.md` is guidance, not enforcement.

Hard enforcement belongs in:

- Telegram role checks
- branch protection
- GitHub App or scoped token permissions
- restricted runner environment
- absence of production secrets
- process/container isolation
