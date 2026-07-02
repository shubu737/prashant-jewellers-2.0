/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Volume2, VolumeX, Sparkles } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { STORE_INFO } from '../data';
import Logo from './Logo';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isSoundEnabled, toggleSound, playLuxuryChime } = useSound();

  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Legacy', id: 'about' },
    { label: 'Collections', id: 'collections' },
    { label: 'Tour', id: 'showroom-tour' },
    { label: 'Rate Desk', id: 'rate-calculator' },
    { label: 'Visit Us', id: 'visit-us' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
    playLuxuryChime();
  };

  return (
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        id="luxury-navbar"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'border-b border-amber-500/20 bg-[#211715] backdrop-blur-xl shadow-lg shadow-black/20 py-3'
            : 'border-b border-amber-500/10 bg-[#211715] py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo Monogram */}
            <div
              className="flex cursor-pointer items-center space-x-2.5"
              onClick={() => handleItemClick('home')}
            >
              <div className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <Logo size="sm" animate={true} />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold tracking-widest uppercase text-white hover:text-amber-400 transition-colors duration-300" style={{ fontFamily: '"Cinzel", serif' }}>
                  Prashant
                </span>
                <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
                  Jewellers
                </span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleItemClick(item.id)}
                  className={`relative font-sans text-xs uppercase tracking-widest transition-colors duration-300 hover:text-amber-400 cursor-pointer ${
                    activeSection === item.id ? 'text-amber-400 font-medium' : 'text-gray-300'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="absolute -bottom-1.5 left-0 right-0 h-[1.5px] bg-gradient-to-r from-amber-500 to-amber-300"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Interactive Settings: Sound & CTAs */}
            <div className="hidden sm:flex items-center space-x-4">
              {/* Sound Toggle */}
              <button
                onClick={toggleSound}
                className="flex items-center justify-center h-9 px-3 rounded-sm border border-[#D4AF37]/30 bg-white/10 text-white hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
                title={isSoundEnabled ? 'Signaling Golden Chimes ON' : 'Turn Golden Chimes ON'}
              >
                {isSoundEnabled ? (
                  <>
                    <Volume2 className="h-4 w-4 mr-1.5 text-amber-400 animate-bounce" />
                    <span className="text-[10px] tracking-widest uppercase font-mono text-amber-400">Chime ON</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-4 w-4 mr-1.5 text-[#6b7280]" />
                    <span className="text-[10px] tracking-widest uppercase font-mono text-[#6b7280]">Chime OFF</span>
                  </>
                )}
              </button>

              <button
                onClick={() => handleItemClick('visit-us')}
                className="relative overflow-hidden border border-amber-500/60 bg-amber-500/10 px-5 py-2 text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-amber-500 hover:text-black cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                Request Quote
              </button>
            </div>

            {/* Mobile & Tablet Toggle */}
            <div className="flex items-center space-x-2.5 lg:hidden">
              <button
                onClick={toggleSound}
                className="flex items-center justify-center h-8 w-8 rounded-sm border border-[#D4AF37]/30 text-white hover:text-amber-400 cursor-pointer"
              >
                {isSoundEnabled ? <Volume2 className="h-3.5 w-3.5 text-amber-400" /> : <VolumeX className="h-3.5 w-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-white hover:text-amber-400 focus:outline-none cursor-pointer"
                aria-label="Toggle Menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Floating Action Header Helper Line */}
      {isScrolled && (
        <div className="fixed top-[65px] left-0 right-0 z-50 h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent" />
      )}

      {/* Mobile Drawer (Glassmorphic Slide-down Overlay) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className={`fixed left-0 right-0 z-40 overflow-hidden border-b border-amber-500/20 bg-white/95 backdrop-blur-2xl shadow-xl lg:hidden transition-all duration-500 ${
              isScrolled ? 'top-[57px]' : 'top-[73px]'
            }`}
          >
            <div className="px-4 pt-4 pb-6 space-y-4">
              <div className="flex flex-col space-y-3">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`text-left font-sans text-xs uppercase tracking-widest py-2 border-b border-[#D4AF37]/10 transition-colors duration-200 hover:text-amber-400 ${
                      activeSection === item.id ? 'text-amber-400 font-semibold' : 'text-[#5A5A5A]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              <div className="flex flex-col space-y-3 pt-2">
                <button
                  onClick={() => handleItemClick('visit-us')}
                  className="w-full text-center border border-amber-400 bg-amber-500/10 px-5 py-3 text-xs uppercase tracking-widest text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300"
                >
                  Request Customized Quote
                </button>
                <div className="text-center text-[10px] tracking-wider text-[#5A5A5A] font-mono">
                  {STORE_INFO.phone} • Rawatbhata Showroom
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
