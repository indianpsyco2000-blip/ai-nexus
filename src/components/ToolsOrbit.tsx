import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, Code2, Zap, Brain, Cpu, Network, Database, Workflow, Sparkles, Rocket, ArrowRight } from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  description: string;
}

const tools: Tool[] = [
  { id: '1', name: 'GitHub', icon: Github, color: '#32E0C4', description: 'Version control & collaboration' },
  { id: '2', name: 'n8n', icon: Workflow, color: '#1C82E3', description: 'Workflow automation platform' },
  { id: '3', name: 'Make.com', icon: Zap, color: '#FFB800', description: 'Integration & automation' },
  { id: '4', name: 'AI Agents', icon: Brain, color: '#8A2BE2', description: 'Intelligent automation' },
  { id: '5', name: 'Automation', icon: Cpu, color: '#32E0C4', description: 'Process automation' },
  { id: '6', name: 'Integration', icon: Network, color: '#1C82E3', description: 'System integration' },
  { id: '7', name: 'Data Flow', icon: Database, color: '#FF6B6B', description: 'Data management' },
  { id: '8', name: 'API', icon: Code2, color: '#4ECDC4', description: 'API connectivity' },
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
    <section className="relative w-full py-20 md:py-40 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
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
          50% { transform: translateY(-12px); }
        }
        
        @keyframes pulse-ring {
          0% { 
            box-shadow: 0 0 0 0 rgba(50, 224, 196, 0.7);
          }
          70% {
            box-shadow: 0 0 0 20px rgba(50, 224, 196, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(50, 224, 196, 0);
          }
        }
        
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        
        .orbit-container {
          animation: orbit-rotate 50s linear infinite;
        }
        
        .orbit-container-reverse {
          animation: orbit-rotate-reverse 60s linear infinite;
        }
        
        .float-item {
          animation: float-up-down 4s ease-in-out infinite;
        }
        
        .pulse-ring {
          animation: pulse-ring 2s infinite;
        }
        
        .shimmer-bg {
          background-size: 1000px 100%;
          animation: shimmer 3s infinite;
        }
      `}</style>

      {/* Multi-layer Background Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Primary glow */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-[400px] md:w-[600px] lg:w-[800px] h-[400px] md:h-[600px] lg:h-[800px] bg-gradient-to-r from-accent/15 via-highlight/10 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.2, 0.35, 0.2],
            x: [0, 50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        {/* Secondary glow */}
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[550px] lg:w-[750px] h-[350px] md:h-[550px] lg:h-[750px] bg-gradient-to-l from-highlight/12 via-accent/8 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.15, 0.3, 0.15],
            x: [-50, 0, -50],
          }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        />
      </div>

      <div className="max-w-[120rem] mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16 md:mb-24"
        >
          <motion.div 
            className="flex items-center justify-center gap-4 md:gap-6 mb-6"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div
              className="h-[2px] bg-gradient-to-r from-transparent via-highlight to-transparent"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity }}
              style={{ width: '40px' }}
            />
            <span className="font-mono text-xs md:text-sm text-highlight uppercase tracking-widest font-semibold">Integrated Ecosystem</span>
            <motion.div
              className="h-[2px] bg-gradient-to-r from-transparent via-highlight to-transparent"
              animate={{ scaleX: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 0.3 }}
              style={{ width: '40px' }}
            />
          </motion.div>
          
          <motion.h2 
            className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-4 leading-tight tracking-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Tools & <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-highlight via-accent to-highlight"
              animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% 200%' }}
            >
              Platforms
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className="font-paragraph text-foreground/70 text-base md:text-lg max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Seamlessly integrated with industry-leading automation and AI platforms. Our ecosystem powers intelligent workflows that scale your business exponentially.
          </motion.p>
        </motion.div>

        {/* Main Container - Responsive Layouts */}
        <div className="flex items-center justify-center min-h-[320px] sm:min-h-[400px] md:min-h-[450px] lg:min-h-[650px]">
          <div
            ref={containerRef}
            className="relative w-full max-w-[320px] sm:max-w-[400px] md:max-w-[480px] lg:max-w-[700px] aspect-square"
          >
            {/* Mobile: Enhanced Carousel */}
            {screenSize === 'mobile' && (
              <div className="w-full h-full flex items-center justify-center">
                <div className="relative w-full h-full overflow-hidden">
                  <motion.div
                    className="flex gap-6 absolute left-0 top-1/2 -translate-y-1/2 w-max"
                    animate={{ x: [0, -1200, 0] }}
                    transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                  >
                    {[...tools, ...tools, ...tools].map((tool, index) => (
                      <motion.div
                        key={`${tool.id}-${index}`}
                        className="flex-shrink-0 w-24 h-24 flex flex-col items-center justify-center"
                        whileHover={{ scale: 1.15, y: -8 }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-lg border-2 flex items-center justify-center overflow-hidden shadow-lg"
                          style={{ borderColor: tool.color }}
                          animate={{
                            boxShadow: `0 0 20px ${tool.color}30, inset 0 0 15px ${tool.color}10`,
                          }}
                          whileHover={{
                            scale: 1.1,
                            boxShadow: `0 0 40px ${tool.color}60, inset 0 0 20px ${tool.color}20`,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            className="relative z-10"
                          >
                            <tool.icon
                              className="w-8 h-8"
                              style={{ color: tool.color }}
                            />
                          </motion.div>
                          <motion.div
                            className="absolute inset-0 rounded-2xl"
                            style={{ borderColor: tool.color }}
                            animate={{
                              boxShadow: `inset 0 0 20px ${tool.color}20`,
                            }}
                          />
                        </motion.div>
                        <motion.p 
                          className="text-xs font-mono text-foreground/60 text-center mt-3 whitespace-nowrap"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                        >
                          {tool.name}
                        </motion.p>
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>
            )}

            {/* Tablet: Dynamic Grid */}
            {screenSize === 'tablet' && (
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  className="grid grid-cols-3 gap-8 w-full h-full place-items-center"
                  style={{ perspective: 1200 }}
                >
                  {tools.map((tool, index) => (
                    <motion.div
                      key={tool.id}
                      className="float-item"
                      style={{ animationDelay: `${index * 0.12}s` }}
                      onMouseEnter={() => setHoveredId(tool.id)}
                      onMouseLeave={() => setHoveredId(null)}
                    >
                      <motion.div
                        className="relative flex flex-col items-center"
                        animate={{
                          scale: hoveredId === tool.id ? 1.15 : 1,
                        }}
                        transition={{ duration: 0.3 }}
                      >
                        <motion.div
                          className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-background/85 to-background/65 backdrop-blur-lg border-2 flex items-center justify-center overflow-hidden cursor-pointer shadow-lg"
                          style={{ borderColor: tool.color }}
                          animate={{
                            boxShadow: hoveredId === tool.id
                              ? `0 0 35px ${tool.color}60, inset 0 0 15px ${tool.color}20`
                              : `0 0 15px ${tool.color}25`,
                          }}
                          transition={{ duration: 0.3 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
                            className="relative z-10"
                          >
                            <tool.icon
                              className="w-7 h-7"
                              style={{ color: tool.color }}
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          className="mt-3 text-xs font-mono text-foreground/70 text-center"
                          animate={{ opacity: hoveredId === tool.id ? 1 : 0.6 }}
                        >
                          {tool.name}
                        </motion.div>
                        <motion.p
                          className="text-[10px] text-foreground/40 text-center mt-1 max-w-[80px]"
                          animate={{ opacity: hoveredId === tool.id ? 1 : 0 }}
                        >
                          {tool.description}
                        </motion.p>
                      </motion.div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            )}

            {/* Desktop: Premium Orbital Animation */}
            {screenSize === 'desktop' && (
              <>
                {/* Animated Orbital Rings with Enhanced Visuals */}
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 700">
                  {/* Outer ring - fast rotation */}
                  <motion.circle
                    cx="350"
                    cy="350"
                    r="240"
                    fill="none"
                    stroke="rgba(50, 224, 196, 0.12)"
                    strokeWidth="2"
                    animate={{ strokeDashoffset: [0, -60] }}
                    transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
                    strokeDasharray="15,8"
                  />
                  
                  {/* Middle ring - medium rotation */}
                  <motion.circle
                    cx="350"
                    cy="350"
                    r="170"
                    fill="none"
                    stroke="rgba(28, 130, 227, 0.08)"
                    strokeWidth="1.5"
                    animate={{ strokeDashoffset: [0, 50] }}
                    transition={{ duration: 55, repeat: Infinity, ease: 'linear' }}
                    strokeDasharray="12,6"
                  />
                  
                  {/* Inner ring - slow rotation */}
                  <motion.circle
                    cx="350"
                    cy="350"
                    r="100"
                    fill="none"
                    stroke="rgba(50, 224, 196, 0.06)"
                    strokeWidth="1"
                    animate={{ strokeDashoffset: [0, -40] }}
                    transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                    strokeDasharray="10,5"
                  />
                  
                  {/* Decorative cross lines */}
                  <line x1="350" y1="110" x2="350" y2="590" stroke="rgba(50, 224, 196, 0.04)" strokeWidth="1" />
                  <line x1="110" y1="350" x2="590" y2="350" stroke="rgba(50, 224, 196, 0.04)" strokeWidth="1" />
                </svg>

                {/* Central Pulsing Core - Enhanced */}
                <motion.div
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  animate={{
                    scale: [1, 1.12, 1],
                  }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <motion.div 
                    className="relative w-28 h-28 rounded-full bg-gradient-to-br from-highlight/50 to-accent/40 flex items-center justify-center border-2 border-highlight/60 shadow-2xl pulse-ring"
                    style={{
                      boxShadow: '0 0 40px rgba(50, 224, 196, 0.4), inset 0 0 30px rgba(50, 224, 196, 0.15)',
                    }}
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                    >
                      <Sparkles className="w-12 h-12 text-highlight" />
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Orbiting Icons - Premium Animation */}
                <motion.div
                  className="orbit-container absolute inset-0 w-full h-full"
                  style={{ transformOrigin: 'center' }}
                >
                  {tools.map((tool, index) => {
                    const angle = (360 / tools.length) * index * (Math.PI / 180);
                    const radius = 210;
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
                        {/* Animated Connection Line */}
                        <motion.div
                          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[2px] origin-left"
                          style={{
                            width: radius,
                            background: `linear-gradient(90deg, ${tool.color}50, ${tool.color}10, transparent)`,
                            transform: `rotate(${angle * (180 / Math.PI)}deg) translateX(0)`,
                          }}
                          animate={{
                            opacity: [0.3, 0.6, 0.3],
                          }}
                          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        />

                        {/* Premium Icon Container */}
                        <motion.div
                          className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-background/90 to-background/70 backdrop-blur-xl border-2 flex items-center justify-center overflow-hidden cursor-pointer shadow-2xl"
                          style={{
                            borderColor: tool.color,
                          }}
                          animate={{
                            scale: hoveredId === tool.id ? 1.35 : 1,
                            borderColor: hoveredId === tool.id ? tool.color : `${tool.color}60`,
                            boxShadow: hoveredId === tool.id
                              ? `0 0 50px ${tool.color}70, inset 0 0 25px ${tool.color}25, 0 20px 40px rgba(0,0,0,0.3)`
                              : `0 0 20px ${tool.color}30, inset 0 0 10px ${tool.color}10`,
                          }}
                          transition={{ duration: 0.35, ease: 'easeOut' }}
                        >
                          {/* Background gradient animation */}
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent opacity-0 group-hover:opacity-100"
                            animate={{
                              background: hoveredId === tool.id 
                                ? `linear-gradient(135deg, ${tool.color}20, transparent)`
                                : 'linear-gradient(135deg, transparent, transparent)',
                            }}
                            transition={{ duration: 0.3 }}
                          />
                          
                          <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
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
                          className="absolute top-full mt-5 left-1/2 -translate-x-1/2 whitespace-nowrap"
                          animate={{
                            opacity: hoveredId === tool.id ? 1 : 0,
                            y: hoveredId === tool.id ? 0 : -12,
                            scale: hoveredId === tool.id ? 1 : 0.8,
                          }}
                          transition={{ duration: 0.25 }}
                          pointerEvents="none"
                        >
                          <div className="px-4 py-2.5 bg-background/98 backdrop-blur-xl border border-foreground/20 rounded-lg text-xs font-mono text-foreground/90 whitespace-nowrap shadow-2xl">
                            <div className="font-semibold text-highlight mb-1">{tool.name}</div>
                            <div className="text-foreground/60 text-[10px]">{tool.description}</div>
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

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-12 md:mt-20"
        >
          <motion.p 
            className="font-paragraph text-foreground/70 text-sm md:text-base mb-6 max-w-2xl mx-auto"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {screenSize === 'mobile' ? '↻ Swipe through our integrated ecosystem' : screenSize === 'tablet' ? '✦ Explore our dynamic platform grid' : '✦ Hover over icons to discover integrations'}
          </motion.p>
          
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-block"
          >
            <Rocket className="w-5 h-5 md:w-6 md:h-6 text-highlight/80" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
