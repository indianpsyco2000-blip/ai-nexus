import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Package, Check } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Products } from '@/entities';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Products | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    setIsLoading(true);
    try {
      if (id) {
        const result = await BaseCrudService.getById<Products>('products', id);
        setProduct(result);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (product?._id) {
      await actions.addToCart({
        collectionId: 'products',
        itemId: product._id,
        quantity
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
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
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="w-full max-w-[100rem] mx-auto px-6 py-24 flex items-center justify-center min-h-[60vh]">
          <LoadingSpinner />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <Header />
        <div className="w-full max-w-[100rem] mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <Package className="w-20 h-20 text-foreground/30 mx-auto mb-6" />
            <h1 className="font-heading text-3xl font-bold mb-4">Product Not Found</h1>
            <p className="font-paragraph text-foreground/60 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-highlight text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Products
            </Link>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Breadcrumb */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-6">
        <Link
          to="/products"
          className="inline-flex items-center gap-2 text-accent hover:text-highlight transition-colors font-paragraph font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Products
        </Link>
      </section>

      {/* Product Detail */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12"
        >
          {/* Product Image */}
          <motion.div
            variants={fadeInUp}
            className="flex items-center justify-center"
          >
            {product.itemImage && (
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-background/50 border border-foreground/10">
                <Image
                  src={product.itemImage}
                  alt={product.itemName || 'Product'}
                  className="w-full h-full object-cover"
                  width={600}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
              </div>
            )}
          </motion.div>

          {/* Product Info */}
          <motion.div
            variants={fadeInUp}
            className="flex flex-col justify-center"
          >
            {product.category && (
              <motion.span
                variants={fadeInUp}
                className="inline-block px-4 py-2 bg-highlight/20 text-highlight text-sm font-semibold rounded-full mb-6 w-fit"
              >
                {product.category}
              </motion.span>
            )}

            <motion.h1
              variants={fadeInUp}
              className="font-heading text-4xl md:text-5xl font-bold uppercase mb-6 text-foreground"
            >
              {product.itemName}
            </motion.h1>

            <motion.div
              variants={fadeInUp}
              className="mb-8 pb-8 border-b border-foreground/10"
            >
              <p className="font-heading text-5xl font-bold text-highlight mb-2">
                {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
              </p>
              <p className="font-paragraph text-foreground/60">
                One-time payment
              </p>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="mb-8"
            >
              <h2 className="font-heading text-xl font-bold mb-4">Description</h2>
              <p className="font-paragraph text-lg text-foreground/80 leading-relaxed mb-6">
                {product.itemDescription}
              </p>

              {product.features && (
                <div className="mt-6">
                  <h3 className="font-heading text-lg font-bold mb-4">Key Features</h3>
                  <p className="font-paragraph text-foreground/80 leading-relaxed">
                    {product.features}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Quantity & Add to Cart */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-4"
            >
              <div className="flex items-center gap-4">
                <label className="font-heading font-semibold">Quantity:</label>
                <div className="flex items-center border border-foreground/20 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 hover:bg-foreground/10 transition-colors"
                  >
                    −
                  </button>
                  <span className="px-6 py-2 font-heading font-bold">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-4 py-2 hover:bg-foreground/10 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={addingItemId === product._id}
                className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-highlight text-primary-foreground font-heading font-bold text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {addedToCart ? (
                  <>
                    <Check className="w-6 h-6" />
                    Added to Cart!
                  </>
                ) : addingItemId === product._id ? (
                  <>
                    <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Adding...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-6 h-6" />
                    Add to Cart
                  </>
                )}
              </button>

              <button
                onClick={actions.openCart}
                className="px-8 py-3 border-2 border-accent text-accent font-heading font-bold rounded-full transition-all duration-300 hover:bg-accent/10"
              >
                View Cart
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              variants={fadeInUp}
              className="mt-12 pt-8 border-t border-foreground/10"
            >
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-highlight flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-bold">Secure Checkout</p>
                    <p className="font-paragraph text-sm text-foreground/60">Safe & encrypted</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-highlight flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-heading font-bold">Instant Access</p>
                    <p className="font-paragraph text-sm text-foreground/60">Get started immediately</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Related Products Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16 border-t border-foreground/10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase mb-4">
            Continue Shopping
          </h2>
          <p className="font-paragraph text-foreground/60 text-lg">
            Explore more products from our collection
          </p>
        </motion.div>

        <Link
          to="/products"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-accent to-highlight text-primary-foreground font-heading font-bold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/50"
        >
          View All Products
          <ArrowLeft className="w-5 h-5 rotate-180" />
        </Link>
      </section>

      <Footer />
    </div>
  );
}
