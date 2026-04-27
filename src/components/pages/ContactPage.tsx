import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { ContactInquiries } from '@/entities';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BaseCrudService.create<ContactInquiries>('contactinquiries', {
        _id: crypto.randomUUID(),
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        message: formData.message,
        submissionDate: new Date().toISOString()
      });

      setIsSubmitted(true);
      setFormData({ fullName: '', email: '', phoneNumber: '', message: '' });
      
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
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
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
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
            <Mail className="w-20 h-20 text-accent" strokeWidth={1} />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-5xl md:text-7xl font-bold uppercase mb-6"
          >
            Get In Touch
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-xl md:text-2xl text-foreground/80 mb-8"
          >
            Let's Build Something Amazing Together
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto"
          >
            Have a project in mind? Want to learn more about our services? We're here to help you transform your business with AI and automation.
          </motion.p>
        </motion.div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div
              variants={fadeInUp}
              className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8 md:p-12"
            >
              <h2 className="font-heading text-3xl font-bold uppercase mb-6 text-foreground">
                Send Us a Message
              </h2>

              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6 p-4 bg-highlight/20 border border-highlight/30 rounded-xl flex items-center gap-3"
                >
                  <CheckCircle className="w-6 h-6 text-highlight" />
                  <p className="font-paragraph text-highlight font-semibold">
                    Thank you! We'll get back to you soon.
                  </p>
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block font-paragraph font-semibold mb-2 text-foreground">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block font-paragraph font-semibold mb-2 text-foreground">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 bg-background/50 border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phoneNumber" className="block font-paragraph font-semibold mb-2 text-foreground">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phoneNumber"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-background/50 border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
                    placeholder="+1 (234) 567-890"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block font-paragraph font-semibold mb-2 text-foreground">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-background/50 border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-[#8A2BE2] text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>

          {/* Contact Info & Map */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            {/* Contact Cards */}
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/20 rounded-xl">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold uppercase mb-2 text-foreground">
                      Email Us
                    </h3>
                    <a href="mailto:info@ainexus.com" className="font-paragraph text-foreground/80 hover:text-accent transition-colors">
                      info@ainexus.com
                    </a>
                    <p className="font-paragraph text-sm text-foreground/60 mt-1">
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/20 rounded-xl">
                    <Phone className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold uppercase mb-2 text-foreground">
                      Call Us
                    </h3>
                    <a href="tel:+1234567890" className="font-paragraph text-foreground/80 hover:text-accent transition-colors">
                      +1 (234) 567-890
                    </a>
                    <p className="font-paragraph text-sm text-foreground/60 mt-1">
                      Mon-Fri, 9am-6pm EST
                    </p>
                  </div>
                </div>
              </div>

              <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8 hover:border-accent/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/20 rounded-xl">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h3 className="font-heading text-xl font-bold uppercase mb-2 text-foreground">
                      Location
                    </h3>
                    <p className="font-paragraph text-foreground/80">
                      Global Virtual Presence
                    </p>
                    <p className="font-paragraph text-sm text-foreground/60 mt-1">
                      Serving clients worldwide
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Global Presence */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-gradient-to-br from-accent/20 to-highlight/20 backdrop-blur-lg border border-accent/30 rounded-2xl p-8 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-accent/10 to-highlight/10" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <Globe className="w-8 h-8 text-accent" />
                  <h3 className="font-heading text-2xl font-bold uppercase text-foreground">
                    Global Reach
                  </h3>
                </div>
                
                <p className="font-paragraph text-foreground/80 leading-relaxed mb-4">
                  We work with clients across North America, Europe, Asia, and beyond. Our virtual-first approach means we're always available when you need us.
                </p>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-background/30 rounded-xl">
                    <p className="font-heading text-3xl font-bold text-accent mb-1">50+</p>
                    <p className="font-paragraph text-sm text-foreground/70">Countries Served</p>
                  </div>
                  <div className="text-center p-4 bg-background/30 rounded-xl">
                    <p className="font-heading text-3xl font-bold text-highlight mb-1">24/7</p>
                    <p className="font-paragraph text-sm text-foreground/70">Support Available</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Meeting Booking */}
            <motion.div
              variants={fadeInUp}
              className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl p-8"
            >
              <h3 className="font-heading text-2xl font-bold uppercase mb-4 text-foreground">
                Book a Meeting
              </h3>
              <p className="font-paragraph text-foreground/80 mb-6 leading-relaxed">
                Schedule a free 30-minute consultation to discuss your project and explore how we can help.
              </p>
              <a
                href="#"
                className="inline-flex items-center gap-2 px-8 py-4 bg-transparent border-2 border-accent text-accent font-semibold rounded-full transition-all duration-300 hover:bg-accent/10 hover:scale-105"
              >
                Schedule Consultation
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
