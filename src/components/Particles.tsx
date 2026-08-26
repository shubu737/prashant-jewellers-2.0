/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  alpha: number;
  alphaSpeed: number;
  angle: number;
  spin: number;
}

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    let animationFrameId: number;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const particles: Particle[] = [];

    const maxParticles = 30;

    // ============================================================
    // CREATE PARTICLE
    // ============================================================

    const createParticle = (isInitial = false): Particle => {
      return {
        x: Math.random() * width,

        y: isInitial
          ? Math.random() * height
          : height + 10,

        size: Math.random() * 2 + 0.5,

        speedY: -(Math.random() * 0.4 + 0.1),

        speedX: Math.random() * 0.3 - 0.15,

        alpha: Math.random() * 0.5 + 0.1,

        alphaSpeed: Math.random() * 0.005 + 0.002,

        angle: Math.random() * Math.PI * 2,

        spin: Math.random() * 0.02 - 0.01,
      };
    };

    // ============================================================
    // INITIAL PARTICLES
    // ============================================================

    for (let i = 0; i < maxParticles; i++) {
      particles.push(createParticle(true));
    }

    // ============================================================
    // RESIZE
    // ============================================================

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize, {
      passive: true,
    });

    // ============================================================
    // PERFORMANCE
    // ============================================================

    let lastTime = 0;

    const TARGET_FPS = 30;

    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    // ============================================================
    // DRAW LOOP
    // ============================================================

    const draw = (timestamp: number) => {
      animationFrameId = requestAnimationFrame(draw);

      if (timestamp - lastTime < FRAME_INTERVAL) {
        return;
      }

      lastTime = timestamp;

      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // --------------------------------------------------------
        // Movement
        // --------------------------------------------------------

        p.y += p.speedY;

        p.x +=
          p.speedX +
          Math.sin(p.angle) * 0.1;

        p.angle += p.spin;

        // --------------------------------------------------------
        // Fade / sparkle
        // --------------------------------------------------------

        p.alpha += p.alphaSpeed;

        if (p.alpha > 0.7 || p.alpha < 0.1) {
          p.alphaSpeed = -p.alphaSpeed;
        }

        const drawAlpha = Math.max(
          0.05,
          Math.min(p.alpha, 0.7)
        );

        // --------------------------------------------------------
        // Draw gold particle
        // --------------------------------------------------------

        ctx.beginPath();

        ctx.fillStyle = `rgba(212, 175, 55, ${drawAlpha})`;

        ctx.arc(
          p.x,
          p.y,
          p.size,
          0,
          Math.PI * 2
        );

        ctx.fill();

        // --------------------------------------------------------
        // Reset when leaving screen
        // --------------------------------------------------------

        if (p.y < -10) {
          particles[i] = createParticle(false);
        }

        if (p.x < -10) {
          p.x = width + 10;
        }

        if (p.x > width + 10) {
          p.x = -10;
        }
      }
    };

    draw(0);

    // ============================================================
    // CLEANUP
    // ============================================================

    return () => {
      window.removeEventListener(
        'resize',
        handleResize
      );

      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="gold-dust-canvas"
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        w-full
        h-full
        block
        z-0
      "
      style={{
        mixBlendMode: 'screen',
      }}
    />
  );
}