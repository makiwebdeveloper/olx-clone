"use client";

import Icons from "@/components/Icons";
import Button from "@/components/ui/Button";

export default function GoogleButton() {
  return (
    <Button className="gap-2 w-full" onClick={() => {}}>
      <Icons.google className="w-6 h-6" /> Sign in with Google
    </Button>
  );
}
