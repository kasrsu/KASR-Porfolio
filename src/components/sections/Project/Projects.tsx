"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Card, CardContent } from '@/components/ui/Card';
import { Modal } from '@/components/ui/Modal';
import { Loading } from '@/components/ui/Loading';
import { projects, projectCategories, Project } from '@/data/projects';
import { BentoGrid } from './bento_template/bento_template';
import { cn } from '@/lib/utils';

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProjects, setFilteredProjects] = useState(projects);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'bento'>('grid');
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  
  // Filter projects when category or search changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate loading time for smooth transitions
    const timer = setTimeout(() => {
      let filtered = projects;
      
      // Apply category filter
      if (selectedCategory !== 'all') {
        filtered = filtered.filter(project => project.category === selectedCategory);
      }
      
      // Apply search filter
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
  
  // Open project detail modal
  const openProjectModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    setIsModalOpen(true);
  };
  
  // Handle image navigation in the modal carousel
  const navigateImage = (direction: 'prev' | 'next') => {
    if (!selectedProject?.images) return;
    
    if (direction === 'next') {
      setCurrentImageIndex(prevIndex => 
        prevIndex === selectedProject.images!.length - 1 ? 0 : prevIndex + 1
      );
    } else {
      setCurrentImageIndex(prevIndex => 
        prevIndex === 0 ? selectedProject.images!.length - 1 : prevIndex - 1
      );
    }
  };

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
  
  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-4 bg-transparent"
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
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
            <Loading variant="spinner" size="lg" color="purple" />
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
                <AnimatePresence mode="popLayout">
                  {filteredProjects.map((project) => (
                    <motion.div 
                      key={project.id}
                      variants={itemVariants}
                      layout
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="h-full"
                    >
                      <ProjectCard 
                        project={project} 
                        onClick={() => openProjectModal(project)} 
                      />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            ) : (
              <motion.div
                key="bento-view"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <BentoGrid 
                  projects={filteredProjects}
                  onProjectClick={openProjectModal}
                />
              </motion.div>
            )}
          </AnimatePresence>
        )}
        
        {/* Project Detail Modal */}
        <AnimatePresence>
          {isModalOpen && selectedProject && (
            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title={selectedProject.title}
              size="lg"
            >
              <div className="space-y-6">
                {/* Image Carousel */}
                {selectedProject.images && selectedProject.images.length > 0 && (
                  <div className="relative overflow-hidden rounded-lg h-[300px] md:h-[400px]">
                    {/* Main Image */}
                    <AnimatePresence mode="wait">
                      <motion.div 
                        key={currentImageIndex}
                        className="w-full h-full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Image 
                          src={selectedProject.images[currentImageIndex]} 
                          alt={`${selectedProject.title} screenshot ${currentImageIndex + 1}`}
                          fill
                          className="object-cover"
                        />
                      </motion.div>
                    </AnimatePresence>
                    
                    {/* Navigation Arrows */}
                    {selectedProject.images.length > 1 && (
                      <>
                        <button 
                          onClick={() => navigateImage('prev')}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full 
                            bg-black/40 hover:bg-black/60 text-white flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button 
                          onClick={() => navigateImage('next')}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full 
                            bg-black/40 hover:bg-black/60 text-white flex items-center justify-center"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                        
                        {/* Image Counter */}
                        <div className="absolute bottom-2 right-2 bg-black/50 text-white text-sm px-2 py-1 rounded">
                          {currentImageIndex + 1} / {selectedProject.images.length}
                        </div>
                      </>
                    )}
                  </div>
                )}
                
                {/* Project Details */}
                <div>
                  <h3 className="text-xl font-bold text-purple-600 mb-2">About This Project</h3>
                  <p className="text-gray-700 dark:text-gray-300 mb-4">{selectedProject.description}</p>
                  
                  {/* Project Metadata */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Project Duration</h4>
                      <p className="text-gray-600 dark:text-gray-400">{selectedProject.duration || 'Not specified'}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Completed</h4>
                      <p className="text-gray-600 dark:text-gray-400">{selectedProject.date}</p>
                    </div>
                    <div className="md:col-span-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, index) => (
                          <span 
                            key={index}
                            className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 
                              px-3 py-1 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  {selectedProject.demoUrl && (
                    <Button 
                      as="a" 
                      href={selectedProject.demoUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="primary"
                      className="flex-1"
                      rightIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      }
                    >
                      View Live Demo
                    </Button>
                  )}
                  
                  {selectedProject.codeUrl && (
                    <Button 
                      as="a" 
                      href={selectedProject.codeUrl} 
                      target="_blank"
                      rel="noopener noreferrer"
                      variant="secondary"
                      className="flex-1"
                      rightIcon={
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      }
                    >
                      View Source Code
                    </Button>
                  )}
                </div>
              </div>
            </Modal>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// Project Card Component
interface ProjectCardProps {
  project: Project;
  onClick: () => void;
}

function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  
  return (
    <motion.div 
      className="h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="overflow-hidden h-full cursor-pointer group" onClick={onClick}>
        <CardContent className="p-0 flex flex-col h-full">
          {/* Project Thumbnail with Overlay */}
          <div className="relative aspect-video overflow-hidden">
            {/* Loading State */}
            {!isImageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <Loading variant="spinner" size="md" color="purple" />
              </div>
            )}
            
            {/* Project Image */}
            <motion.div
              className={cn("relative w-full h-full transition-opacity", !isImageLoaded && "opacity-0")}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                className="object-cover transition-transform"
                onLoad={() => setIsImageLoaded(true)}
              />
              
              {/* Category Badge */}
              <div className="absolute top-2 right-2 bg-purple-600/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                {project.category.charAt(0).toUpperCase() + project.category.slice(1)}
              </div>
              
              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent 
                opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                <div className="text-white">
                  <h3 className="font-bold text-lg">{project.title}</h3>
                  <p className="text-sm text-gray-200">{project.summary}</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Project Info */}
          <div className="p-4 flex-grow flex flex-col">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
              {project.summary}
            </p>
            
            {/* Tech Stack Tags */}
            <div className="mt-auto flex flex-wrap gap-1">
              {project.technologies.slice(0, 3).map((tech, index) => (
                <span 
                  key={index}
                  className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 
                    px-2 py-1 rounded text-xs font-medium"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{project.technologies.length - 3} more
                </span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
