'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';

interface CompanyData {
  id: string;
  name: string;
  x: number;
  y: number;
  capex: number;
  revenue: number;
  cloud: number;
  ai: number;
  color: string;
}

const companiesData: CompanyData[] = [
  { id: 'amd', name: 'AMD', x: 0, y: 0, capex: 85, revenue: 90, cloud: 75, ai: 95, color: '#e94e31' },
  { id: 'nvidia', name: 'NVIDIA', x: 150, y: -50, capex: 90, revenue: 95, cloud: 85, ai: 98, color: '#76b900' },
  { id: 'intel', name: 'Intel', x: -150, y: -50, capex: 80, revenue: 85, cloud: 70, ai: 75, color: '#0071c5' },
  { id: 'tsmc', name: 'TSMC', x: 0, y: 120, capex: 95, revenue: 88, cloud: 80, ai: 85, color: '#333333' },
  { id: 'micron', name: 'Micron', x: 100, y: 150, capex: 82, revenue: 78, cloud: 72, ai: 80, color: '#00a699' },
];

export default function IndustryResearch() {
  const [selectedCompany, setSelectedCompany] = useState<CompanyData | null>(null);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col justify-center py-24 px-4 bg-dark-900"
    >
      <div className="max-w-6xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent-coral text-sm uppercase tracking-widest mb-4 block">
            Visualization Project
          </span>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-6">
            Industry Research Graph
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive tech supply chain visualization. Click on company nodes to 
            explore multi-dimensional data including Capex, Revenue, Cloud, and AI metrics
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
            <div className="flex-1 relative h-[400px]">
              <svg viewBox="-200 -150 400 400" className="w-full h-full">
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {[
                  { from: 'amd', to: 'nvidia' },
                  { from: 'amd', to: 'intel' },
                  { from: 'amd', to: 'tsmc' },
                  { from: 'tsmc', to: 'micron' },
                  { from: 'nvidia', to: 'tsmc' },
                  { from: 'intel', to: 'tsmc' },
                ].map((connection, i) => {
                  const from = companiesData.find(c => c.id === connection.from);
                  const to = companiesData.find(c => c.id === connection.to);
                  if (!from || !to) return null;
                  return (
                    <motion.line
                      key={i}
                      initial={{ pathLength: 0, opacity: 0 }}
                      whileInView={{ pathLength: 1, opacity: 0.3 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.3 + i * 0.1 }}
                      x1={from.x} y1={from.y} x2={to.x} y2={to.y}
                      stroke="rgba(255,255,255,0.2)"
                      strokeWidth="2"
                    />
                  );
                })}

                {companiesData.map((company, i) => (
                  <g key={company.id}>
                    <motion.circle
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                      cx={company.x} cy={company.y} r="30"
                      fill={selectedCompany?.id === company.id ? company.color : `${company.color}30`}
                      stroke={company.color}
                      strokeWidth="2"
                      filter="url(#glow)"
                      className="cursor-pointer transition-all"
                      onClick={() => setSelectedCompany(selectedCompany?.id === company.id ? null : company)}
                    />
                    <text
                      x={company.x}
                      y={company.y}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      fill="white"
                      fontSize="14"
                      fontWeight="bold"
                      className="cursor-pointer"
                      onClick={() => setSelectedCompany(selectedCompany?.id === company.id ? null : company)}
                    >
                      {company.name}
                    </text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="flex-1">
              {selectedCompany ? (
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4 }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: selectedCompany.color }}
                    />
                    <h3 className="text-2xl font-semibold text-white">
                      {selectedCompany.name}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-dark-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-accent-mint" />
                        <span className="text-gray-400 text-sm">CAPEX</span>
                      </div>
                      <div className="text-3xl text-white mb-2">
                        ${selectedCompany.capex}B
                      </div>
                      <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedCompany.capex}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedCompany.color }}
                        />
                      </div>
                    </div>

                    <div className="bg-dark-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-accent-rose" />
                        <span className="text-gray-400 text-sm">REVENUE</span>
                      </div>
                      <div className="text-3xl text-white mb-2">
                        ${selectedCompany.revenue}B
                      </div>
                      <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedCompany.revenue}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedCompany.color }}
                        />
                      </div>
                    </div>

                    <div className="bg-dark-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-accent-sage" />
                        <span className="text-gray-400 text-sm">CLOUD</span>
                      </div>
                      <div className="text-3xl text-white mb-2">
                        {selectedCompany.cloud}%
                      </div>
                      <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedCompany.cloud}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedCompany.color }}
                        />
                      </div>
                    </div>

                    <div className="bg-dark-700/50 rounded-xl p-6">
                      <div className="flex items-center gap-2 mb-4">
                        <div className="w-2 h-2 rounded-full bg-accent-amber" />
                        <span className="text-gray-400 text-sm">AI</span>
                      </div>
                      <div className="text-3xl text-white mb-2">
                        {selectedCompany.ai}%
                      </div>
                      <div className="w-full h-2 bg-dark-600 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${selectedCompany.ai}%` }}
                          transition={{ duration: 0.8 }}
                          className="h-full rounded-full"
                          style={{ backgroundColor: selectedCompany.color }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-dark-700/50 rounded-xl p-6">
                    <h4 className="text-gray-300 font-medium mb-2">Key Insights</h4>
                    <p className="text-gray-500 text-sm">
                      {selectedCompany.name} shows strong positioning in the AI semiconductor 
                      market with {selectedCompany.ai}% AI revenue contribution. The company 
                      continues to invest heavily in capacity expansion with ${selectedCompany.capex}B 
                      in capital expenditures.
                    </p>
                  </div>
                </motion.div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div className="w-16 h-16 rounded-full bg-dark-700 flex items-center justify-center mb-6">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-400 mb-2">Select a Company</h3>
                  <p className="text-gray-500 text-sm max-w-sm">
                    Click on any company node in the graph to view detailed financial metrics and insights
                  </p>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-6"
        >
          <a
            href="#"
            className="flex items-center gap-3 px-8 py-4 bg-dark-700 hover:bg-dark-600 rounded-lg transition-colors group"
          >
            <Github size={20} className="text-gray-400 group-hover:text-accent-coral transition-colors" />
            <span className="text-white">View on GitHub</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-8 py-4 border border-dark-500 hover:border-accent-coral rounded-lg transition-colors group"
          >
            <span className="text-white">Read More</span>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-accent-coral transition-colors" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
