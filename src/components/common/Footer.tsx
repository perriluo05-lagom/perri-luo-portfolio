'use client';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-12 px-4 bg-dark-900 border-t border-dark-700">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="flex items-center justify-center gap-6 mb-6">
            <span className="text-gray-500">
              <Github size={24} />
            </span>
            <span className="text-gray-500">
              <Linkedin size={24} />
            </span>
            <span className="text-gray-500">
              <Mail size={24} />
            </span>
          </div>
          
          <p className="text-gray-500 text-sm mb-2">
            Perri Luo - Building Financial Intelligence for the AI Era
          </p>
          <p className="text-gray-600 text-xs">
            © Perri Luo. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
