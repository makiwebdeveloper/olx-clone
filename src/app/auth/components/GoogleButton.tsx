"use client";

import Icons from "@/components/Icons";
import Button from "@/components/ui/Button";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  return (
    <Button className="gap-2 w-full" onClick={() => signIn("google")}>
      <Icons.google className="w-6 h-6" /> Sign in with Google
    </Button>
  );
}
