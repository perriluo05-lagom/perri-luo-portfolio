'use client';
import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Github, ArrowRight } from 'lucide-react';

export default function ProspectTheory() {
  const [probability, setProbability] = useState(50);
  const [value, setValue] = useState(100);
  const [lossAversion, setLossAversion] = useState(2.25);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const calculateValue = (x: number, lambda: number = lossAversion) => {
    if (x >= 0) {
      return Math.pow(x, 0.88);
    }
    return -lambda * Math.pow(Math.abs(x), 0.88);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const centerX = width / 2;
    const centerY = height / 2;
    const scaleX = width / 400;
    const scaleY = height / 200;

    ctx.clearRect(0, 0, width, height);

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = -200; i <= 200; i += 50) {
      ctx.beginPath();
      ctx.moveTo(centerX + i * scaleX, 0);
      ctx.lineTo(centerX + i * scaleX, height);
      ctx.stroke();
    }
    for (let i = -100; i <= 100; i += 25) {
      ctx.beginPath();
      ctx.moveTo(0, centerY - i * scaleY);
      ctx.lineTo(width, centerY - i * scaleY);
      ctx.stroke();
    }

    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    ctx.lineTo(width, centerY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(centerX, 0);
    ctx.lineTo(centerX, height);
    ctx.stroke();

    ctx.strokeStyle = '#85cdca';
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = -200; x <= 200; x += 1) {
      const y = calculateValue(x);
      const canvasX = centerX + x * scaleX;
      const canvasY = centerY - y * scaleY;
      if (x === -200) {
        ctx.moveTo(canvasX, canvasY);
      } else {
        ctx.lineTo(canvasX, canvasY);
      }
    }
    ctx.stroke();

    const expectedValue = (probability / 100) * calculateValue(value) + ((100 - probability) / 100) * calculateValue(-value);
    
    ctx.fillStyle = '#c38d9e';
    ctx.beginPath();
    ctx.arc(centerX + expectedValue * 10 * scaleX, centerY - calculateValue(expectedValue * 10) * scaleY, 8, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#a8b5a0';
    ctx.beginPath();
    ctx.arc(centerX + value * scaleX, centerY - calculateValue(value) * scaleY, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(centerX - value * scaleX, centerY - calculateValue(-value) * scaleY, 6, 0, Math.PI * 2);
    ctx.fill();

  }, [probability, value, lossAversion]);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="min-h-screen flex flex-col justify-center py-24 px-4 bg-dark-800"
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
            Interactive Project
          </span>
          <h2 className="text-5xl md:text-7xl font-light text-white mb-6">
            Prospect Theory Simulator
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Interactive behavioral finance demonstration. Drag the parameters to 
            see how the value function curve changes in real-time
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="glass-card rounded-2xl p-8 mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <div className="bg-dark-900 rounded-xl p-6 mb-6">
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={200}
                  className="w-full"
                />
                <div className="flex items-center justify-center gap-8 mt-4 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent-mint" />
                    <span className="text-gray-400">Value Function</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent-sage" />
                    <span className="text-gray-400">Outcomes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-accent-rose" />
                    <span className="text-gray-400">Expected Value</span>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-400 text-sm">Probability of Gain</label>
                    <span className="text-accent-mint">{probability}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={probability}
                    onChange={(e) => setProbability(Number(e.target.value))}
                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-accent-mint"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-400 text-sm">Outcome Value</label>
                    <span className="text-accent-rose">{value}</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="200"
                    value={value}
                    onChange={(e) => setValue(Number(e.target.value))}
                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-accent-rose"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-gray-400 text-sm">Loss Aversion (λ)</label>
                    <span className="text-accent-sage">{lossAversion}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="4"
                    step="0.1"
                    value={lossAversion}
                    onChange={(e) => setLossAversion(Number(e.target.value))}
                    className="w-full h-2 bg-dark-600 rounded-lg appearance-none cursor-pointer accent-accent-sage"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-center">
              <div className="space-y-6">
                <div className="bg-dark-700/50 rounded-xl p-6">
                  <h3 className="text-accent-mint font-medium mb-4">Prospect Theory Equation</h3>
                  <div className="text-center py-4">
                    <div className="text-gray-300 text-lg">
                      v(x) = x<sup>0.88</sup> for gains
                    </div>
                    <div className="text-gray-300 text-lg mt-2">
                      v(x) = -λ(-x)<sup>0.88</sup> for losses
                    </div>
                  </div>
                </div>

                <div className="bg-dark-700/50 rounded-xl p-6">
                  <h3 className="text-accent-rose font-medium mb-4">Expected Utility</h3>
                  <div className="text-center">
                    <div className="text-3xl text-white">
                      {((probability / 100) * calculateValue(value) + ((100 - probability) / 100) * calculateValue(-value)).toFixed(2)}
                    </div>
                    <p className="text-gray-500 text-sm mt-2">
                      π({probability}%) × v({value}) + π({100 - probability}%) × v(-{value})
                    </p>
                  </div>
                </div>

                <div className="bg-dark-700/50 rounded-xl p-6">
                  <h3 className="text-accent-sage font-medium mb-4">What This Means</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    The value function shows that people are loss-averse - losses hurt 
                    more than equivalent gains feel good. The current parameters show 
                    that a {probability}% chance of gaining {value} vs a {100 - probability}% 
                    chance of losing {value} has an expected utility of approximately 
                    {((probability / 100) * calculateValue(value) + ((100 - probability) / 100) * calculateValue(-value)).toFixed(2)}.
                  </p>
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
