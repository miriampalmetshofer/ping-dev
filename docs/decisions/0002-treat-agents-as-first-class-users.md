# 0002: Treat Agents as First-Class Users

## Status

Accepted

## Context

Future agents need reliable project context without depending on long chat
history. Too much documentation becomes stale; too little causes rediscovery.

## Decision

Keep a small, intentional documentation set:

- `AGENTS.md` for operating rules
- `docs/architecture.md` for the current system shape
- `docs/poc-vm.md` for the active proof plan
- `docs/decisions/` for durable decisions
- concise task events for runtime history

## Consequences

Agents can quickly orient themselves. Maintainers must update docs when choices
change, but only decisions with future impact need ADRs.
