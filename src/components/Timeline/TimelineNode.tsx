'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, BookOpen, Search, Sparkles, Zap } from 'lucide-react';
import { TimelineNode as TimelineNodeType } from '@/utils/constants';

const iconMap = {
  Eye,
  BookOpen,
  Search,
  Sparkles,
  Zap,
};

interface TimelineNodeProps {
  node: TimelineNodeType;
  isActive: boolean;
  onClick: () => void;
  index: number;
}

export default function TimelineNode({ node, isActive, onClick, index }: TimelineNodeProps) {
  const IconComponent = iconMap[node.icon as keyof typeof iconMap] || Eye;

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative flex items-start w-full"
    >
      <div className="absolute left-6 top-0 bottom-0 w-px bg-dark-600" />
      
      <div className="relative">
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: node.color }}
        />
        <motion.button
          onClick={onClick}
          className="relative z-10 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            backgroundColor: isActive ? node.color : 'rgba(255, 255, 255, 0.05)',
            border: `2px solid ${isActive ? node.color : node.color}`,
            boxShadow: isActive ? `0 0 20px ${node.color}40` : `0 0 10px ${node.color}20`,
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <IconComponent 
            size={24} 
            style={{ color: isActive ? '#ffffff' : node.color }} 
          />
        </motion.button>
      </div>
      
      <div className="ml-8 flex-1">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={onClick}
        >
          <div>
            <h3 className={`text-xl font-semibold transition-colors ${isActive ? 'text-white' : 'text-gray-400'}`}>
              {node.title}
            </h3>
            <p className="text-sm text-gray-500 mt-1">{node.period}</p>
          </div>
          <motion.div
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-500"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </div>
        
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
              className="overflow-hidden"
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 glass-card rounded-xl p-8"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="mb-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div 
                      className="w-1 h-6 rounded-full"
                      style={{ backgroundColor: node.color }}
                    />
                    <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Key Insight</span>
                  </div>
                  <p className="text-xl font-light text-white italic leading-relaxed">
                    "{node.content.insight}"
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="mb-6"
                >
                  <p className="text-gray-300 leading-relaxed text-lg">
                    {node.content.narrative}
                  </p>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 border-t border-dark-600"
                >
                  <div className="flex items-start gap-4">
                    <svg 
                      className="w-6 h-6 flex-shrink-0 mt-1" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      style={{ color: node.color }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-gray-400 leading-relaxed">
                      <span style={{ color: node.color }} className="font-medium">Transition:</span> {node.content.transition}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
