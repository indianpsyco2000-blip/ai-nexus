import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Package } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService, useCart, useCurrency, formatPrice, DEFAULT_CURRENCY } from '@/integrations';
import { Products } from '@/entities';
import Cart from '@/components/Cart';

export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { addingItemId, actions } = useCart();
  const { currency } = useCurrency();

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setIsLoading(true);
    try {
      const result = await BaseCrudService.getAll<Products>('products');
      setProducts(result.items);
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[100rem] mx-auto px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/3 w-96 h-96 bg-highlight/20 rounded-full blur-3xl"
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
            <Package className="w-20 h-20 text-highlight" strokeWidth={1} />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-5xl md:text-7xl font-bold uppercase mb-6"
          >
            Our Products
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-xl md:text-2xl text-foreground/80 mb-8"
          >
            Pre-Built Solutions to Accelerate Your Growth
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto"
          >
            Explore our collection of ready-to-deploy AI agent templates, workflow automation solutions, and custom tools designed to streamline your operations.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-4 justify-center"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 font-semibold rounded-full transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-accent to-highlight text-primary-foreground shadow-lg shadow-accent/30'
                  : 'bg-background/50 border border-foreground/20 text-foreground/80 hover:border-accent/50'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="min-h-[600px]"
        >
          {isLoading ? null : filteredProducts.length > 0 ? (
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-highlight/50 hover:shadow-xl hover:shadow-highlight/20">
                    {product.itemImage && (
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={product.itemImage}
                          alt={product.itemName || 'Product'}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          width={500}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                      </div>
                    )}
                    
                    <div className="p-6">
                      {product.category && (
                        <span className="inline-block px-3 py-1 bg-highlight/20 text-highlight text-sm font-semibold rounded-full mb-4">
                          {product.category}
                        </span>
                      )}
                      
                      <h3 className="font-heading text-xl font-bold uppercase mb-3 text-foreground">
                        {product.itemName}
                      </h3>
                      
                      <p className="font-paragraph text-foreground/80 leading-relaxed mb-4 line-clamp-3">
                        {product.itemDescription}
                      </p>

                      {product.features && (
                        <p className="font-paragraph text-sm text-foreground/60 mb-4">
                          {product.features}
                        </p>
                      )}
                      
                      <div className="flex items-center justify-between mt-6 pt-6 border-t border-foreground/10">
                        <div>
                          <p className="font-heading text-2xl font-bold text-highlight">
                            {formatPrice(product.itemPrice || 0, currency ?? DEFAULT_CURRENCY)}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => actions.addToCart({ 
                            collectionId: 'products', 
                            itemId: product._id 
                          })}
                          disabled={addingItemId === product._id}
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-highlight text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-accent/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {addingItemId === product._id ? (
                            <>
                              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              Adding...
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4" />
                              Add to Cart
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div variants={fadeInUp} className="text-center py-20">
              <Package className="w-20 h-20 text-foreground/30 mx-auto mb-6" />
              <p className="font-paragraph text-foreground/60 text-lg">
                {selectedCategory === 'All' 
                  ? 'No products available at the moment.' 
                  : `No products found in ${selectedCategory} category.`}
              </p>
            </motion.div>
          )}
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
