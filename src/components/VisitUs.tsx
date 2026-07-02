/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, CalendarDays, CheckCircle2, AlertCircle, Send, Landmark } from 'lucide-react';
import { STORE_INFO } from '../data';
import { useSound } from '../hooks/useSound';

export default function VisitUs() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    serviceRequested: 'Viewing Consultation',
    message: ''
  });

  const [formState, setFormState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const { playLuxuryChime } = useSound();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      setFormState('error');
      return;
    }

    setFormState('loading');
    playLuxuryChime();

    // Simulate luxury API response lag
    setTimeout(() => {
      setFormState('success');
      setFormData({
        name: '',
        phone: '',
        email: '',
        serviceRequested: 'Viewing Consultation',
        message: ''
      });
      // Reset back to idle after showing success message
      setTimeout(() => setFormState('idle'), 4000);
    }, 1800);
  };

  return (
    <section
      id="visit-us"
      className="relative overflow-hidden bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/10"
    >
      {/* Editorial Aesthetic: Thin gold outer ambient frames */}
      <div className="absolute inset-x-12 bottom-0 h-[1.5px] bg-[#D4AF37]/10" />

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Column: Location Info & Interactive Embedded Google map */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2 text-[#D4AF37]">
                <span className="h-px w-8 bg-[#D4AF37]" />
                <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-semibold">BOUTIQUE ADDRESS</span>
              </div>
              <h2 className="font-serif text-3.5xl font-light tracking-wide text-[#1A1A1A] sm:text-5.5xl">
                The Flagship <br />
                <span className="font-serif font-bold italic text-[#D4AF37]">Rawatbhata Showroom</span>
              </h2>
              <p className="font-serif text-sm italic text-[#5A5A5A]">
                Plan a personal visit to explore pure certified gold ornaments and exclusive bridal design consultations under secure, luxurious private comfort.
              </p>
            </div>

            {/* Informational specs mapping list */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              <div className="flex items-start space-x-3.5 border-l border-[#D4AF37]/20 pl-4">
                <div className="mt-1 text-[#D4AF37]">
                  <MapPin className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A] font-sans block">Address</span>
                  <span className="font-sans text-xs text-[#5A5A5A] font-semibold leading-relaxed">
                    {STORE_INFO.location}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 border-l border-[#D4AF37]/20 pl-4">
                <div className="mt-1 text-[#D4AF37]">
                  <Phone className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A] font-sans block">Call / Inquiries</span>
                  <a
                    href={`tel:${STORE_INFO.phone}`}
                    className="font-sans text-xs text-[#5A5A5A] font-semibold hover:text-[#D4AF37] transition-colors"
                  >
                    {STORE_INFO.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 border-l border-[#D4AF37]/20 pl-4">
                <div className="mt-1 text-[#D4AF37]">
                  <Clock className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A] font-sans block">Hours of Reception</span>
                  <span className="font-sans text-xs text-[#5A5A5A] font-semibold leading-relaxed">
                    {STORE_INFO.timings}
                  </span>
                </div>
              </div>

              <div className="flex items-start space-x-3.5 border-l border-[#D4AF37]/20 pl-4">
                <div className="mt-1 text-[#D4AF37]">
                  <Landmark className="h-4.5 w-4.5" />
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-[#5A5A5A] font-sans block">Showroom Spot</span>
                  <span className="font-sans text-xs text-[#5A5A5A] font-semibold leading-relaxed">
                    Shopping Complex, near Bus Stand
                  </span>
                </div>
              </div>
            </div>

            {/* Embedded maps iframe element styled gracefully */}
            <div className="relative overflow-hidden border border-[#D4AF37]/15 bg-[#F0EDE8] p-1.5 rounded-sm shadow-xl">
              <iframe
                title="Google Maps Landmark for Prashant Jewellers Rawatbhata"
                src={STORE_INFO.mapsIframeUrl}
                width="100%"
                height="320"
                style={{ border: 0, filter: 'grayscale(1) invert(0.92) contrast(1.15)' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute top-4 left-4 bg-white/90 border border-amber-500/30 text-[9px] uppercase tracking-widest text-[#1A1A1A] px-3 py-1 font-mono rounded-sm">
                MAP LOCATION ACCREDITATION
              </div>
            </div>

          </div>

          {/* Right Column: Contact & Private Consultation Booking Form */}
          <div className="lg:col-span-6 bg-[#FAF5EF] border border-[#D4AF37]/15 p-8 md:p-12 relative shadow-2xl">
            {/* Corner visual embellishments */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#D4AF37]" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#D4AF37]" />

            <div className="space-y-5 mb-8">
              <h3 className="font-serif text-2xl font-light text-[#1A1A1A] tracking-wide">
                Arrange a <span className="italic font-bold text-[#D4AF37]">Private Showcase</span>
              </h3>
              <p className="font-sans text-xs text-[#5A5A5A] leading-relaxed uppercase tracking-wider">
                This website functions as a secure catalog exhibition. To view prices, evaluate gems, or formulate custom orders, kindly register a viewing session below.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold font-sans mb-2 block">
                    Full Name <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your name"
                    className="w-full bg-white/90 border border-[#D4AF37]/10 text-[#1A1A1A] px-4 py-3.5 text-xs tracking-wide focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 rounded-none placeholder:text-[#8c8c8c] font-sans"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold font-sans mb-2 block">
                    Phone Number <span className="text-[#D4AF37]">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +91 94141 85000"
                    className="w-full bg-white/90 border border-[#D4AF37]/10 text-[#1A1A1A] px-4 py-3.5 text-xs tracking-wide focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 rounded-none placeholder:text-[#8c8c8c] font-sans"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold font-sans mb-2 block">
                    Email Address (Optional)
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. guest@royalmail.com"
                    className="w-full bg-white/90 border border-[#D4AF37]/10 text-[#1A1A1A] px-4 py-3.5 text-xs tracking-wide focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 rounded-none placeholder:text-[#8c8c8c] font-sans"
                  />
                </div>

                <div>
                  <label className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold font-sans mb-2 block">
                    Interested Showcase Category
                  </label>
                  <select
                    name="serviceRequested"
                    value={formData.serviceRequested}
                    onChange={handleInputChange}
                    className="w-full bg-white/90 border border-[#D4AF37]/10 text-[#1A1A1A] px-4 py-3.5 text-xs tracking-wide focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 rounded-none font-sans"
                  >
                    <option value="Bridal Kundan Sets">Bridal Kundan Sets</option>
                    <option value="Certified Solitaires">Certified Solitaires</option>
                    <option value="Rajasthani Gold Ornaments">Rajasthani Gold Ornaments</option>
                    <option value="925 Sterling Silver Masterpieces">925 Sterling Silver Masterpieces</option>
                    <option value="Gold Coin Investments">Gold Coin Investments</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold font-sans mb-2 block">
                  Intention of Inquiry / Custom Specifications
                </label>
                <textarea
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Specify carat configurations, historical replica requests, or your preferred visiting date..."
                  className="w-full bg-white/90 border border-[#D4AF37]/10 text-[#1A1A1A] px-4 py-3.5 text-xs tracking-wide focus:border-[#D4AF37] focus:outline-none transition-colors duration-300 rounded-none placeholder:text-[#8c8c8c] font-sans resize-none"
                />
              </div>

              {/* Success / Error Banners */}
              <AnimatePresence mode="wait">
                {formState === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center space-x-3 bg-white/95 border border-[#D4AF37]/10 p-4 rounded-sm"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#D4AF37] flex-shrink-0" />
                    <p className="text-xs font-sans text-[#6b7280]">
                      Your showcase request was processed with royal attention. Our team of managers will contact you within 2 hour periods.
                    </p>
                  </motion.div>
                )}

                {formState === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center space-x-3 bg-white/95 border border-red-500/20 p-4 rounded-sm"
                  >
                    <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0" />
                    <p className="text-xs font-sans text-[#6b7280]">
                      Please fulfill both Name and Telephone parameters to receive authorized booking certificates.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={formState === 'loading'}
                className="w-full relative flex items-center justify-center space-x-3.5 border border-[#D4AF37] bg-transparent text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black hover:font-bold text-xs uppercase tracking-widest font-semibold py-4.5 cursor-pointer transition-all duration-300 shadow-[0_4px_15px_rgba(0,0,0,0.5)] disabled:opacity-50"
              >
                {formState === 'loading' ? (
                  <>
                    <div className="h-4 w-4 animate-spin border-2 border-[#D4AF37] border-t-transparent" />
                    <span>Transmitting Secure Booking...</span>
                  </>
                ) : (
                  <>
                    <Send className="h-3.5 w-3.5" />
                    <span>Initiate Private Showcase Registration</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
