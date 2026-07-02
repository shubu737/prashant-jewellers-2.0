/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ChevronLeft, ChevronRight, MessageSquare, Info, Phone } from 'lucide-react';
import { PRODUCTS, STORE_INFO } from '../data';
import { useSound } from '../hooks/useSound';

interface FeaturedProps {
  onSelectProduct: (product: any) => void;
}

export default function Featured({ onSelectProduct }: FeaturedProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playGlowChime, playLuxuryChime } = useSound();

  const featuredItems = PRODUCTS.filter(p => p.isFeatured);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1));
    playLuxuryChime();
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1));
    playLuxuryChime();
  };

  const activeItem = featuredItems[currentIndex];

  const handleQueryWhatsApp = (pName: string) => {
    playLuxuryChime();
    const text = encodeURIComponent(`Hello Prashant Jewellers, I am interested in viewing the "${pName}" shown in your featured gallery. Could you please share more details or schedule a viewing session at your Rawatbhata showroom?`);
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section
      id="featured"
      className="relative overflow-hidden bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/10"
    >
      {/* Editorial Aesthetic: Thin gold outer ambient frames */}
      <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/20 to-transparent" />

      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row mb-16">
          <div className="text-left space-y-3">
            <div className="flex items-center space-x-2 text-[#D4AF37]">
              <span className="h-px w-8 bg-[#D4AF37]" />
              <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-semibold">EXCLUSIVE EXHIBITION</span>
            </div>
            <h2 className="font-serif text-3.5xl font-light tracking-wide text-[#1A1A1A] sm:text-5xl">
              The <span className="font-serif font-bold italic text-[#D4AF37]">Signature</span> Showpieces
            </h2>
            <p className="font-sans text-xs uppercase tracking-widest text-[#4A4A4A]">
              Hand-picked masterpieces of high-end Rajasthani & Contemporary jewelry.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrev}
              className="flex h-12 w-12 items-center justify-center rounded-none border border-[#D4AF37]/20 bg-white/90 text-[#1A1A1A] hover:border-[#D4AF37]/30 hover:text-[#1A1A1A] transition-all duration-300 cursor-pointer"
              aria-label="Previous Featured Product"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-12 w-12 items-center justify-center rounded-none border border-[#D4AF37]/20 bg-white/90 text-[#1A1A1A] hover:border-[#D4AF37]/30 hover:text-[#1A1A1A] transition-all duration-300 cursor-pointer"
              aria-label="Next Featured Product"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Layout Carousel Block */}
        <div className="relative border border-[#D4AF37]/15 bg-[#F0EDE8] p-6 md:p-12 transition-all duration-500">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 items-center">
            
            {/* Visual stage: Left Column */}
            <div className="relative lg:col-span-6 overflow-hidden aspect-square rounded-sm border border-[#D4AF37]/10 bg-[#ECE6DE] shadow-2xl flex items-center justify-center">
              {/* Dynamic decorative backdrop */}
              <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(212,175,55,0.05), transparent)' }} />

              <AnimatePresence mode="wait">
                <motion.img
                  key={activeItem?.id}
                  src={activeItem?.image}
                  alt={activeItem?.name}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.8 }}
                  className="h-full w-full object-cover object-center relative z-10"
                  referrerPolicy="no-referrer"
                />
              </AnimatePresence>

              {/* Spotlight corner details */}
              <div className="absolute bottom-4 left-4 z-20 flex items-center space-x-2 border border-[#D4AF37]/30 bg-[#1A1A1A]/8 px-3 py-1 rounded-sm">
                <Sparkles className="h-3 w-3 text-[#D4AF37] animate-pulse" />
                <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase">RAWATBHATA SPOTLIGHT</span>
              </div>
            </div>

            {/* Narrative specs: Right Column */}
            <div className="lg:col-span-6 flex flex-col justify-between h-full space-y-6 text-[#1A1A1A]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeItem?.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-6"
                >
                  <div className="flex items-center space-x-3 text-[#D4AF37]">
                    <span className="text-xs font-mono tracking-[0.25em] uppercase border-b border-[#D4AF37]/20 pb-1">
                      Category: {activeItem?.category}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[#D4AF37]" />
                    <span className="text-xs font-mono tracking-[0.25em] text-[#4A4A4A]">
                      Purity Check {activeItem?.purity.includes('91.6') ? '• 22K (916)' : '• Premium'}
                    </span>
                  </div>

                  <h3 className="font-serif text-3xl md:text-4.5xl font-light text-[#1A1A1A] leading-tight">
                    {activeItem?.name}
                  </h3>

                  <p className="font-serif italic text-[#4A4A4A] text-sm md:text-base leading-relaxed">
                    {activeItem?.description}
                  </p>

                  {/* Details Specs Box */}
                  <div className="grid grid-cols-2 gap-4 border-t border-b border-[#D4AF37]/10 py-6">
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A] font-sans block">Metal Details</span>
                      <span className="font-serif text-sm font-semibold text-[#D4AF37]">{activeItem?.purity}</span>
                    </div>
                    {activeItem?.weight && (
                      <div className="space-y-1">
                        <span className="text-[10px] uppercase tracking-wider text-[#4A4A4A] font-sans block">Total Net Weight</span>
                        <span className="font-serif text-sm font-semibold text-[#D4AF37]">{activeItem?.weight}</span>
                      </div>
                    )}
                  </div>

                  {/* Visual non-purchasable badge */}
                  <div className="flex items-center space-x-2 border border-[#D4AF37]/15 bg-[#F7F3EE] p-3 rounded-none">
                    <Info className="h-4 w-4 text-[#D4AF37] flex-shrink-0" />
                    <p className="text-[11px] font-sans text-[#4A4A4A] leading-normal">
                      This signature item is exclusively presented for royal exhibitions and private store previews. No direct checkout available. Custom orders accept personal configuration.
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Action buttons with high micro-interactions */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => handleQueryWhatsApp(activeItem?.name || '')}
                  onMouseEnter={playGlowChime}
                  className="flex-1 flex items-center justify-center space-x-2 border border-[#D4AF37] bg-[#D4AF37] text-black font-semibold text-xs py-4 px-6 uppercase tracking-widest hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Request WhatsApp Proposal</span>
                </button>

                <button
                  onClick={() => onSelectProduct(activeItem)}
                  className="flex-1 border border-[#D4AF37]/10 bg-white/90 text-[#1A1A1A] hover:border-[#D4AF37]/20 hover:bg-[#F0EDE8] hover:text-[#1A1A1A] font-medium text-xs py-4 px-6 uppercase tracking-widest transition-all duration-300 cursor-pointer"
                >
                  Detailed Specification
                </button>
              </div>

            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
