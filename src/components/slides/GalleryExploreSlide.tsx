'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { SlideContent } from '@/types/story';
import { useMemo, useState } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

export const GalleryExploreSlide = ({ content }: { content: SlideContent }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const images = useMemo(() => content.images || [], [content.images]);

    const handleNext = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex + 1) % images.length);
        }
    };

    const handlePrev = (e?: React.MouseEvent) => {
        e?.stopPropagation();
        if (selectedImageIndex !== null) {
            setSelectedImageIndex((selectedImageIndex - 1 + images.length) % images.length);
        }
    };

    return (
        <div className="w-full h-full relative overflow-hidden flex flex-col bg-zinc-950 p-6 sm:p-12 md:p-24">
            {/* Background Decorative Element */}
            <div className="absolute top-0 right-0 p-12 md:p-24 opacity-5 hidden sm:block select-none pointer-events-none">
                <span className="text-6xl md:text-[20rem] font-black tracking-tighter uppercase whitespace-nowrap italic">GALLERY</span>
            </div>

            <div className="relative z-10 space-y-6 md:space-y-16 flex flex-col h-full">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 1 }}
                    className="space-y-2 md:space-y-6"
                >
                    <div className="inline-block px-3 py-1.5 md:px-4 md:py-2 bg-pink-500/10 border border-pink-500/20 rounded-full text-[10px] md:text-sm font-black uppercase tracking-[0.4em] md:tracking-[0.5em] text-pink-400">
                        Explora tus recuerdos
                    </div>
                    <h2 className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter leading-none text-white uppercase italic">
                        Colección <br className="sm:hidden" /> Viva
                    </h2>
                </motion.div>

                {/* Real Masonry Layout */}
                <div className="columns-2 sm:columns-3 lg:columns-4 xl:columns-5 gap-4 md:gap-8 overflow-y-auto pr-2 custom-scrollbar flex-1 pb-32 md:pb-0 masonry-container">
                    {images.map((img, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: (i % 10) * 0.05 }}
                            whileHover={{ scale: 1.02, zIndex: 10 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedImageIndex(i)}
                            className="relative mb-4 md:mb-8 break-inside-avoid rounded-2xl md:rounded-3xl overflow-hidden border border-white/10 group cursor-pointer shadow-xl ring-1 ring-white/5 active:ring-pink-500/50 transition-shadow"
                        >
                            <Image
                                src={img.src}
                                alt={img.caption || 'Recuerdo'}
                                width={500}
                                height={700}
                                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                                className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-1000 ease-out"
                            />
                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-500" />
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
                                    <Maximize2 size={24} className="text-white md:w-8 md:h-8" />
                                </div>
                            </div>

                            {/* Subtle hover caption */}
                            {img.caption && (
                                <div className="absolute bottom-0 left-0 right-0 p-4 bg-linear-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                    <p className="text-white text-[10px] md:text-xs font-medium tracking-wider uppercase truncate">
                                        {img.caption}
                                    </p>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedImageIndex !== null && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-100 flex items-center justify-center bg-black/95 backdrop-blur-3xl p-2 md:p-12"
                        onClick={() => setSelectedImageIndex(null)}
                    >
                        {/* Close Button */}
                        <motion.button
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute top-6 right-6 md:top-8 md:right-8 z-110 p-3 md:p-4 bg-white/10 hover:bg-white text-white hover:text-black rounded-full transition-all border border-white/20"
                            onClick={() => setSelectedImageIndex(null)}
                        >
                            <X size={24} className="md:w-8 md:h-8" />
                        </motion.button>

                        {/* Navigation Buttons */}
                        <motion.button
                            whileHover={{ scale: 1.1, x: -10 }}
                            className="absolute left-2 md:left-8 z-110 p-4 md:p-6 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all backdrop-blur-xl border border-white/10 hidden sm:flex"
                            onClick={(e) => { e.stopPropagation(); handlePrev(); }}
                        >
                            <ChevronLeft size={32} className="md:w-12 md:h-12" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1, x: 10 }}
                            className="absolute right-2 md:right-8 z-110 p-4 md:p-6 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-white transition-all backdrop-blur-xl border border-white/10 hidden sm:flex"
                            onClick={(e) => { e.stopPropagation(); handleNext(); }}
                        >
                            <ChevronRight size={32} className="md:w-12 md:h-12" />
                        </motion.button>

                        {/* Main Image Container */}
                        <div className="relative w-full h-full flex items-center justify-center pointer-events-none p-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={selectedImageIndex}
                                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 1.1, y: -20 }}
                                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                    className="relative max-w-full md:max-w-7xl max-h-[85vh] w-full h-full flex flex-col items-center justify-center gap-6"
                                >
                                    <div className="relative group/modal pointer-events-auto">
                                        <Image
                                            src={images[selectedImageIndex].src}
                                            alt="Recuerdo expandido"
                                            width={1200}
                                            height={800}
                                            priority
                                            className="max-w-full max-h-[65vh] md:max-h-[70vh] object-contain rounded-2xl md:rounded-3xl shadow-[0_0_80px_rgba(236,72,153,0.2)] border-2 md:border-4 border-white/10"
                                        />
                                        <div className="absolute -bottom-12 md:-bottom-16 left-0 right-0 text-center px-4">
                                            <p className="text-white/60 text-sm md:text-2xl font-light italic tracking-wide truncate md:whitespace-normal">
                                                {images[selectedImageIndex].caption || "Un momento para recordar"}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="absolute -bottom-20 md:-bottom-24 text-white/20 font-black tracking-[0.5em] md:tracking-[1em] uppercase text-[10px] md:text-xs">
                                        {selectedImageIndex + 1} / {images.length}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
