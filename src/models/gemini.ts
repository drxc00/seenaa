import { createPromptContent, systemInstruction } from "@/utils/model-prompt";
import { GoogleGenAI } from "@google/genai";

const MODEL = "gemini-2.0-flash-lite-001";

export const gemini = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY as string,
});

export async function textCompletion({ context }: { context: string }) {
  const response = await gemini.models.generateContent({
    model: MODEL,
    contents: createPromptContent(context),
    config: {
      systemInstruction: systemInstruction,
    },
  });

  return response.text;
}
