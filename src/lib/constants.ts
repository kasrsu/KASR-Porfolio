export const navItems = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Skills', path: '/skills' },
  { name: 'Contact', path: '/contact' }
];

export const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: 'github'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: 'linkedin'
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: 'twitter'
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: 'mail'
  }
];

export const siteConfig = {
  name: 'Your Name',
  title: 'Data Scientist & Developer',
  description: 'Portfolio showcasing my projects and skills in data science and development.',
  url: 'https://yourportfolio.com',
  ogImage: '/images/og-image.png',
  links: {
    github: 'https://github.com/yourusername',
  }
};

/**
 * Animation configuration settings
 */
export const animationConfig = {
  // Base animation settings
  defaultDuration: 0.6,
  defaultEase: [0.25, 0.1, 0.25, 1], // Cubic bezier curve
  
  // Timing
  staggerInterval: 0.1,
  fastDuration: 0.3,
  slowDuration: 0.8,
  
  // Distances
  slideDistance: 50,
  smallSlideDistance: 20,
  largeSlideDistance: 100,
  
  // Delays
  baseDelay: 0.2,
  staggerDelay: 0.1,
  
  // Scroll thresholds
  scrollThreshold: 0.1,
  scrollMargin: '0px 0px -100px 0px',
  
  // Page transitions
  pageTransitionDuration: 0.5,
};

/**
 * Breakpoint sizes for responsive design
 */
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Z-index values for consistent layering
 */
export const zIndex = {
  base: 0,
  content: 10,
  navigation: 50,
  modal: 100,
  tooltip: 150,
};
