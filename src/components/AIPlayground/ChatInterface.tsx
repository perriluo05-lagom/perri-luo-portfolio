'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I\'m an AI assistant that can answer questions about Perri Luo\'s projects, research experience, and skills. Feel free to ask!',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
    };

    setMessages([...messages, newMessage]);
    setInputValue('');
    setIsLoading(true);

    setTimeout(() => {
      const responses = [
        'Perri Luo has extensive experience in both finance and AI. Key projects include the Daily A-share Intelligence system and Prospect Theory Simulator.',
        'The Skill Map shows connections between finance, AI, research, Python, econometrics, and product thinking.',
        'Featured projects demonstrate interactive visualizations and AI-powered financial intelligence tools.',
        'Research experience includes work at Zhongtai Securities Institute and the Xiyuan research project on behavioral finance.',
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="glass-card rounded-xl overflow-hidden"
    >
      <div className="bg-dark-700/50 px-6 py-4 border-b border-dark-600">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent-mint/20 flex items-center justify-center">
            <Bot size={16} className="text-accent-mint" />
          </div>
          <div>
            <h3 className="text-white font-medium">Chat with My Portfolio</h3>
            <p className="text-gray-500 text-xs">Ask about projects, research, and skills</p>
          </div>
        </div>
      </div>

      <div className="h-[300px] overflow-y-auto p-6 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                  message.role === 'user'
                    ? 'bg-accent-rose/20'
                    : 'bg-accent-mint/20'
                }`}
              >
                {message.role === 'user' ? (
                  <User size={16} className="text-accent-rose" />
                ) : (
                  <Bot size={16} className="text-accent-mint" />
                )}
              </div>
              <div
                className={`max-w-[80%] px-4 py-3 rounded-xl ${
                  message.role === 'user'
                    ? 'bg-accent-rose/20 text-white'
                    : 'bg-dark-700 text-gray-300'
                }`}
              >
                {message.content}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-8 h-8 rounded-lg bg-accent-mint/20 flex items-center justify-center flex-shrink-0">
              <Bot size={16} className="text-accent-mint" />
            </div>
            <div className="bg-dark-700 px-4 py-3 rounded-xl">
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.1s' }} />
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="p-4 border-t border-dark-600">
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a question..."
            className="flex-1 bg-dark-700 border border-dark-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-accent-mint transition-colors"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-4 py-3 rounded-lg bg-accent-mint hover:bg-accent-mint/80 disabled:bg-dark-600 transition-colors"
          >
            <Send size={20} className="text-dark-900" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
