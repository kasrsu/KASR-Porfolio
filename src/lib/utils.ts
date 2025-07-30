import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Variants } from 'framer-motion';

/**
 * Combines multiple class names and resolves Tailwind CSS conflicts
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Delays execution for a specified amount of time
 */
export const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Calculates a value between min and max based on the current scroll position
 */
export const calculateScrollBasedValue = (
  scrollY: number,
  startPoint: number,
  endPoint: number,
  minValue: number,
  maxValue: number
) => {
  if (scrollY <= startPoint) return minValue;
  if (scrollY >= endPoint) return maxValue;
  
  const percent = (scrollY - startPoint) / (endPoint - startPoint);
  return minValue + percent * (maxValue - minValue);
};

/**
 * Animation variants for Framer Motion
 */
export const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  },
  slideUp: {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideDown: {
    hidden: { y: -50, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  },
  slideLeft: {
    hidden: { x: 50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  slideRight: {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1 }
  },
  scale: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  },
  staggerChildren: {
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  // New animation variants
  buttonHover: {
    initial: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  },
  cardHover: {
    initial: { y: 0, boxShadow: '0 0 0 rgba(139, 92, 246, 0)' },
    hover: { 
      y: -5, 
      boxShadow: '0 0 20px rgba(139, 92, 246, 0.5)',
      transition: { duration: 0.3 } 
    }
  },
  pulse: {
    initial: { scale: 1, opacity: 0.7 },
    animate: { 
      scale: [1, 1.05, 1],
      opacity: [0.7, 1, 0.7],
      transition: { 
        repeat: Infinity,
        duration: 1.5
      }
    }
  },
  modalBackdrop: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } }
  },
  modalContent: {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { type: "spring", stiffness: 300, damping: 30 }
    }
  }
} as const;
