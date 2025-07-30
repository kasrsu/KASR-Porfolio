import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface ScrollIndicatorProps {
  className?: string;
  text?: string;
}

export const ScrollIndicator = ({ 
  className,
  text = "Scroll Down" 
}: ScrollIndicatorProps) => {
  return (
    <div className={cn(
      "flex flex-col items-center justify-center",
      className
    )}>
      <span className="text-sm font-medium text-slate-600 dark:text-slate-300 mb-2">
        {text}
      </span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-purple-500 dark:border-purple-400 flex items-start justify-center p-1"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
      >
        <motion.div
          className="w-2 h-2 bg-purple-500 dark:bg-purple-400 rounded-full"
          animate={{ 
            y: [0, 15, 0],
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "loop",
            ease: "easeInOut"
          }}
        />
      </motion.div>
    </div>
  );
};
