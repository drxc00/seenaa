"use client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signUpSchema } from "@/lib/zod-schema";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";

export function SignupForm() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    /**
     * Handle SignUp
     * Utilizes Better-Auth signUp.email method
     */
    try {
      await authClient.signUp.email(
        {
          email: data.email,
          password: data.password,
          name: data.name,
          username: data.username,
          image: "",
          /** Automatically redirect to main after signUp */
          callbackURL: "/home",
        },
        {
          onError(ctx) {
            toast.error("Something went wrong. Please try again.", {
              description: ctx.error.message,
              descriptionClassName: "text-foreground",
            });
            setLoading(false);
          },
          onRequest() {
            setLoading(true);
          },
          onSuccess() {
            router.push("/home");
          },
        }
      );
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong. Please try again.", {
        description: (error as Error).message,
        descriptionClassName: "text-foreground",
      });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Name <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="@jdoe" {...field} />
              </FormControl>
              <FormMessage />
              <FormDescription>
                Your username will be used to create your blog. For example:{" "}
                <code>
                  {!field.value ? "username" : field.value}.seenaa.xyz
                </code>
              </FormDescription>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input placeholder="john.doe@me.com" {...field} />
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
              <FormLabel>
                Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Confirm Password <span className="text-destructive">*</span>
              </FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? <Loader2 className="animate-spin" /> : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
}
