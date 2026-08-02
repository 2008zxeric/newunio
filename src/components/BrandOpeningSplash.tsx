import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { UnioLogo } from './UnioLogo';
import { FOUNDING_YEAR } from '../utils/brandConstants';

interface BrandOpeningSplashProps {
  onComplete?: () => void;
}

export const BrandOpeningSplash: React.FC<BrandOpeningSplashProps> = ({ onComplete }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);
  const [step, setStep] = useState<number>(0);

  useEffect(() => {
    // Stage 1: Logo & text reveal
    const timer1 = setTimeout(() => {
      setStep(1);
    }, 400);

    // Stage 2: Sub-quote reveal
    const timer2 = setTimeout(() => {
      setStep(2);
    }, 1100);

    // Stage 3: Auto dissipate curtain to enter homepage
    const timer3 = setTimeout(() => {
      handleEnter();
    }, 2400);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  const handleEnter = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 600);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          onClick={handleEnter}
          className="fixed inset-0 z-[100] bg-[#070b08] text-[#f6f2eb] flex flex-col items-center justify-center px-6 overflow-hidden cursor-pointer select-none"
        >
          {/* Subtle Atmospheric Light Radial */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(210,196,173,0.18),transparent_70%)] pointer-events-none" />
          
          {/* Background Texture Grain */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-20 mix-blend-luminosity filter brightness-70 contrast-125 pointer-events-none"
            style={{ backgroundImage: `url('https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?q=80&w=1600')` }}
          />

          {/* Central Opening Box */}
          <div className="relative z-10 flex flex-col items-center text-center space-y-6 max-w-md mx-auto">
            
            {/* Emblem with Unfolding Gold Glow */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: step >= 0 ? 1 : 0.8, opacity: step >= 0 ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="relative"
            >
              <div className="absolute -inset-6 rounded-full bg-[#d2c4ad]/25 blur-2xl animate-pulse" />
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-b from-[#141c17] to-[#070b08] border border-[#d2c4ad]/40 p-4 flex items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.9)] relative">
                <UnioLogo size={52} color="#e5d8c5" animatedBreathing={true} />
              </div>
            </motion.div>

            {/* Title Unfold */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: step >= 1 ? 1 : 0, y: step >= 1 ? 0 : 15 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-2"
            >
              <span className="text-[10px] sm:text-xs font-mono tracking-[0.4em] text-[#d2c4ad] uppercase font-light block">
                UNIO AROMA · 始于 {FOUNDING_YEAR}
              </span>
              <h1 className="font-serif text-3xl sm:text-5xl font-normal tracking-tight text-[#f6f2eb]">
                UNIO&nbsp;元香
              </h1>
            </motion.div>

            {/* Botanical Quote Unfold */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: step >= 2 ? 1 : 0, y: step >= 2 ? 0 : 10 }}
              transition={{ duration: 0.7, ease: 'easeOut' }}
              className="space-y-3 pt-1"
            >
              <p className="font-serif italic text-sm sm:text-base text-[#d2c4ad]/90 tracking-wide">
                “从极境撷取芳香，因世界元于一息”
              </p>
              <p className="text-[10px] sm:text-xs text-[#b4aca2] font-light font-sans tracking-widest uppercase">
                Original Harmony Sanctuary
              </p>
            </motion.div>

            {/* Quick Skip Prompt */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: step >= 2 ? 0.6 : 0 }}
              className="pt-8 text-[10px] font-mono tracking-widest text-[#d2c4ad] flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#d2c4ad] animate-ping" />
              <span>轻触任意处入馆</span>
            </motion.div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
