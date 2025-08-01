"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import './background.css';

interface BackgroundProps {
  children?: React.ReactNode;
  variant?: 'matrix' | 'cyber' | 'minimal' | 'gradient';
  color?: 'purple' | 'blue' | 'green' | 'pink';
  intensity?: 'low' | 'medium' | 'high';
  hasGrid?: boolean;
  hasScanLines?: boolean;
  hasParticles?: boolean;
  className?: string;
  interactive?: boolean;
}

export const Background: React.FC<BackgroundProps> = ({
  children,
  variant = 'matrix',
  color = 'purple',
  intensity = 'medium',
  hasGrid = true,
  hasScanLines = true,
  hasParticles = false,
  className,
  interactive = false,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Set up interactive effects and track dimensions
  useEffect(() => {
    setIsMounted(true);
    
    if (interactive) {
      const handleMouseMove = (e: MouseEvent) => {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      };

      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
    
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      setIsMounted(false);
    };
  }, [interactive]);

  // Get gradient colors based on color prop
  const getGradientColors = () => {
    switch (color) {
      case 'purple':
        return 'from-indigo-900/50 via-purple-950/70 to-blue-900/50';
      case 'blue':
        return 'from-sky-900/50 via-blue-950/70 to-indigo-900/50';
      case 'green':
        return 'from-emerald-900/50 via-teal-950/70 to-cyan-900/50';
      case 'pink':
        return 'from-rose-900/50 via-pink-950/70 to-purple-900/50';
      default:
        return 'from-indigo-900/50 via-purple-950/70 to-blue-900/50';
    }
  };

  // Get grid color based on color prop
  const getGridColor = () => {
    switch (color) {
      case 'purple': return '#a78bfa'; // Lighter purple
      case 'blue': return '#38bdf8';   // Sky blue
      case 'green': return '#34d399';  // Emerald
      case 'pink': return '#fb7185';   // Rose
      default: return '#a78bfa';       // Lighter purple
    }
  };

  // Get intensity values
  const getIntensityValue = () => {
    switch (intensity) {
      case 'low': return { opacity: 0.05, blur: 'backdrop-blur-sm' };
      case 'medium': return { opacity: 0.1, blur: 'backdrop-blur-md' };
      case 'high': return { opacity: 0.15, blur: 'backdrop-blur-lg' };
      default: return { opacity: 0.1, blur: 'backdrop-blur-md' };
    }
  };

  // Variant-specific class names
  const getVariantClasses = () => {
    switch (variant) {
      case 'matrix':
        return 'matrix-bg';
      case 'cyber':
        return 'cyber-bg';
      case 'minimal':
        return 'minimal-bg';
      case 'gradient':
        return 'gradient-bg';
      default:
        return 'matrix-bg';
    }
  };

  // Generate interactive effect with glow that follows mouse
  const renderInteractiveEffect = () => {
    if (!interactive || !isMounted) return null;
    
    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${color === 'purple' ? 'rgba(139, 92, 246, 0.15)' : 
            color === 'blue' ? 'rgba(59, 130, 246, 0.15)' :
            color === 'green' ? 'rgba(16, 185, 129, 0.15)' :
            'rgba(236, 72, 153, 0.15)'} 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
        }}
        transition={{ type: 'spring', damping: 20 }}
      />
    );
  };

  const intensityValue = getIntensityValue();

  return (
    <div className={cn(
      "relative min-h-screen overflow-hidden",
      getVariantClasses(),
      hasScanLines && "scan-lines",
      className
    )}>
      {/* Base background gradient */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br",
          getGradientColors()
        )}></div>
        
        {/* Grid pattern */}
        {hasGrid && (
          <div className="absolute inset-0 opacity-[0.08] overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke={getGridColor()} strokeWidth="0.2" opacity="0.3" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        )}
        
        {/* Interactive mouse effect */}
        {renderInteractiveEffect()}
        
        {/* Particles effect placeholder - would be implemented with a separate component */}
        {hasParticles && (
          <div className="particles-container absolute inset-0"></div>
        )}
      </div>
      
      {/* Content container */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default Background;
