'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart3, Globe, Clock, Users } from 'lucide-react';

type NodeId = 'empirical' | 'evaluation' | 'market' | 'regional' | 'international' | null;

interface ResearchNode {
  id: NodeId;
  name: string;
  x: number;
  y: number;
  color: string;
  icon: React.ReactNode;
}

const researchNodes: ResearchNode[] = [
  { id: 'empirical', name: 'Empirical\nAnalysis', x: 0, y: -140, color: '#e8a87c', icon: <TrendingUp size={20} /> },
  { id: 'evaluation', name: 'Evaluation\nFramework', x: 120, y: -70, color: '#85cdca', icon: <BarChart3 size={20} /> },
  { id: 'market', name: 'Market\nDevelopment', x: 120, y: 70, color: '#c38d9e', icon: <Clock size={20} /> },
  { id: 'regional', name: 'Regional\nComparison', x: 0, y: 140, color: '#f4a261', icon: <Globe size={20} /> },
  { id: 'international', name: 'International\nBenchmarking', x: -120, y: 0, color: '#a8b5a0', icon: <Users size={20} /> },
];

const didData = {
  treatment: [60, 65, 70, 72, 95, 105, 115, 125],
  control: [60, 63, 66, 68, 72, 75, 78, 82],
  labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
};

const radarData = {
  dimensions: ['Infrastructure', 'Transaction', 'Regulation', 'Talent', 'Technology', 'Market Size', 'Policy', 'Innovation'],
  zhejiang: [85, 90, 80, 85, 95, 92, 88, 90],
  shanghai: [90, 88, 92, 90, 88, 95, 90, 85],
  western: [60, 55, 50, 55, 65, 50, 60, 55],
};

const timelineData = [
  { year: 2014, stage: 'Early Exploration', title: 'Preliminary Studies', description: 'Initial research on data factor market concepts' },
  { year: 2016, stage: 'Early Exploration', title: 'Policy Discussion', description: 'First policy documents released' },
  { year: 2018, stage: 'Market Expansion', title: 'Pilot Programs', description: 'First data exchange platforms established' },
  { year: 2020, stage: 'Market Expansion', title: 'Scale Development', description: 'Multiple provincial exchanges launched' },
  { year: 2022, stage: 'Institutional Development', title: 'Regulatory Framework', description: 'National regulations and standards issued' },
  { year: 2024, stage: 'Institutional Development', title: 'Mature Stage', description: 'Comprehensive market ecosystem formed' },
];

const regionalData = [
  { name: 'Zhejiang', value: 92, color: '#85cdca' },
  { name: 'Shanghai', value: 88, color: '#e8a87c' },
  { name: 'Beijing', value: 85, color: '#c38d9e' },
  { name: 'Guangdong', value: 82, color: '#f4a261' },
  { name: 'Jiangsu', value: 78, color: '#a8b5a0' },
  { name: 'Others', value: 65, color: '#6b9d99' },
];

const internationalData = [
  {
    region: 'China',
    marketStructure: 'Government-led, multi-tier exchanges',
    tradingMechanism: 'Data asset listing, auction-based',
    regulatoryFramework: 'National + local dual governance',
    color: '#e8a87c',
  },
  {
    region: 'Europe',
    marketStructure: 'Decentralized, privacy-focused',
    tradingMechanism: 'GDPR-compliant data sharing',
    regulatoryFramework: 'Strong privacy protection',
    color: '#85cdca',
  },
  {
    region: 'United States',
    marketStructure: 'Market-driven, private sector',
    tradingMechanism: 'Commercial data brokerage',
    regulatoryFramework: 'Sector-specific regulations',
    color: '#c38d9e',
  },
];

function DIDVisualization() {
  const maxValue = Math.max(...didData.treatment, ...didData.control);
  const padding = 20;
  const width = 300;
  const height = 200;
  
  const getX = (index: number) => padding + (index * (width - 2 * padding)) / (didData.labels.length - 1);
  const getY = (value: number) => height - padding - (value * (height - 2 * padding)) / maxValue;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-coral" />
          <span className="text-sm text-gray-400">Treatment Group</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-mint" />
          <span className="text-sm text-gray-400">Control Group</span>
        </div>
      </div>
      
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
        <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="rgba(255,255,255,0.1)" />
        
        {[0, 25, 50, 75, 100, 125].map((val) => (
          <g key={val}>
            <line x1={padding} y1={getY(val)} x2={width - padding} y2={getY(val)} stroke="rgba(255,255,255,0.05)" />
            <text x={padding - 5} y={getY(val) + 4} textAnchor="end" fill="rgba(255,255,255,0.4)" fontSize="10">{val}</text>
          </g>
        ))}
        
        {didData.labels.map((label, i) => (
          <text key={label} x={getX(i)} y={height - 5} textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">{label}</text>
        ))}
        
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
          d={`M ${didData.treatment.map((v, i) => `${getX(i)},${getY(v)}`).join(' L ')}`}
          stroke="#e8a87c"
          strokeWidth="2"
          fill="none"
          markerEnd="url(#arrow1)"
        />
        
        <motion.line
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          d={`M ${didData.control.map((v, i) => `${getX(i)},${getY(v)}`).join(' L ')}`}
          stroke="#85cdca"
          strokeWidth="2"
          fill="none"
          strokeDasharray="5,5"
          markerEnd="url(#arrow2)"
        />
        
        <motion.line
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          x1={getX(4)} y1={padding} x2={getX(4)} y2={height - padding}
          stroke="#c38d9e"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
        <text x={getX(4)} y={padding - 5} textAnchor="middle" fill="#c38d9e" fontSize="10">Policy Intervention</text>
        
        {didData.treatment.map((v, i) => (
          <motion.circle
            key={`t-${i}`}
            initial={{ r: 0 }}
            animate={{ r: 4 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            cx={getX(i)} cy={getY(v)}
            fill="#e8a87c"
          />
        ))}
        
        {didData.control.map((v, i) => (
          <motion.circle
            key={`c-${i}`}
            initial={{ r: 0 }}
            animate={{ r: 4 }}
            transition={{ delay: 0.7 + i * 0.1 }}
            cx={getX(i)} cy={getY(v)}
            fill="#85cdca"
          />
        ))}
        
        <defs>
          <marker id="arrow1" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#e8a87c" />
          </marker>
          <marker id="arrow2" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="#85cdca" />
          </marker>
        </defs>
      </svg>
      
      <div className="grid grid-cols-3 gap-3">
        {['Robustness Check', 'Placebo Test', 'Heterogeneity Analysis'].map((test, i) => (
          <motion.button
            key={test}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 + i * 0.1 }}
            className="px-3 py-2 text-xs bg-dark-600 hover:bg-accent-coral/20 border border-dark-500 hover:border-accent-coral/50 rounded-lg transition-all text-gray-300"
          >
            {test}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

function RadarChart() {
  const [selectedRegion, setSelectedRegion] = useState<'zhejiang' | 'shanghai' | 'western'>('zhejiang');
  const data = radarData[selectedRegion];
  const dimensions = radarData.dimensions;
  const numDimensions = dimensions.length;
  const centerX = 150;
  const centerY = 150;
  const radius = 100;
  
  const getPoint = (index: number, value: number, maxRadius: number) => {
    const angle = (Math.PI * 2 * index) / numDimensions - Math.PI / 2;
    const r = (value / 100) * maxRadius;
    return {
      x: centerX + r * Math.cos(angle),
      y: centerY + r * Math.sin(angle),
    };
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(['Zhejiang', 'Shanghai', 'Western Region'] as const).map((r) => {
          const regionKey = r === 'Zhejiang' ? 'zhejiang' : r === 'Shanghai' ? 'shanghai' : 'western';
          return (
            <button
              key={r}
              onClick={() => setSelectedRegion(regionKey)}
              className={`px-4 py-2 text-sm rounded-lg transition-all ${
                selectedRegion === regionKey
                  ? 'bg-accent-mint/20 text-accent-mint border border-accent-mint/50'
                  : 'bg-dark-600 text-gray-400 border border-dark-500 hover:border-accent-mint/30'
              }`}
            >
              {r}
            </button>
          );
        })}
      </div>
      
      <svg viewBox="0 0 300 300" className="w-full h-auto">
        {[20, 40, 60, 80, 100].map((r) => (
          <circle
            key={r}
            cx={centerX}
            cy={centerY}
            r={(r / 100) * radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="1"
          />
        ))}
        
        {dimensions.map((_, i) => {
          const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
          const endX = centerX + radius * Math.cos(angle);
          const endY = centerY + radius * Math.sin(angle);
          return (
            <line key={i} x1={centerX} y1={centerY} x2={endX} y2={endY} stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          );
        })}
        
        <motion.polygon
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          points={data.map((v, i) => {
            const p = getPoint(i, v, radius);
            return `${p.x},${p.y}`;
          }).join(' ')}
          fill="rgba(133, 205, 202, 0.3)"
          stroke="#85cdca"
          strokeWidth="2"
        />
        
        {data.map((v, i) => {
          const p = getPoint(i, v, radius);
          return (
            <motion.circle
              key={i}
              initial={{ r: 0 }}
              animate={{ r: 4 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              cx={p.x}
              cy={p.y}
              fill="#85cdca"
            />
          );
        })}
        
        {dimensions.map((dim, i) => {
          const angle = (Math.PI * 2 * i) / numDimensions - Math.PI / 2;
          const labelX = centerX + (radius + 20) * Math.cos(angle);
          const labelY = centerY + (radius + 20) * Math.sin(angle);
          return (
            <text
              key={dim}
              x={labelX}
              y={labelY}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="10"
            >
              {dim.slice(0, 8)}
            </text>
          );
        })}
      </svg>
    </div>
  );
}

function TimelineVisualization() {
  return (
    <div className="relative">
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-accent-rose via-accent-amber to-accent-sage" />
      
      <div className="space-y-8">
        {timelineData.map((item, i) => (
          <motion.div
            key={item.year}
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`flex items-center gap-4 ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
          >
            <div className={`flex-1 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
              <div className="text-accent-rose font-bold text-lg">{item.year}</div>
              <div className="text-gray-400 text-sm mb-1">{item.stage}</div>
              <div className="text-white font-medium">{item.title}</div>
              <div className="text-gray-500 text-sm">{item.description}</div>
            </div>
            
            <div className="relative z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.15 + 0.1, type: 'spring' }}
                className="w-4 h-4 rounded-full bg-accent-rose shadow-lg shadow-accent-rose/50"
              />
            </div>
            
            <div className="flex-1" />
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function RegionalComparison() {
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null);
  
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {regionalData.map((region) => (
          <motion.div
            key={region.name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: regionalData.indexOf(region) * 0.1 }}
            className="relative"
            onMouseEnter={() => setHoveredRegion(region.name)}
            onMouseLeave={() => setHoveredRegion(null)}
          >
            <div 
              className="h-32 rounded-xl overflow-hidden relative cursor-pointer transition-all hover:scale-105"
              style={{ backgroundColor: `${region.color}20` }}
            >
              <motion.div
                initial={{ height: 0 }}
                animate={{ height: `${region.value}%` }}
                transition={{ duration: 0.8, delay: regionalData.indexOf(region) * 0.1 }}
                className="absolute bottom-0 left-0 right-0 opacity-80"
                style={{ backgroundColor: region.color }}
              />
              
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-white font-bold text-lg">{region.name}</div>
                <div className="text-gray-300 text-sm">{region.value}/100</div>
              </div>
              
              <AnimatePresence>
                {hoveredRegion === region.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute bottom-0 left-0 right-0 p-3 bg-dark-800/90"
                  >
                    <div className="text-xs text-gray-400">Development Index</div>
                    <div className="text-sm text-white font-medium">Market Maturity: High</div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="flex items-center justify-center gap-4 mt-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-mint" />
          <span className="text-xs text-gray-400">High Development</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-amber" />
          <span className="text-xs text-gray-400">Medium Development</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-accent-sage" />
          <span className="text-xs text-gray-400">Lower Development</span>
        </div>
      </div>
    </div>
  );
}

function InternationalBenchmarking() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        {internationalData.map((region) => (
          <motion.div
            key={region.region}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: internationalData.indexOf(region) * 0.2 }}
            className="bg-dark-700/50 rounded-xl p-4 border border-dark-600 hover:border-opacity-50 transition-all hover:shadow-lg"
            style={{ borderColor: `${region.color}30` }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: region.color }}
              />
              <h4 className="text-white font-medium">{region.region}</h4>
            </div>
            
            <div className="space-y-3">
              {[
                { label: 'Market Structure', value: region.marketStructure },
                { label: 'Trading Mechanism', value: region.tradingMechanism },
                { label: 'Regulatory Framework', value: region.regulatoryFramework },
              ].map((item) => (
                <div key={item.label} className="text-sm">
                  <div className="text-gray-500 mb-1">{item.label}</div>
                  <div className="text-gray-300">{item.value}</div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function NodeDetail({ selectedNode }: { selectedNode: NodeId }) {
  const nodeContent: Record<Exclude<NodeId, null>, {
    title: string;
    subtitle: string;
    description: string;
    metrics: string[];
    component: React.ReactNode;
  }> = {
    empirical: {
      title: 'Difference-in-Differences Framework',
      subtitle: 'Causal Impact Evaluation',
      description: 'Designed a Difference-in-Differences framework to evaluate the impact of data factor market development with comprehensive causal identification tests.',
      metrics: ['Econometric Modeling', 'Causal Inference', 'Python / Stata Analysis'],
      component: <DIDVisualization />,
    },
    evaluation: {
      title: 'Multi-dimensional Market Evaluation System',
      subtitle: 'Performance Assessment',
      description: 'Constructed a multi-dimensional evaluation framework covering infrastructure, transaction capability and market performance across provincial data exchanges.',
      metrics: ['Indicator Construction', 'Performance Evaluation', 'Data Standardization'],
      component: <RadarChart />,
    },
    market: {
      title: 'Data Market Evolution Timeline',
      subtitle: 'Longitudinal Analysis',
      description: 'Analyzed the evolution of China\'s data factor market and identified major development stages through longitudinal research.',
      metrics: ['Industry Research', 'Trend Analysis', 'Market Intelligence'],
      component: <TimelineVisualization />,
    },
    regional: {
      title: 'Regional Market Differences',
      subtitle: 'Cross-provincial Comparison',
      description: 'Compared regional development patterns and evaluated differences across data exchange ecosystems.',
      metrics: ['Cross-market Comparison', 'Data Visualization', 'Regional Analysis'],
      component: <RegionalComparison />,
    },
    international: {
      title: 'Global Market Comparison',
      subtitle: 'International Benchmarking',
      description: 'Conducted international benchmarking to understand different data market structures and development models.',
      metrics: ['Global Research', 'Comparative Analysis'],
      component: <InternationalBenchmarking />,
    },
  };

  const content = selectedNode ? nodeContent[selectedNode] : null;
  
  if (!content) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <div>
        <div className="text-accent-coral text-sm uppercase tracking-widest mb-2">{content.subtitle}</div>
        <h3 className="text-2xl font-light text-white mb-4">{content.title}</h3>
        <p className="text-gray-400 text-sm leading-relaxed">{content.description}</p>
      </div>
      
      <div className="bg-dark-700/50 rounded-xl p-6">
        {content.component}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {content.metrics.map((metric) => (
          <span
            key={metric}
            className="px-4 py-2 bg-dark-600/50 border border-dark-500 rounded-full text-sm text-gray-300"
          >
            {metric}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function IndustryResearch() {
  const [selectedNode, setSelectedNode] = useState<NodeId>(null);
  const [hoveredNode, setHoveredNode] = useState<NodeId>(null);

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
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent-coral text-sm uppercase tracking-widest mb-4 block">
            PROJECT 03
          </span>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-4">
            Data Elements Market Research
          </h2>
          <p className="text-xl text-gray-400 mb-6">
            Empirical Analysis & Market Performance Evaluation
          </p>
          <p className="text-gray-500 max-w-3xl mx-auto">
            An interactive visualization exploring China's data factor market development through 
            empirical analysis, evaluation frameworks and regional comparison.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 mb-16"
        >
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 relative">
              <div className="h-[500px] flex items-center justify-center">
                <svg viewBox="-200 -200 400 400" className="w-full h-full">
                  <defs>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                    <filter id="glow-strong">
                      <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
                      <feMerge>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  
                  {researchNodes.map((node, i) => (
                    <motion.line
                      key={`line-${node.id}`}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.2 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                      x1={0} y1={0} x2={node.x} y2={node.y}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="1"
                    />
                  ))}
                  
                  <motion.g
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.circle
                      initial={{ r: 0 }}
                      animate={{ r: 50 }}
                      transition={{ duration: 0.5 }}
                      cx={0} cy={0} r="50"
                      fill="rgba(232, 168, 124, 0.1)"
                      stroke="#e8a87c"
                      strokeWidth="2"
                      filter="url(#glow-strong)"
                    />
                    <motion.circle
                      initial={{ r: 0 }}
                      animate={{ r: 35 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      cx={0} cy={0} r="35"
                      fill="rgba(232, 168, 124, 0.2)"
                    />
                    <text
                      x={0}
                      y={-6}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      Data Factor
                    </text>
                    <text
                      x={0}
                      y={8}
                      textAnchor="middle"
                      fill="white"
                      fontSize="12"
                      fontWeight="bold"
                    >
                      Market
                    </text>
                  </motion.g>
                  
                  {researchNodes.map((node, i) => (
                    <motion.g
                      key={node.id}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                      animate={{ y: [node.y, node.y - 5, node.y] }}
                      className="cursor-pointer"
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      <circle
                        cx={node.x} cy={0} r="35"
                        fill={selectedNode === node.id || hoveredNode === node.id ? `${node.color}40` : `${node.color}15`}
                        stroke={selectedNode === node.id || hoveredNode === node.id ? node.color : `${node.color}60`}
                        strokeWidth={selectedNode === node.id || hoveredNode === node.id ? 3 : 2}
                        filter={selectedNode === node.id || hoveredNode === node.id ? "url(#glow)" : ""}
                        className="transition-all"
                      />
                      <motion.text
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
                        x={node.x}
                        y={-8}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontWeight="medium"
                        className="select-none"
                      >
                        {node.name.split('\n')[0]}
                      </motion.text>
                      <motion.text
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                        x={node.x}
                        y={10}
                        textAnchor="middle"
                        fill="white"
                        fontSize="11"
                        fontWeight="medium"
                        className="select-none"
                      >
                        {node.name.split('\n')[1]}
                      </motion.text>
                    </motion.g>
                  ))}
                </svg>
              </div>
              
              <div className="text-center mt-4">
                <motion.p
                  animate={{
                    color: ['#8b949e', '#e8a87c', '#8b949e'],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="text-sm font-medium"
                >
                  Click on nodes to explore research dimensions
                </motion.p>
              </div>
            </div>

            <div className="flex-1 min-h-[400px]">
              <AnimatePresence>
                {selectedNode ? (
                  <NodeDetail selectedNode={selectedNode} />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                      className="w-20 h-20 rounded-full border border-accent-coral/30 flex items-center justify-center mb-6"
                    >
                      <div className="w-16 h-16 rounded-full border border-accent-mint/30 flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-accent-rose/30 flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-accent-coral" />
                        </div>
                      </div>
                    </motion.div>
                    <h3 className="text-xl font-light text-gray-300 mb-3">Interactive Research Dashboard</h3>
                    <p className="text-gray-500 text-sm max-w-sm">
                      Select a research dimension from the network to explore empirical analysis, 
                      evaluation frameworks, and market insights
                    </p>
                    <div className="flex gap-2 mt-6">
                      {researchNodes.slice(0, 3).map((node) => (
                        <span
                          key={node.id}
                          className="px-3 py-1 rounded-full text-xs bg-dark-600 text-gray-400"
                        >
                          {node.name.split('\n')[0]}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        
      </div>
    </motion.section>
  );
}