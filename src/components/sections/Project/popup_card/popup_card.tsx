import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project } from '@/data/projects';
import { Button } from '@/components/ui/Button';
import './popup_card.css';

interface ProjectPopupProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectPopup({ project, isOpen, onClose }: ProjectPopupProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Reset image index when project changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [project]);

  // Handle escape key to close popup
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  const images = project.images && project.images.length > 0 ? project.images : [project.thumbnail];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="project-popup-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="project-popup-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              className="popup-close-button"
              onClick={onClose}
              aria-label="Close popup"
            >
              ✕
            </button>

            <div className="project-popup-content">
              {/* Image Carousel */}
              <div className="project-image-carousel">
                <img
                  src={images[currentImageIndex]}
                  alt={`${project.title} - Image ${currentImageIndex + 1}`}
                  className="carousel-image"
                />
                
                {images.length > 1 && (
                  <>
                    <button
                      className="carousel-nav prev-button"
                      onClick={prevImage}
                      aria-label="Previous image"
                    >
                      ‹
                    </button>
                    <button
                      className="carousel-nav next-button"
                      onClick={nextImage}
                      aria-label="Next image"
                    >
                      ›
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="carousel-indicators">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          className={`indicator ${index === currentImageIndex ? 'active' : ''}`}
                          onClick={() => setCurrentImageIndex(index)}
                          aria-label={`Go to image ${index + 1}`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Project Details */}
              <div className="project-details">
                {/* Header */}
                <div className="project-header">
                  <h2 className="project-title">{project.title}</h2>
                  <div className="project-metadata">
                    <span className="project-date">{formatDate(project.date)}</span>
                    {project.duration && (
                      <>
                        <span className="metadata-separator">•</span>
                        <span className="project-duration">{project.duration}</span>
                      </>
                    )}
                    <span className="metadata-separator">•</span>
                    <span className="project-category">{project.category}</span>
                    {project.featured && (
                      <>
                        <span className="metadata-separator">•</span>
                        <span className="featured-badge">Featured</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Summary */}
                {project.summary && (
                  <div className="project-summary">
                    <h3>Summary</h3>
                    <p>{project.summary}</p>
                  </div>
                )}

                {/* Description */}
                <div className="project-description">
                  <h3>Description</h3>
                  <p>{project.description}</p>
                </div>

                {/* Key Points */}
                {project.points && project.points.length > 0 && (
                  <div className="project-points">
                    <h3>Key Highlights</h3>
                    <ul>
                      {project.points.map((point, index) => (
                        <li key={index}>{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Technologies */}
                <div className="project-technologies">
                  <h3>Technologies Used</h3>
                  <div className="tech-grid">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button bg-purple-600 hover:bg-purple-700 text-white no-underline"
                    >
                      <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Live Demo
                    </a>
                  )}
                  {project.codeUrl && (
                    <a
                      href={project.codeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="action-button bg-gray-600 hover:bg-gray-700 text-white no-underline"
                    >
                      <svg className="button-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}