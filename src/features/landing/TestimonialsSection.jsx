import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const testimonials = [
  {
    name: 'Rajesh Kapoor',
    role: 'Heart Surgery Patient',
    rating: 5,
    review: "The cardiac team at MediCare saved my life. From the moment I arrived, every doctor and nurse treated me with incredible care and professionalism. I couldn't be more grateful.",
    initials: 'RK',
    color: 'linear-gradient(135deg, #FC8181, #E53E3E)',
  },
  {
    name: 'Meena Subramaniam',
    role: 'Maternity Care Patient',
    rating: 5,
    review: "My entire maternity journey was handled with such warmth and expertise. The doctors were always available to answer my questions. A truly five-star experience throughout.",
    initials: 'MS',
    color: 'linear-gradient(135deg, #68D391, #27AE60)',
  },
  {
    name: 'David Thompson',
    role: 'Orthopaedic Patient',
    rating: 5,
    review: "After my knee surgery, the recovery programme designed by the team was outstanding. I was back to running within three months. The physiotherapy support was exceptional.",
    initials: 'DT',
    color: 'linear-gradient(135deg, #4A90E2, #173C63)',
  },
  {
    name: 'Anita Patel',
    role: 'Diabetes Management',
    rating: 5,
    review: "Managing my Type 2 diabetes has become so much easier with MediCare's integrated care plan. The nutritionist and endocrinologist work together seamlessly — it's remarkable.",
    initials: 'AP',
    color: 'linear-gradient(135deg, #B794F4, #6B46C1)',
  },
  {
    name: 'Suresh Nair',
    role: 'Neurology Patient',
    rating: 5,
    review: "Dr. Mehta diagnosed my condition quickly when other hospitals had missed it for months. The neurology department here is truly world-class. Forever thankful.",
    initials: 'SN',
    color: 'linear-gradient(135deg, #F6AD55, #D97706)',
  },
];

const TestimonialsSection = () => {
  const [active, setActive] = useState(0);

  const prev = () => setActive(a => (a - 1 + testimonials.length) % testimonials.length);
  const next = () => setActive(a => (a + 1) % testimonials.length);

  const visible = [
    testimonials[(active) % testimonials.length],
    testimonials[(active + 1) % testimonials.length],
    testimonials[(active + 2) % testimonials.length],
  ];

  return (
    <section style={{ background: '#F4F7FB', padding: '96px 24px', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="section-tag">Testimonials</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              What Our{' '}
              <span style={{ fontStyle: 'italic', color: '#173C63' }}>Patients Say</span>
            </h2>
          </div>
          {/* Navigation arrows */}
          <div style={{ display: 'flex', gap: 10 }}>
            <button onClick={prev} aria-label="Previous testimonial" style={{
              width: 48, height: 48, borderRadius: '50%',
              border: '2px solid #E2E8F0',
              background: '#fff',
              color: '#173C63', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#173C63'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = '#173C63'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = '#173C63'; e.currentTarget.style.borderColor = '#E2E8F0'; }}
            >
              <FiChevronLeft />
            </button>
            <button onClick={next} aria-label="Next testimonial" style={{
              width: 48, height: 48, borderRadius: '50%',
              border: 'none',
              background: '#173C63',
              color: '#fff', fontSize: 18,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer', transition: 'all 0.2s',
              boxShadow: '0 4px 14px rgba(23,60,99,0.3)',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#1E4D7B'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#173C63'; e.currentTarget.style.transform = 'none'; }}
            >
              <FiChevronRight />
            </button>
          </div>
        </div>

        {/* Testimonial Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="testimonials-grid">
          {visible.map((t, i) => (
            <motion.div
              key={`${active}-${i}`}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              style={{
                background: '#fff',
                border: '1px solid #E8EDF4',
                borderRadius: 20,
                padding: '28px',
                boxShadow: '0 4px 24px rgba(23,60,99,0.07)',
                display: 'flex', flexDirection: 'column', gap: 16,
                position: 'relative',
              }}
            >
              {/* Quote mark */}
              <div style={{
                fontFamily: "'Lora', serif",
                fontSize: 64, lineHeight: 0.8,
                color: 'rgba(23,60,99,0.1)',
                fontWeight: 700,
                position: 'absolute',
                top: 20, right: 24,
              }}>
                "
              </div>

              {/* Stars */}
              <div style={{ display: 'flex', gap: 3 }}>
                {[1,2,3,4,5].map(s => (
                  <FiStar key={s} size={14} style={{ color: '#F59E0B', fill: '#F59E0B' }} />
                ))}
              </div>

              {/* Review text */}
              <p style={{
                fontSize: 14, lineHeight: 1.75,
                color: '#3D4D5C',
                margin: 0, flexGrow: 1,
                fontStyle: 'italic',
              }}>
                "{t.review}"
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, borderTop: '1px solid #F0F4F8', paddingTop: 16 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: t.color,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: 13, fontWeight: 700,
                  flexShrink: 0,
                }}>
                  {t.initials}
                </div>
                <div>
                  <div style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 700, color: '#0D1B2A' }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: '#9DAAB8', fontWeight: 500 }}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 40 }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              style={{
                width: i === active ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === active ? '#173C63' : '#CBD5E0',
                border: '12px solid transparent',
                backgroundClip: 'padding-box',
                cursor: 'pointer',
                transition: 'all 0.3s',
                padding: 0,
                boxSizing: 'content-box',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .testimonials-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .testimonials-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default TestimonialsSection;
