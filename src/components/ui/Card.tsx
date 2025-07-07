import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'bordered';
  isInteractive?: boolean;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = 'default', isInteractive = true, children, ...props }, ref) => {
    // Base card styles
    const baseStyles = "rounded-lg overflow-hidden";
    
    // Variant styles
    const variantStyles = {
      default: "bg-white dark:bg-slate-800 shadow-md",
      glass: "bg-white/10 dark:bg-slate-900/30 backdrop-blur-md border border-white/20 dark:border-purple-900/20",
      bordered: "border border-slate-200 dark:border-slate-700 bg-transparent"
    };
    
    // Interactive card with hover effect
    const interactiveStyles = isInteractive 
      ? "transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 dark:hover:shadow-purple-500/10" 
      : "";

    return (
      <motion.div
        className={cn(baseStyles, variantStyles[variant], interactiveStyles, className)}
        ref={ref}
        initial={isInteractive ? { y: 0 } : undefined}
        whileHover={isInteractive ? { y: -5 } : undefined}
        {...props as any}
      >
        {children}
      </motion.div>
    );
  }
);

export const CardHeader = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 py-4 border-b border-slate-200 dark:border-slate-700", className)}
    {...props}
  />
));

export const CardTitle = React.forwardRef<
  HTMLParagraphElement, 
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn("font-semibold text-lg text-slate-900 dark:text-white", className)}
    {...props}
  />
));

export const CardDescription = React.forwardRef<
  HTMLParagraphElement, 
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-slate-500 dark:text-slate-400", className)}
    {...props}
  />
));

export const CardContent = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 py-4", className)}
    {...props}
  />
));

export const CardFooter = React.forwardRef<
  HTMLDivElement, 
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("px-6 py-4 border-t border-slate-200 dark:border-slate-700", className)}
    {...props}
  />
));

Card.displayName = 'Card';
CardHeader.displayName = 'CardHeader';
CardTitle.displayName = 'CardTitle';
CardDescription.displayName = 'CardDescription';
CardContent.displayName = 'CardContent';
CardFooter.displayName = 'CardFooter';

export { Card };
