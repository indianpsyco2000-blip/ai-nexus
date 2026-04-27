import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Download, FileText, Calendar } from 'lucide-react';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Resources, BlogPosts } from '@/entities';
import { format } from 'date-fns';

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resources[]>([]);
  const [blogPosts, setBlogPosts] = useState<BlogPosts[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'blog' | 'resources'>('blog');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [resourcesResult, blogResult] = await Promise.all([
        BaseCrudService.getAll<Resources>('resources'),
        BaseCrudService.getAll<BlogPosts>('blogposts')
      ]);
      setResources(resourcesResult.items);
      setBlogPosts(blogResult.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full max-w-[100rem] mx-auto px-6 py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/3 left-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl"
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
            <BookOpen className="w-20 h-20 text-accent" strokeWidth={1} />
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="font-heading text-5xl md:text-7xl font-bold uppercase mb-6"
          >
            Resource Library
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-xl md:text-2xl text-foreground/80 mb-8"
          >
            Knowledge Hub for AI & Automation
          </motion.p>
          <motion.p
            variants={fadeInUp}
            className="font-paragraph text-lg text-foreground/70 max-w-3xl mx-auto"
          >
            Explore our collection of articles, guides, and whitepapers to stay ahead in the world of AI, automation, and digital marketing.
          </motion.p>
        </motion.div>
      </section>

      {/* Tab Navigation */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={() => setActiveTab('blog')}
            className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 ${
              activeTab === 'blog'
                ? 'bg-gradient-to-r from-accent to-highlight text-primary-foreground shadow-lg shadow-accent/30'
                : 'bg-background/50 border border-foreground/20 text-foreground/80 hover:border-accent/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5" />
              Blog Articles
            </div>
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`px-8 py-4 font-semibold rounded-full transition-all duration-300 ${
              activeTab === 'resources'
                ? 'bg-gradient-to-r from-accent to-highlight text-primary-foreground shadow-lg shadow-accent/30'
                : 'bg-background/50 border border-foreground/20 text-foreground/80 hover:border-accent/50'
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              Guides & Whitepapers
            </div>
          </button>
        </motion.div>
      </section>

      {/* Content Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="min-h-[600px]"
        >
          {/* Blog Posts */}
          {activeTab === 'blog' && (
            <>
              {isLoading ? null : blogPosts.length > 0 ? (
                <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post) => (
                    <motion.div
                      key={post._id}
                      variants={fadeInUp}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-accent/50 hover:shadow-xl hover:shadow-accent/20">
                        {post.coverImage && (
                          <div className="relative h-56 overflow-hidden">
                            <Image
                              src={post.coverImage}
                              alt={post.title || 'Blog Post'}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              width={500}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                          </div>
                        )}
                        
                        <div className="p-6">
                          {post.category && (
                            <span className="inline-block px-3 py-1 bg-accent/20 text-accent text-sm font-semibold rounded-full mb-4">
                              {post.category}
                            </span>
                          )}
                          
                          <h3 className="font-heading text-xl font-bold uppercase mb-3 text-foreground line-clamp-2">
                            {post.title}
                          </h3>
                          
                          <p className="font-paragraph text-foreground/80 leading-relaxed mb-4 line-clamp-3">
                            {post.content}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-foreground/10">
                            <div className="flex items-center gap-2 text-sm text-foreground/60">
                              {post.author && (
                                <span className="font-semibold">{post.author}</span>
                              )}
                            </div>
                            {post.publishDate && (
                              <div className="flex items-center gap-2 text-sm text-foreground/60">
                                <Calendar className="w-4 h-4" />
                                {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={fadeInUp} className="text-center py-20">
                  <BookOpen className="w-20 h-20 text-foreground/30 mx-auto mb-6" />
                  <p className="font-paragraph text-foreground/60 text-lg">
                    No blog posts available at the moment.
                  </p>
                </motion.div>
              )}
            </>
          )}

          {/* Resources */}
          {activeTab === 'resources' && (
            <>
              {isLoading ? null : resources.length > 0 ? (
                <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {resources.map((resource) => (
                    <motion.div
                      key={resource._id}
                      variants={fadeInUp}
                      whileHover={{ y: -10 }}
                      className="group"
                    >
                      <div className="relative bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-2xl overflow-hidden h-full transition-all duration-300 hover:border-highlight/50 hover:shadow-xl hover:shadow-highlight/20">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 p-8">
                          {/* Thumbnail */}
                          {resource.thumbnail && (
                            <div className="sm:col-span-1">
                              <div className="relative h-40 sm:h-full rounded-xl overflow-hidden">
                                <Image
                                  src={resource.thumbnail}
                                  alt={resource.title || 'Resource'}
                                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                  width={300}
                                />
                              </div>
                            </div>
                          )}
                          
                          {/* Content */}
                          <div className={resource.thumbnail ? 'sm:col-span-2' : 'sm:col-span-3'}>
                            {resource.resourceType && (
                              <span className="inline-block px-3 py-1 bg-highlight/20 text-highlight text-sm font-semibold rounded-full mb-4">
                                {resource.resourceType}
                              </span>
                            )}
                            
                            <h3 className="font-heading text-2xl font-bold uppercase mb-3 text-foreground">
                              {resource.title}
                            </h3>
                            
                            <p className="font-paragraph text-foreground/80 leading-relaxed mb-6">
                              {resource.description}
                            </p>

                            <div className="flex items-center justify-between">
                              {resource.publicationDate && (
                                <div className="flex items-center gap-2 text-sm text-foreground/60">
                                  <Calendar className="w-4 h-4" />
                                  {format(new Date(resource.publicationDate), 'MMM dd, yyyy')}
                                </div>
                              )}
                              
                              {resource.downloadUrl && (
                                <a
                                  href={resource.downloadUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-highlight to-accent text-primary-foreground font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-highlight/50"
                                >
                                  <Download className="w-4 h-4" />
                                  Download
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div variants={fadeInUp} className="text-center py-20">
                  <FileText className="w-20 h-20 text-foreground/30 mx-auto mb-6" />
                  <p className="font-paragraph text-foreground/60 text-lg">
                    No resources available at the moment.
                  </p>
                </motion.div>
              )}
            </>
          )}
        </motion.div>
      </section>

      {/* Glossary Section */}
      <section className="w-full max-w-[100rem] mx-auto px-6 py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="font-heading text-4xl md:text-6xl font-bold uppercase mb-6">
              AI & Marketing Glossary
            </h2>
            <p className="font-paragraph text-xl text-foreground/80 max-w-3xl mx-auto">
              Essential terminology to navigate the world of AI and automation
            </p>
          </motion.div>

          <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { term: 'AI Agent', definition: 'An autonomous software program that uses artificial intelligence to perform tasks and make decisions on behalf of users.' },
              { term: 'Workflow Automation', definition: 'The use of technology to automate complex business processes and functions beyond just individual tasks.' },
              { term: 'Machine Learning', definition: 'A subset of AI that enables systems to learn and improve from experience without being explicitly programmed.' },
              { term: 'Natural Language Processing', definition: 'AI technology that helps computers understand, interpret, and generate human language.' },
              { term: 'CRM Integration', definition: 'Connecting customer relationship management systems with other tools to streamline data flow and operations.' },
              { term: 'Marketing Automation', definition: 'Software platforms that automate repetitive marketing tasks like email campaigns, social media posting, and lead nurturing.' },
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-background/50 backdrop-blur-lg border border-foreground/10 rounded-xl p-6 hover:border-accent/30 transition-all duration-300"
              >
                <h3 className="font-heading text-lg font-bold uppercase mb-3 text-accent">
                  {item.term}
                </h3>
                <p className="font-paragraph text-sm text-foreground/80 leading-relaxed">
                  {item.definition}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
