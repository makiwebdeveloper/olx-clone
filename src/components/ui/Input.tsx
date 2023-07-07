import * as React from "react";

import { cn } from "@/lib/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex text-base 2xl:text-xl h-10 w-full rounded-md border border-input bg-background px-3 py-2 2xl:p-6 file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-400 placeholder:text-base 2xl:placeholder:text-xl outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
