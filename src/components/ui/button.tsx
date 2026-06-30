import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "default", ...props }, ref) => {
  const base = "inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-medium transition";
  const variants = {
    default: "bg-slate-100 text-slate-950 hover:bg-slate-200",
    outline: "border border-slate-700 bg-transparent text-slate-200 hover:bg-slate-800"
  };

  return <button ref={ref} className={cn(base, variants[variant], className)} {...props} />;
});
Button.displayName = "Button";

export { Button };
