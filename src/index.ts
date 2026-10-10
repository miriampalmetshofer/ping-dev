import { readFile } from "node:fs/promises";

import { runPreflight } from "./preflight.js";
import { parseRepoConfig } from "./repo-config.js";

async function main(): Promise<void> {
  const command = process.argv[2] ?? "repo-info";
  const configPath = process.argv[3] ?? "configs/repos/misi.example.json";

  if (command === "preflight") {
    const result = await runPreflight(configPath);
    process.exitCode = result.ok ? 0 : 1;
    return;
  }

  if (command !== "repo-info") {
    throw new Error(`Unknown command '${command}'. Try 'preflight'.`);
  }

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
