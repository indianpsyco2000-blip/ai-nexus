import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Bot, Zap, Code, Search, Target, Mail, BarChart, MessageSquare, Database, Workflow, Smartphone, Globe, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Services } from '@/entities';

export default function ServicesPage() {
  const [services, setServices] = useState<Services[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Services>('services');
      setServices(result.items);
    } catch (error) {
      console.error('Error loading services:', error);
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

  const serviceCategories = [
    {
      title: 'Digital Marketing',
      icon: TrendingUp,
      description: 'Comprehensive digital strategies to amplify your brand and drive measurable growth',
      subServices: [
        { name: 'SEO & Content Marketing', icon: Search },
        { name: 'Paid Ads (Google, Meta, LinkedIn, TikTok)', icon: Target },
        { name: 'Social Media Marketing', icon: MessageSquare },
        { name: 'Email & Funnel Marketing', icon: Mail },
        { name: 'Analytics & Reporting', icon: BarChart },
      ]
    },
    {
      title: 'AI Agents',
      icon: Bot,
      description: 'Intelligent automation agents that work 24/7 to enhance your business operations',
      subServices: [
        { name: 'Customer Support Agents', icon: MessageSquare },
        { name: 'Sales Agents', icon: Target },
        { name: 'Data Research Agents', icon: Database },
        { name: 'Custom AI Agent Development', icon: Bot },
      ]
    },
    {
      title: 'Workflow Automation',
      icon: Zap,
      description: 'Streamline operations and eliminate repetitive tasks with intelligent automation',
      subServices: [
        { name: 'Marketing Automation (HubSpot, Mailchimp, ActiveCampaign)', icon: Mail },
        { name: 'Business Process Automation (Zapier, Make, n8n)', icon: Workflow },
        { name: 'CRM Automation (HubSpot, Salesforce)', icon: Database },
        { name: 'AI + Automation Integrations', icon: Zap },
      ]
    },
    {
      title: 'App & Website Development',
      icon: Code,
      description: 'Custom digital solutions built with cutting-edge technology and design',
      subServices: [
        { name: 'Website Design & Development (WordPress, Webflow, Custom)', icon: Globe },
        { name: 'Mobile App Development (iOS, Android, Cross-platform)', icon: Smartphone },
        { name: 'Web Applications', icon: Code },
        { name: 'API & Integrations', icon: Workflow },
        { name: 'AI-Powered Apps', icon: Bot },
      ]
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[120rem] mx-auto px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 bg-accent/20 rounded-full blur-3xl"
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
          <motion.h1
            variants={fadeInUp}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase mb-4 md:mb-6 px-4"
          >
            AI + Automation + Marketing
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 mb-6 md:mb-8 px-4"
          >
            Everything You Need to Scale
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/70 max-w-3xl mx-auto px-4"
          >
            From intelligent AI agents to comprehensive digital marketing strategies, we deliver end-to-end solutions that transform your business operations and accelerate growth.
          </motion.p>
        </motion.div>
      </section>

      {/* Service Categories Section */}
      <section className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <div className="space-y-16 md:space-y-24">
          {serviceCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={staggerContainer}
              className="relative"
            >
              {/* Category Header */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-col lg:flex-row items-start lg:items-center gap-6 mb-8 md:mb-12"
              >
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  <div className="w-16 sm:w-20 h-16 sm:h-20 flex items-center justify-center bg-gradient-to-br from-accent/20 to-highlight/20 rounded-2xl">
                    <category.icon className="w-8 sm:w-10 h-8 sm:h-10 text-accent" strokeWidth={1.5} />
                  </div>
                  <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-xl" />
                </motion.div>
                
                <div className="flex-1">
                  <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-3 md:mb-4">
                    {category.title}
                  </h2>
                  <p className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/80 max-w-3xl">
                    {category.description}
                  </p>
                </div>
              </motion.div>

              {/* Sub-Services Grid */}
              <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
              >
                {category.subServices.map((subService, index) => (
                  <motion.div
                    key={index}
                    variants={fadeInUp}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <motion.div 
                      className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-xl p-4 md:p-6 h-full transition-all duration-300 hover:border-accent/50 hover:shadow-lg hover:shadow-accent/20"
                      whileHover={{ borderColor: "rgba(28, 130, 227, 0.5)" }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      
                      <div className="relative z-10 flex items-start gap-3 md:gap-4">
                        <motion.div 
                          className="flex-shrink-0"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                        >
                          <subService.icon className="w-5 md:w-6 h-5 md:h-6 text-accent" strokeWidth={1.5} />
                        </motion.div>
                        <p className="font-paragraph text-xs sm:text-sm md:text-base text-foreground/90 leading-relaxed">
                          {subService.name}
                        </p>
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Services from CMS */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="min-h-[400px]"
        >
          <motion.div variants={fadeInUp} className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6">
              Featured Solutions
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              Explore our specialized service offerings
            </p>
          </motion.div>

          {isLoading ? null : services.length > 0 ? (
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <motion.div
                  key={service._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={`/service/${service._id}`} className="block h-full">
                    <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20">
                      {service.serviceImage && (
                        <div className="relative h-56 overflow-hidden">
                          <Image
                            src={service.serviceImage}
                            alt={service.serviceName || 'Service'}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            width={500}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                        </div>
                      )}
                      
                      <div className="p-6">
                        {service.category && (
                          <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-4">
                            {service.category}
                          </span>
                        )}
                        
                        <h3 className="font-heading text-xl font-bold uppercase mb-3 text-foreground">
                          {service.serviceName}
                        </h3>
                        
                        <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                          {service.description}
                        </p>
                        
                        <div className="inline-flex items-center gap-2 text-accent font-semibold group-hover:gap-4 transition-all">
                          Learn More
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="text-center py-12">
              <p className="font-paragraph text-foreground/60 text-lg">
                No featured services available at the moment.
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
                Ready to Transform Your Business?
              </h2>
              
              <p className="font-paragraph text-lg md:text-xl text-foreground/90 max-w-3xl mx-auto mb-10">
                Let's discuss how our services can help you achieve your goals and scale your operations.
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

      <Footer />
    </div>
  );
}
