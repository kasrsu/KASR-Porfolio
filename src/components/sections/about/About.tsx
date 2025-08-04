"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { statistics, education, workExperiences } from '@/data/experience';
import { cn } from '@/lib/utils';
export default function About() {
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
            
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-4 bg-transparent"
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
            Data scientist AI Engineer with a passion for turning complex data 
            into actionable insights and building intelligent systems.
          </p>
        </motion.div>

        <div className=" gap-10 items-center mb-20">
          {/* Personal Info & Photo */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={controls}
              variants={{
                visible: { opacity: 1, x: 0, transition: { duration: 0.6 } }
              }}
            >

              
              
              <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                Seeking internship opportunities in data science to apply expertise in artificial intelligence, machine learning, and
natural language processing. Skilled in developing predictive models, AI-driven applications, and graph-based
solutions using Python, Neo4j, and React Native. Proven ability to deliver innovative data-driven insights,
enhancing IT education and operational efficiency for real-world challenges
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
                  <p className="text-gray-700 dark:text-gray-400">Moratuwa, Sri Lanka</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Email</h4>
                  <p className="text-gray-700 dark:text-gray-400">kasrsugeeshwara@gmail.com</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Languages</h4>
                  <p className="text-gray-700 dark:text-gray-400">English, Sinhala</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Availability</h4>
                  <p className="text-purple-600 font-medium">For Data Driven Solutions</p>
                </div>
              </div>
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
          
          <EducationCards />
        </motion.div>
      </div>
    </section>
  );
}
