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
    { name: 'Services', path: '/services' },
    { name: 'Products', path: '/products' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-heading text-2xl font-bold text-foreground">CodeNest</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-paragraph text-sm font-medium transition-colors duration-300 ${
                  isActive(link.path)
                    ? 'text-highlight'
                    : 'text-foreground/70 hover:text-foreground'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={actions.toggleCart}
              className="relative p-2 text-foreground hover:text-highlight transition-colors"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-highlight text-primary text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            
            <Link
              to="/contact"
              className="px-5 py-2 bg-highlight text-primary font-paragraph font-semibold text-sm rounded-lg transition-all hover:opacity-90"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-highlight transition-colors"
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
              className="lg:hidden overflow-hidden mt-4"
            >
              <div className="py-4 space-y-3 border-t border-white/5">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block font-paragraph text-sm py-2 transition-colors duration-300 ${
                      isActive(link.path)
                        ? 'text-highlight'
                        : 'text-foreground/70 hover:text-foreground'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="pt-3 border-t border-white/5 space-y-2">
                  <button
                    onClick={() => {
                      setIsMenuOpen(false);
                      actions.toggleCart();
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-highlight/30 text-highlight font-paragraph text-sm rounded-lg transition-colors hover:bg-highlight/10"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Cart ({itemCount})
                  </button>
                  <Link
                    to="/contact"
                    onClick={() => setIsMenuOpen(false)}
                    className="block w-full text-center px-4 py-2 bg-highlight text-primary font-paragraph font-semibold text-sm rounded-lg transition-all hover:opacity-90"
                  >
                    Contact
                  </Link>
                </div>
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
