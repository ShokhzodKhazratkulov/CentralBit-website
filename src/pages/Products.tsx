import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Brain, ShieldCheck, Wrench, Leaf, Cpu, ArrowRight, ExternalLink, Globe, ClipboardList } from 'lucide-react';
import { cn } from '../lib/utils';
import { Link } from 'react-router-dom';

const iconMap: any = {
  Brain: Brain,
  ShieldCheck: ShieldCheck,
  Wrench: Wrench,
  Leaf: Leaf,
  Cpu: Cpu,
  Globe: Globe,
  ClipboardList: ClipboardList
};

export default function Products() {
  const { t, products, lang } = useApp();
  const [filter, setFilter] = useState<'all' | 'live' | 'coming-soon'>('all');

  const filteredProducts = products.filter((p: any) => filter === 'all' || p.status === filter);

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl mb-6"
          >
            {t.products.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-xl max-w-2xl mx-auto"
          >
            {t.products.subtitle}
          </motion.p>
        </div>

        {/* Filters */}
        <div className="flex justify-center mb-16">
          <div className="inline-flex bg-surface p-1 rounded-xl border border-border">
            {(['all', 'live', 'coming-soon'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-bold capitalize transition-all",
                  filter === f ? "bg-primary text-background" : "text-text-secondary hover:text-white"
                )}
              >
                {f === 'coming-soon' ? t.products.status.comingSoon : f === 'live' ? t.products.status.live : (lang === 'en' ? 'All' : lang === 'uz' ? 'Barchasi' : 'Все')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product: any, i: number) => {
            const Icon = iconMap[product.icon] || Brain;
            const productData = product.translations?.[lang] || product.translations?.['en'] || {};
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group"
              >
                <div className="h-full glass rounded-2xl p-8 flex flex-col hover:border-primary transition-all">
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
                  <div className="text-xs text-primary font-bold uppercase tracking-widest mb-4 opacity-70">{productData.category}</div>
                  <p className="text-text-secondary mb-8 flex-grow whitespace-pre-wrap line-clamp-6">
                    {productData.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {(productData.features || []).slice(0, 3).map((feature: string, idx: number) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-text-secondary">
                        <div className="w-1 h-1 bg-primary rounded-full" />
                        {feature}
                      </div>
                    ))}
                  </div>

                  <Link 
                    to={`/products/${product.id}`} 
                    className="w-full py-3 bg-surface border border-border text-white font-bold rounded-lg hover:border-primary transition-all flex items-center justify-center gap-2 group/btn"
                  >
                    {t.products.learnMore}
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
