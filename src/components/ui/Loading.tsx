import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface LoadingProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'spinner' | 'dots' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  color?: 'default' | 'purple';
}

const Loading = React.forwardRef<HTMLDivElement, LoadingProps>(
  ({ className, variant = 'spinner', size = 'md', color = 'purple', ...props }, ref) => {
    // Size mappings
    const sizeMap = {
      sm: { spinner: 'h-4 w-4', container: 'h-4 w-4', dots: 'h-2 w-2' },
      md: { spinner: 'h-8 w-8', container: 'h-8 w-8', dots: 'h-3 w-3' },
      lg: { spinner: 'h-12 w-12', container: 'h-12 w-12', dots: 'h-4 w-4' },
    };

    // Color mappings
    const colorMap = {
      default: 'text-slate-600 dark:text-slate-200',
      purple: 'text-purple-600 dark:text-purple-400',
    };

    // Pulse animation variant
    const pulseVariants = {
      animate: {
        scale: [1, 1.2, 1],
        opacity: [0.6, 1, 0.6],
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }
      }
    };

    // Dots animation variants
    const dotsVariants = {
      animate: (i: number) => ({
        y: [0, -8, 0],
        transition: {
          delay: i * 0.15,
          duration: 0.6,
          repeat: Infinity,
          repeatType: "loop" as const,
        }
      })
    };

    return (
      <div ref={ref} className={cn("flex items-center justify-center", className)} {...props}>
        {variant === 'spinner' && (
          <motion.svg
            className={cn("animate-spin", sizeMap[size].spinner, colorMap[color])}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            animate={{ rotate: 360 }}
            transition={{ 
              duration: 1, 
              repeat: Infinity, 
              ease: "linear" 
            }}
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </motion.svg>
        )}

        {variant === 'dots' && (
          <div className="flex space-x-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={cn("rounded-full", sizeMap[size].dots, colorMap[color])}
                custom={i}
                variants={dotsVariants}
                animate="animate"
              />
            ))}
          </div>
        )}

        {variant === 'pulse' && (
          <motion.div
            className={cn(
              "rounded-full", 
              sizeMap[size].container,
              colorMap[color],
              "bg-current"
            )}
            variants={pulseVariants}
            animate="animate"
          />
        )}
      </div>
    );
  }
);

Loading.displayName = 'Loading';

export { Loading };
