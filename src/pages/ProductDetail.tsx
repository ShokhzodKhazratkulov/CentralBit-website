import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Brain, ShieldCheck, Wrench, Leaf, Cpu, ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import { cn } from '../lib/utils';

const iconMap: any = {
  Brain: Brain,
  ShieldCheck: ShieldCheck,
  Wrench: Wrench,
  Leaf: Leaf,
  Cpu: Cpu
};

export default function ProductDetail() {
  const { id } = useParams();
  const { t, products, lang } = useApp();
  const product = products.find((p: any) => p.id === id);

  if (!product) return <Navigate to="/products" />;

  const Icon = iconMap[product.icon] || Brain;
  const productData = product.translations?.[lang] || product.translations?.['en'] || {};

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <Link to="/products" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-12 transition-colors">
          <ArrowLeft size={18} />
          {t.products.back}
        </Link>

        <div className="block lg:flow-root">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:float-right lg:w-1/2 lg:ml-12 lg:mb-12 mb-12 space-y-8"
          >
            <div className="aspect-video glass rounded-3xl overflow-hidden border border-border p-2">
              <div className="w-full h-full bg-background-secondary rounded-2xl flex items-center justify-center text-text-secondary/30 border border-border/50">
                <img 
                  src={product.images?.[0] || `https://picsum.photos/seed/${product.id}/800/450`} 
                  alt={productData.name} 
                  className={cn("w-full h-full object-cover", !product.images?.[0] && "opacity-50")}
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="aspect-video glass rounded-2xl overflow-hidden border border-border p-2">
                <div className="w-full h-full bg-background-secondary rounded-xl flex items-center justify-center text-text-secondary/30 border border-border/50">
                  <img 
                    src={product.images?.[1] || `https://picsum.photos/seed/${product.id}-2/400/225`} 
                    alt={productData.name} 
                    className={cn("w-full h-full object-cover", !product.images?.[1] && "opacity-50")}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <div className="aspect-video glass rounded-2xl overflow-hidden border border-border p-2">
                <div className="w-full h-full bg-background-secondary rounded-xl flex items-center justify-center text-text-secondary/30 border border-border/50">
                  <img 
                    src={product.images?.[2] || `https://picsum.photos/seed/${product.id}-3/400/225`} 
                    alt={productData.name} 
                    className={cn("w-full h-full object-cover", !product.images?.[2] && "opacity-50")}
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-8">
              <Icon size={40} />
            </div>
            <div className="flex items-center gap-4 mb-6">
              <h1 className="text-4xl md:text-6xl">{productData.name}</h1>
              <span className={cn(
                "text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full",
                product.status === 'live' ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"
              )}>
                {product.status === 'live' ? t.products.status.live : t.products.status.comingSoon}
              </span>
            </div>
            <div className="text-primary font-bold uppercase tracking-widest mb-8">{productData.category}</div>
            <p className="text-xl text-text-secondary leading-relaxed mb-10 whitespace-pre-wrap">
              {productData.description}
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              {product.status === 'live' ? (
                <button 
                  onClick={() => product.viewLink && window.open(product.viewLink, '_blank')}
                  className={cn(
                    "px-8 py-4 bg-primary text-background font-bold rounded-xl transition-all flex items-center gap-2",
                    product.viewLink ? "hover:glow-box" : "opacity-50 cursor-not-allowed"
                  )}
                  disabled={!product.viewLink}
                >
                  {t.products.viewProduct}
                  <ExternalLink size={18} />
                </button>
              ) : (
                <Link to="/contact" className="px-8 py-4 bg-primary text-background font-bold rounded-xl hover:glow-box transition-all">
                  {t.products.requestDemo}
                </Link>
              )}
            </div>

            <h3 className="text-2xl mb-8">{t.products.keyFeatures}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {productData.features.map((feature: string, i: number) => (
                <div key={i} className="flex items-start gap-3 p-4 glass rounded-xl">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={20} />
                  <span className="text-text-secondary">{feature}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
