/**
 * This file serves as the base prompt for the models that will be used.
 * This will tell the model Instructions, like their purpose, their output, etc.
 */

export function createPromptContent(context: string) {
  /**
   * Takes context as parameter.
   * "Context" - refers to possibly the content of the written Text.
   */

  return `
    INSTRUCTIONS:
    - Continue the text naturally from where it left off
    - Provide a brief continuation (1-2 sentences).
    - Match the style, tone, and formatting of the original text.
    - Do not add explanations or introductions
    - Do not add line breaks etc. Only return the text content.

    CONTEXT:
    ${context}
    `.trim();
}

export const systemInstruction = `
    You are a writing assistant for auto-completion. 
    Focus on concise completions.
    Prioritize natural language flow.
    `.trim();
