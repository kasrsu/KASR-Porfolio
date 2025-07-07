"use client";

import React, { useRef, useEffect } from 'react';
import { motion, useInView, useAnimation, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SmoothScrollSectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  threshold?: number;
  delay?: number;
  duration?: number;
  once?: boolean;
  animation?: 'fade' | 'slideUp' | 'scale' | 'none';
}

export const SmoothScrollSection: React.FC<SmoothScrollSectionProps> = ({
  children,
  className,
  id,
  threshold = 0.2,
  delay = 0.5,
  duration = 1,
  once = true,
  animation = 'fade',
}) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { 
    amount: threshold,
    // Only trigger once if specified
    once
  });
  
  // Support reduced motion accessibility setting
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // If in view and not reduced motion, trigger animation
    if (inView && !prefersReducedMotion) {
      controls.start('visible');
    } else if (!inView && !once && !prefersReducedMotion) {
      controls.start('hidden');
    }
  }, [controls, inView, once, prefersReducedMotion]);
  
  // Animation variants based on the animation type
  const getVariants = () => {
    if (prefersReducedMotion) {
      return {
        hidden: { opacity: 1 },
        visible: { opacity: 1 }
      };
    }
    
    switch (animation) {
      case 'fade':
        return {
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1,
            transition: { 
              duration,
              delay,
              ease: "easeOut"
            }
          }
        };
      case 'slideUp':
        return {
          hidden: { opacity: 0, y: 50 },
          visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
              duration,
              delay,
              ease: "easeOut"
            }
          }
        };
      case 'scale':
        return {
          hidden: { opacity: 0, scale: 0.9 },
          visible: { 
            opacity: 1, 
            scale: 1,
            transition: { 
              duration,
              delay,
              ease: "easeOut"
            }
          }
        };
      case 'none':
        return {
          hidden: {},
          visible: {}
        };
      default:
        return {
          hidden: { opacity: 0 },
          visible: { opacity: 1 }
        };
    }
  };
  
  return (
    <motion.div
      ref={ref}
      id={id}
      className={cn(className)}
      initial="hidden"
      animate={controls}
      variants={getVariants()}
      // Using willChange to optimize for animations
      style={{ 
        willChange: animation !== 'none' ? 'opacity, transform' : 'auto',
      }}
    >
      {children}
    </motion.div>
  );
};

// Omit HTML event handlers that conflict with Framer Motion's event handlers
type MotionSafeProps = Omit<React.HTMLAttributes<HTMLDivElement>, 
  'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag' | 
  'onMouseMove' | 'onMouseDown' | 'onMouseUp' | 'onTap' | 'onTapStart' | 'onTapCancel'>;

interface ScrollRevealProps extends MotionSafeProps {
  children: React.ReactNode;
  animation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  staggerChildren?: boolean;
  staggerDelay?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className,
  animation = 'fade',
  delay = 0,
  duration = 0.5,
  threshold = 0.1,
  once = true,
  staggerChildren = false,
  staggerDelay = 0.1,
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: threshold, once });
  const prefersReducedMotion = useReducedMotion();
  
  // Base animation variants
  const baseVariants = {
    fade: {
      hidden: { opacity: 0 },
      visible: { opacity: 1 }
    },
    slideUp: {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0 }
    },
    slideDown: {
      hidden: { opacity: 0, y: -30 },
      visible: { opacity: 1, y: 0 }
    },
    slideLeft: {
      hidden: { opacity: 0, x: 30 },
      visible: { opacity: 1, x: 0 }
    },
    slideRight: {
      hidden: { opacity: 0, x: -30 },
      visible: { opacity: 1, x: 0 }
    },
    scale: {
      hidden: { opacity: 0, scale: 0.9 },
      visible: { opacity: 1, scale: 1 }
    }
  };
  
  // Get the appropriate variants
  const variants = baseVariants[animation];
  
  // Container for staggered children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        delayChildren: delay,
        staggerChildren: staggerChildren ? staggerDelay : 0
      }
    }
  };
  
  if (prefersReducedMotion) {
    // Skip animations for users with reduced motion preference
    return <div className={className} {...props}>{children}</div>;
  }
  
  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={staggerChildren ? containerVariants : variants}
      transition={{ 
        duration, 
        delay: staggerChildren ? 0 : delay, 
        ease: "easeOut" 
      }}
      style={{ willChange: 'opacity, transform' }}
      {...props}
    >
      {staggerChildren ? (
        React.Children.map(children, (child, index) => {
          if (!React.isValidElement(child)) return child;
          
          return (
            <motion.div
              key={index}
              variants={variants}
              transition={{ 
                duration, 
                // Each child gets progressively more delay
                ease: "easeOut"
              }}
              style={{ willChange: 'opacity, transform' }}
            >
              {child}
            </motion.div>
          );
        })
      ) : (
        children
      )}
    </motion.div>
  );
};

export const ScrollRevealCard: React.FC<ScrollRevealProps> = (props) => {
  return (
    <ScrollReveal
      {...props}
      className={cn("transform-gpu", props.className)} // Force GPU acceleration
      threshold={0.1} // Start animation earlier
      duration={0.6} // Slightly slower for smoother feel
    >
      {props.children}
    </ScrollReveal>
  );
};
