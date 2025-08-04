// filepath: /media/kasr/ROG/Anusara/My NEW Journey/My new portfolio/Portfolio-SCSS-MLDS-main/My_new_Porfolio/ds-portfolio/ds-portfolio/src/components/prloader/preloader.tsx

"use client";

import React, { useState, useEffect } from 'react';
import './preloader.css';

interface PreloaderProps {
  onLoadComplete: () => void;
  minLoadTime?: number; // Minimum time to show preloader (in ms)
  maxLoadTime?: number; // Maximum time to show preloader (in ms)
}

interface TerminalLine {
  id: number;
  prompt: string;
  text: string;
  type: 'normal' | 'success' | 'warning';
  delay: number;
}

const Preloader: React.FC<PreloaderProps> = ({ 
  onLoadComplete, 
  minLoadTime = 3000,
  maxLoadTime = 6000 
}) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [matrixChars, setMatrixChars] = useState<Array<{id: number, char: string, left: number, delay: number}>>([]);
  const [particles, setParticles] = useState<Array<{id: number, left: number, delay: number}>>([]);

  const terminalLines: TerminalLine[] = [
    { id: 1, prompt: '~$', text: 'Initializing portfolio systems...', type: 'normal', delay: 300 },
    { id: 2, prompt: '~$', text: 'Loading AI components', type: 'normal', delay: 800 },
    { id: 3, prompt: '~$', text: 'Compiling data science modules', type: 'normal', delay: 1300 },
    { id: 4, prompt: '~$', text: 'Establishing neural networks', type: 'success', delay: 1800 },
    { id: 5, prompt: '~$', text: 'Portfolio ready! 🚀', type: 'success', delay: 2300 }
  ];

  const asciiArt = `
███████╗███████╗██████╗ ███████╗██████╗  ██████╗ ███████╗██████╗ 
██╔════╝██╔════╝██╔══██╗██╔════╝██╔══██╗██╔════╝ ██╔════╝██╔══██╗
█████╗  ███████╗██████╔╝█████╗  ██████╔╝██║  ███╗█████╗  ██████╔╝
██╔══╝  ╚════██║██╔══██╗██╔══╝  ██╔══██╗██║   ██║██╔══╝  ██╔══██╗
███████╗███████║██████╔╝███████╗██║  ██║╚██████╔╝███████╗██║  ██║
╚══════╝╚══════╝╚═════╝ ╚══════╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝
                                                                  
               Data Science • AI • Machine Learning               
  `;

  // Initialize matrix effect
  useEffect(() => {
    const chars = [];
    const matrixCharsString = "01アカサタナハマヤラワABCDEF";
    
    for (let i = 0; i < 15; i++) {
      chars.push({
        id: i,
        char: matrixCharsString[Math.floor(Math.random() * matrixCharsString.length)],
        left: Math.random() * 100,
        delay: Math.random() * 3
      });
    }
    setMatrixChars(chars);

    // Initialize particles
    const particleArray = [];
    for (let i = 0; i < 8; i++) {
      particleArray.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2
      });
    }
    setParticles(particleArray);
  }, []);

  // Progress simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        // Simulate realistic loading with variable speed
        const increment = Math.random() * 8 + 2;
        return Math.min(prev + increment, 100);
      });
    }, 150);

    return () => clearInterval(interval);
  }, []);

  // Handle completion
  useEffect(() => {
    if (progress >= 100) {
      const timer = setTimeout(() => {
        setIsComplete(true);
        setTimeout(() => {
          onLoadComplete();
        }, 800);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [progress, onLoadComplete]);

  // Terminal step progression
  useEffect(() => {
    const timer = setTimeout(() => {
      if (currentStep < terminalLines.length - 1) {
        setCurrentStep(prev => prev + 1);
      }
    }, 600);

    return () => clearTimeout(timer);
  }, [currentStep, terminalLines.length]);

  return (
    <div className={`preloader ${isComplete ? 'fade-out' : ''}`}>
      {/* Matrix Background */}
      <div className="matrix-bg">
        {matrixChars.map((char) => (
          <div
            key={char.id}
            className="matrix-char"
            style={{
              left: `${char.left}%`,
              animationDuration: `${3 + char.delay}s`,
              animationDelay: `${char.delay}s`
            }}
          >
            {char.char}
          </div>
        ))}
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              bottom: '10%',
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="preloader-logo">
        <pre className="ascii-art">{asciiArt}</pre>
      </div>

      {/* Terminal Loader */}
      <div className="terminal-loader glow-purple">
        <div className="terminal-header">
          <div className="terminal-dots">
            <div className="terminal-dot red"></div>
            <div className="terminal-dot yellow"></div>
            <div className="terminal-dot green"></div>
          </div>
          <div className="terminal-title">portfolio_loader.sh</div>
        </div>
        
        <div className="terminal-content">
          {terminalLines.slice(0, currentStep + 1).map((line, index) => (
            <div key={line.id} className="terminal-line">
              <span className="terminal-prompt">{line.prompt}</span>
              <span className={`terminal-text ${line.type === 'success' ? 'terminal-success' : line.type === 'warning' ? 'terminal-warning' : ''}`}>
                {line.text}
              </span>
              {index === currentStep && progress < 100 && (
                <span className="cursor"></span>
              )}
            </div>
          ))}
          
          {progress >= 100 && (
            <div className="terminal-line">
              <span className="terminal-prompt">~$</span>
              <span className="terminal-success">
                System ready! Launching portfolio
                <div className="loading-dots">
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                  <div className="loading-dot"></div>
                </div>
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="progress-container">
        <div className="progress-label">
          <span>Loading Components</span>
          <span>{Math.round(progress)}%</span>
        </div>
        <div className="progress-bar glow-blue">
          <div 
            className="progress-fill" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;