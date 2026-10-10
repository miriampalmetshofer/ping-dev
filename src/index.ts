import { readFile } from "node:fs/promises";

import { parseRepoConfig } from "./repo-config.js";

async function main(): Promise<void> {
  const configPath = process.argv[2] ?? "configs/repos/misi.example.json";
  const rawConfig = await readFile(configPath, "utf8");
  const repo = parseRepoConfig(JSON.parse(rawConfig));

  console.log(`Loaded repo config for ${repo.name}`);
  console.log(`Default branch: ${repo.defaultBranch}`);
  console.log(`Configured checks: ${repo.checks.length}`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
