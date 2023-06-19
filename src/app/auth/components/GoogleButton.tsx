"use client";

import Icons from "@/components/Icons";
import Button from "@/components/ui/Button";
import { useToast } from "@/hooks/useToast";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function GoogleButton() {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);

    try {
      signIn("google", {
        callbackUrl: "/",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "There was an error logging in with Google",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      isLoading={isLoading}
      className="gap-2 w-full"
      onClick={loginWithGoogle}
    >
      <Icons.google className="w-6 h-6" /> Sign in with Google
    </Button>
  );
}
