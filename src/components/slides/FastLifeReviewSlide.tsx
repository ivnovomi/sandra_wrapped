'use client';

import { AnimatePresence, motion, useAnimation } from 'framer-motion';
import { useEffect, useState, useMemo } from 'react';
import { SlideContent } from '@/types/story';

export const FastLifeReviewSlide = ({ content }: { content: SlideContent }) => {
  const controls = useAnimation();
  const [showStats, setShowStats] = useState(false);
  const [showMasonry, setShowMasonry] = useState(true);
  const images = useMemo(() => content.images || [], [content.images]);

  // Create masonry items from real images, repeating and shuffling them
  const masonryItems = useMemo(() => {
    if (images.length === 0) return [];

    // Repeat images to have 300 items for the "infinite" effect
    let items: any[] = [];
    while (items.length < 300) {
      items.push(...images);
    }

    // Shuffle the items for better variety
    return items
      .slice(0, 300)
      .sort(() => Math.random() - 0.5)
      .map((img, i) => ({
        id: i,
        src: img.src,
        height: Math.floor(Math.random() * (450 - 150 + 1) + 150),
        delay: Math.random() * 0.2,
      }));
  }, [images]);

  useEffect(() => {
    const sequence = async () => {
      await new Promise(r => setTimeout(r, 500));
      // Scroll much further for the "infinite" illusion
      await controls.start({
        y: -6000,
        transition: { duration: 7, ease: [0.45, 0, 0.55, 1] }
      });
      setShowMasonry(false);
      await new Promise(r => setTimeout(r, 500));
      setShowStats(true);
    };
    sequence();
  }, [controls]);

  // Specific data for Sandra's 60 years
  const stats = [
    { label: "Segundos de Magia", value: "1,89 B", color: "#FF0055" },
    { label: "Latidos de Pasion", value: "2.500M+", color: "#00E5FF" },
    { label: "Canciones Escuchadas", value: "1.512 M", color: "#FFD700" },
    { label: "Años de Luz", value: "60", color: "#FF0055" },
  ];

  return (
    <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
      <AnimatePresence>
        {showMasonry && (
          <motion.div
            exit={{ opacity: 0, scale: 1.5, filter: "blur(60px)" }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0 z-10"
          >
            <motion.div
              animate={controls}
              className="columns-3 sm:columns-5 md:columns-8 lg:columns-10 gap-2 p-2 opacity-60"
            >
              {masonryItems.map((item) => (
                <div
                  key={item.id}
                  className="mb-2 rounded-xl md:rounded-2xl overflow-hidden bg-zinc-900 border border-white/5"
                  style={{ height: `${item.height * 0.7}px` }} // slightly smaller on mobile via multiplier logic if needed
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.src}
                    alt="Recuerdo rápido"
                    className="w-full h-full object-cover opacity-50"
                  />
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative z-20 w-full max-w-7xl px-4 md:px-8"
          >
            <div className="text-center mb-8 md:mb-24 px-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-white/40 font-black tracking-[0.4em] md:tracking-[1em] uppercase text-[10px] md:text-xs mb-4 md:mb-8"
              >
                Tu vida en números
              </motion.div>
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-4xl sm:text-6xl md:text-[8rem] lg:text-[10rem] font-black tracking-tighter text-white leading-none px-4 italic uppercase"
              >
                {content.title}
              </motion.h2>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 px-4">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1, duration: 0.8 }}
                  className="text-center space-y-2 md:space-y-4 p-4 md:p-8 rounded-2xl md:rounded-3xl bg-white/5 backdrop-blur-3xl border border-white/10"
                >
                  <div className="text-[8px] md:text-[10px] uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/40 font-black">
                    {stat.label}
                  </div>
                  <div
                    className="text-xl sm:text-3xl md:text-6xl font-black tracking-tighter"
                    style={{ color: stat.color }}
                  >
                    {stat.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Speed lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        {Array.from({ length: 40 }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -500, x: Math.random() * 100 + '%' }}
            animate={{ y: 1500 }}
            transition={{ duration: Math.random() * 0.5 + 0.2, repeat: Infinity, delay: Math.random() }}
            className="absolute w-px h-64 bg-white"
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none z-30 shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] md:shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />
    </div>
  );
};
