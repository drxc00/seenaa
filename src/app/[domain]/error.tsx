"use client";

import { Icon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  const sanitzedError = error.message.replace(/"/g, "'");
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="mb-6">
        <Icon />
      </div>
      <h1 className="text-2xl font-medium mb-3">Something went wrong</h1>
      <p className="text-muted-foreground mb-6 max-w-md">{sanitzedError}</p>
      <Link
        href={
          process.env.NODE_ENV === "production" ? "/" : "http://localhost:3000"
        }
      >
        <Button>Return to Home</Button>
      </Link>
    </div>
  );
}
