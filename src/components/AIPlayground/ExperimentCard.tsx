'use client';
import { motion } from 'framer-motion';
import { X, Lightbulb, Cpu, FileOutput, Sparkles, ExternalLink, ArrowRight } from 'lucide-react';
import { Tool } from '@/utils/constants';

interface ExperimentCardProps {
  experiment: Tool;
  onClose: () => void;
}

export default function ExperimentCard({ experiment, onClose }: ExperimentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="glass-card rounded-2xl overflow-hidden"
    >
      <div
        className="h-2"
        style={{ backgroundColor: experiment.color }}
      />

      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span
                className="px-3 py-1 rounded-full text-xs font-medium"
                style={{ backgroundColor: `${experiment.color}20`, color: experiment.color }}
              >
                {experiment.tool}
              </span>
              <span className="text-sm text-gray-500">{experiment.stage}</span>
            </div>
            <h3 className="text-2xl font-semibold text-white">
              {experiment.name}
            </h3>
            <p className="text-gray-400 mt-2">
              {experiment.description}
            </p>
          </div>
          <motion.button
            onClick={onClose}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 rounded-lg hover:bg-dark-700 text-gray-500 hover:text-white transition-colors"
          >
            <X size={20} />
          </motion.button>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${experiment.color}20` }}
              >
                <Lightbulb size={18} style={{ color: experiment.color }} />
              </div>
              <span className="text-sm font-medium text-gray-300">Research Question</span>
            </div>
            <p className="text-gray-400 pl-13 leading-relaxed">
              {experiment.researchQuestion}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${experiment.color}20` }}
              >
                <Cpu size={18} style={{ color: experiment.color }} />
              </div>
              <span className="text-sm font-medium text-gray-300">AI Capability Explored</span>
            </div>
            <p className="text-gray-400 pl-13 leading-relaxed">
              {experiment.aiCapability}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${experiment.color}20` }}
              >
                <FileOutput size={18} style={{ color: experiment.color }} />
              </div>
              <span className="text-sm font-medium text-gray-300">Experiment Output</span>
            </div>
            <p className="text-gray-400 pl-13">
              {experiment.output}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="relative pl-13"
          >
            <div className="absolute left-0 top-0 w-0.5 h-full" style={{ backgroundColor: experiment.color }} />
            <div className="ml-4">
              <div className="flex items-center gap-3 mb-3">
                <Sparkles size={18} style={{ color: experiment.color }} />
                <span className="text-sm font-medium text-gray-300">Key Insight</span>
              </div>
              <p className="text-gray-300 italic leading-relaxed">
                "{experiment.insight}"
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <a
              href={experiment.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-medium hover:opacity-90 transition-opacity"
              style={{ backgroundColor: experiment.color }}
            >
              <span>View Experiment</span>
              <ExternalLink size={16} />
            </a>
          </motion.div>
        </div>
      </div>

      <div
        className="h-1"
        style={{ backgroundColor: experiment.color }}
      />
    </motion.div>
  );
}