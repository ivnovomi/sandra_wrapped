'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SlideContent } from '@/types/story';
import { RefreshCcw, Heart, Star, Camera, Film, Users, Music, Image as LucideImage, PenTool, Code, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';

export const OutroSlide = ({ content, onRestartAction }: { content: SlideContent; onRestartAction: () => void }) => {
  const [stage, setStage] = useState<'main' | 'credits' | 'finale'>('main');

  useEffect(() => {
    if (stage === 'main') {
      const timer = setTimeout(() => {
        setStage('credits');
      }, 10000);
      return () => clearTimeout(timer);
    }
    if (stage === 'credits') {
      const timer = setTimeout(() => {
        setStage('finale');
      }, 55000); // Wait for credits to finish + buffer
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleReload = () => {
    window.location.reload();
  };

  const creditSections = [
    {
      title: "DESARROLLADOR",
      names: ["Iván Dimitri Novomiast Dieguez", "Antigravity - Gemini 3"]
    },
    {
      title: "UI-UX DESIGN",
      names: ["Gemini 3 Flash"]
    },
    {
      title: "AGRADECIMIENTOS ESPECIALES",
      names: ["Valeria", "Celina", "Tatiana", "Saskia", "Yolanda", "Carlos", "Fabiana", "Marita", "Veronica", "Bernie", "Maggy", "Yannic"]
    }
  ];

  return (
    <div className="relative flex flex-col items-center justify-center text-center w-full h-full p-4 md:p-12 overflow-hidden bg-black">
      {/* Background Cinematic Shimmer */}
      <motion.div
        animate={{
          opacity: [0.02, 0.08, 0.02],
          x: [-50, 50, -50]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-linear-to-tr from-zinc-900 via-transparent to-zinc-900 pointer-events-none"
      />

      <AnimatePresence mode="wait">
        {stage === 'main' && (
          <motion.div
            key="outer-main"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.9, filter: 'blur(20px)' }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="relative z-10 space-y-8 md:space-y-16 w-full max-w-6xl"
          >
            <motion.h1
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-[10rem] xl:text-[12rem] font-black tracking-tighter leading-[0.85] text-white uppercase italic px-4"
            >
              {content.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 1.2 }}
              className="space-y-6 flex flex-col items-center"
            >
              <p className="text-base sm:text-xl md:text-3xl lg:text-4xl font-light text-white/50 italic max-w-3xl mx-auto leading-relaxed px-6">
                &quot;{content.subtitle}&quot;
              </p>
              <div className="h-px w-24 md:w-48 bg-pink-500/40" />
            </motion.div>
          </motion.div>
        )}

        {stage === 'credits' && (
          <motion.div
            key="outer-credits"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, filter: 'blur(30px)' }}
            transition={{ duration: 2 }}
            className="relative z-10 w-full h-full flex flex-col items-center"
          >
            {/* The Rolling Credits */}
            <motion.div
              initial={{ y: "100vh" }}
              animate={{ y: "-240vh" }}
              transition={{
                duration: 50,
                ease: "linear",
              }}
              className="w-full flex flex-col items-center gap-24 md:gap-48"
            >
              {/* Big Ending Title */}
              <div className="flex flex-col items-center gap-8 py-20">
                <Star size={40} className="text-pink-500 animate-pulse" />
                <h2 className="text-7xl md:text-[15rem] font-black text-white italic tracking-tighter uppercase leading-none">FIN.</h2>
                <div className="h-1 w-32 bg-pink-500/50" />
              </div>

              {/* Individual Sections */}
              {creditSections.map((section, idx) => (
                <div key={idx} className="flex flex-col items-center gap-8 max-w-2xl px-4">
                  <span className="text-pink-500 font-black tracking-[0.6em] text-xs md:text-sm uppercase bg-white/5 px-6 py-2 rounded-full border border-white/10">
                    {section.title}
                  </span>
                  <div className="space-y-4">
                    {section.names.map((name, i) => (
                      <p key={i} className="text-3xl md:text-6xl text-white font-light italic opacity-90 tracking-tight">
                        {name}
                      </p>
                    ))}
                  </div>
                </div>
              ))}

              {/* Special Icons Row */}
              <div className="flex gap-12 md:gap-16 text-white/10 pt-20 flex-wrap justify-center">
                <Film size={40} />
                <Camera size={40} />
                <Users size={40} />
                <Music size={40} />
                <Code size={40} />
                <Sparkles size={40} />
              </div>

              {/* Finale Message */}
              <div className="text-center space-y-12 py-40 flex flex-col items-center px-6">
                <div className="text-4xl md:text-7xl text-white font-black tracking-tighter italic leading-tight uppercase">
                  &quot;Y a toda la gente <br className="hidden md:block" /> que la hace brillar.&quot;
                </div>

                <Heart size={80} className="text-pink-600 fill-pink-600 animate-bounce mt-12" />

                <div className="space-y-4 pt-12">
                  <p className="text-2xl md:text-4xl text-white font-black tracking-[0.3em] uppercase">
                    UNA PRODUCCIÓN DE TU FAMILIA
                  </p>
                  <p className="text-white/20 tracking-[1em] text-[10px] md:text-xs">2026 &bull; PARA SANDRA</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {stage === 'finale' && (
          <motion.div
            key="outer-finale"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-7xl flex flex-col items-center justify-center min-h-screen gap-6 md:gap-16 p-4 md:p-8"
          >
            <div className="text-center space-y-3 md:space-y-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-pink-500 font-black tracking-[0.4em] md:tracking-[0.8em] uppercase text-[9px] md:text-xs"
              >
                Cita Final
              </motion.div>

              <div className="relative inline-block w-full">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 1.2 }}
                  className="text-[clamp(1.5rem,5.5vw,5.5rem)] font-black tracking-tighter text-white leading-[1.05] max-w-[95vw] md:max-w-5xl mx-auto italic uppercase wrap-break-word px-4 md:px-0"
                >
                  {content.subtitle}
                </motion.h2>
              </div>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
                className="h-px md:h-1 w-20 md:w-40 bg-pink-500/50 mx-auto mt-4 md:mt-12"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.5, duration: 0.8 }}
              className="flex flex-col items-center gap-4 w-full px-4"
            >
              <button
                onClick={handleReload}
                className="group flex gap-3 md:gap-4 px-6 md:px-12 py-4 md:py-6 rounded-full bg-white text-black hover:bg-pink-500 hover:text-white transition-all duration-700 shadow-[0_0_40px_rgba(255,255,255,0.2)] border-none w-full sm:w-auto items-center justify-center"
              >
                <RefreshCcw size={18} className="md:w-6 md:h-6 group-hover:rotate-180 transition-transform duration-700" />
                <span className="text-sm md:text-xl lg:text-2xl font-black uppercase tracking-widest leading-none pt-0.5">
                  ¿Ver de nuevo?
                </span>
              </button>
              <p className="text-white/20 text-[8px] md:text-[10px] tracking-[0.3em] uppercase mt-2">
                Experiencia creada con amor
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
