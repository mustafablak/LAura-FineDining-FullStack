import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const categoryTabs = [
  { id: 'starters', name: 'Starters & Tapas' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts & Sweets' }
];

export default function Menu() {
  const [activeTab, setActiveTab] = useState('starters');
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetch('http://localhost:5025/api/menu')
      .then(res => res.json())
      .then(data => {
        setMenuItems(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Menü yüklenirken hata oluştu:", err);
        setLoading(false);
      });
  }, []);
  const currentItems = menuItems.filter(
    item => item.category && item.category.toLowerCase() === activeTab
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-[#050608] text-white pt-32 pb-24 px-6"
    >
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <span className="text-brand-gold font-mono text-xs tracking-[0.3em] uppercase block mb-3 text-yellow-500">GASTRONOMIC SELECTIONS</span>
          <h1 className="font-serif text-5xl md:text-7xl font-bold">The Menu</h1>
          <div className="w-16 h-1 bg-yellow-500 mx-auto mt-4"></div>
        </div>
        <div className="flex justify-center gap-4 md:gap-8 mb-16 flex-wrap">
          {categoryTabs.map((cat) => (
            <motion.button
              key={cat.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveTab(cat.id)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === cat.id 
                  ? 'bg-yellow-500 text-black shadow-xl shadow-yellow-500/20' 
                  : 'bg-white/5 text-stone-400 border border-white/10 hover:border-yellow-500/50'
              }`}
            >
              {cat.name}
            </motion.button>
          ))}
        </div>
        {loading && <div className="text-center text-yellow-500 font-serif animate-pulse">Menü yükleniyor...</div>}
        {!loading && currentItems.length === 0 && (
          <div className="text-center text-stone-500 font-serif">
            Bu kategoride henüz ürün bulunmuyor. Admin panelinden ekleyebilirsiniz.
          </div>
        )}
        {!loading && currentItems.length > 0 && (
          <motion.div 
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {currentItems.map((item, index) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                key={item.id || index} 
                className="flex gap-6 p-6 rounded-3xl bg-[#0d0d10] border border-white/10 items-center group hover:border-yellow-500/40 transition-colors shadow-2xl"
              >
                <div className="w-28 h-28 md:w-36 md:h-36 rounded-2xl overflow-hidden flex-shrink-0 relative bg-stone-900">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                  />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-baseline mb-2">
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-yellow-500 transition-colors">{item.name}</h3>
                    <span className="text-yellow-500 font-bold text-lg">${item.price}</span>
                  </div>
                  <p className="text-stone-400 text-xs md:text-sm font-light leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}

      </div>
    </motion.div>
  );
}