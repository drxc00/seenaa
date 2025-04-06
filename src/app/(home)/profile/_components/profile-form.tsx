"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InferSelectModel } from "drizzle-orm";
import { user as UserDB } from "@/db/auth-schema";
import { profileSchema } from "@/lib/zod-schema";
import { Card, CardContent } from "@/components/ui/card";
import { useAction } from "next-safe-action/hooks";
import { updateUserProfile } from "@/app/(server)/actions/user-actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

export function ProfileForm({
  user,
}: {
  user: InferSelectModel<typeof UserDB>;
}) {
  const { executeAsync, isPending } = useAction(updateUserProfile);
  const router = useRouter();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      userId: user.id,
      name: user.name || "",
      username: user.username || "",
      bio: user.bio || "",
      image: user.image || "",
      email: user.email || "",
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof profileSchema>) => {
    console.log("helo");
    /** No need to have try catch since we return the error. I think lol... */
    const response = await executeAsync(data);
    if (!response?.data?.success) {
      toast.error("Failed to update profile", {
        description: response?.data?.message || "Something went wrong",
      });
      return;
    }

    toast.success("Profile updated successfully", {
      description: response?.data?.message || "Profile updated successfully",
    });
    // Refresh the page to see the changes
    router.refresh();
  };

  return (
    <Form {...form}>
      <form
        className="w-full flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Card className="w-full p-0 shadow-none">
          <CardContent className="p-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="eg. John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="m@seenaa.xyz" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Bio" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <Input placeholder="https://url.." {...field} />
                  </FormControl>
                  <FormDescription>
                    We only support URL for now cause we are broke.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mb-4">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input placeholder="password" type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Leave empty if you&apos;re not gonna change it.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>
        <Button type="submit" disabled={isPending}>
          {isPending ? <Loader2 className="animate-spin" /> : "Update Profile"}
        </Button>
      </form>
    </Form>
  );
}
