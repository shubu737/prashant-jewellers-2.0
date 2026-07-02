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
    <motion.img
      src="/logo.png"
      alt="Prashant Jewellers Logo"
      style={{ width: 'auto', height: `${h}px`, minWidth: `${Math.floor(h * 0.5)}px` }}
      className={`inline-block object-contain drop-shadow-[0_2px_8px_rgba(212,175,55,0.4)] ${className}`}
      initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  );
}
