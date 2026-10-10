# AGENTS.md

This project builds a small control plane for coding agents. Agents are first
class citizens here: important context and decisions must be discoverable from
the repository, not from a vanished chat thread.

## Mission

Build a Telegram-facing orchestrator that lets trusted non-developers request
code changes while preserving technical review through GitHub pull requests.

Miriam remains the final technical gatekeeper. The system must not merge,
deploy, or access production data.

## Architectural Principles

- Keep the orchestrator boring: auth, task state, routing, process supervision,
  and GitHub metadata.
- Keep engineering work inside Codex worker runs.
- Keep repository-specific setup in `configs/repos/*.json` and target-repo
  `AGENTS.md` files.
- Prefer isolated worktrees or containers per task.
- Treat prompts and `AGENTS.md` as guidance, not security boundaries.
- Enforce hard permissions outside the model wherever possible.

## Documentation Rules

Durable context belongs in the repo:

- Use `docs/decisions/` for architectural decisions.
- Update `docs/architecture.md` when the system shape changes.
- Update `docs/poc-vm.md` when the VM proof steps change.
- Do not create large narrative logs. Capture only what future agents need.

Decision records should be short:

- status
- context
- decision
- consequences

## Security Rules

Never commit:

- Codex auth files
- Telegram bot tokens
- GitHub tokens or private keys
- production secrets
- copied production data

The agent runner may create feature branches and pull requests. It must not:

- push directly to `main`
- merge pull requests
- deploy production
- modify repository security settings
- access production databases

## Product Interaction

Simon is a product stakeholder, not a developer.

Ask product questions:

- "Should the WhatsApp button appear only when a phone number exists?"
- "Should appointment notes be visible to patients?"

Do not ask implementation questions:

- "Should this use provider X or abstraction Y?"

Escalate to Miriam for decisions involving security, data loss, architecture,
legal/compliance risk, or significant ongoing cost.

## Engineering Expectations

- Make narrow changes.
- Follow existing patterns in target repos.
- Add or update tests for changed business behavior.
- Run configured checks before opening a PR.
- Summarize results in stakeholder language and include technical details in
  the PR body.
