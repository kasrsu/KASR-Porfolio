import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  children: React.ReactNode;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'default' | 'purple' | 'blue' | 'green';
  bgOpacity?: 'low' | 'medium' | 'high';
  borderGlow?: boolean;
  hoverEffect?: boolean;
  className?: string;
}

export const GlassCard = React.forwardRef<HTMLDivElement, GlassCardProps>(
  ({ 
    children, 
    className, 
    intensity = 'high', 
    color = 'default', 
    borderGlow = true,
    hoverEffect = true,
    ...props 
  }, ref) => {
    // Background opacity based on intensity - slightly reduced for subtle breathing
    const bgOpacity = {
      low: "bg-white/15 dark:bg-white/12",
      medium: "bg-white/25 dark:bg-white/20", 
      high: "bg-white/35 dark:bg-white/30"
    };
    
    // Enhanced border styles with subtle glow
    const borderStyles = {
      default: borderGlow ? "border border-white/35 dark:border-white/20" : "border border-white/15 dark:border-white/8",
      purple: borderGlow ? "border border-purple-300/35 dark:border-purple-500/25 animate-subtle-glow" : "border border-purple-300/15 dark:border-purple-500/12",
      blue: borderGlow ? "border border-blue-300/35 dark:border-blue-500/25 animate-subtle-glow" : "border border-blue-300/15 dark:border-blue-500/12",
      green: borderGlow ? "border border-emerald-300/35 dark:border-emerald-500/25 animate-subtle-glow" : "border border-emerald-300/15 dark:border-emerald-500/12"
    };
    
    // Backdrop blur intensity
    const blurIntensity = {
      low: "backdrop-blur-sm",
      medium: "backdrop-blur-md",
      high: "backdrop-blur-lg"
    };
    
    // Enhanced shadow styles - removed pulsing animations
    const shadowStyles = {
      default: "shadow-[0_8px_32px_rgba(0,0,0,0.12)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.18)]",
      purple: "shadow-[0_8px_32px_rgba(139,92,246,0.15)] dark:shadow-[0_8px_24px_rgba(139,92,246,0.20)]",
      blue: "shadow-[0_8px_32px_rgba(59,130,246,0.15)] dark:shadow-[0_8px_24px_rgba(59,130,246,0.20)]",
      green: "shadow-[0_8px_32px_rgba(16,185,129,0.15)] dark:shadow-[0_8px_24px_rgba(16,185,129,0.20)]"
    };
    
    // Subtle hover animation
    const hoverStyles = hoverEffect ? 
      "transition-all duration-500 ease-out hover:shadow-[0_20px_40px_rgba(139,92,246,0.12)] hover:border-opacity-70 hover:backdrop-blur-xl hover:scale-[1.001]" : "";
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card rounded-3xl relative overflow-hidden animate-subtle-breath",
          bgOpacity[intensity],
          borderStyles[color],
          shadowStyles[color],
          hoverStyles,
          className
        )}
        {...props}
      >
        {/* Subtle animated glow border overlay */}
        <div className="absolute inset-0 rounded-3xl animate-subtle-border-glow opacity-30 pointer-events-none z-[1]"></div>
        
        {/* Gentle edge highlights with subtle animation */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-[1] animate-gentle-shimmer"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/8 to-transparent z-[1]"></div>
        
        {/* Static glass effect layer */}
        <div className="absolute top-2 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-white/12 to-transparent z-0 opacity-35"></div>
        
        {/* Content container with proper z-index */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';