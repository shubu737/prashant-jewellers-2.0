/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, Phone, MapPin, Sparkles, Scale, Info } from 'lucide-react';
import { Product } from '../types';
import { STORE_INFO } from '../data';
import { useSound } from '../hooks/useSound';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
}

export default function ProductDetailModal({ product, onClose }: ProductDetailModalProps) {
  const { playLuxuryChime } = useSound();

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (product) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [product, onClose]);

  if (!product) return null;

  const handleWhatsAppInquiry = () => {
    playLuxuryChime();
    const text = encodeURIComponent(
      `Hello Prashant Jewellers, I am interested in viewing the "${product.name}" (${product.purity}) from your digital portfolio. Please let me know its direct availability or custom fabrication timelines at your Rawatbhata showroom.`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${text}`, '_blank');
  };

  const handleTelephoneCall = () => {
    playLuxuryChime();
    // Use the first phone number only for a valid tel: link
    const primaryPhone = STORE_INFO.phone.split(',')[0].trim().replace(/\s+/g, '');
    window.open(`tel:${primaryPhone}`, '_self');
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      >
        {/* Background Click to Close */}
        <div className="absolute inset-0 cursor-default" onClick={onClose} />

        {/* Modal Shell */}
        <motion.div
          initial={{ scale: 0.94, y: 15 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.94, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 220 }}
          className="relative w-full max-w-4xl border border-[#D4AF37]/20 bg-neutral-950 p-6 md:p-10 shadow-2xl overflow-y-auto max-h-[90vh]"
        >
          {/* Subtle gold framing corners */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#D4AF37]/40" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#D4AF37]/40" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#D4AF37]/40" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#D4AF37]/40" />

          {/* Close Trigger Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 flex h-10 w-10 items-center justify-center border border-zinc-850 bg-neutral-950 text-zinc-400 hover:text-amber-400 hover:border-amber-400 transition-all duration-300 cursor-pointer"
            aria-label="Close details"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Content Layout */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-center">
            
            {/* Left: Product Image Stage */}
            <div className="md:col-span-5 relative overflow-hidden aspect-square border border-zinc-900 bg-[#0c0c0c] rounded-sm">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-3 left-3 bg-black/85 border border-amber-500/20 px-2.5 py-1 text-[8px] font-mono tracking-widest text-amber-300 uppercase">
                AUTHENTIC PORTRAITURE
              </div>
            </div>

            {/* Right: Specifications & Inquiries */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Category Pill */}
                <div className="flex items-center space-x-2 text-amber-400">
                  <Sparkles className="h-3.5 w-3.5 text-amber-500 animate-pulse" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-mono text-zinc-400">
                    {product.category} Exhibition • Ref ID {product.id.toUpperCase()}
                  </span>
                </div>

                <h2 className="font-serif text-2xl md:text-3.5xl font-light text-white leading-tight">
                  {product.name}
                </h2>

                <div className="flex items-baseline space-x-4">
                  <span className="font-sans text-xl font-bold tracking-wide text-amber-400">
                    Est. Valuation: {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="font-sans text-xs text-zinc-500 line-through">
                      Avg. {product.originalPrice}
                    </span>
                  )}
                </div>

                <p className="font-serif italic text-zinc-300 text-sm md:text-base leading-relaxed border-t border-zinc-901 pt-4">
                  {product.description}
                </p>
              </div>

              {/* Specific Tech Specs list */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-zinc-900 py-5">
                <div className="space-y-1">
                  <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-sans block">Metal Purity Certification</span>
                  <div className="flex items-center space-x-1">
                    <span className="font-serif text-sm font-semibold text-white">{product.purity}</span>
                  </div>
                </div>

                {product.weight && (
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider text-zinc-500 font-sans block">Net Weight Metric</span>
                    <div className="flex items-center space-x-1">
                      <Scale className="h-3.5 w-3.5 text-amber-500" />
                      <span className="font-serif text-sm font-semibold text-white">{product.weight}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Informative non-purchasable disclaimer block */}
              <div className="flex items-start space-x-3 bg-zinc-950 p-4 border border-zinc-900">
                <Info className="h-4.5 w-4.5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-[10px] font-sans font-bold text-white tracking-widest uppercase">CATALOG FOR PRE-VIEWING ONLY</h4>
                  <p className="text-[11px] font-sans text-zinc-400 leading-normal">
                    This ornament resides in closed vault showcases at our flagship retail spot in Rawatbhata, Rajasthan. Immediate billing is completed exclusively on-site or during private digital consultations.
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <button
                  onClick={handleWhatsAppInquiry}
                  className="flex-1 flex items-center justify-center space-x-2 border border-[#D4AF37] bg-[#D4AF37] text-black font-semibold text-xs py-4 px-6 uppercase tracking-widest hover:bg-transparent hover:text-white transition-all duration-300 cursor-pointer shadow-[0_4px_15px_rgba(212,175,55,0.1)]"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp Inquiry</span>
                </button>

                <button
                  onClick={handleTelephoneCall}
                  className="flex-1 flex items-center justify-center space-x-2 border border-zinc-700 bg-neutral-950 text-zinc-200 hover:border-white hover:text-white font-medium text-xs py-4 px-6 uppercase tracking-widest transition-all duration-300 cursor-pointer"
                >
                  <Phone className="h-4 w-4 text-amber-500" />
                  <span>Call Boutique Desk</span>
                </button>
              </div>

              {/* Footer specs */}
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-sans pt-1">
                <span className="flex items-center">
                  <MapPin className="h-3 w-3 text-amber-500 mr-1" /> Rawatbhata Showroom Branch
                </span>
                <span>Established 1957 • BIS 916 Hallmarked</span>
              </div>

            </div>

          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
