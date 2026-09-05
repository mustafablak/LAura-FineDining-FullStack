import { motion } from 'framer-motion';

export default function About() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-brand-dark text-white pt-32 pb-24 px-6 bg-[#050608]"
    >
      <div className="max-w-5xl mx-auto">
        
        <div className="text-center mb-20">
          <span className="text-brand-gold font-mono text-xs tracking-[0.3em] uppercase block mb-3">OUR HERITAGE</span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold">The Story of L'Aura</h1>
          <div className="w-16 h-1 bg-brand-gold mx-auto mt-4"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl font-bold mb-6 text-brand-gold">A Symphony of Flavors</h2>
            <p className="text-stone-300 font-light leading-relaxed mb-6">
              Founded in 2026, L'Aura was born from a singular obsession: to elevate Mediterranean culinary traditions through modern molecular precision. Every dish tells a story of the coastline, soil, and season.
            </p>
            <p className="text-stone-400 font-light text-sm leading-relaxed">
              Our executive chefs curate a symbiotic relationship with local organic producers, ensuring that what reaches your plate is nothing short of absolute perfection.
            </p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="h-[400px] rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative"
          >
            <img src="https://images.unsplash.com/photo-1578474846511-04ba529f0b88?q=80&w=1000" alt="Restaurant Interior" className="w-full h-full object-cover" />
          </motion.div>
        </div>

      </div>
    </motion.div>
  );
}