import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX, FiActivity } from 'react-icons/fi';
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../../components/ui/Button';

const DTechNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.auth);

  const menuItems = [
    { label: 'Home', href: '#home' },
    { label: 'Features', href: '#features' },
    { label: 'Stats', href: '#stats' },
    { label: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-50 glass border-b border-white/5 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link to="/home" className="flex items-center gap-2 select-none group">
          <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
            <FiActivity className="w-5 h-5" />
          </div>
          <span className="text-xl font-black tracking-tight text-white select-none">
            DTech<span className="text-gradient font-bold"> AI</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-semibold tracking-wide text-slate-300 hover:text-white transition-all hover:scale-105"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          {userInfo ? (
            <Button
              variant="primary"
              onClick={() => navigate(userInfo.role === 'admin' ? '/admin-dashboard' : '/appointments')}
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={() => navigate('/')}>
                Log In
              </Button>
              <Button variant="primary" onClick={() => navigate('/signup')}>
                Get Started
              </Button>
            </>
          )}
        </div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-xl text-white hover:bg-white/5 transition-all"
        >
          {isOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b border-white/5 bg-[#0B1120]/95 backdrop-blur-2xl overflow-hidden"
          >
            <div className="px-6 py-5 flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-base font-semibold text-slate-300 hover:text-white transition-all"
                >
                  {item.label}
                </a>
              ))}
              <div className="h-px bg-white/5 my-2" />
              {userInfo ? (
                <Button
                  variant="primary"
                  className="w-full"
                  onClick={() => {
                    setIsOpen(false);
                    navigate(userInfo.role === 'admin' ? '/admin-dashboard' : '/appointments');
                  }}
                >
                  Dashboard
                </Button>
              ) : (
                <div className="flex flex-col gap-3">
                  <Button variant="ghost" className="w-full" onClick={() => { setIsOpen(false); navigate('/'); }}>
                    Log In
                  </Button>
                  <Button variant="primary" className="w-full" onClick={() => { setIsOpen(false); navigate('/signup'); }}>
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default DTechNavbar;
