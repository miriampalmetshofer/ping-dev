# 0003: Use Repo Configs for Target Repositories

## Status

Accepted

## Context

The first target repo is `misi`, but the orchestrator should work with other
repos later.

## Decision

Keep target-repo details in `configs/repos/*.json`.

The orchestrator reads:

- clone URL
- default branch
- install command
- check commands
- allowed environment variables
- target repo agent instruction path

## Consequences

The orchestrator remains generic. Each target repo still needs accurate local
instructions and checks.
