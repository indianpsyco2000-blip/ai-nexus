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
    <section className="relative w-full py-12 md:py-24 px-4 md:px-6 overflow-hidden bg-gradient-to-b from-background via-background/95 to-background">
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
          className="text-center mb-12 md:mb-16"
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
        <div className="flex items-center justify-center min-h-[280px] sm:min-h-[320px] md:min-h-[380px] lg:min-h-[500px]">
          <div
            ref={containerRef}
            className="relative w-full max-w-[280px] sm:max-w-[340px] md:max-w-[420px] lg:max-w-[580px] aspect-square"
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
                  className="grid grid-cols-3 gap-4 w-full h-full place-items-center"
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

            {/* Desktop: Horizontal Scrolling Grid */}
            {screenSize === 'desktop' && (
              <div className="w-full h-full flex items-center justify-center">
                <motion.div
                  className="grid grid-cols-4 gap-4 w-full h-full place-items-center"
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
                          className="relative w-24 h-24 rounded-2xl bg-gradient-to-br from-background/85 to-background/65 backdrop-blur-lg border-2 flex items-center justify-center overflow-hidden cursor-pointer shadow-lg"
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
                              className="w-10 h-10"
                              style={{ color: tool.color }}
                            />
                          </motion.div>
                        </motion.div>
                        <motion.div
                          className="mt-4 text-sm font-mono text-foreground/70 text-center"
                          animate={{ opacity: hoveredId === tool.id ? 1 : 0.6 }}
                        >
                          {tool.name}
                        </motion.div>
                        <motion.p
                          className="text-xs text-foreground/40 text-center mt-2 max-w-[100px]"
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
          </div>
        </div>

        {/* Enhanced Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mt-8 md:mt-12"
        >
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
