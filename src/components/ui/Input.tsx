import React, { forwardRef } from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, icon, ...props }, ref) => {
    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label className="text-xs font-medium text-slate-500 dark:text-slate-400 ml-1">
            {label}
          </label>
        )}
        <div className="relative group">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 transition-colors group-focus-within:text-ace-emerald pointer-events-none z-20">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={cn(
              'w-full rounded-2xl border border-slate-200 dark:border-slate-700 bg-white/50 dark:bg-slate-800/50 px-4 py-3 text-sm outline-none transition-all placeholder:text-slate-400 focus:border-ace-emerald focus:ring-2 focus:ring-ace-emerald/10 dark:focus:border-ace-emerald relative z-10',
              icon && 'pl-11',
              error && 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/10',
              className
            )}
            onClick={(e) => {
              // date 타입인 경우 클릭 시 달력을 강제로 엽니다.
              if (props.type === 'date') {
                try { 
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  (e.currentTarget as any).showPicker(); 
                } catch {
                  // ignore
                }
              }
              props.onClick?.(e);
            }}
            {...props}
          />
        </div>
        {error && <p className="text-[11px] text-rose-500 ml-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
