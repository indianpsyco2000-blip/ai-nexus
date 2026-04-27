import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, CheckCircle, TrendingUp } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Industries } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function IndustryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [industry, setIndustry] = useState<Industries | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadIndustry();
  }, [id]);

  const loadIndustry = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const result = await BaseCrudService.getById<Industries>('industries', id);
        setIndustry(result);
      }
    } catch (error) {
      console.error('Error loading industry:', error);
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="w-full max-w-[100rem] mx-auto px-6 py-32 flex justify-center items-center">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!industry) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="w-full max-w-[100rem] mx-auto px-6 py-32">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-center"
          >
            <h1 className="font-heading text-4xl font-bold mb-6">Industry Not Found</h1>
            <p className="font-paragraph text-foreground/70 mb-8">
              The industry you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-primary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-accent/50 transition-all duration-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Industries
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Breadcrumb Navigation */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          className="flex items-center gap-2 text-foreground/60"
        >
          <Link to="/industries" className="hover:text-accent transition-colors">
            Industries
          </Link>
          <span>/</span>
          <span className="text-foreground">{industry.industryName}</span>
        </motion.div>
      </section>

      {/* Hero Section with Image */}
      {industry.industryImage && (
        <section className="relative w-full max-w-[100rem] mx-auto px-6 py-12 overflow-hidden">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative h-96 rounded-3xl overflow-hidden"
          >
            <Image
              src={industry.industryImage}
              alt={industry.industryName || 'Industry'}
              className="w-full h-full object-cover"
              width={1200}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </motion.div>
        </section>
      )}

      {/* Main Content */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-3 gap-12"
        >
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Title and Summary */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h1 className="font-heading text-5xl md:text-6xl font-bold uppercase mb-6">
                {industry.industryName}
              </h1>
              {industry.shortSummary && (
                <p className="font-paragraph text-xl text-foreground/80 leading-relaxed mb-8">
                  {industry.shortSummary}
                </p>
              )}
            </motion.div>

            {/* Description */}
            {industry.description && (
              <motion.div variants={fadeInUp} className="mb-12">
                <h2 className="font-heading text-3xl font-bold uppercase mb-6">Overview</h2>
                <p className="font-paragraph text-lg text-foreground/70 leading-relaxed">
                  {industry.description}
                </p>
              </motion.div>
            )}

            {/* Key Challenges */}
            {industry.industryChallenges && (
              <motion.div variants={fadeInUp} className="mb-12">
                <h2 className="font-heading text-3xl font-bold uppercase mb-8">Key Challenges</h2>
                <div className="bg-accent/10 border border-accent/20 rounded-2xl p-8">
                  <p className="font-paragraph text-lg text-foreground/80 leading-relaxed">
                    {industry.industryChallenges}
                  </p>
                </div>
              </motion.div>
            )}

            {/* Solutions Section */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="font-heading text-3xl font-bold uppercase mb-8">Our Solutions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'AI-Powered Automation',
                    description: 'Streamline operations with intelligent automation tailored to your industry needs.'
                  },
                  {
                    title: 'Data Analytics',
                    description: 'Gain actionable insights from your business data to drive informed decisions.'
                  },
                  {
                    title: 'Process Optimization',
                    description: 'Identify and eliminate inefficiencies to maximize productivity and reduce costs.'
                  },
                  {
                    title: 'Custom Integration',
                    description: 'Seamlessly integrate our solutions with your existing systems and workflows.'
                  }
                ].map((solution, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-6 hover:border-accent/50 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-1" />
                      <div>
                        <h3 className="font-heading text-lg font-bold mb-2">{solution.title}</h3>
                        <p className="font-paragraph text-foreground/70">{solution.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Benefits Section */}
            <motion.div variants={fadeInUp} className="mb-12">
              <h2 className="font-heading text-3xl font-bold uppercase mb-8">Expected Benefits</h2>
              <div className="space-y-4">
                {[
                  'Increased operational efficiency by up to 40%',
                  'Reduced manual processes and human error',
                  'Faster time-to-market for new initiatives',
                  'Improved customer satisfaction and retention',
                  'Better data-driven decision making',
                  'Scalable solutions that grow with your business'
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    className="flex items-center gap-4 p-4 bg-highlight/10 border border-highlight/20 rounded-xl"
                  >
                    <TrendingUp className="w-5 h-5 text-highlight flex-shrink-0" />
                    <p className="font-paragraph text-foreground/80">{benefit}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Info Card */}
              <div className="bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8">
                <h3 className="font-heading text-xl font-bold uppercase mb-6">Industry Focus</h3>
                <div className="space-y-4">
                  <div>
                    <p className="font-paragraph text-sm text-foreground/60 mb-2">Industry Name</p>
                    <p className="font-heading text-lg font-bold">{industry.industryName}</p>
                  </div>
                </div>
              </div>

              {/* CTA Card */}
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-accent/20 to-highlight/20 backdrop-blur-lg border border-accent/30 rounded-2xl p-8"
              >
                <h3 className="font-heading text-xl font-bold uppercase mb-4">Ready to Transform?</h3>
                <p className="font-paragraph text-foreground/80 mb-6">
                  Let's discuss how our solutions can drive growth in your {industry.industryName?.toLowerCase()} business.
                </p>
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-3 bg-accent text-primary-foreground font-semibold rounded-full hover:shadow-lg hover:shadow-accent/50 transition-all duration-300 hover:scale-105"
                >
                  Get Started
                </Link>
              </motion.div>

              {/* Related Industries */}
              <div className="bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8">
                <h3 className="font-heading text-lg font-bold uppercase mb-4">Explore More</h3>
                <Link
                  to="/industries"
                  className="flex items-center gap-2 text-accent hover:gap-4 transition-all font-semibold"
                >
                  <span>View All Industries</span>
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
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
                Let's Discuss Your Needs
              </h2>
              
              <p className="font-paragraph text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto mb-10">
                Our experts are ready to create a customized solution for your {industry.industryName} business.
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
