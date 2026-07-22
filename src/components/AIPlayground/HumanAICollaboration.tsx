'use client';
import { motion } from 'framer-motion';
import { Brain, Users, Zap, Target, TrendingUp, Shield, Lightbulb, Heart } from 'lucide-react';

const aiStrengths = [
  { icon: Brain, text: 'Information processing' },
  { icon: Zap, text: 'Research efficiency' },
  { icon: Users, text: 'Multi-perspective analysis' },
  { icon: Target, text: 'Workflow automation' },
];

const humanStrengths = [
  { icon: Lightbulb, text: 'Business judgement' },
  { icon: TrendingUp, text: 'Industry understanding' },
  { icon: Heart, text: 'Investment conviction' },
  { icon: Shield, text: 'Decision under uncertainty' },
];

export default function HumanAICollaboration() {
  return (
    <div className="glass-card rounded-2xl p-8 md:p-12">
      <div className="text-center mb-12">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-2xl md:text-3xl font-light text-white mb-4"
        >
          Human-AI Collaboration
        </motion.h3>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-gray-400 max-w-2xl mx-auto"
        >
          AI enhances financial professionals rather than replacing human judgement.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-4 -left-4 w-24 h-24 rounded-full bg-accent-mint/10 blur-xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-mint/20 flex items-center justify-center">
                <Brain size={24} className="text-accent-mint" />
              </div>
              <h4 className="text-xl font-semibold text-white">AI Strengths</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {aiStrengths.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700/80 transition-colors"
                >
                  <item.icon size={20} className="text-accent-mint mb-3" />
                  <p className="text-sm text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full bg-accent-coral/10 blur-xl" />
          
          <div className="relative">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-accent-coral/20 flex items-center justify-center">
                <Heart size={24} className="text-accent-coral" />
              </div>
              <h4 className="text-xl font-semibold text-white">Human Strengths</h4>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {humanStrengths.map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="p-4 rounded-xl bg-dark-700/50 hover:bg-dark-700/80 transition-colors"
                >
                  <item.icon size={20} className="text-accent-coral mb-3" />
                  <p className="text-sm text-gray-300">{item.text}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-12 pt-8 border-t border-dark-600/50"
      >
        <div className="flex items-center justify-center gap-4">
          <div className="w-12 h-12 rounded-full bg-accent-mint/20 flex items-center justify-center">
            <Brain size={20} className="text-accent-mint" />
          </div>
          <div className="text-2xl text-gray-600">+</div>
          <div className="w-12 h-12 rounded-full bg-accent-coral/20 flex items-center justify-center">
            <Heart size={20} className="text-accent-coral" />
          </div>
          <div className="text-2xl text-gray-600">=</div>
          <div className="w-12 h-12 rounded-full bg-accent-rose/20 flex items-center justify-center">
            <Zap size={20} className="text-accent-rose" />
          </div>
        </div>
        <p className="text-center text-gray-300 mt-4">
          The future of finance lies in the synergy between human expertise and AI capabilities.
        </p>
      </motion.div>
    </div>
  );
}