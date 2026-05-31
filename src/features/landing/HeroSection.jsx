import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlay, FiCalendar, FiStar, FiUsers, FiAward, FiHeart } from 'react-icons/fi';
import { motion } from 'framer-motion';

const floatAnim = {
  initial: { y: 0 },
  animate: { y: [-8, 0, -8], transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } },
};

const HeroSection = () => {
  return (
    <section
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #F4F7FB 0%, #FFFFFF 60%, #EEF4FF 100%)',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 72,
      }}
    >
      {/* Background decorative blobs */}
      <div style={{
        position: 'absolute', top: -120, right: -120,
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(74,144,226,0.12) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80,
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(23,60,99,0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Dotted grid pattern */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        backgroundImage: 'radial-gradient(circle, rgba(23,60,99,0.06) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        opacity: 0.6,
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'center' }}
          className="hero-grid">

          {/* ── Left: Text Content ── */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '8px 16px',
                background: 'rgba(23,60,99,0.08)',
                border: '1px solid rgba(23,60,99,0.15)',
                borderRadius: 50,
                marginBottom: 28,
                color: '#173C63',
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: '0.02em',
              }}
            >
              <div style={{
                width: 8, height: 8, borderRadius: '50%',
                background: '#27AE60',
                boxShadow: '0 0 0 3px rgba(39,174,96,0.2)',
                animation: 'pulse-ring 2.5s cubic-bezier(0.215,0.61,0.355,1) infinite',
              }} />
              Trusted by 50,000+ Patients Worldwide
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              style={{
                fontFamily: "'Lora', serif",
                fontSize: 'clamp(2.4rem, 4.5vw, 3.6rem)',
                fontWeight: 700,
                color: '#0D1B2A',
                lineHeight: 1.18,
                letterSpacing: '-0.025em',
                marginBottom: 24,
              }}
            >
              Your Health,{' '}
              <span style={{ fontStyle: 'italic', color: '#173C63', position: 'relative' }}>
                Our Top
                {/* underline decoration */}
                <svg style={{ position: 'absolute', bottom: -6, left: 0, width: '100%' }} height="6" viewBox="0 0 200 6" fill="none" preserveAspectRatio="none">
                  <path d="M0 5 Q50 1 100 5 Q150 9 200 5" stroke="#4A90E2" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                </svg>
              </span>{' '}
              Priority
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 17,
                color: '#6B7A8D',
                lineHeight: 1.75,
                marginBottom: 40,
                maxWidth: 480,
              }}
            >
              Experience world-class healthcare with our expert medical team. From routine check-ups to specialized treatment — we're here for every step of your journey.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', marginBottom: 52 }}
            >
              <Link to="/appointments" className="btn-primary" style={{ fontSize: 15 }} aria-label="Book appointment — hero section">
                <FiCalendar style={{ fontSize: 16 }} />
                Book Appointment
                <FiArrowRight style={{ fontSize: 15 }} />
              </Link>
              <button
                aria-label="Watch our story video"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10,
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: '#3D4D5C', fontSize: 15, fontWeight: 500,
                }}
              >
                <span style={{
                  width: 48, height: 48, borderRadius: '50%',
                  background: '#fff',
                  border: '2px solid #E8EDF4',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: '0 4px 12px rgba(23,60,99,0.1)',
                  flexShrink: 0,
                }}>
                  <FiPlay style={{ color: '#173C63', fontSize: 14, marginLeft: 2 }} />
                </span>
                Watch Our Story
              </button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}
            >
              {/* Avatar stack */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ display: 'flex' }}>
                  {['#4A90E2','#173C63','#27AE60','#E67E22'].map((color, i) => (
                    <div key={i} style={{
                      width: 34, height: 34, borderRadius: '50%',
                      background: `linear-gradient(135deg, ${color}, ${color}CC)`,
                      border: '2.5px solid #fff',
                      marginLeft: i === 0 ? 0 : -10,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: '#fff', fontSize: 12, fontWeight: 700,
                    }}>
                      {['JD','SM','AR','PK'][i]}
                    </div>
                  ))}
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                    {[1,2,3,4,5].map(i => <FiStar key={i} style={{ fontSize: 11, color: '#F59E0B', fill: '#F59E0B' }} />)}
                  </div>
                  <span style={{ fontSize: 12, color: '#6B7A8D', fontWeight: 500 }}>4.9/5 from 2,800+ reviews</span>
                </div>
              </div>
              <div style={{ height: 36, width: 1, background: '#E2E8F0' }} />
              <div style={{ fontSize: 13, color: '#6B7A8D' }}>
                <strong style={{ color: '#173C63' }}>NABH Accredited</strong> Hospital
              </div>
            </motion.div>
          </motion.div>

          {/* ── Right: Image + Floating Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}
            className="hero-image-col"
          >
            {/* Decorative circle behind image */}
            <div style={{
              position: 'absolute',
              width: 420, height: 420,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(74,144,226,0.15) 0%, rgba(23,60,99,0.1) 100%)',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 0,
            }} />

            {/* Main Doctor Image */}
            <motion.div
              animate={{ y: [-8, 0, -8] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              style={{ position: 'relative', zIndex: 1 }}
            >
              <img
                src="/hero-doctor.png"
                alt="Expert Doctor at MediCare Health System"
                width="525"
                height="525"
                style={{
                  width: '100%',
                  maxWidth: 420,
                  height: 'auto',
                  borderRadius: 32,
                  display: 'block',
                  boxShadow: '0 24px 80px rgba(23,60,99,0.18)',
                  objectFit: 'cover',
                }}
              />
            </motion.div>

            {/* Floating Card 1 — Patients Served */}
            <motion.div
              initial={{ opacity: 0, x: -20, y: 20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              style={{
                position: 'absolute', bottom: 60, left: -20,
                background: '#fff',
                border: '1px solid #E8EDF4',
                borderRadius: 16,
                padding: '14px 18px',
                boxShadow: '0 8px 32px rgba(23,60,99,0.12)',
                display: 'flex', alignItems: 'center', gap: 12,
                zIndex: 10,
                minWidth: 170,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(23,60,99,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <FiUsers style={{ color: '#173C63', fontSize: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#0D1B2A', lineHeight: 1.1 }}>50K+</div>
                <div style={{ fontSize: 12, color: '#6B7A8D', fontWeight: 500 }}>Patients Served</div>
              </div>
            </motion.div>

            {/* Floating Card 2 — Experience */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: -20 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: 0.85, duration: 0.5 }}
              style={{
                position: 'absolute', top: 60, right: -10,
                background: '#173C63',
                borderRadius: 16,
                padding: '14px 18px',
                boxShadow: '0 8px 32px rgba(23,60,99,0.35)',
                display: 'flex', alignItems: 'center', gap: 12,
                zIndex: 10,
                minWidth: 155,
              }}
            >
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: 'rgba(255,255,255,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <FiAward style={{ color: '#fff', fontSize: 20 }} />
              </div>
              <div>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>25+ Yrs</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>Experience</div>
              </div>
            </motion.div>

            {/* Floating Card 3 — Happy Rating */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              style={{
                position: 'absolute', bottom: -10, right: 10,
                background: '#fff',
                border: '1px solid #E8EDF4',
                borderRadius: 16,
                padding: '12px 16px',
                boxShadow: '0 8px 32px rgba(23,60,99,0.10)',
                display: 'flex', alignItems: 'center', gap: 10,
                zIndex: 10,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'rgba(39,174,96,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <FiHeart style={{ color: '#27AE60', fontSize: 18 }} />
              </div>
              <div>
                <div style={{ fontSize: 17, fontWeight: 700, color: '#0D1B2A', lineHeight: 1.1 }}>98%</div>
                <div style={{ fontSize: 11, color: '#6B7A8D', fontWeight: 500 }}>Satisfaction Rate</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Responsive styles */}
      <style>{`
        @media (max-width: 900px) {
          .hero-grid { grid-template-columns: 1fr !important; gap: 48px !important; text-align: center; }
          .hero-image-col { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
