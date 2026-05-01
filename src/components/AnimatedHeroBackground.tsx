import React, { useEffect, useRef, memo } from 'react';
import { motion } from 'framer-motion';

const AnimatedHeroBackground = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number>();

  interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    radius: number;
    opacity: number;
    color: string;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 15000);
      
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          radius: Math.random() * 1.5 + 0.5,
          opacity: Math.random() * 0.5 + 0.2,
          color: Math.random() > 0.5 ? 'rgba(94, 210, 156, ' : 'rgba(28, 130, 227, ',
        });
      }
    };
    initParticles();

    // Animation loop
    const animate = () => {
      // Clear canvas with fade effect
      ctx.fillStyle = 'rgba(11, 19, 43, 0.02)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles
      particlesRef.current.forEach((particle) => {
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.opacity += (Math.random() - 0.5) * 0.02;
        particle.opacity = Math.max(0.1, Math.min(0.6, particle.opacity));

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Draw particle
        ctx.fillStyle = particle.color + particle.opacity + ')';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();

        // Draw connecting lines
        particlesRef.current.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(94, 210, 156, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();
          }
        });
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      {/* Canvas for particle system */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Animated Gradient Orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[120px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(94, 210, 156, 0.25) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -80, 60, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full blur-[100px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(28, 130, 227, 0.2) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [0, -120, 80, 0],
          y: [0, 100, -70, 0],
          scale: [1, 0.95, 1.15, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      <motion.div
        className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full blur-[90px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(50, 224, 196, 0.15) 0%, transparent 70%)',
          mixBlendMode: 'screen',
        }}
        animate={{
          x: [0, 60, -100, 0],
          y: [0, -60, 80, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 4,
        }}
      />

      {/* Animated Grid Overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(50, 224, 196, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(50, 224, 196, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
          maskImage: 'linear-gradient(to bottom, black 0%, transparent 100%)',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '80px 80px'],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* Radial Gradient Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(11, 19, 43, 0.3) 100%)',
        }}
      />
    </>
  );
});

AnimatedHeroBackground.displayName = 'AnimatedHeroBackground';

export default AnimatedHeroBackground;
