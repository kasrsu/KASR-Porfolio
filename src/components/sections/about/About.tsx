"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/Card';
import { skills, skillCategories, getSkillsByCategory } from '@/data/skills';
import { statistics, education, workExperiences } from '@/data/experience';
import { cn } from '@/lib/utils';

export default function About() {
  const [selectedSkillCategory, setSelectedSkillCategory] = useState(skillCategories[0].id);
  const [visibleExperience, setVisibleExperience] = useState<string | null>(null);
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  
  // Animation for when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  // Staggered animation variants for skills
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  // For counter animation
  const CounterAnimation = ({ value }: { value: number }) => {
    const [count, setCount] = useState(0);
    const counterRef = useRef<HTMLSpanElement>(null);
    const counterInView = useInView(counterRef, { once: true, margin: "-50px" });
    
    useEffect(() => {
      if (counterInView) {
        let start = 0;
        const end = value;
        const duration = 2000; // 2 seconds animation
        const increment = end / (duration / 16); // Update every 16ms
        
        const timer = setInterval(() => {
          start += increment;
          if (start >= end) {
            setCount(end);
            clearInterval(timer);
          } else {
            setCount(Math.floor(start));
          }
        }, 16);
        
        return () => clearInterval(timer);
      }
    }, [counterInView, value]);
    
    return <span ref={counterRef}>{count}</span>;
  };

  // Timeline component for experience
  const Timeline = () => {
    const toggleExperience = (expId: string) => {
      setVisibleExperience(visibleExperience === expId ? null : expId);
    };

    return (
      <div className="relative mt-10 mb-16">
        {/* Timeline center line */}
        <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-purple-200 dark:bg-purple-900"></div>
        
        {/* Experience items */}
        {workExperiences.map((exp, index) => (
          <motion.div 
            key={exp.id}
            className={cn(
              "relative flex flex-col md:flex-row mb-10 md:mb-16",
              index % 2 === 0 ? "md:flex-row-reverse" : ""
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 }}
          >
            {/* Timeline dot */}
            <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-5 h-5 rounded-full bg-purple-500 border-4 border-white dark:border-gray-900"></div>
            
            {/* Content */}
            <div className={cn(
              "w-full md:w-5/12 p-4",
              index % 2 === 0 ? "md:mr-auto" : "md:ml-auto"
            )}>
              <div 
                className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md border border-white/30 dark:border-gray-700/30 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                onClick={() => toggleExperience(exp.id)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    {exp.logo && (
                      <div className="w-10 h-10 mr-3 relative">
                        <Image
                          src={exp.logo}
                          alt={exp.company}
                          fill
                          className="object-contain rounded-md"
                        />
                      </div>
                    )}
                    <div>
                      <h3 className="font-bold text-lg text-gray-900 dark:text-white">{exp.title}</h3>
                      <p className="text-purple-600 dark:text-purple-400">{exp.company}</p>
                    </div>
                  </div>
                  {/* Click indicator */}
                  <motion.div
                    animate={{ rotate: visibleExperience === exp.id ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-purple-600 dark:text-purple-400"
                  >
                    <i className="fas fa-chevron-down"></i>
                  </motion.div>
                </div>
                
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {exp.startDate} - {exp.endDate} • {exp.location}
                </p>
                
                {/* Click instruction */}
                {visibleExperience !== exp.id && (
                  <p className="text-xs text-purple-500 dark:text-purple-400 italic">
                    Click to see more details
                  </p>
                )}
                
                {/* Detailed content that appears on click */}
                <motion.div 
                  className="mt-3 overflow-hidden"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ 
                    opacity: visibleExperience === exp.id ? 1 : 0,
                    height: visibleExperience === exp.id ? 'auto' : 0
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <p className="text-gray-700 dark:text-gray-300 mb-3">{exp.description}</p>
                  
                  <h4 className="font-medium text-purple-700 dark:text-purple-400 mb-1">Key Responsibilities:</h4>
                  <ul className="list-disc pl-5 mb-3">
                    {exp.responsibilities.slice(0, 3).map((item, i) => (
                      <li key={i} className="text-sm text-gray-700 dark:text-gray-300">{item}</li>
                    ))}
                  </ul>
                  
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.skills.slice(0, 5).map((skill, i) => (
                      <span 
                        key={i}
                        className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-full"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    );
  };

  // Education cards with animations
  const EducationCards = () => {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {education.map((edu, index) => (
          <motion.div 
            key={edu.id}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: index * 0.2 }}
            whileHover={{ 
              y: -10, 
              boxShadow: "0px 10px 20px rgba(139, 92, 246, 0.3)",
              transition: { duration: 0.3 }
            }}
          >
            <Card className="h-full overflow-hidden">
              <CardContent className="p-0">
                <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4 text-white">
                  <h3 className="font-bold text-lg">{edu.degree}</h3>
                  <p>{edu.field}</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    {edu.logo && (
                      <div className="w-10 h-10 mr-3 relative">
                        <Image
                          src={edu.logo}
                          alt={edu.institution}
                          fill
                          className="object-contain rounded-md"
                        />
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">{edu.institution}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{edu.location}</p>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    {edu.startDate} - {edu.endDate}
                  </p>
                  
                  {edu.achievements && edu.achievements.length > 0 && (
                    <div className="mt-3">
                      <h5 className="text-sm font-medium text-purple-700 dark:text-purple-400 mb-1">Achievements:</h5>
                      <ul className="list-disc pl-5">
                        {edu.achievements.slice(0, 2).map((item, i) => (
                          <li key={i} className="text-xs text-gray-700 dark:text-gray-300">{item}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-4 bg-gray-50 dark:bg-gray-900"
    >
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
          variants={{
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            About <span className="text-purple-600">Me</span>
          </h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            Data scientist and machine learning engineer with a passion for turning complex data 
            into actionable insights and building intelligent systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center mb-20">
          {/* Personal Info & Photo */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >
              <h3 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
                Anusara <span className="text-purple-600">Esberger</span>
              </h3>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                I'm a data scientist with over 7 years of experience in developing machine learning solutions 
                that solve real business problems. With a Ph.D. in Computer Science specializing in 
                machine learning, I've worked across various industries including finance, healthcare, 
                and e-commerce.
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                My expertise lies in predictive modeling, natural language processing, and data 
                visualization. I'm passionate about transforming raw data into meaningful insights 
                and creating AI systems that make a positive impact.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
                  <p className="text-gray-700 dark:text-gray-400">Vienna, Austria</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Email</h4>
                  <p className="text-gray-700 dark:text-gray-400">anusara@example.com</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Languages</h4>
                  <p className="text-gray-700 dark:text-gray-400">English, German, Czech</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Availability</h4>
                  <p className="text-purple-600 font-medium">Available for freelance</p>
                </div>
              </div>
            </motion.div>
          </div>
          
          {/* Profile Image with Animation */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-end">
            <motion.div 
              className="relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
              }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.3 } 
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg blur-xl opacity-20 animate-pulse"></div>
              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl">
                <Image
                  src="/profile-image.jpg" // Replace with actual image path
                  alt="Anusara Esberger"
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Border animation on hover */}
                <div className="absolute inset-0 border-4 border-purple-500 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              {/* Floating decoration elements */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-20 h-20 bg-purple-600 rounded-full opacity-80"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 5, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
              <motion.div
                className="absolute -top-4 -left-4 w-12 h-12 bg-indigo-600 rounded-full opacity-80"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, -5, 0],
                }}
                transition={{
                  duration: 3.5,
                  repeat: Infinity,
                  repeatType: "reverse"
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Statistics with Counter Animation */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
          {statistics.map((stat, index) => (
            <motion.div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-6 text-center shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                  <i className={`fas fa-${stat.icon} text-2xl`}></i>
                </div>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                <CounterAnimation value={stat.value} />+
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Experience Timeline */}
        <motion.div
          className="mb-20"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            Work <span className="text-purple-600">Experience</span>
          </h3>
          <Timeline />
        </motion.div>
        {/* Education */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900 dark:text-white">
            <span className="text-purple-600">Education</span> & Qualifications
          </h3>
          <EducationCards />
        </motion.div>
      </div>
    </section>
  );
}
