import { Icon } from "@/components/icon";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignInForm } from "./_components/signin-form";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getAuthData } from "@/data/auth-data";

export default async function SignInPage() {
  const session = await getAuthData();

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
            Sign In
          </CardTitle>
          <CardDescription className="text-center">
            Sign in to your account to access{" "}
            <span className="font-semibold">seenaa</span>.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground text-center">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary underline">
              Sign Up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
