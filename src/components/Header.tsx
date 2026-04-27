import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Brain, ShoppingCart } from 'lucide-react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const { itemCount, actions } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Industries', path: '/industries' },
    { name: 'Resources', path: '/resources' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b border-highlight/20">
      <div className="max-w-[100rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative">
              <Brain className="w-10 h-10 text-accent transition-transform duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-accent/30 rounded-full blur-lg group-hover:blur-xl transition-all duration-300" />
            </div>
            <span className="font-heading text-xl font-bold uppercase text-foreground">ZapShere</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph font-semibold transition-colors duration-300 relative group ${
                  isActive(link.path) ? 'text-accent' : 'text-foreground/80 hover:text-accent'
                }`}
              >
                {link.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-accent transition-all duration-300 ${
                    isActive(link.path) ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}
                />
              </Link>
            ))}
          </nav>

          {/* Cart & CTA Button */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={actions.toggleCart}
              className="relative p-2 text-foreground hover:text-accent transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-highlight text-background text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
            <Link
              to="/contact"
              className="px-6 py-3 bg-gradient-to-r from-highlight to-accent text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-highlight/50 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-accent transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden overflow-hidden"
            >
              <div className="py-6 space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-paragraph font-semibold py-2 transition-colors duration-300 ${
                      isActive(link.path) ? 'text-accent' : 'text-foreground/80 hover:text-accent'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setIsMenuOpen(false);
                    actions.toggleCart();
                  }}
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-transparent border-2 border-accent text-accent font-semibold rounded-full transition-all duration-300 hover:bg-accent/10"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart ({itemCount})
                </button>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-gradient-to-r from-highlight to-accent text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-highlight/50"
                >
                  Get Started
                </Link>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
      {/* Cart Component */}
      <Cart />
    </header>
  );
}
