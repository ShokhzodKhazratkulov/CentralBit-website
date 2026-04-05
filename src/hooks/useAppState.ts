import { useState, useEffect, useMemo } from 'react';
import { translations, initialProducts, initialNews } from '../data/content';

export type Language = 'en' | 'uz' | 'ru';

export function useAppState() {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('cb_lang');
    return (saved as Language) || 'en';
  });

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('cb_products');
      const data = saved ? JSON.parse(saved) : initialProducts;
      return Array.isArray(data) ? data : initialProducts;
    } catch (e) {
      return initialProducts;
    }
  });

  const [news, setNews] = useState(() => {
    try {
      const saved = localStorage.getItem('cb_news');
      const data = saved ? JSON.parse(saved) : initialNews;
      return Array.isArray(data) ? data : initialNews;
    } catch (e) {
      return initialNews;
    }
  });

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('cb_messages');
      const data = saved ? JSON.parse(saved) : [];
      return Array.isArray(data) ? data : [];
    } catch (e) {
      return [];
    }
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    return localStorage.getItem('cb_admin_session') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('cb_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('cb_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cb_news', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('cb_messages', JSON.stringify(messages));
  }, [messages]);

  const t = useMemo(() => translations[lang], [lang]);

  const login = (user: string, pass: string) => {
    if (user === 'admin' && pass === 'centralbit2025') {
      setIsAdmin(true);
      localStorage.setItem('cb_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAdmin(false);
    localStorage.removeItem('cb_admin_session');
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all data to defaults? This will delete all your manual changes.')) {
      setProducts(initialProducts);
      setNews(initialNews);
      setMessages([]);
      localStorage.removeItem('cb_products');
      localStorage.removeItem('cb_news');
      localStorage.removeItem('cb_messages');
      window.location.reload();
    }
  };

  const addMessage = (msg: any) => {
    setMessages((prev: any) => [...prev, { ...msg, id: Date.now(), date: new Date().toISOString() }]);
  };

  return useMemo(() => ({
    lang,
    setLang,
    t,
    products,
    setProducts,
    news,
    setNews,
    messages,
    setMessages,
    addMessage,
    resetToDefaults,
    isAdmin,
    login,
    logout
  }), [lang, t, products, news, messages, isAdmin]);
}
