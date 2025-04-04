import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "./_components/signup-form";
import { Icon } from "@/components/icon";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function SignUpPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  /** If session exists, redirect to dashboard */
  if (session) redirect("/home");
  return (
    <main className="flex flex-col gap-4 w-full items-center justify-center min-h-screen p-4 bg-muted">
      <Link href="/">
        <div className="flex flex-col items-center gap-1">
          <Icon />
          <h1 className="font-semibold text-xl">seenaa</h1>
        </div>
      </Link>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
          <CardDescription className="text-center">
            Create an account to access{" "}
            <span className="font-semibold">seenaa</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <Link href="/signin" className="text-primary underline">
              Sign In
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
