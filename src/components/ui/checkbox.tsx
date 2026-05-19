import React from 'react';
import { Check } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, checked, onChange, ...props }, ref) => {
    const defaultId = React.useId();
    const checkboxId = id || defaultId;

    return (
      <div className="flex items-center gap-2 select-none">
        <div className="relative flex items-center justify-center">
          <input
            ref={ref}
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={onChange}
            className="peer h-5 w-5 opacity-0 absolute cursor-pointer"
            {...props}
          />
          <div
            className={twMerge(
              clsx(
                "h-5 w-5 rounded-md border border-slate-300 dark:border-slate-700 bg-white/70 dark:bg-slate-900/60 transition-all flex items-center justify-center peer-checked:bg-gradient-to-r peer-checked:from-indigo-600 peer-checked:to-violet-600 peer-checked:border-transparent peer-focus-visible:ring-2 peer-focus-visible:ring-indigo-500/20 pointer-events-none",
                className
              )
            )}
          >
            <Check className="h-3.5 w-3.5 text-white scale-0 transition-transform peer-checked:scale-100 duration-200 stroke-[3px]" />
          </div>
        </div>
        {label && (
          <label
            htmlFor={checkboxId}
            className="text-sm font-medium text-slate-600 dark:text-slate-400 cursor-pointer select-none"
          >
            {label}
          </label>
        )}
      </div>
    );
  }
);

Checkbox.displayName = 'Checkbox';
