import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Zap, Brain, Cpu, Network, Database, Workflow, Sparkles, Rocket } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const tools: Tool[] = [
  { id: '1', name: 'GitHub', icon: Github, color: '#32E0C4' },
  { id: '2', name: 'n8n', icon: Workflow, color: '#1C82E3' },
  { id: '3', name: 'Make.com', icon: Zap, color: '#FFB800' },
  { id: '4', name: 'AI Agents', icon: Brain, color: '#8A2BE2' },
  { id: '5', name: 'Automation', icon: Cpu, color: '#32E0C4' },
  { id: '6', name: 'Integration', icon: Network, color: '#1C82E3' },
  { id: '7', name: 'Data Flow', icon: Database, color: '#FF6B6B' },
  { id: '8', name: 'API', icon: Code2, color: '#4ECDC4' },
];

export default function ToolsOrbit() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 100;
        const y = (e.clientY - rect.top - rect.height / 2) / 100;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(prev => (prev + 0.5) % 360);
    }, 50);
    return () => clearInterval(interval);
  }, []);

  const angleSlice = (360 / tools.length) * (Math.PI / 180);

  return (
    <section className="relative w-full py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
      <style>{`
        @keyframes float-pulse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes glow-pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.6; }
        }
        
        .float-animation {
          animation: float-pulse 3s ease-in-out infinite;
        }
        
        .glow-pulse-animation {
          animation: glow-pulse 2s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-accent/15 via-highlight/15 to-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-b from-highlight/10 to-transparent rounded-full blur-2xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.3, 0.15],
          }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="max-w-[120rem] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-4 mb-6">
            <motion.div
              className="w-12 h-[1px] bg-highlight"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-sm text-highlight uppercase tracking-widest">Integrated Ecosystem</span>
            <motion.div
              className="w-12 h-[1px] bg-highlight"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-4">
            Tools & Platforms
          </h2>
          <p className="font-paragraph text-foreground/60 text-lg max-w-2xl mx-auto">
            Seamlessly integrated with industry-leading automation and AI platforms
          </p>
        </motion.div>

        {/* Main Container */}
        <div className="flex items-center justify-center min-h-[700px]">
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-[700px] aspect-square"
            style={{
              perspective: '1200px',
            }}
            animate={{
              rotateX: mousePosition.y * 0.3,
              rotateY: mousePosition.x * 0.3,
            }}
            transition={{ type: 'spring', stiffness: 80, damping: 25 }}
          >
            {/* Animated Rings */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 700">
              {/* Outer Ring */}
              <motion.circle
                cx="350"
                cy="350"
                r="280"
                fill="none"
                stroke="rgba(50, 224, 196, 0.15)"
                strokeWidth="1"
                animate={{ strokeDashoffset: [0, -100] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                strokeDasharray="10,5"
              />
              {/* Middle Ring */}
              <motion.circle
                cx="350"
                cy="350"
                r="200"
                fill="none"
                stroke="rgba(28, 130, 227, 0.1)"
                strokeWidth="1"
                animate={{ strokeDashoffset: [0, 100] }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                strokeDasharray="10,5"
              />
              {/* Inner Ring */}
              <circle
                cx="350"
                cy="350"
                r="120"
                fill="none"
                stroke="rgba(50, 224, 196, 0.08)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Central Core - Enhanced */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                scale: [1, 1.15, 1],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-r from-highlight/30 to-accent/30 blur-xl" />
              </motion.div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-highlight to-accent flex items-center justify-center border-2 border-highlight/60">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-14 h-14 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            {/* Orbiting Icons - Fluid Motion */}
            {tools.map((tool, index) => {
              const angle = angleSlice * index + (rotation * Math.PI / 180);
              const radius = 240;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isHovered = hoveredId === tool.id;

              return (
                <motion.div
                  key={tool.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    x: isHovered ? x * 1.3 : x,
                    y: isHovered ? y * 1.3 : y,
                  }}
                  transition={{
                    x: { type: 'spring', stiffness: 200, damping: 25 },
                    y: { type: 'spring', stiffness: 200, damping: 25 },
                  }}
                  onMouseEnter={() => setHoveredId(tool.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer"
                >
                  {/* Connection Line to Center */}
                  {isHovered && (
                    <motion.svg
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                      width="500"
                      height="500"
                      viewBox="0 0 500 500"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <motion.line
                        x1="250"
                        y1="250"
                        x2={250 + x / 2}
                        y2={250 + y / 2}
                        stroke={tool.color}
                        strokeWidth="1.5"
                        opacity="0.4"
                        animate={{ strokeDashoffset: [0, -20] }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        strokeDasharray="5,5"
                      />
                    </motion.svg>
                  )}

                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: isHovered
                        ? `0 0 40px ${tool.color}90, 0 0 80px ${tool.color}50, inset 0 0 20px ${tool.color}30`
                        : `0 0 15px ${tool.color}40`,
                      scale: isHovered ? 1.8 : 1.2,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />

                  {/* Icon Container */}
                  <motion.div
                    className="relative w-20 h-20 rounded-full bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-lg border-2 flex items-center justify-center overflow-hidden"
                    style={{
                      borderColor: tool.color,
                    }}
                    animate={{
                      scale: isHovered ? 1.4 : 1,
                      borderColor: isHovered ? tool.color : `${tool.color}50`,
                      background: isHovered
                        ? `linear-gradient(135deg, ${tool.color}15, ${tool.color}05)`
                        : 'linear-gradient(135deg, rgba(11, 19, 43, 0.9), rgba(11, 19, 43, 0.7))',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    {/* Background Shimmer */}
                    {isHovered && (
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
                        animate={{ x: [-100, 100] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}

                    <motion.div
                      animate={{
                        scale: isHovered ? [1, 1.2, 1] : 1,
                        rotate: isHovered ? 360 : 0,
                      }}
                      transition={{
                        scale: { duration: 0.6, repeat: isHovered ? Infinity : 0 },
                        rotate: { duration: 0.8 },
                      }}
                      className="relative z-10"
                    >
                      <tool.icon
                        className="w-10 h-10 transition-colors duration-300"
                        style={{ color: tool.color }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Enhanced Tooltip */}
                  <motion.div
                    className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : -15,
                      scale: isHovered ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    pointerEvents="none"
                  >
                    <div className="px-4 py-2 bg-gradient-to-r from-background/95 to-background/85 backdrop-blur-lg border border-foreground/30 rounded-lg text-xs font-mono text-foreground whitespace-nowrap shadow-2xl">
                      {tool.name}
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-20"
        >
          <p className="font-paragraph text-foreground/60 text-lg mb-6">
            Hover over icons to explore integrations
          </p>
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            <Rocket className="w-6 h-6 text-highlight" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
