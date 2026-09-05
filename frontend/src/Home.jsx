import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';

export default function Home() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    let { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div className="bg-brand-dark text-white font-sans overflow-x-hidden bg-[#050608] selection:bg-brand-gold selection:text-black">
      
      {/* 1. HERO BÖLÜMÜ */}
      <section className="min-h-screen flex flex-col items-center justify-center relative px-6 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-gold/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80')] bg-cover bg-center opacity-25 blur-[1px]"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#050608] via-[#050608]/70 to-transparent"></div>

        <motion.div 
          initial={{ opacity: 0, y: 50 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 text-center max-w-5xl mx-auto mt-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/5 text-brand-gold tracking-[0.3em] text-xs font-semibold uppercase mb-6 backdrop-blur-md">
            Michelin Guide 2026 • Exceptional Cuisine
          </span>

          <h1 className="font-serif text-6xl md:text-9xl font-bold tracking-tight leading-[0.95] text-transparent bg-clip-text bg-gradient-to-b from-white via-stone-200 to-stone-500 drop-shadow-2xl">
            Culinary Poetry <br />
            <span className="italic font-light text-brand-gold">In Motion</span>
          </h1>

          <p className="mt-8 text-lg md:text-xl text-stone-400 max-w-2xl mx-auto font-light leading-relaxed">
            Where avant-garde molecular science meets ancestral Mediterranean heritage in an immersive sensory journey.
          </p>
          
          <div className="mt-12 flex flex-col sm:flex-row gap-5 justify-center items-center">
            <Link to="/menu">
              <motion.button 
                whileHover={{ scale: 1.03, backgroundColor: "#e6c547" }} 
                whileTap={{ scale: 0.97 }} 
                className="px-9 py-4 bg-brand-gold text-black rounded-full font-bold tracking-widest text-xs uppercase shadow-2xl shadow-brand-gold/30 transition-all cursor-pointer"
              >
                Explore Tasting Menu
              </motion.button>
            </Link>
            <Link to="/reservation">
              <motion.button 
                whileHover={{ scale: 1.03, backgroundColor: "rgba(255,255,255,0.08)" }} 
                whileTap={{ scale: 0.97 }} 
                className="px-9 py-4 border border-white/20 bg-white/5 backdrop-blur-md text-white rounded-full font-bold tracking-widest text-xs uppercase transition-all cursor-pointer"
              >
                Secure a Table
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>
      <section className="py-32 px-6 max-w-7xl mx-auto relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          onMouseMove={handleMouseMove}
          className="relative rounded-[2.5rem] bg-[#0d0d10] border border-white/10 overflow-hidden shadow-2xl group"
        >
          <motion.div
            className="absolute pointer-events-none -inset-px rounded-[2.5rem] opacity-0 group-hover:opacity-100 transition duration-500"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  650px circle at ${mouseX}px ${mouseY}px,
                  rgba(212, 175, 55, 0.12),
                  transparent 80%
                )
              `,
            }}
          />

          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 h-[400px] lg:h-[600px] relative overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=2070" 
                alt="Philosophy" 
                className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-900"
              />
              <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-[#0d0d10] via-transparent to-transparent opacity-80"></div>
            </div>

            <div className="w-full lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col justify-center relative z-10">
              <span className="text-brand-gold font-mono text-xs tracking-widest mb-4">THE SENSORY APEX</span>
              <h3 className="font-serif text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Art on a Plate, <br />Emotion in Every Bite.
              </h3>
              <p className="text-stone-400 leading-relaxed font-light mb-8 text-sm md:text-base">
                Every element on your plate has a pedigree. From wild-foraged coastal herbs to rare 36-month aged artisanal cheeses, we engineer textures that challenge expectations and awaken dormant memories.
              </p>
              <Link to="/about" className="inline-flex items-center text-xs font-bold tracking-[0.2em] text-white hover:text-brand-gold transition gap-3 group/link uppercase">
                Discover Our Heritage 
                <span className="group-hover/link:translate-x-2 transition-transform text-brand-gold">→</span>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-brand-gold font-mono text-xs tracking-widest uppercase">02 / MASTERPIECES</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold mt-2">Signature Creations</h2>
          <p className="text-stone-400 text-sm mt-3">Scroll down to explore our award-winning tasting menu</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            whileHover={{ y: -12, transition: { duration: 0.4 } }}
            className="rounded-[2rem] overflow-hidden bg-[#0d0d10] border border-white/10 group shadow-2xl flex flex-col relative"
          >
            <div className="h-72 overflow-hidden relative">
              <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558030006-450675393462?q=80&w=1931&auto=format&fit=crop')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000"></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent"></div>
              <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-brand-gold font-bold text-xs tracking-widest border border-white/10">
                $120
              </span>
            </div>
            <div className="p-8 flex flex-col flex-grow justify-between relative">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">Miyazaki Wagyu A5</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">Charcoal grilled wagyu tenderloin served with fermented black garlic purée and smoked bone marrow jus.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>PREPARATION: 48 HRS</span>
                <span className="text-brand-gold">CHEF'S CHOICE</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            whileHover={{ y: -12, transition: { duration: 0.4 } }}
            className="rounded-[2rem] overflow-hidden bg-[#0d0d10] border border-white/10 group shadow-2xl flex flex-col relative"
          >
            <div className="h-72 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1556761223-4c4282c73f77?q=80&w=2070" 
                alt="Truffle Tagliatelle" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent"></div>
              <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-brand-gold font-bold text-xs tracking-widest border border-white/10">
                $45
              </span>
            </div>
            <div className="p-8 flex flex-col flex-grow justify-between relative">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">Truffle Tagliatelle</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">Hand-spun egg pasta folded inside a 24-month aged Parmigiano-Reggiano wheel with fresh Umbrian black truffle.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>HAND-MADE DAILY</span>
                <span className="text-brand-gold">SIGNATURE</span>
              </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            whileHover={{ y: -12, transition: { duration: 0.4 } }}
            className="rounded-[2rem] overflow-hidden bg-[#0d0d10] border border-white/10 group shadow-2xl flex flex-col relative"
          >
            <div className="h-72 overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2064" 
                alt="Golden Sphere" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d10] via-transparent to-transparent"></div>
              <span className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-4 py-1.5 rounded-full text-brand-gold font-bold text-xs tracking-widest border border-white/10">
                $35
              </span>
            </div>
            <div className="p-8 flex flex-col flex-grow justify-between relative">
              <div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3 group-hover:text-brand-gold transition-colors">Golden Sphere</h3>
                <p className="text-stone-400 text-sm leading-relaxed font-light">Valrhona dark chocolate ganache, smoked sea salt caramel core, encased entirely in edible 24-karat gold leaf.</p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-xs text-stone-500 font-mono">
                <span>LIMITED EDITION</span>
                <span className="text-brand-gold">DESSERT</span>
              </div>
            </div>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 text-center"
        >
          <Link to="/menu">
            <motion.button 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }} 
              className="px-10 py-4 border border-brand-gold/40 text-brand-gold rounded-full font-bold tracking-[0.2em] text-xs uppercase hover:bg-brand-gold hover:text-black transition-all shadow-lg cursor-pointer"
            >
              Explore Full Gastronomy Menu →
            </motion.button>
          </Link>
        </motion.div>
      </section>
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-20">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="rounded-[2.5rem] bg-gradient-to-r from-brand-gold via-[#e6c547] to-[#b8972e] p-12 md:p-20 text-black text-center relative overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070')] bg-cover bg-center opacity-10 mix-blend-overlay pointer-events-none"></div>
          
          <span className="font-mono text-xs tracking-[0.3em] uppercase font-bold block mb-4 text-black/70">LIMITED SEATING AVAILABLE</span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold tracking-tight mb-6">Reserve Your Table at L'Aura</h2>
          <p className="text-black/80 font-medium max-w-xl mx-auto mb-10 text-sm md:text-base">
            Join us for an unforgettable evening of high gastronomy. Bookings open 30 days in advance.
          </p>
          <Link to="/reservation" className="relative z-30 inline-block">
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }} 
              whileTap={{ scale: 0.95 }}
              className="px-10 py-4 bg-black text-white rounded-full font-bold tracking-[0.2em] text-xs uppercase shadow-2xl transition-all cursor-pointer"
            >
              Book Your Experience Now
            </motion.button>
          </Link>
        </motion.div>
      </section>
      <footer className="bg-black py-16 px-6 border-t border-white/10 text-center md:text-left z-20 relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h2 className="font-serif text-2xl font-bold text-brand-gold tracking-widest mb-4">L'AURA</h2>
            <p className="text-stone-500 text-sm leading-relaxed">Fine Dining & Gastronomy<br/>Michelin Guide Selected 2026</p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-stone-400">
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-1">LOCATION & CONTACT</h3>
            <p>123 Culinary Blvd, Taste City</p>
            <p className="text-brand-gold">reservations@laura.com</p>
            <p>+90 555 000 0000</p>
          </div>
          <div className="flex flex-col gap-3 text-sm text-stone-400">
            <h3 className="text-white font-bold tracking-widest text-xs uppercase mb-1">HOURS OF OPERATION</h3>
            <p>Wednesday — Sunday: 17:00 – 23:30</p>
            <p>Monday — Tuesday: Closed (Private Events)</p>
          </div>
        </div>
      </footer>
      
    </div>
  );
}