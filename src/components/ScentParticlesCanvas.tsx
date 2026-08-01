import React, { useEffect, useRef } from 'react';

interface ScentParticlesCanvasProps {
  particleCount?: number;
  colorTheme?: 'amber' | 'rose' | 'forest';
  interactive?: boolean;
}

export const ScentParticlesCanvas: React.FC<ScentParticlesCanvasProps> = ({
  particleCount = 50,
  colorTheme = 'amber',
  interactive = true,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    window.addEventListener('resize', handleResize);

    // Mouse tracking for magnetic scent drift
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    if (interactive && canvas.parentElement) {
      canvas.parentElement.addEventListener('mousemove', handleMouseMove);
      canvas.parentElement.addEventListener('mouseleave', handleMouseLeave);
    }

    // Color palettes
    const getColors = () => {
      switch (colorTheme) {
        case 'rose':
          return [
            'rgba(226, 175, 185, ',
            'rgba(210, 196, 173, ',
            'rgba(242, 215, 220, ',
            'rgba(180, 140, 150, ',
          ];
        case 'forest':
          return [
            'rgba(180, 200, 175, ',
            'rgba(210, 196, 173, ',
            'rgba(140, 170, 140, ',
            'rgba(225, 215, 190, ',
          ];
        case 'amber':
        default:
          return [
            'rgba(210, 196, 173, ', // #d2c4ad
            'rgba(229, 216, 197, ', // #e5d8c5
            'rgba(246, 242, 235, ', // #f6f2eb
            'rgba(180, 155, 120, ',
          ];
      }
    };

    const colorPalettes = getColors();

    // Particle interface
    interface Particle {
      x: number;
      y: number;
      size: number;
      baseX: number;
      baseY: number;
      vx: number;
      vy: number;
      color: string;
      alpha: number;
      maxAlpha: number;
      pulseSpeed: number;
      wobbleSpeed: number;
      wobbleAmp: number;
      angle: number;
    }

    const particles: Particle[] = [];

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 2.8 + 0.6; // Soft dust particles
      const x = Math.random() * width;
      const y = Math.random() * height;
      const colorPrefix = colorPalettes[Math.floor(Math.random() * colorPalettes.length)];
      const maxAlpha = Math.random() * 0.65 + 0.2;

      particles.push({
        x,
        y,
        size,
        baseX: x,
        baseY: y,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -Math.random() * 0.4 - 0.15, // Gentle upward drift like aroma mist
        color: colorPrefix,
        alpha: Math.random() * maxAlpha,
        maxAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        wobbleSpeed: Math.random() * 0.02 + 0.005,
        wobbleAmp: Math.random() * 1.5 + 0.5,
        angle: Math.random() * Math.PI * 2,
      });
    }

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        // Floating motion
        p.angle += p.wobbleSpeed;
        p.x += p.vx + Math.sin(p.angle) * p.wobbleAmp * 0.1;
        p.y += p.vy;

        // Breathing opacity
        p.alpha += Math.sin(p.angle) * p.pulseSpeed;
        if (p.alpha < 0.1) p.alpha = 0.1;
        if (p.alpha > p.maxAlpha) p.alpha = p.maxAlpha;

        // Reset particle if drifted out of bounds
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;

        // Mouse magnetic dispersion effect
        if (interactive && mouse.x > 0) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius) {
            const force = (mouse.radius - dist) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            p.x -= Math.cos(angle) * force * 3;
            p.y -= Math.sin(angle) * force * 3;
          }
        }

        // Draw particle with soft glow halo
        ctx.save();
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.alpha})`;
        ctx.shadowColor = p.color.replace('rgba', 'rgb').split(',').slice(0, 3).join(',') + ')';
        ctx.shadowBlur = p.size * 4;
        ctx.fill();

        // Extra outer halo for larger particles
        if (p.size > 2) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${p.alpha * 0.25})`;
          ctx.fill();
        }

        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      if (interactive && canvas.parentElement) {
        canvas.parentElement.removeEventListener('mousemove', handleMouseMove);
        canvas.parentElement.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [particleCount, colorTheme, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-90"
    />
  );
};
