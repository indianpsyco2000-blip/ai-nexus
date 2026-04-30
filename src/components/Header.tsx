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
    { name: 'Industries', path: '/industries' },
    { name: 'Resources', path: '/resources' },
    { name: 'Case Studies', path: '/case-studies' },
    { name: 'Pricing', path: '/pricing' },
  ];

  const isActive = (path: string) => location.pathname === path;

  const navItemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.05, duration: 0.3 }
    })
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-white/5">
      <div className="max-w-[120rem] mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.span 
              className="font-heading text-lg sm:text-2xl font-bold text-foreground group-hover:text-highlight transition-colors duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ZAPSHERE
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link, i) => (
              <motion.div
                key={link.path}
                custom={i}
                variants={navItemVariants}
                initial="hidden"
                animate="visible"
              >
                <Link
                  to={link.path}
                  className={`font-paragraph text-xs sm:text-sm font-medium transition-all duration-300 relative group ${
                    isActive(link.path)
                      ? 'text-highlight'
                      : 'text-foreground/70 hover:text-foreground'
                  }`}
                >
                  {link.name}
                  <motion.span
                    className="absolute bottom-0 left-0 h-0.5 bg-highlight"
                    initial={{ width: 0 }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <motion.button
              onClick={actions.toggleCart}
              className="relative p-2 text-foreground hover:text-highlight transition-colors"
              aria-label="Shopping cart"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-highlight text-primary text-xs font-bold rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.button>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to="/contact"
                className="px-4 sm:px-5 py-2 bg-highlight text-primary font-paragraph font-semibold text-xs sm:text-sm rounded-lg transition-all hover:shadow-lg hover:shadow-highlight/50"
              >
                Contact
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-foreground hover:text-highlight transition-colors"
            aria-label="Toggle menu"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </motion.button>
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
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
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
                  </motion.div>
                ))}
                <div className="pt-3 border-t border-white/5 space-y-2">
                  <motion.button
                    onClick={() => {
                      setIsMenuOpen(false);
                      actions.toggleCart();
                    }}
                    className="flex items-center justify-center gap-2 w-full px-4 py-2 border border-highlight/30 text-highlight font-paragraph text-sm rounded-lg transition-colors hover:bg-highlight/10"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Cart ({itemCount})
                  </motion.button>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/contact"
                      onClick={() => setIsMenuOpen(false)}
                      className="block w-full text-center px-4 py-2 bg-highlight text-primary font-paragraph font-semibold text-sm rounded-lg transition-all hover:shadow-lg hover:shadow-highlight/50"
                    >
                      Contact
                    </Link>
                  </motion.div>
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
