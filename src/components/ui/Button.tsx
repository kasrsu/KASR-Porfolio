import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface ButtonProps 
  extends Omit<HTMLMotionProps<"button">, "children"> {
  disabled?: boolean;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  as?: React.ElementType;
  href?: string;
}



const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, leftIcon, rightIcon, children, disabled, as: Component = 'button', href, ...props }, ref) => {
    
    // Base button styles
    const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900";
    
    // Variant styles
    const variantStyles = {
      primary: "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-600 dark:hover:bg-purple-500",
      secondary: "bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-white/30 dark:border-slate-700/30 text-slate-900 hover:bg-white/90 dark:text-slate-100 dark:hover:bg-slate-800/90 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/30",
      ghost: "bg-transparent hover:bg-white/60 dark:hover:bg-slate-800/60 backdrop-blur-sm text-slate-900 dark:text-slate-100 dark:hover:bg-slate-800"
    };
    
    // Size styles
    const sizeStyles = {
      sm: "text-sm px-3 py-1.5",
      md: "text-base px-4 py-2",
      lg: "text-lg px-6 py-3"
    };
    
    // Disabled styles
    const disabledStyles = "opacity-50 cursor-not-allowed";
    
    // If component is an anchor tag (a), we render it with motion.a
    if (Component === 'a') {
      
      return (
        <motion.a
          className={cn(
            baseStyles,
            variantStyles[variant],
            sizeStyles[size],
            disabled && disabledStyles,
            className
          )}
          href={href}
          whileHover={{ scale: disabled ? 1 : 1.02 }}
          whileTap={{ scale: disabled ? 1 : 0.98 }}

        >
          {leftIcon && <span className="mr-2">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="ml-2">{rightIcon}</span>}
        </motion.a>
      );
    }
    
    // Otherwise, render as button
    return (
      <motion.button
        className={cn(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          (disabled || isLoading) && disabledStyles,
          className
        )}
        ref={ref}
        disabled={disabled || isLoading}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        {...props}
      >
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';

export { Button };
