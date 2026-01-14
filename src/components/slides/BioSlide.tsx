'use client';

import { motion } from 'framer-motion';
import { SlideContent } from '@/types/story';
import { Baby, Heart, Star, MapPin, Sparkles } from 'lucide-react';

const icons: Record<string, any> = {
  baby: Baby,
  heart: Heart,
  star: Star,
};

export const BioSlide = ({ content }: { content: SlideContent }) => {
  const Icon = content.icon ? icons[content.icon] : Star;

  return (
    <div className="w-full h-full relative bg-zinc-950 overflow-hidden flex items-center justify-center p-4 md:p-12">
      {/* Dynamic Background (Blurred version of the image if exists) */}
      {content.image && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={content.image}
            alt="Blur BG"
            className="w-full h-full object-cover blur-3xl scale-110"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      )}

      <div className="relative z-10 w-full max-w-7xl h-full flex flex-col md:flex-row items-center gap-10 md:gap-20">

        {/* Visual Showcase Piece */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, x: -50 }}
          whileInView={{ opacity: 1, scale: 1, x: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full md:w-1/2 aspect-4/5 md:aspect-auto md:h-[70vh] group"
        >
          {content.image ? (
            <div className="relative w-full h-full rounded-4xl md:rounded-[4rem] overflow-hidden border-4 border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.5)] bg-zinc-900">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={content.image}
                alt={content.title}
                className="w-full h-full object-contain md:object-cover group-hover:scale-105 transition-transform duration-2000"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-60" />

              {/* Corner Sparkle */}
              <div className="absolute top-8 right-8 text-white/30">
                <Sparkles size={32} />
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-xl">
              <div className="relative">
                <div className="w-48 h-48 md:w-96 md:h-96 rounded-full bg-pink-500/20 blur-[100px] absolute inset-0 -translate-x-1/2 -translate-y-1/2" />
                <Icon size={120} className="text-pink-500 drop-shadow-[0_0_50px_rgba(236,72,153,0.4)] md:w-64 md:h-64 relative z-10" />
              </div>
            </div>
          )}

          {/* Accent decoration */}
          <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-pink-500/20 blur-3xl rounded-full" />
        </motion.div>

        {/* Content Side */}
        <div className="w-full md:w-1/2 space-y-8 md:space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <div className="h-px w-12 bg-pink-500" />
              <span className="text-pink-500 text-[10px] md:text-xs font-black uppercase tracking-[0.6em]">
                {content.highlight || 'CAPÍTULO DE VIDA'}
              </span>
            </div>

            <h2 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-white uppercase italic drop-shadow-2xl">
              {content.title}
            </h2>

            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-2">
              {content.date && (
                <div className="text-xl md:text-3xl font-light text-white/60">
                  {content.date}
                </div>
              )}
              {content.location && (
                <div className="flex items-center gap-2 text-white/40 text-lg md:text-xl italic">
                  <MapPin size={20} className="text-pink-500" />
                  {content.location}
                </div>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <p className="text-xl md:text-4xl font-light leading-snug text-zinc-300 border-l-2 border-white/10 pl-8 italic">
              &quot;{content.description}&quot;
            </p>

            {content.people && content.people.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {content.people.map((person, i) => (
                  <div key={i} className="px-6 py-2 rounded-full border border-white/5 bg-white/5 text-white/40 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase hover:bg-white/10 transition-colors">
                    {person}
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Background Watermark */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rotate-90 hidden lg:block opacity-[0.03] select-none pointer-events-none">
        <span className="text-[15rem] font-black uppercase tracking-tighter whitespace-nowrap">
          {content.title || 'LEGADO'}
        </span>
      </div>
    </div>
  );
};
