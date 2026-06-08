/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Sparkles, ArrowRight, MapPin, Play } from 'lucide-react';
import { useSound } from '../hooks/useSound';
import { STORE_INFO } from '../data';
import Logo from './Logo';

interface HeroProps {
  onExplore: (sectionId: string) => void;
}

export default function Hero({ onExplore }: HeroProps) {
  const { playGlowChime, playLuxuryChime } = useSound();

  const handleCtaClick = (sectionId: string) => {
    playLuxuryChime();
    onExplore(sectionId);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col justify-between overflow-hidden bg-neutral-950 px-4 py-8 sm:px-6 lg:px-8"
    >
      {/* Absolute background video & image with deep luxury radial gradients */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 h-full w-full object-cover opacity-[0.25] scale-105"
        >
          <source src="https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c05c091d3ffab7eef1108c4ff7572796&profile_id=165&oauth2_token_id=57447761" type="video/mp4" />
        </video>
        <img
          src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85"
          alt="Premium Imperial Gold Jewellery"
          className="h-full w-full object-cover object-center opacity-[0.10] scale-105 transition-transform duration-[10000ms] ease-out select-none hover:scale-100"
          referrerPolicy="no-referrer"
        />
        {/* Soft gold wash overlay */}
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-neutral-950/80 to-neutral-950" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/40" />
      </div>

      {/* Gold spotlight overlay reflection */}
      <div className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_30%,rgba(196,154,64,0.1),transparent_50%)]" />

      {/* Spacer to push content to middle */}
      <div className="h-10 md:h-14 shrink-0" />

      {/* Content */}
      <div className="relative z-20 mx-auto w-full max-w-5xl text-center my-auto py-6 sm:py-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center justify-center space-y-6 sm:space-y-8"
        >
          {/* Subtle upper pill indicator */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center space-x-2 rounded-full border border-amber-500/35 bg-amber-500/5 px-4.5 py-1.5 shadow-[0_0_20px_rgba(245,158,11,0.06)] backdrop-blur-md"
          >
            <Sparkles className="h-3.5 w-3.5 text-amber-400 animate-pulse" />
            <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-amber-300">
              Est. {STORE_INFO.foundedYear} • Rawatbhata's Heritage Jewel House
            </span>
          </motion.div>

          {/* Majestic Royal Logo Emblem */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center select-none drop-shadow-[0_4px_20px_rgba(212,175,55,0.25)]"
          >
            <Logo size="lg" animate={true} />
          </motion.div>

          {/* Substantial luxury heading */}
          <motion.div variants={itemVariants} className="space-y-3 sm:space-y-4">
            <h1 className="font-serif text-4xl font-light tracking-[0.16em] text-white sm:text-6xl md:text-7.5xl leading-none">
              PRASHANT <br />
              <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text font-serif font-semibold tracking-[0.18em] text-transparent drop-shadow-[0_2px_10px_rgba(212,175,55,0.15)]">
                JEWELLERS
              </span>
            </h1>
            <p className="mx-auto max-w-xl font-sans text-xs uppercase tracking-[0.35em] text-zinc-400 md:text-sm">
              “{STORE_INFO.tagline}”
            </p>
          </motion.div>

          {/* Fine description statement */}
          <motion.p
            variants={itemVariants}
            className="mx-auto max-w-2xl font-serif text-sm leading-relaxed text-zinc-300 md:text-lg italic px-4"
          >
            Indulge in Rawatbhata's legendary hallmark purity and artisan lineage. Discover hand-sculpted bridal sets, flawless diamond rings, and pure gold ornaments crafted to transcend generations.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6 pt-2 sm:pt-4"
          >
            <button
              onClick={() => handleCtaClick('collections')}
              onMouseEnter={playGlowChime}
              className="group relative flex w-56 items-center justify-center space-x-2.5 overflow-hidden rounded-sm bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300 px-8 py-4.5 font-sans text-xs font-semibold uppercase tracking-widest text-black transition-all duration-500 hover:shadow-[0_0_30px_rgba(245,158,11,0.35)] cursor-pointer"
            >
              <span className="relative z-10 flex items-center justify-center space-x-2">
                <span>Explore Collection</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </button>

            <button
              onClick={() => handleCtaClick('visit-us')}
              className="flex w-56 items-center justify-center space-x-2.5 rounded-sm border border-zinc-700 bg-neutral-950/80 px-8 py-4.5 font-sans text-xs font-medium uppercase tracking-widest text-zinc-200 transition-all duration-300 hover:border-amber-400 hover:text-white cursor-pointer shadow-[0_4px_25px_rgba(0,0,0,0.5)] hover:shadow-[0_0_15px_rgba(245,158,11,0.15)]"
            >
              <MapPin className="h-4 w-4 text-amber-500" />
              <span>Visit Showroom</span>
            </button>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative Bottom Row with Stats & Scroll Prompt combined in responsive vertical stacking */}
      <div className="relative z-20 w-full mt-auto pt-6 pb-2 space-y-6 shrink-0">
        {/* Exquisite bottom stats banner content */}
        <div className="hidden items-center justify-center space-x-12 px-4 md:flex">
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-light text-amber-300">100%</span>
            <span className="text-[9px] tracking-widest uppercase text-zinc-500">BIS Hallmarked Gold</span>
          </div>
          <div className="h-8 w-[1px] bg-amber-500/25" />
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-light text-amber-300">Since 1957</span>
            <span className="text-[9px] tracking-widest uppercase text-zinc-500">Royal Legacy</span>
          </div>
          <div className="h-8 w-[1px] bg-amber-500/25" />
          <div className="flex flex-col items-center">
            <span className="font-serif text-2xl font-light text-amber-300">Bespoke</span>
            <span className="text-[9px] tracking-widest uppercase text-zinc-500">Custom Rajasthan Crafts</span>
          </div>
        </div>

        {/* Classic Animated Scroll Down Prompt */}
        <div className="flex flex-col items-center justify-center">
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="flex flex-col items-center cursor-pointer"
            onClick={() => handleCtaClick('about')}
          >
            <span className="text-[9px] tracking-[0.2em] uppercase text-zinc-500 mb-2 font-mono">SCROLL TO DISCOVER</span>
            <div className="flex h-8 w-[18px] justify-center rounded-full border border-zinc-700 p-1">
              <div className="h-2 w-1 rounded-full bg-amber-400" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
