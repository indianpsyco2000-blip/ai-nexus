import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, Zap, Target, TrendingUp } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [service, setService] = useState<Services | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [allServices, setAllServices] = useState<Services[]>([]);

  useEffect(() => {
    loadService();
  }, [id]);

  const loadService = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const data = await BaseCrudService.getById<Services>('services', id);
        setService(data);
      }
      const result = await BaseCrudService.getAll<Services>('services');
      setAllServices(result.items);
    } catch (error) {
      console.error('Error loading service:', error);
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

  const relatedServices = allServices.filter(s => s._id !== id).slice(0, 3);

  const benefits = [
    { title: 'Increased Efficiency', description: 'Streamline operations and save time' },
    { title: 'Cost Reduction', description: 'Minimize overhead and maximize ROI' },
    { title: 'Scalability', description: 'Grow your business without limitations' },
    { title: 'Expert Support', description: '24/7 dedicated support team' },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {isLoading ? (
        <div className="w-full max-w-[100rem] mx-auto px-6 py-24 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
      ) : !service ? (
        <div className="w-full max-w-[100rem] mx-auto px-6 py-24 text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Service Not Found</h1>
          <p className="font-paragraph text-foreground/70 mb-8">The service you're looking for doesn't exist.</p>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-primary-foreground font-semibold rounded-full hover:scale-105 transition-transform"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
        </div>
      ) : (
        <>
          {/* Hero Section */}
          <section className="relative w-full max-w-[100rem] mx-auto px-6 py-24 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <motion.div
                className="absolute top-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
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
              className="relative z-10"
            >
              <motion.div variants={fadeInUp} className="mb-6">
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 text-accent font-semibold hover:gap-4 transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Services
                </Link>
              </motion.div>

              <motion.div variants={fadeInUp}>
                {service.category && (
                  <span className="inline-block px-4 py-2 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-6">
                    {service.category}
                  </span>
                )}
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="font-heading text-5xl md:text-7xl font-bold uppercase mb-6 max-w-4xl"
              >
                {service.serviceName}
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="font-paragraph text-xl md:text-2xl text-foreground/80 max-w-3xl"
              >
                {service.shortDescription}
              </motion.p>
            </motion.div>
          </section>

          {/* Hero Image */}
          {service.serviceImage && (
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="w-full max-w-[100rem] mx-auto px-6 py-12"
            >
              <div className="relative rounded-3xl overflow-hidden h-96 md:h-[500px] border border-foreground/10">
                <Image
                  src={service.serviceImage}
                  alt={service.serviceName || 'Service'}
                  className="w-full h-full object-cover"
                  width={1200}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
              </div>
            </motion.section>
          )}

          {/* Description Section */}
          <section className="w-full max-w-[100rem] mx-auto px-6 py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <motion.div variants={fadeInUp}>
                <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-6">
                  About This Service
                </h2>
                <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                  {service.description}
                </p>
                <p className="font-paragraph text-foreground/70 leading-relaxed">
                  Our team of experts is dedicated to delivering exceptional results tailored to your specific needs and business objectives.
                </p>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-2 gap-6"
              >
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-6 transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20">
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10">
                        <CheckCircle className="w-8 h-8 text-accent mb-3" strokeWidth={1.5} />
                        <h3 className="font-heading text-lg font-bold mb-2">{benefit.title}</h3>
                        <p className="font-paragraph text-foreground/70 text-sm">{benefit.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </section>

          {/* Features Section */}
          <section className="w-full max-w-[100rem] mx-auto px-6 py-24">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
            >
              <motion.div variants={fadeInUp} className="text-center mb-16">
                <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-6">
                  Key Features
                </h2>
                <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
                  What makes this service exceptional
                </p>
              </motion.div>

              {service.features && (
                <motion.div
                  variants={staggerContainer}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {service.features.split(',').map((feature, index) => (
                    <motion.div
                      key={index}
                      variants={fadeInUp}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8 h-full transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20">
                        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        <div className="relative z-10">
                          <div className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-accent/20 to-highlight/20 rounded-xl mb-4">
                            <Zap className="w-6 h-6 text-accent" strokeWidth={1.5} />
                          </div>
                          <p className="font-paragraph text-lg font-semibold text-foreground">
                            {feature.trim()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
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
                    Ready to Get Started?
                  </h2>
                  
                  <p className="font-paragraph text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto mb-10">
                    Let's discuss how {service.serviceName} can transform your business and drive measurable results.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                    <Link
                      to="/contact"
                      className="group relative px-10 py-5 bg-gradient-to-r from-accent to-[#8A2BE2] text-primary-foreground font-semibold rounded-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 hover:scale-105"
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        Get Started Today
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

          {/* Related Services */}
          {relatedServices.length > 0 && (
            <section className="w-full max-w-[100rem] mx-auto px-6 py-24">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={staggerContainer}
              >
                <motion.div variants={fadeInUp} className="text-center mb-16">
                  <h2 className="font-heading text-4xl md:text-5xl font-bold uppercase mb-6">
                    Related Services
                  </h2>
                  <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
                    Explore other solutions that complement this service
                  </p>
                </motion.div>

                <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {relatedServices.map((relatedService) => (
                    <motion.div
                      key={relatedService._id}
                      variants={fadeInUp}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <Link to={`/service/${relatedService._id}`} className="block h-full">
                        <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20">
                          {relatedService.serviceImage && (
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={relatedService.serviceImage}
                                alt={relatedService.serviceName || 'Service'}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                width={500}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                            </div>
                          )}
                          
                          <div className="p-6">
                            {relatedService.category && (
                              <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-4">
                                {relatedService.category}
                              </span>
                            )}
                            
                            <h3 className="font-heading text-lg font-bold uppercase mb-3 text-foreground">
                              {relatedService.serviceName}
                            </h3>
                            
                            <p className="font-paragraph text-foreground/80 leading-relaxed mb-4 text-sm">
                              {relatedService.shortDescription}
                            </p>
                            
                            <div className="flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                              Learn More
                              <ArrowRight className="w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </section>
          )}

          <Footer />
        </>
      )}
    </div>
  );
}
