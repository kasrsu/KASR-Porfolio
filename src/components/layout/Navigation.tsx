import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '../ui/Button';

// Navigation links
const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/skills', label: 'Skills' },
  { href: '/contact', label: 'Contact' },
];

export const Navigation = () => {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  
  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    
    // Initial setup
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [router.asPath]);

  // Close mobile menu when window is resized above mobile breakpoint
  useEffect(() => {
    if (windowWidth > 768) {
      setIsMobileMenuOpen(false);
    }
  }, [windowWidth]);

  // Animation variants for the navigation links
  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
      },
    }),
    hover: { 
      scale: 1.05, 
      color: 'var(--color-purple-600)',
      transition: { duration: 0.2 } 
    }
  };

  // Hamburger menu button animation variants
  const hamburgerVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  const lineOneVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6 }
  };

  const lineTwoVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 }
  };

  const lineThreeVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -6 }
  };

  return (
    <nav className="relative">
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center space-x-1">
        <ul className="flex space-x-1">
          {navLinks.map((link, i) => {
            const isActive = router.asPath === link.href;
            
            return (
              <motion.li 
                key={link.href}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
              >
                <Link href={link.href}>
                  <div className={cn(
                    "relative px-4 py-2 rounded-md text-sm transition-colors",
                    isActive 
                      ? "text-purple-600 dark:text-purple-400" 
                      : "text-slate-700 hover:text-purple-600 dark:text-slate-200 dark:hover:text-purple-400"
                  )}>
                    {link.label}
                    {isActive && (
                      <motion.div 
                        className="absolute bottom-0 left-0 h-0.5 w-full bg-purple-600 dark:bg-purple-400"
                        layoutId="navIndicator"
                      />
                    )}
                  </div>
                </Link>
              </motion.li>
            );
          })}
        </ul>
        
        <div className="ml-4">
          <Button size="sm" variant="primary">
            Resume
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <motion.button
          className="p-2 focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          variants={hamburgerVariants}
          animate={isMobileMenuOpen ? "open" : "closed"}
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <motion.span 
              className="w-full h-0.5 bg-slate-900/80 dark:bg-white/80 rounded-full backdrop-blur-sm"
              variants={lineOneVariants}
            />
            <motion.span 
              className="w-full h-0.5 bg-slate-900/80 dark:bg-white/80 rounded-full backdrop-blur-sm"
              variants={lineTwoVariants}
            />
            <motion.span 
              className="w-full h-0.5 bg-slate-900/80 dark:bg-white/80 rounded-full backdrop-blur-sm"
              variants={lineThreeVariants}
            />
          </div>
        </motion.button>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            className="fixed inset-0 z-50 md:hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile menu content */}
            <motion.div 
              className="absolute top-0 right-0 h-full w-4/5 max-w-xs bg-white dark:bg-slate-900 shadow-xl flex flex-col"

            >
              <div className="flex justify-end p-4">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Close menu"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </motion.button>
              </div>
              
              <ul className="flex flex-col space-y-2 px-6 py-4">
                {navLinks.map((link, i) => {
                  const isActive = router.asPath === link.href;
                  
                  return (
                    <motion.li 
                      key={link.href}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <Link href={link.href}>
                        <div className={cn(
                          "block px-4 py-3 text-lg rounded-md transition-colors",
                          isActive 
                            ? "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 font-medium" 
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        )}>
                          {link.label}
                        </div>
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              
              <div className="mt-auto p-6">
                <Button variant="primary" className="w-full">
                  Resume
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
