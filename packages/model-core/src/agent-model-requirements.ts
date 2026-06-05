import type { ModelRequirement } from "./model-requirement-types"

export const AGENT_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  sisyphus: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
    requiresAnyModel: true,
  },
  hephaestus: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
    ],
  },
  oracle: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "big-pickle" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
    ],
  },
  librarian: {
    fallbackChain: [
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "big-pickle" },
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
    ],
  },
  explore: {
    fallbackChain: [
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "big-pickle" },
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
    ],
  },
  "multimodal-looker": {
    fallbackChain: [
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
    ],
  },
  prometheus: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
  metis: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
  momus: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "big-pickle" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
    ],
  },
  atlas: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
  "sisyphus-junior": {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
}
