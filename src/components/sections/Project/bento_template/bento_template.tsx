"use client";

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Project } from '@/data/projects';
import { cn } from '@/lib/utils';
import './bento_template.css';

interface BentoTemplateProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

// Simplified grid layout patterns
const getGridLayout = (projectCount: number, index: number) => {
  // Simple pattern that works for any number of projects
  const patterns = [
    { colSpan: 2, rowSpan: 2 }, // First item is large
    { colSpan: 1, rowSpan: 1 }, // Rest are normal
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 }, // Every 4th item is wide
    { colSpan: 1, rowSpan: 1 },
    { colSpan: 2, rowSpan: 1 }, // Every 6th item is tall
  ];

  // First item is always large, then cycle through the pattern
  if (index === 0) {
    return { colSpan: 2, rowSpan: 2 };
  }
  
  const patternIndex = ((index - 1) % (patterns.length - 1)) + 1;
  return patterns[patternIndex];
};

const BentoTemplate: React.FC<BentoTemplateProps> = ({ projects, onProjectClick }) => {
  if (!projects || projects.length === 0) {
    return (
      <div className="bento-container">
        <p className="text-center text-gray-500 py-12">No projects to display</p>
      </div>
    );
  }

  return (
    <div className="bento-container">
      <div className="bento-grid">
        {projects.map((project, index) => {
          const layout = getGridLayout(projects.length, index);
          return (
            <BentoCard
              key={`bento-${project.id}-${index}`}
              project={project}
              index={index}
              onClick={() => onProjectClick(project)}
              colSpan={layout.colSpan}
              rowSpan={layout.rowSpan}
            />
          );
        })}
      </div>
    </div>
  );
};

interface BentoCardProps {
  project: Project;
  index: number;
  onClick: () => void;
  colSpan: number;
  rowSpan: number;
}

function BentoCard({ project, index, onClick, colSpan, rowSpan }: BentoCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  
  const localMouseX = useMotionValue(0);
  const localMouseY = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const rotateX = useSpring(useTransform(localMouseY, [-0.5, 0.5], [5, -5]), springConfig);
  const rotateY = useSpring(useTransform(localMouseX, [-0.5, 0.5], [-5, 5]), springConfig);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const x = (e.clientX - rect.left - width / 2) / width;
    const y = (e.clientY - rect.top - height / 2) / height;
    
    localMouseX.set(x);
    localMouseY.set(y);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    localMouseX.set(0);
    localMouseY.set(0);
  };

  const cardStyle = {
    gridColumn: `span ${Math.min(colSpan, 4)}`,
    gridRow: `span ${Math.min(rowSpan, 2)}`,
  };

  // Generate CSS classes based on card size
  const getCardSizeClass = () => {
    const classes = ['bento-card'];
    
    if (colSpan >= 2) classes.push('bento-card-wide');
    if (rowSpan >= 2) classes.push('bento-card-tall');
    if (colSpan >= 2 && rowSpan >= 2) classes.push('bento-card-large');
    
    return classes.join(' ');
  };

  // Clean motion props to avoid DOM warnings
  const motionProps = {
    ref: cardRef,
    className: getCardSizeClass(),
    style: {
      ...cardStyle,
      rotateX: isHovered ? rotateX : 0,
      rotateY: isHovered ? rotateY : 0,
      transformStyle: "preserve-3d" as const,
    },
    onMouseMove: handleMouseMove,
    onMouseEnter: () => setIsHovered(true),
    onMouseLeave: handleMouseLeave,
    onClick: onClick,
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { 
      type: "spring" as const, 
      stiffness: 300, 
      damping: 20,
      delay: index * 0.1 
    }
  };

  return (
    <motion.div {...motionProps}>
      {/* Glass Background Layers */}
      <div className="bento-glass-bg">
        <div className="glass-layer-1"></div>
        <div className="glass-layer-2"></div>
        <div className="glass-layer-3"></div>
      </div>

      {/* Animated Border */}
      <div className="bento-border-gradient"></div>
      
      {/* Holographic Overlay */}
      <div className="holographic-overlay"></div>

      {/* Main Content */}
      <div className="bento-content">
        {/* Image Section */}
        <div className="bento-image-container">
          <div className="bento-image-wrapper">
            {/* Loading Spinner */}
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg">
                <div className="w-6 h-6 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            )}
            
            {/* Project Image */}
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className={cn(
                "object-cover rounded-lg transition-all duration-300",
                !isImageLoaded && "opacity-0",
                isHovered && "scale-110 brightness-110"
              )}
              onLoad={() => setIsImageLoaded(true)}
              onError={() => setIsImageLoaded(true)}
            />
            
            {/* Category Badge */}
            <div className="category-badge">
              {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
            </div>
          </div>
        </div>

        {/* Text Content */}
        <div className="bento-text-content">
          <h3 className="bento-title">
            {project.title}
          </h3>
          
          {/* Summary - Always visible and prominent */}
          <p className="bento-description">
            {project.summary || project.description || 'No description available'}
          </p>

          {/* Project Points - Only for larger cards, after summary */}
          {(colSpan > 1 || rowSpan > 1) && project.points && project.points.length > 0 && (
            <div className="bento-points">
              {project.points.slice(0, 2).map((point, pointIndex) => (
                <div 
                  key={`point-${pointIndex}`}
                  className="bento-point-item"
                >
                  <div className="bento-point-bullet"></div>
                  <span className="bento-point-text">{point}</span>
                </div>
              ))}
              {project.points.length > 2 && (
                <div className="bento-point-more">
                  +{project.points.length - 2} more details
                </div>
              )}
            </div>
          )}

          {/* Tech Stack */}
          <div className="tech-pills">
            {project.technologies.slice(0, 3).map((tech, techIndex) => (
              <motion.span 
                key={`${tech}-${techIndex}`}
                className="tech-pill"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ 
                  delay: 0.1 + techIndex * 0.05,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ scale: 1.05 }}
              >
                <span className="tech-pill-icon">⚡</span>
                {tech}
              </motion.span>
            ))}
            {project.technologies.length > 3 && (
              <motion.span 
                className="tech-pill-more"
                whileHover={{ scale: 1.05 }}
              >
                <span className="tech-pill-icon">+</span>
                {project.technologies.length - 3} more
              </motion.span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function BentoGrid({ projects, onProjectClick }: BentoTemplateProps) {
  return (
    <BentoTemplate 
      projects={projects}
      onProjectClick={onProjectClick}
    />
  );
}
