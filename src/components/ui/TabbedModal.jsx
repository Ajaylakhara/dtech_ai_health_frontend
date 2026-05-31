import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const TabbedModal = ({ 
  isOpen, 
  onClose, 
  tabs = [] 
}) => {
  const [activeTab, setActiveTab] = useState(tabs[0]?.id);

  useEffect(() => {
    if (isOpen && tabs.length > 0 && !tabs.find(t => t.id === activeTab)) {
      setActiveTab(tabs[0].id);
    }
  }, [isOpen, tabs, activeTab]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.6)', backdropFilter: 'blur(8px)' }}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="tabbed-modal-container"
            style={{ 
              position: 'relative', width: '100%', maxWidth: 1000, background: '#FFFFFF', 
              borderRadius: 24, boxShadow: '0 24px 80px rgba(13,27,42,0.2)', overflow: 'hidden',
              display: 'flex', flexDirection: 'row', minHeight: 600, fontFamily: "'Inter', sans-serif"
            }}
          >
            {/* Sidebar Tabs */}
            <div className="tabbed-modal-sidebar" style={{ width: 280, background: '#FAFCFF', borderRight: '1px solid #E8EDF4', padding: 32, display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                <h2 style={{ color: '#173C63', fontSize: 12, fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.1em', margin: 0 }}>Quick Actions</h2>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, flex: 1 }}>
                {tabs.map((tab) => {
                  const isActive = activeTab === tab.id;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className="tab-btn"
                      style={{
                        padding: '16px 20px', borderRadius: 16, textAlign: 'left', fontWeight: 700, fontSize: 14,
                        transition: 'all 0.2s', border: 'none', cursor: 'pointer',
                        background: isActive ? '#173C63' : 'transparent',
                        color: isActive ? '#FFFFFF' : '#6B7A8D',
                        boxShadow: isActive ? '0 8px 24px rgba(23,60,99,0.2)' : 'none'
                      }}
                    >
                      {tab.label}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={onClose}
                className="tab-close-btn"
                style={{
                  marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 12, padding: 16,
                  color: '#EB5757', background: 'rgba(235,87,87,0.05)', borderRadius: 16, border: 'none',
                  fontWeight: 700, fontSize: 14, cursor: 'pointer', transition: 'all 0.2s', justifyContent: 'center'
                }}
              >
                <FaTimes size={16} /> Close Panel
              </button>
            </div>

            {/* Content Area */}
            <div style={{ flex: 1, padding: 40, overflowY: 'auto', background: '#FFFFFF' }} className="modal-content-scroll">
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
      <style>{`
        .tab-btn:hover:not([style*="background: rgb(23, 60, 99)"]) {
          background: rgba(23,60,99,0.05) !important;
          color: #173C63 !important;
        }
        .tab-close-btn:hover {
          background: rgba(235,87,87,0.1) !important;
        }
        .modal-content-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .modal-content-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .modal-content-scroll::-webkit-scrollbar-thumb {
          background: rgba(23,60,99,0.15);
          border-radius: 10px;
        }
        @media (max-width: 768px) {
          .tabbed-modal-container {
            flex-direction: column !important;
          }
          .tabbed-modal-sidebar {
            width: 100% !important;
            border-right: none !important;
            border-bottom: 1px solid #E8EDF4 !important;
          }
        }
      `}</style>
    </AnimatePresence>
  );
};

export default TabbedModal;
