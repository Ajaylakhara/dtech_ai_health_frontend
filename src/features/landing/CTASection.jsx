import { motion } from 'framer-motion';
import { FiCalendar, FiPhone, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section style={{ background: '#F4F7FB', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          style={{
            background: 'linear-gradient(135deg, #173C63 0%, #0F2640 60%, #1A3A5C 100%)',
            borderRadius: 28,
            padding: '72px 64px',
            position: 'relative',
            overflow: 'hidden',
            textAlign: 'center',
          }}
        >
          {/* Decorative circles */}
          <div style={{
            position: 'absolute', top: -80, right: -80,
            width: 280, height: 280, borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', bottom: -60, left: -60,
            width: 220, height: 220, borderRadius: '50%',
            background: 'rgba(74,144,226,0.12)',
            pointerEvents: 'none',
          }} />
          <div style={{
            position: 'absolute', top: '30%', left: '10%',
            width: 120, height: 120, borderRadius: '50%',
            background: 'rgba(255,255,255,0.03)',
            pointerEvents: 'none',
          }} />
          {/* Dot grid */}
          <div style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }} />

          {/* Content */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            {/* Badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '7px 18px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 50,
              marginBottom: 28,
              color: '#fff',
              fontSize: 13,
              fontWeight: 600,
            }}>
              <div style={{
                width: 7, height: 7, borderRadius: '50%',
                background: '#27AE60',
                boxShadow: '0 0 0 3px rgba(39,174,96,0.3)',
              }} />
              Available 24/7 — No Waiting
            </div>

            {/* Heading */}
            <h2 style={{
              fontFamily: "'Lora', serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2,
              letterSpacing: '-0.025em',
              margin: '0 0 20px',
            }}>
              Ready to Take Control of{' '}
              <span style={{ fontStyle: 'italic', color: '#7BB8F0' }}>Your Health?</span>
            </h2>

            {/* Subtitle */}
            <p style={{
              fontSize: 17,
              color: 'rgba(255,255,255,0.7)',
              lineHeight: 1.7,
              margin: '0 auto 44px',
              maxWidth: 560,
            }}>
              Join over 50,000 patients who trust MediCare for their healthcare needs. Book your first consultation today — the first step to better health starts here.
            </p>

            {/* Buttons */}
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
              <Link
                to="/appointments"
                aria-label="Book appointment — call to action section"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '13px 30px',
                  borderRadius: 50,
                  background: '#fff',
                  color: '#173C63',
                  fontSize: 15, fontWeight: 700,
                  textDecoration: 'none',
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 12px 40px rgba(0,0,0,0.25)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)'; }}
              >
                <FiCalendar size={16} /> Book Appointment <FiArrowRight size={15} />
              </Link>
              <a
                href="tel:+18001234567"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 30px',
                  borderRadius: 50,
                  background: 'transparent',
                  color: '#fff',
                  fontSize: 15, fontWeight: 600,
                  border: '2px solid rgba(255,255,255,0.3)',
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              >
                <FiPhone size={16} /> Emergency: +1 (800) 123-4567
              </a>
            </div>

            {/* Trust line */}
            <div style={{
              marginTop: 36,
              display: 'flex', justifyContent: 'center', gap: 32, flexWrap: 'wrap',
            }}>
              {['No Credit Card Required', 'Cancel Anytime', 'HIPAA Compliant'].map((txt, i) => (
                <span key={i} style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ color: '#27AE60', fontSize: 16 }}>✓</span> {txt}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
