'use client';

import { motion } from 'framer-motion';
import { SlideContent } from '@/types/story';

export const TimelineSlide = ({ content }: { content: SlideContent }) => {
  return (
    <div className="w-full h-full relative flex flex-col justify-center bg-black overflow-hidden p-6 sm:p-12 md:p-24">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 p-8 md:p-24 opacity-5 hidden sm:block pointer-events-none select-none">
        <span className="text-8xl md:text-[20rem] font-black tracking-tighter uppercase whitespace-nowrap italic">TIMELINE</span>
      </div>

      <div className="relative z-10 flex flex-col h-full justify-center space-y-8 md:space-y-24 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-3 md:space-y-6 shrink-0"
        >
          <div className="inline-block px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[9px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.6em] text-white/40">
            Crónica de vida
          </div>
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.9] text-white uppercase italic">
            {content.title}
          </h2>
        </motion.div>

        {/* Scrollable Events Area */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-12 relative px-1 md:px-2 overflow-y-auto md:overflow-visible custom-scrollbar pr-4 md:pr-0">
          {/* Horizontal Line Line (Desktop only) */}
          <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-white/20 via-white/5 to-transparent hidden md:block" />

          {content.events?.map((event, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              className="pt-4 md:pt-10 space-y-2 md:space-y-6 group shrink-0"
            >
              <div className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-black text-zinc-100 group-hover:text-pink-500 transition-colors tracking-tighter leading-none italic">
                {event.year}
              </div>
              <div className="h-0.5 md:h-1 w-8 md:w-12 bg-white/10 group-hover:w-full group-hover:bg-pink-500 transition-all duration-700" />
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl font-light text-zinc-400 group-hover:text-white transition-colors leading-snug">
                {event.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
