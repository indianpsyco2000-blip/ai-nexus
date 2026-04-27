import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Industries } from '@/entities';
import { Link } from 'react-router-dom';

export default function IndustriesPage() {
  const [industries, setIndustries] = useState<Industries[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadIndustries();
  }, []);

  const loadIndustries = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Industries>('industries');
      setIndustries(result.items);
    } catch (error) {
      console.error('Error loading industries:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
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
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
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
            <Building2 className="w-20 h-20 text-accent" strokeWidth={1} />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-5xl md:text-7xl font-bold uppercase mb-6"
          >
            Industries We Serve
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-xl md:text-2xl text-foreground/80 mb-8"
          >
            Tailored Solutions for Every Sector
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto"
          >
            We understand that every industry has unique challenges. Our AI and automation solutions are customized to meet the specific needs of your sector.
          </motion.p>
        </motion.div>
      </section>

      {/* Industries Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="min-h-[600px]"
        >
          {isLoading ? null : industries.length > 0 ? (
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {industries.map((industry) => (
                <motion.div
                  key={industry._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20">
                    {industry.industryImage && (
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={industry.industryImage}
                          alt={industry.industryName || 'Industry'}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          width={500}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
                      </div>
                    )}
                    
                    <div className="p-8">
                      <h2 className="font-heading text-2xl font-bold uppercase mb-4 text-foreground">
                        {industry.industryName}
                      </h2>
                      
                      <p className="font-paragraph text-foreground/80 leading-relaxed mb-6">
                        {industry.shortSummary}
                      </p>

                      {industry.description && (
                        <p className="font-paragraph text-sm text-foreground/70 leading-relaxed mb-6">
                          {industry.description}
                        </p>
                      )}

                      {industry.industryChallenges && (
                        <div className="mb-6 p-4 bg-accent/10 border border-accent/20 rounded-xl">
                          <h3 className="font-heading text-sm font-bold uppercase mb-2 text-accent">
                            Key Challenges
                          </h3>
                          <p className="font-paragraph text-sm text-foreground/80 leading-relaxed">
                            {industry.industryChallenges}
                          </p>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                        <span>Learn More</span>
                        <ArrowRight className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="text-center py-20">
              <Building2 className="w-20 h-20 text-foreground/30 mx-auto mb-6" />
              <p className="font-paragraph text-foreground/60 text-lg">
                No industries available at the moment.
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
          <div className="relative bg-gradient-to-r from-accent/20 via-highlight/20 to-accent/20 backdrop-blur-lg border border-accent/30 rounded-3xl p-12 md:p-16 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-highlight/10" />
            
            <div className="relative z-10 text-center">
              <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase mb-6">
                Don't See Your Industry?
              </h2>
              
              <p className="font-paragraph text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto mb-10">
                We work with businesses across all sectors. Let's discuss how our solutions can be tailored to your specific industry needs.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/contact"
                  className="group relative px-10 py-5 bg-gradient-to-r from-accent to-[#8A2BE2] text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Contact Us
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                <Link
                  to="/case-studies"
                  className="px-10 py-5 bg-transparent border-2 border-foreground text-foreground font-semibold rounded-full transition-all duration-300 hover:bg-foreground/10 hover:scale-105"
                >
                  View Case Studies
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
