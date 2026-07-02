/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Maximize2, X, MessageSquare, Compass } from 'lucide-react';
import { GALLERY_ITEMS, STORE_INFO } from '../data';
import { useSound } from '../hooks/useSound';

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { playLuxuryChime, playGlowChime } = useSound();

  // Close lightbox on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedImage) {
        handleCloseLightbox();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImage]);

  const handleOpenLightbox = (imageUrl: string) => {
    playLuxuryChime();
    setSelectedImage(imageUrl);
  };

  const handleCloseLightbox = () => {
    playLuxuryChime();
    setSelectedImage(null);
  };

  const handleShareOnWhatsApp = (title: string) => {
    playLuxuryChime();
    const text = encodeURIComponent(`Hello Prashant Jewellers, I saw your spectacular gallery image of "${title}" and want to arrange a direct viewing consultation at your showroom in Rawatbhata.`);
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  return (
    <section
      id="gallery"
      className="relative overflow-hidden bg-[#F2F0EF] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/10"
    >
      {/* Background radial glow */}
      <div className="absolute bottom-10 left-12 h-80 w-80 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center space-y-4 mb-20">
          <div className="flex items-center justify-center space-x-2 text-[#D4AF37]">
            <span className="h-px w-8 bg-[#D4AF37]" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-semibold">CRAFTING PROCESS EXPOSÉ</span>
            <span className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3.5xl font-light tracking-wide text-[#050505] sm:text-5xl">
            Atelier <span className="font-serif font-semibold italic text-[#D4AF37]">Exhibition</span>
          </h2>
          <p className="mx-auto max-w-2xl font-serif text-sm italic text-[#5c5c5c]">
            A visual documentation of master goldsmithing, pure mineral cutting, and luxurious studio displays at our flagship boutique.
          </p>
        </div>

        {/* Masonry-Style Grid representation */}
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3">
          {GALLERY_ITEMS.map((item) => (
            <div
              key={item.id}
              className="break-inside-avoid mb-6 relative group overflow-hidden border border-[#D4AF37]/10 bg-[#F7F4F1] p-2.5 transition-all duration-500 hover:border-[#D4AF37]/30 shadow-lg"
            >
              <div className="relative overflow-hidden rounded-sm bg-zinc-900">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  className="w-full object-cover h-auto transition-transform duration-700 group-hover:scale-[1.07]"
                  referrerPolicy="no-referrer"
                />

                {/* Aesthetic Hover Overlay Frame */}
                <div className="absolute inset-0 bg-[#050505]/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 backdrop-blur-[1.5px]">
                  {/* Top-Right action to zoom */}
                  <div className="flex justify-end">
                    <button
                      onClick={() => handleOpenLightbox(item.image)}
                      onMouseEnter={playGlowChime}
                      className="h-10 w-10 flex items-center justify-center border border-[#D4AF37]/30 bg-[#F7F4F1] text-[#050505] hover:bg-[#D4AF37] hover:text-black hover:border-[#D4AF37] transition-all duration-300 cursor-pointer"
                      title="Enlarge luxury photography"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>

                  {/* Bottom descriptive specifications */}
                  <div className="space-y-3.5">
                    <div className="inline-flex items-center space-x-1 border border-amber-400/20 bg-white/90 px-2.5 py-0.5 rounded-full">
                      <Compass className="h-2.5 w-2.5 text-amber-400" />
                      <span className="text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase">{item.category}</span>
                    </div>
                    <h3 className="font-serif text-base text-[#050505] tracking-wide leading-snug">
                      {item.title}
                    </h3>
                    <div className="pt-2 border-t border-zinc-805 flex items-center justify-between">
                      <button
                        onClick={() => handleShareOnWhatsApp(item.title)}
                        className="text-[10px] uppercase tracking-widest text-[#D4AF37] hover:text-[#050505] transition-colors duration-200 flex items-center space-x-1 font-semibold cursor-pointer"
                      >
                        <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp Inquiry
                      </button>
                      <span className="text-[10px] text-zinc-500 font-mono">REEL_#{item.id.replace('g-', '0')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 backdrop-blur-md"
            >
              <div className="absolute top-6 right-6 flex items-center space-x-4">
                <span className="text-[10px] tracking-widest uppercase text-zinc-400 font-mono">Press Esc to close</span>
                <button
                  onClick={handleCloseLightbox}
                  className="flex h-12 w-12 items-center justify-center border border-zinc-800 bg-neutral-950 text-white hover:text-amber-400 hover:border-amber-400 transition-all duration-300 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Box framing */}
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                transition={{ type: 'spring', damping: 25 }}
                className="max-h-[85vh] max-w-5xl overflow-hidden border border-[#D4AF37]/30 bg-neutral-950 p-2.5 shadow-2xl"
              >
                <img
                  src={selectedImage}
                  alt="High Resolution Exhibition View"
                  className="max-h-[75vh] w-auto object-contain object-center"
                  referrerPolicy="no-referrer"
                />
                <div className="mt-3.5 text-center text-xs tracking-widest uppercase text-zinc-400 font-mono">
                  PRASHANT ATELIER SERIES • LIMITED EXHIBITION DISPLAY
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
