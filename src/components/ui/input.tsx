import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => {
  return (
    <input
      ref={ref}
      className={cn("flex h-10 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none ring-0 placeholder:text-slate-500", className)}
      {...props}
    />
  );
});
Input.displayName = "Input";

export { Input };
