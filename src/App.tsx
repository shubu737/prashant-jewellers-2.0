/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, MessageSquare, ArrowUp, Phone, ShieldCheck } from 'lucide-react';

import Particles from './components/Particles';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import Hero from './components/Hero';
import About from './components/About';
import Founder from './components/Founder';
import Collections from './components/Collections';
import Featured from './components/Featured';
import WhyChooseUs from './components/WhyChooseUs';
import GoldRateEstimator from './components/GoldRateEstimator';
import Testimonials from './components/Testimonials';
import Gallery from './components/Gallery';
import ShowroomTour from './components/ShowroomTour';
import VisitUs from './components/VisitUs';
import Footer from './components/Footer';
import ProductDetailModal from './components/ProductDetailModal';
import ProductQuickView from './components/ProductQuickView';

import { Product } from './types';
import { STORE_INFO } from './data';
import { useSound } from './hooks/useSound';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { playLuxuryChime } = useSound();

  // Luxury loading shimmer overlay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2200);
    return () => clearTimeout(timer);
  }, []);

  // Monitor scrolling to highlight navbar links and show Scroll To Top action
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ['home', 'about', 'collections', 'featured', 'why-us', 'rate-calculator', 'gallery', 'showroom-tour', 'visit-us'];
      const scrollPosition = window.scrollY + 160;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const handleFloatingWhatsApp = () => {
    playLuxuryChime();
    const text = encodeURIComponent(
      `Hello Prashant Jewellers, I am browsing your exquisite digital showroom catalog. I would like to inquire about viewing scheduling and customized jewelry design sessions at your Rawatbhata showroom.`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    playLuxuryChime();
  };

  return (
    <div className="offwhite-theme relative min-h-screen bg-[#F2F0EF] text-[#050505] font-sans antialiased overflow-x-hidden selection:bg-[#D4AF37]/30 selection:text-[#050505] border-4 md:border-8 border-[#D4AF37]/5">
      {/* Luxury loading animation (gold shimmer) */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            id="luxury-loader"
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#211715]"
          >
            {/* Elegant luxury background shimmer elements */}
            <div className="absolute inset-0 bg-[#211715]" />
            
            <div className="relative flex flex-col items-center text-center space-y-6 max-w-sm px-6">
              {/* High-fidelity Brand Monogram Logo with deep pulse aesthetic */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
                className="relative pb-2"
              >
                <Logo size="lg" animate={true} />
              </motion.div>

              <div className="space-y-2">
                <h1 className="font-serif text-3xl font-light tracking-[0.25em] text-white">
                  PRASHANT
                </h1>
                <p className="text-[10px] tracking-[0.4em] text-amber-500 uppercase font-semibold">
                  JEWELLERS • RAWATBHATA
                </p>
              </div>

              {/* Shimmer Progress line */}
              <div className="relative w-48 h-[1.5px] bg-zinc-900 overflow-hidden">
                <motion.div
                  initial={{ left: '-100%' }}
                  animate={{ left: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"
                />
              </div>

              <span className="font-serif text-[11px] italic text-zinc-500 tracking-wider">
                Unveiling 69 Years of Purity...
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Gold Dust particle system background */}
      <Particles />

      {/* Primary Header/Navbar */}
      <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Main Content Sections (with responsive structures) */}
      <main className="relative z-20">
        
        {/* Section 1: Hero */}
        <Hero onExplore={handleNavigate} />

        {/* Section 2: Legacy / About */}
        <About />

        {/* Section 2.5: Founder */}
        <Founder />

        {/* Section 3: Collections (Filtering + Showcase Grid) */}
        <Collections onQuickView={setQuickViewProduct} />

        {/* Section 4: Featured (Showcase details slider) */}
        <Featured onSelectProduct={setSelectedProduct} />

        {/* Section 5: Certifications & Why Choose Us */}
        <WhyChooseUs />

        {/* Section 5.5: Gold & Precious Metals Interactive Estimation Desk */}
        <GoldRateEstimator />

        {/* Section 6: Testimonials slider */}
        <Testimonials />

        {/* Section 7: Craft & Showcase Gallery (Zoom/Lightbox effect) */}
        <Gallery />

        {/* Section 8: Brand Walkthrough Video & Showroom Tour */}
        <ShowroomTour />

        {/* Section 9 & 10: Contact form + Flagship Store Location */}
        <VisitUs />

      </main>

      {/* Section 10: Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Quick View modal for Collections */}
      <ProductQuickView
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Detail specification modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* FLOATING ACTION BUOYANT NAVIGATION CONTROL ACTIONS */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-center space-y-3.5">
        
        {/* Scroll To Top action */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              onClick={handleScrollToTop}
              className="flex h-11 w-11 items-center justify-center border border-[#D4AF37]/35 bg-neutral-950/90 text-amber-400 hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] shadow-xl backdrop-blur-md cursor-pointer transition-all duration-300 rounded-none group"
              title="Return to peak"
            >
              <ArrowUp className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-1" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Floating WhatsApp Action Button for immediate consulting context */}
        <motion.button
          onClick={handleFloatingWhatsApp}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex h-13 w-13 items-center justify-center bg-emerald-600 hover:bg-emerald-500 text-white shadow-2xl pulse rounded-full cursor-pointer transition-colors duration-300 border border-white/25 group relative"
          title="Connect with direct Rawatbhata Sales Representative"
        >
          {/* Subtle pulsating ring */}
          <div className="absolute inset-0 rounded-full border-2 border-emerald-500 animate-ping opacity-60 pointer-events-none group-hover:scale-110" />
          <MessageSquare className="h-6 w-6 relative z-10" />
        </motion.button>

      </div>

    </div>
  );
}
