"use client";

import { authClient } from "@/lib/auth-client";
import { Button } from "./ui/button";
import { Loader2, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function LogoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onRequest: () => {
            setIsLoading(true);
          },
          onSuccess: () => {
            window.location.href = "/";
          },
          onError: (ctx) => {
            toast.error("Something went wrong. Please try again.", {
              description: ctx.error.message,
            });
          },
        },
      });
    } catch (error) {
      console.error("Logout failed", error);
    }
  };
  return (
    <Button
      className="w-full"
      variant="outline"
      size="sm"
      onClick={handleLogout}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className=" h-4 w-4 animate-spin" />
      ) : (
        <>
          <LogOutIcon className="h-4 w-4" />
          <span className="text-md font-semibold">Logout</span>
        </>
      )}
    </Button>
  );
}
