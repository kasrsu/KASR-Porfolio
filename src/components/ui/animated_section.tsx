"use client";

import React, { ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import {
  fadeVariants,
  slideUpVariants,
  slideDownVariants,
  slideLeftVariants,
  slideRightVariants,
  scaleVariants
} from '@/lib/animations';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  animation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale' | 'none';
  threshold?: number;
  rootMargin?: string;
  delay?: number;
  once?: boolean;
  duration?: number;
}

export function AnimatedSection({
  children,
  className = '',
  id,
  animation = 'fade',
  threshold = 0.1,
  rootMargin = '0px 0px -100px 0px',
  delay = 0,
  once = true,
  duration,
}: AnimatedSectionProps) {
  const [ref, isInView] = useScrollAnimation<HTMLDivElement>({
    threshold,
    rootMargin,
    triggerOnce: once,
  });

  // Select animation variant based on prop
  const getVariants = (): Variants => {
    switch (animation) {
      case 'fade':
        return fadeVariants;
      case 'slideUp':
        return slideUpVariants;
      case 'slideDown':
        return slideDownVariants;
      case 'slideLeft':
        return slideLeftVariants;
      case 'slideRight':
        return slideRightVariants;
      case 'scale':
        return scaleVariants;
      case 'none':
      default:
        return {};
    }
  };

  // Custom transition with duration override
  const transition = duration ? {
    duration,
    delay,
  } : {
    delay,
  };

  return (
    <motion.section
      id={id}
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={getVariants()}
      transition={transition}
    >
      {children}
    </motion.section>
  );
}

interface AnimatedItemProps {
  children: ReactNode;
  className?: string;
  animation?: 'fade' | 'slideUp' | 'slideDown' | 'slideLeft' | 'slideRight' | 'scale';
  delay?: number;
  duration?: number;
  as?: React.ElementType;
}

export function AnimatedItem({
  children,
  className = '',
  animation = 'fade',
  delay = 0,
  duration,
  as: Component = 'div',
}: AnimatedItemProps) {
  // Select animation variant based on prop
  const getVariants = (): Variants => {
    switch (animation) {
      case 'fade':
        return fadeVariants;
      case 'slideUp':
        return slideUpVariants;
      case 'slideDown':
        return slideDownVariants;
      case 'slideLeft':
        return slideLeftVariants;
      case 'slideRight':
        return slideRightVariants;
      case 'scale':
        return scaleVariants;
      default:
        return fadeVariants;
    }
  };

  // Custom transition with duration override
  const transition = duration ? {
    duration,
    delay,
  } : {
    delay,
  };

  // Create the motion component dynamically based on the provided Component
  const MotionComponent = motion(Component as React.ComponentType<{ className?: string }>);

  return (
    <MotionComponent
      className={cn(className)}
      variants={getVariants()}
      transition={transition}
    >
      {children}
    </MotionComponent>
  );
}

interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  initialDelay?: number;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0.2,
}: StaggerContainerProps) {
  const containerVariants: Variants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: initialDelay,
      }
    }
  };

  return (
    <motion.div
      className={cn(className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}
