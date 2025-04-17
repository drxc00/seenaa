"use client";

import { Loader2, Plus } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { createNewPost } from "@/app/(server)/actions/posts-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "./ui/card";

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
    <Card
      className="p-0 shadow-none border-dashed bg-background/60 cursor-pointer hover:bg-background/80 hover:border-zinc-300 trasition-colors"
      onClick={handleCreation}
    >
      <CardContent className="p-4 flex flex-col justify-center items-center h-full crusor-pointer">
        {isExecuting ? (
          <Loader2 className="h-8 w-8 animate-spin" />
        ) : (
          <>
            <Plus className="h-8 w-8" />
            Create New Post
          </>
        )}
      </CardContent>
    </Card>
  );
}
