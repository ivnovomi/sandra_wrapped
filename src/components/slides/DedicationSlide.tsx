'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlideContent } from '@/types/story';
import { Quote, Volume2, VolumeX } from 'lucide-react';

export const DedicationSlide = ({ content }: { content: SlideContent }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [showDedication, setShowDedication] = useState(true);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const video = content.videos?.[0];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' || e.key === 'M') setIsMuted(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);

    // Hide dedication text after 7 seconds to focus on the video
    const timer = setTimeout(() => {
      setShowDedication(false);
    }, 7000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, []);

  if (!video) return null;

  return (
    <div className="w-full h-full relative overflow-hidden bg-black flex items-center justify-center">
      {/* Background Video (Mobile 9:16 optimized) */}
      <div className="absolute inset-0 z-0 flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={video.url}
          className="h-full w-full md:w-auto md:aspect-9/16 object-cover"
          playsInline
          autoPlay
          muted={isMuted}
          loop
        />

        {/* Dynamic Overlays for readability - Fades out when text is hidden */}
        <motion.div
          animate={{ opacity: showDedication ? 1 : 0.3 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-10"
        >
          <div className="absolute inset-0 bg-linear-to-b from-black/80 via-transparent to-black/95" />
          <div className="absolute inset-0 bg-radial-gradient from-transparent via-transparent to-black/70" />
        </motion.div>
      </div>

      {/* Sound Toggle (High Visibility) */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsMuted(!isMuted)}
        className="absolute top-24 right-4 md:top-40 md:right-12 z-50 p-3 md:p-6 bg-white/10 backdrop-blur-3xl border border-white/20 rounded-full text-white hover:bg-white/20 transition-all shadow-2xl"
      >
        {isMuted ? <VolumeX size={20} className="md:w-8 md:h-8" /> : <Volume2 size={20} className="md:w-8 md:h-8" />}
      </motion.button>

      {/* Content Overlay */}
      <AnimatePresence>
        {showDedication && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 30, filter: "blur(20px)" }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 z-20 flex flex-col justify-end p-6 sm:p-12 md:p-32 pointer-events-none"
          >
            <div className="max-w-4xl space-y-6 md:space-y-12">
              <div className="flex items-center gap-4 md:gap-8">
                <motion.div
                  initial={{ rotate: -20, scale: 0 }}
                  animate={{ rotate: 0, scale: 1 }}
                  className="w-12 h-12 md:w-24 md:h-24 rounded-2xl md:rounded-3xl bg-pink-500/10 backdrop-blur-3xl border border-pink-500/20 flex items-center justify-center text-pink-400"
                >
                  <Quote size={20} fill="currentColor" className="opacity-50 md:w-10 md:h-10" />
                </motion.div>
                <div className="space-y-1 md:space-y-2">
                  <div className="text-pink-500 text-[9px] md:text-sm font-black tracking-[0.4em] md:tracking-[0.6em] uppercase">
                    DEDICATORIA ESPECIAL
                  </div>
                  <h3 className="text-2xl sm:text-4xl md:text-6xl font-black text-white tracking-tighter uppercase leading-none italic">
                    De: {video.author}
                  </h3>
                </div>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 1.2 }}
                className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-light italic leading-[1.2] text-white drop-shadow-2xl px-2"
              >
                &quot;{video.message}&quot;
              </motion.p>

              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="pt-2 md:pt-4 origin-left"
              >
                <div className="h-1 w-24 md:w-48 bg-pink-500 rounded-full shadow-[0_0_20px_rgba(236,72,153,0.5)]" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Ambient background text */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 z-0 opacity-5 select-none pointer-events-none hidden lg:block overflow-hidden h-[80vh]">
        <div className="text-[12rem] font-black text-white/10 uppercase tracking-tighter whitespace-nowrap rotate-90 origin-center">
          DE LOV &bull; LIFE &bull; MEMORIES
        </div>
      </div>
    </div>
  );
};
