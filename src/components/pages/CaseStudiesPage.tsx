import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Filter, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { CaseStudies } from '@/entities';

export default function CaseStudiesPage() {
  const [caseStudies, setCaseStudies] = useState<CaseStudies[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<string>('All');

  useEffect(() => {
    loadCaseStudies();
  }, []);

  const loadCaseStudies = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<CaseStudies>('casestudies');
      setCaseStudies(result.items);
    } catch (error) {
      console.error('Error loading case studies:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const industries = ['All', ...Array.from(new Set(caseStudies.map(cs => cs.industry).filter(Boolean)))];
  const filteredCaseStudies = selectedIndustry === 'All' 
    ? caseStudies 
    : caseStudies.filter(cs => cs.industry === selectedIndustry);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[100rem] mx-auto px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/3 right-1/4 w-96 h-96 bg-highlight/20 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div
            variants={fadeInUp}
            className="mb-6 flex justify-center"
          >
            <TrendingUp className="w-20 h-20 text-highlight" strokeWidth={1} />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-5xl md:text-7xl font-bold uppercase mb-6"
          >
            Success Stories
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-xl md:text-2xl text-foreground/80 mb-8"
          >
            Real Results from Real Businesses
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto"
          >
            Discover how we've helped businesses across industries transform their operations with AI, automation, and digital marketing solutions.
          </motion.p>
        </motion.div>
      </section>

      {/* Industry Filter */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <Filter className="w-5 h-5 text-accent" />
          <span className="font-heading font-bold uppercase text-foreground">
            Filter by Industry:
          </span>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4"
        >
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setSelectedIndustry(industry)}
              className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 ${
                selectedIndustry === industry
                  ? 'bg-gradient-to-r from-highlight to-accent text-primary-foreground shadow-lg shadow-highlight/30'
                  : 'bg-background/50 border border-foreground/20 text-foreground/80 hover:border-highlight/50'
              }`}
            >
              {industry}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Case Studies Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="min-h-[600px]"
        >
          {isLoading ? null : filteredCaseStudies.length > 0 ? (
            <motion.div variants={staggerContainer} className="space-y-12">
              {filteredCaseStudies.map((caseStudy, index) => (
                <motion.div
                  key={caseStudy._id}
                  variants={fadeInUp}
                  className="group"
                >
                  <div className={`relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-3xl overflow-hidden transition-all duration-300 hover:border-highlight/50 hover:shadow-xl hover:shadow-highlight/20 ${
                    index % 2 === 0 ? '' : ''
                  }`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
                      {/* Content Side */}
                      <div className={`flex flex-col justify-center ${index % 2 === 0 ? 'lg:order-1' : 'lg:order-2'}`}>
                        {caseStudy.industry && (
                          <span className="inline-block w-fit px-4 py-2 bg-highlight/20 text-highlight text-sm font-semibold rounded-full mb-6">
                            {caseStudy.industry}
                          </span>
                        )}
                        
                        <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-6 text-foreground">
                          {caseStudy.title}
                        </h2>

                        {/* Problem */}
                        <div className="mb-6">
                          <h3 className="font-heading text-xl font-bold uppercase mb-3 text-accent">
                            Problem
                          </h3>
                          <p className="font-paragraph text-foreground/80 leading-relaxed">
                            {caseStudy.problem}
                          </p>
                        </div>

                        {/* Solution */}
                        <div className="mb-6">
                          <h3 className="font-heading text-xl font-bold uppercase mb-3 text-accent">
                            Solution
                          </h3>
                          <p className="font-paragraph text-foreground/80 leading-relaxed">
                            {caseStudy.solution}
                          </p>
                        </div>

                        {/* Result */}
                        <div className="mb-6">
                          <h3 className="font-heading text-xl font-bold uppercase mb-3 text-highlight">
                            Result
                          </h3>
                          <p className="font-paragraph text-foreground/80 leading-relaxed">
                            {caseStudy.result}
                          </p>
                        </div>

                        {/* ROI Metrics */}
                        {caseStudy.roiMetrics && (
                          <div className="flex items-center gap-3 p-4 bg-highlight/10 border border-highlight/30 rounded-xl">
                            <TrendingUp className="w-6 h-6 text-highlight flex-shrink-0" />
                            <p className="font-heading font-bold text-highlight">
                              {caseStudy.roiMetrics}
                            </p>
                          </div>
                        )}
                      </div>

                      {/* Charts Side */}
                      <div className={`flex flex-col gap-6 ${index % 2 === 0 ? 'lg:order-2' : 'lg:order-1'}`}>
                        {caseStudy.beforeChart && (
                          <div className="relative rounded-2xl overflow-hidden group/chart">
                            <Image
                              src={caseStudy.beforeChart}
                              alt="Before Chart"
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover/chart:scale-105"
                              width={600}
                            />
                            <div className="absolute top-4 left-4 px-4 py-2 bg-background/80 backdrop-blur-sm border border-foreground/20 rounded-lg">
                              <span className="font-heading font-bold uppercase text-sm">Before</span>
                            </div>
                          </div>
                        )}
                        
                        {caseStudy.afterChart && (
                          <div className="relative rounded-2xl overflow-hidden group/chart">
                            <Image
                              src={caseStudy.afterChart}
                              alt="After Chart"
                              className="w-full h-auto object-cover transition-transform duration-500 group-hover/chart:scale-105"
                              width={600}
                            />
                            <div className="absolute top-4 left-4 px-4 py-2 bg-highlight/80 backdrop-blur-sm border border-highlight/30 rounded-lg">
                              <span className="font-heading font-bold uppercase text-sm text-background">After</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="text-center py-20">
              <TrendingUp className="w-20 h-20 text-foreground/30 mx-auto mb-6" />
              <p className="font-paragraph text-foreground/60 text-lg">
                {selectedIndustry === 'All' 
                  ? 'No case studies available at the moment.' 
                  : `No case studies found for ${selectedIndustry} industry.`}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInUp}
        >
          <div className="relative bg-gradient-to-r from-highlight/20 via-accent/20 to-highlight/20 backdrop-blur-lg border border-highlight/30 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-highlight/10 to-accent/10" />
            
            <div className="relative z-10 text-center">
              <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-6">
                Ready to Write Your Success Story?
              </h2>
              
              <p className="font-paragraph text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto mb-10">
                Let's discuss how we can help you achieve similar results and transform your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <a
                  href="/contact"
                  className="group relative px-10 py-5 bg-gradient-to-r from-highlight to-accent text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-highlight/50 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Start Your Project
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
