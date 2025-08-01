import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import TypewriterComponent from 'typewriter-effect';
import ParticlesBackground from '../../ui/ParticlesBackground';

interface Shape {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
  type: 'circle' | 'square' | 'triangle';
  initialRotation: number;
}

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  const [isMounted, setIsMounted] = useState(false);

  // Generate random shapes for floating elements
  const shapes: Shape[] = [
    { id: 1, x: 15, y: 20, color: 'rgba(168, 85, 247, 0.4)', size: 60, type: 'circle', initialRotation: 0 },
    { id: 2, x: 80, y: 15, color: 'rgba(168, 85, 247, 0.2)', size: 80, type: 'square', initialRotation: 15 },
    { id: 3, x: 70, y: 70, color: 'rgba(168, 85, 247, 0.3)', size: 50, type: 'triangle', initialRotation: 30 },
    { id: 4, x: 25, y: 65, color: 'rgba(126, 34, 206, 0.3)', size: 70, type: 'square', initialRotation: 45 },
    { id: 5, x: 50, y: 30, color: 'rgba(126, 34, 206, 0.2)', size: 40, type: 'circle', initialRotation: 0 }
  ];

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // Using a cubic-bezier easing function
      },
    },
  };

  const subtitleVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8,
      },
    },
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5,
        duration: 0.5,
      },
    },
  };

  const profileImageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.2,
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100,
      },
    },
    // Removed hover property as it is incompatible with Variants type
  };

  // Handle mouse movement for floating shapes and 3D effect
  useEffect(() => {
    setIsMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current || !isMounted) return;
      
      try {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      } catch (error) {
        console.warn('Error handling mouse move in hero:', error);
      }
    };

    // Add a small delay to ensure the component is fully mounted
    const timeoutId = setTimeout(() => {
      const heroElement = heroRef.current;
      if (heroElement && isMounted) {
        try {
          heroElement.addEventListener("mousemove", handleMouseMove, { passive: true });
        } catch (error) {
          console.warn('Error adding mouse listener to hero:', error);
        }
      }

      // Start animations when component mounts
      try {
        controls.start("visible");
      } catch (error) {
        console.warn('Error starting animations:', error);
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      setIsMounted(false);
      const heroElement = heroRef.current;
      if (heroElement) {
        try {
          heroElement.removeEventListener("mousemove", handleMouseMove);
        } catch (error) {
          console.warn('Error removing mouse listener from hero:', error);
        }
      }
    };
  }, [controls, isMounted]);

  // Parallax effect on scroll
  useEffect(() => {
    if (!isMounted) return;
    
    return scrollY.onChange(y => {
      if (imageRef.current && isMounted) {
        try {
          imageRef.current.style.transform = `translateY(${y * 0.2}px)`;
        } catch (error) {
          console.warn('Error applying parallax effect:', error);
        }
      }
    });
  }, [scrollY, isMounted]);

  const scrollToSection = (sectionId: string) => {
    try {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    } catch (error) {
      console.warn('Error scrolling to section:', error);
    }
  };

  // Don't render until mounted
  if (!isMounted) {
    return (
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center max-w-4xl mx-auto">
              <div className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6">
                Loading...
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 z-10">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center max-w-4xl mx-auto">
            {/* Main title with terminal styling */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6"
              initial="hidden"
              animate={controls}
              variants={titleVariants}
            >
              <span className="block mb-2 font-terminal text-purple-400 hacker-glow">
                {">"} Hello World
              </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-600 font-hacker">
                Anusara Esberger
              </span>
            </motion.h1>

            {/* Subtitle with typewriter effect */}
            <motion.div 
              className="text-xl md:text-2xl lg:text-3xl mb-8 text-slate-300 font-typewriter"
              initial="hidden"
              animate={controls}
              variants={subtitleVariants}
            >
              <div className="h-10 flex items-center justify-center">
                <span className="mr-2 text-pink-400">$</span>
                <span className="mr-2">whoami:</span>
                <TypewriterComponent
                  options={{
                    strings: [
                      'Data Scientist',
                      'ML Engineer', 
                      'Data Analyst',
                      'Visualisation Expert',
                      'Terminal Hacker'
                    ],
                    autoStart: true,
                    loop: true,
                    wrapperClassName: "text-purple-400 font-terminal hacker-glow",
                    cursorClassName: "text-purple-400"
                  }}
                />
              </div>
            </motion.div>

            {/* Description with terminal styling */}
            <motion.p 
              className="text-lg text-slate-300 mb-12 max-w-2xl mx-auto font-terminal"
              initial="hidden"
              animate={controls}
              variants={subtitleVariants}
            >
              <span className="text-pink-400">// </span>
              Turning complex data into actionable insights and building intelligent systems
              that solve real-world problems. Specializing in machine learning, data visualization,
              and predictive analytics.
            </motion.p>

            {/* CTA Buttons with terminal styling */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial="hidden"
              animate={controls}
              variants={buttonVariants}
            >
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="group bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-2 border-purple-400 hover:from-purple-600/30 hover:to-pink-600/30 text-purple-400 px-8 py-4 rounded-lg font-terminal text-lg shadow-lg hover:shadow-purple-500/50"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 0px 20px rgba(139, 92, 246, 0.5)"
                }}
              >
                <span className="mr-2">./</span>view_projects.sh
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => scrollToSection('contact')}
                className="border-2 border-pink-400 text-pink-400 hover:bg-pink-400/20 px-8 py-4 rounded-lg font-terminal text-lg transition-all duration-300"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 0px 15px rgba(236, 72, 153, 0.3)"
                }}
              >
                <span className="mr-2">curl</span>contact.sh
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Clean terminal scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center text-purple-400 font-terminal"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm mb-2 hacker-glow">{">"} scroll --down</span>
          <div className="text-purple-400 text-xl">▼</div>
        </motion.div>
      </motion.div>
    </section>
  );
}
