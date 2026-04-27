import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { DollarSign, Check, Star, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { PricingPlans } from '@/entities';

export default function PricingPage() {
  const [pricingPlans, setPricingPlans] = useState<PricingPlans[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPricingPlans();
  }, []);

  const loadPricingPlans = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<PricingPlans>('pricingplans');
      setPricingPlans(result.items);
    } catch (error) {
      console.error('Error loading pricing plans:', error);
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
            className="absolute top-1/4 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
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
            <DollarSign className="w-20 h-20 text-accent" strokeWidth={1} />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-5xl md:text-7xl font-bold uppercase mb-6"
          >
            Pricing Plans
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-xl md:text-2xl text-foreground/80 mb-8"
          >
            Flexible Solutions for Every Business Size
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto"
          >
            Choose the perfect plan to accelerate your growth with AI and automation. All plans include expert support and ongoing optimization.
          </motion.p>
        </motion.div>
      </section>

      {/* Pricing Cards */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="min-h-[600px]"
        >
          {isLoading ? null : pricingPlans.length > 0 ? (
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan) => (
                <motion.div
                  key={plan._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group relative"
                >
                  <div className={`relative bg-background/50 backdrop-blur-lg border rounded-2xl overflow-hidden h-full transition-all duration-300 hover:shadow-xl ${
                    plan.isMostPopular
                      ? 'border-highlight shadow-lg shadow-highlight/20 hover:shadow-highlight/30'
                      : 'border-foreground/10 hover:border-accent/50 hover:shadow-accent/20'
                  }`}>
                    {/* Most Popular Badge */}
                    {plan.isMostPopular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-highlight to-accent text-primary-foreground px-6 py-2 rounded-bl-2xl">
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-heading font-bold uppercase text-sm">
                            Most Popular
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="p-8">
                      {/* Plan Name */}
                      <h3 className="font-heading text-2xl font-bold uppercase mb-4 text-foreground">
                        {plan.planName}
                      </h3>

                      {/* Description */}
                      {plan.description && (
                        <p className="font-paragraph text-foreground/70 mb-6 leading-relaxed">
                          {plan.description}
                        </p>
                      )}

                      {/* Price */}
                      <div className="mb-8">
                        <div className="flex items-baseline gap-2">
                          <span className="font-heading text-5xl font-bold text-accent">
                            {plan.currency || '$'}{plan.price?.toLocaleString() || '0'}
                          </span>
                          <span className="font-paragraph text-foreground/60">
                            /month
                          </span>
                        </div>
                      </div>

                      {/* Features */}
                      {plan.featuresSummary && (
                        <div className="mb-8 space-y-3">
                          {plan.featuresSummary.split('\n').map((feature, index) => (
                            <div key={index} className="flex items-start gap-3">
                              <Check className="w-5 h-5 text-highlight flex-shrink-0 mt-0.5" />
                              <span className="font-paragraph text-foreground/80">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* CTA Button */}
                      <a
                        href={plan.ctaLink || '/contact'}
                        className={`block w-full text-center px-6 py-4 font-semibold rounded-full transition-all duration-300 ${
                          plan.isMostPopular
                            ? 'bg-gradient-to-r from-highlight to-accent text-primary-foreground hover:shadow-lg hover:shadow-highlight/50'
                            : 'bg-transparent border-2 border-accent text-accent hover:bg-accent/10'
                        }`}
                      >
                        {plan.ctaText || 'Get Started'}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="text-center py-20">
              <DollarSign className="w-20 h-20 text-foreground/30 mx-auto mb-6" />
              <p className="font-paragraph text-foreground/60 text-lg">
                No pricing plans available at the moment.
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* Custom Solutions Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6">
              Need a Custom Solution?
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              We offer tailored packages and retainer-based pricing for enterprise clients and unique requirements.
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Enterprise Solutions',
                description: 'Custom AI implementations, dedicated support, and scalable infrastructure for large organizations.',
                features: ['Dedicated account manager', 'Custom integrations', 'Priority support', 'Volume discounts']
              },
              {
                title: 'Retainer Packages',
                description: 'Ongoing optimization, maintenance, and strategic consulting on a monthly retainer basis.',
                features: ['Monthly strategy sessions', 'Continuous optimization', 'Performance reporting', 'Flexible hours']
              },
              {
                title: 'Project-Based Pricing',
                description: 'One-time implementations with clear deliverables and fixed pricing for specific projects.',
                features: ['Fixed scope & timeline', 'Milestone payments', 'Post-launch support', 'Training included']
              }
            ].map((option, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8 h-full transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20">
                  <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <h3 className="font-heading text-2xl font-bold uppercase mb-4 text-foreground">
                      {option.title}
                    </h3>
                    
                    <p className="font-paragraph text-foreground/80 leading-relaxed mb-6">
                      {option.description}
                    </p>

                    <div className="space-y-2 mb-6">
                      {option.features.map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                          <span className="font-paragraph text-sm text-foreground/70">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
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
                Ready to Get Started?
              </h2>
              
              <p className="font-paragraph text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto mb-10">
                Book a free consultation to discuss your needs and find the perfect solution for your business.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <Link
                  to="/contact"
                  className="group relative px-10 py-5 bg-gradient-to-r from-accent to-[#8A2BE2] text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 hover:scale-105"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    Book a Quote
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
