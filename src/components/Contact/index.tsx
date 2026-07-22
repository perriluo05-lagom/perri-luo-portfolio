'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check } from 'lucide-react';

const EMAIL = 'perriluo05@gmail.com';

export default function Contact() {
  const [emailCopyState, setEmailCopyState] = useState<'idle' | 'hover' | 'copied'>('idle');

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setEmailCopyState('copied');
      setTimeout(() => setEmailCopyState('idle'), 3000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const contactLinks = [
    { icon: Github, label: 'GitHub', url: 'https://github.com/perriluo05-lagom', color: '#e8a87c' },
    { icon: Linkedin, label: 'LinkedIn', url: 'https://www.linkedin.com/in/perriluo05', color: '#c38d9e' },
  ];

  return (
    <section id="contact" className="min-h-screen py-20 px-4 bg-dark-800">
      <div className="max-w-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-light text-white mb-4">
            Contact
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Welcome to connect and exchange ideas — let's ignite sparks of thought together
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-xl p-8"
        >
          <div className="flex flex-col items-center gap-8">
            <motion.button
              onClick={handleCopyEmail}
              onMouseEnter={() => setEmailCopyState('hover')}
              onMouseLeave={() => emailCopyState !== 'copied' && setEmailCopyState('idle')}
              className="group relative inline-flex flex-col items-center gap-2 px-8 py-5 rounded-xl bg-dark-700/80 hover:bg-dark-600/80 transition-all duration-300 border border-dark-500/50 hover:border-accent-mint/50 w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <Mail className="w-6 h-6 text-accent-mint" />
                <span className="text-xl text-white font-medium">{EMAIL}</span>
              </div>
              
              {emailCopyState === 'copied' ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 text-accent-sage text-sm"
                >
                  <Check className="w-4 h-4" />
                  <span>Copied successfully, please contact me 😊</span>
                </motion.div>
              ) : emailCopyState === 'hover' ? (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1 text-accent-mint text-sm"
                >
                  <Copy className="w-4 h-4" />
                  <span>Click to copy 🖱</span>
                </motion.div>
              ) : (
                <Copy className="w-4 h-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              )}
            </motion.button>

            <div className="flex w-full justify-center gap-4">
              {contactLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-dark-700/50 hover:bg-dark-600/50 transition-all duration-300 group flex-1 max-w-xs"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-5 h-5" style={{ color: link.color }} />
                  <span className="text-gray-300 group-hover:text-white transition-colors">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6 text-gray-500 text-sm"
        >
          Looking forward to hearing from you!
        </motion.p>
      </div>
    </section>
  );
}