"use client";

import { Loader2, PenBox, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useAction } from "next-safe-action/hooks";
import {
  publishPost,
  savePostContent,
  unPublishPost,
} from "@/app/(server)/actions/posts-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Editor } from "@tiptap/react";

export function PublishButton({
  postId,
  postTitle,
  editor,
}: {
  postTitle: string;
  postId: string;
  editor: Editor;
}) {
  const { executeAsync, isExecuting } = useAction(publishPost);
  const router = useRouter();

  const handlePublish = async () => {
    /** Save content first */
    const content = editor.getHTML(); // Get the HTML content
    const textContent = editor.getText(); // Get the text content for excerpt

    const resultSave = await savePostContent({
      postContent: content,
      postTitle: postTitle,
      postContentTextOnly: textContent,
      postId,
    });

    if (!resultSave?.data?.success) {
      toast.error(resultSave?.data?.message);
      return;
    }

    /** After saving, publish it */
    const result = await executeAsync({ postId });
    if (!result?.data?.success) {
      toast.error(result?.data?.message);
    } else {
      toast.success("Post published successfully");
      router.refresh();
    }
  };
  return (
    <Button disabled={isExecuting} onClick={handlePublish}>
      {isExecuting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Send className="h-4 w-4" />
          <span className="hidden lg:inline">Publish</span>
        </>
      )}
    </Button>
  );
}

export function UnPublishButton({ postId }: { postId: string }) {
  const { executeAsync, isExecuting } = useAction(unPublishPost);
  const router = useRouter();

  const handlePublish = async () => {
    const result = await executeAsync({ postId });
    if (!result?.data?.success) {
      toast.error(result?.data?.message);
    } else {
      toast.success("Post unpublished successfully");
      router.refresh();
    }
  };
  return (
    <Button disabled={isExecuting} onClick={handlePublish}>
      {isExecuting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <PenBox className="h-4 w-4" />
          <span className="hidden lg:inline">Unpublish</span>
        </>
      )}
    </Button>
  );
}
