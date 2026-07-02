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

  // Render the client's uploaded raster logo from `public/logo-v2.png` as primary.
  return (
    <motion.img
      src="/logo-v2.png"
      alt="Prashant Jewellers Logo"
      style={{ width: 'auto', height: `${h}px`, minWidth: `${Math.floor(h * 0.4)}px` }}
      className={`inline-block object-contain ${className}`}
      initial={animate ? { opacity: 0, scale: 0.95 } : undefined}
      animate={animate ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    />
  );
}
