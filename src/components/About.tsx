/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Compass, Heart, Sparkles } from 'lucide-react';
import { STORE_INFO } from '../data';

export default function About() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/10"
    >
      {/* Background shadows and glows */}
      <div className="absolute top-1/4 -left-64 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-64 h-[500px] w-[500px] rounded-full bg-amber-400/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
          
          {/* Left Column: Intricate double image frame */}
          <div className="relative lg:col-span-6 pb-10">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="relative aspect-4/5 w-full overflow-hidden rounded-sm border border-[#D4AF37]/10 bg-[#F0EDE8] shadow-2xl"
            >
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=800&q=80"
                alt="Jewellery Artisan Workshop in Rajasthan"
                className="h-full w-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-[2000ms]"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/80 via-transparent to-transparent" />
            </motion.div>

            {/* Overlapping Absolute Card: 3 Decades of Pride */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
              className="absolute -bottom-8 -right-4 sm:-right-8 z-20 max-w-xs rounded-sm border border-amber-500/35 bg-[#1A1A1A] p-6 shadow-2xl backdrop-blur-md"
            >
              <div className="flex flex-col space-y-2">
                <div className="flex items-center space-x-2.5">
                  <Award className="h-5 w-5 text-amber-400" />
                  <span className="font-serif text-sm font-semibold tracking-wider text-amber-300 uppercase">
                    3 Decades of Purity
                  </span>
                </div>
                <p className="font-sans text-xs leading-relaxed text-[#D4AF37]/80">
                  Prashant Jewellers is a registered brand serving Rajasthani royalty and families in Rawatbhata since {STORE_INFO.foundedYear}.
                </p>
                <div className="mt-2 text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold border-t border-zinc-805 pt-2">
                  100% Hallmark Guarantee
                </div>
              </div>
            </motion.div>

            {/* Micro decorative coordinates marker */}
            <div className="absolute -top-6 left-6 hidden font-mono text-[9px] tracking-widest uppercase text-zinc-600 sm:block">
              Loc: Rawatbhata Rajasthan • 24.9642° N, 75.6721° E
            </div>
          </div>

          {/* Right Column: Narrative story + animated lists */}
          <div className="lg:col-span-6 space-y-8 lg:pl-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-4"
            >
              <div className="flex items-center space-x-2 text-amber-400">
                <div className="h-[1px] w-6 bg-amber-500" />
                <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">OUR INHERITANCE</span>
              </div>
              <h2 className="font-serif text-3xl font-light tracking-wide text-[#1A1A1A] sm:text-4.5xl leading-tight">
                Crafting Legacies of <br />
                <span className="font-serif font-semibold italic text-amber-400">
                  Trust & Elegance
                </span>
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-6 font-serif text-[#4A4A4A] leading-relaxed text-sm sm:text-base"
            >
              <p>
                For over thirty years, <strong className="text-[#1A1A1A]">Prashant Jewellers</strong> has remained Rawatbhata's most trusted home of bespoke gold ornaments and certified diamonds. Founded with a vision to provide authentic, highly artistic Indian jewelry, we combine generational Rajasthani goldsmith techniques with contemporary designs.
              </p>
              <p className="font-sans text-xs leading-relaxed text-[#4A4A4A] uppercase tracking-wider">
                "We believe every piece tells a deep emotional story—of commitment, celebrations, and enduring inheritances. Our gold is not just an asset; it is an intimate work of soul."
              </p>
            </motion.div>

            {/* Mini core values grid */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2 pt-4 border-t border-[#D4AF37]/20"
            >
              <div className="flex items-start space-x-3.5">
                <div className="mt-1 flex h-6 w-6 items-center justify-center rounded-sm bg-amber-500/10 text-amber-400">
                  <Compass className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-[#1A1A1A]">Honest Gold Valuations</h4>
                <p className="font-sans text-xs text-[#4A4A4A] mt-1">Live market benchmark rates with clear invoices detailing weight and work margins.</p>
                </div>
                <div>
                  <h4 className="font-serif text-sm font-semibold tracking-wide text-[#1A1A1A]">Bespoke Artisan Tailoring</h4>
                  <p className="font-sans text-xs text-[#4A4A4A] mt-1">Work step-by-step with master-smiths to draft customizable templates for your wedding day.</p>
                </div>
              </div>
            </motion.div>

            {/* Signature sign-off */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex items-center space-x-4 pt-4"
            >
              <div className="h-10 w-10 overflow-hidden rounded-full border border-amber-500/40 bg-[#F0EDE8]">
                <div className="flex h-full w-full items-center justify-center font-serif text-sm font-bold text-[#D4AF37]">PS</div>
              </div>
              <div>
                <div className="font-serif text-xs font-semibold tracking-wider text-[#1A1A1A] uppercase">Prashant Soni</div>
                <div className="text-[10px] tracking-widest text-[#D4AF37] font-sans uppercase">Founder & Master Craftsman</div>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
