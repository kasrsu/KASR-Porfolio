import React, { useEffect, useRef } from 'react';
import {  useAnimation, useScroll } from 'framer-motion';


export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const controls = useAnimation();
  const { scrollY } = useScroll();
  

  // Handle mouse movement for floating shapes and 3D effect
  useEffect(() => {
    const handleMouseMove = () => {
      if (heroRef.current) {
        // Mouse movement logic can be added here if needed
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
