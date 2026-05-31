import { useEffect, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';

const stats = [
  { value: 50000, suffix: '+', label: 'Patients Served', description: 'Across all departments' },
  { value: 200, suffix: '+', label: 'Expert Doctors', description: 'Board-certified specialists' },
  { value: 25, suffix: ' Yrs', label: 'Of Excellence', description: 'Trusted since 1999' },
  { value: 98, suffix: '%', label: 'Satisfaction Rate', description: 'Patient happiness score' },
];

const AnimatedNumber = ({ value, suffix }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const motionVal = useMotionValue(0);
  const springVal = useSpring(motionVal, { duration: 2000, bounce: 0 });

  useEffect(() => {
    if (inView) motionVal.set(value);
  }, [inView, value, motionVal]);

  return (
    <span ref={ref} style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(2.4rem, 4vw, 3.4rem)', fontWeight: 700, color: '#0D1B2A', lineHeight: 1 }}>
      <motion.span>{springVal.get() > 0 ? Math.round(springVal.get()).toLocaleString() : 0}</motion.span>
      {suffix}
    </span>
  );
};

const StatsSection = () => {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64 }}>
          <span className="section-tag">Our Numbers</span>
          <h2 className="section-title" style={{ marginBottom: 16 }}>Making a Real Difference</h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Every number represents a life touched, a family supported, and a commitment to healthcare excellence.
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#E8EDF4', borderRadius: 24, overflow: 'hidden' }}
          className="stats-grid">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{
                background: '#fff',
                padding: '48px 40px',
                textAlign: 'center',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10,
              }}
            >
              {/* Number */}
              <div>
                <AnimatedNumber value={stat.value} suffix={stat.suffix} />
              </div>
              {/* Label */}
              <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, fontWeight: 700, color: '#173C63' }}>
                {stat.label}
              </div>
              {/* Description */}
              <div style={{ fontSize: 13, color: '#9DAAB8', fontWeight: 500 }}>
                {stat.description}
              </div>
              {/* Accent line */}
              <div style={{ width: 32, height: 3, background: '#173C63', borderRadius: 2, marginTop: 8 }} />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 480px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default StatsSection;
