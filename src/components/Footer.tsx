import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, ArrowRight } from 'lucide-react';
import { useState } from 'react';

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

  return (
    <footer className="w-full bg-background border-t border-highlight/20">
      <div className="max-w-[100rem] mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <Brain className="w-10 h-10 text-accent transition-transform duration-300 group-hover:scale-110" />
                <div className="absolute inset-0 bg-accent/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
              </div>
              <span className="font-heading text-xl font-bold uppercase text-foreground">
                AI Nexus
              </span>
            </Link>
            
            <p className="font-paragraph text-foreground/80 mb-6 leading-relaxed">
              Transforming businesses with intelligent AI solutions, workflow automation, and cutting-edge digital marketing strategies.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-foreground/80">
                <Mail className="w-5 h-5 text-accent" />
                <a href="mailto:info@ainexus.com" className="hover:text-accent transition-colors">
                  info@ainexus.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <Phone className="w-5 h-5 text-accent" />
                <a href="tel:+1234567890" className="hover:text-accent transition-colors">
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-3 text-foreground/80">
                <MapPin className="w-5 h-5 text-accent" />
                <span>Global Virtual Presence</span>
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-lg font-bold uppercase mb-6 text-foreground">
              Services
            </h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-foreground/80 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-accent group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-lg font-bold uppercase mb-6 text-foreground">
              Company
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-foreground/80 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-accent group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-lg font-bold uppercase mb-6 text-foreground">
              Resources
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="font-paragraph text-foreground/80 hover:text-accent transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span className="w-0 h-0.5 bg-accent group-hover:w-4 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="lg:col-span-2">
            <h3 className="font-heading text-lg font-bold uppercase mb-6 text-foreground">
              Newsletter
            </h3>
            <p className="font-paragraph text-sm text-foreground/80 mb-4">
              Stay updated with AI trends and insights
            </p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                required
                className="w-full px-4 py-2 bg-background/50 border border-foreground/20 rounded-lg text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-accent transition-colors"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-accent text-primary-foreground font-semibold rounded-lg transition-all duration-300 hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/30 flex items-center justify-center gap-2"
              >
                {subscribed ? 'Subscribed!' : 'Subscribe'}
                {!subscribed && <ArrowRight className="w-4 h-4" />}
              </button>
            </form>
          </div>
        </div>

        {/* Social Links & Bottom Bar */}
        <div className="pt-8 border-t border-highlight/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 flex items-center justify-center bg-background/50 border border-foreground/20 rounded-full text-foreground/80 hover:text-accent hover:border-accent transition-all duration-300 hover:scale-110"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            {/* Copyright */}
            <p className="font-paragraph text-sm text-foreground/60 text-center">
              © {new Date().getFullYear()} AI Nexus. All rights reserved.
            </p>

            {/* Legal Links */}
            <div className="flex items-center gap-6">
              <a href="#" className="font-paragraph text-sm text-foreground/60 hover:text-accent transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-foreground/60 hover:text-accent transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
