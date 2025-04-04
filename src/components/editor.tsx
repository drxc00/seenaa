"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { EditorToolbar } from "./editor-toolbar";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useState } from "react";
import {
  AIAutoComplete,
  SaveShortcut,
  TitleNode,
} from "@/lib/editor-extensions";
import { useAction } from "next-safe-action/hooks";
import {
  aiTextCompletion,
  savePostContent,
} from "@/app/(server)/actions/posts-actions";
import { toast } from "sonner";
import { ChevronLeft, Loader2, Trash2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import NextLink from "next/link";
import { PublishButton, UnPublishButton } from "./publishing-buttons";

interface EditorProps {
  post?: {
    postTitle: string;
    postId: string;
    postContent: string | null;
    postPublished: boolean;
  };
}

export function Editor({ post }: EditorProps) {
  const [content, setContent] = useState<string>(
    post?.postContent || "<p></p>"
  );

  const { executeAsync: invokeSaveAction, isPending: isSavingContent } =
    useAction(savePostContent);

  const { executeAsync: invokeTextGeneration } = useAction(aiTextCompletion);

  const handleSave = async (content: string) => {
    /** Save the content to the server */
    try {
      const result = await invokeSaveAction({
        postId: post?.postId as string,
        postContent: content,
      });

      if (result?.data?.success) {
        toast.success("Content saved successfully");
      } else {
        toast.error(result?.data?.message || "Failed to save content");
      }
    } catch (error) {
      toast.error("An error occurred while saving");
      console.error(error);
    }
  };

  const completionFunc = async (content: string): Promise<string | null> => {
    /** Invokes the TextGeneration Server action */
    const response = await invokeTextGeneration({
      context: content as string,
    });
    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      return null;
    }
    return response?.data.generatedText || "";
  };

  const editor = useEditor({
    extensions: [
      TitleNode.configure({ title: post?.postTitle ?? "Untitled" }),
      SaveShortcut.configure({ onSave: handleSave }),
      AIAutoComplete.configure({
        completionFunc: completionFunc,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === "paragraph") {
            return "Write something ...";
          }
          return "";
        },
        emptyEditorClass:
          "cursor-text before:content-[attr(data-placeholder)] before:absolute before:top-2 before:left-2 before:text-mauve-11 before:opacity-50 before-pointer-events-none",
      }),
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline underline-offset-2",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-md max-w-full mx-auto my-4",
        },
      }),
      CharacterCount,
    ],
    content: `<h1 data-type="title">${post?.postTitle ?? "Untitled"}</h1>${content}`,
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-zinc prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Floating Toolbar */}
      {editor && (
        <div className="sticky top-4 z-50 transition-all duration-300 ease-in-out transform px-4">
          <Card className="p-0 backdrop-blur-sm shadow-lg rounded-lg">
            <CardContent className="p-2 flex items-center justify-between">
              <NextLink href="/home">
                <Button variant="outline">
                  <ChevronLeft className="h-4 w-4" />
                  <span>Back</span>
                </Button>
              </NextLink>
              <EditorToolbar editor={editor} />
              <div className="flex items-center gap-2">
                <Button variant="destructive">
                  <Trash2 className="h-4 w-4" />
                  <span>Delete</span>
                </Button>
                {post?.postPublished ? (
                  <UnPublishButton postId={post.postId} />
                ) : (
                  <PublishButton postId={post?.postId as string} />
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Editor Area */}
      <div className="flex-grow flex flex-col">
        {/* Loading Overlay */}
        {isSavingContent && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="text-sm font-medium text-muted-foreground">
                Saving content...
              </p>
            </div>
          </div>
        )}

        {/* Paper-Like Editor Content */}
        <div className="flex-grow flex justify-center py-10 px-4">
          <div className="w-full max-w-4xl bg-background/50 dark:bg-background rounded-lg overflow-hidden">
            <div className="p-8 min-h-[calc(100vh-12rem)]">
              <EditorContent
                editor={editor}
                className="min-h-[calc(100vh-14rem)] ["
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
