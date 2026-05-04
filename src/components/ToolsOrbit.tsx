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
  const [screenSize, setScreenSize] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) setScreenSize('mobile');
      else if (width < 1024) setScreenSize('tablet');
      else setScreenSize('desktop');
    };
    
    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  return (
    <section className="relative w-full py-16 md:py-24 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-background via-background/80 to-background">
      <style>{`
        @keyframes orbit-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes orbit-rotate-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .orbit-container {
          animation: orbit-rotate 40s linear infinite;
        }
        
        .orbit-container-reverse {
          animation: orbit-rotate-reverse 50s linear infinite;
        }
        
        .float-item {
          animation: float-up-down 3s ease-in-out infinite;
        }
        
        .pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] md:w-[500px] lg:w-[700px] h-[300px] md:h-[500px] lg:h-[700px] bg-gradient-to-r from-accent/8 via-highlight/8 to-accent/5 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
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

        {/* Main Container - Responsive Layouts */}
        <div className="flex items-center justify-center min-h-[300px] sm:min-h-[350px] md:min-h-[450px] lg:min-h-[550px]">
          <div
            ref={containerRef}
            className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[500px] lg:max-w-[650px] aspect-square"
          >
            {/* Mobile: Scrolling Horizontal Stack */}
            {screenSize === 'mobile' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Horizontal scrolling animation */}
                  <motion.div
                    className="flex gap-4 absolute left-0 top-1/2 -translate-y-1/2 w-max"
                    animate={{ x: [0, -1000, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                  >
                    {[...tools, ...tools].map((tool, index) => (
                      <motion.div
                        key={`${tool.id}-${index}`}
                        className="flex-shrink-0 w-20 h-20 flex items-center justify-center"
                        whileHover={{ scale: 1.1 }}
                      >
                        <motion.div
                          className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md border flex items-center justify-center overflow-hidden"
                          style={{ borderColor: tool.color }}
                          animate={{
                            boxShadow: `0 0 12px ${tool.color}20`,
                          }}
                          whileHover={{
                            scale: 1.15,
                            boxShadow: `0 0 24px ${tool.color}50, inset 0 0 10px ${tool.color}15`,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                            className="relative z-10"
                          >
                            <tool.icon
                              className="w-7 h-7"
                              style={{ color: tool.color }}
                            />
                          </motion.div>
                        </motion.div>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            )}

            {/* Tablet: Rotating Grid */}
            {screenSize === 'tablet' && (
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  className="orbit-container-reverse grid grid-cols-3 gap-6 w-full h-full place-items-center"
                  style={{ perspective: 1000 }}
                >
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      className="float-item"
                      style={{ animationDelay: `${index * 0.15}s` }}
                      onMouseEnter={() => setHoveredId(tool.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <motion.div
                        className="relative w-14 h-14 rounded-lg bg-gradient-to-br from-background/80 to-background/60 backdrop-blur-md border flex items-center justify-center overflow-hidden cursor-pointer"
                        style={{ borderColor: tool.color }}
                        animate={{
                          scale: hoveredId === tool.id ? 1.2 : 1,
                          boxShadow: hoveredId === tool.id
                            ? `0 0 24px ${tool.color}50, inset 0 0 10px ${tool.color}15`
                            : `0 0 12px ${tool.color}20`,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                          className="relative z-10"
                        >
                          <tool.icon
                            className="w-6 h-6"
                            style={{ color: tool.color }}
                          />
                        </motion.div>
                      </motion.div>
                      <motion.div
                        className="mt-2 text-xs font-mono text-foreground/60 text-center whitespace-nowrap"
                        animate={{ opacity: hoveredId === tool.id ? 1 : 0.5 }}
                      >
                        {tool.name}
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Desktop: Orbital Animation */}
            {screenSize === 'desktop' && (
              <>
                {/* Animated Orbital Rings */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 600">
                  {/* Outer rotating ring */}
                  <motion.circle
                    cx="300"
                    cy="300"
                    r="200"
                    fill="none"
                    stroke="rgba(50, 224, 196, 0.08)"
                    strokeWidth="1.5"
                    animate={{ strokeDashoffset: [0, -50] }}
                    transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    strokeDasharray="10,5"
                  />
                  {/* Middle rotating ring */}
                  <motion.circle
                    cx="300"
                    cy="300"
                    r="140"
                    fill="none"
                    stroke="rgba(28, 130, 227, 0.06)"
                    strokeWidth="1"
                    animate={{ strokeDashoffset: [0, 50] }}
                    transition={{ duration: 50, repeat: Infinity, ease: 'linear' }}
                    strokeDasharray="10,5"
                  />
                  {/* Inner rotating ring */}
                  <motion.circle
                    cx="300"
                    cy="300"
                    r="80"
                    fill="none"
                    stroke="rgba(50, 224, 196, 0.04)"
                    strokeWidth="1"
                    animate={{ strokeDashoffset: [0, -30] }}
                    transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
                    strokeDasharray="8,4"
                  />
                </svg>

                {/* Central Pulsing Core */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-highlight/40 to-accent/40 flex items-center justify-center border border-highlight/40 shadow-lg"
                    style={{
                      boxShadow: '0 0 30px rgba(50, 224, 196, 0.3), inset 0 0 20px rgba(50, 224, 196, 0.1)'
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-8 h-8 text-highlight/70" />
                    </motion.div>
                  </div>
                </motion.div>

                {/* Orbiting Icons - Continuous Rotation */}
                <motion.div
                  className="orbit-container absolute inset-0 w-full h-full"
                  style={{ transformOrigin: 'center' }}
                >
                  {tools.map((tool, index) => {
                    const angle = (360 / tools.length) * index * (Math.PI / 180);
                    const radius = 170;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;

                    return (
                      <motion.div
                        key={tool.id}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                        style={{
                          x: x,
                          y: y,
                        }}
                        onMouseEnter={() => setHoveredId(tool.id)}
                        onMouseLeave={() => setHoveredId(null)}
                      >
                        {/* Connection Line */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[170px] h-[1px] origin-left"
                          style={{
                            background: `linear-gradient(90deg, ${tool.color}30, transparent)`,
                            transform: `rotate(${angle * (180 / Math.PI)}deg) translateX(0)`,
                          }}
                        />

                        {/* Icon Container */}
                        <motion.div
                          className="relative w-16 h-16 rounded-lg bg-gradient-to-br from-background/85 to-background/65 backdrop-blur-md border flex items-center justify-center overflow-hidden cursor-pointer"
                          style={{
                            borderColor: tool.color,
                          }}
                          animate={{
                            scale: hoveredId === tool.id ? 1.3 : 1,
                            borderColor: hoveredId === tool.id ? tool.color : `${tool.color}50`,
                            boxShadow: hoveredId === tool.id
                              ? `0 0 30px ${tool.color}60, inset 0 0 15px ${tool.color}20`
                              : `0 0 15px ${tool.color}25`,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
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
                          className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap"
                          animate={{
                            opacity: hoveredId === tool.id ? 1 : 0,
                            y: hoveredId === tool.id ? 0 : -8,
                            scale: hoveredId === tool.id ? 1 : 0.8,
                          }}
                          transition={{ duration: 0.2 }}
                          pointerEvents="none"
                        >
                          <div className="px-3 py-1.5 bg-background/95 backdrop-blur-lg border border-foreground/20 rounded text-xs font-mono text-foreground/80 whitespace-nowrap shadow-lg">
                            {tool.name}
                          </div>
                        </motion.div>
                      </motion.div>
                    );
                  })}
                </motion.div>
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
            {screenSize === 'mobile' ? 'Continuously rotating ecosystem' : screenSize === 'tablet' ? 'Animated grid of integrations' : 'Hover over icons to explore integrations'}
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
