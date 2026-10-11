# Conversational Coding Agent

An always-available coding-agent runner for trusted product stakeholders.

The first target is the `misi` repository, but this repo should stay generic:
repository-specific behavior belongs in repo configs and the target repo's own
`AGENTS.md`.

## Current Goal

Prove that an Oracle Cloud VM can run Codex unattended enough to complete a real
development loop:

1. authenticate Codex on a headless VM
2. clone/build/test the target repo
3. run a Codex task in an isolated worktree
4. commit, push, and create a GitHub PR
5. recover after SSH disconnect or VM reboot

Only after those gates pass should Telegram task routing be built.

## Shape

```text
Telegram later
   |
TypeScript orchestrator
   |
Runner/worktree per task
   |
Codex CLI / app-server
   |
GitHub PR
```

## Repository Layout

```text
src/                    TypeScript skeleton for the orchestrator
configs/repos/          Per-repository runner configuration
docs/                   Architecture, decisions, and POC runbooks
docs/decisions/         Short ADRs for choices agents should preserve
```

## Agent-First Documentation

Agents should read these in order:

1. `AGENTS.md`
2. `docs/architecture.md`
3. `docs/openclaw-evaluation.md`
4. `docs/poc-vm.md`
5. relevant files in `docs/decisions/`

Keep durable context in docs, not hidden chat history. Use decision records only
for choices that would be expensive or confusing to rediscover.

## Local Development

This is intentionally dependency-light until the VM POC proves the runtime.

```bash
npm install
npm run typecheck
npm run preflight
```

No production secrets are required for local typechecking.
