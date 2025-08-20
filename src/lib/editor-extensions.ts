import { Node, mergeAttributes } from "@tiptap/core";
import { EditorView } from "@tiptap/pm/view";
import { EditorState, Plugin, PluginKey, Transaction } from "prosemirror-state";
import {
  AIAutoCompleteOptions,
  AIAutoCompleteStorage,
  HTMLAttributes,
  NodeWithPosition,
} from "@/types";

export const SaveShortcut = Node.create({
  name: "save-shortcut",
  addOptions() {
    return {
      titleRef: undefined,
      onSave: () => {},
    };
  },
  addKeyboardShortcuts() {
    return {
      // Both 'Mod-s' and 'Mod-S' will work (lowercase and uppercase)
      "Mod-s": () => {
        // Prevent the browser's save dialog from appearing
        window.addEventListener(
          "keydown",
          (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === "s") {
              e.preventDefault();
            }
          },
          { once: true }
        );
        const contentHTML = this.editor.getHTML();
        const contentText = this.editor.getText();
        this.options.onSave(
          this.options.titleRef.current,
          contentHTML,
          contentText
        );
        return true;
      },
    };
  },
});

export const TitleNode = Node.create({
  name: "title",
  group: "block", // Ensure it behaves like a block element
  content: "inline*", // Allow inline elements inside the title
  defining: true, // Makes sure this node is treated as a distinct content block
  addAttributes() {
    return {
      "data-type": {
        default: "title",
      },
    };
  },
  parseHTML() {
    return [
      {
        tag: "h1[data-type='title']",
      },
    ];
  },
  renderHTML({ HTMLAttributes }) {
    return ["h1", HTMLAttributes, 0];
  },
});

export const AIAutoComplete = Node.create<
  AIAutoCompleteOptions,
  AIAutoCompleteStorage
>({
  name: "ai-auto-complete",
  group: "inline",
  inline: true,
  selectable: true,
  atom: true,

  addStorage() {
    /**
     * This is used to store the state of the AI auto-complete node.
     * It can be used to manage the selected index of suggestions or any other state related to the node.
     * It is initialized to 0, which can be used to indicate the first suggestion.
     */
    return {
      selectedIndex: 0,
    };
  },

  addAttributes() {
    /**
     * This is used to store the suggestion text.
     * It is set to an empty string by default.
     * It can be used to store the suggestion text returned by the AI model.
     * It is used to render the suggestion in the editor.
     * The `parseHTML` and `renderHTML` methods are used to parse and render the suggestion text.
     * The `parseHTML` method is used to parse the suggestion text from the HTML element.
     * The `renderHTML` method is used to render the suggestion text in the HTML element.
     * The `data-suggestion` attribute is used to store the suggestion text.
     */
    return {
      suggestion: {
        default: "",
        parseHTML: (element: HTMLElement) =>
          element.getAttribute("data-suggestion"),
        renderHTML: (attributes: HTMLAttributes) => {
          if (attributes.suggestion) {
            return { "data-suggestion": attributes.suggestion };
          }
          return {};
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'span[data-type="ai-auto-complete"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        {
          "data-type": "ai-auto-complete",
          class: "bg-primary/10 text-muted-foreground italic rounded px-0.5",
        },
        HTMLAttributes
      ),
      node.attrs.suggestion,
    ];
  },

  addOptions() {
    /**
     * This is used to declare the options for the AI auto-complete node.
     * It is used to set the completion function that will be called when the user types in the editor.
     * The completion function is used to get the suggestion text from the AI model.
     * It invokes the function passed from the compoent that uses this node.
     */
    return {
      completionFunc: () => Promise.resolve(""),
      model: "",
      HTMLAttributes: {
        class: "bg-primary/10 text-muted-foreground italic rounded px-0.5",
      },
    };
  },

  addCommands() {
    return {
      updateCompletionModel: (newModel: string) => () => {
        this.options.model = newModel;
        return true;
      },
      acceptSuggestion:
        () =>
        ({
          tr,
          state,
          dispatch,
        }: {
          tr: Transaction;
          state: EditorState;
          dispatch: ((tr: Transaction) => void) | undefined;
        }) => {
          /**
           * This command is used to accept the current AI suggestion.
           * It finds the AI auto-complete node in the document and replaces it with its text content.
           * It is used to accept the suggestion and insert it into the editor.
           * It is called when the user presses the Tab key.
           */
          const nodes: NodeWithPosition[] = [];
          // Find all AI autocomplete nodes
          state.doc.descendants((node, pos) => {
            // If the node is of type 'ai-auto-complete', push it to the nodes array
            if (node.type.name === this.name) {
              nodes.push({ node, pos });
            }
          });

          // If no nodes found or dispatch is not available, return false
          if (!nodes.length || !dispatch) return false;

          // Accept the suggestion by replacing the node with its text content
          const { node, pos } = nodes[0];
          const suggestion = node.attrs.suggestion as string;

          // Delete the node and insert the suggestion text at the same position
          // This is done to replace the node with its text content
          tr.delete(pos, pos + node.nodeSize);
          tr.insertText(suggestion.trim(), pos, pos);
          dispatch(tr); // Dispatch the transaction to update the editor state
          return true;
        },

      removeSuggestion:
        () =>
        ({
          tr,
          state,
          dispatch,
        }: {
          tr: Transaction;
          state: EditorState;
          dispatch: ((tr: Transaction) => void) | undefined;
        }) => {
          /**
           * Similar to the acceptSuggestion command, however, this command is used to remove the current AI suggestion.
           * It finds the AI auto-complete node in the document and removes it.
           * It is used to remove the suggestion when the user presses the Escape key.
           */
          const nodes: NodeWithPosition[] = [];
          state.doc.descendants((node, pos) => {
            if (node.type.name === this.name) {
              nodes.push({ node, pos });
            }
          });

          if (!nodes.length || !dispatch) return false;

          // Simply remove the node
          const { pos, node } = nodes[0];
          tr.delete(pos, pos + node.nodeSize);
          dispatch(tr);

          return true;
        },
    };
  },

  addKeyboardShortcuts() {
    /**
     * Shorcut declarations for the AI auto-complete node.
     * It is used to handle the keyboard shortcuts for the AI auto-complete node.
     * It is used to handle the Mod-Space, Tab and Escape keys.
     */
    return {
      "Mod-Space": () => {
        /** Select the text before the cursor so that we have the content to pass to the completion function */
        const cursorPosition = this.editor.state.selection.from;
        const content = this.editor.state.doc.textBetween(0, cursorPosition);
        // Show loading indicator
        this.editor.commands.insertContent({
          type: this.name,
          attrs: { suggestion: "..." },
        });

        /**
         * Invokes the completion function passed from the component that uses this node.
         * Since the function is asynchronous, it returns a promise.
         * We need to wait for the promise to resolve before we can use the result.
         * However, the functions in the editor are synchronous, so we need to use a callback.
         * We can use the `then` method of the promise to get the result.
         * The `then` method takes a callback function that is called when the promise is resolved.
         */
        this.options
          .completionFunc(content, this.options.model)
          .then((completionText: string | null) => {
            // Remove the loading indicator
            this.editor.commands.deleteRange({
              from: this.editor.state.selection.from - 1,
              to: this.editor.state.selection.from,
            });

            // Insert the completion as a suggestion node
            if (completionText) {
              this.editor.commands.insertContent({
                type: this.name,
                attrs: { suggestion: completionText },
              });
            }
          })
          .catch((error: Error) => {
            console.error("AI completion error:", error);
            this.editor.commands.removeSuggestion();
          });

        return true;
      },
      Tab: () => {
        return this.editor.commands.acceptSuggestion();
      },

      Escape: () => {
        return this.editor.commands.removeSuggestion();
      },
    };
  },

  addProseMirrorPlugins() {
    /**
     * This is used to add the ProseMirror plugins to the editor.
     * ProseMirror plugins are used to extend the functionality of the editor.
     * It is used to handle the keyboard shortcuts and other events in the editor.
     * Here, we are adding a plugin to handle the click and keydown events.
     */
    return [
      new Plugin({
        key: new PluginKey("ai-auto-complete-plugin"),
        props: {
          handleClick: () => {
            // Remove suggestion if user clicks elsewhere
            const suggestionExists = this.editor.commands.acceptSuggestion();
            return suggestionExists;
          },
          handleKeyDown: (view: EditorView, event: KeyboardEvent) => {
            // Remove suggestion on any key press except Tab (which accepts)
            if (
              event.key !== "Tab" &&
              event.key !== "Escape" &&
              !(event.key === " " && (event.metaKey || event.ctrlKey))
            ) {
              return this.editor.commands.removeSuggestion();
            }
            return false;
          },
        },
      }),
    ];
  },
});
