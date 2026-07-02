/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Quote } from 'lucide-react';

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-neutral-950 py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900"
    >
      {/* Gold ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-6xl">

        {/* Section Label */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D4AF37]">
            <span className="h-px w-6 bg-[#D4AF37]" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-semibold">The Visionary Behind</span>
            <span className="h-px w-6 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl font-light tracking-wide text-white sm:text-5xl">
            Meet Our <span className="font-serif font-bold italic text-[#D4AF37]">Founder</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Photo */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative flex justify-center lg:justify-end"
            >
              <div className="relative">
                {/* Gold border frame */}
                <div className="absolute -inset-3 border border-[#D4AF37]/20 rounded-sm pointer-events-none" />
                <div className="absolute -inset-6 border border-[#D4AF37]/8 rounded-sm pointer-events-none" />

                <img
                  src="/founder.jpg"
                  alt="Mr. Nilesh Kumar Soni — Founder, Prashant Jewellers"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80';
                  }}
                  className="w-72 sm:w-80 lg:w-96 aspect-[3/4] object-cover object-top rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                />

                {/* Founder badge overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6">
                  <p className="font-serif text-lg font-semibold text-white">Mr. Nilesh Kumar Soni</p>
                  <p className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] mt-0.5">Founder, Prashant Jewellers</p>
                </div>

                {/* Since badge */}
                <div className="absolute top-4 right-4 bg-black/80 border border-[#D4AF37]/30 px-3 py-2 text-center backdrop-blur-sm">
                  <p className="font-serif text-lg font-bold text-[#D4AF37] leading-none">1957</p>
                  <p className="font-mono text-[8px] uppercase tracking-widest text-zinc-400 mt-0.5">Est.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
              className="rounded-sm border border-[#D4AF37]/20 bg-neutral-900/70 p-5 sm:p-6"
            >
              <p className="font-serif text-base sm:text-lg leading-relaxed text-zinc-200">
                At just 15 years old, Neelesh Soni stepped into the family jewellery business with a dream to create something extraordinary. Through years of perseverance, honesty, and exceptional craftsmanship, he elevated the business to new heights. Today, his legacy is built on trust, unmatched quality, and timeless designs that celebrate life’s most precious moments.
              </p>
            </motion.div>
          </div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="space-y-8"
          >
            {/* Quote */}
            <div className="relative pl-6 border-l-2 border-[#D4AF37]/40">
              <Quote className="absolute -top-1 -left-3 h-5 w-5 text-[#D4AF37]/40 fill-[#D4AF37]/20" />
              <p className="font-serif text-lg sm:text-xl font-light italic text-zinc-200 leading-relaxed">
                Founded by a visionary craftsman, Prashant Jewellers stands as a symbol of trust, elegance, and timeless artistry.
              </p>
            </div>

            <p className="font-sans text-sm text-zinc-400 leading-relaxed">
              With a passion for perfection and an eye for detail, the founder has dedicated years to creating jewellery that reflects both tradition and modern luxury.
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-2">
              {[
                { value: '65+', label: 'Years of Legacy' },
                { value: '5.0★', label: 'Google Rating' },
                { value: '100%', label: 'BIS Hallmarked' },
              ].map((stat) => (
                <div key={stat.label} className="border border-zinc-800 bg-neutral-900/40 p-4 text-center rounded-sm">
                  <p className="font-serif text-xl font-semibold text-[#D4AF37]">{stat.value}</p>
                  <p className="font-sans text-[10px] uppercase tracking-wider text-zinc-500 mt-1">{stat.label}</p>
                </div>
              ))}
            </div>

            {/* Credentials */}
            <div className="space-y-3 pt-2">
              {[
                'Master craftsman with expertise in 22K & 18K gold jewellery',
                'Pioneer of BIS Hallmarked jewellery in Rawatbhata',
                'Trusted by generations of families across Rajasthan',
              ].map((item) => (
                <div key={item} className="flex items-start space-x-3">
                  <Award className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <span className="font-sans text-xs text-zinc-400 leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            {/* Signature line */}
            <div className="pt-4 border-t border-zinc-900">
              <p className="font-serif text-2xl italic text-[#D4AF37]/70">Nilesh Kumar Soni</p>
              <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-zinc-600 mt-1">Founder & Master Jeweller</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
