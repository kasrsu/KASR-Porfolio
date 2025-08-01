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
     
    </section>
  );
}
