'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Pause, Play, Music2 } from 'lucide-react';
import Image from 'next/image';
import { StoryData, SlideType } from '@/types/story';
import dynamic from 'next/dynamic';

const DynamicBackground = dynamic(() => import('./DynamicBackground'), { ssr: false });

const SlideLoading = () => (
  <div className="flex items-center justify-center w-full h-full">
    <motion.div
      animate={{ opacity: [0.3, 0.6, 0.3], scale: [0.98, 1, 0.98] }}
      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
      className="text-pink-500/30 text-xs font-black tracking-[1em] uppercase"
    >
      Cargando Capítulo...
    </motion.div>
  </div>
);

// Lazy load slides
const IntroSlide = dynamic(() => import('./slides/IntroSlide').then(m => m.IntroSlide), { loading: SlideLoading });
const BioSlide = dynamic(() => import('./slides/BioSlide').then(m => m.BioSlide), { loading: SlideLoading });
const StatsSlide = dynamic(() => import('./slides/StatsSlide').then(m => m.StatsSlide), { loading: SlideLoading });
const OutroSlide = dynamic(() => import('./slides/OutroSlide').then(m => m.OutroSlide), { loading: SlideLoading });
const TimelineSlide = dynamic(() => import('./slides/TimelineSlide').then(m => m.TimelineSlide), { loading: SlideLoading });
const GallerySlide = dynamic(() => import('./slides/GallerySlide').then(m => m.GallerySlide), { loading: SlideLoading });
const GalleryExploreSlide = dynamic(() => import('./slides/GalleryExploreSlide').then(m => m.GalleryExploreSlide), { loading: SlideLoading });
const FastLifeReviewSlide = dynamic(() => import('./slides/FastLifeReviewSlide').then(m => m.FastLifeReviewSlide), { loading: SlideLoading });
const DedicationSlide = dynamic(() => import('./slides/DedicationSlide').then(m => m.DedicationSlide), { loading: SlideLoading });
const DedicationsIntroSlide = dynamic(() => import('./slides/DedicationsIntroSlide').then(m => m.DedicationsIntroSlide), { loading: SlideLoading });

const SlideComponents: Record<SlideType, any> = {
  intro: IntroSlide,
  bio: BioSlide,
  stats: StatsSlide,
  outro: OutroSlide,
  timeline: TimelineSlide,
  gallery: GallerySlide,
  gallery_explore: GalleryExploreSlide,
  fast_review: FastLifeReviewSlide,
  dedications: DedicationSlide,
  dedications_intro: DedicationsIntroSlide,
};

export default function StoryViewer({ story }: { story: StoryData }) {
  const [hasStarted, setHasStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isAudioStarted, setIsAudioStarted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const audioRef = useCallback((node: HTMLAudioElement) => {
    if (node !== null) {
      node.volume = 0.4;
    }
  }, []);

  const allImages = useMemo(() => {
    if (!isMounted) return [];
    const images: string[] = [];
    story.slides.forEach(slide => {
      if (slide.content.images) {
        slide.content.images.forEach(img => images.push(img.src));
      }
    });
    // Shuffle and pick a good amount
    return [...new Set(images)].sort(() => Math.random() - 0.5);
  }, [story.slides, isMounted]);

  const currentSlide = story.slides[currentIndex];

  const handleStart = () => {
    setHasStarted(true);
    setIsAudioStarted(true);
  };

  const CurrentComponent = SlideComponents[currentSlide.type];

  const nextSlide = useCallback(() => {
    if (currentIndex < story.slides.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setIsPlaying(false);
    }
  }, [currentIndex, story.slides.length]);

  const prevSlide = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === ' ') setIsPlaying(prev => !prev);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  // Mouse move for ambient light
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  if (!hasStarted) {
    return (
      <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-100 md:cursor-none overflow-hidden">
        {/* Background Photo Mosaic - Ultra Dense Cinematic Version */}
        <div className="absolute inset-0 z-0 opacity-50 grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-1 md:gap-2 p-1 md:p-2 scale-110 -rotate-2">
          {allImages.slice(0, 120).map((src, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5, rotate: (i % 20) - 10 }}
              animate={{ opacity: 0.25, scale: 1, rotate: 0 }}
              transition={{
                delay: i * 0.02,
                duration: 1.5,
                ease: [0.22, 1, 0.36, 1]
              }}
              className="relative aspect-square rounded-md md:rounded-xl overflow-hidden grayscale hover:grayscale-0 hover:opacity-100 hover:scale-110 transition-all duration-700 border border-white/5 cursor-crosshair z-0 hover:z-50 shadow-2xl"
            >
              <Image src={src} alt="" fill className="object-cover" sizes="(max-width: 768px) 20vw, 10vw" />
            </motion.div>
          ))}
        </div>

        <div className="absolute inset-0 z-10 bg-radial-gradient from-transparent via-black/60 to-black pointer-events-none" />
        <DynamicBackground />

        {/* Custom Cursor */}
        <motion.div
          className="fixed top-0 left-0 w-12 h-12 border border-white/40 rounded-full z-100 pointer-events-none mix-blend-difference hidden md:flex items-center justify-center"
          animate={{ x: mousePosition.x - 24, y: mousePosition.y - 24 }}
          transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
        >
          <div className="w-1.5 h-1.5 bg-white rounded-full" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-20 text-center space-y-8 md:space-y-16 px-6 max-w-5xl"
        >
          <audio
            ref={audioRef}
            src="/audio/background_ambient.mp3"
            autoPlay={isAudioStarted}
            loop
            onError={(e) => console.log("Nota: Música de fondo no encontrada en /public/audio/.")}
          />
          <div className="space-y-6">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, ease: "circOut" }}
              className="h-px w-32 md:w-64 bg-pink-500/50 mx-auto mb-8"
            />
            <h1 className="text-6xl md:text-[10rem] lg:text-[13rem] font-black tracking-tighter text-white uppercase italic leading-[0.8] drop-shadow-[0_0_50px_rgba(0,0,0,1)]">
              {story.meta.title}
            </h1>
            <p className="text-pink-500 tracking-[0.6em] md:tracking-[1em] text-[10px] md:text-sm uppercase font-black pt-4 drop-shadow-lg">
              Prepárate para un viaje inolvidable
            </p>
          </div>

          <motion.div className="flex flex-col items-center gap-8">
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0 0 80px rgba(236,72,153,0.3)" }}
              whileTap={{ scale: 0.95 }}
              onClick={handleStart}
              className="group relative px-12 md:px-20 py-8 md:py-10 rounded-full border border-white/20 bg-white text-black transition-all duration-700 overflow-hidden"
            >
              <div className="absolute inset-0 bg-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
              <span className="relative z-10 text-xl md:text-3xl font-black tracking-widest uppercase group-hover:text-white transition-colors flex items-center gap-4">
                <Play size={20} fill="currentColor" className="md:w-8 md:h-8" /> Iniciar Experiencia
              </span>
            </motion.button>

            <div className="flex items-center gap-4 text-white/30 text-[10px] md:text-xs uppercase tracking-[0.4em] font-medium">
              <Music2 size={14} className="animate-bounce" /> Recomendamos activar el sonido
            </div>
          </motion.div>
        </motion.div>

        {/* Ambient Bottom Text */}
        <div className="absolute bottom-12 z-20 text-white/10 text-[8px] md:text-[10px] tracking-[0.6em] uppercase px-8 text-center flex items-center gap-4">
          <div className="h-px w-8 bg-white/10" />
          60 Años de Historia &bull; Una Vida de Magia
          <div className="h-px w-8 bg-white/10" />
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-zinc-950 text-white flex flex-col overflow-hidden md:cursor-none">
      <DynamicBackground />

      {/* Ambient Light Follower */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-0 opacity-30 md:opacity-40"
        animate={{
          background: `radial-gradient(800px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 0, 85, 0.08), rgba(0, 229, 255, 0.05), transparent 80%)`
        }}
      />

      {/* Vignette Effect */}
      <div className="fixed inset-0 pointer-events-none z-20 shadow-[inset_0_0_80px_rgba(0,0,0,0.6)] md:shadow-[inset_0_0_150px_rgba(0,0,0,0.8)]" />

      {/* Custom Cursor */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-white/20 rounded-full z-100 pointer-events-none mix-blend-difference hidden md:flex items-center justify-center"
        animate={{ x: mousePosition.x - 20, y: mousePosition.y - 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.5 }}
      >
        <div className="w-1 h-1 bg-white rounded-full" />
      </motion.div>

      {/* Header / Progress Navigation */}
      <div className="absolute top-0 left-0 w-full z-50 p-4 md:p-10 flex flex-col gap-4 md:gap-8 bg-linear-to-b from-black/95 via-black/60 to-transparent">
        <div className="flex gap-1 md:gap-2 w-full max-w-6xl mx-auto">
          {story.slides.map((slide, index) => (
            <div
              key={slide.id}
              className="h-0.5 md:h-1 flex-1 bg-white/10 rounded-full overflow-hidden cursor-pointer group relative"
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
            >
              <motion.div
                className="h-full bg-linear-to-r from-pink-500 to-blue-500"
                initial={{ width: index < currentIndex ? '100%' : '0%' }}
                animate={{
                  width: index < currentIndex ? '100%' : index === currentIndex ? '100%' : '0%',
                  opacity: index === currentIndex ? 1 : 0.2
                }}
                transition={{
                  duration: index === currentIndex ? slide.duration / 1000 : 0.5,
                  ease: "linear"
                }}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center md:items-end max-w-6xl mx-auto w-full">
          <div className="flex flex-col gap-0 md:gap-1">
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] text-pink-500 uppercase font-bold"
            >
              Capítulo {currentIndex + 1}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-4xl font-black tracking-tight"
            >
              {story.meta.beneficiary.split(' ')[0]}<span className="text-zinc-500 font-light truncate">.Wrapped</span>
            </motion.h1>
          </div>

          <div className="flex items-center gap-4 md:gap-8">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 md:p-3 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 text-white/60 hover:text-white"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <div className="hidden md:flex flex-col items-end gap-1">
              <span className="text-[10px] text-white/40 uppercase tracking-[0.4em]">Próximo</span>
              <span className="text-xs font-medium text-white/60 tracking-wider">
                {currentIndex < story.slides.length - 1 ? story.slides[currentIndex + 1].id.replace('_', ' ') : 'Fin'}
              </span>
            </div>
            <div className="text-2xl md:text-4xl font-black text-white/10 select-none">
              {(currentIndex + 1).toString().padStart(2, '0')}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 relative z-10 flex items-center justify-center w-full h-full">
        {/* Navigation Areas (Invisible on mobile, arrows on desktop) */}
        <div
          className="absolute left-0 w-1/4 h-full z-40 md:hidden"
          onClick={prevSlide}
        />
        <div
          className="absolute right-0 w-1/4 h-full z-40 md:hidden"
          onClick={nextSlide}
        />

        <motion.button
          whileHover={{ scale: 1.1, x: -5 }}
          whileTap={{ scale: 0.9 }}
          onClick={prevSlide}
          disabled={currentIndex === 0}
          className="absolute left-6 md:left-12 z-50 p-4 md:p-6 bg-white/5 hover:bg-white/10 disabled:opacity-0 rounded-full transition-all backdrop-blur-xl border border-white/10 group hidden md:flex"
        >
          <ChevronLeft size={24} className="md:w-9 md:h-9 group-hover:text-pink-400 transition-colors" />
        </motion.button>

        <AnimatePresence mode="wait" custom={currentIndex}>
          <motion.div
            key={currentIndex}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              const swipeThreshold = 50;
              if (info.offset.x > swipeThreshold) {
                prevSlide();
              } else if (info.offset.x < -swipeThreshold) {
                nextSlide();
              }
            }}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="w-full h-full flex items-center justify-center p-0 touch-none"
          >
            <CurrentComponent
              content={currentSlide.content}
              onRestartAction={() => {
                setCurrentIndex(0);
                setIsPlaying(true);
              }}
            />
          </motion.div>
        </AnimatePresence>

        <motion.button
          whileHover={{ scale: 1.1, x: 5 }}
          whileTap={{ scale: 0.9 }}
          onClick={nextSlide}
          disabled={currentIndex === story.slides.length - 1}
          className="absolute right-6 md:right-12 z-50 p-4 md:p-6 bg-white/5 hover:bg-white/10 disabled:opacity-0 rounded-full transition-all backdrop-blur-xl border border-white/10 group hidden md:flex"
        >
          <ChevronRight size={24} className="md:w-9 md:h-9 group-hover:text-pink-400 transition-colors" />
        </motion.button>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-6 md:bottom-8 left-0 w-full z-50 pointer-events-none text-center">
        <div className="opacity-20 text-[8px] md:text-[10px] tracking-[0.4em] md:tracking-[0.6em] uppercase mb-1 md:mb-2 px-4">
          {story.meta.occasion}
        </div>
        <div className="h-4 md:h-8 w-px bg-linear-to-b from-white/20 to-transparent mx-auto"></div>
      </div>
    </div>
  );
}
