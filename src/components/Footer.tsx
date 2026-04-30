import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const footerLinks = {
    services: [
      { name: 'Digital Marketing', path: '/services' },
      { name: 'AI Agents', path: '/services' },
      { name: 'Workflow Automation', path: '/services' },
      { name: 'App Development', path: '/services' },
    ],
    company: [
      { name: 'About Us', path: '/' },
      { name: 'Case Studies', path: '/case-studies' },
      { name: 'Industries', path: '/industries' },
      { name: 'Pricing', path: '/pricing' },
    ],
    resources: [
      { name: 'Blog', path: '/resources' },
      { name: 'Guides & Whitepapers', path: '/resources' },
      { name: 'Products', path: '/products' },
      { name: 'Contact', path: '/contact' },
    ],
  };

  const socialLinks = [
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Instagram, href: '#', label: 'Instagram' },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <footer className="w-full bg-background border-t border-highlight/20 overflow-hidden">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Main Footer Content */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 sm:gap-12 mb-12"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <motion.div 
                className="relative"
                whileHover={{ scale: 1.1, rotate: 10 }}
              >
                <Brain className="w-10 h-10 text-accent transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
              </motion.div>
              <span className="font-heading text-lg sm:text-xl font-bold uppercase text-foreground">
                AI Nexus
              </span>
            </Link>
            
            <p className="font-paragraph text-sm sm:text-base text-foreground/80 mb-6 leading-relaxed">
              Transforming businesses with intelligent AI solutions, workflow automation, and cutting-edge digital marketing strategies.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <motion.div 
                className="flex items-center gap-3 text-foreground/80 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Mail className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                <a href="mailto:info@ainexus.com" className="hover:text-accent transition-colors text-sm sm:text-base">
                  info@ainexus.com
                </a>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-foreground/80 group cursor-pointer"
                whileHover={{ x: 5 }}
              >
                <Phone className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors text-sm sm:text-base">
                  +1 (234) 567-890
                </a>
              </motion.div>
              <motion.div 
                className="flex items-center gap-3 text-foreground/80 group"
                whileHover={{ x: 5 }}
              >
                <MapPin className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                <span className="text-sm sm:text-base">Global Virtual Presence</span>
              </motion.div>
            </div>
          </motion.div>

          {/* Services Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-heading text-base sm:text-lg font-bold uppercase mb-6 text-foreground">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/80 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="w-0 h-0.5 bg-accent"
                      whileHover={{ width: '1rem' }}
                      transition={{ duration: 0.3 }}
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Company Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-heading text-base sm:text-lg font-bold uppercase mb-6 text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/80 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="w-0 h-0.5 bg-accent"
                      whileHover={{ width: '1rem' }}
                      transition={{ duration: 0.3 }}
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Resources Links */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-heading text-base sm:text-lg font-bold uppercase mb-6 text-foreground">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, i) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={link.path}
                    className="font-paragraph text-sm text-foreground/80 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <motion.span 
                      className="w-0 h-0.5 bg-accent"
                      whileHover={{ width: '1rem' }}
                      transition={{ duration: 0.3 }}
                    />
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <h3 className="font-heading text-base sm:text-lg font-bold uppercase mb-6 text-foreground">
              Newsletter
            </h3>
            <p className="font-paragraph text-xs sm:text-sm text-foreground/80 mb-4">
              Stay updated with AI trends and insights
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <motion.input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-3 sm:px-4 py-2 bg-background/50 border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors text-sm"
                whileFocus={{ scale: 1.02 }}
              />
              <motion.button
                type="submit"
                className="w-full px-3 sm:px-4 py-2 bg-accent text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-accent/30 flex items-center justify-center gap-2 text-sm"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                {!subscribed && <ArrowRight className="w-4 h-4" />}
              </motion.button>
            </form>
          </motion.div>
        </motion.div>

        {/* Social Links & Bottom Bar */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="pt-8 border-t border-highlight/20"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social, i) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-background/50 border border-foreground/20 rounded-full text-foreground/80 hover:text-accent hover:border-accent transition-all duration-300"
                  whileHover={{ scale: 1.15, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>

            {/* Copyright */}
            <motion.p 
              className="font-paragraph text-xs sm:text-sm text-foreground/60 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
            >
              © {new Date().getFullYear()} AI Nexus. All rights reserved.
            </motion.p>

            {/* Legal Links */}
            <div className="flex items-center gap-4 sm:gap-6">
              <motion.a 
                href="#" 
                className="font-paragraph text-xs sm:text-sm text-foreground/60 hover:text-accent transition-colors"
                whileHover={{ x: 2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a 
                href="#" 
                className="font-paragraph text-xs sm:text-sm text-foreground/60 hover:text-accent transition-colors"
                whileHover={{ x: 2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
