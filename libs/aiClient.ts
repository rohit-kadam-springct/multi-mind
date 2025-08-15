// libs/aiClient.ts
import OpenAI from "openai";

let openaiClient: OpenAI | null = null;

export const GPT_MODEL = "gemini-2.5-flash";

export function getAIClient(): OpenAI {
  if (!openaiClient) {
    openaiClient = new OpenAI({
      apiKey: process.env.GEMINI_API_KEY,
      baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
    });
  }
  return openaiClient;
}
