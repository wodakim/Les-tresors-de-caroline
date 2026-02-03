import { InputHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-serif text-brand-purple font-medium ml-1">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            "px-4 py-2 rounded-lg border border-brand-gold/30 bg-white/50 focus:border-brand-purple focus:ring-1 focus:ring-brand-purple outline-none transition-all placeholder:text-brand-purple/40 text-brand-purple",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-500 ml-1">{error}</span>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
