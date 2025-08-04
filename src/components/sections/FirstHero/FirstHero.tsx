import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import TypewriterComponent from 'typewriter-effect';
import TextLoader from '@/components/ui/text_loader/text_loader';



interface HackerLine {
  id: number;
  text: string;
  type: 'command' | 'output' | 'success' | 'error';
  delay: number;
}

export default function FirstHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // Remove the unused state or use it properly if needed
  const [terminalLines, setTerminalLines] = useState<HackerLine[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [textLoadingStep, setTextLoadingStep] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  // Wrap hackerCommands in useMemo to prevent it from being recreated on every render
  const hackerCommands = useMemo(() => [
    { id: 1, text: "~/portfolio$ whoami", type: 'command' as const, delay: 0 },
    { id: 2, text: "anusara_Sugeeshwara", type: 'output' as const, delay: 800 },
    { id: 3, text: "~/portfolio$ cat /etc/skills", type: 'command' as const, delay: 1600 },
    { id: 4, text: "✓ Data Science Expert", type: 'success' as const, delay: 2200 },
    { id: 5, text: "✓ Machine Learning Engineer", type: 'success' as const, delay: 2600 },
    { id: 6, text: "✓ AI Specialist", type: 'success' as const, delay: 3000 },
    { id: 7, text: "~/portfolio$ python hack_insights.py", type: 'command' as const, delay: 3800 },
    { id: 8, text: "[INFO] Connecting to data streams...", type: 'output' as const, delay: 4400 },
    { id: 9, text: "[SUCCESS] 🚀 Insights extracted!", type: 'success' as const, delay: 5200 },
    { id: 10, text: "~/portfolio$ sudo ./deploy_awesome", type: 'command' as const, delay: 6000 },
    { id: 11, text: "Deployment successful! 🎯", type: 'success' as const, delay: 6600 }
  ], []);

  // Terminal typing sequence - start immediately
  useEffect(() => {
    const timeouts: NodeJS.Timeout[] = [];
    
    hackerCommands.forEach((line) => {
      const timeout = setTimeout(() => {
        setTerminalLines(prev => [...prev, line]);
        if (line.id === hackerCommands.length) {
          setIsTyping(false);
        }
      }, line.delay);
      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(timeout => clearTimeout(timeout));
    };
  }, [hackerCommands]); // Add hackerCommands as a dependency

  // Mouse tracking and animation controls
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };

    const heroElement = heroRef.current;
    if (heroElement) {
      heroElement.addEventListener("mousemove", handleMouseMove);
    }

    // Start animations immediately
    controls.start("visible");
    // Start text loading sequence immediately
    setTimeout(() => setTextLoadingStep(1), 100);

    return () => {
      if (heroElement) {
        heroElement.removeEventListener("mousemove", handleMouseMove);
      }
    };
  }, [controls]); // Remove showMainContent dependency

  // Handle text loading progression
  const handleTextStepComplete = (step: number) => {
    setTimeout(() => {
      if (step < 6) {
        setTextLoadingStep(step + 1);
      } else {
        setShowButtons(true);
      }
    }, 200);
  };

  
  const buttonVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.4, duration: 0.4 },
    },
  };

  // Handle smooth scrolling to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Main content (with TextLoader animations)
  return (
    <motion.section 
      id="first-hero" 
      ref={heroRef}
      className="relative w-full h-full flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 bg-transparent pt-24 md:pt-32"
      style={{ 
        display: 'flex !important',
        minHeight: '100vh',
        width: '100%',
        fontFamily: "'JetBrains Mono', 'Fira Code', 'Source Code Pro', monospace",
        paddingTop: '6rem'
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >

      {/* Subtle mouse glow effect */}
      <div
        className="absolute pointer-events-none rounded-full opacity-20"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          width: 300,
          height: 300,
          background: "radial-gradient(circle, rgba(0, 255, 65, 0.1) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Lightweight scanlines effect */}
      <div className="absolute inset-0 z-5 pointer-events-none opacity-5">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.1) 2px, rgba(0, 255, 65, 0.1) 4px)",
          }}
        />
      </div>

      <div className="container mx-auto w-full z-10 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-center w-full">
          {/* Left Side - Main Content */}
          <div className="text-center lg:text-left w-full space-y-6">
            {/* Status indicator */}
            <motion.div 
              className="flex items-center justify-center lg:justify-start mb-4"
              initial="hidden"
              animate={controls}
            >
              <div className="flex items-center bg-gray-900/80 border border-purple-400/30 rounded-full px-3 py-1.5 backdrop-blur-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2 animate-pulse"></div>
                {textLoadingStep >= 1 ? (
                  <TextLoader 
                    text="SYSTEM_ONLINE"
                    typingSpeed={50}
                    className="text-purple-400 text-xs font-mono"
                    onComplete={() => handleTextStepComplete(1)}
                  />
                ) : (
                  <span className="text-purple-400 text-xs font-mono opacity-0"></span>
                )}
              </div>
            </motion.div>

            {/* ASCII Art Title */}
            <motion.div
              className="font-mono text-purple-400 mb-4"
              initial="hidden"
              animate={controls}
            >
              <pre className="text-xs sm:text-sm leading-tight opacity-80">
{`


───────────────────────────
─██████──██████─██████████─
─██░░██──██░░██─██░░░░░░██─
─██░░██──██░░██─████░░████─
─██░░██──██░░██───██░░██───
─██░░██████░░██───██░░██───
─██░░░░░░░░░░██───██░░██───
─██░░██████░░██───██░░██───
─██░░██──██░░██───██░░██───
─██░░██──██░░██─████░░████─
─██░░██──██░░██─██░░░░░░██─
─██████──██████─██████████─
───────────────────────────
`}
              </pre>
            </motion.div>

            {/* Main Title with TextLoader */}
            <motion.div 
              className="text-2xl md:text-3xl lg:text-4xl font-bold mb-3 font-mono"
              initial="hidden"
              animate={controls}
            >
              <div className="block text-white mb-2">
                {textLoadingStep >= 2 ? (
                  <TextLoader 
                    text="> Anusara Sugeeshwara"
                    typingSpeed={20}
                    className="text-white"
                    onComplete={() => handleTextStepComplete(2)}
                  />
                ) : (
                  <span className="opacity-0">&gt; Anusara Sugeeshwara</span>
                )}
              </div>
              <div className="text-purple-400 text-lg md:text-xl">
                {textLoadingStep >= 3 ? (
                  <TextLoader 
                    text="Data Science Enthusiast"
                    typingSpeed={12}
                    className="text-purple-400"
                    onComplete={() => handleTextStepComplete(3)}
                  />
                ) : (
                  <span className="opacity-0">Data Science Hacker</span>
                )}
              </div>
            </motion.div>

            {/* Animated role with typewriter effect */}
            <motion.div 
              className="text-sm md:text-base mb-4 font-mono"
              initial="hidden"
              animate={controls}
            >
              <div className="flex items-center justify-center lg:justify-start">
                {textLoadingStep >= 4 ? (
                  <>
                    <TextLoader 
                      text="~/specialties$"
                      typingSpeed={10}
                      className="text-purple-400 mr-2"
                      onComplete={() => handleTextStepComplete(4)}
                    />
                    {textLoadingStep >= 5 && (
                      <TypewriterComponent
                        options={{
                          strings: [
                            'ML_Engineering',
                            'Data_Analysis', 
                            'AI_Development',
                            'NLP_Engineering',
                            'Data_Engineering',
                            'Public_Speaker',
                            'Tutor'
                          ],
                          autoStart: true,
                          loop: true,
                          wrapperClassName: "text-blue-400 font-bold",
                          cursorClassName: "text-purple-400"
                        }}
                      />
                    )}
                  </>
                ) : (
                  <span className="text-purple-400 mr-2 opacity-0">~/specialties$</span>
                )}
              </div>
            </motion.div>

            {/* Description with terminal styling */}
            <motion.div 
              className="bg-gray-900/50 border-l-4 border-purple-400 pl-3 py-2 mb-6 max-w-lg mx-auto lg:mx-0"
              initial="hidden"
              animate={controls}

            >
              <div className="text-gray-300 font-mono text-xs leading-relaxed">
                {textLoadingStep >= 5 ? (
                  <>
                    <span className="text-purple-400"># Mission:</span><br/>
                    <TextLoader 
                      text="Extracting intelligence from chaos. Converting raw data into powerful insights through advanced ML algorithms."
                      typingSpeed={12}
                      className="text-gray-300"
                      onComplete={() => handleTextStepComplete(5)}
                    />
                  </>
                ) : (
                  <div className="opacity-0">
                    <span className="text-purple-400"># Mission:</span><br/>
                    Extracting intelligence from chaos. Converting raw data<br/>
                    into powerful insights through advanced ML algorithms.
                  </div>
                )}
              </div>
            </motion.div>

            {/* CTA Buttons with delayed appearance */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              initial="hidden"
              animate={showButtons ? "visible" : "hidden"}
              variants={buttonVariants}
            >
              <Button 
                variant="primary" 
                size="sm" 
                onClick={() => scrollToSection('projects')}
                className="group bg-purple-600 hover:bg-purple-500 border border-purple-400 font-mono text-sm shadow-md shadow-purple-400/20"
              >
                ./view_projects.sh
                <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
              </Button>
              <Button 
                variant="secondary" 
                size="sm" 
                onClick={() => scrollToSection('contact')}
                className="font-mono border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-gray-900 text-sm shadow-md shadow-blue-400/20"
              >
                cat contact.info
              </Button>
            </motion.div>

            {/* Stats with TextLoader animation */}
            <motion.div 
              className="mt-6 grid grid-cols-3 gap-3 text-center font-mono"
              initial="hidden"
              animate={showButtons ? "visible" : "hidden"}
              variants={buttonVariants}
            >
              <div className="bg-gray-900/50 border border-purple-400/20 rounded px-2 py-1.5">
                <div className="text-purple-400 text-lg font-bold">
                  {textLoadingStep >= 6 && showButtons ? (
                    <TextLoader 
                      text="7+"
                      typingSpeed={17}
                      className="text-purple-400"
                    />
                  ) : (
                    <span className="opacity-0">7+</span>
                  )}
                </div>
                <div className="text-gray-500 text-xs">YRS_EXP</div>
              </div>
              <div className="bg-gray-900/50 border border-blue-400/20 rounded px-2 py-1.5">
                <div className="text-blue-400 text-lg font-bold">
                  {textLoadingStep >= 6 && showButtons ? (
                    <TextLoader 
                      text="50+"
                      typingSpeed={10}
                      className="text-blue-400"
                    />
                  ) : (
                    <span className="opacity-0">50+</span>
                  )}
                </div>
                <div className="text-gray-500 text-xs">PROJECTS</div>
              </div>
              <div className="bg-gray-900/50 border border-purple-400/20 rounded px-2 py-1.5">
                <div className="text-purple-400 text-lg font-bold">
                  {textLoadingStep >= 6 && showButtons ? (
                    <TextLoader 
                      text="15+"
                      typingSpeed={100}
                      className="text-purple-400"
                    />
                  ) : (
                    <span className="opacity-0">15+</span>
                  )}
                </div>
                <div className="text-gray-500 text-xs">TECH_STACK</div>
              </div>
            </motion.div>
          </div>

          {/* Right side - Live terminal */}
          <motion.div 
            className="w-full"
            initial="hidden"
            animate={controls}

          >
            <div className="bg-gray-900 border border-purple-400/50 rounded-lg p-4 shadow-2xl shadow-purple-400/10 max-h-100 overflow-hidden">
              <div className="flex items-center mb-3">
                <div className="flex space-x-1.5">
                  <div className="w-2.5 h-2.5 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 bg-purple-500 rounded-full"></div>
                </div>
                <span className="ml-3 text-purple-400 text-xs font-mono">hacker_terminal.sh</span>
              </div>
              
              <div className="space-y-1 text-xs font-mono">
                {terminalLines.map((line) => (
                  <motion.div 
                    key={line.id}
                    className={`${
                      line.type === 'command' ? 'text-white' :
                      line.type === 'success' ? 'text-purple-400' :
                      line.type === 'error' ? 'text-red-400' :
                      'text-gray-400'
                    }`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {line.type === 'command' && <span className="text-purple-400">$ </span>}
                    <TextLoader 
                      text={line.text}
                      typingSpeed={10}
                      className={
                        line.type === 'command' ? 'text-white' :
                        line.type === 'success' ? 'text-purple-400' :
                        line.type === 'error' ? 'text-red-400' :
                        'text-gray-400'
                      }
                    />
                  </motion.div>
                ))}
                
                {isTyping && (
                  <motion.div 
                    className="flex items-center text-white"
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                  >
                    <span className="text-purple-400">$ </span>
                    <span className="ml-1 w-1.5 h-3 bg-purple-400"></span>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
