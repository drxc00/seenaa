"use client";

import type { Editor } from "@tiptap/react";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo,
  Strikethrough,
  Undo,
  Heading1,
  Heading2,
  LinkIcon,
  ImageIcon,
  Code,
  Minus,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Toggle } from "@/components/ui/toggle";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface EditorToolbarProps {
  editor: Editor;
}

export function EditorToolbar({ editor }: EditorToolbarProps) {
  const [linkUrl, setLinkUrl] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const setLink = () => {
    if (linkUrl) {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkUrl })
        .run();
    } else {
      editor.chain().focus().unsetLink().run();
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  };

  return (
    <TooltipProvider>
      <div className="p-1 flex flex-wrap gap-1 items-center">
        <ToolTipWrapper label="Bold">
          <Toggle
            size="sm"
            pressed={editor.isActive("bold")}
            onPressedChange={() => editor.chain().focus().toggleBold().run()}
            aria-label="Bold"
          >
            <Bold className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>
        <ToolTipWrapper label="Italic">
          <Toggle
            size="sm"
            pressed={editor.isActive("italic")}
            onPressedChange={() => editor.chain().focus().toggleItalic().run()}
            aria-label="Italic"
          >
            <Italic className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>
        <ToolTipWrapper label="Strikethrough">
          <Toggle
            size="sm"
            pressed={editor.isActive("strike")}
            onPressedChange={() => editor.chain().focus().toggleStrike().run()}
            aria-label="Strikethrough"
          >
            <Strikethrough className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>
        <ToolTipWrapper label="Code">
          <Toggle
            size="sm"
            pressed={editor.isActive("code")}
            onPressedChange={() => editor.chain().focus().toggleCode().run()}
            aria-label="Code"
          >
            <Code className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolTipWrapper label="Heading 1">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 1 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            aria-label="Heading 1"
          >
            <Heading1 className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>

        <ToolTipWrapper label="Heading 2">
          <Toggle
            size="sm"
            pressed={editor.isActive("heading", { level: 2 })}
            onPressedChange={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            aria-label="Heading 2"
          >
            <Heading2 className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolTipWrapper label="Bullet List">
          <Toggle
            size="sm"
            pressed={editor.isActive("bulletList")}
            onPressedChange={() =>
              editor.chain().focus().toggleBulletList().run()
            }
            aria-label="Bullet List"
          >
            <List className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>

        <ToolTipWrapper label="Ordered List">
          <Toggle
            size="sm"
            pressed={editor.isActive("orderedList")}
            onPressedChange={() =>
              editor.chain().focus().toggleOrderedList().run()
            }
            aria-label="Ordered List"
          >
            <ListOrdered className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>

        <ToolTipWrapper label="Blockquote">
          <Toggle
            size="sm"
            pressed={editor.isActive("blockquote")}
            onPressedChange={() =>
              editor.chain().focus().toggleBlockquote().run()
            }
            aria-label="Quote"
          >
            <Quote className="h-4 w-4" />
          </Toggle>
        </ToolTipWrapper>

        <ToolTipWrapper label="Horizontal Rule">
          <button
            className="p-2 rounded hover:bg-muted"
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
            aria-label="Horizontal Rule"
          >
            <Minus className="h-4 w-4" />
          </button>
        </ToolTipWrapper>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <Popover>
          <ToolTipWrapper label="Link">
            <PopoverTrigger asChild>
              <button
                className={`p-2 rounded hover:bg-muted ${editor.isActive("link") ? "bg-muted" : ""}`}
                aria-label="Link"
              >
                <LinkIcon className="h-4 w-4" />
              </button>
            </PopoverTrigger>
          </ToolTipWrapper>
          <PopoverContent className="w-80">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
              />
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => editor.chain().focus().unsetLink().run()}
                  disabled={!editor.isActive("link")}
                >
                  Remove Link
                </Button>
                <Button size="sm" onClick={setLink}>
                  Save Link
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        <Popover>
          <ToolTipWrapper label="Image">
            <PopoverTrigger asChild>
              <button className="p-2 rounded hover:bg-muted" aria-label="Image">
                <ImageIcon className="h-4 w-4" />
              </button>
            </PopoverTrigger>
          </ToolTipWrapper>
          <PopoverContent className="w-80">
            <div className="flex flex-col gap-2">
              <Input
                placeholder="https://example.com/image.jpg"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
              <Button size="sm" onClick={addImage}>
                Add Image
              </Button>
            </div>
          </PopoverContent>
        </Popover>

        <Separator orientation="vertical" className="mx-1 h-6" />

        <ToolTipWrapper label="Undo">
          <button
            className="p-2 rounded hover:bg-muted disabled:opacity-50"
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            aria-label="Undo"
          >
            <Undo className="h-4 w-4" />
          </button>
        </ToolTipWrapper>
        <ToolTipWrapper label="Redo">
          <button
            className="p-2 rounded hover:bg-muted disabled:opacity-50"
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            aria-label="Redo"
          >
            <Redo className="h-4 w-4" />
          </button>
        </ToolTipWrapper>
      </div>
    </TooltipProvider>
  );
}

function ToolTipWrapper({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent className="text-base">{label}</TooltipContent>
    </Tooltip>
  );
}
