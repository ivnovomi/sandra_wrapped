'use client';

import { motion } from 'framer-motion';
import { SlideContent } from '@/types/story';
import { useMemo, useRef } from 'react';
import Image from 'next/image';

export const GallerySlide = ({ content }: { content: SlideContent }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const randomizedImages = useMemo(() => {
    const baseImages = content.images || [];
    if (baseImages.length === 0) return [];

    let pool = [...baseImages];
    while (pool.length < 30) {
      pool = [...pool, ...baseImages];
    }

    return pool.sort(() => Math.random() - 0.5);
  }, [content.images]);

  const row1 = randomizedImages.slice(0, Math.floor(randomizedImages.length / 4));
  const row2 = randomizedImages.slice(Math.floor(randomizedImages.length / 4), Math.floor(2 * randomizedImages.length / 4));
  const row3 = randomizedImages.slice(Math.floor(2 * randomizedImages.length / 4), Math.floor(3 * randomizedImages.length / 4));
  const row4 = randomizedImages.slice(Math.floor(3 * randomizedImages.length / 4));

  return (
    <div ref={containerRef} className="w-full h-full relative overflow-hidden flex flex-col justify-center bg-black">
      {/* 3D Depth Image Wall */}
      <div className="absolute inset-0 z-0 flex flex-col gap-4 md:gap-12 -rotate-6 sm:-rotate-12 scale-125 sm:scale-110 opacity-30 md:opacity-40">
        <MarqueeRow images={row1} direction={-50} duration={60} depth={0.8} />
        <MarqueeRow images={row2} direction={50} duration={85} depth={1.2} />
        <MarqueeRow images={row3} direction={-50} duration={70} depth={0.9} />
        <MarqueeRow images={row4} direction={50} duration={95} depth={1.1} />
      </div>

      <div className="absolute inset-0 z-10 pointer-events-none bg-linear-to-b from-black/95 via-black/20 to-black/95" />
      <div className="absolute inset-0 z-10 pointer-events-none bg-radial-gradient from-transparent via-transparent to-black" />

      {/* Ambiance */}
      <div className="absolute inset-0 z-15 pointer-events-none opacity-20">
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{ duration: 15 + Math.random() * 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-0.5 h-0.5 md:w-1 md:h-1 bg-white rounded-full blur-[2px]"
          />
        ))}
      </div>

      {/* Foreground Content */}
      <div className="absolute inset-0 z-30 flex flex-col items-center justify-center p-4 md:p-12 text-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6 md:space-y-12 w-full max-w-7xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="px-4 py-1.5 md:px-8 md:py-3 bg-pink-500/10 backdrop-blur-3xl border border-pink-500/20 rounded-full inline-block"
          >
            <span className="text-[9px] md:text-xs lg:text-sm font-black uppercase tracking-[0.5em] md:tracking-[0.8em] text-pink-400">
              Mosaico de una vida
            </span>
          </motion.div>

          <div className="space-y-4 md:space-y-8 flex flex-col items-center">
            <h2 className="text-5xl sm:text-7xl md:text-9xl lg:text-[12rem] font-black tracking-tighter text-white leading-none drop-shadow-[0_0_50px_rgba(0,0,0,0.8)] uppercase italic">
              {content.title}
            </h2>
            <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-4xl px-4">
              <div className="h-px flex-1 bg-linear-to-r from-transparent to-white/20" />
              <p className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-light italic text-white/70 leading-tight drop-shadow-2xl whitespace-nowrap">
                Memorias que brillan
              </p>
              <div className="h-px flex-1 bg-linear-to-l from-transparent to-white/20" />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const MarqueeRow = ({ images, direction, duration, depth }: { images: any[], direction: number, duration: number, depth: number }) => {
  if (images.length === 0) return null;
  const displayImages = [...images, ...images, ...images];

  return (
    <motion.div
      className="flex gap-4 md:gap-12 whitespace-nowrap"
      animate={{ x: [`0%`, `${direction}%`] }}
      transition={{
        duration: duration / depth,
        repeat: Infinity,
        ease: "linear"
      }}
      style={{ scale: depth, filter: `blur(${(1 - depth) * 8}px)` }}
    >
      {displayImages.map((img, i) => (
        <div
          key={i}
          className="relative w-32 h-24 sm:w-56 sm:h-40 md:w-100 md:h-72 lg:w-120 lg:h-80 rounded-xl md:rounded-7xl overflow-hidden border border-white/5 shrink-0 shadow-2xl bg-zinc-900"
        >
          <Image
            src={img.src}
            alt={img.caption || 'Recuerdo'}
            fill
            sizes="(max-width: 768px) 50vw, 33vw"
            className="object-cover transform scale-105"
          />
          <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-40" />
        </div>
      ))}
    </motion.div>
  );
};
