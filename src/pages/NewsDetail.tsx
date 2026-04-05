import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { ArrowLeft, Calendar, User, Tag } from 'lucide-react';

export default function NewsDetail() {
  const { slug } = useParams();
  const { t, news, lang } = useApp();
  const post = news.find((n: any) => n.slug === slug);

  if (!post) return <Navigate to="/news" />;

  const newsData = post.translations?.[lang] || post.translations?.['en'] || {};

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-4xl mx-auto px-6">
        <Link to="/news" className="inline-flex items-center gap-2 text-text-secondary hover:text-primary mb-12 transition-colors">
          <ArrowLeft size={18} />
          {t.news.back}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex flex-wrap items-center gap-6 text-text-secondary text-sm mb-8">
            <div className="flex items-center gap-2">
              <Calendar size={16} className="text-primary" />
              {new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'uz' ? 'uz-UZ' : 'ru-RU')}
            </div>
            <div className="flex items-center gap-2">
              <Tag size={16} className="text-primary" />
              {newsData.category}
            </div>
            <div className="flex items-center gap-2">
              <User size={16} className="text-primary" />
              {t.news.author}
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl mb-12 leading-tight">{newsData.title}</h1>

          <div className="aspect-video rounded-3xl overflow-hidden border border-border mb-12">
            <img 
              src={post.image} 
              alt={newsData.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="prose prose-invert prose-primary max-w-none">
            <p className="text-xl text-text-secondary leading-relaxed mb-8 font-medium">
              {newsData.excerpt}
            </p>
            <div className="text-lg text-text-secondary leading-relaxed space-y-6">
              {newsData.content.split('\n').map((para: string, i: number) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-border">
            <h3 className="text-2xl mb-8">{t.news.related}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {news.filter((n: any) => n.id !== post.id).slice(0, 2).map((n: any) => {
                const relatedData = n.translations?.[lang] || n.translations?.['en'] || {};
                return (
                  <Link key={n.id} to={`/news/${n.slug}`} className="group">
                    <div className="aspect-video rounded-xl overflow-hidden mb-4 border border-border">
                      <img src={n.image} alt={relatedData.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" referrerPolicy="no-referrer" />
                    </div>
                    <h4 className="text-lg group-hover:text-primary transition-colors line-clamp-1">{relatedData.title}</h4>
                  </Link>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
