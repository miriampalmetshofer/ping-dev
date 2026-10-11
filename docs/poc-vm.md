# VM Proof of Concept

The first milestone is not Telegram. It is proving that Codex can run reliably
on the VM and complete a reviewable development loop.

## Gate 1: VM Baseline

On the Oracle VM:

```bash
npm install
npm run preflight
```

Clone this orchestrator repo and the target repo.

## Gate 2: OpenClaw Evaluation

Before building custom Telegram/session orchestration, check whether OpenClaw
can own that layer.

Evaluate:

- Can OpenClaw run reliably on the Oracle ARM VM?
- Does its Telegram channel support the access-control behavior we need?
- Can its Codex harness use the same Codex authentication we prove below?
- Can one product task map to one durable OpenClaw session or thread?
- Can we attach our own task IDs, branch names, and PR URLs?
- Can we enforce "no merge, no deploy, no production secrets" outside prompts?
- Does adopting OpenClaw reduce code we maintain without hiding critical state?

Success means OpenClaw becomes the preferred runtime/channel layer. Failure
means we continue with the custom TypeScript orchestrator.

## Gate 3: Codex Authentication

Try the least surprising supported mode first.

For device auth:

```bash
codex login --device-auth
codex login status
codex exec --json "Say only: codex auth works"
```

Then reboot:

```bash
sudo reboot
```

After reconnecting:

```bash
codex login status
codex exec --json "Say only: codex auth survived reboot"
```

Record the result in `docs/decisions/` if it changes the architecture.

## Gate 4: Target Repo Build

For `misi`, run the commands from `configs/repos/misi.example.json`.

Success means:

- dependencies install on ARM Linux
- lint passes
- tests pass
- build passes

If a command differs on the VM, update the repo config instead of hardcoding it
in source.

## Gate 5: Manual Codex Development Loop

In a clean worktree, ask Codex to make a small real change.

Required result:

- branch created
- code changed
- relevant checks run
- commit created
- no direct push to `main`

## Gate 6: PR Creation

Extend the loop:

- push the branch
- create a GitHub PR
- include human-readable summary and test results

## Gate 7: Disconnect and Recovery

Start a task, disconnect SSH, and reconnect later.

Then test reboot behavior. A task interrupted by reboot must be visible in
durable state and either resumable or clearly marked as interrupted.

## Gate 8: Programmatic Invocation

Only after manual CLI operation works, add a tiny TypeScript runner that can:

- start a Codex run
- capture JSONL/events
- detect question/completion/failure
- persist run status

Do not add custom Telegram handling before this gate passes. If OpenClaw passes
Gate 2, build the first Telegram slice through OpenClaw instead.
