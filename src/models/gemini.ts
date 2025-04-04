import { createPromptContent, systemInstruction } from "@/utils/model-prompt";
import { GoogleGenAI } from "@google/genai";
import { MODELS } from "./available-models";

export const gemini = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
});

export async function geminiTextCompletion({ context }: { context: string }) {
  const response = await gemini.models.generateContent({
    model: MODELS.GEMINI.id,
    contents: createPromptContent(context),
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return response.text;
}
