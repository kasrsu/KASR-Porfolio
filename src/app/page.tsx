"use client";

import React, { useRef , useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import PageTransition from "@/components/PageTransition";
import { Navbar } from "@/components/ui/Navbar";
import Hero from "@/components/sections/hero/Hero";
import About from "@/components/sections/about/About";
import Projects from "@/components/sections/Project/Projects";
import Skills from "@/components/sections/Skills/Skills";
import Contact from "@/components/sections/Contact/Contact";
import { GlassCard } from "@/components/ui/GlassCard";
import { ScrollProgressCircle } from "@/components/ui/ScrollProgressBar";
import { ScrollIndicator } from "@/components/ui/ScrollIndicator";
import { 
  ScrollAnimation, 
  SectionAnimation, 
  useActiveSection 
} from "@/components/ui/ScrollAnimation";
import { SectionErrorBoundary } from "@/components/ui/ErrorBoundary";
import Background from "@/components/ui/background/background";
import FirstHero from "@/components/sections/FirstHero/FirstHero";
import Preloader from '@/components/prloader/preloader';


export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // References for each section - FirstHero is now section 0
  const sectionRefs = [
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // FirstHero (new section 0)
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // Hero (now section 1)
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // About (now section 2)
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // Skills (now section 3)
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>, // Projects (now section 4)
    useRef<HTMLDivElement>(null) as React.RefObject<HTMLElement>  // Contact (now section 5)
  ];
  
  // Use our custom hook to track the active section
  const currentSection = useActiveSection(sectionRefs, 0.4);
  
  // Scroll animation setup
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  // Smoother scroll progress for animations
  const smoothProgress = useSpring(scrollYProgress, { 
    stiffness: 30,
    damping: 15,
    restDelta: 0.001,
    mass: 0.5
  });
  
  // Background parallax effects
  const backgroundY = useTransform(
    smoothProgress, 
    [0, 1], 
    ['0%', '20%']
  );
  
  // Updated section variants to include FirstHero
  const sectionVariants = {
    firstHero: {
      initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
      },
      animate: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
          duration: 0.5,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      },
      exit: {
        opacity: 0,
        y: -15,
        scale: 1.01,
        transition: {
          duration: 0.3,
          ease: [0.55, 0.06, 0.68, 0.19]
        }
      }
    },
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

  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="bg-transparent">
      {/* Fixed Background with Parallax Effect - Always present */}
      <div className="fixed inset-0 w-full h-full z-0">
        <Background 
          variant="matrix"
          color="purple"
          intensity="medium"
          hasGrid={true}
          hasScanLines={true}
          interactive={true}
        />
      </div>

      {/* Show preloader when loading */}
      {isLoading && (
        <div className="relative z-50">
          <Preloader 
            onLoadComplete={() => setIsLoading(false)}
            minLoadTime={3000}
            maxLoadTime={6000}
          />
        </div>
      )}

      {/* Main content - shown after loading */}
      {!isLoading && (
        <main ref={containerRef} className="relative z-10">
          {/* Fixed Navigation */}
          <Navbar />
          
          {/* Container for all sections */}
          <div className="relative min-h-[600vh]"> {/* Increased height for additional section */}
            <div className="w-full h-full bg-transparent">
              <div className="w-full h-full [&_*]:!bg-transparent [&_section]:!bg-transparent [&_div]:!bg-transparent">
                <SectionErrorBoundary sectionName="FirstHero">
                  <FirstHero />
                </SectionErrorBoundary>
              </div>
            </div>
            
            <div className="sticky top-0 h-screen w-full flex items-center justify-center">
              <GlassCard 
                className="w-full max-w-[92%] lg:max-w-[88%] xl:max-w-[85%] h-[88vh] md:h-[86vh] rounded-[2.5rem] overflow-hidden mx-auto mt-6 md:mt-8 lg:mt-10"
                intensity="low"
                color="purple"
                borderGlow={true}
                blurIntensity="high"
              >
                <div className="relative w-full h-full z-20 will-change-transform">
                  <AnimatePresence mode="wait" initial={false}>
                    {/* FirstHero Section - Now section 0, appears first */}
                    {currentSection === 0 && (
                      <motion.div 
                        key="first-hero-section"
                        className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                        variants={sectionVariants.firstHero}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ 
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(139, 92, 246, 0.5) transparent'
                        }}
                      >
                        <div className="p-12 md:p-16 lg:p-20 xl:p-24">
                          <div className="w-full max-w-6xl mx-auto [&_section]:!bg-transparent [&_section]:!py-8 [&_section]:!px-0 [&_section]:!min-h-0">
                            <SectionErrorBoundary sectionName="FirstHero">
                              <FirstHero />
                            </SectionErrorBoundary>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Hero Section - Now section 1 */}
                    {currentSection === 1 && (
                      <motion.div 
                        key="hero-section"
                        className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar hero-section"
                        variants={sectionVariants.hero}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ 
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(139, 92, 246, 0.5) transparent',
                          display: 'block !important',
                          width: '100%',
                          height: '100%'
                        }}
                      >
                        <div className="w-full h-full p-4 md:p-8 lg:p-12" style={{ display: 'block !important', width: '100%', height: '100%' }}>
                          <SectionErrorBoundary 
                            sectionName="Hero"
                            fallback={
                              <div className="text-gray-900 dark:text-white w-full h-full flex flex-col items-center justify-center">
                                <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                  Welcome to My Portfolio
                                </h1>
                                <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl text-center">
                                  This is a fallback Hero section. Your actual Hero component should appear here.
                                </p>
                                <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                                  Get Started
                                </button>
                              </div>
                            }
                          >
                            <div 
                              className="hero-content w-full h-full [visibility:visible_!important] [opacity:1_!important] [&_*]:!bg-transparent" 
                              style={{ 
                                display: 'block !important', 
                                width: '100%', 
                                height: '100%',
                                visibility: 'visible',
                                opacity: '1'
                              }}
                            >
                              <Hero />
                            </div>
                          </SectionErrorBoundary>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* About Section - Now section 2 */}
                    {currentSection === 2 && (
                      <motion.div 
                        key="about-section"
                        className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                        variants={sectionVariants.about}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ 
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(139, 92, 246, 0.5) transparent'
                        }}
                      >
                        <div className="p-12 md:p-16 lg:p-20 xl:p-24">
                          <div className="w-full max-w-6xl mx-auto [&_section]:!bg-transparent [&_section]:!py-8 [&_section]:!px-0 [&_section]:!min-h-0">
                            <SectionErrorBoundary sectionName="About">
                              <About />
                            </SectionErrorBoundary>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Skills Section - Now section 3 */}
                    {currentSection === 3 && (
                      <motion.div 
                        key="skills-section"
                        className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                        variants={sectionVariants.skills}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ 
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(139, 92, 246, 0.5) transparent'
                        }}
                      >
                        <div className="p-12 md:p-16 lg:p-20 xl:p-24">
                          <div className="w-full max-w-6xl mx-auto [&_section]:!bg-transparent [&_section]:!py-8 [&_section]:!px-0 [&_section]:!min-h-0">
                            <SectionErrorBoundary sectionName="Skills">
                              <Skills />
                            </SectionErrorBoundary>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Projects Section - Now section 4 */}
                    {currentSection === 4 && (
                      <motion.div 
                        key="projects-section"
                        className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                        variants={sectionVariants.projects}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ 
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(139, 92, 246, 0.5) transparent'
                        }}
                      >
                        <div className="p-12 md:p-16 lg:p-20 xl:p-24">
                          <div className="w-full max-w-6xl mx-auto [&_section]:!bg-transparent [&_section]:!py-8 [&_section]:!px-0 [&_section]:!min-h-0">
                            <SectionErrorBoundary sectionName="Projects">
                              <Projects />
                            </SectionErrorBoundary>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    
                    {/* Contact Section - Now section 5 */}
                    {currentSection === 5 && (
                      <motion.div 
                        key="contact-section"
                        className="w-full h-full overflow-y-auto overflow-x-hidden custom-scrollbar"
                        variants={sectionVariants.contact}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        style={{ 
                          scrollbarWidth: 'thin',
                          scrollbarColor: 'rgba(139, 92, 246, 0.5) transparent'
                        }}
                      >
                        <div className="p-12 md:p-16 lg:p-20 xl:p-24">
                          <div className="w-full max-w-6xl mx-auto [&_section]:!bg-transparent [&_section]:!py-8 [&_section]:!px-0 [&_section]:!min-h-0">
                            <SectionErrorBoundary sectionName="Contact">
                              <Contact />
                            </SectionErrorBoundary>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </GlassCard>
            </div>
            
            {/* Invisible sections for scrolling - Updated with FirstHero */}
            <div className="absolute inset-0 pointer-events-none">
              <section ref={sectionRefs[0]} className="h-screen" id="first-hero"></section>
              <section ref={sectionRefs[1]} className="h-screen" id="hero"></section>
              <section ref={sectionRefs[2]} className="h-screen" id="about"></section>
              <section ref={sectionRefs[3]} className="h-screen" id="skills"></section>
              <section ref={sectionRefs[4]} className="h-screen" id="projects"></section>
              <section ref={sectionRefs[5]} className="h-screen" id="contact"></section>
            </div>
          </div>
          
          {/* Scroll Indicators - Updated for 6 sections */}
          <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center space-y-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <motion.button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentSection === index 
                    ? 'bg-purple-500/80 shadow-sm shadow-purple-500/30'
                    : 'bg-gray-400/40 dark:bg-gray-600/40 hover:bg-gray-400/60'
                }`}
                whileHover={{ scale: 1.3 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  sectionRefs[index].current?.scrollIntoView({
                    behavior: 'smooth'
                  });
                }}
              />
            ))}
          </div>
          
          {/* Scroll Indicator - Show on FirstHero (section 0) */}
          <AnimatePresence>
            {currentSection === 0 && (
              <motion.div
                className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2 px-4 py-2 bg-white/30 dark:bg-slate-800/30 backdrop-blur-md rounded-full shadow-sm">
                    Scroll to explore
                  </span>
                  <motion.div
                    className="w-6 h-10 rounded-full border-2 border-purple-500/70 dark:border-purple-400/70 flex items-start justify-center p-1 bg-white/20 dark:bg-slate-800/20 backdrop-blur-sm"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
                  >
                    <motion.div 
                      className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Scroll Progress Indicator */}
          <div className="fixed bottom-6 right-6 z-50">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-400/20 to-indigo-500/20 blur-xl transform scale-125 animate-pulse"></div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/15 to-indigo-600/15 blur-lg transform scale-110 animate-pulse" style={{ animationDelay: '1s' }}></div>
              <div className="absolute inset-0 rounded-full bg-white/25 dark:bg-slate-800/25 backdrop-blur-lg border border-white/40 dark:border-slate-700/40 animate-pulse-glow shadow-[0_0_30px_rgba(139,92,246,0.3)]"></div>
              <div className="relative z-10">
                <ScrollProgressCircle 
                  size={64}
                  strokeWidth={3}
                  color="purple"
                  bgColor="rgba(255,255,255,0.15)"
                />
              </div>
            </div>
          </div>
        </main>
      )}
    </div>
  );
}