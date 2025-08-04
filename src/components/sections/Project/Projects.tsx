"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { projects, projectCategories, Project } from '@/data/projects';
import { BentoGrid } from './bento_template/bento_template';
import ProjectPopup from './popup_card/popup_card';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import './bento_template/bento_template.css';
import './Projects.css';

// Add interface for ProjectCard props
interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'bento'>('grid');
  
  // Popup state
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();

  // Filter projects when category or search changes
  useEffect(() => {
    setIsLoading(true);

    const timer = setTimeout(() => {
      let filtered = projects;

      if (selectedCategory !== 'all') {
        filtered = filtered.filter(project => project.category === selectedCategory);
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filtered = filtered.filter(project =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some(tech => tech.toLowerCase().includes(query))
        );
      }

      setFilteredProjects(filtered);
      setIsLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [selectedCategory, searchQuery]);

  // Animate section when it comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    }
  };

  // Popup handlers
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedProject(null);
  };

  return (
    <>
      <section 
        id="projects" 
        ref={sectionRef}
        className="py-20 px-4 bg-transparent relative"
      >
        <div className="container mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
            }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
              My <span className="text-purple-600">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
              Explore my portfolio of data science and machine learning projects 
              that showcase my technical skills and problem-solving abilities.
            </p>
          </motion.div>
          
          {/* Filters Row */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between">
            {/* Category Filter */}
            <motion.div 
              className="flex flex-wrap gap-2 justify-center md:justify-start"
              initial={{ opacity: 0, y: 10 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, y: 0, transition: { delay: 0.2 } }
              }}
            >
              {projectCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "primary" : "ghost"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className="rounded-full"
                >
                  {category.name}
                </Button>
              ))}
            </motion.div>
            
            {/* View Toggle and Search */}
            <div className="flex gap-4 items-center">
              {/* View Mode Toggle */}
              <motion.div 
                className="flex bg-gray-100 dark:bg-gray-800 rounded-full p-1"
                initial={{ opacity: 0, y: 10 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0, transition: { delay: 0.25 } }
                }}
              >
                <button
                  onClick={() => setViewMode('grid')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    viewMode === 'grid' 
                      ? "bg-white dark:bg-gray-700 text-purple-600 shadow-sm" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  Grid
                </button>
                <button
                  onClick={() => setViewMode('bento')}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm font-medium transition-all",
                    viewMode === 'bento' 
                      ? "bg-white dark:bg-gray-700 text-purple-600 shadow-sm" 
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                  )}
                >
                  Bento
                </button>
              </motion.div>
              
              {/* Search Input */}
              <motion.div 
                className="relative w-full md:w-64"
                initial={{ opacity: 0, y: 10 }}
                animate={controls}
                variants={{
                  visible: { opacity: 1, y: 0, transition: { delay: 0.3 } }
                }}
              >
                <input
                  type="text"
                  placeholder="Search projects..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-full border-2 border-gray-200 dark:border-gray-700 
                    focus:outline-none focus:border-purple-500 bg-white dark:bg-gray-800 
                    text-gray-700 dark:text-gray-300 pr-10"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center items-center py-20">
              <div className="spinner"></div>
            </div>
          )}
          
          {/* No Results */}
          {!isLoading && filteredProjects.length === 0 && (
            <motion.div 
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-xl text-gray-600 dark:text-gray-400">No projects match your criteria.</p>
              <Button 
                variant="secondary" 
                className="mt-4"
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchQuery('');
                }}
              >
                Reset Filters
              </Button>
            </motion.div>
          )}
          
          {/* Projects Display - Grid or Bento Layout */}
          {!isLoading && filteredProjects.length > 0 && (
            <AnimatePresence mode="wait">
              {viewMode === 'grid' ? (
                <motion.div 
                  key="grid-view"
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                  variants={containerVariants}
                  initial="hidden"
                  animate={isInView ? "visible" : "hidden"}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ duration: 0.3 }}
                >
                  {filteredProjects.map((project) => (
                    <motion.div 
                      key={project.id}
                      variants={itemVariants}
                      className="h-full"
                    >
                      <ProjectCard project={project} onClick={handleProjectClick} />
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  key="bento-view"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <BentoGrid projects={filteredProjects} onProjectClick={handleProjectClick} />
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </section>
      
      {/* Project Popup - Outside main section */}
      <ProjectPopup
        project={selectedProject}
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </>
  );
}

// Project Card Component - Updated for dark mode
function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <div className="project-card" onClick={() => onClick(project)}>
      {/* Thumbnail */}
      <div className="project-thumbnail">
        <Image
          src={project.thumbnail}
          alt={project.title}
          className="project-image"
          width={400}
          height={225}
          layout="responsive"
          objectFit="cover"
          priority={false}
        />
        <div className="project-category-badge">
          {projectCategories.find(cat => cat.id === project.category)?.name || project.category}
        </div>
        <div className="project-overlay">
          <div className="project-overlay-content">
            <h3 className="project-overlay-title">{project.title}</h3>
            <p className="project-overlay-summary">{project.description}</p>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="project-content">
        <h3 className="project-title">{project.title}</h3>
        <p className="project-summary">{project.description}</p>
        
        {/* Tech Stack */}
        <div className="project-tech-tags">
          {project.technologies.slice(0, 3).map((tech, index) => (
            <span key={index} className="project-tech-tag">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="project-tech-more">
              +{project.technologies.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}