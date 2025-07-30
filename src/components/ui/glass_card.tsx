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
    
    // Enhanced border styles with smoother glow
    const borderStyles = {
      default: borderGlow ? "border border-white/30 dark:border-white/15" : "border border-white/10 dark:border-white/5",
      purple: borderGlow ? "border border-purple-300/40 dark:border-purple-500/30" : "border border-purple-300/10 dark:border-purple-500/8",
      blue: borderGlow ? "border border-blue-300/40 dark:border-blue-500/30" : "border border-blue-300/10 dark:border-blue-500/8",
      green: borderGlow ? "border border-emerald-300/40 dark:border-emerald-500/30" : "border border-emerald-300/10 dark:border-emerald-500/8"
    };
    
    // Fixed backdrop blur intensity
    const blurIntensity = {
      low: "backdrop-blur-[12px]",
      medium: "backdrop-blur-[15px]",
      high: "backdrop-blur-[20px]",
    };
    
    // Smoother shadow styles
    const shadowStyles = {
      default: "shadow-[0_8px_32px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.12)]",
      purple: "shadow-[0_8px_32px_rgba(139,92,246,0.12)] dark:shadow-[0_8px_24px_rgba(139,92,246,0.18)]",
      blue: "shadow-[0_8px_32px_rgba(59,130,246,0.12)] dark:shadow-[0_8px_24px_rgba(59,130,246,0.18)]",
      green: "shadow-[0_8px_32px_rgba(16,185,129,0.12)] dark:shadow-[0_8px_24px_rgba(16,185,129,0.18)]"
    };
    
    // Smoother hover animation
    const hoverStyles = hoverEffect ? 
      "transition-all duration-300 ease-out hover:shadow-[0_16px_64px_rgba(139,92,246,0.15)] hover:scale-[1.005] hover:border-opacity-60" : "";
    
    return (
      <motion.div
        ref={ref}
        className={cn(
          "glass-card rounded-3xl relative overflow-hidden z-10",
          "mt-4 md:mt-6 mb-8 md:mb-12 p-2 md:p-4", // Added bottom margin
          bgOpacity[intensity],
          borderStyles[color],
          blurIntensity[intensity],
          shadowStyles[color],
          hoverStyles,
          className
        )}
        style={{
          boxShadow: borderGlow && color === 'purple' ? 
            '0 0 20px rgba(139, 92, 246, 0.1), 0 8px 32px rgba(139, 92, 246, 0.08)' : 
            undefined
        }}
        {...props}
      >
        {/* Subtle animated border overlay - reduced opacity to prevent flickering */}
        {borderGlow && (
          <div 
            className="absolute inset-0 rounded-3xl pointer-events-none z-0"
            style={{
              background: color === 'purple' ? 
                'linear-gradient(45deg, transparent 0%, rgba(139, 92, 246, 0.03) 25%, transparent 50%, rgba(139, 92, 246, 0.03) 75%, transparent 100%)' :
                'linear-gradient(45deg, transparent 0%, rgba(255, 255, 255, 0.02) 25%, transparent 50%, rgba(255, 255, 255, 0.02) 75%, transparent 100%)',
              animation: 'gentle-glow 4s ease-in-out infinite'
            }}
          />
        )}
        
        {/* Subtle edge highlights */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0 opacity-60"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0 opacity-40"></div>
        
        {/* Content container with proper z-index */}
        <div className="relative z-20 w-full h-full p-2 md:p-4">
          {children}
        </div>
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';
