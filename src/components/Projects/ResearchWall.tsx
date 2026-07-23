'use client';
import { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface ResearchItem {
  id: string;
  label: string;
  title: string;
  year: string;
  image: string;
  isGif: boolean;
  rotation: number;
  colSpan: number;
  rowSpan: number;
  marginTop: string;
}

const researchItems: ResearchItem[] = [
  {
    id: 'tencent',
    label: 'Company Deep Dive',
    title: 'Tencent Strategic Analysis',
    year: '2025',
    image: '/Tencent.gif',
    isGif: true,
    rotation: -0.5,
    colSpan: 6,
    rowSpan: 1,
    marginTop: '0',
  },
  {
    id: 'biotech',
    label: 'Company Deep Dive',
    title: 'Leads Biolabs Analysis',
    year: '2025',
    image: '/Biotech.gif',
    isGif: true,
    rotation: 1.2,
    colSpan: 3,
    rowSpan: 1,
    marginTop: '-40px',
  },
  {
    id: 'moutai',
    label: 'Company Deep Dive',
    title: 'Kweichow Moutai Analysis',
    year: '2024',
    image: '/Moutai.gif',
    isGif: true,
    rotation: -1.8,
    colSpan: 3,
    rowSpan: 1,
    marginTop: '20px',
  },
  {
    id: 'deck1',
    label: 'Financial Analysis Collection',
    title: 'Market Analysis Compilation',
    year: '2024-2026',
    image: '/research-deck-1.png',
    isGif: false,
    rotation: 0.8,
    colSpan: 6,
    rowSpan: 1,
    marginTop: '0',
  },
  {
    id: 'deck2',
    label: 'Financial Analysis Collection',
    title: 'Investment Research Compilation',
    year: '2024-2026',
    image: '/research-deck-2.png',
    isGif: false,
    rotation: -1.2,
    colSpan: 6,
    rowSpan: 1,
    marginTop: '0',
  },
];

export default function ResearchWall() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 40;
    const y = (e.clientY - rect.top - rect.height / 2) / 40;
    setMousePosition({ x, y });
  };

  const getCardVariants = (item: ResearchItem) => {
    const isHovered = hoveredId === item.id;
    
    return {
      animate: {
        rotate: isHovered ? 0 : item.rotation,
        scale: isHovered ? 1.02 : 1,
        x: mousePosition.x * (isHovered ? 0.4 : 0.2),
        y: mousePosition.y * (isHovered ? 0.4 : 0.2),
        opacity: hoveredId !== null && !isHovered ? 0.5 : 1,
        zIndex: isHovered ? 100 : hoveredId === null ? 10 : 1,
      },
      transition: {
        type: 'spring',
        stiffness: 150,
        damping: 20,
      },
    };
  };

  const getImageHeight = (id: string) => {
    switch (id) {
      case 'tencent': return '320px';
      case 'biotech': return '180px';
      case 'moutai': return '180px';
      case 'deck1': return '220px';
      case 'deck2': return '220px';
      default: return '200px';
    }
  };

  const getPadding = (id: string) => {
    switch (id) {
      case 'tencent': return 'p-5';
      default: return 'p-4';
    }
  };

  const getTitleSize = (id: string) => {
    switch (id) {
      case 'tencent': return 'text-xl';
      default: return 'text-base';
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col justify-center py-24 px-4 bg-dark-900"
    >
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-accent-coral text-sm uppercase tracking-widest mb-4 block">
            PROJECT 01
          </span>
          <h2 className="text-5xl md:text-6xl font-light text-white mb-4">
            Selected Research
          </h2>
          <p className="text-lg text-gray-400 mb-4">
            Research Reports & Presentation Decks
          </p>
          <motion.p
            animate={{
              color: ['#8b949e', '#e8a87c', '#8b949e'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="text-accent-coral text-sm uppercase tracking-widest"
          >
            Hover over cards to explore
          </motion.p>
        </motion.div>

        <motion.div
          ref={containerRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setMousePosition({ x: 0, y: 0 });
            setHoveredId(null);
          }}
          className="relative"
        >
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="col-span-12 md:col-span-6"
              style={{ marginTop: researchItems[0].marginTop }}
              onMouseEnter={() => setHoveredId('tencent')}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                variants={getCardVariants(researchItems[0])}
                animate="animate"
                className={`
                  bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden
                  border border-dark-600/50 transition-all duration-500 cursor-pointer
                  ${hoveredId === 'tencent' ? 'border-accent-coral/40' : ''}
                `}
              >
                <div className="px-5 pt-5 pb-3">
                  <span className={`
                    text-xs uppercase tracking-widest px-3 py-1.5 rounded-full
                    transition-colors
                    ${hoveredId === 'tencent' 
                      ? 'bg-accent-coral/15 text-accent-coral' 
                      : 'bg-dark-700/80 text-gray-500'
                    }
                  `}>
                    {researchItems[0].label}
                  </span>
                </div>
                <div className="p-5">
                  <div className="relative overflow-hidden rounded-xl bg-dark-900/60">
                    <img
                      src={researchItems[0].image}
                      alt={researchItems[0].title}
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: getImageHeight('tencent') }}
                    />
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3">
                  <h3 className={`${getTitleSize('tencent')} font-light mb-2 transition-colors ${hoveredId === 'tencent' ? 'text-accent-coral' : 'text-white'}`}>
                    {researchItems[0].title}
                  </h3>
                  <p className="text-xs text-gray-500">{researchItems[0].year}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="col-span-12 md:col-span-3"
              style={{ marginTop: researchItems[1].marginTop }}
              onMouseEnter={() => setHoveredId('biotech')}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                variants={getCardVariants(researchItems[1])}
                animate="animate"
                className={`
                  bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden
                  border border-dark-600/50 transition-all duration-500 cursor-pointer
                  ${hoveredId === 'biotech' ? 'border-accent-coral/40' : ''}
                `}
              >
                <div className="px-4 pt-4 pb-2">
                  <span className={`
                    text-xs uppercase tracking-widest px-2.5 py-1 rounded-full
                    transition-colors
                    ${hoveredId === 'biotech' 
                      ? 'bg-accent-coral/15 text-accent-coral' 
                      : 'bg-dark-700/80 text-gray-500'
                    }
                  `}>
                    {researchItems[1].label}
                  </span>
                </div>
                <div className="p-4">
                  <div className="relative overflow-hidden rounded-lg bg-dark-900/60">
                    <img
                      src={researchItems[1].image}
                      alt={researchItems[1].title}
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: getImageHeight('biotech') }}
                    />
                  </div>
                </div>
                <div className="px-4 pb-4 pt-2">
                  <h3 className={`${getTitleSize('biotech')} font-light mb-1.5 transition-colors ${hoveredId === 'biotech' ? 'text-accent-coral' : 'text-white'}`}>
                    {researchItems[1].title}
                  </h3>
                  <p className="text-xs text-gray-500">{researchItems[1].year}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="col-span-12 md:col-span-3"
              style={{ marginTop: researchItems[2].marginTop }}
              onMouseEnter={() => setHoveredId('moutai')}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                variants={getCardVariants(researchItems[2])}
                animate="animate"
                className={`
                  bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden
                  border border-dark-600/50 transition-all duration-500 cursor-pointer
                  ${hoveredId === 'moutai' ? 'border-accent-coral/40' : ''}
                `}
              >
                <div className="px-4 pt-4 pb-2">
                  <span className={`
                    text-xs uppercase tracking-widest px-2.5 py-1 rounded-full
                    transition-colors
                    ${hoveredId === 'moutai' 
                      ? 'bg-accent-coral/15 text-accent-coral' 
                      : 'bg-dark-700/80 text-gray-500'
                    }
                  `}>
                    {researchItems[2].label}
                  </span>
                </div>
                <div className="p-4">
                  <div className="relative overflow-hidden rounded-lg bg-dark-900/60">
                    <img
                      src={researchItems[2].image}
                      alt={researchItems[2].title}
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: getImageHeight('moutai') }}
                    />
                  </div>
                </div>
                <div className="px-4 pb-4 pt-2">
                  <h3 className={`${getTitleSize('moutai')} font-light mb-1.5 transition-colors ${hoveredId === 'moutai' ? 'text-accent-coral' : 'text-white'}`}>
                    {researchItems[2].title}
                  </h3>
                  <p className="text-xs text-gray-500">{researchItems[2].year}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="col-span-12 md:col-span-6"
              style={{ marginTop: researchItems[3].marginTop }}
              onMouseEnter={() => setHoveredId('deck1')}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                variants={getCardVariants(researchItems[3])}
                animate="animate"
                className={`
                  bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden
                  border border-dark-600/50 transition-all duration-500 cursor-pointer
                  ${hoveredId === 'deck1' ? 'border-accent-coral/40' : ''}
                `}
              >
                <div className="px-5 pt-5 pb-3">
                  <span className={`
                    text-xs uppercase tracking-widest px-3 py-1.5 rounded-full
                    transition-colors
                    ${hoveredId === 'deck1' 
                      ? 'bg-accent-coral/15 text-accent-coral' 
                      : 'bg-dark-700/80 text-gray-500'
                    }
                  `}>
                    {researchItems[3].label}
                  </span>
                </div>
                <div className="p-5">
                  <div className="relative overflow-hidden rounded-xl bg-dark-900/60">
                    <img
                      src={researchItems[3].image}
                      alt={researchItems[3].title}
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: getImageHeight('deck1') }}
                    />
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3">
                  <h3 className={`${getTitleSize('deck1')} font-light mb-2 transition-colors ${hoveredId === 'deck1' ? 'text-accent-coral' : 'text-white'}`}>
                    {researchItems[3].title}
                  </h3>
                  <p className="text-xs text-gray-500">{researchItems[3].year}</p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="col-span-12 md:col-span-6"
              style={{ marginTop: researchItems[4].marginTop }}
              onMouseEnter={() => setHoveredId('deck2')}
              onMouseLeave={() => setHoveredId(null)}
            >
              <motion.div
                variants={getCardVariants(researchItems[4])}
                animate="animate"
                className={`
                  bg-dark-800/60 backdrop-blur-sm rounded-xl overflow-hidden
                  border border-dark-600/50 transition-all duration-500 cursor-pointer
                  ${hoveredId === 'deck2' ? 'border-accent-coral/40' : ''}
                `}
              >
                <div className="px-5 pt-5 pb-3">
                  <span className={`
                    text-xs uppercase tracking-widest px-3 py-1.5 rounded-full
                    transition-colors
                    ${hoveredId === 'deck2' 
                      ? 'bg-accent-coral/15 text-accent-coral' 
                      : 'bg-dark-700/80 text-gray-500'
                    }
                  `}>
                    {researchItems[4].label}
                  </span>
                </div>
                <div className="p-5">
                  <div className="relative overflow-hidden rounded-xl bg-dark-900/60">
                    <img
                      src={researchItems[4].image}
                      alt={researchItems[4].title}
                      className="w-full h-auto object-cover"
                      style={{ maxHeight: getImageHeight('deck2') }}
                    />
                  </div>
                </div>
                <div className="px-5 pb-5 pt-3">
                  <h3 className={`${getTitleSize('deck2')} font-light mb-2 transition-colors ${hoveredId === 'deck2' ? 'text-accent-coral' : 'text-white'}`}>
                    {researchItems[4].title}
                  </h3>
                  <p className="text-xs text-gray-500">{researchItems[4].year}</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}