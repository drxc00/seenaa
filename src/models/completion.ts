import { MODELS } from "./available-models";
import { deepseekTextCompletion } from "./deepseek";
import { geminiTextCompletion } from "./gemini";

export async function textCompletion({
  context,
  model,
}: {
  context: string;
  model: (typeof MODELS)[keyof typeof MODELS]["id"];
}) {
  let response: string;

  switch (model) {
    case MODELS.GEMINI.id:
      response = (await geminiTextCompletion({ context })) as string;
      break;
    case MODELS.DEEPSEEK.id:
        console.log("DeepSeek model selected");
      response = (await deepseekTextCompletion({ context })) as string;
      break;
    default:
      throw new Error("Model not supported");
  }

  return response;
}
