/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom';
  width?: number;
  height?: number;
  animate?: boolean;
}

export default function Logo({
  className = '',
  size = 'md',
  width,
  height,
  animate = true
}: LogoProps) {
  const [useFallback, setUseFallback] = useState(false);

  // Map size presets to dimensions
  const dimensions = {
    sm: { w: 32, h: 36 },
    md: { w: 44, h: 50 },
    lg: { w: 72, h: 80 },
    xl: { w: 120, h: 135 },
    custom: { w: width || 44, h: height || 50 }
  };

  const { w, h } = dimensions[size];
  const logoSrc = '/logo.png';

  if (!useFallback) {
    return (
      <motion.img
        src={logoSrc}
        alt="Prashant Jewellers Logo"
        width={w}
        height={h}
        className={`inline-block object-contain ${className}`}
        initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
        animate={animate ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        onError={() => setUseFallback(true)}
      />
    );
  }

  return (
    <motion.svg
      width={w}
      height={h}
      viewBox="0 0 200 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-label="Prashant Jewellers Monogram Logo"
      initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <defs>
        {/* Real-gold metallic finish linear gradient with multiple gold tones */}
        <linearGradient id="goldMetallic" x1="0" y1="0" x2="200" y2="220" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#DFBA6B" /> {/* Soft cream gold */}
          <stop offset="20%" stopColor="#F7DF95" /> {/* Light bright gold */}
          <stop offset="40%" stopColor="#C59B3F" /> {/* Rich copper gold */}
          <stop offset="60%" stopColor="#876011" /> {/* Deep shadow gold */}
          <stop offset="75%" stopColor="#F9E2A0" /> {/* Highlight gold */}
          <stop offset="90%" stopColor="#D4AF37" /> {/* Classic pure gold */}
          <stop offset="100%" stopColor="#AE8223" /> {/* Royal brass gold */}
        </linearGradient>

        {/* Dynamic drop shadow filter for luxury depth */}
        <filter id="luxuryGlow" x="-10%" y="-10%" width="120%" height="120%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#D4AF37" floodOpacity="0.15" />
          <feGaussianBlur stdDeviation="1" result="blur" />
        </filter>
      </defs>

      {/* Outer subtle glow matching the luxury environment */}
      <g filter="url(#luxuryGlow)">
        {/* INTERTWINED "PJ" MONOGRAM PATH */}
        {/* Recreating the precise fluid lines, calligraphic stroke variations, and classic serifs */}
        <motion.path
          d="
            M 102,112
            C 102,84 102,56 102,36
            C 102,14 116,8 132,8
            C 148,8 162,18 162,35
            C 162,53 148,64 128,64
            L 115,64
            M 115,64
            L 115,142
            C 115,164 115,188 96,204
            C 78,218 52,216 42,192
            C 34,172 44,152 64,142
            C 84,132 102,135 102,148
            L 86,148
          "
          stroke="url(#goldMetallic)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
        />

        {/* Accent flourishes: serifs, ticks and fine detailing matching the image's royal design */}
        {/* Left-Stem lower anchor loop */}
        <motion.path
          d="
            M 86,148
            C 86,145 102,142 102,126
            L 102,68
          "
          stroke="url(#goldMetallic)"
          strokeWidth="3.5"
          strokeLinecap="round"
          initial={animate ? { pathLength: 0 } : undefined}
          animate={animate ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.4, delay: 0.4, ease: 'easeInOut' }}
        />

        {/* Small serif horizontal terminals representing classical typography detailing */}
        {/* "P" internal stem connection serif */}
        <motion.line
          x1="115"
          y1="64"
          x2="132"
          y2="64"
          stroke="url(#goldMetallic)"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {/* "J" bottom-left ring end serif */}
        <motion.line
          x1="86"
          y1="148"
          x2="108"
          y2="148"
          stroke="url(#goldMetallic)"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </motion.svg>
  );
}
