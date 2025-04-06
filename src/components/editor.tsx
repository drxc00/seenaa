"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import { EditorToolbar } from "./editor-toolbar";
import CharacterCount from "@tiptap/extension-character-count";
import Placeholder from "@tiptap/extension-placeholder";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  AIAutoComplete,
  SaveShortcut,
  TitleNode,
} from "@/lib/editor-extensions";
import { useAction } from "next-safe-action/hooks";
import {
  aiTextCompletion,
  deletePost,
  savePostContent,
} from "@/app/(server)/actions/posts-actions";
import { toast } from "sonner";
import {
  ChevronLeft,
  CircleAlert,
  Command,
  Loader2,
  Plus,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import NextLink from "next/link";
import { PublishButton, UnPublishButton } from "./publishing-buttons";
import { MODELS } from "@/models/available-models";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Tooltip, TooltipTrigger, TooltipContent } from "./ui/tooltip";
import { useRouter } from "next/navigation";

interface EditorProps {
  post?: {
    postTitle: string;
    postId: string;
    postContent: string | null;
    postPublished: boolean;
  };
}

export function Editor({ post }: EditorProps) {
  const [completionModel, setCompletionModel] = useState<string>(
    MODELS.GEMINI.id // gemini-2.0-flash-lite-001 default
  );

  const router = useRouter();

  /** Server actions */
  const { executeAsync: invokeSaveAction, isPending: isSavingContent } =
    useAction(savePostContent);
  const { executeAsync: invokeDeleteAction, isPending: isDeletingPost } =
    useAction(deletePost);
  const { executeAsync: invokeTextGeneration } = useAction(aiTextCompletion);

  const handleSave = useCallback(
    async (content: string, textContent: string) => {
      /** Save the content to the server */
      try {
        const result = await invokeSaveAction({
          postId: post?.postId as string,
          postContent: content,
          postContentTextOnly: textContent,
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
    },
    [invokeSaveAction, post?.postId]
  );

  const completionFunc = useCallback(
    async (content: string, model: string): Promise<string | null> => {
      /** Invokes the TextGeneration Server action */
      const response = await invokeTextGeneration({
        context: content as string,
        model: model as string,
      });
      if (!response?.data?.success) {
        toast.error(response?.data?.message);
        return null;
      }
      return response?.data.generatedText || "";
    },
    [invokeTextGeneration]
  );

  const deletePostFunc = useCallback(async () => {
    const response = await invokeDeleteAction({
      postId: post?.postId as string,
    });

    if (!response?.data?.success) {
      toast.error(response?.data?.message);
      return;
    }
    // Else redirect to home and show toast
    router.replace("/home");
    toast.success("Post deleted successfully");
  }, [invokeDeleteAction, post?.postId, router]);

  /**
   * Editor
   * Tried Optimizing the editor with useMemo but it didn't seem to make a difference
   * Still working on it
   */
  const editorConfig = useMemo(
    () => ({
      extensions: [
        TitleNode.configure({ title: post?.postTitle ?? "Untitled" }),
        SaveShortcut.configure({ onSave: handleSave }),
        AIAutoComplete.configure({
          completionFunc: completionFunc,
          model: completionModel,
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
      content: `<h1 data-type="title">${post?.postTitle ?? "Untitled"}</h1>${post?.postContent ?? "<p></p>"}`,
      editorProps: {
        attributes: {
          class:
            "prose prose-zinc prose-sm sm:prose-base lg:prose-lg xl:prose-xl focus:outline-none",
        },
      },
      immediatelyRender: false,
    }),
    [post, completionModel, completionFunc, handleSave]
  );
  const editor = useEditor(editorConfig);

  useEffect(() => {
    /**
     * This effect will run when the completionModel changes.
     * It will update the model used for AI auto-completion.
     */
    if (editor) {
      editor.commands.updateCompletionModel(completionModel);
    }
  }, [completionModel, editor]);

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
              <div className="flex items-center gap-4">
                <Tooltip>
                  <TooltipTrigger>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm hover:text-foreground cursor-pointer">
                      <CircleAlert className="h-4 w-4 text-muted-forground" />
                      <p className="underline">Completion Model</p>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent className="flex items-center gap-2 text-base">
                    <Command className="w-4 h-4" /> <span>or</span>{" "}
                    <span>Ctr</span>
                    <Plus className="w-4 h-4" /> <span>Space</span>
                    <span>to trigger auto completion</span>
                  </TooltipContent>
                </Tooltip>
                <Select
                  defaultValue={completionModel}
                  onValueChange={(value) => {
                    setCompletionModel(value);
                  }}
                >
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select a model" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-auto">
                    {Object.keys(MODELS).map((model) => {
                      const modelData = MODELS[model as keyof typeof MODELS];
                      return (
                        <SelectItem key={modelData.id} value={modelData.id}>
                          <modelData.icon />
                          {modelData.name}
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="destructive" onClick={deletePostFunc}>
                  {isDeletingPost ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Delete</span>
                    </>
                  )}
                </Button>
                {post?.postPublished ? (
                  <UnPublishButton postId={post.postId} />
                ) : (
                  <PublishButton
                    postId={post?.postId as string}
                    editor={editor}
                  />
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
        {/* Delete Loading Overlay*/}
        {isDeletingPost && (
          <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="h-8 w-8 animate-spin text-destructive" />
              <p className="text-sm font-medium text-destructive">
                Deleting Post
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
                className="min-h-[calc(100vh-14rem)]"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
