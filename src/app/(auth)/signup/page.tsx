import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SignupForm } from "./_components/signup-form";
import { Icon } from "@/components/icon";

export default function SignUpPage() {
  return (
    <main className="flex flex-col gap-6 w-full items-center justify-center min-h-screen p-4 bg-muted">
      <div className="flex flex-col items-center gap-2">
        <Icon />
        <h1 className="font-semibold text-xl">seenaa</h1>
      </div>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Sign Up
          </CardTitle>
          <CardDescription>
            Create an account to start your blogging journey.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm />
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </main>
  );
}
