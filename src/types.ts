import { Node as ProsemirrorNode } from "prosemirror-model";

export interface HTMLAttributes {
  [key: string]: string | number | boolean | undefined;
}

export interface AIAutoCompleteOptions {
  completionFunc: (content: string) => Promise<string | null>;
  HTMLAttributes?: HTMLAttributes;
}

export interface AIAutoCompleteStorage {
  selectedIndex: number;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    aiAutoComplete: {
      /**
       * Accept the current AI suggestion
       */
      acceptSuggestion: () => ReturnType;
      /**
       * Remove the current AI suggestion
       */
      removeSuggestion: () => ReturnType;
    };
  }
}

export interface NodeWithPosition {
  node: ProsemirrorNode;
  pos: number;
}
