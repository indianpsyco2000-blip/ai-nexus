import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Package, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Products } from '@/entities';

export default function ProductsPage() {
  const [products, setProducts] = useState<Products[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

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
      <section className="relative w-full max-w-[120rem] mx-auto px-4 sm:px-6 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/3 w-64 sm:w-96 h-64 sm:h-96 bg-highlight/20 rounded-full blur-3xl"
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
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Package className="w-16 sm:w-20 h-16 sm:h-20 text-highlight" strokeWidth={1} />
            </motion.div>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold uppercase mb-4 md:mb-6 px-4"
          >
            Our Products
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/80 mb-6 md:mb-8 px-4"
          >
            Pre-Built Solutions to Accelerate Your Growth
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-sm sm:text-base md:text-lg text-foreground/70 max-w-3xl mx-auto px-4"
          >
            Explore our collection of ready-to-deploy AI agent templates, workflow automation solutions, and custom tools designed to streamline your operations.
          </motion.p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 py-6 md:py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap gap-3 sm:gap-4 justify-center"
        >
          {categories.map((category, i) => (
            <motion.button
              key={category}
              onClick={() => setSelectedCategory(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`px-4 sm:px-6 py-2 sm:py-3 font-semibold rounded-full transition-all duration-300 text-xs sm:text-sm ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-accent to-highlight text-primary-foreground shadow-lg shadow-accent/30'
                  : 'bg-background/50 border border-foreground/20 text-foreground/80 hover:border-accent/50'
              }`}
            >
              {category}
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="w-full max-w-[120rem] mx-auto px-4 sm:px-6 py-12 md:py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="min-h-[600px]"
        >
          {isLoading ? null : filteredProducts.length > 0 ? (
            <motion.div variants={staggerContainer} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  variants={fadeInUp}
                  whileHover={{ y: -10 }}
                  className="group"
                >
                  <Link to={`/product/${product._id}`} className="block h-full">
                    <motion.div 
                      className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-highlight/50 hover:shadow-xl hover:shadow-highlight/20 cursor-pointer"
                      whileHover={{ borderColor: "rgba(50, 224, 196, 0.5)" }}
                    >
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
                      
                      <div className="p-6 flex flex-col h-full">
                        {product.category && (
                          <span className="inline-block px-3 py-1 bg-highlight/20 text-highlight text-sm font-semibold rounded-full mb-4 w-fit">
                            {product.category}
                          </span>
                        )}
                        
                        <h3 className="font-heading text-xl font-bold uppercase mb-3 text-foreground">
                          {product.itemName}
                        </h3>
                        
                        <p className="font-paragraph text-foreground/80 leading-relaxed mb-4 line-clamp-3 flex-grow">
                          {product.itemDescription}
                        </p>

                        {product.features && (
                          <p className="font-paragraph text-sm text-foreground/60 mb-6">
                            {product.features}
                          </p>
                        )}
                        
                        <div className="flex items-center justify-between mt-auto pt-6 border-t border-foreground/10">
                          <div>
                            <p className="font-heading text-sm text-foreground/60 mb-1">Starting at</p>
                          </div>
                          
                          <div className="flex items-center gap-3 text-accent hover:text-highlight transition-colors">
                            <span className="font-heading text-lg font-bold">View Details</span>
                            <ArrowRight className="w-5 h-5" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Link>
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
