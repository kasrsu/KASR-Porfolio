import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MystEffectProps {
  className?: string;
  onMistClear?: (cleared: boolean) => void;
  disabled?: boolean; // Add disabled prop
}

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  opacity: number;
  speed: number;
  color: string;
}

export default function MystEffect({ className = '', onMistClear, disabled = false }: MystEffectProps) {
  const [isClient, setIsClient] = useState(false);
  const [isMistCleared, setIsMistCleared] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Initialize client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Generate particles
  useEffect(() => {
    if (!isClient) return;

    const generateParticles = () => {
      const newParticles: Particle[] = [];
      const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B', '#10B981'];
      
      for (let i = 0; i < 50; i++) {
        newParticles.push({
          id: i,
          x: Math.random() * 100,
          y: Math.random() * 100,
          size: Math.random() * 6 + 2,
          opacity: Math.random() * 0.6 + 0.2,
          speed: Math.random() * 2 + 0.5,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
      setParticles(newParticles);
    };

    generateParticles();
  }, [isClient]);

  // Mouse event handlers
  useEffect(() => {
    if (!isClient || !containerRef.current || disabled) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100
      });
    };

    const handleMouseEnter = () => {
      setIsMistCleared(true);
      onMistClear?.(true);
    };

    const handleMouseLeave = () => {
      setIsMistCleared(false);
      onMistClear?.(false);
      setMousePosition({ x: 50, y: 50 });
    };

    const container = containerRef.current;
    container.addEventListener('mousemove', handleMouseMove, { passive: true });
    container.addEventListener('mouseenter', handleMouseEnter, { passive: true });
    container.addEventListener('mouseleave', handleMouseLeave, { passive: true });

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isClient, onMistClear, disabled]);

  if (!isClient) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-slate-800/10 to-slate-900/20" />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 ${className} pointer-events-none`}
      style={{ pointerEvents: 'none' }}
    >
      {/* Enable pointer events only when not disabled */}
      <div 
        className={`absolute inset-0 ${disabled ? 'pointer-events-none' : 'pointer-events-auto'}`}
        style={{ 
          pointerEvents: disabled ? 'none' : 'auto', 
          background: 'transparent',
          opacity: disabled ? 0.5 : 1,
          transition: 'opacity 0.3s ease-in-out'
        }}
        onMouseMove={(e) => {
          if (disabled) return;
          const rect = containerRef.current?.getBoundingClientRect();
          if (rect) {
            setMousePosition({
              x: ((e.clientX - rect.left) / rect.width) * 100,
              y: ((e.clientY - rect.top) / rect.height) * 100
            });
          }
        }}
        onMouseEnter={() => {
          if (disabled) return;
          setIsMistCleared(true);
          onMistClear?.(true);
        }}
        onMouseLeave={() => {
          if (disabled) return;
          setIsMistCleared(false);
          onMistClear?.(false);
          setMousePosition({ x: 50, y: 50 });
        }}
      />

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/10 via-slate-800/5 to-slate-900/10 pointer-events-none" />
      
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute pointer-events-none rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              opacity: particle.opacity,
              filter: 'blur(1px)',
            }}
            animate={{
              x: isMistCleared 
                ? `${(particle.x - mousePosition.x) * 3}px`
                : [`0px`, `${Math.sin(particle.id) * 20}px`, `0px`],
              y: isMistCleared 
                ? `${(particle.y - mousePosition.y) * 3}px`
                : [`0px`, `${Math.cos(particle.id) * 15}px`, `0px`],
              opacity: isMistCleared ? 0 : particle.opacity,
              scale: isMistCleared ? 0.5 : [1, 1.2, 1],
            }}
            transition={{
              duration: isMistCleared ? 1 : 4,
              repeat: isMistCleared ? 0 : Infinity,
              ease: isMistCleared ? "easeOut" : "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Ambient floating orbs */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`orb-${i}`}
            className="absolute rounded-full pointer-events-none"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 2) * 40}%`,
              width: `${60 + i * 10}px`,
              height: `${60 + i * 10}px`,
              background: `radial-gradient(circle, ${
                ['rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.1)', 'rgba(6, 182, 212, 0.1)'][i % 3]
              } 0%, transparent 70%)`,
              filter: 'blur(2px)',
            }}
            animate={{
              x: [0, 30, 0],
              y: [0, -20, 0],
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 6 + i,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Mouse cursor effect */}
      <AnimatePresence>
        {isMistCleared && (
          <motion.div
            className="absolute pointer-events-none z-40"
            style={{
              left: `${mousePosition.x}%`,
              top: `${mousePosition.y}%`,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
          >
            <div className="relative -translate-x-1/2 -translate-y-1/2">
              {/* Outer glow */}
              <motion.div
                className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(236, 72, 153, 0.2) 50%, transparent 70%)',
                  filter: 'blur(8px)',
                }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.8, 1, 0.8],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              
              {/* Inner core */}
              <motion.div
                className="absolute w-4 h-4 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"
                style={{
                  filter: 'blur(0.5px)',
                  boxShadow: '0 0 20px rgba(255, 255, 255, 0.8)',
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.9, 1, 0.9],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* Show loading hint when disabled */}
      {disabled && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <div className="text-center">
            <div className="inline-flex items-center space-x-3 bg-black/30 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span className="text-white/60 text-sm font-medium tracking-wide font-terminal">
                Loading experience...
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Interaction hint */}
      {!isMistCleared && !disabled && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 1 }}
          >
            <div className="inline-flex items-center space-x-3 bg-black/20 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
              <motion.div 
                className="w-2 h-2 bg-purple-400 rounded-full"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span className="text-white/80 text-sm font-medium tracking-wide font-terminal">
                Move cursor to interact with particles
              </span>
            </div>
          </motion.div>
        </div>
      )}

      {/* Scroll hint when mist is cleared */}
      <AnimatePresence>
        {isMistCleared && (
          <motion.div
            className="absolute bottom-16 left-1/2 transform -translate-x-1/2 pointer-events-none z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-center">
              <div className="inline-flex items-center space-x-3 bg-black/30 backdrop-blur-lg rounded-full px-6 py-3 border border-white/10">
                <motion.div 
                  className="w-2 h-2 bg-purple-400 rounded-full"
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
                <span className="text-white/90 text-sm font-medium tracking-wide font-terminal">
                  Scroll down to explore sections
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 pointer-events-none"
        animate={{
          opacity: isMistCleared ? [0.3, 0.6, 0.3] : [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}