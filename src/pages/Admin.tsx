import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { LayoutDashboard, Newspaper, Package, MessageSquare, Settings, LogOut, Plus, Trash2, Edit, Check, X, Eye } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Admin() {
  const { isAdmin, login, logout, products, setProducts, news, setNews, messages, setMessages, t, lang, resetToDefaults } = useApp();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'news' | 'products' | 'messages' | 'settings'>('dashboard');

  const [isNewsModalOpen, setIsNewsModalOpen] = useState(false);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [editingNews, setEditingNews] = useState<any>(null);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  
  const [newsForm, setNewsForm] = useState({
    translations: {
      en: { title: '', category: 'Product Update', excerpt: '', content: '' },
      uz: { title: '', category: 'Product Update', excerpt: '', content: '' },
      ru: { title: '', category: 'Product Update', excerpt: '', content: '' }
    },
    image: 'https://picsum.photos/seed/news/800/400'
  });

  const [productForm, setProductForm] = useState({
    translations: {
      en: { name: '', category: '', description: '', features: '' },
      uz: { name: '', category: '', description: '', features: '' },
      ru: { name: '', category: '', description: '', features: '' }
    },
    icon: 'Package',
    status: 'coming-soon',
    images: [] as string[],
    viewLink: ''
  });

  const [editingLang, setEditingLang] = useState<'en' | 'uz' | 'ru'>('en');

  const [settingsForm, setSettingsForm] = useState({
    siteName: localStorage.getItem('cb_site_name') || 'CentralBit',
    contactEmail: localStorage.getItem('cb_contact_email') || 'info@centralbit.uz'
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(username, password)) {
      setError('');
    } else {
      setError('Invalid credentials');
    }
  };

  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    const newsData = {
      translations: newsForm.translations,
      image: newsForm.image
    };

    if (editingNews) {
      setNews(news.map((n: any) => n.id === editingNews.id ? { ...editingNews, ...newsData } : n));
    } else {
      const newPost = {
        ...newsData,
        id: Date.now().toString(),
        slug: newsForm.translations.en.title.toLowerCase().replace(/ /g, '-'),
        date: new Date().toISOString().split('T')[0]
      };
      setNews([...news, newPost]);
    }
    setIsNewsModalOpen(false);
    setEditingNews(null);
    setNewsForm({
      translations: {
        en: { title: '', category: 'Product Update', excerpt: '', content: '' },
        uz: { title: '', category: 'Product Update', excerpt: '', content: '' },
        ru: { title: '', category: 'Product Update', excerpt: '', content: '' }
      },
      image: 'https://picsum.photos/seed/news/800/400'
    });
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const productData = {
      status: productForm.status,
      icon: productForm.icon,
      images: productForm.images,
      viewLink: productForm.viewLink,
      translations: {
        en: {
          ...productForm.translations.en,
          features: productForm.translations.en.features.split(',').map(f => f.trim())
        },
        uz: {
          ...productForm.translations.uz,
          features: productForm.translations.uz.features.split(',').map(f => f.trim())
        },
        ru: {
          ...productForm.translations.ru,
          features: productForm.translations.ru.features.split(',').map(f => f.trim())
        }
      }
    };

    if (editingProduct) {
      setProducts(products.map((p: any) => p.id === editingProduct.id ? { ...editingProduct, ...productData } : p));
    } else {
      const newProduct = {
        ...productData,
        id: productForm.translations.en.name.toLowerCase().replace(/ /g, '-')
      };
      setProducts([...products, newProduct]);
    }
    setIsProductModalOpen(false);
    setEditingProduct(null);
    setProductForm({
      translations: {
        en: { name: '', category: '', description: '', features: '' },
        uz: { name: '', category: '', description: '', features: '' },
        ru: { name: '', category: '', description: '', features: '' }
      },
      icon: 'Package',
      status: 'coming-soon',
      images: [],
      viewLink: ''
    });
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('cb_site_name', settingsForm.siteName);
    localStorage.setItem('cb_contact_email', settingsForm.contactEmail);
    alert(t.admin.saveSuccess);
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md glass rounded-3xl p-10 border border-border"
        >
          <div className="flex justify-center mb-8">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center font-display font-bold text-3xl text-background">
              CB
            </div>
          </div>
          <h2 className="text-3xl text-center mb-8">{t.admin.login}</h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.username}</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                placeholder="admin"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.password}</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                placeholder="••••••••"
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <button
              type="submit"
              className="w-full py-4 bg-primary text-background font-bold rounded-xl hover:glow-box transition-all"
            >
              {t.admin.loginBtn}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-background-secondary border-r border-border hidden md:flex flex-col">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-10">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-display font-bold text-background">CB</div>
            <span className="font-display font-bold">{t.nav.admin} Panel</span>
          </div>
          <nav className="space-y-2">
            {[
              { id: 'dashboard', label: t.admin.dashboard, icon: LayoutDashboard },
              { id: 'news', label: t.admin.newsManager, icon: Newspaper },
              { id: 'products', label: t.admin.productsManager, icon: Package },
              { id: 'messages', label: t.admin.messages, icon: MessageSquare },
              { id: 'settings', label: t.admin.settings, icon: Settings },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as any)}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                  activeTab === item.id ? "bg-primary/10 text-primary border border-primary/20" : "text-text-secondary hover:text-white hover:bg-surface"
                )}
              >
                <item.icon size={18} />
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="mt-auto p-6 border-t border-border">
          <button onClick={logout} className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-all">
            <LogOut size={18} />
            {t.admin.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-8 overflow-y-auto">
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <h2 className="text-3xl">{t.admin.overview}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: t.admin.totalProducts, value: products.length, icon: Package, color: 'text-primary' },
                { label: t.admin.newsPosts, value: news.length, icon: Newspaper, color: 'text-secondary' },
                { label: t.admin.messages, value: messages.length, icon: MessageSquare, color: 'text-green-500' },
              ].map((stat, i) => (
                <div key={i} className="glass rounded-2xl p-6 border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div className={cn("p-3 rounded-xl bg-surface", stat.color)}>
                      <stat.icon size={24} />
                    </div>
                  </div>
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-text-secondary text-sm">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="glass rounded-2xl p-6 border border-border">
                <h3 className="text-xl mb-6">{t.admin.recentMessages}</h3>
                <div className="space-y-4">
                  {messages.slice(-3).reverse().map((msg: any) => (
                    <div key={msg.id} className="p-4 bg-surface rounded-xl border border-border">
                      <div className="flex justify-between mb-2">
                        <span className="font-bold">{msg.name}</span>
                        <span className="text-xs text-text-secondary">{new Date(msg.date).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'uz' ? 'uz-UZ' : 'ru-RU')}</span>
                      </div>
                      <p className="text-sm text-text-secondary line-clamp-1">{msg.message}</p>
                    </div>
                  ))}
                  {messages.length === 0 && <p className="text-text-secondary text-center py-4">{t.admin.noMessages}</p>}
                </div>
              </div>
              <div className="glass rounded-2xl p-6 border border-border">
                <h3 className="text-xl mb-6">{t.admin.quickActions}</h3>
                <div className="grid grid-cols-2 gap-4">
                  <button onClick={() => setActiveTab('news')} className="p-4 bg-surface rounded-xl border border-border hover:border-primary transition-all text-center">
                    <Plus className="mx-auto mb-2 text-primary" />
                    <span className="text-sm">{t.admin.addNews}</span>
                  </button>
                  <button onClick={() => setActiveTab('products')} className="p-4 bg-surface rounded-xl border border-border hover:border-primary transition-all text-center">
                    <Edit className="mx-auto mb-2 text-primary" />
                    <span className="text-sm">{t.admin.editProducts}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'news' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl">{t.admin.newsManager}</h2>
              <button 
                onClick={() => {
                  setEditingNews(null);
                  setNewsForm({
                    translations: {
                      en: { title: '', category: 'Product Update', excerpt: '', content: '' },
                      uz: { title: '', category: 'Product Update', excerpt: '', content: '' },
                      ru: { title: '', category: 'Product Update', excerpt: '', content: '' }
                    },
                    image: 'https://picsum.photos/seed/news/800/400'
                  });
                  setIsNewsModalOpen(true);
                }}
                className="px-4 py-2 bg-primary text-background font-bold rounded-lg flex items-center gap-2"
              >
                <Plus size={18} />
                {t.admin.addNews}
              </button>
            </div>
            
            <div className="glass rounded-2xl overflow-hidden border border-border">
              <table className="w-full text-left">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-text-secondary">{t.admin.title}</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-text-secondary">{t.admin.date}</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-text-secondary">{t.admin.category}</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-text-secondary">{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {news.map((post: any) => {
                    const newsData = post.translations?.[lang] || post.translations?.['en'] || {};
                    return (
                      <tr key={post.id} className="hover:bg-surface/50 transition-colors">
                        <td className="px-6 py-4 font-medium">{newsData.title}</td>
                        <td className="px-6 py-4 text-text-secondary">{new Date(post.date).toLocaleDateString(lang === 'en' ? 'en-US' : lang === 'uz' ? 'uz-UZ' : 'ru-RU')}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-primary/10 text-primary text-[10px] font-bold uppercase rounded">
                            {newsData.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => {
                                setEditingNews(post);
                                setNewsForm({
                                  translations: {
                                    en: post.translations?.en || { title: '', category: 'Product Update', excerpt: '', content: '' },
                                    uz: post.translations?.uz || { title: '', category: 'Product Update', excerpt: '', content: '' },
                                    ru: post.translations?.ru || { title: '', category: 'Product Update', excerpt: '', content: '' }
                                  },
                                  image: post.image
                                });
                                setIsNewsModalOpen(true);
                              }}
                              className="p-2 text-text-secondary hover:text-primary"
                            >
                              <Edit size={18} />
                            </button>
                            <button 
                              onClick={() => setNews(news.filter((n: any) => n.id !== post.id))}
                              className="p-2 text-text-secondary hover:text-red-500"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* News Modal */}
            {isNewsModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-2xl glass rounded-3xl p-8 border border-border max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl">{editingNews ? `${t.admin.edit} ${t.admin.newsPosts}` : t.admin.addNews}</h3>
                    <div className="flex bg-surface p-1 rounded-lg border border-border">
                      {(['en', 'uz', 'ru'] as const).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setEditingLang(l)}
                          className={cn(
                            "px-3 py-1 rounded text-xs font-bold uppercase transition-all",
                            editingLang === l ? "bg-primary text-background" : "text-text-secondary hover:text-white"
                          )}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setIsNewsModalOpen(false)} className="text-text-secondary hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveNews} className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.title} ({editingLang.toUpperCase()})</label>
                      <input
                        required
                        type="text"
                        value={newsForm.translations[editingLang].title}
                        onChange={(e) => setNewsForm({ 
                          ...newsForm, 
                          translations: {
                            ...newsForm.translations,
                            [editingLang]: { ...newsForm.translations[editingLang], title: e.target.value }
                          }
                        })}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.category} ({editingLang.toUpperCase()})</label>
                        <select
                          value={newsForm.translations[editingLang].category}
                          onChange={(e) => setNewsForm({ 
                            ...newsForm, 
                            translations: {
                              ...newsForm.translations,
                              [editingLang]: { ...newsForm.translations[editingLang], category: e.target.value }
                            }
                          })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                        >
                          <option value="Product Update">Product Update</option>
                          <option value="Company News">Company News</option>
                          <option value="Industry Insights">Industry Insights</option>
                          <option value="Product Launch">Product Launch</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">Image URL</label>
                        <input
                          type="text"
                          value={newsForm.image}
                          onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-secondary ml-1">Excerpt ({editingLang.toUpperCase()})</label>
                      <textarea
                        required
                        rows={2}
                        value={newsForm.translations[editingLang].excerpt}
                        onChange={(e) => setNewsForm({ 
                          ...newsForm, 
                          translations: {
                            ...newsForm.translations,
                            [editingLang]: { ...newsForm.translations[editingLang], excerpt: e.target.value }
                          }
                        })}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none resize-none"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-secondary ml-1">Content ({editingLang.toUpperCase()}) (Markdown supported)</label>
                      <textarea
                        required
                        rows={12}
                        value={newsForm.translations[editingLang].content}
                        onChange={(e) => setNewsForm({ 
                          ...newsForm, 
                          translations: {
                            ...newsForm.translations,
                            [editingLang]: { ...newsForm.translations[editingLang], content: e.target.value }
                          }
                        })}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none resize-y min-h-[200px]"
                      />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setIsNewsModalOpen(false)}
                        className="px-6 py-3 bg-surface border border-border text-white font-bold rounded-xl"
                      >
                        {t.admin.cancel}
                      </button>
                      <button 
                        type="submit"
                        className="px-6 py-3 bg-primary text-background font-bold rounded-xl hover:glow-box transition-all"
                      >
                        {t.admin.save}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'products' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h2 className="text-3xl">{t.admin.productsManager}</h2>
              <button 
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    translations: {
                      en: { name: '', category: '', description: '', features: '' },
                      uz: { name: '', category: '', description: '', features: '' },
                      ru: { name: '', category: '', description: '', features: '' }
                    },
                    icon: 'Package',
                    status: 'coming-soon',
                    images: [],
                    viewLink: ''
                  });
                  setIsProductModalOpen(true);
                }}
                className="px-4 py-2 bg-primary text-background font-bold rounded-lg flex items-center gap-2"
              >
                <Plus size={18} />
                {t.admin.addProduct}
              </button>
            </div>
            <div className="grid grid-cols-1 gap-6">
              {products.map((product: any) => {
                const productData = product.translations?.[lang] || product.translations?.['en'] || {};
                return (
                  <div key={product.id} className="glass rounded-2xl p-6 border border-border flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <Package size={24} />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold">{productData.name}</h4>
                        <p className="text-sm text-text-secondary">{productData.category}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className={cn(
                        "text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded",
                        product.status === 'live' ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"
                      )}>
                        {product.status === 'live' ? t.products.status.live : t.products.status.comingSoon}
                      </div>
                      <div className="flex items-center gap-3">
                        <button 
                          onClick={() => {
                            setEditingProduct(product);
                            setProductForm({
                              translations: {
                                en: {
                                  name: product.translations?.en?.name || '',
                                  category: product.translations?.en?.category || '',
                                  description: product.translations?.en?.description || '',
                                  features: (product.translations?.en?.features || []).join(', ')
                                },
                                uz: {
                                  name: product.translations?.uz?.name || '',
                                  category: product.translations?.uz?.category || '',
                                  description: product.translations?.uz?.description || '',
                                  features: (product.translations?.uz?.features || []).join(', ')
                                },
                                ru: {
                                  name: product.translations?.ru?.name || '',
                                  category: product.translations?.ru?.category || '',
                                  description: product.translations?.ru?.description || '',
                                  features: (product.translations?.ru?.features || []).join(', ')
                                }
                              },
                              icon: product.icon,
                              status: product.status,
                              images: product.images || [],
                              viewLink: product.viewLink || ''
                            });
                            setIsProductModalOpen(true);
                          }}
                          className="p-2 text-text-secondary hover:text-primary"
                        >
                          <Edit size={18} />
                        </button>
                        <button 
                          onClick={() => {
                            if (confirm(t.admin.deleteConfirm)) {
                              setProducts(products.filter((p: any) => p.id !== product.id));
                            }
                          }}
                          className="p-2 text-text-secondary hover:text-red-500"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Product Modal */}
            {isProductModalOpen && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-2xl glass rounded-3xl p-8 border border-border max-h-[90vh] overflow-y-auto"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl">{editingProduct ? t.admin.editProduct : t.admin.addProduct}</h3>
                    <div className="flex bg-surface p-1 rounded-lg border border-border">
                      {(['en', 'uz', 'ru'] as const).map((l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => setEditingLang(l)}
                          className={cn(
                            "px-3 py-1 rounded text-xs font-bold uppercase transition-all",
                            editingLang === l ? "bg-primary text-background" : "text-text-secondary hover:text-white"
                          )}
                        >
                          {l}
                        </button>
                      ))}
                    </div>
                    <button onClick={() => setIsProductModalOpen(false)} className="text-text-secondary hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveProduct} className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.productName} ({editingLang.toUpperCase()})</label>
                        <input
                          required
                          type="text"
                          value={productForm.translations[editingLang].name}
                          onChange={(e) => setProductForm({ 
                            ...productForm, 
                            translations: {
                              ...productForm.translations,
                              [editingLang]: { ...productForm.translations[editingLang], name: e.target.value }
                            }
                          })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.category} ({editingLang.toUpperCase()})</label>
                        <input
                          required
                          type="text"
                          value={productForm.translations[editingLang].category}
                          onChange={(e) => setProductForm({ 
                            ...productForm, 
                            translations: {
                              ...productForm.translations,
                              [editingLang]: { ...productForm.translations[editingLang], category: e.target.value }
                            }
                          })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.status}</label>
                        <select
                          value={productForm.status}
                          onChange={(e) => setProductForm({ ...productForm, status: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                        >
                          <option value="live">{t.products.status.live}</option>
                          <option value="coming-soon">{t.products.status.comingSoon}</option>
                        </select>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.productIcon}</label>
                        <input
                          type="text"
                          value={productForm.icon}
                          onChange={(e) => setProductForm({ ...productForm, icon: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                          placeholder="Brain, Package, ShieldCheck..."
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-bold text-text-secondary ml-1">View Product Link</label>
                        <input
                          type="text"
                          value={productForm.viewLink}
                          onChange={(e) => setProductForm({ ...productForm, viewLink: e.target.value })}
                          className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none"
                          placeholder="https://app.example.com"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.productDescription} ({editingLang.toUpperCase()})</label>
                      <textarea
                        required
                        rows={8}
                        value={productForm.translations[editingLang].description}
                        onChange={(e) => setProductForm({ 
                          ...productForm, 
                          translations: {
                            ...productForm.translations,
                            [editingLang]: { ...productForm.translations[editingLang], description: e.target.value }
                          }
                        })}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none resize-y min-h-[150px]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.productFeatures} ({editingLang.toUpperCase()})</label>
                      <textarea
                        required
                        rows={2}
                        value={productForm.translations[editingLang].features}
                        onChange={(e) => setProductForm({ 
                          ...productForm, 
                          translations: {
                            ...productForm.translations,
                            [editingLang]: { ...productForm.translations[editingLang], features: e.target.value }
                          }
                        })}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none resize-none"
                        placeholder="Feature 1, Feature 2, Feature 3..."
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-text-secondary ml-1">Product Images (Max 3)</label>
                      <div className="grid grid-cols-3 gap-4">
                        {[0, 1, 2].map((i) => (
                          <div key={i} className="relative aspect-video glass rounded-xl border border-dashed border-border flex items-center justify-center overflow-hidden group">
                            {productForm.images[i] ? (
                              <>
                                <img src={productForm.images[i]} className="w-full h-full object-cover" alt={`Product ${i + 1}`} />
                                <button 
                                  type="button"
                                  onClick={() => {
                                    const newImages = [...productForm.images];
                                    newImages.splice(i, 1);
                                    setProductForm({ ...productForm, images: newImages });
                                  }}
                                  className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                >
                                  <Trash2 size={14} />
                                </button>
                              </>
                            ) : (
                              <label className="cursor-pointer flex flex-col items-center gap-2 text-text-secondary hover:text-primary transition-colors">
                                <Plus size={24} />
                                <span className="text-[10px] font-bold uppercase">Upload</span>
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        const newImages = [...productForm.images];
                                        newImages[i] = reader.result as string;
                                        setProductForm({ ...productForm, images: newImages });
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                              </label>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                      <button 
                        type="button"
                        onClick={() => setIsProductModalOpen(false)}
                        className="px-6 py-3 bg-surface border border-border text-white font-bold rounded-xl"
                      >
                        {t.admin.cancel}
                      </button>
                      <button 
                        type="submit"
                        className="px-6 py-3 bg-primary text-background font-bold rounded-xl hover:glow-box transition-all"
                      >
                        {t.admin.save}
                      </button>
                    </div>
                  </form>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'messages' && (
          <div className="space-y-8">
            <h2 className="text-3xl">{t.admin.messages}</h2>
            <div className="glass rounded-2xl overflow-hidden border border-border">
              <table className="w-full text-left">
                <thead className="bg-surface border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-text-secondary">{t.admin.name}</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-text-secondary">{t.admin.title}</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-text-secondary">{t.admin.date}</th>
                    <th className="px-6 py-4 text-sm font-bold uppercase tracking-widest text-text-secondary">{t.admin.actions}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {messages.slice().reverse().map((msg: any) => (
                    <tr key={msg.id} className="hover:bg-surface/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-medium">{msg.name}</div>
                        <div className="text-xs text-text-secondary">{msg.email}</div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-1 bg-surface border border-border text-[10px] font-bold uppercase rounded">
                          {msg.subject}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-text-secondary text-sm">{new Date(msg.date).toLocaleString(lang === 'en' ? 'en-US' : lang === 'uz' ? 'uz-UZ' : 'ru-RU')}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => {
                              setSelectedMessage(msg);
                              setIsMessageModalOpen(true);
                            }}
                            className="p-2 text-text-secondary hover:text-primary"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => {
                              if (confirm(t.admin.deleteConfirm)) {
                                setMessages(messages.filter((m: any) => m.id !== msg.id));
                              }
                            }}
                            className="p-2 text-text-secondary hover:text-red-500"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-text-secondary">{t.admin.noMessages}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Message Modal */}
            {isMessageModalOpen && selectedMessage && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 backdrop-blur-sm">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="w-full max-w-lg glass rounded-3xl p-8 border border-border"
                >
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl">{t.admin.messageDetails}</h3>
                    <button onClick={() => setIsMessageModalOpen(false)} className="text-text-secondary hover:text-white">
                      <X size={24} />
                    </button>
                  </div>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-1">{t.admin.name}</div>
                        <div className="font-medium">{selectedMessage.name}</div>
                      </div>
                      <div>
                        <div className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-1">{t.admin.email}</div>
                        <div className="font-medium">{selectedMessage.email}</div>
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-1">{t.admin.title}</div>
                      <div className="font-medium">{selectedMessage.subject}</div>
                    </div>
                    <div>
                      <div className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-1">{t.admin.date}</div>
                      <div className="font-medium">{new Date(selectedMessage.date).toLocaleString()}</div>
                    </div>
                    <div className="p-4 bg-surface rounded-xl border border-border">
                      <div className="text-xs text-text-secondary font-bold uppercase tracking-widest mb-2">{t.contact.form.message}</div>
                      <p className="text-sm leading-relaxed">{selectedMessage.message}</p>
                    </div>
                    <div className="flex justify-end">
                      <button 
                        onClick={() => setIsMessageModalOpen(false)}
                        className="px-6 py-3 bg-primary text-background font-bold rounded-xl hover:glow-box transition-all"
                      >
                        {t.admin.close}
                      </button>
                    </div>
                  </div>
                </motion.div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <h2 className="text-3xl">{t.admin.settings}</h2>
            <div className="max-w-2xl glass rounded-3xl p-10 border border-border">
              <form onSubmit={handleSaveSettings} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.siteName}</label>
                  <input 
                    type="text" 
                    value={settingsForm.siteName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.contactEmail}</label>
                  <input 
                    type="email" 
                    value={settingsForm.contactEmail}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none" 
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary ml-1">{t.admin.newPassword}</label>
                  <input type="password" placeholder="••••••••" className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none" />
                </div>
                <div className="flex gap-4 pt-4">
                  <button type="submit" className="px-8 py-4 bg-primary text-background font-bold rounded-xl hover:glow-box transition-all">
                    {t.admin.save}
                  </button>
                  <button type="button" className="px-6 py-3 bg-surface border border-border text-white font-bold rounded-xl hover:bg-surface/80 transition-all">
                    {t.admin.updatePassword}
                  </button>
                </div>
              </form>
            </div>

            <div className="max-w-2xl glass rounded-3xl p-10 border border-red-500/30 bg-red-500/5">
              <h3 className="text-xl text-red-500 mb-4 font-bold uppercase tracking-widest">{lang === 'en' ? 'Danger Zone' : lang === 'uz' ? 'Xavfli hudud' : 'Опасная зона'}</h3>
              <p className="text-text-secondary mb-6 text-sm">
                {lang === 'en' ? 'Reset all application data to its initial state. This will delete all your manual changes to products, news, and messages.' : 
                 lang === 'uz' ? 'Barcha ilova ma\'lumotlarini dastlabki holatiga qaytarish. Bu mahsulotlar, yangiliklar va xabarlarga kiritilgan barcha o\'zgarishlarni o\'chirib tashlaydi.' : 
                 'Сбросить все данные приложения в исходное состояние. Это удалит все ваши ручные изменения в продуктах, новостях и сообщениях.'}
              </p>
              <button 
                onClick={resetToDefaults}
                className="px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 transition-all"
              >
                {lang === 'en' ? 'Reset to Defaults' : lang === 'uz' ? 'Dastlabki holatga qaytarish' : 'Сбросить до настроек по умолчанию'}
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
