"use client";

import React, { useEffect, useState, useRef } from "react";
import Background from "@/components/ui/background/background";
import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Skills from "@/components/sections/Skills/Skills";
import Projects from "@/components/sections/Project/Projects";
import Contact from "@/components/sections/Contact/Contact";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { motion, useScroll, useTransform, useMotionTemplate, useSpring } from "framer-motion";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Use window scroll instead of container-specific scroll
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    setIsLoaded(true);

    // Fix for enabling wheel scrolling
    const preventDefaultScroll = (e: WheelEvent) => {
      // Don't prevent default so wheel scrolling works naturally
    };

    window.addEventListener("wheel", preventDefaultScroll, { passive: true });

    return () => {
      window.removeEventListener("wheel", preventDefaultScroll);
    };
  }, []);

  // Hero section transitions: fade out, blur, scale back
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], [0, 20]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -100]);

  // Create motion template for hero filter
  const heroFilter = useMotionTemplate`blur(${heroBlur}px)`;

  // Improved GlassCard transitions with springs for smooth animation
  const cardOpacityRaw = useTransform(scrollYProgress, [0.15, 0.35], [0, 1]);
  const cardScaleRaw = useTransform(scrollYProgress, [0.18, 0.4], [0.92, 1]);
  const cardYRaw = useTransform(scrollYProgress, [0.18, 0.35], [60, 0]);
  
  // Apply spring physics for smoother, more natural motion
  const cardOpacity = useSpring(cardOpacityRaw, { stiffness: 100, damping: 20 });
  const cardScale = useSpring(cardScaleRaw, { stiffness: 70, damping: 15 });
  const cardY = useSpring(cardYRaw, { stiffness: 80, damping: 18 });
  
  // Use raw value for blur as springs can cause visual oddities with blur
  const cardBlur = useTransform(scrollYProgress, [0.18, 0.35], [15, 0]);
  const cardFilter = useMotionTemplate`blur(${cardBlur}px)`;

  // Sections for the glass card
  const sections = [
    // About section
    <div key="about" className="section-content h-full bg-transparent">
      <div className="space-y-6">
        <div className="h-full">
          <About />
        </div>
      </div>
    </div>,

    // Skills section
    <div key="skills" className="section-content h-full bg-transparent">
      <div className="space-y-6">
        <div className="h-full">
          <Skills />
        </div>
      </div>
    </div>,

    // Projects section
    <div key="projects" className="section-content h-full bg-transparent">
      <div className="space-y-6">
        <div className="h-full">
          <Projects />
        </div>
      </div>
    </div>,

    // Contact section
    <div key="contact" className="section-content h-full bg-transparent">
      <div className="space-y-6">
        <div className="h-full">
          <Contact />
        </div>
      </div>
    </div>,
  ];

  return (
    <Background
      variant="cyber"
      color="purple"
      hasGrid={true}
      hasScanLines={true}
      interactive={true}
    >
      {/* Full page container with regular scrolling */}
      <div className="relative min-h-[300vh]">
        {/* Hero Section - Fixed position with smooth transitions */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-20 pointer-events-none"
          style={{
            opacity: heroOpacity,
            filter: heroFilter,
            scale: heroScale,
            y: heroY,
          }}
        >
          <div className="pointer-events-auto">
            <Hero />
            <ScrollIndicator
              className="absolute bottom-8 left-1/2 -translate-x-1/2"
              text="Scroll to explore"
            />
          </div>
        </motion.div>

        {/* GlassCard - Fixed position with enhanced smooth entrance */}
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-30 pointer-events-none"
          style={{
            opacity: cardOpacity,
            scale: cardScale,
            y: cardY,
            filter: cardFilter,
            transformOrigin: "center bottom",
          }}
        >
          <div className="pointer-events-auto w-full flex items-center justify-center">
            <GlassCard
              sections={sections}
              className="w-full max-w-[92%] lg:max-w-[85%] xl:max-w-[80%] h-[85vh] md:h-[88vh]"
              intensity="low"
              color="purple"
              borderGlow={true}
            />
          </div>
        </motion.div>

        {/* Extra space to allow scrolling */}
        <div className="h-screen"></div>
        <div className="h-screen"></div>
        <div className="h-screen"></div>
      </div>
    </Background>
  );
}