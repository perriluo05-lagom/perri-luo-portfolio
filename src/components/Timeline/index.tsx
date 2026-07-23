'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import TimelineNode from './TimelineNode';
import { timelineData } from '@/utils/constants';

export default function Timeline() {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    setActiveNode(activeNode === id ? null : id);
  };

  return (
    <section id="timeline" className="min-h-screen py-24 px-4 bg-dark-900">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            My Intellectual Journey
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-4">
            A reflection on how my understanding of finance has evolved — 
            from seeing markets as information systems to recognizing 
            the importance of judgment in an AI era
          </p>
          <motion.p
            animate={{
              color: ['#9ca3af', '#85cdca', '#9ca3af'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-base font-medium"
          >
            Click on each milestone to explore deeper
          </motion.p>
        </motion.div>
        
        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-px bg-dark-600" />
          
          <div className="space-y-12">
            {timelineData.map((node, index) => (
              <TimelineNode
                key={node.id}
                node={node}
                isActive={activeNode === node.id}
                onClick={() => handleNodeClick(node.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
