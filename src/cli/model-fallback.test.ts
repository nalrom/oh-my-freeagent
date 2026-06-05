/// <reference types="bun-types" />

import { describe, expect, test } from "bun:test"

import { generateModelConfig } from "./model-fallback"
import type { InstallConfig } from "./types"

function createConfig(overrides: Partial<InstallConfig> = {}): InstallConfig {
  return {
    platform: "opencode",
    hasOpenCode: true,
    hasCodex: false,
    codexAutonomous: false,
    hasClaude: false,
    isMax20: false,
    hasOpenAI: false,
    hasGemini: false,
    hasCopilot: false,
    hasOpencodeZen: false,
    hasZaiCodingPlan: false,
    hasKimiForCoding: false,
    hasOpencodeGo: false,
      hasBailianCodingPlan: false,
    hasMinimaxCnCodingPlan: false,
    hasMinimaxCodingPlan: false,
    hasVercelAiGateway: false,
    ...overrides,
  }
}

describe("generateModelConfig", () => {
  describe("no providers available", () => {
    test("returns ULTIMATE_FALLBACK for all agents and categories when no providers", () => {
      // #given no providers are available
      const config = createConfig()

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use ULTIMATE_FALLBACK for everything
      expect(result).toMatchSnapshot()
    })
  })

  describe("single native provider", () => {
    test("uses Claude models when only Claude is available", () => {
      // #given only Claude is available
      const config = createConfig({ hasClaude: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use Claude models per NATIVE_FALLBACK_CHAINS
      expect(result).toMatchSnapshot()
    })

    test("uses Claude models with isMax20 flag", () => {
      // #given Claude is available with Max 20 plan
      const config = createConfig({ hasClaude: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models for Sisyphus
      expect(result).toMatchSnapshot()
    })

    test("uses OpenAI models when only OpenAI is available", () => {
      // #given only OpenAI is available
      const config = createConfig({ hasOpenAI: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use OpenAI models
      expect(result).toMatchSnapshot()
    })

    test("uses OpenAI models with isMax20 flag", () => {
      // #given OpenAI is available with Max 20 plan
      const config = createConfig({ hasOpenAI: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })

    test("uses Gemini models when only Gemini is available", () => {
      // #given only Gemini is available
      const config = createConfig({ hasGemini: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use Gemini models
      expect(result).toMatchSnapshot()
    })

    test("uses Gemini models with isMax20 flag", () => {
      // #given Gemini is available with Max 20 plan
      const config = createConfig({ hasGemini: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })
  })

  describe("all native providers", () => {
    test("uses preferred models from fallback chains when all natives available", () => {
      // #given all native providers are available
      const config = createConfig({
        hasClaude: true,
        hasOpenAI: true,
        hasGemini: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use first provider in each fallback chain
      expect(result).toMatchSnapshot()
    })

    test("uses preferred models with isMax20 flag when all natives available", () => {
      // #given all native providers are available with Max 20 plan
      const config = createConfig({
        hasClaude: true,
        hasOpenAI: true,
        hasGemini: true,
        isMax20: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })
  })

  describe("fallback providers", () => {
    test("uses OpenCode Zen models when only OpenCode Zen is available", () => {
      // #given only OpenCode Zen is available
      const config = createConfig({ hasOpencodeZen: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use OPENCODE_ZEN_MODELS
      expect(result).toMatchSnapshot()
    })

    test("uses OpenCode Zen models with isMax20 flag", () => {
      // #given OpenCode Zen is available with Max 20 plan
      const config = createConfig({ hasOpencodeZen: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })

    test("uses GitHub Copilot models when only Copilot is available", () => {
      // #given only GitHub Copilot is available
      const config = createConfig({ hasCopilot: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use GITHUB_COPILOT_MODELS
      expect(result).toMatchSnapshot()
    })

    test("uses GitHub Copilot models with isMax20 flag", () => {
      // #given GitHub Copilot is available with Max 20 plan
      const config = createConfig({ hasCopilot: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })

    test("omits librarian when only ZAI is available", () => {
      // #given only ZAI is available
      const config = createConfig({ hasZaiCodingPlan: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian should not use a stale ZAI special case
      expect(result.agents?.librarian).toBeUndefined()
      expect(JSON.stringify(result)).not.toContain("zai-coding-plan/glm-4.7")
    })

    test("omits librarian when only ZAI is available with isMax20 flag", () => {
      // #given ZAI is available with Max 20 plan
      const config = createConfig({ hasZaiCodingPlan: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian should not use a stale ZAI special case
      expect(result.agents?.librarian).toBeUndefined()
      expect(JSON.stringify(result)).not.toContain("zai-coding-plan/glm-4.7")
    })

    test("uses Bailian Qwen for utility agents when only Bailian is available", () => {
      // #given only Bailian Coding Plan is available
      const config = createConfig({ hasBailianCodingPlan: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then Bailian is limited to compatible utility routes
      expect(result.agents?.librarian?.model).toBeUndefined()
      expect(result.agents?.explore?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.agents?.hephaestus?.model).toBe("opencode/mimo-v2.5-free")
    })
  })

  describe("mixed provider scenarios", () => {
    test("uses Claude + OpenCode Zen combination", () => {
      // #given Claude and OpenCode Zen are available
      const config = createConfig({
        hasClaude: true,
        hasOpencodeZen: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should prefer Claude (native) over OpenCode Zen
      expect(result).toMatchSnapshot()
    })

    test("uses OpenAI + Copilot combination", () => {
      // #given OpenAI and Copilot are available
      const config = createConfig({
        hasOpenAI: true,
        hasCopilot: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should prefer OpenAI (native) over Copilot
      expect(result).toMatchSnapshot()
    })

    test("uses Claude + ZAI combination with librarian on Claude fallback", () => {
      // #given Claude and ZAI are available
      const config = createConfig({
        hasClaude: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian should follow its Claude fallback chain
      expect(result).toMatchSnapshot()
    })

    test("uses Gemini + Claude combination (explore uses Gemini)", () => {
      // #given Gemini and Claude are available
      const config = createConfig({
        hasGemini: true,
        hasClaude: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore should use Gemini flash
      expect(result).toMatchSnapshot()
    })

    test("uses all fallback providers together", () => {
      // #given all fallback providers are available
      const config = createConfig({
        hasOpencodeZen: true,
        hasCopilot: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should prefer OpenCode Zen and keep ZAI as fallback-only
      expect(result).toMatchSnapshot()
    })

    test("librarian skips deprecated OpenCode Zen models when OpenCode Zen and ZAI are both available", () => {
      // #given the Discord-reported non-TUI provider selection
      const config = createConfig({
        hasOpencodeZen: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian should route through free model chain
      expect(result.agents?.librarian?.model).toBe("opencode/minimax-m3-free")
      expect(JSON.stringify(result)).not.toContain("zai-coding-plan/glm-4.7")
      expect(JSON.stringify(result)).not.toContain("opencode/claude-haiku-4-5")
      expect(JSON.stringify(result)).not.toContain("opencode/gpt-5.4-nano")
    })

    test("uses all providers together", () => {
      // #given all providers are available
      const config = createConfig({
        hasClaude: true,
        hasOpenAI: true,
        hasGemini: true,
        hasOpencodeZen: true,
        hasCopilot: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should prefer native providers and keep ZAI as fallback-only
      expect(result).toMatchSnapshot()
    })

    test("uses all providers with isMax20 flag", () => {
      // #given all providers are available with Max 20 plan
      const config = createConfig({
        hasClaude: true,
        hasOpenAI: true,
        hasGemini: true,
        hasOpencodeZen: true,
        hasCopilot: true,
        hasZaiCodingPlan: true,
        isMax20: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models
      expect(result).toMatchSnapshot()
    })
  })

  describe("explore agent special cases", () => {
    test("explore uses gpt-5-nano when only Gemini available (no Claude)", () => {
      // #given only Gemini is available (no Claude)
      const config = createConfig({ hasGemini: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore should use mimo-v2.5-free
      expect(result.agents?.explore?.model).toBe("opencode/mimo-v2.5-free")
    })

    test("explore uses Claude haiku when Claude available", () => {
      // #given Claude is available
      const config = createConfig({ hasClaude: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore should use claude-haiku-4-5
      expect(result.agents?.explore?.model).toBe("anthropic/claude-haiku-4-5")
    })

    test("explore uses Claude haiku regardless of isMax20 flag", () => {
      // #given Claude is available without Max 20 plan
      const config = createConfig({ hasClaude: true, isMax20: false })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore should use claude-haiku-4-5 (isMax20 doesn't affect explore)
      expect(result.agents?.explore?.model).toBe("anthropic/claude-haiku-4-5")
    })

    test("explore uses OpenAI model when only OpenAI available", () => {
      // #given only OpenAI is available
      const config = createConfig({ hasOpenAI: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore should use native OpenAI mini-fast (primary model)
      expect(result.agents?.explore?.model).toBe("openai/gpt-5.4-mini-fast")
      expect(result.agents?.explore?.variant).toBeUndefined()
    })

    test("explore uses gpt-5-mini when only Copilot available", () => {
      // #given only Copilot is available
      const config = createConfig({ hasCopilot: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore should use gpt-5-mini (Copilot fallback)
      expect(result.agents?.explore?.model).toBe("github-copilot/gpt-5-mini")
    })
  })

  describe("Sisyphus agent special cases", () => {
    test("Sisyphus is created when at least one opencode provider is available (Claude alone is insufficient)", () => {
      // #given Claude but no opencodeZen
      const config = createConfig({ hasClaude: true, isMax20: true })

      // #when
      const result = generateModelConfig(config)

      // #then Sisyphus requires opencode provider
      expect(result.agents?.sisyphus).toBeUndefined()
    })

    test("Sisyphus resolves to free model when multiple fallback providers are available with opencodeZen", () => {
      // #given
      const config = createConfig({
        hasClaude: true,
        hasKimiForCoding: true,
        hasOpencodeZen: true,
        hasZaiCodingPlan: true,
        isMax20: true,
      })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.sisyphus?.model).toBe("opencode/deepseek-v4-flash-free")
    })

    test("Sisyphus is not created when only OpenAI is available", () => {
      // #given
      const config = createConfig({ hasOpenAI: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.sisyphus).toBeUndefined()
    })
  })

  describe("OpenAI fallback coverage", () => {
    test("Atlas resolves to free fallback when only OpenAI is available", () => {
      // #given
      const config = createConfig({ hasOpenAI: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.atlas?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.agents?.atlas?.variant).toBeUndefined()
    })

    test("Metis resolves to free fallback when only OpenAI is available", () => {
      // #given
      const config = createConfig({ hasOpenAI: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.metis?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.agents?.metis?.variant).toBeUndefined()
    })

    test("Sisyphus-Junior resolves to free fallback when only OpenAI is available", () => {
      // #given
      const config = createConfig({ hasOpenAI: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.["sisyphus-junior"]?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.agents?.["sisyphus-junior"]?.variant).toBeUndefined()
    })
  })

  describe("Hephaestus agent special cases", () => {
    test("Hephaestus resolves to free fallback when only OpenAI is available", () => {
      // #given
      const config = createConfig({ hasOpenAI: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.agents?.hephaestus?.variant).toBeUndefined()
    })

    test("Hephaestus resolves to free fallback when only Copilot is available", () => {
      // #given
      const config = createConfig({ hasCopilot: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus).toEqual({
        model: "opencode/mimo-v2.5-free",
      })
    })

    test("Hephaestus resolves to deepseek-v4-flash-free when OpenCode Zen is available", () => {
      // #given
      const config = createConfig({ hasOpencodeZen: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus?.model).toBe("opencode/deepseek-v4-flash-free")
      expect(result.agents?.hephaestus?.variant).toBeUndefined()
    })

    test("Hephaestus resolves to free fallback when only Claude is available", () => {
      // #given
      const config = createConfig({ hasClaude: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus?.model).toBe("opencode/mimo-v2.5-free")
    })

    test("Hephaestus resolves to free fallback when only Gemini is available", () => {
      // #given
      const config = createConfig({ hasGemini: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus?.model).toBe("opencode/mimo-v2.5-free")
    })

    test("Hephaestus resolves to free fallback when only ZAI is available", () => {
      // #given
      const config = createConfig({ hasZaiCodingPlan: true })

      // #when
      const result = generateModelConfig(config)

      // #then
      expect(result.agents?.hephaestus?.model).toBe("opencode/mimo-v2.5-free")
    })
  })

  describe("librarian agent special cases", () => {
    test("librarian is undefined when ZAI and Claude are available but no opencode provider", () => {
      // #given ZAI and Claude are available (no opencodeZen)
      const config = createConfig({
        hasClaude: true,
        hasZaiCodingPlan: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian requires opencode provider
      expect(result.agents?.librarian?.model).toBeUndefined()
      expect(JSON.stringify(result)).not.toContain("zai-coding-plan/glm-4.7")
    })

    test("librarian is undefined when only Claude is available", () => {
      // #given only Claude is available (no opencode provider)
      const config = createConfig({ hasClaude: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian requires opencode provider
      expect(result.agents?.librarian?.model).toBeUndefined()
    })
  })

  describe("special-case agents include fallback_models", () => {
    test("explore uses openai model but no fallback_models when OpenAI and Claude are both available", () => {
      // #given both OpenAI and Claude are available (no opencode provider)
      const config = createConfig({ hasOpenAI: true, hasClaude: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore has no fallback_models since only opencode entries in chain are unavailable
      expect(result.agents?.explore?.model).toBe("openai/gpt-5.4-mini-fast")
      expect(result.agents?.explore?.fallback_models).toBeUndefined()
    })

    test("explore omits fallback_models when only one provider matches chain entries", () => {
      // #given only Claude is available
      const config = createConfig({ hasClaude: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore should not have fallback_models (only one distinct chain entry matches)
      expect(result.agents?.explore?.model).toBe("anthropic/claude-haiku-4-5")
      expect(result.agents?.explore?.fallback_models).toBeUndefined()
    })

    test("explore uses mimo-v2.5-free when only OpenCode Zen is available", () => {
      // #given only OpenCode Zen is available
      const config = createConfig({ hasOpencodeZen: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then Explore uses free model
      expect(result.agents?.explore?.model).toBe("opencode/mimo-v2.5-free")
      expect(JSON.stringify(result)).not.toContain("opencode/claude-haiku-4-5")
      expect(JSON.stringify(result)).not.toContain("opencode/gpt-5.4-nano")
    })

    test("generated config never routes deprecated fallback IDs through opencode", () => {
      // #given every provider family is available
      const config = createConfig({
        hasOpenAI: true,
        hasClaude: true,
        hasGemini: true,
        hasOpencodeZen: true,
        hasOpencodeGo: true,
        hasCopilot: true,
        hasZaiCodingPlan: true,
        hasVercelAiGateway: true,
      })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then no generated model string uses OpenCode Zen for retired IDs
      expect(JSON.stringify(result)).not.toContain("opencode/claude-haiku-4-5")
      expect(JSON.stringify(result)).not.toContain("opencode/gpt-5.4-nano")
    })

    test("librarian is undefined when OpenAI and opencode-go are available but no opencode provider", () => {
      // #given OpenAI and opencode-go are available (no opencodeZen)
      const config = createConfig({ hasOpenAI: true, hasOpencodeGo: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian requires opencode provider
      expect(result.agents?.librarian?.model).toBeUndefined()
    })

    test("librarian is omitted when only ZAI is available", () => {
      // #given only ZAI is available
      const config = createConfig({ hasZaiCodingPlan: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian should not have fallback_models
      expect(result.agents?.librarian).toBeUndefined()
      expect(JSON.stringify(result)).not.toContain("zai-coding-plan/glm-4.7")
    })
  })

  describe("Vercel AI Gateway provider", () => {
    test("uses vercel/ model strings when only Vercel AI Gateway is available", () => {
      // #given only Vercel AI Gateway is available
      const config = createConfig({ hasVercelAiGateway: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use vercel/<sub-provider>/<model> format
      expect(result).toMatchSnapshot()
    })

    test("uses vercel/ model strings with isMax20 flag", () => {
      // #given Vercel AI Gateway is available with Max 20 plan
      const config = createConfig({ hasVercelAiGateway: true, isMax20: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should use higher capability models via gateway
      expect(result).toMatchSnapshot()
    })

    test("explore uses free fallback when only gateway available", () => {
      // #given only Vercel AI Gateway is available
      const config = createConfig({ hasVercelAiGateway: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then explore uses free model (no opencode provider for chain)
      expect(result.agents?.explore?.model).toBe("opencode/mimo-v2.5-free")
    })

    test("librarian is undefined when only gateway available", () => {
      // #given only Vercel AI Gateway is available
      const config = createConfig({ hasVercelAiGateway: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then librarian requires opencode provider
      expect(result.agents?.librarian?.model).toBeUndefined()
    })

    test("Hephaestus uses free fallback when only Vercel AI Gateway is available", () => {
      // #given only Vercel AI Gateway is available
      const config = createConfig({ hasVercelAiGateway: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then hephaestus uses free fallback
      expect(result.agents?.hephaestus?.model).toBe("opencode/mimo-v2.5-free")
    })

    test("sisyphus is undefined when Claude and Vercel are available but no opencode provider", () => {
      // #given Claude and Vercel AI Gateway are both available
      const config = createConfig({ hasClaude: true, hasVercelAiGateway: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then sisyphus requires opencode provider in fallback chain
      expect(result.agents?.sisyphus).toBeUndefined()
    })
  })

  describe("MiniMax Coding Plan providers", () => {
    test("uses free fallback when only MiniMax Coding Plan is available", () => {
      // #given only MiniMax Coding Plan is available (no opencode provider)
      const config = createConfig({ hasMinimaxCodingPlan: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then agents use free fallback since chains only have opencode provider
      expect(result.agents?.librarian?.model).toBeUndefined()
      expect(result.agents?.explore?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.agents?.atlas?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.agents?.["sisyphus-junior"]?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.categories?.writing?.model).toBe("opencode/mimo-v2.5-free")
    })

    test("uses free fallback when OpenCode Go and MiniMax Coding Plan are available but no opencode provider", () => {
      // #given OpenCode Go and MiniMax Coding Plan are both available (no opencodeZen)
      const config = createConfig({ hasOpencodeGo: true, hasMinimaxCodingPlan: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then atlas uses free fallback since chains only have opencode provider
      expect(result.agents?.atlas?.model).toBe("opencode/mimo-v2.5-free")
    })

    test("uses free fallback when only MiniMax CN Coding Plan is available", () => {
      // #given only MiniMax CN Coding Plan is available (no opencode provider)
      const config = createConfig({ hasMinimaxCnCodingPlan: true })

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then agents use free fallback since chains only have opencode provider
      expect(result.agents?.librarian?.model).toBeUndefined()
      expect(result.agents?.explore?.model).toBe("opencode/mimo-v2.5-free")
      expect(result.categories?.quick?.model).toBe("opencode/mimo-v2.5-free")
    })
  })

  describe("schema URL", () => {
    test("always includes correct schema URL", () => {
      // #given any config
      const config = createConfig()

      // #when generateModelConfig is called
      const result = generateModelConfig(config)

      // #then should include correct schema URL
      expect(result.$schema).toBe(
        "https://raw.githubusercontent.com/nalrom/oh-my-freeagent/main/assets/oh-my-opencode.schema.json"
      )
    })
  })
})
