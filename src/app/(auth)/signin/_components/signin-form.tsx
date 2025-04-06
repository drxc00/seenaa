"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { signInSchema } from "@/lib/zod-schema";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function SignInForm() {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      await authClient.signIn.username({
        username: data.username,
        password: data.password,
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            window.location.href = "/home";
          },
          onError: (ctx) => {
            setIsLoading(false);
            form.setError("username", {
              type: "custom",
              message: ctx.error.message,
            });
          },
        },
      });
    } catch (error) {
      toast.error("Something went wrong. Please try again.", {
        description: (error as Error).message,
        descriptionClassName: "text-foreground",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="@jdoe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Sign In"}
        </Button>
      </form>
    </Form>
  );
}
