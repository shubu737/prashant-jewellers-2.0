/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Volume2, VolumeX } from 'lucide-react';
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
    { label: 'Visit Us', id: 'visit-us' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when switching to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleItemClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
    playLuxuryChime();
  };

  const handleMenuToggle = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        id="luxury-navbar"
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          isScrolled
            ? 'border-b border-amber-500/20 bg-[#211715]/95 backdrop-blur-xl shadow-lg shadow-black/20 py-3'
            : 'border-b border-amber-500/10 bg-[#211715] py-5'
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            
            {/* =====================================================
                BRAND LOGO
            ====================================================== */}
            <div
              className="flex cursor-pointer items-center space-x-2.5"
              onClick={() => handleItemClick('home')}
            >
              <div className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <Logo size="sm" animate={true} />
              </div>

              <div className="flex flex-col">
                <span className="font-serif text-lg font-bold tracking-widest uppercase text-white hover:text-amber-400 transition-colors duration-300">
                  Prashant
                </span>

                <span className="text-[10px] tracking-[0.25em] uppercase text-amber-400 font-medium">
                  Jewellers
                </span>
              </div>
            </div>

            {/* =====================================================
                DESKTOP NAVIGATION
            ====================================================== */}
            <div className="hidden lg:flex items-center space-x-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleItemClick(item.id)}
                  className={`relative font-sans text-xs uppercase tracking-widest transition-colors duration-300 hover:text-amber-400 cursor-pointer ${
                    activeSection === item.id
                      ? 'text-amber-400 font-medium'
                      : 'text-gray-300'
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

            {/* =====================================================
                DESKTOP ACTIONS
            ====================================================== */}
            <div className="hidden sm:flex items-center space-x-4">
              
              {/* Sound Toggle */}
              <button
                type="button"
                onClick={toggleSound}
                className="flex items-center justify-center h-9 px-3 rounded-sm border border-[#D4AF37]/30 bg-white/10 text-white hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 cursor-pointer"
                title={
                  isSoundEnabled
                    ? 'Signaling Golden Chimes ON'
                    : 'Turn Golden Chimes ON'
                }
                aria-label={
                  isSoundEnabled
                    ? 'Turn golden chimes off'
                    : 'Turn golden chimes on'
                }
              >
                {isSoundEnabled ? (
                  <>
                    <Volume2 className="h-4 w-4 mr-1.5 text-amber-400 animate-bounce" />

                    <span className="text-[10px] tracking-widest uppercase font-mono text-amber-400">
                      Chime ON
                    </span>
                  </>
                ) : (
                  <>
                    <VolumeX className="h-4 w-4 mr-1.5 text-[#6b7280]" />

                    <span className="text-[10px] tracking-widest uppercase font-mono text-[#6b7280]">
                      Chime OFF
                    </span>
                  </>
                )}
              </button>

              {/* Request Quote */}
              <button
                type="button"
                onClick={() => handleItemClick('visit-us')}
                className="relative overflow-hidden border border-amber-500/60 bg-amber-500/10 px-5 py-2 text-xs uppercase tracking-widest text-white transition-all duration-300 hover:bg-amber-500 hover:text-black cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              >
                Request Quote
              </button>
            </div>

            {/* =====================================================
                MOBILE / TABLET CONTROLS
            ====================================================== */}
            <div className="flex items-center gap-2.5 lg:hidden relative z-[110]">
              
              {/* Mobile Sound Button */}
              <button
                type="button"
                onClick={toggleSound}
                className="flex items-center justify-center h-9 w-9 rounded-sm border border-[#D4AF37]/30 bg-white/5 text-white hover:text-amber-400 hover:border-amber-500/50 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50"
                aria-label={
                  isSoundEnabled
                    ? 'Turn golden chimes off'
                    : 'Turn golden chimes on'
                }
              >
                {isSoundEnabled ? (
                  <Volume2 className="h-4 w-4 text-amber-400" />
                ) : (
                  <VolumeX className="h-4 w-4 text-gray-400" />
                )}
              </button>

              {/* =================================================
                  HAMBURGER MENU BUTTON
              ================================================== */}
              <button
                type="button"
                onClick={handleMenuToggle}
                className="relative z-[110] flex h-9 w-9 items-center justify-center rounded-sm border border-transparent text-white hover:text-amber-400 hover:border-amber-500/30 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400/50 active:scale-95"
                aria-label={isOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {isOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X className="h-6 w-6" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu className="h-6 w-6" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* =========================================================
          SCROLL GOLD LINE
      ========================================================== */}
      {isScrolled && (
        <div className="fixed top-[57px] sm:top-[65px] left-0 right-0 z-[95] h-[1.5px] bg-gradient-to-r from-transparent via-amber-500/40 to-transparent pointer-events-none" />
      )}

      {/* =========================================================
          MOBILE MENU BACKDROP
      ========================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[80] bg-black/40 lg:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* =========================================================
          MOBILE DRAWER
      ========================================================== */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.3,
              ease: 'easeOut',
            }}
            className={`fixed left-0 right-0 z-[90] overflow-y-auto max-h-[calc(100vh-65px)] border-b border-amber-500/20 bg-white/95 backdrop-blur-2xl shadow-2xl lg:hidden ${
              isScrolled
                ? 'top-[57px]'
                : 'top-[73px]'
            }`}
          >
            <div className="px-5 pt-5 pb-7">
              
              {/* Mobile Navigation Links */}
              <div className="flex flex-col">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.id}
                    type="button"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: index * 0.04,
                      duration: 0.2,
                    }}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full text-left font-sans text-xs uppercase tracking-widest py-3.5 border-b border-[#D4AF37]/10 transition-all duration-200 hover:text-amber-500 hover:pl-2 ${
                      activeSection === item.id
                        ? 'text-amber-500 font-semibold'
                        : 'text-[#5A5A5A]'
                    }`}
                  >
                    <span className="flex items-center justify-between">
                      {item.label}

                      {activeSection === item.id && (
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                      )}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Mobile CTA */}
              <div className="flex flex-col space-y-4 pt-6">
                <button
                  type="button"
                  onClick={() => handleItemClick('visit-us')}
                  className="w-full text-center border border-amber-400 bg-amber-500/10 px-5 py-3.5 text-xs uppercase tracking-widest text-amber-500 hover:bg-amber-400 hover:text-black transition-all duration-300 active:scale-[0.98]"
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