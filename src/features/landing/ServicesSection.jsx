import { motion } from 'framer-motion';
import { FiArrowRight, FiHeart, FiBriefcase, FiEye, FiActivity, FiCpu, FiSmile } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: <FiHeart size={24} />,
    title: 'Cardiology',
    description: 'Advanced cardiac care with state-of-the-art diagnostics and treatment for heart conditions.',
    color: '#E53E3E',
    bg: 'rgba(229,62,62,0.08)',
  },
  {
    icon: <FiBriefcase size={24} />,
    title: 'Orthopaedics',
    description: 'Comprehensive bone, joint, and muscle care including minimally invasive surgery.',
    color: '#173C63',
    bg: 'rgba(23,60,99,0.08)',
  },
  {
    icon: <FiEye size={24} />,
    title: 'Ophthalmology',
    description: 'Complete eye care services from routine check-ups to LASIK and cataract surgery.',
    color: '#6B46C1',
    bg: 'rgba(107,70,193,0.08)',
  },
  {
    icon: <FiActivity size={24} />,
    title: 'Neurology',
    description: 'Expert diagnosis and treatment for brain, spine, and nervous system disorders.',
    color: '#D97706',
    bg: 'rgba(217,119,6,0.08)',
  },
  {
    icon: <FiCpu size={24} />,
    title: 'Radiology',
    description: 'High-precision imaging including MRI, CT scan, PET scan, and digital X-rays.',
    color: '#0694A2',
    bg: 'rgba(6,148,162,0.08)',
  },
  {
    icon: <FiSmile size={24} />,
    title: 'Paediatrics',
    description: 'Gentle, specialised healthcare for children from newborns through adolescence.',
    color: '#27AE60',
    bg: 'rgba(39,174,96,0.08)',
  },
];

const ServicesSection = () => {
  return (
    <section style={{ background: '#F4F7FB', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="section-tag">Our Services</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Specialised Medical<br />
              <span style={{ fontStyle: 'italic', color: '#173C63' }}>Departments</span>
            </h2>
          </div>
          <p className="section-subtitle" style={{ maxWidth: 380 }}>
            From routine consultations to complex surgeries, our multidisciplinary team delivers exceptional care across every specialty.
          </p>
        </div>

        {/* Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="services-grid">
          {services.map((service, i) => (
            <motion.div
              key={i}
              className="card-vitalix"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.09, duration: 0.5 }}
              style={{ padding: '32px', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: 16 }}
            >
              {/* Icon */}
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: service.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: service.color,
                flexShrink: 0,
              }}>
                {service.icon}
              </div>

              {/* Title */}
              <h3 style={{
                fontFamily: "'Lora', serif",
                fontSize: 20,
                fontWeight: 700,
                color: '#0D1B2A',
                margin: 0,
              }}>
                {service.title}
              </h3>

              {/* Description */}
              <p style={{
                fontSize: 14,
                color: '#6B7A8D',
                lineHeight: 1.65,
                margin: 0,
                flexGrow: 1,
              }}>
                {service.description}
              </p>

              {/* Link */}
              <Link
                to="/departments"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontSize: 14, fontWeight: 600,
                  color: service.color,
                  textDecoration: 'none',
                  marginTop: 4,
                  transition: 'gap 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.gap = '10px'}
                onMouseLeave={e => e.currentTarget.style.gap = '6px'}
              >
                Learn More <FiArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/departments" className="btn-outline">
            View All Departments <FiArrowRight />
          </Link>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .services-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px) { .services-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default ServicesSection;
