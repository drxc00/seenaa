"use client";

import { Loader2, PenBox, Send } from "lucide-react";
import { Button } from "./ui/button";
import { useAction } from "next-safe-action/hooks";
import {
  publishPost,
  unPublishPost,
} from "@/app/(server)/actions/posts-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function PublishButton({ postId }: { postId: string }) {
  const { executeAsync, isExecuting } = useAction(publishPost);
  const router = useRouter();

  const handlePublish = async () => {
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
          <span>Publish</span>
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
          <span>Unpublish</span>
        </>
      )}
    </Button>
  );
}
