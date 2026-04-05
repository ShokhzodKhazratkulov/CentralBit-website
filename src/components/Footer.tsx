import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Github, Linkedin, Send } from 'lucide-react';

export default function Footer() {
  const { t } = useApp();

  return (
    <footer className="bg-background border-t border-border pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center font-display font-bold text-background">
                CB
              </div>
              <span className="font-display font-bold text-xl tracking-tight">CentralBit</span>
            </Link>
            <p className="text-text-secondary max-w-sm mb-8">
              {t.footer.tagline}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="p-2 bg-surface rounded-lg border border-border text-text-secondary hover:text-primary hover:border-primary transition-all">
                <Linkedin size={20} />
              </a>
              <a href="#" className="p-2 bg-surface rounded-lg border border-border text-text-secondary hover:text-primary hover:border-primary transition-all">
                <Github size={20} />
              </a>
              <a href="#" className="p-2 bg-surface rounded-lg border border-border text-text-secondary hover:text-primary hover:border-primary transition-all">
                <Send size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6 uppercase text-xs tracking-widest text-primary">{t.footer.navigation}</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-text-secondary hover:text-white transition-colors">{t.nav.home}</Link></li>
              <li><Link to="/products" className="text-text-secondary hover:text-white transition-colors">{t.nav.products}</Link></li>
              <li><Link to="/news" className="text-text-secondary hover:text-white transition-colors">{t.nav.news}</Link></li>
              <li><Link to="/about" className="text-text-secondary hover:text-white transition-colors">{t.nav.about}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold mb-6 uppercase text-xs tracking-widest text-primary">{t.footer.contact}</h4>
            <ul className="space-y-4">
              <li className="text-text-secondary">{t.contact.info.location}</li>
              <li className="text-text-secondary">{t.contact.info.email}</li>
              <li className="text-text-secondary">{t.contact.info.telegram}</li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © 2025 CentralBit. {t.footer.rights}
          </p>
          <div className="flex items-center gap-6">
            <Link to="/admin" className="text-text-secondary text-sm hover:text-primary">Admin Access</Link>
            <Link to="#" className="text-text-secondary text-sm hover:text-primary">Privacy Policy</Link>
            <Link to="#" className="text-text-secondary text-sm hover:text-primary">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
