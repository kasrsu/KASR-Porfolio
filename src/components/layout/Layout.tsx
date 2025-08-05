"use client";

import React, { ReactNode } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar/Navbar';
import Background from './Background/Background';
import ScrollToTop from './ScrollToTop/ScrollToTop';

// Import navbar styles
import './Navbar/Navbar.css';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <Background />
      <Header />
      <Navbar />
      <motion.main 
        className="flex-grow pt-20" // Add padding to account for fixed header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.main>
      <Footer />
      <AnimatePresence>
        <ScrollToTop />
      </AnimatePresence>
    </div>
  );
}
