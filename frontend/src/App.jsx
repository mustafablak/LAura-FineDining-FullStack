import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState } from 'react';
import MouseTrail from './MouseTrail';
import Home from './Home';
import Menu from './Menu';
import About from './About';
import Reservation from './Reservation';
import Admin from './Admin';

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Router>
      <div className="bg-[#050608] min-h-screen text-white selection:bg-brand-gold selection:text-black">
        <MouseTrail />
        <nav className="fixed top-0 w-full z-50 bg-[#050608]/90 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <Link to="/" onClick={() => setIsOpen(false)} className="font-serif text-2xl font-bold tracking-widest text-brand-gold hover:scale-105 transition">
              L'AURA
            </Link>
            <div className="hidden md:flex gap-8 text-sm font-semibold tracking-wider text-stone-300 items-center">
              <Link to="/menu" className="hover:text-brand-gold transition">MENU</Link>
              <Link to="/about" className="hover:text-brand-gold transition">ABOUT US</Link>
              <Link to="/reservation" className="hover:text-brand-gold transition">RESERVATION</Link>
            </div>
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="md:hidden text-brand-gold focus:outline-none p-2"
              aria-label="Toggle Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
          {isOpen && (
            <div className="md:hidden absolute top-full left-0 w-full bg-[#0a0a0c] border-b border-white/10 px-6 py-8 flex flex-col gap-6 text-center shadow-2xl animate-fadeIn">
              <Link 
                to="/menu" 
                onClick={() => setIsOpen(false)} 
                className="text-lg font-serif tracking-widest text-stone-200 hover:text-brand-gold transition"
              >
                MENU
              </Link>
              <Link 
                to="/about" 
                onClick={() => setIsOpen(false)} 
                className="text-lg font-serif tracking-widest text-stone-200 hover:text-brand-gold transition"
              >
                ABOUT US
              </Link>
              <Link 
                to="/reservation" 
                onClick={() => setIsOpen(false)} 
                className="text-lg font-serif tracking-widest text-stone-200 hover:text-brand-gold transition"
              >
                RESERVATION
              </Link>
            </div>
          )}
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/about" element={<About />} />
          <Route path="/reservation" element={<Reservation />} />
          <Route path="/secure-login" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;