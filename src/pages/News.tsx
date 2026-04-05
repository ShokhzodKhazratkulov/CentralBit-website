import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function News() {
  const { t, news, lang } = useApp();

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl mb-6"
          >
            {t.news.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-text-secondary text-xl max-w-2xl mx-auto"
          >
            {t.news.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {news.map((post: any, i: number) => {
            const newsData = post.translations?.[lang] || post.translations?.['en'] || {};
            return (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                  <div className="text-text-secondary text-xs mb-3">
                    {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'uz' ? 'uz-UZ' : 'ru-RU')}
                  </div>
                  <h3 className="text-2xl mb-4 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                    {newsData.title}
                  </h3>
                  <p className="text-text-secondary mb-8 line-clamp-6">
                    {newsData.excerpt}
                  </p>
                  <div className="text-sm font-bold flex items-center gap-2 group-hover:gap-3 transition-all text-primary">
                    {t.news.readMore}
                    <ArrowRight size={16} />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
