'use client';

import { motion } from 'framer-motion';
import { SlideContent } from '@/types/story';
import { Heart, MessageSquare, Sparkles } from 'lucide-react';

export const DedicationsIntroSlide = ({ content }: { content: SlideContent }) => {
    return (
        <div className="w-full h-full relative flex flex-col items-center justify-center text-center p-4 md:p-12 overflow-hidden bg-black">
            {/* Background Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.1, 0.2, 0.1],
                }}
                transition={{ duration: 10, repeat: Infinity }}
                className="absolute inset-x-0 top-0 h-full bg-radial-gradient from-pink-500/20 via-transparent to-transparent"
            />

            {/* Floating Particles */}
            <div className="absolute inset-0 pointer-events-none opacity-10 z-0">
                {Array.from({ length: 12 }).map((_, i) => (
                    <motion.div
                        key={i}
                        animate={{
                            y: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            x: [Math.random() * 100 + '%', Math.random() * 100 + '%'],
                            scale: [0.4, 1, 0.4],
                        }}
                        transition={{ duration: 20 + Math.random() * 10, repeat: Infinity }}
                        className="absolute"
                    >
                        <Heart size={16} className="text-pink-500/40 md:w-5 md:h-5" />
                    </motion.div>
                ))}
            </div>

            <div className="relative z-10 space-y-6 md:space-y-12 max-w-5xl w-full flex flex-col items-center">
                {/* Icon Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, type: "spring" }}
                    className="relative"
                >
                    <div className="w-16 h-16 md:w-32 md:h-32 rounded-full bg-pink-500/10 backdrop-blur-2xl border border-pink-500/20 flex items-center justify-center text-pink-500 mx-auto">
                        <MessageSquare size={24} className="md:w-12 md:h-12" />
                    </div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="absolute -inset-2 md:-inset-4 border border-dashed border-pink-500/10 rounded-full"
                    />
                </motion.div>

                {/* Text Area */}
                <div className="space-y-4 md:space-y-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="space-y-2 md:space-y-4"
                    >
                        <div className="flex items-center justify-center gap-2 md:gap-4 text-pink-500/80 font-black tracking-[0.3em] md:tracking-[0.6em] uppercase text-[9px] md:text-xs">
                            <Sparkles size={12} className="md:w-3 md:h-3" />
                            El Mensaje de los Tuyos
                            <Sparkles size={12} className="md:w-3 md:h-3" />
                        </div>
                        <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-[8rem] font-black tracking-tighter leading-[0.9] text-white uppercase italic">
                            Dedicando <br className="hidden sm:block" /> Amor
                        </h2>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 1.2 }}
                        className="text-base sm:text-xl md:text-3xl lg:text-4xl font-light italic text-white/50 max-w-3xl mx-auto leading-tight px-6"
                    >
                        &quot;Hay voces que acompañan el camino, <br className="hidden sm:block" /> y corazones que celebran cada paso que das.&quot;
                    </motion.p>
                </div>

                {/* Bottom Line */}
                <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ delay: 1.2, duration: 1 }}
                    className="w-24 md:w-48 h-px bg-linear-to-r from-transparent via-pink-500/40 to-transparent pt-4"
                />
            </div>
        </div>
    );
};
