export interface RepoConfig {
  name: string;
  remoteUrl: string;
  defaultBranch: string;
  agentInstructionsPath: string;
  install?: string;
  checks: string[];
  allowedEnvironment: string[];
}

export function parseRepoConfig(value: unknown): RepoConfig {
  if (!isObject(value)) {
    throw new Error("Repo config must be an object.");
  }

  return {
    name: readString(value, "name"),
    remoteUrl: readString(value, "remoteUrl"),
    defaultBranch: readString(value, "defaultBranch"),
    agentInstructionsPath: readString(value, "agentInstructionsPath"),
    install: readOptionalString(value, "install"),
    checks: readStringArray(value, "checks"),
    allowedEnvironment: readStringArray(value, "allowedEnvironment")
  };
}

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function readString(source: Record<string, unknown>, key: string): string {
  const value = source[key];

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Repo config field '${key}' must be a non-empty string.`);
  }

  return value;
}

function readOptionalString(
  source: Record<string, unknown>,
  key: string
): string | undefined {
  const value = source[key];

  if (value === undefined) {
    return undefined;
  }

  if (typeof value !== "string" || value.length === 0) {
    throw new Error(`Repo config field '${key}' must be a non-empty string.`);
  }

  return value;
}

function readStringArray(source: Record<string, unknown>, key: string): string[] {
  const value = source[key];

  if (
    !Array.isArray(value) ||
    value.some((item) => typeof item !== "string" || item.length === 0)
  ) {
    throw new Error(`Repo config field '${key}' must be an array of strings.`);
  }

  return value;
}
