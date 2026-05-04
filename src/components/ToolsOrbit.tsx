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
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
      <style>{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }
        
        @keyframes gentle-pulse {
          0%, 100% { opacity: 0.4; }
          50% { opacity: 0.7; }
        }
        
        .subtle-float {
          animation: subtle-float 4s ease-in-out infinite;
        }
        
        .gentle-pulse {
          animation: gentle-pulse 3s ease-in-out infinite;
        }
      `}</style>

      {/* Subtle Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-gradient-to-r from-accent/5 via-highlight/5 to-accent/2 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.05, 1],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-[120rem] mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="flex items-center justify-center gap-3 md:gap-4 mb-4">
            <motion.div
              className="w-6 md:w-8 h-[1px] bg-highlight"
              animate={{ scaleX: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            <span className="font-mono text-xs md:text-sm text-highlight uppercase tracking-widest">Integrated Ecosystem</span>
            <motion.div
              className="w-6 md:w-8 h-[1px] bg-highlight"
              animate={{ scaleX: [0.6, 1, 0.6] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
            />
          </div>
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold uppercase mb-3">
            Tools & Platforms
          </h2>
          <p className="font-paragraph text-foreground/60 text-sm md:text-base max-w-2xl mx-auto">
            Seamlessly integrated with industry-leading automation and AI platforms
          </p>
        </motion.div>

        {/* Main Container - Responsive Grid Layout */}
        <div className="flex items-center justify-center min-h-[350px] md:min-h-[450px]">
          <div
            ref={containerRef}
            className="relative w-full max-w-[350px] md:max-w-[500px] aspect-square"
          >
            {/* Grid Layout for Mobile, Circular for Desktop */}
            {isMobile ? (
              // Mobile: 2x4 Grid
              <div className="grid grid-cols-2 gap-4 w-full h-full place-items-center">
                {tools.map((tool, index) => (
                  <motion.div
                    key={tool.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    onMouseEnter={() => setHoveredId(tool.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    className="w-full"
                  >
                    <motion.div
                      animate={{
                        y: hoveredId === tool.id ? -6 : 0,
                      }}
                      transition={{ duration: 0.3 }}
                      className="flex flex-col items-center gap-2"
                    >
                      {/* Icon Container */}
                      <motion.div
                        className="relative w-12 h-12 md:w-14 md:h-14 rounded-lg bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md border flex items-center justify-center overflow-hidden"
                        style={{
                          borderColor: tool.color,
                        }}
                        animate={{
                          scale: hoveredId === tool.id ? 1.15 : 1,
                          borderColor: hoveredId === tool.id ? tool.color : `${tool.color}40`,
                          boxShadow: hoveredId === tool.id 
                            ? `0 0 20px ${tool.color}40, inset 0 0 10px ${tool.color}10`
                            : `0 0 8px ${tool.color}10`,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{
                            scale: hoveredId === tool.id ? 1.1 : 1,
                            rotate: hoveredId === tool.id ? 10 : 0,
                          }}
                          transition={{ duration: 0.3 }}
                          className="relative z-10"
                        >
                          <tool.icon
                            className="w-6 h-6 md:w-7 md:h-7 transition-colors duration-300"
                            style={{ color: tool.color }}
                          />
                        </motion.div>
                      </motion.div>

                      {/* Tooltip */}
                      <motion.div
                        animate={{
                          opacity: hoveredId === tool.id ? 1 : 0,
                          scale: hoveredId === tool.id ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.2 }}
                        className="text-xs font-mono text-foreground/70 text-center whitespace-nowrap"
                      >
                        {tool.name}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            ) : (
              // Desktop: Circular Layout
              <>
                {/* Subtle Rings */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 500">
                  <motion.circle
                    cx="250"
                    cy="250"
                    r="160"
                    fill="none"
                    stroke="rgba(50, 224, 196, 0.06)"
                    strokeWidth="1"
                    animate={{ strokeDashoffset: [0, -30] }}
                    transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    strokeDasharray="6,3"
                  />
                  <motion.circle
                    cx="250"
                    cy="250"
                    r="100"
                    fill="none"
                    stroke="rgba(28, 130, 227, 0.04)"
                    strokeWidth="1"
                    animate={{ strokeDashoffset: [0, 30] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                    strokeDasharray="6,3"
                  />
                </svg>

                {/* Central Core */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={{
                    scale: [1, 1.05, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-highlight/30 to-accent/30 flex items-center justify-center border border-highlight/30">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-7 h-7 text-highlight/60" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Orbiting Icons */}
                {tools.map((tool, index) => {
                  const angle = (360 / tools.length) * index * (Math.PI / 180);
                  const radius = 130;
                  const x = Math.cos(angle) * radius;
                  const y = Math.sin(angle) * radius;
                  const isHovered = hoveredId === tool.id;

                  return (
                    <motion.div
                      key={tool.id}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      animate={{
                        x: isHovered ? x * 1.15 : x,
                        y: isHovered ? y * 1.15 : y,
                      }}
                      transition={{
                        x: { type: 'spring', stiffness: 150, damping: 20 },
                        y: { type: 'spring', stiffness: 150, damping: 20 },
                      }}
                      onMouseEnter={() => setHoveredId(tool.id)}
                      onMouseLeave={() => setHoveredId(null)}
                      className="cursor-pointer"
                    >
                      {/* Icon Container */}
                      <motion.div
                        className="relative w-14 h-14 rounded-lg bg-gradient-to-br from-background/85 to-background/65 backdrop-blur-md border flex items-center justify-center overflow-hidden"
                        style={{
                          borderColor: tool.color,
                        }}
                        animate={{
                          scale: isHovered ? 1.25 : 1,
                          borderColor: isHovered ? tool.color : `${tool.color}40`,
                          boxShadow: isHovered
                            ? `0 0 20px ${tool.color}50, inset 0 0 10px ${tool.color}15`
                            : `0 0 8px ${tool.color}15`,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{
                            scale: isHovered ? 1.15 : 1,
                            rotate: isHovered ? 15 : 0,
                          }}
                          transition={{ duration: 0.3 }}
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
                        className="absolute top-full mt-3 left-1/2 -translate-x-1/2 whitespace-nowrap"
                        animate={{
                          opacity: isHovered ? 1 : 0,
                          y: isHovered ? 0 : -8,
                          scale: isHovered ? 1 : 0.8,
                        }}
                        transition={{ duration: 0.2 }}
                        pointerEvents="none"
                      >
                        <div className="px-2 py-1 bg-background/90 backdrop-blur-lg border border-foreground/20 rounded text-xs font-mono text-foreground/80 whitespace-nowrap">
                          {tool.name}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </>
            )}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="font-paragraph text-foreground/60 text-xs md:text-sm mb-3">
            {isMobile ? 'Tap to explore integrations' : 'Hover over icons to explore integrations'}
          </p>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            <Rocket className="w-4 h-4 md:w-5 md:h-5 text-highlight/70" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
