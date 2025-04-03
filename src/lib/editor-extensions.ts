import { Node } from "@tiptap/core";

export const SaveShortcut = Node.create({
  name: "save-shortcut",
  addOptions() {
    return {
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
        const content = this.editor.getHTML();
        this.options.onSave(content);
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
