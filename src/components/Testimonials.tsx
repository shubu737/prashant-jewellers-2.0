/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { TESTIMONIALS } from '../data';
import { useSound } from '../hooks/useSound';

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const { playLuxuryChime } = useSound();

  const handlePrev = () => {
    setIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
    playLuxuryChime();
  };

  const handleNext = () => {
    setIndex((prev) => (prev === TESTIMONIALS.length - 1 ? 0 : prev + 1));
    playLuxuryChime();
  };

  const current = TESTIMONIALS[index];

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden bg-[#050505] py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900"
    >
      {/* Editorial alignment lines */}
      <div className="absolute inset-x-12 top-0 h-[1px] bg-gradient-to-r from-transparent via-[#D4AF37]/15 to-transparent" />

      <div className="mx-auto max-w-5xl">
        <div className="text-center space-y-4 mb-16">
          <span className="font-mono text-[10px] tracking-[0.4em] text-[#D4AF37] uppercase font-semibold">PATRON CORRESPONDENCE</span>
          <h2 className="font-serif text-3.5xl font-light tracking-wide text-white sm:text-5xl">
            Words of Our <span className="font-serif font-bold italic text-[#D4AF37]">Esteemed</span> Patrons
          </h2>
          <div className="mx-auto h-[1px] w-16 bg-[#D4AF37]/30" />
        </div>

        {/* Testimonial Active Display Stage */}
        <div className="relative border border-[#D4AF37]/10 bg-neutral-950/50 p-8 md:p-16 transition-all duration-500">
          {/* Large elegant quote signator */}
          <div className="absolute top-6 left-6 text-[#D4AF37]/10 pointer-events-none">
            <Quote className="h-24 w-24 stroke-[1px]" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center space-y-8">
            {/* Stars rating */}
            <div className="flex items-center space-x-1 justify-center text-[#D4AF37]">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-[#D4AF37]" />
              ))}
            </div>

            {/* Testimonial Core text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={current.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="font-serif text-base sm:text-xl md:text-2xl italic leading-relaxed text-zinc-200"
              >
                "{current.text}"
              </motion.p>
            </AnimatePresence>

            {/* Patron Profile details */}
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex items-center space-x-4 pt-4 border-t border-zinc-900 w-full max-w-sm justify-center"
              >
                <img
                  src={current.image}
                  alt={current.name}
                  className="h-12 w-12 rounded-full object-cover border border-[#D4AF37]/35 grayscale"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left">
                  <div className="font-serif text-sm font-semibold tracking-wide text-white">{current.name}</div>
                  <div className="font-sans text-[10px] tracking-widest text-[#D4AF37] uppercase">{current.role}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation sliders */}
          <div className="absolute bottom-6 right-6 flex items-center space-x-3 z-20">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center border border-zinc-800 bg-neutral-950 text-zinc-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
              aria-label="Previous review"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center border border-zinc-800 bg-neutral-950 text-zinc-400 hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 cursor-pointer"
              aria-label="Next review"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
