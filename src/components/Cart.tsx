import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingCart, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Image } from '@/components/ui/image';
import { useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';

export default function Cart() {
  const { items, itemCount, totalPrice, isOpen, isCheckingOut, actions } = useCart();
  const { currency } = useCurrency();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={actions.closeCart}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-[420px] md:w-[480px] bg-background border-l border-foreground/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <motion.div 
              className="flex items-center justify-between p-4 sm:p-6 border-b border-foreground/10"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-2 sm:gap-3">
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <ShoppingCart className="w-5 sm:w-6 h-5 sm:h-6 text-accent" />
                </motion.div>
                <h2 className="font-heading text-lg sm:text-2xl font-bold uppercase">
                  Cart ({itemCount})
                </h2>
              </div>
              <motion.button
                onClick={actions.closeCart}
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                aria-label="Close cart"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <X className="w-5 sm:w-6 h-5 sm:h-6" />
              </motion.button>
            </motion.div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {items.length === 0 ? (
                <motion.div 
                  className="flex flex-col items-center justify-center h-full text-center"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <ShoppingCart className="w-16 sm:w-20 h-16 sm:h-20 text-foreground/20 mb-4" />
                  </motion.div>
                  <p className="font-paragraph text-foreground/60 text-base sm:text-lg mb-2">
                    Your cart is empty
                  </p>
                  <p className="font-paragraph text-foreground/40 text-xs sm:text-sm">
                    Add some products to get started
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3 sm:space-y-4">
                  {items.map((item, i) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ delay: i * 0.05 }}
                      className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-xl p-3 sm:p-4 group hover:border-accent/30 transition-all"
                      whileHover={{ borderColor: "rgba(28, 130, 227, 0.3)" }}
                    >
                      <div className="flex gap-3 sm:gap-4">
                        {/* Product Image */}
                        {item.image && (
                          <motion.div 
                            className="flex-shrink-0 w-16 sm:w-20 h-16 sm:h-20 rounded-lg overflow-hidden"
                            whileHover={{ scale: 1.05 }}
                          >
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              width={80}
                            />
                          </motion.div>
                        )}

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-bold text-foreground mb-1 truncate text-sm sm:text-base">
                            {item.name}
                          </h3>
                          <p className="font-paragraph text-accent font-semibold mb-2 sm:mb-3 text-sm sm:text-base">
                            {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 sm:gap-3">
                            <motion.button
                              onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                              className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors"
                              aria-label="Decrease quantity"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Minus className="w-3 sm:w-4 h-3 sm:h-4" />
                            </motion.button>
                            
                            <span className="font-paragraph font-semibold w-6 sm:w-8 text-center text-sm sm:text-base">
                              {item.quantity}
                            </span>
                            
                            <motion.button
                              onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                              className="w-7 sm:w-8 h-7 sm:h-8 flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors"
                              aria-label="Increase quantity"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Plus className="w-3 sm:w-4 h-3 sm:h-4" />
                            </motion.button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <motion.button
                          onClick={() => actions.removeFromCart(item)}
                          className="flex-shrink-0 p-2 text-foreground/40 hover:text-destructive transition-colors"
                          aria-label="Remove item"
                          whileHover={{ scale: 1.2, rotate: 10 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 sm:w-5 h-4 sm:h-5" />
                        </motion.button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <motion.div 
                className="border-t border-foreground/10 p-4 sm:p-6 space-y-3 sm:space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {/* Total */}
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <span className="font-heading text-lg sm:text-xl font-bold uppercase">
                    Total
                  </span>
                  <motion.span 
                    className="font-heading text-xl sm:text-2xl font-bold text-accent"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </motion.span>
                </div>

                {/* Checkout Button */}
                <motion.button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-r from-accent to-[#8A2BE2] text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isCheckingOut ? (
                    <>
                      <motion.div 
                        className="w-4 sm:w-5 h-4 sm:h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      />
                      Processing...
                    </>
                  ) : (
                    <>
                      Checkout
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5" />
                    </>
                  )}
                </motion.button>

                {/* Clear Cart */}
                <motion.button
                  onClick={actions.clearCart}
                  className="w-full px-4 sm:px-6 py-2 sm:py-3 bg-transparent border border-foreground/20 text-foreground/80 font-semibold rounded-full transition-all duration-300 hover:bg-foreground/5 text-sm sm:text-base"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Clear Cart
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
