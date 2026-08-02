import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen } from 'lucide-react';

interface ReadingProgressBarProps {
  activeTab?: string;
}

export const ReadingProgressBar: React.FC<ReadingProgressBarProps> = ({ activeTab }) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout;

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }

      setIsScrolling(true);
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsScrolling(false);
      }, 1200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial call

    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [activeTab]);

  const isLongPage = activeTab === 'story' || activeTab === 'brand-book' || activeTab === 'collection' || activeTab === 'atlas';

  return (
    <>
      {/* Fixed Subtle Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-[#E8DAC8]/30 pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-[#1C2E20] via-[#C5B49A] to-[#1C2E20] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(197,180,154,0.6)]"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Optional Floating Reading Percentage Badge on Scroll for Long-form Pages */}
      <AnimatePresence>
        {isLongPage && scrollProgress > 3 && isScrolling && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="fixed top-3 right-4 sm:right-8 z-[100] bg-[#1C2E20]/90 backdrop-blur-md border border-[#C5B49A]/40 text-[#E8DAC8] px-3 py-1 rounded-full text-[11px] font-mono shadow-lg flex items-center gap-1.5 pointer-events-none"
          >
            <BookOpen className="w-3 h-3 text-[#C5B49A]" />
            <span>阅读进度</span>
            <span className="font-bold text-[#C5B49A]">{Math.round(scrollProgress)}%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
