'use client';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';

export default function DailyStock() {
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
          <span className="text-accent-mint text-sm uppercase tracking-widest mb-4 block">
            Featured Project
          </span>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-6">
            Daily A-share Intelligence
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            AI-powered market intelligence system that generates daily analysis reports, 
            tracks market trends, and provides investment insights
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16"
        >
          <div className="glass-card rounded-2xl p-8 overflow-hidden">
            <div className="flex items-center gap-4 mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-500 text-sm">market_intelligence.py</span>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-dark-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-accent-mint text-sm">MARKET OVERVIEW</span>
                  <span className="text-accent-sage text-sm">+2.34%</span>
                </div>
                <div className="h-32 flex items-end gap-2">
                  {[45, 62, 58, 75, 82, 68, 90, 78, 85, 95, 88, 92].map((height, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      whileInView={{ height: `${height}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="flex-1 bg-gradient-to-t from-accent-mint to-accent-rose rounded-t"
                    />
                  ))}
                </div>
              </div>
              
              <div className="bg-dark-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-accent-rose text-sm">TOP GAINERS</span>
                  <span className="text-xs text-gray-500">Today</span>
                </div>
                <div className="space-y-3">
                  {[
                    { name: '贵州茅台', change: '+5.23%' },
                    { name: '腾讯控股', change: '+4.87%' },
                    { name: '宁德时代', change: '+3.92%' },
                    { name: '比亚迪', change: '+3.45%' },
                  ].map((stock, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                      className="flex items-center justify-between"
                    >
                      <span className="text-gray-300">{stock.name}</span>
                      <span className="text-accent-sage text-sm">{stock.change}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="bg-dark-800 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-accent-coral text-sm">AI ANALYSIS</span>
                  <span className="text-xs text-gray-500">Generated</span>
                </div>
                <div className="h-32 flex flex-col justify-between">
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: '100%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-8 rounded-lg bg-gradient-to-r from-accent-sage/30 to-accent-sage/60 flex items-center px-3"
                  >
                    <span className="text-sm text-gray-300">Sentiment: Positive</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: '85%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="h-8 rounded-lg bg-gradient-to-r from-accent-mint/30 to-accent-mint/60 flex items-center px-3"
                  >
                    <span className="text-sm text-gray-300">Volatility: Moderate</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    whileInView={{ opacity: 1, width: '92%' }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                    className="h-8 rounded-lg bg-gradient-to-r from-accent-rose/30 to-accent-rose/60 flex items-center px-3"
                  >
                    <span className="text-sm text-gray-300">Momentum: Strong</span>
                  </motion.div>
                </div>
              </div>
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
            <Github size={20} className="text-gray-400 group-hover:text-accent-mint transition-colors" />
            <span className="text-white">View on GitHub</span>
          </a>
          <a
            href="#"
            className="flex items-center gap-3 px-8 py-4 border border-dark-500 hover:border-accent-mint rounded-lg transition-colors group"
          >
            <span className="text-white">Read More</span>
            <ArrowRight size={20} className="text-gray-400 group-hover:text-accent-mint transition-colors" />
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
