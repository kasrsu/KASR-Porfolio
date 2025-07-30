"use client";

import React, { useEffect } from 'react';

export const smoothScrollTo = (
  elementId: string, 
  offset: number = 80, 
  duration: number = 500
) => {
  const element = document.getElementById(elementId);
  if (!element) return;

  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - offset;

  const startTime = performance.now();
  const startScrollPosition = window.pageYOffset;

  const animateScroll = (currentTime: number) => {
    const elapsedTime = currentTime - startTime;
    const progress = Math.min(elapsedTime / duration, 1);
    
    // Easing function - easeInOutCubic
    const easeProgress = progress < 0.5
      ? 4 * progress * progress * progress
      : 1 - Math.pow(-2 * progress + 2, 3) / 2;
    
    window.scrollTo({
      top: startScrollPosition + (offsetPosition - startScrollPosition) * easeProgress,
    });

    if (progress < 1) {
      requestAnimationFrame(animateScroll);
    }
  };

  requestAnimationFrame(animateScroll);
};

interface SmoothScrollLinkProps {
  targetId: string;
  children: React.ReactNode;
  className?: string;
  offset?: number;
}

export function SmoothScrollLink({ 
  targetId, 
  children, 
  className = '',
  offset = 80
}: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    smoothScrollTo(targetId, offset);
  };

  return (
    <a 
      href={`#${targetId}`} 
      onClick={handleClick}
      className={className}
    >
      {children}
    </a>
  );
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
  offset?: number;
}

export function SmoothScrollProvider({ 
  children,
  offset = 80 
}: SmoothScrollProviderProps) {
  useEffect(() => {
    // Handle initial hash in URL
    const handleInitialHash = () => {
      const { hash } = window.location;
      if (hash) {
        const id = hash.substring(1);
        setTimeout(() => {
          smoothScrollTo(id, offset);
        }, 500);
      }
    };

    // Handle all anchor clicks
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.hash.startsWith('#') && anchor.href.includes(window.location.pathname)) {
        e.preventDefault();
        const id = anchor.hash.substring(1);
        smoothScrollTo(id, offset);
        
        // Update URL without causing a page scroll
        history.pushState(null, '', anchor.hash);
      }
    };

    // Set up event listeners
    handleInitialHash();
    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, [offset]);

  return <>{children}</>;
}
