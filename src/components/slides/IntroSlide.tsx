'use client';

import { motion } from 'framer-motion';
import { SlideContent } from '@/types/story';

export const IntroSlide = ({ content }: { content: SlideContent }) => {
  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full h-full p-4 md:p-12 overflow-hidden bg-black">
      {/* Dynamic Background Element */}
      <motion.div
        initial={{ scale: 1.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.1 }}
        transition={{ duration: 4, ease: "easeOut" }}
        className="absolute inset-0 bg-radial-gradient from-pink-500/20 via-transparent to-transparent z-0"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-7xl flex flex-col items-center gap-6 md:gap-12"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          <span className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-3xl text-white/50 text-[10px] md:text-sm font-black uppercase tracking-[0.4em] md:tracking-[0.8em]">
            {content.subtitle}
          </span>
        </motion.div>

        <h1 className="text-5xl sm:text-7xl md:text-[8rem] lg:text-[11rem] xl:text-[13rem] font-black tracking-tighter leading-[0.85] flex flex-wrap justify-center items-center select-none px-4 max-w-full">
          {content?.title?.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 100, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 1 + i * 0.2,
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="inline-block mx-2 sm:mx-4 md:mx-6 bg-linear-to-b from-white to-white/40 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.15)] uppercase italic"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 2 }}
          className="flex items-center justify-center gap-4 md:gap-10 px-6 w-full max-w-3xl"
        >
          <div className="h-px flex-1 bg-linear-to-r from-transparent via-white/20 to-transparent md:to-white/20" />

          <div className="flex items-center gap-2 text-base sm:text-xl md:text-3xl lg:text-5xl font-light italic text-white/40 tracking-tight md:tracking-widest whitespace-nowrap">
            {content.highlight?.split(' ').map((word, i) => {
              const isSixty = word === "60";
              if (isSixty) {
                return (
                  <span key={i} className="relative inline-block mx-1">
                    <span className="relative inline-block">
                      60
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: "120%" }}
                        transition={{ delay: 4, duration: 0.5, ease: "easeInOut" }}
                        className="absolute top-1/2 left-[-10%] h-1 md:h-2 bg-pink-500/80 -rotate-3 rounded-full z-20"
                      />
                    </span>
                    <motion.span
                      initial={{ opacity: 0, y: 10, rotate: 10, scale: 0.5 }}
                      whileInView={{ opacity: 1, y: -25, rotate: -15, scale: 1 }}
                      transition={{ delay: 4.4, duration: 0.5, type: "spring" }}
                      className="absolute -top-6 -right-4 md:-top-12 md:-right-8 text-pink-500 font-black text-2xl md:text-6xl not-italic"
                    >
                      30!
                    </motion.span>
                  </span>
                )
              }
              return <span key={i}>{word}</span>
            })}
          </div>

          <div className="h-px flex-1 bg-linear-to-l from-transparent via-white/20 to-transparent md:to-white/20" />
        </motion.div>
      </motion.div>

      {/* Ambient background rings */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="w-[80vh] md:w-[150vh] h-[80vh] md:h-[150vh] border border-white/5 rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute w-[50vh] md:w-[100vh] h-[50vh] md:h-screen border border-pink-500/5 rounded-full"
        />
      </div>
    </div>
  );
};
