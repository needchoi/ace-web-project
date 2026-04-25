import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface CardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'glass';
}

export const Card: React.FC<CardProps> = ({ children, className, variant = 'default' }) => {
  return (
    <div
      className={cn(
        'rounded-3xl p-6 transition-all',
        variant === 'default' && 'bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm',
        variant === 'glass' && 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-md border border-white/20 dark:border-slate-700/50 shadow-sm',
        className
      )}
    >
      {children}
    </div>
  );
};
