import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { Navigation } from '../layout/Navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const { scrollY } = useScroll();
  
  useMotionValueEvent(scrollY, "change", (latest) => {
    // Check if scrolled more than 50px to show/hide background
    const isCurrentlyScrolled = latest > 50;
    setIsScrolled(isCurrentlyScrolled);
    
    // Hide header when scrolling down, show when scrolling up
    if (latest > lastScrollY && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
    
    setLastScrollY(latest);
  });

  return (
    <motion.header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/70 dark:bg-slate-900/80 backdrop-blur-xl border-b border-white/20 dark:border-slate-700/20 shadow-lg shadow-slate-200/20 dark:shadow-slate-900/30' 
          : 'bg-transparent',
        isHidden ? '-translate-y-full' : 'translate-y-0'
      )}
      initial={{ y: 0 }}
      animate={{ y: isHidden ? -100 : 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <motion.div 
            className="text-2xl font-bold text-slate-900 dark:text-white flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <span className="text-purple-600">DS</span>Portfolio
          </motion.div>
        </Link>
        
        <Navigation />
      </div>
    </motion.header>
  );
};
