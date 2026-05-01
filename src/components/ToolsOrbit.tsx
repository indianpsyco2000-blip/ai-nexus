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
    <section className="relative w-full py-16 md:py-20 px-6 overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
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

      {/* Subtle Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-r from-accent/8 via-highlight/8 to-accent/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-[120rem] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <motion.div
              className="w-8 h-[1px] bg-highlight"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <span className="font-mono text-xs md:text-sm text-highlight uppercase tracking-widest">Integrated Ecosystem</span>
            <motion.div
              className="w-8 h-[1px] bg-highlight"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-3">
            Tools & Platforms
          </h2>
          <p className="font-paragraph text-foreground/60 text-sm md:text-base max-w-2xl mx-auto">
            Seamlessly integrated with industry-leading automation and AI platforms
          </p>
        </motion.div>

        {/* Main Container */}
        <div className="flex items-center justify-center min-h-[400px] md:min-h-[500px]">
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-[400px] md:max-w-[500px] aspect-square"
            style={{
              perspective: '1200px',
            }}
            animate={{
              rotateX: mousePosition.y * 0.2,
              rotateY: mousePosition.x * 0.2,
            }}
            transition={{ type: 'spring', stiffness: 80, damping: 25 }}
          >
            {/* Subtle Rings */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
              {/* Outer Ring */}
              <motion.circle
                cx="250"
                cy="250"
                r="180"
                fill="none"
                stroke="rgba(50, 224, 196, 0.08)"
                strokeWidth="1"
                animate={{ strokeDashoffset: [0, -50] }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                strokeDasharray="8,4"
              />
              {/* Middle Ring */}
              <motion.circle
                cx="250"
                cy="250"
                r="120"
                fill="none"
                stroke="rgba(28, 130, 227, 0.06)"
                strokeWidth="1"
                animate={{ strokeDashoffset: [0, 50] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                strokeDasharray="8,4"
              />
            </svg>

            {/* Central Core - Subtle */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                scale: [1, 1.08, 1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              >
                <div className="absolute inset-0 w-20 h-20 rounded-full bg-gradient-to-r from-highlight/15 to-accent/15 blur-lg" />
              </motion.div>
              <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-highlight/40 to-accent/40 flex items-center justify-center border border-highlight/40">
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-8 h-8 text-primary" />
                </motion.div>
              </div>
            </motion.div>

            {/* Orbiting Icons - Compact */}
            {tools.map((tool, index) => {
              const angle = angleSlice * index + (rotation * Math.PI / 180);
              const radius = 140;
              const x = Math.cos(angle) * radius;
              const y = Math.sin(angle) * radius;
              const isHovered = hoveredId === tool.id;

              return (
                <motion.div
                  key={tool.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    x: isHovered ? x * 1.2 : x,
                    y: isHovered ? y * 1.2 : y,
                  }}
                  transition={{
                    x: { type: 'spring', stiffness: 200, damping: 25 },
                    y: { type: 'spring', stiffness: 200, damping: 25 },
                  }}
                  onMouseEnter={() => setHoveredId(tool.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="cursor-pointer"
                >
                  {/* Outer Glow Ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: isHovered
                        ? `0 0 25px ${tool.color}70, 0 0 50px ${tool.color}30`
                        : `0 0 8px ${tool.color}20`,
                      scale: isHovered ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                  />

                  {/* Icon Container */}
                  <motion.div
                    className="relative w-14 h-14 rounded-full bg-gradient-to-br from-background/85 to-background/65 backdrop-blur-md border flex items-center justify-center overflow-hidden"
                    style={{
                      borderColor: tool.color,
                    }}
                    animate={{
                      scale: isHovered ? 1.3 : 1,
                      borderColor: isHovered ? tool.color : `${tool.color}40`,
                      background: isHovered
                        ? `linear-gradient(135deg, ${tool.color}10, ${tool.color}03)`
                        : 'linear-gradient(135deg, rgba(11, 19, 43, 0.85), rgba(11, 19, 43, 0.65))',
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  >
                    <motion.div
                      animate={{
                        scale: isHovered ? [1, 1.15, 1] : 1,
                        rotate: isHovered ? 360 : 0,
                      }}
                      transition={{
                        scale: { duration: 0.6, repeat: isHovered ? Infinity : 0 },
                        rotate: { duration: 0.8 },
                      }}
                      className="relative z-10"
                    >
                      <tool.icon
                        className="w-7 h-7 transition-colors duration-300"
                        style={{ color: tool.color }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : -10,
                      scale: isHovered ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    pointerEvents="none"
                  >
                    <div className="px-3 py-1 bg-gradient-to-r from-background/95 to-background/85 backdrop-blur-lg border border-foreground/20 rounded text-xs font-mono text-foreground whitespace-nowrap shadow-lg">
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
          className="text-center mt-8"
        >
          <p className="font-paragraph text-foreground/60 text-sm md:text-base mb-4">
            Hover over icons to explore integrations
          </p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            <Rocket className="w-5 h-5 text-highlight" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
