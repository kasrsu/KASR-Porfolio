import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GlassCardProps {
  sections: React.ReactNode[];
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'default' | 'purple' | 'blue' | 'green';
  borderGlow?: boolean;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  sections,
  className,
  intensity = 'low',
  color = 'purple',
  borderGlow = true,
  hoverEffect = true,
}) => {
  const [currentSection, setCurrentSection] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionStartTime, setTransitionStartTime] = useState(0);
  
  // Increased transition cooldown for more deliberate scrolling
  const transitionCooldown = 1800; // Increased from 1200ms

  // Background opacity based on intensity
  const bgOpacity = {
    low: "bg-transparent dark:bg-transparent",
    medium: "bg-transparent dark:bg-transparent",
    high: "bg-transparent dark:bg-transparent",
  };

  // Border styles with optional glow
  const borderStyles = {
    default: borderGlow ? "border border-white/30 dark:border-white/15" : "border border-white/10 dark:border-white/5",
    purple: borderGlow ? "border border-purple-300/25 dark:border-purple-500/20 animate-pulse-glow" : "border border-purple-300/10 dark:border-purple-500/8",
    blue: borderGlow ? "border border-blue-300/25 dark:border-blue-500/20 animate-pulse-glow" : "border border-blue-300/10 dark:border-blue-500/8",
    green: borderGlow ? "border border-emerald-300/25 dark:border-emerald-500/20 animate-pulse-glow" : "border border-emerald-300/10 dark:border-emerald-500/8",
  };

  // Backdrop blur intensity
  const blurIntensity = {
    low: "backdrop-blur-sm",
    medium: "backdrop-blur-md",
    high: "backdrop-blur-lg",
  };

  // Change section with debounce protection
  const changeSection = (nextSectionIndex: number) => {
    // Validate section bounds
    if (nextSectionIndex < 0 || nextSectionIndex >= sections.length) return;
    
    // Check if we're in a cooldown period to prevent rapid transitions
    const currentTime = Date.now();
    if (isTransitioning && currentTime - transitionStartTime < transitionCooldown) return;
    
    // Set transitioning state
    setIsTransitioning(true);
    setTransitionStartTime(currentTime);
    
    // Change section
    setCurrentSection(nextSectionIndex);
    
    // Reset scroll position for the new section
    if (contentRef.current) {
      contentRef.current.scrollTop = 0;
    }
    
    // Clear transition state after cooldown
    setTimeout(() => {
      setIsTransitioning(false);
    }, transitionCooldown);
  };

  // Wheel event handling for section navigation
  const handleWheel = (e: WheelEvent) => {
    if (!contentRef.current) return;
    
    const content = contentRef.current;
    const { scrollTop, scrollHeight, clientHeight } = content;
    
    // Wider bottom threshold to make scrolling feel longer before triggering section change
    // Increased from 15px to 40px for a more spacious feel at the bottom
    const isAtTop = scrollTop <= 5;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 40;
    
    // If currently transitioning, block further transitions
    if (isTransitioning) return;
    
    // Only handle section changes when at the edges of content
    if ((e.deltaY > 0 && isAtBottom) || (e.deltaY < 0 && isAtTop)) {
      e.preventDefault();
      
      // Add visual indication that transition is locked for a moment
      document.body.style.cursor = 'wait';
      setTimeout(() => {
        document.body.style.cursor = 'auto';
      }, 500);
      
      // Calculate next section
      const nextSection = currentSection + (e.deltaY > 0 ? 1 : -1);
      changeSection(nextSection);
    }
  };

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    
    // Use passive: false to allow preventDefault()
    content.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      content.removeEventListener('wheel', handleWheel);
    };
  }, [currentSection, sections.length, isTransitioning]);

  // Touch handling
  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].clientY;
      const touchDiff = touchStartY - touchEndY;
      
      // Get scroll info
      const { scrollTop, scrollHeight, clientHeight } = content;
      const isAtTop = scrollTop <= 5;
      // Increased bottom threshold for touch as well
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 40;
      
      // If currently transitioning, block further transitions
      if (isTransitioning) return;
      
      // Minimum swipe distance
      if (Math.abs(touchDiff) > 50) {
        // Swipe down (negative) or swipe up (positive)
        if ((touchDiff > 0 && isAtBottom) || (touchDiff < 0 && isAtTop)) {
          const nextSection = currentSection + (touchDiff > 0 ? 1 : -1);
          changeSection(nextSection);
        }
      }
    };
    
    content.addEventListener('touchstart', handleTouchStart, { passive: true });
    content.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    return () => {
      content.removeEventListener('touchstart', handleTouchStart);
      content.removeEventListener('touchend', handleTouchEnd);
    };
  }, [currentSection, sections.length, isTransitioning]);

  // Animation variants with longer durations
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, // Increased from 0.6
        ease: [0.43, 0.13, 0.23, 0.96] // Custom easing
      }
    },
    exit: { 
      opacity: 0, 
      y: -50,
      transition: { 
        duration: 0.6, // Increased from 0.4
        ease: [0.43, 0.13, 0.23, 0.96] 
      }
    }
  };

  return (
    <div
      ref={cardRef}
      className={cn(
        "glass-card relative rounded-3xl overflow-hidden h-full",
        bgOpacity[intensity],
        blurIntensity[intensity],
        borderStyles[color],
        hoverEffect && "transition-all duration-500 ease-out hover:scale-[1.02]",
        className
      )}
    >
      {/* Content with AnimatePresence for smooth transitions */}
      <div 
        ref={contentRef} 
        className="h-full overflow-y-auto custom-scrollbar"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSection}
            className="p-6 md:p-10 min-h-full"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {sections[currentSection]}
            
            {/* Add extra padding at the bottom to make scrolling feel longer */}
            <div className="pb-24 md:pb-32"></div>
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Transition indicator - visible during transitions */}
      {isTransitioning && (
        <div className="absolute top-6 right-6 z-50 px-3 py-1.5 bg-black/50 text-white text-xs font-mono rounded-full border border-purple-500/20 animate-pulse">
          Changing section...
        </div>
      )}
      
      {/* Section indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3 z-50">
        {sections.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSection === index 
                ? 'bg-purple-500 scale-125 border border-purple-300' 
                : 'bg-gray-400/30 hover:bg-gray-300/50'
            }`}
            onClick={() => {
              if (!isTransitioning) {
                changeSection(index);
              }
            }}
            disabled={isTransitioning}
            aria-label={`View section ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};