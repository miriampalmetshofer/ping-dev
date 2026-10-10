import { execFile } from "node:child_process";
import { readFile } from "node:fs/promises";
import { promisify } from "node:util";

import { parseRepoConfig } from "./repo-config.js";

const execFileAsync = promisify(execFile);

type CheckStatus = "pass" | "warn" | "fail";

interface CheckResult {
  name: string;
  status: CheckStatus;
  detail: string;
}

interface CommandResult {
  exitCode: number;
  stdout: string;
  stderr: string;
}

export interface PreflightResult {
  ok: boolean;
  checks: CheckResult[];
}

export async function runPreflight(
  configPath: string
): Promise<PreflightResult> {
  const checks: CheckResult[] = [];

  checks.push(await checkCommandVersion("git", ["--version"]));
  checks.push(await checkCommandVersion("node", ["--version"]));
  checks.push(await checkCommandVersion("npm", ["--version"]));
  checks.push(await checkCommandVersion("gh", ["--version"]));
  checks.push(await checkCommandVersion("codex", ["--version"]));
  checks.push(await checkGitHubAuth());
  checks.push(await checkCodexAuth());
  checks.push(await checkRepoConfig(configPath));

  printChecks(checks);

  const ok = checks.every((check) => check.status !== "fail");
  return { ok, checks };
}

async function checkCommandVersion(
  command: string,
  args: string[]
): Promise<CheckResult> {
  const result = await runCommand(command, args);

  if (result.exitCode !== 0) {
    return {
      name: command,
      status: "fail",
      detail: compactOutput(result) || "not available"
    };
  }

  return {
    name: command,
    status: "pass",
    detail: firstLine(result.stdout)
  };
}

async function checkGitHubAuth(): Promise<CheckResult> {
  const result = await runCommand("gh", ["auth", "status"]);

  if (result.exitCode !== 0) {
    return {
      name: "github auth",
      status: "warn",
      detail: compactOutput(result) || "not authenticated"
    };
  }

  return {
    name: "github auth",
    status: "pass",
    detail: firstMatchingLine(result.stdout, "Logged in") ?? "authenticated"
  };
}

async function checkCodexAuth(): Promise<CheckResult> {
  const result = await runCommand("codex", ["login", "status"]);

  if (result.exitCode !== 0) {
    return {
      name: "codex auth",
      status: "warn",
      detail:
        compactOutput(result) ||
        "not authenticated; run 'codex login --device-auth' on the VM"
    };
  }

  return {
    name: "codex auth",
    status: "pass",
    detail: compactOutput(result) || "authenticated"
  };
}

async function checkRepoConfig(configPath: string): Promise<CheckResult> {
  try {
    const rawConfig = await readFile(configPath, "utf8");
    const repo = parseRepoConfig(JSON.parse(rawConfig));

    return {
      name: "repo config",
      status: "pass",
      detail: `${repo.name}: ${repo.checks.length} checks configured`
    };
  } catch (error) {
    return {
      name: "repo config",
      status: "fail",
      detail: error instanceof Error ? error.message : String(error)
    };
  }
}

async function runCommand(
  command: string,
  args: string[]
): Promise<CommandResult> {
  try {
    const { stdout, stderr } = await execFileAsync(command, args, {
      timeout: 10_000
    });

    return { exitCode: 0, stdout, stderr };
  } catch (error) {
    if (isExecError(error)) {
      return {
        exitCode: typeof error.code === "number" ? error.code : 1,
        stdout: error.stdout ?? "",
        stderr: error.stderr ?? error.message
      };
    }

    return {
      exitCode: 1,
      stdout: "",
      stderr: error instanceof Error ? error.message : String(error)
    };
  }
}

function isExecError(error: unknown): error is {
  code?: number | string;
  stdout?: string;
  stderr?: string;
  message: string;
} {
  return typeof error === "object" && error !== null && "message" in error;
}

function printChecks(checks: CheckResult[]): void {
  const nameWidth = Math.max(...checks.map((check) => check.name.length));

  for (const check of checks) {
    const marker = statusMarker(check.status);
    const name = check.name.padEnd(nameWidth, " ");

    console.log(`${marker} ${name}  ${check.detail}`);
  }
}

function statusMarker(status: CheckStatus): string {
  if (status === "pass") {
    return "PASS";
  }

  if (status === "warn") {
    return "WARN";
  }

  return "FAIL";
}

function firstLine(value: string): string {
  return value.trim().split("\n")[0] ?? "";
}

function firstMatchingLine(value: string, pattern: string): string | undefined {
  return value
    .split("\n")
    .map((line) => line.trim())
    .find((line) => line.includes(pattern));
}

function compactOutput(result: CommandResult): string {
  return `${result.stdout}\n${result.stderr}`
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .join(" ");
}
