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
    color = 'default', 
    borderGlow = true,
    hoverEffect = true,
    ...props 
  }, ref) => {
    // Background styles optimized for dark theme
    const bgStyles = {
      low: "bg-gray-900 bg-opacity-50",
      medium: "bg-gray-800 bg-opacity-70", 
      high: "bg-gray-800 bg-opacity-90"
    };
    
    // Border styles for dark theme
    const borderStyles = {
      default: "border border-gray-700",
      purple: "border border-purple-600",
      blue: "border border-blue-600",
      green: "border border-emerald-600"
    };
    
    // Shadow styles for dark theme with glow effects
    const shadowStyles = {
      default: "shadow-md shadow-gray-900/50",
      purple: borderGlow ? "shadow-md shadow-purple-900/30" : "shadow-md shadow-gray-900/50",
      blue: borderGlow ? "shadow-md shadow-blue-900/30" : "shadow-md shadow-gray-900/50",
      green: borderGlow ? "shadow-md shadow-emerald-900/30" : "shadow-md shadow-gray-900/50"
    };
    
    // Hover styles with glow effect for dark theme
    const hoverStyles = hoverEffect ? 
      "transition-all duration-300 hover:shadow-xl hover:shadow-purple-900/20 hover:translate-y-[-5px]" : "";
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-xl relative overflow-hidden backdrop-blur-sm p-5 text-gray-100",
          bgStyles[intensity],
          borderStyles[color],
          shadowStyles[color],
          hoverStyles,
          className
        )}
        initial={{ opacity: 0.9 }}
        animate={{ opacity: 1 }}
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