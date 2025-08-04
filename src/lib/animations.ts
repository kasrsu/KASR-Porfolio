import { Variants } from "framer-motion";
import { animationConfig } from "./constants";


// Fade animations
export const fadeVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,

  },
  exit: {
    opacity: 0,

  }
};

// Slide animations
export const slideUpVariants: Variants = {
  hidden: { y: animationConfig.slideDistance, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,

  },
  exit: {
    y: animationConfig.slideDistance,
    opacity: 0,

  }
};

export const slideDownVariants: Variants = {
  hidden: { y: -animationConfig.slideDistance, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,

  },
  exit: {
    y: -animationConfig.slideDistance,
    opacity: 0,

  }
};

export const slideLeftVariants: Variants = {
  hidden: { x: animationConfig.slideDistance, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,

  },
  exit: {
    x: animationConfig.slideDistance,
    opacity: 0,

  }
};

export const slideRightVariants: Variants = {
  hidden: { x: -animationConfig.slideDistance, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,

  },
  exit: {
    x: -animationConfig.slideDistance,
    opacity: 0,

  }
};

// Scale animations
export const scaleVariants: Variants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: { 
    scale: 1, 
    opacity: 1,

  },
  exit: {
    scale: 0.8,
    opacity: 0,

  }
};

// Page transitions
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
    },
  },
};

// Section transitions for scrolling effects
export const sectionTransition: Variants = {
  offscreen: {
    y: 50,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      bounce: 0.4,
      duration: 0.8,
    },
  },
};

// Staggered item animations
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.6 
    } 
  },
};

export const slideUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    } 
  },
};

export const slideDown: Variants = {
  hidden: { opacity: 0, y: -30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    } 
  },
};

export const slideLeft: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    } 
  },
};

export const slideRight: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    } 
  },
};

export const scaleUp: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      type: 'spring',
      stiffness: 100,
      damping: 15
    } 
  },
};
