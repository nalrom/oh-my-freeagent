import type { ModelRequirement } from "./model-requirement-types"

export const CATEGORY_MODEL_REQUIREMENTS: Record<string, ModelRequirement> = {
  "visual-engineering": {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
    ],
  },
  ultrabrain: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "big-pickle" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
    ],
  },
  deep: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
  artistry: {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
  quick: {
    fallbackChain: [
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "big-pickle" },
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
    ],
  },
  "unspecified-low": {
    fallbackChain: [
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "big-pickle" },
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
    ],
  },
  "unspecified-high": {
    fallbackChain: [
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
  writing: {
    fallbackChain: [
      { providers: ["opencode"], model: "minimax-m3-free" },
      { providers: ["opencode"], model: "mimo-v2.5-free" },
      { providers: ["opencode"], model: "deepseek-v4-flash-free" },
      { providers: ["opencode"], model: "big-pickle" },
    ],
  },
}
