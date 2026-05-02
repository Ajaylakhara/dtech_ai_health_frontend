import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FiActivity, FiUser, FiLogOut, FiMenu, FiX } from 'react-icons/fi';

const navLinks = [
  { name: 'Home', path: '/home' },
  { name: 'About', path: '/about' },
  { name: 'Departments', path: '/departments' },
  { name: 'Appointments', path: '/appointments' },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? 'py-3 bg-[#0B1120]/85 backdrop-blur-2xl border-b border-white/5 shadow-2xl'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">

        {/* Logo */}
        <Link to="/home" className="flex items-center gap-3 group select-none" aria-label="DTech AI Home">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6]
            flex items-center justify-center shadow-lg shadow-blue-500/25
            group-hover:shadow-blue-500/50 group-hover:scale-105 transition-all duration-300">
            <FiActivity className="text-white text-xl" />
          </div>
          <span className="text-white text-[22px] font-black tracking-tight select-none">
            DTech<span className="text-gradient"> AI</span>
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 select-none">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className="relative text-[15px] font-semibold tracking-wide transition-colors duration-200 group"
                style={{ color: isActive ? '#3B82F6' : '#94A3B8' }}
              >
                <span className="group-hover:text-white transition-colors duration-200">
                  {link.name}
                </span>
                {/* Active indicator */}
                <span
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] transition-all duration-300 ${
                    isActive ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
                  }`}
                />
                {/* Hover indicator */}
                <span className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full bg-white/30
                  opacity-0 group-hover:opacity-100 scale-x-0 group-hover:scale-x-100 transition-all duration-300" />
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-4">
          {userInfo ? (
            <div className="flex items-center gap-3 select-none">
              <Link
                to={userInfo.role === 'admin' ? '/admin-dashboard' : '/profile'}
                className="flex items-center gap-2 px-4 py-2 rounded-full
                  bg-white/5 border border-white/10 text-white text-sm font-semibold
                  hover:bg-white/10 hover:border-white/15 transition-all duration-200"
              >
                <FiUser className="text-blue-400 text-base" />
                {userInfo.name ? userInfo.name.split(' ')[0] : 'User'}
              </Link>
              <button
                onClick={handleLogout}
                aria-label="Logout"
                className="p-2.5 rounded-full bg-red-500/10 text-red-400
                  hover:bg-red-500 hover:text-white transition-all duration-200"
              >
                <FiLogOut />
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/"
                className="text-slate-400 hover:text-white text-[15px] font-semibold transition-colors"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-6 py-2.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold
                  shadow-lg shadow-blue-500/25 hover:shadow-blue-500/50
                  hover:-translate-y-0.5 transition-all duration-200"
              >
                Get Started
              </Link>
            </>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white rounded-xl hover:bg-white/8 transition-all"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        >
          {isMobileMenuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B1120]/95 backdrop-blur-2xl border-b border-white/5 overflow-hidden"
          >
            <div className="px-5 py-8 flex flex-col gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-xl font-bold transition-colors py-1 ${
                    location.pathname === link.path ? 'text-blue-400' : 'text-white hover:text-blue-400'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-5 border-t border-white/5 flex flex-col gap-4">
                {userInfo ? (
                  <button onClick={handleLogout} className="text-red-400 font-bold text-left text-lg">
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-white font-bold text-lg"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="text-blue-400 font-bold text-lg"
                    >
                      Get Started →
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
