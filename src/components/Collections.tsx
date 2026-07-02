/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Eye, Star, X, Info, Phone, MessageSquare } from 'lucide-react';
import { PRODUCTS, STORE_INFO } from '../data';
import { Product } from '../types';
import { useSound } from '../hooks/useSound';

interface CollectionsProps {
  onQuickView: (product: Product) => void;
}

type TabType = 'all' | 'gold' | 'diamond' | 'bridal' | 'silver';

export default function Collections({ onQuickView }: CollectionsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const { playGlowChime, playLuxuryChime } = useSound();

  const tabs: { label: string; value: TabType }[] = [
    { label: 'All Jewelry', value: 'all' },
    { label: 'Kundan & Bridal', value: 'bridal' },
    { label: 'Royal Gold', value: 'gold' },
    { label: 'Flawless Diamonds', value: 'diamond' },
    { label: 'Fine Silver', value: 'silver' }
  ];

  const filteredProducts = activeTab === 'all'
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === activeTab);

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    playLuxuryChime();
  };

  return (
    <section
      id="collections"
      className="relative overflow-hidden bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/10"
    >
      {/* Background soft lighting */}
      <div className="absolute top-1/2 left-1/3 h-96 w-96 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="flex items-center justify-center space-x-2 text-amber-400">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">PRASHANT PORTFOLIO</span>
          </div>
          <h2 className="font-serif text-3.5xl font-light tracking-wide text-[#1A1A1A] sm:text-5xl">
            Our Elite <span className="font-serif font-semibold italic text-amber-400">Collections</span>
          </h2>
          <div className="mx-auto h-[1px] w-24 bg-gradient-to-r from-transparent via-amber-400 to-transparent pt-0.5" />
          <p className="mx-auto max-w-2xl font-serif text-sm italic text-[#5A5A5A]">
            Explore meticulously hallmarked gold bangles, precious Polki sets, and flawless diamonds that reflect unparalleled Rajasthani heritage.
          </p>
        </div>

        {/* Categories Tab Bar */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap items-center justify-center gap-2 rounded-full border border-[#D4AF37]/15 bg-[#F0EDE8] p-1.5 shadow-[0_4px_25px_rgba(0,0,0,0.08)] backdrop-blur-xl">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => handleTabChange(tab.value)}
                className={`relative rounded-full px-5 py-2.5 font-sans text-[10px] uppercase tracking-widest font-semibold transition-all duration-300 cursor-pointer ${
                  activeTab === tab.value
                    ? 'text-neutral-950 font-bold z-10'
                    : 'text-[#5A5A5A] hover:text-[#D4AF37]'
                }`}
              >
                <span className="relative z-10">{tab.label}</span>
                {activeTab === tab.value && (
                  <motion.div
                    layoutId="activeCategoryTab"
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.25)]"
                    transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.6 }}
                key={product.id}
                className="group relative overflow-hidden rounded-sm border border-[#D4AF37]/10 bg-[#F0EDE8] p-3 transition-all duration-500 hover:border-[#D4AF37]/30 hover:shadow-[0_0_25px_rgba(212,175,55,0.08)]"
              >
                {/* Product Image Stage */}
                <div className="relative aspect-square overflow-hidden rounded-sm bg-zinc-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Subtle top-left badge if featured */}
                  {product.isFeatured && (
                    <div className="absolute top-3 left-3 flex items-center space-x-1 border border-amber-400/20 bg-white/90 px-2.5 py-1 rounded-full backdrop-blur-sm shadow-md">
                      <Sparkles className="h-2.5 w-2.5 text-amber-400" />
                      <span className="text-[8px] font-mono tracking-widest text-amber-300 uppercase">SIGNATURE</span>
                    </div>
                  )}

                  {/* Dark mask overlay + Quick View on hover */}
                  <div className="absolute inset-0 flex items-center justify-center bg-[#1A1A1A]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-[2px]">
                    <button
                      onClick={() => {
                        playLuxuryChime();
                        onQuickView(product);
                      }}
                      onMouseEnter={playGlowChime}
                      className="flex items-center space-x-2 rounded-sm border border-amber-400 bg-amber-500/10 px-5 py-3 font-sans text-[10px] uppercase tracking-widest text-amber-400 hover:bg-amber-400 hover:text-black transition-all duration-300 cursor-pointer"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Quick View</span>
                    </button>
                  </div>
                </div>

                {/* Details card content */}
                <div className="mt-4 px-2 pb-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase bg-amber-950/20 px-2 py-0.5 border border-amber-500/10">
                      {product.purity.split(' ')[0]} {product.category}
                    </span>
                    <div className="flex items-center space-x-1 text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400" />
                      <span className="text-[10px] font-semibold text-[#5A5A5A]">{product.rating}</span>
                    </div>
                  </div>

                  <h3 className="mt-2.5 font-serif text-sm tracking-wide text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-300 truncate">
                    {product.name}
                  </h3>
                  
                  <div className="mt-2 flex items-baseline justify-between">
                    <span className="font-sans text-sm font-bold tracking-wide text-amber-400">
                      {product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="font-sans text-xs text-zinc-500 line-through">
                        {product.originalPrice}
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
}
