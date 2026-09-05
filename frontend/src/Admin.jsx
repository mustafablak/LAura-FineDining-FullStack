import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Admin() {
  // --- GÜVENLİK (GİRİŞ) STATE'LERİ ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [loginError, setLoginError] = useState(false);

  // --- MEVCUT ADMİN STATE'LERİ ---
  const [activeTab, setActiveTab] = useState('menu');
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [editingMenuId, setEditingMenuId] = useState(null);
  
  const [menuForm, setMenuForm] = useState({
    name: '',
    description: '',
    price: '',
    category: 'starters',
    imageUrl: ''
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === 'Laura2026') {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      setPasswordInput('');
    }
  };

  const fetchData = () => {
    if (activeTab === 'reservations') {
      fetch('http://localhost:5025/api/reservations')
        .then(res => res.json())
        .then(data => setReservations(data));
    } else {
      fetch('http://localhost:5025/api/menu')
        .then(res => res.json())
        .then(data => setMenuItems(data));
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [activeTab, isAuthenticated]);

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    const isUpdating = editingMenuId !== null;
    const url = isUpdating 
      ? `http://localhost:5025/api/menu/${editingMenuId}` 
      : 'http://localhost:5025/api/menu';

    try {
      const response = await fetch(url, {
        method: isUpdating ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: editingMenuId || 0,
          ...menuForm,
          price: parseFloat(menuForm.price)
        })
      });

      if (response.ok) {
        setStatusMessage({ text: isUpdating ? 'Ürün güncellendi!' : 'Ürün başarıyla eklendi!', type: 'success' });
        setMenuForm({ name: '', description: '', price: '', category: 'starters', imageUrl: '' });
        setEditingMenuId(null);
        fetchData(); 
        setTimeout(() => setStatusMessage({ text: '', type: '' }), 3000);
      } else {
        setStatusMessage({ text: 'Bir hata oluştu.', type: 'error' });
      }
    } catch (error) {
      setStatusMessage({ text: 'Sunucuya ulaşılamıyor.', type: 'error' });
    }
  };

  const handleEditMenu = (item) => {
    setMenuForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      imageUrl: item.imageUrl
    });
    setEditingMenuId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteMenu = async (id) => {
    if(!window.confirm("Bu ürünü silmek istediğinize emin misiniz?")) return;
    await fetch(`http://localhost:5025/api/menu/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleUpdateReservationStatus = async (reservation, newStatus) => {
    await fetch(`http://localhost:5025/api/reservations/${reservation.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...reservation, status: newStatus })
    });
    fetchData();
  };

  const handleDeleteReservation = async (id) => {
    if(!window.confirm("Bu rezervasyon kaydını silmek istediğinize emin misiniz?")) return;
    await fetch(`http://localhost:5025/api/reservations/${id}`, { method: 'DELETE' });
    fetchData();
  };

  const handleMenuChange = (e) => setMenuForm({ ...menuForm, [e.target.name]: e.target.value });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050608] flex items-center justify-center px-6 font-serif">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md bg-[#0d0d10] p-10 rounded-2xl border border-white/10 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-yellow-500"></div>
          <div className="text-center mb-8">
            <span className="text-yellow-500 font-mono text-xs tracking-[0.3em] uppercase block mb-2">RESTRICTED AREA</span>
            <h2 className="text-3xl text-white">Admin Login</h2>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input 
                type="password" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Yetki Şifresini Girin" 
                className={`w-full p-4 bg-black border ${loginError ? 'border-red-500' : 'border-gray-800'} rounded-lg text-center text-white focus:border-yellow-500 outline-none transition-colors tracking-widest`}
                autoFocus
              />
              {loginError && <p className="text-red-500 text-xs text-center mt-2">Geçersiz şifre, erişim reddedildi.</p>}
            </div>
            
            <button type="submit" className="w-full bg-yellow-500 text-black font-bold py-4 rounded-lg hover:bg-yellow-400 transition-colors uppercase tracking-widest text-sm">
              Sisteme Gir
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050608] text-white pt-24 pb-12 px-6 font-serif">
      <div className="max-w-5xl mx-auto">
        
        <div className="relative mb-10">
          <h1 className="text-4xl text-center text-yellow-500 tracking-widest">YÖNETİM PANELİ</h1>
          <button 
            onClick={() => setIsAuthenticated(false)} 
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 text-sm uppercase tracking-widest transition-colors"
          >
            Çıkış Yap
          </button>
        </div>
        <div className="flex justify-center gap-6 mb-12">
          <button 
            onClick={() => { setActiveTab('menu'); setEditingMenuId(null); setMenuForm({ name: '', description: '', price: '', category: 'starters', imageUrl: '' }); }}
            className={`px-8 py-3 rounded uppercase tracking-widest text-sm transition-colors border ${
              activeTab === 'menu' ? 'bg-yellow-500 text-black border-yellow-500 font-bold' : 'bg-transparent text-gray-400 border-gray-700 hover:border-yellow-500'
            }`}
          >
            MENÜ YÖNETİMİ
          </button>
          <button 
            onClick={() => setActiveTab('reservations')}
            className={`px-8 py-3 rounded uppercase tracking-widest text-sm transition-colors border ${
              activeTab === 'reservations' ? 'bg-yellow-500 text-black border-yellow-500 font-bold' : 'bg-transparent text-gray-400 border-gray-700 hover:border-yellow-500'
            }`}
          >
            REZERVASYONLAR
          </button>
        </div>
        <div className="bg-[#0d0d10] p-8 rounded-2xl border border-white/10 shadow-2xl">
          {activeTab === 'menu' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
              <form onSubmit={handleMenuSubmit} className="space-y-6">
                <h2 className="text-2xl text-yellow-500 mb-6 border-b border-gray-800 pb-2">
                  {editingMenuId ? 'Mevcut Lezzeti Güncelle' : 'Menüye Yeni Lezzet Ekle'}
                </h2>
                
                {statusMessage.text && (
                  <div className={`p-4 rounded ${statusMessage.type === 'success' ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'}`}>
                    {statusMessage.text}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm uppercase">Ürün Adı</label>
                    <input type="text" name="name" required value={menuForm.name} onChange={handleMenuChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-yellow-500 outline-none" />
                  </div>
                  <div>
                    <label className="block text-gray-400 mb-2 text-sm uppercase">Fiyat ($)</label>
                    <input type="number" step="0.01" name="price" required value={menuForm.price} onChange={handleMenuChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-yellow-500 outline-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm uppercase">Kategori</label>
                  <select name="category" value={menuForm.category} onChange={handleMenuChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-yellow-500 outline-none">
                    <option value="starters">Starters & Tapas</option>
                    <option value="mains">Main Courses</option>
                    <option value="desserts">Desserts & Sweets</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm uppercase">Açıklama / İçerik</label>
                  <textarea name="description" required rows="2" value={menuForm.description} onChange={handleMenuChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-yellow-500 outline-none"></textarea>
                </div>

                <div>
                  <label className="block text-gray-400 mb-2 text-sm uppercase">Görsel URL (Unsplash vb.)</label>
                  <input type="url" name="imageUrl" required value={menuForm.imageUrl} onChange={handleMenuChange} className="w-full bg-black border border-gray-800 rounded p-3 text-white focus:border-yellow-500 outline-none" />
                </div>

                <div className="flex gap-4 pt-4">
                  <button type="submit" className="flex-1 bg-yellow-500 text-black font-bold py-3 rounded hover:bg-yellow-400 transition-colors uppercase tracking-widest">
                    {editingMenuId ? 'Değişiklikleri Kaydet' : 'Veritabanına Kaydet'}
                  </button>
                  {editingMenuId && (
                    <button type="button" onClick={() => { setEditingMenuId(null); setMenuForm({ name: '', description: '', price: '', category: 'starters', imageUrl: '' }); }} className="bg-gray-800 text-white font-bold py-3 px-6 rounded hover:bg-gray-700 transition-colors uppercase tracking-widest">
                      İptal
                    </button>
                  )}
                </div>
              </form>
              <div>
                <h2 className="text-2xl text-yellow-500 mb-6 border-b border-gray-800 pb-2">Mevcut Menü Listesi</h2>
                <div className="space-y-4">
                  {menuItems.map(item => (
                    <div key={item.id} className="flex items-center justify-between bg-black/50 p-4 rounded border border-gray-800 hover:border-gray-600 transition">
                      <div className="flex items-center gap-4">
                        <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded" />
                        <div>
                          <h4 className="font-bold">{item.name} <span className="text-yellow-500 ml-2">${item.price}</span></h4>
                          <span className="text-xs text-gray-500 uppercase tracking-widest">{item.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => handleEditMenu(item)} className="text-sm bg-blue-900/40 text-blue-400 px-4 py-2 rounded hover:bg-blue-900/60 transition">Düzenle</button>
                        <button onClick={() => handleDeleteMenu(item.id)} className="text-sm bg-red-900/40 text-red-400 px-4 py-2 rounded hover:bg-red-900/60 transition">Sil</button>
                      </div>
                    </div>
                  ))}
                  {menuItems.length === 0 && <p className="text-gray-500 italic text-sm">Menüde henüz ürün yok.</p>}
                </div>
              </div>
            </motion.div>
          )}
          {activeTab === 'reservations' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h2 className="text-2xl text-yellow-500 mb-6 border-b border-gray-800 pb-2">Gelen Rezervasyon Talepleri</h2>
              
              {reservations.length === 0 ? (
                <p className="text-gray-500 italic">Henüz hiç rezervasyon bulunmuyor.</p>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-800 text-gray-400 text-sm uppercase tracking-wider">
                        <th className="p-4">Tarih / Saat</th>
                        <th className="p-4">Müşteri</th>
                        <th className="p-4">İletişim</th>
                        <th className="p-4">Kişi</th>
                        <th className="p-4 text-center">İşlemler</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservations.map((res) => (
                        <tr key={res.id} className={`border-b border-gray-800/50 transition-colors ${res.status === 'Completed' ? 'bg-green-900/10' : 'hover:bg-white/5'}`}>
                          <td className="p-4 text-yellow-500 font-mono text-sm">
                            {new Date(res.date).toLocaleDateString()} <br/> {res.time}
                          </td>
                          <td className="p-4 font-bold">{res.fullName}</td>
                          <td className="p-4 text-gray-400 text-sm">{res.email}</td>
                          <td className="p-4">{res.guests}</td>
                          <td className="p-4 flex gap-2 justify-center items-center h-full pt-6">
                            {res.status !== 'Completed' ? (
                              <button onClick={() => handleUpdateReservationStatus(res, 'Completed')} className="bg-green-900/40 text-green-400 text-xs px-3 py-1.5 rounded border border-green-900 hover:bg-green-900/60 transition">
                                Onayla
                              </button>
                            ) : (
                              <span className="text-green-500 text-xs font-bold px-3 py-1.5">Tamamlandı ✓</span>
                            )}
                            <button onClick={() => handleDeleteReservation(res.id)} className="bg-red-900/40 text-red-400 text-xs px-3 py-1.5 rounded border border-red-900 hover:bg-red-900/60 transition">
                              Sil
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

        </div>
      </div>
    </div>
  );
}