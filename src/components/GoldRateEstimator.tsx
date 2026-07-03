/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Scale, Sparkles, AlertCircle, TrendingUp, RefreshCw, MessageSquare, ShieldCheck, FileText } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { STORE_INFO } from '../data';

// Purity multipliers relative to 24K/Fine 99.9%
const GOLD_PURITY: Record<string, number> = {
  '24K': 1,
  '22K': 22 / 24,
  '18K': 18 / 24,
  '14K': 14 / 24,
};
const SILVER_PURITY: Record<string, number> = {
  'Fine 99.9%': 1,
  'Sterling 92.5%': 0.925,
};

// Troy oz → gram
const OZ_TO_GRAM = 31.1035;

// Fallback rates (per gram, INR) used when API is unavailable
const FALLBACK = { gold24K: 7450, silverFine: 92 };

export default function GoldRateEstimator() {
  const [metal, setMetal] = useState<'gold' | 'silver'>('gold');
  const [purity, setPurity] = useState<string>('22K');
  const [weight, setWeight] = useState<number>(10);
  const [makingStyle, setMakingStyle] = useState<'traditional' | 'royal-bridal' | 'minimal-modern'>('traditional');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  // Live rate state
  const [gold24KPerGram, setGold24KPerGram] = useState<number>(FALLBACK.gold24K);
  const [silverFinePerGram, setSilverFinePerGram] = useState<number>(FALLBACK.silverFine);
  const [prevGold, setPrevGold] = useState<number>(FALLBACK.gold24K);
  const [prevSilver, setPrevSilver] = useState<number>(FALLBACK.silverFine);
  const [rateError, setRateError] = useState(false);

  const { playLuxuryChime, playGlowChime } = useSound();

  const updateTimestamp = () => {
    const now = new Date();
    setLastUpdated(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST');
  };

  const fetchRates = async () => {
    try {
      // gold-api.com — free, no key, returns price in USD per troy oz
      const [goldRes, silverRes] = await Promise.all([
        fetch('https://api.gold-api.com/price/XAU'),
        fetch('https://api.gold-api.com/price/XAG'),
      ]);
      const goldData = await goldRes.json();
      const silverData = await silverRes.json();

      // USD/INR approximate live conversion (fallback 84)
      const usdInr = 84;

      const newGold = parseFloat(((goldData.price / OZ_TO_GRAM) * usdInr).toFixed(2));
      const newSilver = parseFloat(((silverData.price / OZ_TO_GRAM) * usdInr).toFixed(2));

      setPrevGold(gold24KPerGram);
      setPrevSilver(silverFinePerGram);
      setGold24KPerGram(newGold);
      setSilverFinePerGram(newSilver);
      setRateError(false);
      updateTimestamp();
    } catch {
      setRateError(true);
      updateTimestamp();
    }
  };

  // Fetch on mount + auto-refresh every 60 seconds
  useEffect(() => {
    fetchRates();
    const interval = setInterval(fetchRates, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    playGlowChime();
    fetchRates().finally(() => setIsRefreshing(false));
  };

  // Adjust purity options when metal changes
  useEffect(() => {
    if (metal === 'gold') setPurity('22K');
    else setPurity('Sterling 92.5%');
  }, [metal]);

  // Per-gram rate based on live 24K/Fine base × purity multiplier
  const perGramRate = metal === 'gold'
    ? Math.round(gold24KPerGram * (GOLD_PURITY[purity] ?? 1))
    : Math.round(silverFinePerGram * (SILVER_PURITY[purity] ?? 1));

  const goldTrend = gold24KPerGram >= prevGold ? 'up' : 'down';
  const silverTrend = silverFinePerGram >= prevSilver ? 'up' : 'down';

  // Making charges: Custom Rajasthani hand filigree ranges from 8% to 15%
  const makingChargePercent = {
    traditional: 10,   // Standard Rajasthani nakshi
    'royal-bridal': 14, // Complex Kundan / Polki setting
    'minimal-modern': 8 // Light sleek modern bands
  }[makingStyle];

  const metalPrice = perGramRate * weight;
  const makingCharges = metalPrice * (makingChargePercent / 100);
  
  // Government BIS Hallmark charge (Fixed at ₹45 per ornament in India)
  const hallmarkCharge = metal === 'gold' ? 45 : 0;
  
  // Subtotal before tax
  const subtotal = metalPrice + makingCharges + hallmarkCharge;
  
  // 3% GST applicable on overall jewelry values in India
  const taxGST = subtotal * 0.03;
  const grandTotal = subtotal + taxGST;

  const handleWhatsAppEstimation = () => {
    playLuxuryChime();
    const metalLabel = metal === 'gold' ? `${purity} Hallmarked Gold` : `${purity} Silver`;
    const message = encodeURIComponent(
      `Hello Prashant Jewellers, I have generated a custom digital estimate for:
- Metal: ${metalLabel} 
- Weight: ${weight}g
- Craftsmanship style: ${makingStyle.toUpperCase()}
- Estimated Value: ₹${Math.round(grandTotal).toLocaleString('en-IN')}

I would like to discuss customized design specifications and verify current live metal coefficients today. Please guide me.`
    );
    window.open(`https://wa.me/${STORE_INFO.whatsapp}?text=${message}`, '_blank');
  };

  return (
    <section 
      id="rate-calculator" 
      className="relative overflow-hidden bg-[#FAF8F5] py-24 px-4 sm:px-6 lg:px-8 border-b border-[#D4AF37]/10"
    >
      {/* Golden dust gradient background reflections */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[550px] w-[550px] rounded-full bg-amber-500/[0.04] blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl">
        
        {/* Editorial Title */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center space-x-2 text-[#D4AF37]">
            <span className="h-px w-6 bg-[#D4AF37]" />
            <span className="font-mono text-[10px] tracking-[0.4em] uppercase font-semibold">ESTIMATE PORTAL</span>
            <span className="h-px w-6 bg-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3.5xl font-light tracking-wide text-[#1A1A1A] sm:text-5xl">
            Live Hallmark <span className="font-serif font-bold italic text-[#D4AF37]">Rate & Estimation Desk</span>
          </h2>
          <p className="font-sans text-xs uppercase tracking-widest text-[#4A4A4A] max-w-xl mx-auto leading-relaxed">
            Obtain immediate transparent calculations based on authentic Rajasthani making parameters, hallmarking standards, and current live market factors.
          </p>
        </div>

        {/* Estimation Suite Layout split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Left Column (SPAN 7): Configurator Form */}
          <div className="lg:col-span-7 flex flex-col justify-between border border-[#D4AF37]/10 bg-[#F0EDE8] p-8 sm:p-10 relative">
            
            {/* Ambient luxury corners */}
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#D4AF37]/15" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#D4AF37]/15" />

            <div className="space-y-8">
              
              {/* Header Status Bar with real-time indicators */}
              <div className="flex flex-col gap-4 pb-6 border-b border-[#D4AF37]/10">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2 text-emerald-400 select-none">
                      <TrendingUp className="h-4 w-4 shrink-0 animate-pulse" />
                      <span className="font-sans text-[10px] uppercase tracking-wider font-semibold">Live Market Rates Active</span>
                    </div>
                    <p className="font-sans text-[10px] text-[#4A4A4A]">
                      {rateError ? '⚠ Using fallback rates — check connection' : 'Auto-refreshes every 60 seconds · Source: gold-api.com'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-3 bg-white/95 border border-[#D4AF37]/10 px-3.5 py-1.5 rounded-none font-mono text-[10px] text-[#4A4A4A]">
                    <span className="text-[#4A4A4A]">Updated:</span>
                    <span className="font-semibold text-[#D4AF37]">{lastUpdated || '—'}</span>
                    <button
                      onClick={handleRefresh}
                      disabled={isRefreshing}
                      className="hover:text-amber-300 ml-1.5 transition-colors cursor-pointer disabled:opacity-40"
                      title="Refresh Live Rates"
                    >
                      <RefreshCw className={`h-3 w-3 ${isRefreshing ? 'animate-spin' : ''}`} />
                    </button>
                  </div>
                </div>

                {/* Live rate ticker */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white/90 border border-[#D4AF37]/15 px-4 py-3 flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold">Gold 24K / gram</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-[#1A1A1A]">₹{gold24KPerGram.toLocaleString('en-IN')}</span>
                      <span className={`text-[10px] font-bold ${goldTrend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {goldTrend === 'up' ? '▲' : '▼'}
                      </span>
                    </div>
                  </div>
                  <div className="bg-white/90 border border-[#D4AF37]/15 px-4 py-3 flex flex-col gap-0.5">
                    <span className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold">Silver Fine / gram</span>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-base font-bold text-[#1A1A1A]">₹{silverFinePerGram.toLocaleString('en-IN')}</span>
                      <span className={`text-[10px] font-bold ${silverTrend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                        {silverTrend === 'up' ? '▲' : '▼'}
                      </span>
                    </div>
  
                  </div>
                </div>
              </div>

              {/* Selector 1: Metal Category */}
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold block">
                  Select Precious Metal
                </span>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => { setMetal('gold'); playLuxuryChime(); }}
                    className={`py-3.5 text-center text-xs uppercase font-semibold font-sans tracking-widest border transition-all duration-300 cursor-pointer ${
                      metal === 'gold'
                        ? 'border-[#D4AF37] text-[#1A1A1A] bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.08)]'
                        : 'border-[#D4AF37]/10 text-[#5A5A5A] hover:text-[#1A1A1A] bg-white/90'
                    }`}
                  >
                    ✨ Hallmark Gold
                  </button>
                  <button
                    onClick={() => { setMetal('silver'); playLuxuryChime(); }}
                    className={`py-3.5 text-center text-xs uppercase font-semibold font-sans tracking-widest border transition-all duration-300 cursor-pointer ${
                      metal === 'silver'
                        ? 'border-[#D4AF37] text-[#1A1A1A] bg-[#D4AF37]/10 shadow-[0_0_15px_rgba(212,175,55,0.08)]'
                        : 'border-[#D4AF37]/10 text-[#5A5A5A] hover:text-[#1A1A1A] bg-white/90'
                    }`}
                  >
                    💎 Fine Silver
                  </button>
                </div>
              </div>

              {/* Selector 2: Metal Purity Class */}
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold block">
                  Hallmark Grade &amp; Purity Ratio
                </span>
                <div className="flex flex-wrap gap-2.5">
                  {metal === 'gold' ? (
                    Object.keys(GOLD_PURITY).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => { setPurity(grade); playLuxuryChime(); }}
                        className={`px-4 py-2 text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                          purity === grade
                            ? 'bg-[#D4AF37] text-black font-bold'
                            : 'bg-white/90 text-[#1A1A1A] hover:text-[#1A1A1A] border border-[#D4AF37]/10'
                        }`}
                      >
                        {grade} ({grade === '24K' ? '99.9%' : grade === '22K' ? '91.6%' : grade === '18K' ? '75.0%' : '58.5%'})
                      </button>
                    ))
                  ) : (
                    Object.keys(SILVER_PURITY).map((grade) => (
                      <button
                        key={grade}
                        onClick={() => { setPurity(grade); playLuxuryChime(); }}
                        className={`px-4 py-2 text-[10px] font-mono tracking-wider transition-all cursor-pointer ${
                          purity === grade
                            ? 'bg-[#D4AF37] text-black font-bold border border-[#D4AF37]'
                            : 'bg-white/90 text-[#5A5A5A] hover:text-[#1A1A1A] border border-[#D4AF37]/10'
                        }`}
                      >
                        {grade}
                      </button>
                    ))
                  )}
                </div>
              </div>

              {/* Slider 3: Weight Specification */}
              <div className="space-y-4 pt-1">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold">
                    Set Metal Net Weight
                  </span>
                  <span className="text-[#5A5A5A] font-mono text-sm">
                    <strong className="text-[#1A1A1A] text-base font-bold bg-white/90 px-3 py-1 border border-[#D4AF37]/10 font-sans mr-1">{weight}</strong> grams
                  </span>
                </div>

                <div className="relative group pt-2 px-1">
                  {/* Background progress track */}
                  <input
                    type="range"
                    min="1"
                    max="150"
                    step="1"
                    value={weight}
                    onChange={(e) => {
                      setWeight(Number(e.target.value));
                      if (Number(e.target.value) % 10 === 0) playGlowChime();
                    }}
                    className="w-full accent-amber-500 bg-[#e5dcd3] h-1 rounded-full appearance-none cursor-pointer hover:accent-amber-400"
                  />
                  {/* Subtle helper buttons for rapid scaling */}
                  <div className="flex justify-between font-mono text-[9px] text-[#6b7280] mt-2">
                    <button onClick={() => setWeight(1)} className="hover:text-[#D4AF37] cursor-pointer">1g</button>
                    <button onClick={() => setWeight(10)} className="hover:text-[#D4AF37] cursor-pointer">10g (1 Tola)</button>
                    <button onClick={() => setWeight(30)} className="hover:text-[#D4AF37] cursor-pointer">30g</button>
                    <button onClick={() => setWeight(50)} className="hover:text-[#D4AF37] cursor-pointer">50g</button>
                    <button onClick={() => setWeight(100)} className="hover:text-[#D4AF37] cursor-pointer">100g</button>
                    <button onClick={() => setWeight(150)} className="hover:text-[#D4AF37] cursor-pointer">150g</button>
                  </div>
                </div>
              </div>

              {/* Selector 4: Workmanship & Styling */}
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-[#6b7280] font-semibold block">
                  Rajasthani Workmanship & Design Category
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button
                    onClick={() => { setMakingStyle('traditional'); playLuxuryChime(); }}
                    className={`flex flex-col p-3 border text-left rounded-none transition-all cursor-pointer ${
                      makingStyle === 'traditional'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                        : 'border-[#D4AF37]/10 bg-white/90 hover:border-[#D4AF37]/20'
                    }`}
                  >
                    <span className="font-serif text-xs font-semibold text-[#1A1A1A]">Classic Nakshi</span>
                    <span className="font-sans text-[9px] text-[#6b7280] mt-0.5">Traditional Rajasthani filigree (10% fees)</span>
                  </button>

                  <button
                    onClick={() => { setMakingStyle('royal-bridal'); playLuxuryChime(); }}
                    className={`flex flex-col p-3 border text-left rounded-none transition-all cursor-pointer ${
                      makingStyle === 'royal-bridal'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                        : 'border-[#D4AF37]/10 bg-white/90 hover:border-[#D4AF37]/20'
                    }`}
                  >
                    <span className="font-serif text-xs font-semibold text-[#1A1A1A]">Imperial Kundan</span>
                    <span className="font-sans text-[9px] text-[#6b7280] mt-0.5">Heavy bridal detailing & Polki (14% fees)</span>
                  </button>

                  <button
                    onClick={() => { setMakingStyle('minimal-modern'); playLuxuryChime(); }}
                    className={`flex flex-col p-3 border text-left rounded-none transition-all cursor-pointer ${
                      makingStyle === 'minimal-modern'
                        ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                        : 'border-[#D4AF37]/10 bg-white/90 hover:border-[#D4AF37]/20'
                    }`}
                  >
                    <span className="font-serif text-xs font-semibold text-[#1A1A1A]">Minimal Sleek</span>
                    <span className="font-sans text-[9px] text-[#6b7280] mt-0.5">Rings & modern elegant bands (8% fees)</span>
                  </button>
                </div>
              </div>

            </div>

            {/* Bottom trust disclaimer notice */}
            <div className="mt-8 flex items-start space-x-2.5 border-t border-[#D4AF37]/10 pt-6">
              <ShieldCheck className="h-4.5 w-4.5 text-[#D4AF37] shrink-0 mt-0.5" />
              <p className="text-[10px] font-sans text-[#5A5A5A] leading-normal">
                Prashant Jewellers uses standard digital scales to live-record weights in client views. This estimator serves for direct comparison and guide valuations. Live showroom values may shift marginally depending on daily bullion market indexes in India.
              </p>
            </div>

          </div>

          {/* Right Column (SPAN 5): Invoice Est Summary */}
          <div className="lg:col-span-5 flex flex-col justify-between border border-[#D4AF37]/20 bg-gradient-to-b from-[#FAF5EF] to-[#EAE0D5] p-8 md:p-10 relative shadow-2xl">
            {/* Elegant luxury visual badge */}
            <div className="absolute top-0 right-0 bg-[#D4AF37]/10 text-[#D4AF37] border-b border-l border-[#D4AF37]/20 text-[8px] uppercase tracking-widest px-3.5 py-1 font-mono font-semibold">
              Invoice Projection
            </div>

            <div className="space-y-6">
              
              <div className="flex items-center space-x-2.5 pb-4 border-b border-[#D4AF37]/10">
                <FileText className="h-5 w-5 text-[#D4AF37]" />
                <h3 className="font-serif text-lg tracking-wide text-[#1A1A1A]">
                  Estimate <span className="italic font-bold text-[#D4AF37]">Memorandum</span>
                </h3>
              </div>

              {/* Estimate breakdowns */}
              <div className="space-y-4.5 text-xs font-mono">
                
                <div className="flex items-center justify-between">
                  <span className="text-[#5A5A5A]">Metal Class & Rate</span>
                  <span className="text-[#6b7280] font-semibold">{purity} {metal === 'gold' ? 'Gold' : 'Silver'}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#5A5A5A]">Rate per gram</span>
                  <span className="text-[#6b7280]">₹{perGramRate.toLocaleString('en-IN')}/g</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[#5A5A5A]">Weight set</span>
                  <span className="text-[#6b7280] font-semibold">{weight} grams</span>
                </div>

                {/* Main calculations */}
<div className="border-t border-dashed border-[#D4AF37]/10 pt-4 space-y-3">
                  
                  <div className="flex items-center justify-between">
                    <span className="text-[#5A5A5A]">Metal Melt Value</span>
                    <span className="text-[#1A1A1A] font-semibold">₹{Math.round(metalPrice).toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#5A5A5A]">Making charges ({makingChargePercent}%)</span>
                    <span className="text-[#1A1A1A]">₹{Math.round(makingCharges).toLocaleString('en-IN')}</span>
                  </div>

                  {metal === 'gold' && (
                    <div className="flex items-center justify-between">
                      <span className="text-[#5A5A5A] flex items-center gap-1.5">
                        BIS Hallmarking Fee
                      </span>
                      <span className="text-[#1A1A1A]">₹{hallmarkCharge}</span>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-1 border-t border-[#D4AF37]/10">
                    <span className="text-[#5A5A5A]">Taxable Subtotal</span>
                    <span className="text-[#D4AF37] font-sans font-bold">₹{Math.round(subtotal).toLocaleString('en-IN')}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-[#5A5A5A]">Govt GST (3.0%)</span>
                    <span className="text-[#1A1A1A]">₹{Math.round(taxGST).toLocaleString('en-IN')}</span>
                  </div>

                </div>

              </div>

              {/* Large Grand Total Box */}
              <div className="border border-[#D4AF37]/10 bg-white/95 p-5 rounded-none text-center space-y-1 mt-6">
                <span className="text-[9px] uppercase tracking-widest text-[#5A5A5A] block font-sans">
                  Projected Hallmarked Valuation
                </span>
                <span className="font-sans text-2xl sm:text-3xl font-extrabold text-[#D4AF37] drop-shadow-[0_2px_8px_rgba(212,175,55,0.15)]">
                  ₹{Math.round(grandTotal).toLocaleString('en-IN')}*
                </span>
                <span className="text-[8px] font-sans text-[#5A5A5A] block">
                  *Inclusive of all taxes & certification certificates
                </span>
              </div>

            </div>

            {/* Direct Booking and Query Actions */}
            <div className="space-y-4 pt-10 border-t border-[#D4AF37]/10 mt-6">
              
              <button
                onClick={handleWhatsAppEstimation}
                className="w-full inline-flex items-center justify-center space-x-2.5 border border-[#D4AF37] bg-[#D4AF37] text-black hover:bg-transparent hover:text-white font-semibold text-xs py-4 px-6 uppercase tracking-widest cursor-pointer transition-all duration-500 shadow-[0_4px_25px_rgba(212,175,55,0.15)]"
              >
                <MessageSquare className="h-4 w-4" />
                <span>Enquire Est via WhatsApp</span>
              </button>

              <p className="text-[9px] font-sans text-[#6b7280] text-center uppercase tracking-wider leading-relaxed">
                Provide custom gemstones, casting parameters or request personal home consultation anywhere in Rawatbhata and nearby areas.
              </p>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
