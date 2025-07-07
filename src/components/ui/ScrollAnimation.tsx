"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import { cn } from '@/lib/utils';

// Animation variants
const animationVariants: Record<string, Variants> = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { opacity: 0, y: 100 },
    visible: { opacity: 1, y: 0 }
  },
  slideDown: {
    hidden: { opacity: 0, y: -100 },
    visible: { opacity: 1, y: 0 }
  },
  slideLeft: {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0 }
  },
  slideRight: {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0 }
  },
  scaleUp: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 }
  },
  scaleDown: {
    hidden: { opacity: 0, scale: 1.2 },
    visible: { opacity: 1, scale: 1 }
  }
};

interface ScrollAnimationProps {
  children: React.ReactNode;
  animation?: keyof typeof animationVariants;
  className?: string;
  threshold?: number;
  duration?: number;
  delay?: number;
  triggerOnce?: boolean;
  disableAnimation?: boolean;
  rootMargin?: string;
}

export function ScrollAnimation({
  children,
  animation = 'fadeIn',
  className = '',
  threshold = 0.1,
  duration = 0.8,
  delay = 0,
  triggerOnce = true,
  disableAnimation = false,
  rootMargin = '0px'
}: ScrollAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    amount: threshold,
    margin: rootMargin
  });

  // If animations are disabled, just render the children
  if (disableAnimation) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animationVariants[animation]}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Component for conditional animations based on current section
interface SectionAnimationProps extends ScrollAnimationProps {
  activeSection: number;
  sectionIndex: number;
}

export function SectionAnimation({
  children,
  animation = 'fadeIn',
  className = '',
  duration = 0.8,
  delay = 0,
  activeSection,
  sectionIndex
}: SectionAnimationProps) {
  // Animation is triggered when the section becomes active
  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate={activeSection >= sectionIndex ? 'visible' : 'hidden'}
      variants={animationVariants[animation]}
      transition={{ duration, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

// Component to create a staggered animation for children
interface StaggeredAnimationProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
  initialDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function StaggeredAnimation({
  children,
  staggerDelay = 0.1,
  className = '',
  initialDelay = 0,
  threshold = 0.1,
  triggerOnce = true
}: StaggeredAnimationProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { 
    once: triggerOnce,
    amount: threshold 
  });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay
      }
    }
  };
  
  const childVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 200, damping: 20 }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
    >
      {React.Children.map(children, (child) => {
        if (!React.isValidElement(child)) return child;
        return (
          <motion.div variants={childVariants}>
            {child}
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// Hook to get current section based on scroll position
export function useActiveSection(sectionRefs: React.RefObject<HTMLElement>[], threshold = 0.5): number {
  const [activeSection, setActiveSection] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const viewportHeight = window.innerHeight;
      const scrollPosition = window.scrollY;
      
      let newActiveSection = 0;
      
      sectionRefs.forEach((ref, index) => {
        if (!ref.current) return;
        
        const { offsetTop, offsetHeight } = ref.current;
        const sectionTop = offsetTop - viewportHeight * (1 - threshold);
        
        if (scrollPosition >= sectionTop) {
          newActiveSection = index;
        }
      });
      
      setActiveSection(newActiveSection);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionRefs, threshold]);

  return activeSection;
}
