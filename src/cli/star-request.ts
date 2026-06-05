import { execFile } from "node:child_process"
import { promisify } from "node:util"
import type { InstallPlatform } from "./types"

/**
 * Star request for GitHub repositories during installation.
 * This project is a fork inspired by
 * {@link https://github.com/code-yeongyu/oh-my-openagent code-yeongyu/oh-my-openagent}.
 */
export const STAR_REPOSITORIES = [
  "nalrom/oh-my-freeagent",
  "code-yeongyu/lazycodex",
] as const

const PLATFORM_REPOSITORIES = {
  opencode: ["nalrom/oh-my-freeagent"],
  codex: STAR_REPOSITORIES,
  both: STAR_REPOSITORIES,
} as const satisfies Record<InstallPlatform, readonly string[]>

const execFileAsync = promisify(execFile)

export interface GitHubStarResult {
  readonly repository: string
  readonly ok: boolean
  readonly error?: string
}

export type GitHubStarCommandRunner = (repository: string) => Promise<void>

export function formatGitHubStarCommand(repository: string): string {
  return `gh api --silent --method PUT /user/starred/${repository} >/dev/null 2>&1 || true`
}

export async function runGitHubStarCommand(repository: string): Promise<void> {
  await execFileAsync("gh", ["api", "--silent", "--method", "PUT", `/user/starred/${repository}`])
}

export async function starGitHubRepositories(
  platform: InstallPlatform = "both",
  runCommand: GitHubStarCommandRunner = runGitHubStarCommand,
): Promise<readonly GitHubStarResult[]> {
  const results: GitHubStarResult[] = []
  for (const repository of PLATFORM_REPOSITORIES[platform]) {
    try {
      await runCommand(repository)
      results.push({ repository, ok: true })
    } catch (error) {
      results.push({ repository, ok: false, error: error instanceof Error ? error.message : String(error) })
    }
  }
  return results
}
