import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShoppingCart } from 'lucide-react';
import { useCart } from '@/integrations';
import Cart from '@/components/Cart';

export default function Header() {
  const { itemCount, actions } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'PROJECTS', path: '/case-studies' },
    { name: 'BLOG', path: '/resources' },
    { name: 'ABOUT', path: '/services' },
    { name: 'RESUME', path: '/pricing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="absolute top-0 left-0 right-0 z-50 w-full">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&display=swap');
        
        .header-nav-link {
          font-family: 'Inter', sans-serif;
          font-size: 16px;
          font-weight: 600;
          letter-spacing: 0.05em;
          transition: color 0.3s ease;
        }
        
        .header-nav-link:hover {
          color: #5ed29c;
        }
        
        .header-nav-link.active {
          color: #5ed29c;
        }
      `}</style>
      
      <div className="max-w-[120rem] mx-auto px-6 py-6">
        <div className="flex items-center justify-between">
          {/* Logo - Minimalist White */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="font-sans text-2xl font-bold text-white tracking-tight">CodeNest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`header-nav-link text-white ${
                  isActive(link.path) ? 'active' : ''
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Cart & CTA Button */}
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={actions.toggleCart}
              className="relative p-2 text-white hover:text-[#5ed29c] transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#5ed29c] text-[#070b0a] text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
            <Link
              to="/contact"
              className="px-6 py-3 bg-[#5ed29c] text-[#070b0a] font-sans font-bold uppercase tracking-wider text-sm rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#5ed29c]/50 hover:scale-105"
            >
              Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-[#5ed29c] transition-colors"
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
              className="lg:hidden overflow-hidden mt-6"
            >
              <div className="py-6 space-y-4 bg-background/95 backdrop-blur-lg rounded-lg border border-white/10 p-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-sans font-semibold py-3 text-white transition-colors duration-300 ${
                      isActive(link.path) ? 'text-[#5ed29c]' : 'hover:text-[#5ed29c]'
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
                  className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-transparent border-2 border-[#5ed29c] text-[#5ed29c] font-semibold rounded-full transition-all duration-300 hover:bg-[#5ed29c]/10 mt-4"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Cart ({itemCount})
                </button>
                <Link
                  to="/contact"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full text-center px-6 py-3 bg-[#5ed29c] text-[#070b0a] font-sans font-bold uppercase tracking-wider rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-[#5ed29c]/50 mt-4"
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
