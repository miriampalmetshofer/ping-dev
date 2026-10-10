# Architecture

## Status

Draft for VM proof of concept.

## Components

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
