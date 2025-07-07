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
    // Background opacity based on intensity
    const bgOpacity = {
      low: "bg-white/10 dark:bg-slate-800/5",
      medium: "bg-white/15 dark:bg-slate-800/10",
      high: "bg-white/20 dark:bg-slate-800/15",
    };
    
    // Enhanced border styles with stronger glow
    const borderStyles = {
      default: borderGlow ? "border border-white/30 dark:border-white/15" : "border border-white/10 dark:border-white/5",
      purple: borderGlow ? "border border-purple-300/25 dark:border-purple-500/20 animate-pulse-glow" : "border border-purple-300/10 dark:border-purple-500/8",
      blue: borderGlow ? "border border-blue-300/25 dark:border-blue-500/20 animate-pulse-glow" : "border border-blue-300/10 dark:border-blue-500/8",
      green: borderGlow ? "border border-emerald-300/25 dark:border-emerald-500/20 animate-pulse-glow" : "border border-emerald-300/10 dark:border-emerald-500/8"
    };
    
    // Backdrop blur intensity
    const blurIntensity = {
      low: "backdrop-blur-[12px]",
      medium: "backdrop-blur-[15px]",
      high: "backdrop-blur-[20px]",
    };
    
    // Enhanced shadow styles with stronger glow
    const shadowStyles = {
      default: "shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
      purple: "shadow-[0_8px_32px_rgba(139,92,246,0.08)] dark:shadow-[0_8px_24px_rgba(139,92,246,0.12)] animate-glow-pulse",
      blue: "shadow-[0_8px_32px_rgba(59,130,246,0.08)] dark:shadow-[0_8px_24px_rgba(59,130,246,0.12)] animate-glow-pulse",
      green: "shadow-[0_8px_32px_rgba(16,185,129,0.08)] dark:shadow-[0_8px_24px_rgba(16,185,129,0.12)] animate-glow-pulse"
    };
    
    // Enhanced hover animation with stronger glow
    const hoverStyles = hoverEffect ? 
      "transition-all duration-500 ease-out hover:shadow-[0_20px_80px_rgba(139,92,246,0.2)] hover:border-opacity-80 hover:backdrop-blur-[20px] hover:scale-[1.008]" : "";
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card rounded-3xl relative overflow-hidden",
          bgOpacity[intensity],
          borderStyles[color],
          blurIntensity[intensity],
          shadowStyles[color],
          hoverStyles,
          className
        )}
        {...props}
      >
        {/* Enhanced animated glow border overlay */}
        <div className="absolute inset-0 rounded-3xl animate-border-glow opacity-70 pointer-events-none z-0"></div>
        
        {/* Enhanced edge highlights with stronger animation */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent z-0 animate-shimmer"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent z-0"></div>
        
        {/* Additional glass effect layers */}
        <div className="absolute top-2 left-2 right-2 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 opacity-60"></div>
        
        {/* Content container with proper z-index */}
        <div className="relative z-10 w-full h-full">
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
