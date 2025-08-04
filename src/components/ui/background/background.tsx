"use client";

import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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

interface Dimensions {
  width: number;
  height: number;
}

// Define variant classes outside component to avoid conditional hooks
const getVariantClasses = () => {
  return 'matrix-bg';
};

export const Background: React.FC<BackgroundProps> = ({
  children,
  color = 'purple',
  hasGrid = true,
  hasScanLines = true,
  hasParticles = false,
  className,
  interactive = false,
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [,setDimensions] = useState<Dimensions>({ width: 0, height: 0 });
  const [isMounted, setIsMounted] = useState(false);

  // Scroll-based purple intensity
  const { scrollYProgress } = useScroll();
  const purpleIntensity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0.05, 0.15, 0.25, 0.35]);
  const backgroundDarkness = useTransform(scrollYProgress, [0, 1], [0.95, 0.6]);
  
  // Scroll-based class for background lightening
  const scrollClass = useTransform(scrollYProgress, 
    [0, 0.25, 0.5, 0.75, 1], 
    ['scroll-0', 'scroll-25', 'scroll-50', 'scroll-75', 'scroll-100']
  );
  
  // Pre-compute transform values for grid opacity to avoid conditional hooks
  const gridOpacity = useTransform(scrollYProgress, [0, 1], [0.05, 0.12]);
  const pathOpacity = useTransform(scrollYProgress, [0, 1], [0.2, 0.5]);
  const glowOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.2, 0.4]);

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
  }, [interactive, setDimensions]);

  // Get lighter gradient colors
  const getGradientColors = () => {
    switch (color) {
      case 'purple':
        return 'from-black/90 via-gray-900/80 to-purple-950/30';
      case 'blue':
        return 'from-black/90 via-gray-900/80 to-blue-950/30';
      case 'green':
        return 'from-black/90 via-gray-900/80 to-emerald-950/30';
      case 'pink':
        return 'from-black/90 via-gray-900/80 to-rose-950/30';
      default:
        return 'from-black/90 via-gray-900/80 to-purple-950/30';
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

  // Enhanced interactive effect with scroll-based purple intensity
  const renderInteractiveEffect = () => {
    if (!interactive || !isMounted) return null;
    
    return (
      <motion.div
        className="absolute pointer-events-none"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: 800,
          height: 800,
          borderRadius: '50%',
          background: `radial-gradient(circle, rgba(139, 92, 246, ${purpleIntensity}) 0%, transparent 70%)`,
          transform: 'translate(-50%, -50%)',
          filter: 'blur(8px)',
          mixBlendMode: 'screen',
        }}
        transition={{ type: 'spring', damping: 20 }}
      />
    );
  };

  const currentScrollClass = scrollClass.get();

  return (
    <div className={cn(
      "relative min-h-screen overflow-hidden",
      getVariantClasses(),
      hasScanLines && "scan-lines",
      currentScrollClass,
      "scroll-bg-lighten",
      className
    )}>
      {/* Lighter base background with scroll-based purple overlay */}
      <div className="fixed inset-0 w-full h-full z-0">
        {/* Dark base layer */}
        <motion.div 
          className="absolute inset-0 bg-black"
          style={{ opacity: backgroundDarkness }}
        />
        
        {/* Lighter gradient overlay */}
        <div className={cn(
          "absolute inset-0 bg-gradient-to-br opacity-70",
          getGradientColors()
        )} />
        
        {/* Scroll-based purple overlay that gets stronger with scrolling */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-purple-800/15 to-purple-600/20"
          style={{ opacity: purpleIntensity }}
        />
        
        {/* Additional purple glow layer that appears on scroll */}
        <motion.div 
          className="absolute inset-0 bg-gradient-radial"
          style={{ 
            opacity: glowOpacity,
            background: `radial-gradient(circle at center, rgba(139, 92, 246, 0.1) 0%, transparent 50%)`
          }}
        />
        
        {/* Grid pattern with enhanced purple - more subtle */}
        {hasGrid && (
          <motion.div 
            className="absolute inset-0 opacity-[0.05] overflow-hidden"
            style={{ opacity: gridOpacity }}
          >
            <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <motion.path 
                    d="M 10 0 L 0 0 0 10" 
                    fill="none" 
                    stroke={getGridColor()} 
                    strokeWidth="0.2" 
                    style={{ opacity: pathOpacity }}
                  />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </motion.div>
        )}
        
        {/* Enhanced interactive mouse effect with scroll-based intensity */}
        {renderInteractiveEffect()}
        
        {/* Particles effect placeholder */}
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
