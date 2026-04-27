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
            className="fixed right-0 top-0 h-full w-full sm:w-[480px] bg-background border-l border-foreground/10 shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-foreground/10">
              <div className="flex items-center gap-3">
                <ShoppingCart className="w-6 h-6 text-accent" />
                <h2 className="font-heading text-2xl font-bold uppercase">
                  Cart ({itemCount})
                </h2>
              </div>
              <button
                onClick={actions.closeCart}
                className="p-2 hover:bg-foreground/5 rounded-lg transition-colors"
                aria-label="Close cart"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingCart className="w-20 h-20 text-foreground/20 mb-4" />
                  <p className="font-paragraph text-foreground/60 text-lg mb-2">
                    Your cart is empty
                  </p>
                  <p className="font-paragraph text-foreground/40 text-sm">
                    Add some products to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-xl p-4 group hover:border-accent/30 transition-all"
                    >
                      <div className="flex gap-4">
                        {/* Product Image */}
                        {item.image && (
                          <div className="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                              width={80}
                            />
                          </div>
                        )}

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-heading font-bold text-foreground mb-1 truncate">
                            {item.name}
                          </h3>
                          <p className="font-paragraph text-accent font-semibold mb-3">
                            {formatPrice(item.price, currency ?? DEFAULT_CURRENCY)}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() => actions.updateQuantity(item, Math.max(1, item.quantity - 1))}
                              className="w-8 h-8 flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            
                            <span className="font-paragraph font-semibold w-8 text-center">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => actions.updateQuantity(item, item.quantity + 1)}
                              className="w-8 h-8 flex items-center justify-center bg-foreground/5 hover:bg-foreground/10 rounded-lg transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => actions.removeFromCart(item)}
                          className="flex-shrink-0 p-2 text-foreground/40 hover:text-destructive transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-foreground/10 p-6 space-y-4">
                {/* Total */}
                <div className="flex items-center justify-between mb-6">
                  <span className="font-heading text-xl font-bold uppercase">
                    Total
                  </span>
                  <span className="font-heading text-2xl font-bold text-accent">
                    {formatPrice(totalPrice, currency ?? DEFAULT_CURRENCY)}
                  </span>
                </div>

                {/* Checkout Button */}
                <button
                  onClick={actions.checkout}
                  disabled={isCheckingOut}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-accent to-[#8A2BE2] text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Checkout
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Clear Cart */}
                <button
                  onClick={actions.clearCart}
                  className="w-full px-6 py-3 bg-transparent border border-foreground/20 text-foreground/80 font-semibold rounded-full transition-all duration-300 hover:bg-foreground/5"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
