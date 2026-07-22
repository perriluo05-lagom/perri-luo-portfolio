'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExperimentCard from './ExperimentCard';
import HumanAICollaboration from './HumanAICollaboration';
import { toolsData } from '@/utils/constants';
import { ArrowDown, Sparkles } from 'lucide-react';

export default function AIPlayground() {
  const [activeStage, setActiveStage] = useState<string | null>(null);

  const stages = ['Financial Information', 'Research Process', 'Investment Decision'];

  return (
    <section id="ai" className="min-h-screen py-24 px-4 bg-dark-800">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles size={24} className="text-accent-mint" />
            <h2 className="text-4xl md:text-5xl font-light text-white">
              AI Finance Lab
            </h2>
            <Sparkles size={24} className="text-accent-mint" />
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Exploring how artificial intelligence augments financial research and investment decision-making.
          </p>
        </motion.div>

        <div className="relative mb-16">
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-accent-mint via-accent-rose to-accent-coral -translate-y-1/2 opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stages.map((stage, index) => {
              const experiment = toolsData.find(e => e.stage === stage);
              const isActive = activeStage === stage;

              return (
                <motion.div
                  key={stage}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  className="relative"
                >
                  <motion.div
                    className="cursor-pointer"
                    onClick={() => setActiveStage(isActive ? null : stage)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div
                      className="relative w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4"
                      style={{
                        backgroundColor: isActive ? `${experiment?.color}30` : `${experiment?.color}15`,
                        boxShadow: isActive ? `0 0 40px ${experiment?.color}40` : 'none',
                      }}
                    >
                      <motion.div
                        animate={isActive ? { scale: [1, 1.2, 1] } : {}}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                        style={{ backgroundColor: `${experiment?.color}`, opacity: 0.2 }}
                      />
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${experiment?.color}20` }}
                      >
                        <span className="text-2xl font-bold" style={{ color: experiment?.color }}>
                          {index + 1}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-center text-lg font-medium text-white mb-2">
                      {stage}
                    </h3>
                    <p className="text-center text-sm text-gray-500">
                      Click to explore
                    </p>
                  </motion.div>

                  {index < stages.length - 1 && (
                    <div className="hidden md:flex absolute top-10 -right-4 z-10">
                      <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-gray-600"
                      >
                        <ArrowDown size={16} className="rotate-[-90deg]" />
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeStage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              {toolsData
                .filter(e => e.stage === activeStage)
                .map((experiment) => (
                  <ExperimentCard
                    key={experiment.id}
                    experiment={experiment}
                    onClose={() => setActiveStage(null)}
                  />
                ))}
            </motion.div>
          )}

          {!activeStage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {toolsData.map((experiment, index) => (
                <motion.div
                  key={experiment.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setActiveStage(experiment.stage)}
                  className="glass-card rounded-xl p-6 cursor-pointer hover:bg-dark-700/30 transition-all hover:scale-[1.02]"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${experiment.color}20` }}
                  >
                    <span className="text-xl font-bold" style={{ color: experiment.color }}>
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {experiment.name}
                  </h3>
                  <p className="text-sm text-gray-500 mb-2">Tool: {experiment.tool}</p>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {experiment.theme}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20"
        >
          <HumanAICollaboration />
        </motion.div>
      </div>
    </section>
  );
}