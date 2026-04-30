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
  const [clickedId, setClickedId] = useState<string | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / 50;
        const y = (e.clientY - rect.top - rect.height / 2) / 50;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleIconClick = (id: string) => {
    setClickedId(id);
    setTimeout(() => setClickedId(null), 600);
  };

  const orbitRadius = 200;
  const angleSlice = (360 / tools.length) * (Math.PI / 180);

  return (
    <section className="relative w-full py-32 px-6 overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-accent/10 via-highlight/10 to-transparent rounded-full blur-3xl opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-b from-highlight/5 to-transparent rounded-full blur-2xl opacity-20" />
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
            <div className="w-12 h-[1px] bg-highlight" />
            <span className="font-mono text-sm text-highlight uppercase tracking-widest">Integrated Ecosystem</span>
            <div className="w-12 h-[1px] bg-highlight" />
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-4">
            Tools & Platforms
          </h2>
          <p className="font-paragraph text-foreground/60 text-lg max-w-2xl mx-auto">
            Seamlessly integrated with industry-leading automation and AI platforms
          </p>
        </motion.div>

        {/* Orbit Container */}
        <div className="flex items-center justify-center min-h-[600px]">
          <motion.div
            ref={containerRef}
            className="relative w-full max-w-[600px] aspect-square"
            style={{
              perspective: '1000px',
            }}
            animate={{
              rotateX: mousePosition.y * 0.5,
              rotateY: mousePosition.x * 0.5,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 30 }}
          >
            {/* Central Core */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              animate={{
                scale: [1, 1.1, 1],
                boxShadow: [
                  '0 0 20px rgba(50, 224, 196, 0.5)',
                  '0 0 40px rgba(50, 224, 196, 0.8)',
                  '0 0 20px rgba(50, 224, 196, 0.5)',
                ],
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-highlight to-accent flex items-center justify-center border-2 border-highlight/50 shadow-2xl">
                <Sparkles className="w-12 h-12 text-primary animate-pulse" />
              </div>
            </motion.div>

            {/* Orbital Path (Visual Guide) */}
            <svg
              className="absolute inset-0 w-full h-full opacity-20"
              viewBox="0 0 600 600"
            >
              <circle
                cx="300"
                cy="300"
                r={orbitRadius}
                fill="none"
                stroke="rgba(50, 224, 196, 0.2)"
                strokeWidth="1"
                strokeDasharray="5,5"
              />
            </svg>

            {/* Orbiting Icons */}
            {tools.map((tool, index) => {
              const angle = angleSlice * index;
              const x = Math.cos(angle) * orbitRadius;
              const y = Math.sin(angle) * orbitRadius;
              const isHovered = hoveredId === tool.id;
              const isClicked = clickedId === tool.id;

              return (
                <motion.div
                  key={tool.id}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  animate={{
                    x: isHovered ? x * 1.2 : x,
                    y: isHovered ? y * 1.2 : y,
                    rotate: isHovered ? 0 : 360,
                  }}
                  transition={{
                    rotate: {
                      duration: 20,
                      repeat: Infinity,
                      ease: 'linear',
                    },
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    y: { type: 'spring', stiffness: 300, damping: 30 },
                  }}
                  onMouseEnter={() => setHoveredId(tool.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => handleIconClick(tool.id)}
                  className="cursor-pointer"
                >
                  {/* Glow Effect */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    animate={{
                      boxShadow: isHovered
                        ? `0 0 30px ${tool.color}80, 0 0 60px ${tool.color}40`
                        : `0 0 10px ${tool.color}40`,
                      scale: isHovered ? 1.5 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Icon Container */}
                  <motion.div
                    className="relative w-16 h-16 rounded-full bg-background/80 backdrop-blur-md border-2 flex items-center justify-center transition-all duration-300"
                    style={{
                      borderColor: tool.color,
                    }}
                    animate={{
                      scale: isHovered ? 1.3 : isClicked ? 1.2 : 1,
                      borderColor: isHovered ? tool.color : `${tool.color}60`,
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  >
                    <motion.div
                      animate={{
                        scale: isClicked ? [1, 1.3, 1] : 1,
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      <tool.icon
                        className="w-8 h-8 transition-colors duration-300"
                        style={{ color: tool.color }}
                      />
                    </motion.div>
                  </motion.div>

                  {/* Tooltip */}
                  <motion.div
                    className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                    animate={{
                      opacity: isHovered ? 1 : 0,
                      y: isHovered ? 0 : -10,
                    }}
                    transition={{ duration: 0.2 }}
                    pointerEvents="none"
                  >
                    <div className="px-3 py-1.5 bg-background/90 backdrop-blur-md border border-foreground/20 rounded-full text-xs font-mono text-foreground whitespace-nowrap shadow-lg">
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
            Hover over icons to explore integrations • Click for more details
          </p>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block"
          >
            <Rocket className="w-6 h-6 text-highlight" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
