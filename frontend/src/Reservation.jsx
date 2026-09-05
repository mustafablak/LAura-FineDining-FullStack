import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function Reservation() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    date: '',
    time: '18:00 - Early Dinner',
    guests: '2 Persons'
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:5025/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true); 
      } else {
        alert("Bir hata oluştu, lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Rezervasyon gönderilirken hata:", error);
      alert("Sunucuya bağlanılamadı.");
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen bg-brand-dark text-white pt-32 pb-24 px-6 bg-[#050608] flex items-center justify-center"
    >
      <div className="max-w-2xl w-full bg-[#0d0d10] border border-white/10 rounded-[2.5rem] p-8 md:p-14 shadow-2xl relative">
        
        <div className="text-center mb-10">
          <span className="text-brand-gold font-mono text-xs tracking-[0.3em] uppercase block mb-2">TABLE BOOKING</span>
          <h1 className="font-serif text-4xl md:text-5xl font-bold">Reserve Your Experience</h1>
        </div>

        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
            <div className="w-16 h-16 bg-brand-gold/20 text-brand-gold rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">✓</div>
            <h3 className="font-serif text-2xl font-bold mb-3">Reservation Confirmed</h3>
            <p className="text-stone-400 text-sm">We look forward to welcoming you at L'Aura. Details have been sent to your email.</p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">Full Name</label>
                <input name="fullName" value={formData.fullName} onChange={handleChange} required type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition" />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">Email Address</label>
                <input name="email" value={formData.email} onChange={handleChange} required type="email" placeholder="mail@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">Date</label>
                <input name="date" value={formData.date} onChange={handleChange} required type="date" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition" />
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">Time</label>
                <select name="time" value={formData.time} onChange={handleChange} className="w-full bg-[#121216] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition">
                  <option>18:00 - Early Dinner</option>
                  <option>20:15 - Prime Time</option>
                  <option>22:00 - Late Seating</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-mono tracking-widest text-stone-400 uppercase mb-2">Guests</label>
                <select name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-[#121216] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-gold transition">
                  <option>2 Persons</option>
                  <option>4 Persons</option>
                  <option>6+ (Private Room)</option>
                </select>
              </div>
            </div>

            <button type="submit" className="w-full py-4 bg-brand-gold text-black rounded-full font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#e6c547] transition shadow-xl cursor-pointer mt-4">
              Complete Reservation
            </button>
          </form>
        )}

      </div>
    </motion.div>
  );
}