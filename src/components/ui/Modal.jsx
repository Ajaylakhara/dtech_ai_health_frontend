import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes } from 'react-icons/fa';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  maxWidth = 800 
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{ position: 'absolute', inset: 0, background: 'rgba(13,27,42,0.6)', backdropFilter: 'blur(8px)' }}
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            style={{ 
              position: 'relative', width: '100%', maxWidth: maxWidth, background: '#FFFFFF', 
              borderRadius: 24, boxShadow: '0 24px 80px rgba(13,27,42,0.2)', overflow: 'hidden',
              fontFamily: "'Inter', sans-serif"
            }}
          >
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '24px 32px', borderBottom: '1px solid #E8EDF4', background: '#FAFCFF' }}>
              <h2 style={{ fontSize: 22, fontWeight: 800, color: '#0D1B2A', fontFamily: "'Lora', serif", letterSpacing: '-0.01em', margin: 0 }}>{title}</h2>
              <button
                onClick={onClose}
                className="modal-close-btn"
                style={{ 
                  background: 'transparent', border: 'none', padding: 8, cursor: 'pointer', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#6B7A8D', borderRadius: '50%', transition: 'all 0.2s'
                }}
              >
                <FaTimes size={18} />
              </button>
            </div>

            {/* Content */}
            <div style={{ padding: 32, maxHeight: '80vh', overflowY: 'auto' }} className="modal-content-scroll">
              {children}
            </div>
          </motion.div>
        </div>
      )}
      <style>{`
        .modal-close-btn:hover {
          background: rgba(235,87,87,0.1) !important;
          color: #EB5757 !important;
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
      `}</style>
    </AnimatePresence>
  );
};

export default Modal;
