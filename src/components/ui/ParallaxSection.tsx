"use client";

import React, { ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export function ParallaxLayer({
  children,
  speed = 0.5,
  className = '',
  direction = 'up',
}: ParallaxLayerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Calculate transform based on direction
  const getTransformValues = () => {
    const distance = 100 * speed; // Adjust distance based on speed
    
    switch(direction) {
      case 'up':
        return useTransform(scrollYProgress, [0, 1], [0, -distance]);
      case 'down':
        return useTransform(scrollYProgress, [0, 1], [0, distance]);
      case 'left':
        return useTransform(scrollYProgress, [0, 1], [0, -distance]);
      case 'right':
        return useTransform(scrollYProgress, [0, 1], [0, distance]);
      default:
        return useTransform(scrollYProgress, [0, 1], [0, -distance]);
    }
  };
  
  // Get appropriate transform property based on direction
  const transform = getTransformValues();
  const isHorizontal = direction === 'left' || direction === 'right';
  
  return (
    <motion.div
      ref={ref}
      className={cn("will-change-transform", className)}
      style={{
        [isHorizontal ? 'x' : 'y']: transform
      }}
    >
      {children}
    </motion.div>
  );
}

interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  bgImage?: string;
  bgColor?: string;
  id?: string;
  overlayOpacity?: number;
  overlayColor?: string;
  bgParallaxSpeed?: number;
}

export function ParallaxSection({
  children,
  className = '',
  bgImage,
  bgColor = 'transparent',
  id,
  overlayOpacity = 0.5,
  overlayColor = 'black',
  bgParallaxSpeed = 0.2,
}: ParallaxSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  // Background parallax effect
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', `${bgParallaxSpeed * 100}%`]);
  
  return (
    <section
      id={id}
      ref={sectionRef}
      className={cn(
        "relative overflow-hidden",
        className
      )}
      style={{ backgroundColor: bgColor }}
    >
      {/* Parallax background */}
      {bgImage && (
        <motion.div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            y: bgY
          }}
        >
          {/* Overlay */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundColor: overlayColor,
              opacity: overlayOpacity
            }}
          />
        </motion.div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </section>
  );
}
