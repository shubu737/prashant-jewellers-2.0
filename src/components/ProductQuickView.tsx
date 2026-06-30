/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, MessageSquare, BadgeCheck } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data';
import { useSound } from '../hooks/useSound';

interface ProductQuickViewProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductQuickView({ product, onClose }: ProductQuickViewProps) {
  const { playLuxuryChime, playGlowChime } = useSound();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleWhatsAppAction = () => {
    playLuxuryChime();
    const txt = encodeURIComponent(`Hello Prashant Jewellers Rawatbhata team, I saw the beautiful ornament "${product.name}" (${product.purity}) listed in your catalog. May I please request a private high-definition video showcase or coordinate a viewing session?`);
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${txt}`, '_blank');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
        
        {/* Backdrop clicks */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative max-w-3xl w-full border border-[#D4AF37]/20 bg-neutral-950 p-6 md:p-10 shadow-2xl z-10 overflow-hidden"
        >
          {/* Subtle gold spotlight ornament layout */}
          <div className="absolute top-0 right-0 h-24 w-24 bg-[#D4AF37]/5 blur-2xl pointer-events-none" />

          {/* Close button with dynamic micro interaction */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-zinc-500 hover:text-white transition-colors cursor-pointer"
            aria-label="Close details"
          >
            <X className="h-6 w-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Visual preview column */}
            <div className="relative aspect-square overflow-hidden border border-zinc-900 bg-[#080808] flex items-center justify-center">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center relative z-10"
                referrerPolicy="no-referrer"
              />
              {/* Certification Badge overlay */}
              <div className="absolute bottom-3 left-3 z-20 flex items-center space-x-1 border border-[#D4AF37]/45 bg-black/90 px-2 py-0.5 rounded-sm">
                <BadgeCheck className="h-3 w-3 text-[#D4AF37]" />
                <span className="text-[8px] font-mono tracking-widest text-[#D4AF37] uppercase">BIS CERTIFIED 916</span>
              </div>
            </div>

            {/* Narrative specs column */}
            <div className="flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase px-2 py-0.5 border border-[#D4AF37]/20 bg-[#D4AF37]/5 inline-block">
                  {product.category} collection
                </span>

                <h3 className="font-serif text-2xl font-light text-white leading-tight">
                  {product.name}
                </h3>

                <p className="font-serif italic text-zinc-400 text-xs leading-relaxed">
                  {product.description}
                </p>

                {/* Technical data grid */}
                <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-900 py-4 mt-2">
                  <div className="space-y-0.5">
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-sans block">Metal Purity</span>
                    <span className="font-serif text-xs font-semibold text-zinc-200">{product.purity}</span>
                  </div>
                  {product.weight && (
                    <div className="space-y-0.5">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-sans block">Net Weight</span>
                      <span className="font-serif text-xs font-semibold text-zinc-200">{product.weight}</span>
                    </div>
                  )}
                </div>

                {/* Price display with note about live rate adjustments */}
                <div className="pt-2">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-sans block">Estimated Evaluation</span>
                  <div className="flex items-baseline space-x-3.5 mt-1">
                    <span className="font-sans text-xl font-bold tracking-wide text-[#D4AF37]">{product.price}</span>
                    {product.originalPrice && (
                      <span className="font-sans text-xs text-zinc-500 line-through">{product.originalPrice}</span>
                    )}
                  </div>
                  <span className="text-[8px] font-mono text-zinc-500 mt-1 block">
                    * Final rate based on live Rawatbhata daily gold price quotes.
                  </span>
                </div>
              </div>

              {/* Inquiry Action Callouts */}
              <div className="space-y-3.5">
                <button
                  onClick={handleWhatsAppAction}
                  onMouseEnter={playGlowChime}
                  className="w-full flex items-center justify-center space-x-2 border border-[#D4AF37] bg-[#D4AF37] text-black font-semibold text-xs py-3 px-4 uppercase tracking-widest hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.15)]"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Request Live Photo / Inquiry</span>
                </button>
                <button
                  onClick={onClose}
                  className="w-full border border-zinc-800 text-zinc-400 hover:text-white py-2.5 px-4 text-xs font-semibold uppercase tracking-widest transition-colors cursor-pointer"
                >
                  Return to Exhibition Catalog
                </button>
              </div>
            </div>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
