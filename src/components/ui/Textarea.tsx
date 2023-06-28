import * as React from "react";

import { cn } from "@/lib/cn";
import { cva } from "class-variance-authority";

export const textareaVariants = cva(
  "flex min-h-[80px] w-full rounded-md border resize-none border-input bg-transparent px-3 py-2 placeholder:text-slate-400 placeholder:text-sm 2xl:placeholder:text-lg outline-none disabled:cursor-not-allowed disabled:opacity-50"
);

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        className={cn(textareaVariants(), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Textarea.displayName = "Textarea";

export { Textarea };
