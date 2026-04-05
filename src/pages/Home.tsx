import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { ArrowRight, Brain, ShieldCheck, Wrench, Leaf, Cpu, CheckCircle2, Globe, ClipboardList } from 'lucide-react';
import { cn } from '../lib/utils';

const iconMap: any = {
  Brain: Brain,
  ShieldCheck: ShieldCheck,
  Wrench: Wrench,
  Leaf: Leaf,
  Cpu: Cpu,
  Globe: Globe,
  ClipboardList: ClipboardList
};

export default function Home() {
  const { t, products, news, lang } = useApp();
  const [currentProductIndex, setCurrentProductIndex] = React.useState(0);

  useEffect(() => {
    if (products.length === 0) return;
    const interval = setInterval(() => {
      setCurrentProductIndex((prev) => (prev + 1) % products.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [products.length]);

  const currentProduct = products[currentProductIndex];
  const currentProductData = currentProduct?.translations?.[lang] || currentProduct?.translations?.['en'] || {};

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        {/* Background Orbs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse delay-700" />
        <div className="absolute inset-0 grid-pattern opacity-30" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-widest mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              {t.hero.badge}
            </div>
            <h1 className="text-5xl md:text-7xl mb-6 leading-tight">
              {t.hero.title.split(' ').map((word, i) => (
                <span key={i} className={cn(i > 2 ? "text-primary glow-text" : "")}>
                  {word}{' '}
                </span>
              ))}
            </h1>
            <p className="text-xl text-text-secondary mb-10 max-w-lg leading-relaxed">
              {t.hero.subtitle}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/products" className="px-8 py-4 bg-primary text-background font-bold rounded-lg hover:glow-box transition-all flex items-center gap-2 group">
                {t.hero.explore}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="px-8 py-4 bg-surface border border-border text-white font-bold rounded-lg hover:border-primary transition-all">
                {t.hero.contact}
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative z-10 glass rounded-2xl p-4 glow-box animate-float">
              <Link to={`/products/${currentProduct?.id}`} className="bg-background rounded-xl overflow-hidden border border-border aspect-video flex items-center justify-center relative group block">
                <motion.img 
                  key={currentProduct?.id}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1 }}
                  src={currentProduct?.images?.[0] || `https://picsum.photos/seed/${currentProduct?.id}/800/450`} 
                  alt={currentProductData.name} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent opacity-60" />
                <div className="absolute bottom-6 left-6">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-background">
                      {React.createElement(iconMap[currentProduct?.icon] || Brain, { size: 16 })}
                    </div>
                    <span className="font-display font-bold">{currentProductData.name || t.hero.mockupTitle}</span>
                  </div>
                  <div className="flex gap-2">
                    {products.map((_, idx) => (
                      <div 
                        key={idx} 
                        className={cn(
                          "h-1 rounded-full transition-all duration-500",
                          idx === currentProductIndex ? "w-12 bg-primary" : "w-4 bg-white/20"
                        )} 
                      />
                    ))}
                  </div>
                </div>
              </Link>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-32 h-32 border-t-2 border-r-2 border-primary/30 rounded-tr-3xl" />
            <div className="absolute -bottom-10 -left-10 w-32 h-32 border-b-2 border-l-2 border-primary/30 rounded-bl-3xl" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background-secondary border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: t.stats.live, value: "1" },
              { label: t.stats.dev, value: "4" },
              { label: t.stats.languages, value: "3" },
              { label: t.stats.web, value: "100%" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-text-secondary text-sm uppercase tracking-widest">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl mb-6">{t.products.title}</h2>
              <p className="text-text-secondary text-lg">
                {t.products.subtitle}
              </p>
            </div>
            <Link to="/products" className="text-primary font-bold flex items-center gap-2 hover:underline group">
              {t.products.viewAll}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {products.slice(0, 3).map((product: any, i: number) => {
              const Icon = iconMap[product.icon] || Brain;
              const productData = product.translations?.[lang] || product.translations?.['en'] || {};
              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group"
                >
                  <Link to={`/products/${product.id}`} className="block h-full glass rounded-2xl p-8 hover:border-primary transition-all hover:-translate-y-2">
                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-background transition-colors">
                      <Icon size={28} />
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl">{productData.name}</h3>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                        product.status === 'live' ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"
                      )}>
                        {product.status === 'live' ? t.products.status.live : t.products.status.comingSoon}
                      </span>
                    </div>
                    <p className="text-text-secondary mb-8 line-clamp-6 whitespace-pre-wrap">
                      {productData.description}
                    </p>
                    <div className="flex items-center text-sm font-bold text-primary group-hover:gap-3 transition-all">
                      {t.products.learnMore}
                      <ArrowRight size={16} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Section */}
      <section className="py-32 bg-background-secondary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 blur-[150px]" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl mb-6">{t.why.title}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, title: t.why.enterprise.title, desc: t.why.enterprise.desc },
              { icon: Globe, title: t.why.multilingual.title, desc: t.why.multilingual.desc },
              { icon: Cpu, title: t.why.cloud.title, desc: t.why.cloud.desc },
              { icon: CheckCircle2, title: t.why.industry.title, desc: t.why.industry.desc },
            ].map((feature, i) => (
              <div key={i} className="p-6">
                <div className="w-12 h-12 text-primary mb-6">
                  <feature.icon size={48} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl mb-4">{feature.title}</h4>
                <p className="text-text-secondary leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl mb-6">{t.news.title}</h2>
              <p className="text-text-secondary text-lg">
                {t.news.subtitle}
              </p>
            </div>
            <Link to="/news" className="text-primary font-bold flex items-center gap-2 hover:underline group">
              {t.news.viewAll}
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {news.slice(0, 3).map((post: any, i: number) => {
              const newsData = post.translations?.[lang] || post.translations?.['en'] || {};
              return (
                <motion.div
                  key={post.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link to={`/news/${post.slug}`} className="block group">
                    <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 border border-border">
                      <img 
                        src={post.image} 
                        alt={newsData.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-4 left-4 px-3 py-1 bg-primary text-background text-[10px] font-bold uppercase rounded">
                        {newsData.category}
                      </div>
                    </div>
                    <div className="text-text-secondary text-xs mb-3">{new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'uz' ? 'uz-UZ' : 'ru-RU')}</div>
                    <h3 className="text-xl mb-4 group-hover:text-primary transition-colors line-clamp-2">{newsData.title}</h3>
                    <p className="text-text-secondary text-sm line-clamp-6 mb-6">
                      {newsData.excerpt}
                    </p>
                    <div className="text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all">
                      {t.news.readMore}
                      <ArrowRight size={14} />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-5xl mx-auto glass rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/10 to-transparent" />
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl mb-8">{t.cta.title}</h2>
            <Link to="/contact" className="inline-flex px-10 py-5 bg-primary text-background font-bold rounded-xl hover:glow-box transition-all text-lg">
              {t.cta.button}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
