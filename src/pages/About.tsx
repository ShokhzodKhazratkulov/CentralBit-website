import React from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'motion/react';
import { Target, Eye, Shield, Zap, Users, Code2, Database, Cloud, Layers } from 'lucide-react';

export default function About() {
  const { t } = useApp();

  const values = [
    { icon: Zap, title: t.about.values.innovation.title, desc: t.about.values.innovation.desc },
    { icon: Shield, title: t.about.values.reliability.title, desc: t.about.values.reliability.desc },
    { icon: Target, title: t.about.values.simplicity.title, desc: t.about.values.simplicity.desc },
    { icon: Eye, title: t.about.values.industry.title, desc: t.about.values.industry.desc },
  ];

  const techStack = [
    { name: "React", icon: Code2 },
    { name: "Node.js", icon: Layers },
    { name: "PostgreSQL", icon: Database },
    { name: "Docker", icon: Cloud },
    { name: "TypeScript", icon: Code2 },
    { name: "Tailwind CSS", icon: Zap },
  ];

  return (
    <div className="pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* Story Section */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h1 className="text-5xl md:text-7xl mb-8">{t.about.title}</h1>
              <p className="text-xl text-text-secondary leading-relaxed mb-6">
                {t.about.story1}
              </p>
              <p className="text-lg text-text-secondary leading-relaxed">
                {t.about.story2}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative"
            >
              <div className="aspect-square glass rounded-3xl overflow-hidden relative group">
                <img 
                  src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800" 
                  alt="CentralBit Tech" 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="text-center">
                    <div className="text-6xl font-display font-bold text-primary mb-2">2026</div>
                    <div className="text-text-secondary uppercase tracking-widest">{t.about.established}</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mb-32 py-20 bg-background-secondary rounded-3xl px-12 border border-border">
          <h2 className="text-4xl text-center mb-16">{t.about.valuesTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {values.map((value, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mx-auto mb-6">
                  <value.icon size={32} />
                </div>
                <h4 className="text-xl mb-4">{value.title}</h4>
                <p className="text-text-secondary">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Section */}
        <section className="mb-32">
          <h2 className="text-4xl text-center mb-16">{t.about.techTitle}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {techStack.map((tech, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5 }}
                className="glass rounded-2xl p-6 text-center border border-border hover:border-primary transition-all"
              >
                <div className="text-primary mb-4 flex justify-center">
                  <tech.icon size={32} />
                </div>
                <div className="font-bold text-sm">{tech.name}</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section>
          <h2 className="text-4xl text-center mb-16">{t.about.teamTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass rounded-2xl p-8 text-center border border-border hover:border-primary transition-all">
              <div className="w-32 h-32 bg-surface rounded-full mx-auto mb-6 overflow-hidden border-2 border-primary/20">
                <img 
                  src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?auto=format&fit=crop&q=80&w=800" 
                  alt="Founder" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h4 className="text-xl font-bold mb-2">Founder & CEO</h4>
              <p className="text-text-secondary text-sm uppercase tracking-widest">CentralBit Team</p>
            </div>
            {[2, 3].map((i) => (
              <div key={i} className="glass rounded-2xl p-8 text-center border border-border opacity-50">
                <div className="w-24 h-24 bg-surface rounded-full mx-auto mb-6 flex items-center justify-center text-text-secondary">
                  <Users size={40} />
                </div>
                <div className="h-6 w-32 bg-surface rounded mx-auto mb-4" />
                <div className="h-4 w-24 bg-surface rounded mx-auto" />
              </div>
            ))}
          </div>
          <p className="text-center text-text-secondary mt-12 italic">
            {t.about.teamComingSoon}
          </p>
        </section>
      </div>
    </div>
  );
}
