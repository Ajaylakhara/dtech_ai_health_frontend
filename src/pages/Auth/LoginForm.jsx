import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/thunks/authThunks';
import { FaEnvelope, FaLock, FaHospital, FaCheckCircle } from 'react-icons/fa';
import { motion } from 'framer-motion';
import logo from '../../assets/MediCare_logo.png';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, status, error: reduxError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(userInfo.role === 'admin' ? '/admin-dashboard' : '/appointments');
    }
  }, [userInfo, navigate]);

  return (
    <div style={{ width: '100%', background: '#F4F7FB', minHeight: '100vh', fontFamily: "'Inter', sans-serif", display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px 80px', position: 'relative' }}>
      {/* Background Blobs */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: 400, height: 400, background: 'rgba(74,144,226,0.08)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '10%', width: 400, height: 400, background: 'rgba(39,174,96,0.06)', borderRadius: '50%', filter: 'blur(100px)', pointerEvents: 'none' }} />

      <div style={{
        background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 32, width: '100%', maxWidth: 1000,
        display: 'flex', overflow: 'hidden', minHeight: 600, boxShadow: '0 24px 80px rgba(23,60,99,0.08)', position: 'relative', zIndex: 1
      }}>
        
        {/* Left Side - Welcoming Side */}
        <div style={{ width: '50%', background: '#FAFCFF', borderRight: '1px solid #E8EDF4', padding: 48, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative' }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(23,60,99,0.03) 0%, transparent 100%)', pointerEvents: 'none' }} />
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {/* Logo */}
            <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
              <img src={logo} alt="MediCare Logo" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }} />
            </Link>

            {/* Welcome message & Highlights */}
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 800, color: '#0D1B2A', lineHeight: 1.2, fontFamily: "'Lora', serif", marginBottom: 16 }}>
                Connecting You with <span style={{ color: '#173C63', fontStyle: 'italic' }}>Clinical Excellence</span>
              </h2>
              <p style={{ color: '#6B7A8D', fontWeight: 500, lineHeight: 1.6, fontSize: 15, marginBottom: 32 }}>
                Log in to access your consultations history, medical prescriptions, and schedule real-time visits with our certified health practitioners.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#3D4D5C', fontWeight: 600 }}>
                  <FaCheckCircle style={{ color: '#27AE60', fontSize: 18 }} />
                  <span>Real-time Doctor Consultation Booking</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#3D4D5C', fontWeight: 600 }}>
                  <FaCheckCircle style={{ color: '#27AE60', fontSize: 18 }} />
                  <span>Secure Electronic Medical Records</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#3D4D5C', fontWeight: 600 }}>
                  <FaCheckCircle style={{ color: '#27AE60', fontSize: 18 }} />
                  <span>Prescription & Lab Diagnostic Access</span>
                </div>
              </div>
            </div>
          </div>

          <div style={{ fontSize: 12, color: '#9DAAB8', fontWeight: 600 }}>
            &copy; {new Date().getFullYear()} MediCare Health. ISO 27001 Certified System.
          </div>
        </div>

        {/* Right Side - Form */}
        <div style={{ width: '50%', padding: '56px', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: '#FFFFFF' }}>
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0D1B2A', marginBottom: 8, fontFamily: "'Lora', serif" }}>Welcome Back</h2>
            <p style={{ color: '#6B7A8D', fontWeight: 500, fontSize: 15 }}>Please log in with your account credentials.</p>
          </div>

          {reduxError && (
            <div style={{ marginBottom: 24, padding: 16, background: 'rgba(235,87,87,0.05)', borderLeft: '4px solid #EB5757', color: '#EB5757', borderRadius: 12, fontSize: 13, fontWeight: 700, lineHeight: 1.5 }}>
              {reduxError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#3D4D5C', letterSpacing: '0.02em' }} htmlFor="email">
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#6B7A8D' }}>
                  <FaEnvelope size={16} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  style={{
                    width: '100%', padding: '14px 16px 14px 44px', background: '#F8FAFC', border: '1px solid #E8EDF4',
                    borderRadius: 12, fontSize: 15, fontWeight: 600, color: '#0D1B2A', outline: 'none', transition: 'all 0.2s'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <label style={{ fontSize: 13, fontWeight: 700, color: '#3D4D5C', letterSpacing: '0.02em' }} htmlFor="password">
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#6B7A8D' }}>
                  <FaLock size={16} />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  style={{
                    width: '100%', padding: '14px 16px 14px 44px', background: '#F8FAFC', border: '1px solid #E8EDF4',
                    borderRadius: 12, fontSize: 15, fontWeight: 600, color: '#0D1B2A', outline: 'none', transition: 'all 0.2s'
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#173C63'; e.target.style.boxShadow = '0 0 0 3px rgba(23,60,99,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#E8EDF4'; e.target.style.boxShadow = 'none'; }}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="login-btn"
              style={{
                width: '100%', background: '#173C63', color: '#FFFFFF', padding: '16px', borderRadius: 12,
                fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer', transition: 'all 0.2s', marginTop: 12
              }}
            >
              {status === 'loading' ? 'Signing In...' : 'Sign In'}
            </button>
          </form>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <p style={{ color: '#6B7A8D', fontWeight: 600, fontSize: 14 }}>
              New to MediCare?{' '}
              <Link to="/signup" style={{ color: '#4A90E2', textDecoration: 'none', transition: 'color 0.2s' }} onMouseOver={(e) => e.target.style.color = '#173C63'} onMouseOut={(e) => e.target.style.color = '#4A90E2'}>
                Create a patient account
              </Link>
            </p>
          </div>
        </div>

      </div>

      <style>{`
        .login-btn:hover:not(:disabled) {
          background: #1E4D7B !important;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(23,60,99,0.25);
        }
        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed !important;
        }
        @media (max-width: 1024px) {
          div[style*="width: '50%'"] {
            width: 100% !important;
          }
          div[style*="background: '#FAFCFF'"] {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
