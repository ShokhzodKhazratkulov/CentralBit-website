import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function Contact() {
  const { t, addMessage } = useApp();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage(formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
    setFormData({ name: '', email: '', subject: 'general', message: '' });
  };

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-5xl md:text-7xl mb-8">{t.contact.title}</h1>
            <p className="text-xl text-text-secondary mb-12">
              {t.contact.subtitle}
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{t.contact.info.labels.location}</h4>
                  <p className="text-text-secondary">{t.contact.info.location}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Mail size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{t.contact.info.labels.email}</h4>
                  <p className="text-text-secondary">{t.contact.info.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                  <Send size={24} />
                </div>
                <div>
                  <h4 className="text-lg font-bold mb-1">{t.contact.info.labels.telegram}</h4>
                  <p className="text-text-secondary">{t.contact.info.telegram}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-3xl p-8 md:p-12 border border-border relative"
          >
            <AnimatePresence>
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="absolute inset-0 z-10 bg-surface/90 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center text-center p-8"
                >
                  <div className="w-20 h-20 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={48} />
                  </div>
                  <h3 className="text-3xl mb-4">{t.contact.form.success}</h3>
                  <p className="text-text-secondary mb-8">{t.contact.form.successDesc}</p>
                  <button 
                    onClick={() => setSubmitted(false)}
                    className="px-8 py-3 bg-primary text-background font-bold rounded-xl"
                  >
                    {t.contact.form.another}
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary ml-1">{t.contact.form.name}</label>
                    <input
                      required
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                      placeholder={t.contact.form.placeholders.name}
                    />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-text-secondary ml-1">{t.contact.form.email}</label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all"
                      placeholder={t.contact.form.placeholders.email}
                    />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1">{t.contact.form.subject}</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all appearance-none"
                >
                  <option value="general">{t.contact.form.subjects.general}</option>
                  <option value="demo">{t.contact.form.subjects.demo}</option>
                  <option value="partnership">{t.contact.form.subjects.partnership}</option>
                  <option value="support">{t.contact.form.subjects.support}</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-text-secondary ml-1">{t.contact.form.message}</label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-background border border-border rounded-xl px-4 py-3 focus:border-primary outline-none transition-all resize-none"
                  placeholder={t.contact.form.placeholders.message}
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-primary text-background font-bold rounded-xl hover:glow-box transition-all flex items-center justify-center gap-2"
              >
                {t.contact.form.submit}
                <Send size={18} />
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
