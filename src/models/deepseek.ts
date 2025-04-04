import { createPromptContent, systemInstruction } from "@/utils/model-prompt";
import OpenAI from "openai"; // LOL
import { MODELS } from "./available-models";

const deepseek = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: process.env.DEEPSEEK_API_KEY as string,
});

export async function deepseekTextCompletion({ context }: { context: string }) {
  const response = await deepseek.chat.completions.create({
    messages: [
      { role: "system", content: systemInstruction },
      { role: "user", content: createPromptContent(context) },
    ],
    model: MODELS.DEEPSEEK.id,
  });

  return response.choices[0].message.content;
}
