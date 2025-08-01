"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/ui/Navbar";
import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Projects from "@/components/sections/Project/Projects";
import Skills from "@/components/sections/Skills/Skills";
import Contact from "@/components/sections/Contact/Contact";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollProgressCircle } from "@/components/ui/ScrollProgressBar";
import { useActiveSection } from "@/components/ui/ScrollAnimation";
import { SectionErrorBoundary } from "@/components/ui/ErrorBoundary";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isGlassCardLoaded, setIsGlassCardLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  
  // References for each section - Updated to 6 sections
  const sectionRefs = [
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // Hero
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // About 1
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // About 2
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // Skills
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // Projects
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>  // Contact
  ];
  
  // Manual section detection with better reliability
  const detectedSection = useActiveSection(sectionRefs, 0.3);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 30,
    damping: 15,
    restDelta: 0.001,
    mass: 0.5
  });

  // Hero section transforms
  const heroScale = useTransform(scrollYProgress, [0, 0.4], [1, 0.85]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.4], [0, -100]);
  const heroBlur = useTransform(scrollYProgress, [0, 0.3], [0, 8]);

  // Fixed Glass card transforms - Better timing and visibility
  const glassCardY = useTransform(scrollYProgress, [0.15, 0.4], [100, 0]);
  const glassCardOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const glassCardScale = useTransform(scrollYProgress, [0.15, 0.4], [0.95, 1]);

  // Track scroll progress and glass card loading state - Earlier activation
  useEffect(() => {
    const unsubscribe = scrollYProgress.onChange((progress) => {
      setScrollProgress(progress);
      setIsGlassCardLoaded(progress >= 0.25);
      
      // Manual section detection based on scroll progress
      if (progress < 0.2) {
        setCurrentSection(0); // Hero
      } else if (progress >= 0.2 && progress < 0.35) {
        setCurrentSection(1); // About 1
      } else if (progress >= 0.35 && progress < 0.5) {
        setCurrentSection(2); // About 2
      } else if (progress >= 0.5 && progress < 0.65) {
        setCurrentSection(3); // Skills
      } else if (progress >= 0.65 && progress < 0.8) {
        setCurrentSection(4); // Projects
      } else if (progress >= 0.8) {
        setCurrentSection(5); // Contact
      }
    });

    return unsubscribe;
  }, [scrollYProgress]);

  // Use detected section or manual section, whichever is more reliable
  const activeSection = detectedSection !== undefined ? detectedSection : currentSection;

  // Optimized, lighter animation variants for better performance
  const sectionVariants = {
    hero: {
      initial: {
        opacity: 0,
        y: 30,
        scale: 0.95
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      exit: {
        opacity: 0,
        y: -20,
        scale: 1.02,
        transition: {
          duration: 0.4,
          ease: [0.55, 0.06, 0.68, 0.19]
        }
      }
    },
    about: {
      initial: {
        opacity: 0,
        x: -40,
        scale: 0.98
      },
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      exit: {
        opacity: 0,
        x: -30,
        scale: 1.01,
        transition: {
          duration: 0.3,
          ease: [0.55, 0.06, 0.68, 0.19]
        }
      }
    },
    skills: {
      initial: {
        opacity: 0,
        y: 40,
        scale: 0.96
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.19, 1, 0.22, 1]
        }
      },
      exit: {
        opacity: 0,
        y: -30,
        scale: 1.02,
        transition: {
          duration: 0.3,
          ease: [0.7, 0, 0.84, 0]
        }
      }
    },
    projects: {
      initial: {
        opacity: 0,
        x: 40,
        scale: 0.97
      },
      animate: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1]
        }
      },
      exit: {
        opacity: 0,
        x: 30,
        scale: 1.01,
        transition: {
          duration: 0.3,
          ease: [0.6, 0.04, 0.98, 0.34]
        }
      }
    },
    contact: {
      initial: {
        opacity: 0,
        y: 35,
        scale: 0.94
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.6,
          ease: [0.34, 1.26, 0.64, 1]
        }
      },
      exit: {
        opacity: 0,
        y: 25,
        scale: 0.98,
        transition: {
          duration: 0.4,
          ease: [0.45, 0, 0.55, 1]
        }
      }
    }
  };

  return (
    <div className="matrix-bg scan-lines min-h-screen">
      {/* Purple matrix background with scan lines */}
      <div className="fixed inset-0 w-full h-full z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-purple-950/60 to-blue-900/40"></div>
        {/* Terminal grid pattern */}
        <div className="absolute inset-0 opacity-[0.08] overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <defs>
              <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#8B5CF6" strokeWidth="0.2" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
      </div>
      
      <main ref={containerRef} className="relative z-10">
        {/* Navigation */}
        <Navbar />
        
        {/* Hero Section */}
        <motion.div
          className="fixed inset-0 z-20"
          style={{
            scale: heroScale,
            opacity: heroOpacity,
            y: heroY,
            filter: useTransform(heroBlur, (blur) => `blur(${blur}px)`),
          }}
        >
          <div className="w-full h-screen">
            <Hero />
          </div>
        </motion.div>
        
        {/* Container for all sections with GlassCard */}
        <div className="relative min-h-[800vh] z-30">
          <motion.div 
            className="sticky top-0 h-screen w-full flex items-center justify-center z-40"
            style={{
              y: glassCardY,
              opacity: glassCardOpacity,
              scale: glassCardScale,
            }}
          >
            <GlassCard 
              className="w-full max-w-[92%] lg:max-w-[88%] xl:max-w-[85%] h-[88vh] md:h-[86vh] rounded-[2.5rem] overflow-hidden mx-auto mt-6 md:mt-8 lg:mt-10"
              intensity="low"
              color="purple"
              borderGlow={true}
            >
              <div className="relative w-full h-full">
                {/* Debug overlay to show current section */}
                <div className="absolute top-4 right-4 z-[100] bg-purple-900/50 backdrop-blur-sm rounded-lg px-3 py-2 text-xs font-terminal text-purple-300">
                  Section: {activeSection} | Progress: {Math.round(scrollProgress * 100)}%
                </div>

                {/* Always render sections - no loading condition */}
                <AnimatePresence mode="wait" initial={false}>
                  {/* About Section 1 */}
                  {activeSection === 1 && (
                    <motion.div 
                      key="about-section-1"
                      className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="p-8 md:p-12 lg:p-16 xl:p-20">
                        <div className="w-full max-w-6xl mx-auto text-white">
                          <SectionErrorBoundary sectionName="About">
                            <div className="min-h-[60vh]">
                              <About />
                            </div>
                          </SectionErrorBoundary>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* About Section 2 */}
                  {activeSection === 2 && (
                    <motion.div 
                      key="about-section-2"
                      className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="p-8 md:p-12 lg:p-16 xl:p-20">
                        <div className="w-full max-w-6xl mx-auto text-white">
                          <SectionErrorBoundary sectionName="About (Extended)">
                            <div className="min-h-[60vh]">
                              {/* Terminal header */}
                              <div className="mb-8 text-center font-terminal">
                                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-purple-500/20 rounded-full border border-purple-400/30 mb-4">
                                  <span className="text-purple-400">{">"}</span>
                                  <span className="text-purple-300 text-sm font-medium">about --extended</span>
                                </div>
                              </div>
                              
                              <About />
                              
                              {/* Additional content */}
                              <div className="mt-12 p-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-purple-500/20 font-terminal">
                                <h3 className="text-xl font-semibold text-purple-300 mb-4">
                                  {">"} Extended Background
                                </h3>
                                <p className="text-gray-300 mb-4">
                                  <span className="text-pink-400">// </span>
                                  This extended view provides additional insights into my journey as a data scientist.
                                </p>
                              </div>
                            </div>
                          </SectionErrorBoundary>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Skills Section */}
                  {activeSection === 3 && (
                    <motion.div 
                      key="skills-section"
                      className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="p-8 md:p-12 lg:p-16 xl:p-20">
                        <div className="w-full max-w-6xl mx-auto text-white">
                          <SectionErrorBoundary sectionName="Skills">
                            <div className="min-h-[60vh]">
                              <Skills />
                            </div>
                          </SectionErrorBoundary>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Projects Section */}
                  {activeSection === 4 && (
                    <motion.div 
                      key="projects-section"
                      className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="p-8 md:p-12 lg:p-16 xl:p-20">
                        <div className="w-full max-w-6xl mx-auto text-white">
                          <SectionErrorBoundary sectionName="Projects">
                            <div className="min-h-[60vh]">
                              <Projects />
                            </div>
                          </SectionErrorBoundary>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Contact Section */}
                  {activeSection === 5 && (
                    <motion.div 
                      key="contact-section"
                      className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
            
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -50 }}
                      transition={{ duration: 0.5, ease: "easeInOut" }}
                    >
                      <div className="p-8 md:p-12 lg:p-16 xl:p-20">
                        <div className="w-full max-w-6xl mx-auto text-white">
                          <SectionErrorBoundary sectionName="Contact">
                            <div className="min-h-[60vh]">
                              <Contact />
                            </div>
                          </SectionErrorBoundary>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {/* Default terminal prompt */}
                  {activeSection === 0 && (
                    <motion.div 
                      key="waiting-section"
                      className="w-full h-full flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    >
                      <div className="text-center font-terminal">
                        <div className="text-purple-400 text-2xl mb-4 hacker-glow">
                          {">"} Glass interface ready
                        </div>
                        <div className="text-pink-400 text-sm mb-2">
                          $ scroll --down
                        </div>
                        <div className="text-gray-400 text-xs">
                          Session: {activeSection} | Progress: {Math.round(scrollProgress * 100)}%
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </GlassCard>
          </motion.div>
          
        {/* Scroll indicators */}
        <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-[200] flex flex-col items-center space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.button
              key={index}
              className={`w-3 h-3 rounded-sm border transition-all duration-300 ${
                activeSection === index 
                  ? 'bg-purple-500 border-purple-400 shadow-lg shadow-purple-500/30'
                  : 'bg-transparent border-purple-400/40 hover:border-purple-400'
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                sectionRefs[index].current?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
            </motion.button>
          ))}
        </div>
        
        {/* Terminal scroll indicator */}
        <AnimatePresence>
          {currentSection === 0 && (
            <motion.div
              className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 font-terminal"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col items-center">
                <div className="px-4 py-2 bg-black/30 backdrop-blur-md rounded-lg border border-purple-400/30 mb-4">
                  <span className="text-purple-400 text-sm">
                    {">"} scroll --explore-sections
                  </span>
                </div>
                <motion.div
                  className="text-purple-400 text-2xl"
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  ▼
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
                              {/* Invisible sections for scrolling */}
                      <div className="absolute inset-0 pointer-events-none">
                        <section ref={sectionRefs[0]} className="h-screen" id="hero"></section>
                        <section ref={sectionRefs[1]} className="h-[140vh]" id="about-1"></section>
                        <section ref={sectionRefs[2]} className="h-[140vh]" id="about-2"></section>
                        <section ref={sectionRefs[3]} className="h-[140vh]" id="skills"></section>
                        <section ref={sectionRefs[4]} className="h-[140vh]" id="projects"></section>
                        <section ref={sectionRefs[5]} className="h-[140vh]" id="contact"></section>
                      </div>
                    </div>
        
        {/* Terminal progress indicator */}
        <div className="fixed bottom-6 right-6 z-50 pointer-events-auto">
          <div className="relative">
            <div className="absolute inset-0 rounded-lg bg-black/30 backdrop-blur-lg border border-purple-400/30"></div>
            <div className="relative z-10 p-3">
              <ScrollProgressCircle 
                size={48}
                strokeWidth={2}
                color="purple"
                bgColor="rgba(139,92,246,0.2)"
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}