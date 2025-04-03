"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAction } from "next-safe-action/hooks";
import { setBlogName as setBlogNameActtion } from "@/app/(server)/actions/blog-actions";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

export function DomainReqDialog({ open }: { open: boolean }) {
  const [isOpen, setIsOpen] = useState(open || false);
  const { executeAsync, isPending } = useAction(setBlogNameActtion);
  const [blogName, setBlogName] = useState("");

  const handleSubmit = async () => {
    if (!blogName) {
      toast.error("Please enter a blog name!");
      return;
    }

    const result = await executeAsync({ blogName });
    if (!result?.data?.success) {
      toast.error(result?.data?.message);
    } else {
      setIsOpen(false);
    }
  };
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold font-sans">
            Choose Your Blog Name
          </DialogTitle>
          <DialogDescription>
            This name will be part of your blog&apos;s web address. For example,
            &quot;drxco&quot; would create &quot;drxco.seenaa.xyz&quot;
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label
              htmlFor="blogname"
              className="text-sm font-medium leading-none"
            >
              Blog Name
            </Label>
            <Input
              id="blogname"
              placeholder="Enter your unique blog name"
              className="h-10"
              value={blogName}
              onChange={(e) => setBlogName(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="submit" disabled={isPending} onClick={handleSubmit}>
              {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                "Save Blog Name"
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
