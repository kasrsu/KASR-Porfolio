import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'default' | 'purple' | 'blue' | 'green';
  borderGlow?: boolean;
  hoverEffect?: boolean;
  className?: string;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    children, 
    className, 
    intensity = 'medium', 
    color = 'purple', 
    borderGlow = true,
    hoverEffect = false,
    ...props 
  }, ref) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card rounded-3xl relative overflow-hidden",
          // Simple consistent background
          "bg-black/20 backdrop-blur-xl",
          // Simple border
          "border border-purple-500/30",
          // Simple shadow
          "shadow-2xl shadow-purple-500/20",
          "transform-gpu will-change-transform",
          className
        )}
        style={{ pointerEvents: 'auto', ...props.style }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ 
          duration: 0.6, 
          ease: [0.23, 1, 0.32, 1]
        }}
        {...props}
      >
        {/* Content container */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';