'use client';
import { motion } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

export default function Landing() {
  return (
    <section className="relative h-screen w-full overflow-hidden bg-dark-900">
      <ParticleBackground />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="text-center"
        >
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-light tracking-tight"
          >
            <span className="block text-white">Finance.</span>
            <span className="block text-white mt-2">Intelligence.</span>
            <span className="block text-gradient mt-2">Built for the AI Era.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="mt-8 text-lg md:text-xl text-gray-400 font-light"
          >
            Perri Luo / Finance Student · Builder · Researcher · AI Explorer
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
