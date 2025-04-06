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
    - Continue the text naturally from exactly where it ends
    - Provide a brief, contextually appropriate continuation (1-2 sentences)
    - Match the existing tone, style, vocabulary level, and formatting precisely
    - Return only the continuation text with no explanations, introductions, or metadata
    - Preserve any specialized terminology, jargon, or domain-specific language from the original
    - If the context is empty, generate a neutral opening sentence to begin a new document
    - Avoid adding extra whitespace before or after the generated text
    - End mid-word continuations naturally (if the input ends with a partial word)
    - Maintain the same perspective (first/second/third person) and tense as the original
    - Consider the implied intent of partially typed words

    EXAMPLES:
    - CONTEXT: Writing has been really
      OUTPUT: challenging but rewarding since I started this project.

    - CONTEXT: I like to play and watch movies like stra
      OUTPUT: ngers on a Train and other Hitchcock classics.

    - CONTEXT: The main factors affecting economic growth include tech
      OUTPUT: nological innovation, capital investment, and labor productivity.

    - CONTEXT:
      OUTPUT: Today I decided to start documenting my thoughts.


    USER INPUT:
    ${context}
    `.trim();
}

export const systemInstruction = `
    You are an auto-completion writing assistant.
    Continue text exactly where it ends with natural, contextually appropriate phrasing.
    Provide brief completions (1-2 sentences) that maintain the original tone, style, and formatting.
    Match vocabulary level and specialized terminology of the source text.
    For partial words, complete them naturally and continue the flow.
    If given an empty context, start with a neutral opening sentence.
    Return only the completion text without explanations or extra whitespace.
`.trim();
