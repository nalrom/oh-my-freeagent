import { describe, expect, test } from "bun:test"
import { STAR_REPOSITORIES, formatGitHubStarCommand, starGitHubRepositories } from "./star-request"

describe("star-request", () => {
  test("formats the legacy GitHub CLI command for manual fallback output", () => {
    // given
    const repository = "nalrom/oh-my-freeagent"

    // when
    const command = formatGitHubStarCommand(repository)

    // then
    expect(command).toBe("gh api --silent --method PUT /user/starred/nalrom/oh-my-freeagent >/dev/null 2>&1 || true")
  })

  test("stars only the OpenCode repository for opencode platform", async () => {
    // given
    const starred: string[] = []

    // when
    const results = await starGitHubRepositories("opencode", async (repository) => {
      starred.push(repository)
    })

    // then
    expect(starred).toEqual(["nalrom/oh-my-freeagent"])
    expect(results).toEqual([{ repository: "nalrom/oh-my-freeagent", ok: true }])
  })

  test("stars both repositories for codex platform (lazycodex is built on oh-my-openagent)", async () => {
    // given
    const starred: string[] = []

    // when
    const results = await starGitHubRepositories("codex", async (repository) => {
      starred.push(repository)
    })

    // then
    expect(starred).toEqual(["nalrom/oh-my-freeagent", "code-yeongyu/lazycodex"])
    expect(results).toEqual([
      { repository: "nalrom/oh-my-freeagent", ok: true },
      { repository: "code-yeongyu/lazycodex", ok: true },
    ])
  })

  test("stars both repositories in STAR_REPOSITORIES order for both platform", async () => {
    // given
    const starred: string[] = []

    // when
    const results = await starGitHubRepositories("both", async (repository) => {
      starred.push(repository)
    })

    // then
    expect(starred).toEqual([...STAR_REPOSITORIES])
    expect(results).toEqual(STAR_REPOSITORIES.map((repository) => ({ repository, ok: true })))
  })

  test("keeps going when one repository cannot be starred", async () => {
    // given
    // when
    const results = await starGitHubRepositories("both", async (repository) => {
      if (repository === "code-yeongyu/lazycodex") throw new Error("gh auth missing")
    })

    // then
    expect(results).toEqual([
      { repository: "nalrom/oh-my-freeagent", ok: true },
      { repository: "code-yeongyu/lazycodex", ok: false, error: "gh auth missing" },
    ])
  })
})
