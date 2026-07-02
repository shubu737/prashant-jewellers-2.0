/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ShieldCheck, Award, Sparkles, Scale } from 'lucide-react';
import { LUXURY_FEATURES } from '../data';

// Map icon names dynamically
const iconMap: Record<string, any> = {
  ShieldCheck,
  Award,
  Sparkles,
  Scale,
};

export default function WhyChooseUs() {
  return (
    <section
      id="why-us"
      className="relative overflow-hidden bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/10"
    >
      {/* Background glow shadow */}
      <div className="absolute top-1/2 right-1/4 h-[400px] w-[400px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="text-center space-y-4 mb-20">
          <div className="flex items-center justify-center space-x-2 text-[#D4AF37]">
            <span className="h-px w-6 bg-[#D4AF37]" />
            <span className="font-mono text-[10px] tracking-widest uppercase font-semibold">THE PRASHANT STANDARD</span>
            <span className="h-px w-6 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3.5xl font-light tracking-wide text-[#1A1A1A] sm:text-5xl">
            Why Discerning Patrons <br />
            <span className="font-serif font-semibold italic text-[#D4AF37]">Choose Us</span>
          </h2>
          <p className="mx-auto max-w-2xl font-serif text-sm italic text-[#4A4A4A]">
            Certified authenticity and uncompromised transparency at India's foremost royal craft jeweler.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {LUXURY_FEATURES.map((feature, idx) => {
            const IconComponent = iconMap[feature.iconName] || Award;
            return (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: 'easeOut' }}
                key={feature.id}
                className="group relative border border-[#D4AF37]/10 bg-white p-8 transition-all duration-500 hover:border-[#D4AF37]/20 hover:bg-[#F0EDE8] hover:shadow-[0_10px_30px_rgba(212,175,55,0.08)]"
              >
                {/* Micro accent corner border */}
                <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-transparent group-hover:border-[#D4AF37]/40 transition-colors duration-500" />
                <div className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-transparent group-hover:border-[#D4AF37]/40 transition-colors duration-500" />

                <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-none border border-[#D4AF37]/15 bg-[#F0EDE8] text-[#D4AF37] group-hover:border-[#D4AF37]/40 group-hover:text-amber-300 transition-all duration-500">
                  <IconComponent className="h-5 w-5" />
                </div>

                <h3 className="font-serif text-lg tracking-wide text-[#1A1A1A] group-hover:text-[#D4AF37] transition-colors duration-300">
                  {feature.title}
                </h3>

                <p className="mt-3.5 font-sans text-xs leading-relaxed text-[#4A4A4A] group-hover:text-[#334155] transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Index marker */}
                <div className="mt-6 text-[10px] font-mono text-zinc-600 group-hover:text-[#D4AF37] transition-all duration-500">
                  REF - 0{idx + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Certificate Logo Placement block with Editorial elements */}
        <div className="mt-20 border-t border-[#D4AF37]/10 pt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-10 opacity-65 grayscale hover:grayscale-0 transition-all duration-500">
            <span className="font-serif text-sm tracking-widest text-[#4A4A4A] font-semibold">BIS 916 CERTIFIED</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <span className="font-serif text-sm tracking-widest text-[#4A4A4A] font-semibold">IGI DIAMOND LABS</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <span className="font-serif text-sm tracking-widest text-[#5A5A5A] font-semibold">GIA ACCREDITED</span>
            <span className="h-1.5 w-1.5 rounded-full bg-zinc-700" />
            <span className="font-serif text-sm tracking-widest text-[#5A5A5A] font-semibold">RASTHA ADVISORY</span>
          </div>
        </div>

      </div>
    </section>
  );
}
