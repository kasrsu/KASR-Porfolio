"use client";

import React, { useEffect, useState } from "react";
import "./preloader.css";

interface PreloaderProps {
  onLoadComplete: () => void;
  minLoadTime?: number;
}

interface TerminalLine {
  id: number;
  text: string;
  type: 'loading' | 'success' | 'error' | 'info';
  delay: number;
}

const Preloader: React.FC<PreloaderProps> = ({ onLoadComplete, minLoadTime = 3000 }) => {
  const [progress, setProgress] = useState(0);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const terminalLines: TerminalLine[] = [
    { id: 1, text: "Initializing portfolio systems...", type: 'loading', delay: 300 },
    { id: 2, text: "Loading React components... ✓", type: 'success', delay: 600 },
    { id: 3, text: "Compiling TypeScript modules... ✓", type: 'success', delay: 900 },
    { id: 4, text: "Establishing neural networks... ✓", type: 'success', delay: 1200 },
    { id: 5, text: "Optimizing performance algorithms... ✓", type: 'success', delay: 1500 },
    { id: 6, text: "Loading AI components... ✓", type: 'success', delay: 1800 },
    { id: 7, text: "Fetching data science modules... ✓", type: 'success', delay: 2100 },
    { id: 8, text: "Portfolio ready! Launching interface... 🚀", type: 'info', delay: 2400 }
  ];

  useEffect(() => {
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsComplete(true);
          setTimeout(onLoadComplete, 800);
          return 100;
        }
        return prev + (100 / (minLoadTime / 50));
      });
    }, 50);

    // Terminal lines animation
    const lineInterval = setInterval(() => {
      setCurrentLineIndex((prev) => {
        if (prev < terminalLines.length - 1) {
          return prev + 1;
        }
        clearInterval(lineInterval);
        return prev;
      });
    }, 300);

    return () => {
      clearInterval(progressInterval);
      clearInterval(lineInterval);
    };
  }, [onLoadComplete, minLoadTime, terminalLines.length]);

  return (
    <div className={`preloader ${isComplete ? 'fade-out' : ''}`}>
      {/* Matrix rain effect */}
      <div className="matrix-rain">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="matrix-column"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          >
            {Array.from({ length: 10 }).map((_, j) => (
              <span key={j} className="matrix-char">
                {String.fromCharCode(0x30A0 + Math.random() * 96)}
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* Terminal window */}
      <div className="terminal-window">
        <div className="terminal-header">
          <div className="terminal-controls">
            <div className="control-dot red"></div>
            <div className="control-dot yellow"></div>
            <div className="control-dot green"></div>
          </div>
          <div className="terminal-title">portfolio@system:~$</div>
        </div>
        
        <div className="terminal-body">
          {terminalLines.slice(0, currentLineIndex + 1).map((line, index) => (
            <div key={line.id} className={`terminal-line ${line.type}`}>
              <span className="prompt">$</span>
              <span className="command">{line.text}</span>
              {index === currentLineIndex && !isComplete && (
                <span className="cursor">|</span>
              )}
            </div>
          ))}
          
          {/* Progress bar in terminal */}
          <div className="terminal-progress">
            <div className="progress-label">
              Progress: [{Math.round(progress)}%]
            </div>
            <div className="progress-container">
              <div className="progress-fill" style={{ width: `${progress}%` }}>
                <div className="progress-glow"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating particles */}
      <div className="particles-container">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>

      {/* Scan lines effect */}
      <div className="scan-lines"></div>
    </div>
  );
};

export default Preloader;