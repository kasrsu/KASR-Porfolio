"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

interface ScrollProgressBarProps {
  color?: string;
  height?: number;
  position?: 'top' | 'bottom';
}

export function ScrollProgressBar({ 
  color = "#a855f7", // Purple by default
  height = 3,
  position = 'top'
}: ScrollProgressBarProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { 
    stiffness: 100, 
    damping: 30, 
    restDelta: 0.001 
  });
  
  // Position styling
  const positionStyles = {
    top: position === 'top' ? 0 : 'auto',
    bottom: position === 'bottom' ? 0 : 'auto',
  };
  
  return (
    <motion.div
      className="fixed left-0 right-0 z-50 origin-left"
      style={{
        scaleX,
        backgroundColor: color,
        height,
        ...positionStyles,
      }}
    />
  );
}

// Component that shows scroll percentage in a circle
export function ScrollProgressCircle({ 
  size = 50, 
  strokeWidth = 3,
  color = "#a855f7",
  bgColor = "rgba(255, 255, 255, 0.2)"
}: {
  size?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
}) {
  const { scrollYProgress } = useScroll();
  const [percentage, setPercentage] = useState(0);
  
  // Calculate circle properties
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  
  useEffect(() => {
    return scrollYProgress.onChange((v) => {
      setPercentage(Math.round(v * 100));
    });
  }, [scrollYProgress]);
  
  return (
    <div className="fixed bottom-8 right-8 z-50 flex items-center justify-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={bgColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - (scrollYProgress.get() * circumference)}
          style={{ strokeDashoffset: scrollYProgress.get() * circumference }}
        />
      </svg>
      
      {/* Percentage text */}
      <div 
        className="absolute text-xs font-semibold" 
        style={{ color }}
      >
        {percentage}%
      </div>
    </div>
  );
}
