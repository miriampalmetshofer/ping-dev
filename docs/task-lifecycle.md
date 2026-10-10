# Task Lifecycle

## States

```text
NEW
  -> CLARIFYING
  -> READY
  -> IMPLEMENTING
  -> TESTING
  -> PR_CREATED
  -> CHANGES_REQUESTED
  -> IMPLEMENTING
  -> PR_UPDATED
  -> DONE
```

Failure/recovery states:

```text
IMPLEMENTING -> INTERRUPTED_NEEDS_RESUME
TESTING      -> INTERRUPTED_NEEDS_RESUME
any          -> FAILED
```

## Completion Is Not Just Text

The agent may say "done", but the orchestrator should verify durable facts:

- branch exists
- commit exists
- worktree is clean or intentionally dirty
- configured checks ran or failures are recorded
- PR exists when the task requires one
- task event summary exists

## Minimal Event Log

Store concise events, not giant transcripts:

```text
USER_MESSAGE: Simon requested WhatsApp button for patients.
AGENT_MESSAGE: Asked whether to prefill a message.
STATUS_CHANGED: READY -> IMPLEMENTING.
RUN_FINISHED: Checks passed; commit abc123 created.
PR_CREATED: https://github.com/.../pull/42
```

The event log is for recovery, audit, and future agents.
