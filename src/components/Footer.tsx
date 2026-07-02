/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, MapPin, Phone, Mail, Clock, ShieldCheck, Heart } from 'lucide-react';
import { STORE_INFO } from '../data';
import { useSound } from '../hooks/useSound';
import Logo from './Logo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const { playLuxuryChime } = useSound();

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    playLuxuryChime();
  };

  return (
    <footer id="footer" className="relative overflow-hidden bg-[#F2F0EF] text-[#050505] border-t border-[#D4AF37]/15">
      {/* Editorial aesthetic golden dust particles divider */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#D4AF37]/35 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 items-start pb-12 border-b border-[#D4AF37]/10">
          
          {/* Logo Monogram Column */}
          <div className="md:col-span-4 space-y-6">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => handleLinkClick('home')}>
              <div className="relative flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <Logo size="sm" animate={false} />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold tracking-widest uppercase text-[#050505]">
                  Prashant
                </span>
                <span className="text-[9px] tracking-[0.25em] uppercase text-amber-500 font-semibold">
                  Jewellers • Rawatbhata
                </span>
              </div>
            </div>

            <p className="font-serif text-xs italic leading-relaxed text-[#5c5c5c] max-w-sm">
              Established in {STORE_INFO.foundedYear}, Prashant Jewellers remains Rajasthan's pioneer house of hallmarked gold, certified diamonds, and traditional Kundan craftsmanship.
            </p>

            <div className="flex items-center space-x-3">
              <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]"></div>
              <span className="text-[10px] tracking-widest uppercase text-[#5c5c5c] font-sans">Boutiques Open • Custom Consultations Active</span>
            </div>
          </div>

          {/* Quick links header */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              NAVIGATION PORTAL
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Exhibition Home', id: 'home' },
                { label: 'Craft Legacy', id: 'about' },
                { label: 'Jewelry Showcase', id: 'collections' },
                { label: 'Exclusive Showpieces', id: 'featured' },
                { label: 'Certifications', id: 'why-us' },
                { label: 'Patron Reviews', id: 'testimonials' },
                { label: 'Bespoke Atelier', id: 'gallery' }
              ].map((link) => (
                <li key={link.id}>
                  <button
                    onClick={() => handleLinkClick(link.id)}
                    className="font-sans text-xs text-[#5c5c5c] hover:text-[#D4AF37] hover:pl-1 transition-all duration-300 cursor-pointer text-left"
                  >
                    • {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="font-sans text-[10px] uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              OFFICIAL CORRESPONDENCE
            </h4>
            <div className="space-y-3 font-sans text-xs text-[#5c5c5c] leading-relaxed">
              <p className="flex items-start">
                <MapPin className="h-4 w-4 mr-2.5 text-[#D4AF37] flex-shrink-0 mt-0.5" />
                <span>{STORE_INFO.location}</span>
              </p>
              <p className="flex items-center">
                <Phone className="h-4 w-4 mr-2.5 text-[#D4AF37]" />
                <a href={`tel:${STORE_INFO.phone}`} className="hover:text-[#D4AF37] transition-colors">
                  {STORE_INFO.phone}
                </a>
              </p>
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2.5 text-[#D4AF37]" />
                <a href={`mailto:${STORE_INFO.email}`} className="hover:text-[#D4AF37] transition-colors">
                  {STORE_INFO.email}
                </a>
              </p>
              <p className="flex items-center">
                <Clock className="h-4 w-4 mr-2.5 text-[#D4AF37]" />
                <span>{STORE_INFO.timings}</span>
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Rights Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between text-[11px] text-zinc-500 font-sans gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <div className="flex items-center space-x-1.5 border border-[#D4AF37]/10 bg-[#F7F4F1] px-3 py-1 rounded-sm">
              <ShieldCheck className="h-3.5 w-3.5 text-[#D4AF37]" />
              <span className="text-[10px] tracking-wide text-[#5c5c5c]">100% BIS Hallmarked Purity Guaranteed</span>
            </div>
          </div>

          <div className="text-center md:text-right">
            <p>© {new Date().getFullYear()} Prashant Jewellers. All rights reserved.</p>
            <p className="text-[10px] text-[#5c5c5c] mt-1 flex items-center justify-center md:justify-end">
              Crafted with royal standards in Rawatbhata, Rajasthan • Only for view and private consulting.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
}
