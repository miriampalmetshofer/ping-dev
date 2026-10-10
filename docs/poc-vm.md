# VM Proof of Concept

The first milestone is not Telegram. It is proving that Codex can run reliably
on the VM and complete a reviewable development loop.

## Gate 1: VM Baseline

On the Oracle VM:

```bash
git --version
node --version
npm --version
gh --version
codex --version
```

Clone this orchestrator repo and the target repo.

## Gate 2: Codex Authentication

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

## Gate 3: Target Repo Build

For `misi`, run the commands from `configs/repos/misi.example.json`.

Success means:

- dependencies install on ARM Linux
- lint passes
- tests pass
- build passes

If a command differs on the VM, update the repo config instead of hardcoding it
in source.

## Gate 4: Manual Codex Development Loop

In a clean worktree, ask Codex to make a small real change.

Required result:

- branch created
- code changed
- relevant checks run
- commit created
- no direct push to `main`

## Gate 5: PR Creation

Extend the loop:

- push the branch
- create a GitHub PR
- include human-readable summary and test results

## Gate 6: Disconnect and Recovery

Start a task, disconnect SSH, and reconnect later.

Then test reboot behavior. A task interrupted by reboot must be visible in
durable state and either resumable or clearly marked as interrupted.

## Gate 7: Programmatic Invocation

Only after manual CLI operation works, add a tiny TypeScript runner that can:

- start a Codex run
- capture JSONL/events
- detect question/completion/failure
- persist run status

Do not add Telegram before this gate passes.
