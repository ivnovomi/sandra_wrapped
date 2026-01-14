'use client';

import { motion } from 'framer-motion';
import { SlideContent } from '@/types/story';

export const StatsSlide = ({ content }: { content: SlideContent }) => {
  return (
    <div className="w-full h-full relative flex items-center justify-center p-6 md:p-12 overflow-hidden bg-black">
      <div className="absolute inset-0 bg-radial-gradient from-blue-500/10 via-transparent to-transparent z-0 opacity-50" />

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-8 md:gap-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center space-y-4 md:space-y-6"
        >
          <div className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-[10px] md:text-xs font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-blue-400">
            Estadísticas
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-8xl lg:text-9xl font-black tracking-tighter text-white px-4 leading-[0.8] uppercase italic">
            {content.title}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 w-full max-h-[50vh] md:max-h-none overflow-y-auto md:overflow-visible custom-scrollbar px-4 pt-4">
          {content.stats?.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="group p-6 md:p-10 bg-white/5 backdrop-blur-3xl rounded-4xl md:rounded-[3rem] border border-white/10 hover:border-blue-500/40 transition-all duration-700 text-center flex flex-col items-center justify-center"
            >
              <div className="text-[10px] md:text-sm uppercase tracking-[0.4em] md:tracking-[0.6em] text-blue-400/60 mb-3 md:mb-6 font-black group-hover:text-blue-400 transition-colors">
                {stat.label}
              </div>
              <div className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter text-white group-hover:scale-105 transition-transform duration-700 leading-none italic">
                {stat.value}
              </div>
              <div className="mt-4 md:mt-8 w-12 md:w-16 h-1 bg-blue-500/20 rounded-full group-hover:w-full group-hover:bg-blue-500 transition-all duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};
