"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';
import { skillCategories, getSkillsByCategory, Skill ,} from '@/data/skills';
import { cn } from '@/lib/utils';
import './Skills.css';

interface Certificate {
  id: string;
  name: string;
  issuer: string;
  date: string;
  logo: string;
  url?: string;
  skills: string[];
}

// Define TechItem interface
interface TechItem {
  name: string;
  icon: string;
  experience: string;
  description: string;
}

// Cer
const certificates: Certificate[] = [
  { 
    id: 'cert-1',
    name: 'Neo4j Certified Professional',
    issuer: 'Neo4j Graph Academy',
    date: '2022',
    url: 'https://aws.amazon.com/certification/certified-machine-learning-specialty/',
    logo: '/logos/aws-cert.png',
    skills: ['Graph Databases', 'Neo4j', 'Cypher Query Language']
  },
  {
      id: 'cert-2',
    name: 'Design Team Lead',
    issuer: 'MANTHRA Hackathon, NSBM IEEE Student Branch',
    date: '2023',
    url: 'https://www.tensorflow.org/certificate',
    logo: '/logos/tensorflow-cert.png',
    skills: ['Team Leadership' , 'ui/ux design', 'Project Management']
  },
  {
    id: 'cert-3',
    name: 'Committee Member',
    issuer: 'Duothan 2.0 Buildathon, NSBM IEEE Student Branch',
    date: '2023',
    url: 'https://www.datacamp.com/certificate/DS0016471462883',
    logo: '/logos/datacamp-cert.png',
    skills: ['Data Analysis', 'Team Collaboration', 'Problem Solving']
  },
  {
    id: 'cert-4',
    name: 'IEEE Xtreme 19: University Rank 2nd, Island Rank 36th',
    issuer: 'IEEE',
    date: '2024',
    url: 'https://www.coursera.org/specializations/deep-learning',
    logo: '/logos/coursera-cert.png',
    skills: ['Competitive Programming', 'Problem Solving', 'Team Collaboration']
  },
  {
    id: 'cert-5',
    name: 'Vestoria TechTrek Coding Challenge: 4th Place',
    issuer: 'Vestoria',
    date: '2024',
    url: 'https://www.coursera.org/specializations/deep-learning',
    logo: '/logos/coursera-cert.png',
        skills: ['Competitive Programming', 'Problem Solving', 'Team Collaboration']
  },
  {
    id: 'cert-6',
    name: 'Solafune - Machine Learning competition top 5%',
    issuer: 'Solafune',
    date: '2025',
    url: 'https://www.coursera.org/specializations/deep-learning',
    logo: '/logos/coursera-cert.png',
    skills: ['open cv', 'Machine Learning', 'Computer Vision']
  },
  {
    id: 'cert-7',
    name: 'IEEE Xtreme 18: University Rank 1st, Island Rank 76th',
    issuer: 'IEEE',
    date: '2023',
    url: 'https://www.coursera.org/specializations/deep-learning',
    logo: '/logos/coursera-cert.png',
    skills: ['Competitive Programming', 'Problem Solving', 'Team Collaboration']
  }

];

// Tech stack with categories and items
const techStack = [
  {
    category: 'Languages & Frameworks',
    items: [
      { name: 'Python', icon: 'python', experience: '8+ years', description: 'Primary language for data science and ML projects' },
      { name: 'R', icon: 'r-project', experience: '6+ years', description: 'Statistical analysis and academic research' },
      { name: 'SQL', icon: 'database', experience: '7+ years', description: 'Data querying and database management' },
      { name: 'JavaScript', icon: 'js', experience: '4+ years', description: 'Web-based visualization and dashboards' },
      { name: 'TypeScript', icon: 'typescript', experience: '3+ years', description: 'Type-safe web development' },
    ]
  },
  {
    category: 'ML & Data Science',
    items: [
      { name: 'TensorFlow', icon: 'tensorflow', experience: '5+ years', description: 'Deep learning models and deployment' },
      { name: 'PyTorch', icon: 'pytorch', experience: '4+ years', description: 'Research and prototyping neural networks' },
      { name: 'scikit-learn', icon: 'scikit-learn', experience: '6+ years', description: 'Classical ML algorithms implementation' },
      { name: 'pandas', icon: 'pandas', experience: '7+ years', description: 'Data manipulation and analysis' },
      { name: 'NumPy', icon: 'numpy', experience: '7+ years', description: 'Numerical computing and array operations' }
    ]
  },
  {
    category: 'Tools & Platforms',
    items: [
      { name: 'Docker', icon: 'docker', experience: '5+ years', description: 'Containerization of ML applications' },
      { name: 'Git', icon: 'git-alt', experience: '7+ years', description: 'Version control and collaboration' },
      { name: 'AWS', icon: 'aws', experience: '4+ years', description: 'Cloud deployment and services' },
      { name: 'Azure', icon: 'microsoft', experience: '3+ years', description: 'ML pipelines and enterprise solutions' },
      { name: 'Kubernetes', icon: 'kubernetes', experience: '2+ years', description: 'Orchestration of containerized applications' }
    ]
  }
];

export default function Skills() {
  const [selectedCategory, setSelectedCategory] = useState(skillCategories[0].id);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTechCategory, setActiveTechCategory] = useState(techStack[0].category);
  const [searchTerm, setSearchTerm] = useState('');
  
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, margin: "-100px" });
  const controls = useAnimation();
  
  // Animation for when section comes into view
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



  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: { 
      duration: 2, 
      repeat: Infinity, 
      repeatType: "reverse" as const
    }
  };



  // Skill Circle Progress Component
  const SkillCircle = ({ skill }: { skill: Skill }) => {
    const circumference = 2 * Math.PI * 40; // Circle radius is 40
    const strokeDashoffset = circumference - (skill.proficiency / 100) * circumference;
    
    return (
      <motion.div 
        className="relative flex flex-col items-center"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100 }
          }
        }}
        whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        onClick={() => {
          setSelectedSkill(skill);
          setIsModalOpen(true);
        }}
      >
        <div className="relative w-24 h-24 mb-3 cursor-pointer group">
          {/* Outer glow on hover */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300"></div>
          
          {/* Background circle */}
          <svg className="w-full h-full rotate-[-90deg]" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke="currentColor"
              strokeWidth="8"
              className="text-gray-200 dark:text-gray-700"
            />
            
            {/* Progress circle with animation */}
            <motion.circle
              cx="50"
              cy="50"
              r="40"
              fill="none"
              stroke={skill.color || '#8B5CF6'}
              strokeWidth="8"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1.5, delay: 0.2 }}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Icon or text in the middle */}
          <div className="absolute inset-0 flex items-center justify-center">
            {skill.icon ? (
              <i className={`fab fa-${skill.icon} text-xl text-gray-800 dark:text-gray-200`}></i>
            ) : (
              <span className="text-sm font-medium text-gray-800 dark:text-gray-200">{skill.name.substring(0, 2)}</span>
            )}
          </div>
        </div>
        
        {/* Skill name */}
        <h4 className="text-sm font-medium text-center text-gray-800 dark:text-gray-200">
          {skill.name}
        </h4>
        
        {/* Proficiency percentage */}
        <p className="text-xs text-purple-600 dark:text-purple-400 font-medium">
          {skill.proficiency}%
        </p>
      </motion.div>
    );
  };

  // Tech Stack Item Component
  const TechStackItem = ({ item }: { item: TechItem }) => {
    return (
      <motion.div
        className="flex items-center gap-3 p-3 rounded-lg bg-white/70 dark:bg-gray-800/70 backdrop-blur-md border border-white/30 dark:border-gray-700/30 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        variants={{
          hidden: { opacity: 0, y: 20 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring" as const, stiffness: 100 }
          }
        }}
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 4px 12px rgba(139, 92, 246, 0.15)" 
        }}
      >
        <div className="flex-shrink-0 w-10 h-10 bg-purple-100 dark:bg-purple-900/30 rounded-md flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:bg-purple-200 dark:group-hover:bg-purple-800/40 transition-colors">
          <i className={`fab fa-${item.icon} text-xl`}></i>
        </div>
        
        <div className="flex-grow">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {item.name}
          </h4>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {item.experience}
          </p>
        </div>
      </motion.div>
    );
  };

  // Certificate Card Component
  const CertificateCard = ({ certificate }: { certificate: Certificate }) => {
    return (
      <motion.div
        className="relative group"
        whileHover={{ 
          y: -5,
          transition: { duration: 0.2 }
        }}
      >
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg opacity-0 group-hover:opacity-100 blur transition-opacity"></div>
        <Card className="relative h-full">
          <CardContent className="p-6">
            <div className="flex items-center mb-4">
              {/* Certificate logo/badge */}
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-md flex items-center justify-center text-purple-600 dark:text-purple-400 mr-4">
                <motion.div animate={pulseAnimation}>
                  <i className="fas fa-certificate text-2xl"></i>
                </motion.div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                  {certificate.name}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 text-xs">
                  {certificate.issuer}
                </p>
              </div>
            </div>
            
            <div className="text-sm text-gray-700 dark:text-gray-300 mb-4">
              <p className="text-xs">Issued: {certificate.date}</p>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-3">
              {certificate.skills.map((skill, i) => (
                <span
                  key={i}
                  className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300 px-2 py-1 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            {certificate.url && (
              <div className="absolute bottom-3 right-3">
                <a 
                  href={certificate.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-purple-600 dark:text-purple-400 text-sm hover:underline"
                >
                  <i className="fas fa-external-link-alt"></i>
                </a>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  return (
    <section 
      id="skills" 
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
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Skills & <span className="text-purple-600">Technologies</span>
          </h2>
          <div className="w-20 h-1 bg-purple-600 mx-auto mb-6"></div>
          <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
            My technical expertise and tools I use to build intelligent data solutions
          </p>
        </motion.div>

        {/* Skill Category Tabs and Search in Same Row */}
        <div className="mb-8 md:mb-12">
          {/* Filter and Search Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-10">
            {/* Category Tabs */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
              {skillCategories.map((category) => (
                <motion.button
                  key={category.id}
                  className={cn(
                    "px-3 md:px-6 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium transition-all",
                    selectedCategory === category.id 
                      ? "bg-purple-600 text-white shadow-md" 
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-100 dark:hover:bg-purple-900/30 shadow-sm"
                  )}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    borderLeft: selectedCategory === category.id ? `4px solid ${category.color}` : 'none'
                  }}
                >
                  {category.name}
                </motion.button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search skills..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
          </div>

          {/* Skill Circles Grid */}
          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8 justify-items-center"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {getSkillsByCategory(selectedCategory)
              .filter(skill => 
                skill.name.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((skill) => (
                <SkillCircle key={skill.name} skill={skill} />
              ))}
          </motion.div>
        </div>

        {/* Tech Stack Section */}
        <motion.div
          className="mb-10 md:mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-gray-900 dark:text-white">
            My <span className="text-purple-600">Tech Stack</span>
          </h3>
          
          {/* Tech Categories and Search Row */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6 md:mb-8">
            {/* Tech Categories */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-2 md:gap-3">
              {techStack.map((tech) => (
                <motion.button
                  key={tech.category}
                  className={cn(
                    "px-3 md:px-4 py-1.5 md:py-2 rounded-md text-xs md:text-sm font-medium transition-all",
                    activeTechCategory === tech.category
                      ? "bg-purple-600 text-white" 
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300"
                  )}
                  onClick={() => setActiveTechCategory(tech.category)}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {tech.category}
                </motion.button>
              ))}
            </div>

            {/* Tech Stack Search */}
            <div className="relative w-full lg:w-64">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <i className="fas fa-search text-gray-400"></i>
              </div>
              <input
                type="text"
                placeholder="Search tech stack..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
              />
            </div>
          </div>
          
          {/* Tech Items Grid */}
          {techStack.map((tech) => (
            tech.category === activeTechCategory && (
              <motion.div
                key={tech.category}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {tech.items.map((item) => (
                  <TechStackItem key={item.name} item={item} />
                ))}
              </motion.div>
            )
          ))}
        </motion.div>

        {/* Floating Tech Icons with Glow - make responsive */}
        <motion.div className="relative h-24 md:h-32 mb-10 md:mb-16 overflow-hidden">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full flex justify-around">
              {['python', 'r-project', 'aws', 'docker', 'database', 'js', 'react'].map((icon, index) => (
                <motion.div
                  key={icon}
                  className="relative"
                  transition={{ 
                    delay: index * 0.2,
                    duration: 3 + index * 0.5, 
                    repeat: Infinity, 
                    repeatType: "reverse" 
                  }}
                >
                  <div className="absolute inset-0 bg-purple-500 rounded-full opacity-20 blur-md"></div>
                  <div className="relative z-10 w-10 h-10 md:w-16 md:h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg">
                    <i className={`fab fa-${icon} text-xl md:text-3xl text-purple-600 dark:text-purple-400`}></i>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
        >
          <h3 className="text-xl md:text-2xl font-bold mb-6 md:mb-8 text-center text-gray-900 dark:text-white">
            <span className="text-purple-600">Certifications</span> & Achievements and Awards
          </h3>
          
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {certificates.map((certificate) => (
              <CertificateCard 
                key={certificate.id} 
                certificate={certificate}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Skill Detail Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedSkill(null);
        }}
        title={selectedSkill?.name || "Skill Details"}
      >
        {selectedSkill && (
          <div className="py-4">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 mr-4 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400">
                {selectedSkill.icon ? (
                  <i className={`fab fa-${selectedSkill.icon} text-3xl`}></i>
                ) : (
                  <span className="text-xl font-bold">{selectedSkill.name.substring(0, 2)}</span>
                )}
              </div>
              
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{selectedSkill.name}</h3>
                <p className="text-purple-600 dark:text-purple-400">
                  {skillCategories.find(cat => cat.id === selectedSkill.category)?.name}
                </p>
              </div>
            </div>
            
            {/* Proficiency bar */}
            <div className="mb-6">
              <div className="flex justify-between mb-1">
                <span className="text-gray-700 dark:text-gray-300">Proficiency</span>
                <span className="text-purple-600 dark:text-purple-400 font-medium">{selectedSkill.proficiency}%</span>
              </div>
              <div className="w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${selectedSkill.proficiency}%` }}
                  transition={{ duration: 1 }}
                ></motion.div>
              </div>
            </div>
            
            {/* Example description */}
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              {selectedSkill.name} is a{selectedSkill.name.toLowerCase().includes('python') ? ' programming language' : ' technology'} 
              that I&apos;ve used extensively in my data science projects. With a proficiency level of {selectedSkill.proficiency}%, 
              I am {selectedSkill.proficiency > 90 ? 'an expert' : selectedSkill.proficiency > 80 ? 'highly proficient' : 'comfortable'} 
              using it for various tasks.
            </p>
            
            {/* Example projects using this skill */}
            <div className="mb-6">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Projects using this skill:</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li className="text-gray-700 dark:text-gray-300">Customer Segmentation Analysis</li>
                <li className="text-gray-700 dark:text-gray-300">Predictive Maintenance System</li>
                <li className="text-gray-700 dark:text-gray-300">Natural Language Processing Pipeline</li>
              </ul>
            </div>
            
            <div className="flex justify-end">
              <Button onClick={() => setIsModalOpen(false)}>Close</Button>
            </div>
          </div>
        )}
      </Modal>
    </section>
  );
}
