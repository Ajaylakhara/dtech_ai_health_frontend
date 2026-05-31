import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { FiUser, FiLogOut, FiMenu, FiX, FiCalendar, FiPhone } from 'react-icons/fi';
import logo from '../../assets/MediCare_logo.png';

const navLinks = [
  { name: 'Home', path: '/' },
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

  // Pages where the navbar must always be solid (dark hero / custom backgrounds)
  const solidPages = ['/profile', '/about', '/departments', '/appointments', '/appointment'];
  const isSolid = isScrolled || solidPages.some(p => location.pathname.startsWith(p));

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        backgroundColor: isSolid ? 'rgba(255,255,255,0.97)' : 'transparent',
        backdropFilter: isSolid ? 'blur(20px)' : 'none',
        WebkitBackdropFilter: isSolid ? 'blur(20px)' : 'none',
        borderBottom: isSolid ? '1px solid #E8EDF4' : '1px solid transparent',
        boxShadow: isSolid ? '0 2px 20px rgba(23,60,99,0.08)' : 'none',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>

          {/* ── Logo ── */}
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="MediCare Home">
            <img src={logo} alt="MediCare Logo" width="80" height="80" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }} />
          </Link>

          {/* ── Desktop Nav Links ── */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 36 }}>
            {navLinks
              .filter(link => link.name !== 'Appointments' || userInfo)
              .map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.name}
                    to={link.path}
                    style={{
                      position: 'relative',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 15,
                      fontWeight: 500,
                      color: isActive ? '#173C63' : '#3D4D5C',
                      textDecoration: 'none',
                      paddingBottom: 4,
                      transition: 'color 0.2s',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = '#173C63'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = '#3D4D5C'; }}
                  >
                    {link.name}
                    {/* Active underline */}
                    <span style={{
                      position: 'absolute',
                      bottom: 0, left: 0, right: 0,
                      height: 2,
                      borderRadius: 2,
                      background: '#173C63',
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.3s cubic-bezier(0.4,0,0.2,1)',
                    }} />
                  </Link>
                );
              })}
          </div>

          {/* ── Desktop Auth / CTA ── */}
          <div className="hidden lg:flex" style={{ alignItems: 'center', gap: 12 }}>
            {userInfo ? (
              <>
                <Link
                  to={userInfo.role === 'admin' ? '/admin-dashboard' : '/profile'}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '8px 18px',
                    borderRadius: 50,
                    background: 'rgba(23,60,99,0.07)',
                    color: '#173C63',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(23,60,99,0.12)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'rgba(23,60,99,0.07)'}
                >
                  <FiUser style={{ fontSize: 15 }} />
                  {userInfo.name ? userInfo.name.split(' ')[0] : 'Profile'}
                </Link>
                <button
                  onClick={handleLogout}
                  aria-label="Logout"
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    width: 38, height: 38,
                    borderRadius: '50%',
                    background: 'rgba(239,68,68,0.08)',
                    color: '#EF4444',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#EF4444'; e.currentTarget.style.color = '#fff'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(239,68,68,0.08)'; e.currentTarget.style.color = '#EF4444'; }}
                >
                  <FiLogOut style={{ fontSize: 16 }} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  aria-label="Login to patient or admin account"
                  style={{
                    fontSize: 15, fontWeight: 500,
                    color: '#3D4D5C',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#173C63'}
                  onMouseLeave={e => e.currentTarget.style.color = '#3D4D5C'}
                >
                  Login
                </Link>
                <Link
                  to="/login"
                  aria-label="Book an appointment (requires login)"
                  style={{
                    display: 'flex', alignItems: 'center', gap: 7,
                    padding: '10px 22px',
                    borderRadius: 50,
                    background: '#173C63',
                    color: '#fff',
                    fontSize: 14,
                    fontWeight: 600,
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(23,60,99,0.3)',
                    transition: 'all 0.25s cubic-bezier(0.4,0,0.2,1)',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E4D7B'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(23,60,99,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#173C63'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(23,60,99,0.3)'; }}
                >
                  <FiCalendar style={{ fontSize: 14 }} />
                  Book Appointment
                </Link>
              </>
            )}
          </div>

          {/* ── Mobile Toggle ── */}
          <button
            className="lg:hidden flex items-center justify-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
            style={{
              width: 40, height: 40,
              borderRadius: 8,
              background: isMobileMenuOpen ? 'rgba(23,60,99,0.1)' : 'transparent',
              border: '1px solid rgba(23,60,99,0.12)',
              color: '#173C63',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {isMobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="lg:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              background: '#fff',
              borderTop: '1px solid #E8EDF4',
              overflow: 'hidden',
              boxShadow: '0 8px 30px rgba(23,60,99,0.1)',
            }}
          >
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: 8 }}>
              {navLinks
                .filter(link => link.name !== 'Appointments' || userInfo)
                .map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: 10,
                      fontSize: 16,
                      fontWeight: 500,
                      color: location.pathname === link.path ? '#173C63' : '#3D4D5C',
                      background: location.pathname === link.path ? 'rgba(23,60,99,0.07)' : 'transparent',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                    }}
                  >
                    {link.name}
                  </Link>
                ))}

              <div style={{ height: 1, background: '#E8EDF4', margin: '8px 0' }} />

              {userInfo ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <Link
                    to={userInfo.role === 'admin' ? '/admin-dashboard' : '/profile'}
                    onClick={() => setIsMobileMenuOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 16px',
                      borderRadius: 10,
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#173C63',
                      background: 'rgba(23,60,99,0.07)',
                      textDecoration: 'none',
                    }}
                  >
                    <FiUser size={18} />
                    {userInfo.role === 'admin' ? 'Admin Dashboard' : 'My Profile'}
                  </Link>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      padding: '12px 16px',
                      borderRadius: 10,
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#EF4444',
                      background: 'rgba(239,68,68,0.06)',
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}
                  >
                    <FiLogOut size={18} />
                    Logout
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Login to patient or admin account (mobile)"
                    style={{
                      padding: '12px 16px',
                      borderRadius: 10,
                      fontSize: 16,
                      fontWeight: 500,
                      color: '#3D4D5C',
                      textDecoration: 'none',
                      border: '1px solid #E8EDF4',
                      textAlign: 'center',
                    }}
                  >
                    Login
                  </Link>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Book an appointment (requires login) (mobile)"
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                      padding: '13px 16px',
                      borderRadius: 50,
                      fontSize: 15,
                      fontWeight: 600,
                      color: '#fff',
                      background: '#173C63',
                      textDecoration: 'none',
                    }}
                  >
                    <FiCalendar /> Book Appointment
                  </Link>
                </div>
              )}

              {/* Contact strip */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px',
                marginTop: 4,
                borderRadius: 10,
                background: 'rgba(23,60,99,0.05)',
                color: '#6B7A8D',
                fontSize: 13,
              }}>
                <FiPhone style={{ color: '#173C63', flexShrink: 0 }} />
                Emergency: <strong style={{ color: '#173C63' }}>+1 (800) 123-4567</strong>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
