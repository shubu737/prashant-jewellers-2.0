/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Award, Quote } from 'lucide-react';

const founders = [
  {
    name: 'Late Mr. Kailash Chandra Soni',
    title: 'Founder',
    image: '/founder2.jpg',
    fallback: 'https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=400&q=80',
    since: '1957',
    quote: 'His values, vision, and blessings continue to inspire us every day.',
    bio: 'Late Mr. Kailash Chandra Soni was the heart and foundation of our jewellery business. A skilled artisan, he crafted jewellery with his own hands and built this business through dedication, hard work, and honesty. His kind nature, craftsmanship, and commitment to quality earned the trust of many and helped shape the legacy we proudly carry forward today. Though he is no longer with us, his values, vision, and blessings continue to inspire us every day.',
    credentials: [
      'Skilled artisan who crafted jewellery with his own hands',
      'Built the business through dedication, hard work and honesty',
      'Earned the trust of generations across Rawatbhata',
    ],
  },
  {
    name: 'Mr. Nilesh Kumar Soni',
    title: 'Founder & Master Jeweller',
    image: '/founder.jpg',
    fallback: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    since: '1957',
    quote: 'With a passion for perfection and an eye for detail, the founder has dedicated years to creating jewellery that reflects both tradition and modern luxury.',
    bio: 'At just 15 years old, Neelesh Soni stepped into the family jewellery business with a dream to create something extraordinary. Through years of perseverance, honesty, and exceptional craftsmanship, he elevated the business to new heights. Today, his legacy is built on trust, unmatched quality, and timeless designs that celebrate life\'s most precious moments.',
    credentials: [
      'Master craftsman with expertise in 22K & 18K gold jewellery',
      'Pioneer of BIS Hallmarked jewellery in Rawatbhata',
      'Trusted by generations of families across Rajasthan',
    ],
  },
];

export default function Founder() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/10"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">

        {/* Section Label */}
        <div className="text-center space-y-3 mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D4AF37]">
            <span className="h-px w-6 bg-[#D4AF37]" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-semibold">The Visionaries Behind</span>
            <span className="h-px w-6 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl font-light tracking-wide text-[#1A1A1A] sm:text-5xl">
            Meet Our <span className="font-serif font-bold italic text-[#D4AF37]">Founders</span>
          </h2>
        </div>

        {/* Founders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {founders.map((founder, idx) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: idx * 0.2 }}
              className="flex flex-col space-y-6"
            >
              {/* Photo */}
              <div className="relative flex justify-center">
                <div className="relative">
                  <div className="absolute -inset-3 border border-[#D4AF37]/20 rounded-sm pointer-events-none" />
                  <div className="absolute -inset-6 border border-[#D4AF37]/8 rounded-sm pointer-events-none" />
                  <img
                    src={founder.image}
                    alt={founder.name}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = founder.fallback;
                    }}
                    className="w-full max-w-sm aspect-[3/4] object-cover object-top rounded-sm shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                  />
                  {/* Name overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#1A1A1A]/85 via-[#1A1A1A]/40 to-transparent p-6">
                    <p className="font-serif text-lg font-semibold text-white">{founder.name}</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] mt-0.5">{founder.title}, Prashant Jewellers</p>
                  </div>
                  {/* Est badge */}
                  <div className="absolute top-4 right-4 bg-white/90 border border-[#D4AF37]/30 px-3 py-2 text-center backdrop-blur-sm">
                    <p className="font-serif text-lg font-bold text-[#D4AF37] leading-none">{founder.since}</p>
                    <p className="font-mono text-[8px] uppercase tracking-widest text-[#4A4A4A] mt-0.5">Est.</p>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div className="rounded-sm border border-[#D4AF37]/20 bg-white p-5 sm:p-6">
                <p className="font-serif text-sm sm:text-base leading-relaxed text-[#2A2A2A]">
                  {founder.bio}
                </p>
              </div>

              {/* Quote */}
              <div className="relative pl-6 border-l-2 border-[#D4AF37]/40">
                <Quote className="absolute -top-1 -left-3 h-5 w-5 text-[#D4AF37]/40 fill-[#D4AF37]/20" />
                <p className="font-serif text-base sm:text-lg font-light italic text-[#4A4A4A] leading-relaxed">
                  {founder.quote}
                </p>
              </div>

              {/* Credentials */}
              <div className="space-y-3">
                {founder.credentials.map((item) => (
                  <div key={item} className="flex items-start space-x-3">
                    <Award className="h-4 w-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                    <span className="font-sans text-xs text-[#4A4A4A] leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              {/* Signature */}
              <div className="pt-4 border-t border-[#D4AF37]/20">
                <p className="font-serif text-2xl italic text-[#D4AF37]">{founder.name}</p>
                <p className="font-mono text-[9px] uppercase tracking-[0.3em] text-[#5A5A5A] mt-1">{founder.title}</p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
