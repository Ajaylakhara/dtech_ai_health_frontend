import { motion } from 'framer-motion';
import { FiCalendar, FiUserCheck, FiCheckCircle, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    icon: <FiCalendar size={28} />,
    title: 'Book an Appointment',
    description: 'Schedule your visit online in minutes — choose your preferred doctor, date, and time slot.',
  },
  {
    number: '02',
    icon: <FiUserCheck size={28} />,
    title: 'Meet Your Specialist',
    description: 'Consult with our board-certified experts in person or via teleconsultation from your home.',
  },
  {
    number: '03',
    icon: <FiCheckCircle size={28} />,
    title: 'Get Your Treatment',
    description: 'Receive a personalised treatment plan with follow-up care and ongoing health monitoring.',
  },
];

const StepsSection = () => {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px', position: 'relative', overflow: 'hidden' }}>
      {/* Background decoration */}
      <div style={{
        position: 'absolute', right: -100, top: '50%', transform: 'translateY(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(23,60,99,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72 }}>
          <span className="section-tag">How It Works</span>
          <h2 className="section-title" style={{ marginTop: 12, marginBottom: 16 }}>
            Simple Steps to{' '}
            <span style={{ fontStyle: 'italic', color: '#173C63' }}>Better Health</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Getting quality healthcare has never been easier. Our streamlined process ensures you spend less time waiting and more time healing.
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, position: 'relative' }} className="steps-grid">
          {/* Connector line (desktop only) */}
          <div style={{
            position: 'absolute',
            top: 48, left: '16.67%', right: '16.67%',
            height: 2,
            borderTop: '2px dashed #CBD5E0',
            zIndex: 0,
          }} className="steps-connector" />

          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.18, duration: 0.55 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center',
                textAlign: 'center', padding: '0 32px',
                position: 'relative', zIndex: 1,
              }}
            >
              {/* Step number circle */}
              <div style={{
                width: 88, height: 88, borderRadius: '50%',
                background: i === 1 ? '#173C63' : '#FFFFFF',
                border: `3px solid ${i === 1 ? '#173C63' : '#E8EDF4'}`,
                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                marginBottom: 28,
                boxShadow: i === 1 ? '0 8px 32px rgba(23,60,99,0.3)' : '0 4px 16px rgba(23,60,99,0.08)',
                transition: 'all 0.3s',
                color: i === 1 ? '#fff' : '#173C63',
                gap: 2,
              }}>
                {step.icon}
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.05em', opacity: 0.7 }}>
                  {step.number}
                </span>
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Lora', serif",
                fontSize: 20, fontWeight: 700,
                color: '#0D1B2A',
                marginBottom: 12, marginTop: 0,
              }}>
                {step.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 14, color: '#6B7A8D',
                lineHeight: 1.7, margin: 0,
              }}>
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{ textAlign: 'center', marginTop: 56 }}
        >
          <Link to="/appointments" className="btn-primary">
            Book Your Appointment <FiArrowRight />
          </Link>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .steps-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .steps-connector { display: none !important; }
        }
      `}</style>
    </section>
  );
};

export default StepsSection;
