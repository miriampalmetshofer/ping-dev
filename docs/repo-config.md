# Repository Configuration

The orchestrator should support multiple repos without knowing their internals.

Each repo config should answer:

- where to clone from
- which default branch to branch from
- where repo-specific agent instructions live
- how to install dependencies
- which checks prove a change is reviewable
- which environment variables are allowed in the runner

Example:

```json
{
  "name": "misi",
  "remoteUrl": "git@github.com:miriampalmetshofer/misi.git",
  "defaultBranch": "main",
  "agentInstructionsPath": "AGENTS.md",
  "install": "mise exec -- npm install",
  "checks": [
    "mise exec -- npm run lint",
    "mise exec -- npm run test",
    "mise exec -- npm run build"
  ],
  "allowedEnvironment": ["CODEX_API_KEY", "CODEX_ACCESS_TOKEN", "GITHUB_TOKEN"]
}
```

Prefer changing config over changing orchestrator code when adding a repo.
