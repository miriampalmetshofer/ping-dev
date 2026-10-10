# 0004: Use Pull Requests as the Technical Gate

## Status

Accepted

## Context

Trusted stakeholders should be able to request changes, but Miriam must remain
the final technical gatekeeper.

## Decision

The runner may create branches, commits, pushes, and pull requests. It must not
merge PRs, push to `main`, deploy production, or access production data.

## Consequences

GitHub review remains the boundary between generated work and production code.
Branch protection and credentials must enforce this outside the model.
