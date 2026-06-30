import * as React from "react";
import { cn } from "@/lib/utils";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ className, ...props }, ref) => {
  return (
    <select
      ref={ref}
      className={cn("flex h-10 w-full rounded-xl border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-slate-100 outline-none", className)}
      {...props}
    />
  );
});
Select.displayName = "Select";

export { Select };
