/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';

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
  // Map size presets to dimensions
  const dimensions = {
    sm: { w: 32, h: 36 },
    md: { w: 44, h: 50 },
    lg: { w: 72, h: 80 },
    xl: { w: 120, h: 135 },
    custom: { w: width || 44, h: height || 50 }
  };

  const { w, h } = dimensions[size];

  return (
    <motion.svg
      viewBox="0 0 260 320"
      role="img"
      aria-label="Prashant Jewellers Logo"
      style={{ width: 'auto', height: `${h}px`, minWidth: `${Math.floor(h * 0.5)}px` }}
      className={`inline-block ${className}`}
      initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <defs>
        <linearGradient id="goldGradient" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0%" stopColor="#fdf6e8" />
          <stop offset="28%" stopColor="#f3d689" />
          <stop offset="55%" stopColor="#d2a14d" />
          <stop offset="100%" stopColor="#af7b31" />
        </linearGradient>
        <filter id="softGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="8" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <path
        d="M76 24 C56 20 36 54 38 88 C42 130 58 190 96 206 C132 222 186 208 200 154 C210 110 202 68 172 48 C156 36 126 28 108 40 C96 50 100 76 108 86 C118 98 144 102 154 120 C162 138 156 164 138 180 C118 200 96 226 84 246 C68 276 44 290 30 288 C18 286 16 268 28 254 C46 232 68 210 82 180 L86 120 C88 90 92 52 76 24 Z"
        fill="url(#goldGradient)"
        filter="url(#softGlow)"
        stroke="rgba(255,255,255,0.75)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}
