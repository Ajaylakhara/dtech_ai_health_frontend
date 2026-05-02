import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const TabbedModal = ({ 
  isOpen, 
  onClose, 
  tabs = [] 
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            className="relative w-full max-w-4xl bg-[#1E1F21] rounded-[3rem] shadow-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row h-[600px]"
          >
            {/* Sidebar Tabs */}
            <div className="w-full md:w-64 bg-[#151618] p-8 border-r border-white/5 flex flex-col gap-4">
              <h2 className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4">Quick Actions</h2>
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-6 py-4 rounded-2xl text-left font-bold transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={onClose}
                className="mt-auto flex items-center gap-2 text-slate-500 hover:text-white transition-colors p-2"
              >
                <FaTimes /> Close
              </button>
            </div>

            {/* Content Area */}
            <div className="flex-1 p-10 overflow-y-auto custom-scrollbar bg-[#1E1F21]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {tabs.find((t) => t.id === activeTab)?.component}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default TabbedModal;
