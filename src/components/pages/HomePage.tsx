// HPI 1.7-G
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Brain, Zap, Code, ArrowRight, TrendingUp, Award, Cpu, Network, Database, ChevronRight, Terminal, Activity, Menu, X } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ToolsOrbit from '@/components/ToolsOrbit';
import { BaseCrudService } from '@/integrations';
import { Services, CaseStudies, Industries } from '@/entities';

export default function HomePage() {
  const [services, setServices] = useState<Services[]>([]);
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [industries, setIndustries] = useState<Industries[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [servicesResult, caseStudiesResult, industriesResult] = await Promise.all([
        BaseCrudService.getAll<Services>('services', {}, { limit: 4 }),
        BaseCrudService.getAll<CaseStudies>('casestudies', {}, { limit: 3 }),
        BaseCrudService.getAll<Industries>('industries', {}, { limit: 6 })
      ]);
      setServices(servicesResult.items);
      setCaseStudies(caseStudiesResult.items);
      setIndustries(industriesResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-accent/30 selection:text-highlight overflow-clip font-paragraph">
      <Header />
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Plus+Jakarta+Sans:wght@700&family=Instrument+Serif:ital@1&display=swap');

        .tech-grid {
          background-size: 50px 50px;
          background-image: 
            linear-gradient(to right, rgba(50, 224, 196, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(50, 224, 196, 0.08) 1px, transparent 1px);
          mask-image: linear-gradient(to bottom, black 40%, transparent 100%);
        }
        .glow-text {
          text-shadow: 0 0 30px rgba(50, 224, 196, 0.8), 0 0 60px rgba(28, 130, 227, 0.4);
        }
        .glass-panel {
          background: rgba(11, 19, 43, 0.7);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(50, 224, 196, 0.2);
        }
        .glass-panel:hover {
          border-color: rgba(50, 224, 196, 0.5);
          background: rgba(11, 19, 43, 0.8);
        }
        .clip-diagonal {
          clip-path: polygon(0 0, 100% 0, 100% 85%, 95% 100%, 0 100%);
        }
        .neon-glow {
          box-shadow: 0 0 20px rgba(50, 224, 196, 0.5), inset 0 0 20px rgba(50, 224, 196, 0.1);
        }
        .neon-glow:hover {
          box-shadow: 0 0 40px rgba(50, 224, 196, 0.8), inset 0 0 20px rgba(50, 224, 196, 0.2);
        }
        
        /* Liquid Glass Card Styles */
        .liquid-glass-card {
          background: rgba(255, 255, 255, 0.01);
          background-blend-mode: luminosity;
          backdrop-filter: blur(4px);
          -webkit-backdrop-filter: blur(4px);
          box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          position: relative;
        }
        
        .liquid-glass-card::before {
          content: '';
          position: absolute;
          inset: 0;
          padding: 1.4px;
          background: linear-gradient(180deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.2));
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          border-radius: 12px;
          pointer-events: none;
        }

        /* Vertical Grid Lines */
        .hero-grid-lines {
          position: absolute;
          width: 100%;
          height: 100%;
          pointer-events: none;
        }

        .grid-line {
          position: absolute;
          width: 1px;
          height: 100%;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Central Glow Ellipse */
        .central-glow {
          position: absolute;
          top: 15%;
          left: 50%;
          transform: translateX(-50%);
          width: 800px;
          height: 300px;
          background: radial-gradient(ellipse at center, rgba(94, 210, 156, 0.3), transparent 70%);
          filter: blur(25px);
          pointer-events: none;
        }
      `}</style>
      {/* HERO SECTION */}
      <section className="relative w-full min-h-screen md:min-h-[100vh] flex items-center justify-center overflow-hidden pt-20 md:pt-32 bg-background">
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 z-0"
          animate={{
            background: [
              'radial-gradient(ellipse at 20% 50%, rgba(94, 210, 156, 0.15) 0%, transparent 50%)',
              'radial-gradient(ellipse at 80% 50%, rgba(28, 130, 227, 0.12) 0%, transparent 50%)',
              'radial-gradient(ellipse at 50% 80%, rgba(94, 210, 156, 0.1) 0%, transparent 50%)',
              'radial-gradient(ellipse at 20% 50%, rgba(94, 210, 156, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 z-1 opacity-30">
          <div className="tech-grid w-full h-full" />
        </div>

        {/* Floating Accent Elements */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-highlight/5 to-accent/5 blur-3xl"
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -40, 40, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        />
        
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-l from-accent/5 to-highlight/5 blur-3xl"
          animate={{
            x: [0, -40, 40, 0],
            y: [0, 30, -30, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        />

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[120rem] mx-auto px-4 sm:px-6 flex flex-col items-center text-center"
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-4 md:mb-6"
          >
            <span className="font-sans font-bold text-xs md:text-sm tracking-widest text-[#5ed29c] uppercase">AI - Automation services</span>
          </motion.div>
          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold uppercase leading-tight tracking-tight mb-4 md:mb-6 text-foreground px-4"
          >
            Automate Your <br className="hidden sm:block" />Business<motion.span 
              className="text-[#5ed29c] inline-block"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >.</motion.span>
          </motion.h1>
          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-sans text-xs sm:text-sm md:text-base lg:text-lg text-foreground/70 max-w-[512px] mx-auto mb-8 md:mb-12 leading-relaxed px-4"
          >From AI Agents to workflow automations- we build tools that scale your growth.</motion.p>
        </motion.div>
      </section>
      {/* TOOLS ORBIT SECTION */}
      <ToolsOrbit />
      {/* WHAT WE DO - Static Architecture */}
      <section className="relative w-full py-32 px-6 border-t border-white/5">
        <div className="max-w-[120rem] mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
          >
            <div className="lg:col-span-4 lg:sticky lg:top-32">
              <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-highlight" />
                <span className="font-mono text-sm text-highlight uppercase tracking-widest">Core Protocols</span>
              </motion.div>
              <motion.h2 variants={itemVariants} className="font-heading text-4xl md:text-6xl font-bold uppercase leading-tight mb-6">
                System <br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-highlight">Capabilities</span>
              </motion.h2>
              <motion.p variants={itemVariants} className="text-foreground/60 text-lg leading-relaxed">
                We engineer intelligent systems designed to eliminate friction, accelerate processes, and unlock unprecedented operational efficiency.
              </motion.p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { icon: Cpu, title: 'AI Agents', desc: 'Autonomous digital entities capable of complex reasoning, learning, and task execution.', delay: 0 },
                { icon: Network, title: 'Workflow Automation', desc: 'Seamless integration of disparate systems to create frictionless operational pipelines.', delay: 0.1 },
                { icon: Database, title: 'Custom Architecture', desc: 'Bespoke software solutions engineered from the ground up for your specific data models.', delay: 0.2 },
                { icon: Zap, title: 'Performance Optimization', desc: 'Algorithmic refinement of existing processes to maximize throughput and minimize latency.', delay: 0.3 }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="group relative glass-panel p-8 clip-diagonal transition-all duration-500 hover:bg-white/[0.02] hover:border-highlight/50 neon-glow"
                >
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-highlight/50 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                  
                  <div className="w-14 h-14 rounded-lg bg-highlight/10 flex items-center justify-center mb-6 border border-highlight/30 group-hover:border-highlight/70 group-hover:bg-highlight/20 transition-colors duration-500 neon-glow">
                    <item.icon className="w-6 h-6 text-highlight group-hover:text-highlight transition-colors duration-500" />
                  </div>
                  
                  <h3 className="font-heading text-xl font-bold uppercase mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed font-light">{item.desc}</p>
                  
                  <div className="mt-6 flex items-center gap-2 text-xs font-mono text-highlight opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>Initialize</span>
                    <ArrowRight className="w-3 h-3" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
      {/* SERVICES OVERVIEW - Dynamic Data */}
      <section className="relative w-full py-32 px-6 bg-black/20">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[1px] bg-accent" />
                <span className="font-mono text-sm text-accent uppercase tracking-widest">Service Modules</span>
              </div>
              <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase">Deployed Solutions</h2>
            </div>
            <Link to="/services" className="group flex items-center gap-3 text-sm font-mono uppercase tracking-widest text-foreground/60 hover:text-highlight transition-colors">
              View All Modules
              <div className="w-8 h-8 rounded-full border border-foreground/20 flex items-center justify-center group-hover:border-highlight transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </Link>
          </div>

          <div className="relative min-h-[400px]">
            <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
              <div className="flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                <span className="font-mono text-xs text-accent uppercase tracking-widest animate-pulse">Fetching Data...</span>
              </div>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
              {services.map((service, idx) => (
                <motion.div
                  key={service._id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  className="group relative h-[450px] glass-panel overflow-hidden clip-diagonal"
                >
                  {service.serviceImage && (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={service.serviceImage}
                        alt={service.serviceName || 'Service'}
                        className="w-full h-full object-cover opacity-40 group-hover:opacity-60 group-hover:scale-110 transition-all duration-700"
                        width={600}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
                    </div>
                  )}
                  
                  <div className="relative z-10 h-full p-8 flex flex-col justify-end">
                    {service.category && (
                      <span className="absolute top-8 left-8 px-3 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-mono uppercase tracking-widest backdrop-blur-md">
                        {service.category}
                      </span>
                    )}
                    
                    <div className="transform translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                      <h3 className="font-heading text-2xl font-bold uppercase mb-4 leading-tight">{service.serviceName}</h3>
                      <p className="text-foreground/70 text-sm line-clamp-2 mb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {service.shortDescription}
                      </p>
                      <Link to="/services" className="inline-flex items-center gap-2 text-highlight font-mono text-xs uppercase tracking-widest">
                        Explore Module <ChevronRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      {/* INDUSTRIES - Sticky Scroll Narrative */}
      <section className="relative w-full py-32 px-6">
        <div className="max-w-[120rem] mx-auto">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Sticky Left Column */}
            <div className="w-full lg:w-1/3">
              <div className="sticky top-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-[1px] bg-highlight" />
                  <span className="font-mono text-sm text-highlight uppercase tracking-widest">Target Sectors</span>
                </div>
                <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6">
                  Industries <br/>We Serve
                </h2>
                <p className="text-foreground/60 text-lg mb-8">
                  Our AI and automation architectures are highly adaptable, providing transformative solutions across diverse operational landscapes.
                </p>
                <div className="hidden lg:block w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
              </div>
            </div>

            {/* Scrolling Right Column */}
            <div className="w-full lg:w-2/3 relative min-h-[400px]">
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
                <div className="w-8 h-8 border-2 border-highlight/20 border-t-highlight rounded-full animate-spin" />
              </div>

              <div className={`flex flex-col gap-8 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
                {industries.map((industry, idx) => (
                  <motion.div
                    key={industry._id}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                    className="group flex flex-col md:flex-row gap-8 glass-panel p-6 md:p-8 clip-diagonal hover:bg-white/[0.02] transition-colors"
                  >
                    {industry.industryImage && (
                      <div className="w-full md:w-1/3 h-48 md:h-auto relative overflow-hidden rounded-sm">
                        <Image
                          src={industry.industryImage}
                          alt={industry.industryName || 'Industry'}
                          className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                          width={400}
                        />
                        <div className="absolute inset-0 bg-accent/20 mix-blend-overlay group-hover:opacity-0 transition-opacity duration-500" />
                      </div>
                    )}
                    <div className="w-full md:w-2/3 flex flex-col justify-center">
                      <h3 className="font-heading text-2xl font-bold uppercase mb-4 text-highlight">{industry.industryName}</h3>
                      <p className="text-foreground/70 text-sm leading-relaxed mb-6">
                        {industry.shortSummary}
                      </p>
                      <Link to="/industries" className="mt-auto inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-foreground/50 hover:text-foreground transition-colors w-fit">
                        View Sector Data <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
      {/* CASE STUDIES - Horizontal Scroll / Parallax Cards */}
      <section className="relative w-full py-32 bg-black/40 border-y border-white/5 overflow-hidden">
        <div className="max-w-[120rem] mx-auto px-6 mb-16 text-center">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-8 h-[1px] bg-accent" />
            <span className="font-mono text-sm text-accent uppercase tracking-widest">Proof of Concept</span>
            <div className="w-8 h-[1px] bg-accent" />
          </div>
          <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase">Success Architecture</h2>
        </div>

        <div className="relative w-full max-w-[120rem] mx-auto px-6 min-h-[500px]">
           <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-500 ${isLoading ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`}>
              <span className="font-mono text-sm text-foreground/50 uppercase tracking-widest animate-pulse">Loading Case Files...</span>
            </div>

          <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
            {caseStudies.map((study, idx) => (
              <motion.div
                key={study._id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.2 }}
                className="group relative glass-panel p-8 flex flex-col h-full border-t-4 border-t-transparent hover:border-t-highlight transition-all duration-300"
              >
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                  <Terminal className="w-6 h-6 text-highlight" />
                </div>
                
                {study.industry && (
                  <span className="text-xs font-mono text-accent uppercase tracking-widest mb-4 block">
                    Sector: {study.industry}
                  </span>
                )}
                
                <h3 className="font-heading text-2xl font-bold uppercase mb-6 leading-tight">{study.title}</h3>
                
                <div className="space-y-4 mb-8 flex-grow">
                  <div>
                    <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest block mb-1">Problem Statement</span>
                    <p className="text-sm text-foreground/80 line-clamp-2">{study.problem}</p>
                  </div>
                  <div className="w-full h-[1px] bg-white/5" />
                  <div>
                    <span className="text-[10px] font-mono text-foreground/40 uppercase tracking-widest block mb-1">Implemented Solution</span>
                    <p className="text-sm text-foreground/80 line-clamp-2">{study.solution}</p>
                  </div>
                </div>

                {study.roiMetrics && (
                  <div className="mt-auto bg-highlight/10 border border-highlight/20 p-4 flex items-center gap-4">
                    <TrendingUp className="w-8 h-8 text-highlight" />
                    <div>
                      <span className="text-[10px] font-mono text-highlight uppercase tracking-widest block mb-1">ROI Metric</span>
                      <span className="font-heading font-bold text-lg">{study.roiMetrics}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA BANNER - Immersive Glow */}
      <section className="relative w-full py-40 px-6 overflow-hidden">
        <div className="absolute inset-0 tech-grid opacity-50 z-0" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-[80rem] mx-auto glass-panel border-accent/30 p-12 md:p-24 text-center clip-diagonal overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/10 via-transparent to-highlight/10" />
          
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-accent/20 rounded-full blur-[100px] -z-10"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          <h2 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase mb-6 tracking-tighter">
            Initiate Your <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-highlight to-accent glow-text">Transformation</span>
          </h2>
          
          <p className="text-lg md:text-xl text-foreground/80 max-w-2xl mx-auto mb-12 font-light">
            Deploy intelligent systems today. Scale exponentially tomorrow. The future of your operations begins here.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              to="/contact"
              className="group relative px-10 py-5 bg-foreground text-primary font-heading font-bold uppercase tracking-wider text-sm clip-diagonal overflow-hidden transition-all hover:scale-105"
            >
              <div className="absolute inset-0 bg-highlight translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
              <span className="relative z-10 flex items-center gap-2 group-hover:text-primary">
                Commence Project
                <ArrowRight className="w-4 h-4" />
              </span>
            </Link>
            <Link
              to="/pricing"
              className="px-10 py-5 border border-foreground/30 text-foreground font-heading font-bold uppercase tracking-wider text-sm clip-diagonal transition-all hover:border-foreground hover:bg-white/5"
            >
              Review Parameters
            </Link>
          </div>
        </motion.div>
      </section>
      <Footer />
    </div>
  );
}
