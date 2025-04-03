"use client";

import { Loader2, Plus } from "lucide-react";
import { Button } from "./ui/button";
import { useAction } from "next-safe-action/hooks";
import { createNewPost } from "@/app/(server)/actions/posts-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function CreateNewPostButton() {
  const router = useRouter();
  const { executeAsync, isExecuting } = useAction(createNewPost, {
    onError: () => {
      toast.error("Something went wrong. Please try again.");
    },
  });

  const handleCreation = async () => {
    /**
     * Handle post creation
     * Invokes a server action and then takes the id for redirection
     */
    const result = await executeAsync();

    if (!result?.data?.success) {
      toast.error(result?.data?.message);
    }

    if (result?.data?.success) {
      router.push(`/post/${result.data.postId}`);
    }
  };
  return (
    <Button disabled={isExecuting} onClick={handleCreation}>
      {isExecuting ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <Plus className="h-4 w-4" />
          New
        </>
      )}
    </Button>
  );
}
