import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useMotionValue, useTransform, useScroll } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';
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
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    // Start animations when component mounts
    controls.start("visible");

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [controls]);

  // Parallax effect on scroll
  useEffect(() => {
    return scrollY.onChange(y => {
      if (imageRef.current) {
        imageRef.current.style.transform = `translateY(${y * 0.2}px)`;
      }
    });
  }, [scrollY]);

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render shape based on type
  const renderShape = (shape: Shape) => {
    switch (shape.type) {
      case 'circle':
        return (
          <motion.div
            key={shape.id}
            className="absolute rounded-full"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              backgroundColor: shape.color,
              width: shape.size,
              height: shape.size,
            }}
            animate={{
              x: mousePosition.x ? (mousePosition.x - window.innerWidth / 2) / 20 : 0,
              y: mousePosition.y ? (mousePosition.y - window.innerHeight / 2) / 20 : 0,
              rotate: [shape.initialRotation, shape.initialRotation + 10, shape.initialRotation],
            }}
            transition={{
              x: { type: "spring", stiffness: 50 },
              y: { type: "spring", stiffness: 50 },
              rotate: { duration: 10, repeat: Infinity, ease: "linear" },
            }}
          />
        );
      case 'square':
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              backgroundColor: shape.color,
              width: shape.size,
              height: shape.size,
              borderRadius: '10%',
            }}
            animate={{
              x: mousePosition.x ? (mousePosition.x - window.innerWidth / 2) / 30 : 0,
              y: mousePosition.y ? (mousePosition.y - window.innerHeight / 2) / 30 : 0,
              rotate: [shape.initialRotation, shape.initialRotation + 15, shape.initialRotation],
            }}
            transition={{
              x: { type: "spring", stiffness: 40 },
              y: { type: "spring", stiffness: 40 },
              rotate: { duration: 15, repeat: Infinity, ease: "linear" },
            }}
          />
        );
      case 'triangle':
        return (
          <motion.div
            key={shape.id}
            className="absolute"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: 0,
              height: 0,
              borderLeft: `${shape.size / 2}px solid transparent`,
              borderRight: `${shape.size / 2}px solid transparent`,
              borderBottom: `${shape.size}px solid ${shape.color}`,
            }}
            animate={{
              x: mousePosition.x ? (mousePosition.x - window.innerWidth / 2) / 25 : 0,
              y: mousePosition.y ? (mousePosition.y - window.innerHeight / 2) / 25 : 0,
              rotate: [shape.initialRotation, shape.initialRotation + 20, shape.initialRotation],
            }}
            transition={{
              x: { type: "spring", stiffness: 45 },
              y: { type: "spring", stiffness: 45 },
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            }}
          />
        );
      default:
        return null;
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden py-12 px-4 sm:px-6 lg:px-8"
      style={{ 
        display: 'flex !important',
        minHeight: '100%',
        width: '100%'
      }}
    >
      {/* Particle background */}
      <div className="absolute inset-0 z-0">
        <ParticlesBackground />
      </div>

      {/* Floating shapes */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {shapes.map(renderShape)}
      </div>

      <div className="container mx-auto w-full z-10" style={{ display: 'block !important', width: '100%' }}>
        <div className="grid lg:grid-cols-2 gap-12 items-center w-full" style={{ display: 'grid !important', width: '100%' }}>
          <div className="text-center lg:text-left w-full">
            {/* Main title with animation */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-4"
              initial="hidden"
              animate={controls}
              variants={titleVariants}
              style={{ color: 'inherit !important', opacity: '1 !important', visibility: 'visible !important' }}
            >
              <span className="block">Hi, I'm</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-indigo-600">
                Anusara Esberger
              </span>
            </motion.h1>

            {/* Subtitle with typewriter effect */}
            <motion.div 
              className="text-xl md:text-2xl mb-6 text-gray-700 dark:text-gray-300"
              initial="hidden"
              animate={controls}
              variants={subtitleVariants}
              style={{ color: 'inherit !important', opacity: '1 !important', visibility: 'visible !important' }}
            >
              <div className="h-8 flex items-center justify-center lg:justify-start">
                <span className="mr-2">I'm a</span>
                <TypewriterComponent
                  options={{
                    strings: [
                      'Data Scientist',
                      'ML Engineer',
                      'Data Analyst',
                      'Visualisation Expert'
                    ],
                    autoStart: true,
                    loop: true,
                    wrapperClassName: "text-purple-600 font-semibold",
                    cursorClassName: "text-purple-600"
                  }}
                />
              </div>
            </motion.div>

            {/* Description */}
            <motion.p 
              className="text-gray-600 dark:text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0"
              initial="hidden"
              animate={controls}
              variants={subtitleVariants}
              style={{ color: 'inherit !important', opacity: '1 !important', visibility: 'visible !important' }}
            >
              Turning complex data into actionable insights and building intelligent systems
              that solve real-world problems. Specializing in machine learning, data visualization,
              and predictive analytics.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial="hidden"
              animate={controls}
              variants={buttonVariants}
              style={{ display: 'flex !important' }}
            >
              <Button 
                variant="primary" 
                size="lg" 
                onClick={() => scrollToSection('projects')}
                className="group"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 0px 8px rgba(168, 85, 247, 0.5)"
                }}
              >
                View My Work
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2 transition-transform group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Button>
              <Button 
                variant="secondary" 
                size="lg" 
                onClick={() => scrollToSection('contact')}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0px 0px 8px rgba(203, 213, 225, 0.3)"
                }}
              >
                Contact Me
              </Button>
            </motion.div>
          </div>

          {/* Profile image with glow effect */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial="hidden"
            animate={controls}
            variants={profileImageVariants}
            style={{ display: 'flex !important' }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
              <motion.img
                ref={imageRef}
                src="/profile-image.jpg"
                alt="Anusara Esberger"
                variants={profileImageVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0px 0px 25px rgba(168, 85, 247, 0.5)",
                  transition: {
                    duration: 0.3,
                    type: "spring",
                    stiffness: 300,
                  },
                }}
                className="rounded-full object-cover w-full h-full relative z-10 border-4 border-white dark:border-gray-800"
                style={{ objectPosition: "center" }}
              />
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-30 transition duration-300"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
