import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes'; 

interface ParticleProps {
  density?: number; // Number of particles per 1000px²
  speed?: number; // Base movement speed
  color?: string; // Override particle color
}

const ParticlesBackground: React.FC<ParticleProps> = ({ 
  density = 50, 
  speed = 1,
  color 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Array<{
      x: number;
      y: number;
      directionX: number;
      directionY: number;
      size: number;
      color: string;
      opacity: number;
      speed: number;
    }> = [];

    const resizeCanvas = () => {
      if (!canvas) return;
      
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Recreate particles after resize
      initParticles();
    };

    // Determine appropriate particle color based on theme
    const getParticleColor = () => {
      if (color) return color;
      return theme === 'dark' ? 'rgba(168, 85, 247, 0.7)' : 'rgba(168, 85, 247, 0.4)';
    };

    const createParticle = (x: number, y: number) => {
      const size = Math.random() * 5 + 1;
      const opacity = Math.random() * 0.5 + 0.1;
      const directionX = (Math.random() * 2 - 1) * speed;
      const directionY = (Math.random() * 2 - 1) * speed;
      
      return {
        x,
        y,
        directionX,
        directionY,
        size,
        color: getParticleColor(),
        opacity,
        speed: Math.random() * speed + 0.2,
      };
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / (1000000 / density));
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        particles.push(createParticle(x, y));
      }
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      });

      // Draw connections between particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 100) {
            ctx.beginPath();
            ctx.strokeStyle = getParticleColor();
            ctx.globalAlpha = 0.2 * (1 - distance / 100);
            ctx.lineWidth = 0.5;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    };

    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        particles[i].x += particles[i].directionX * particles[i].speed;
        particles[i].y += particles[i].directionY * particles[i].speed;
        
        // Bounce off edges
        if (particles[i].x < 0 || particles[i].x > canvas.width) {
          particles[i].directionX = -particles[i].directionX;
        }
        if (particles[i].y < 0 || particles[i].y > canvas.height) {
          particles[i].directionY = -particles[i].directionY;
        }
      }
    };

    const animate = () => {
      updateParticles();
      drawParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    // Set up canvas and start animation
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, [density, speed, color, theme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default ParticlesBackground;
