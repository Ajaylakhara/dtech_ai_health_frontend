import { motion } from 'framer-motion';
import { FiStar, FiCalendar, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    specialty: 'Senior Cardiologist',
    experience: '18 Years',
    rating: 4.9,
    reviews: 312,
    initials: 'SM',
    color: '#E53E3E',
    bg: 'linear-gradient(135deg, #FC8181, #E53E3E)',
    available: true,
  },
  {
    name: 'Dr. Arjun Mehta',
    specialty: 'Neurology Specialist',
    experience: '14 Years',
    rating: 4.8,
    reviews: 247,
    initials: 'AM',
    color: '#173C63',
    bg: 'linear-gradient(135deg, #4A90E2, #173C63)',
    available: true,
  },
  {
    name: 'Dr. Priya Sharma',
    specialty: 'Paediatric Expert',
    experience: '11 Years',
    rating: 4.9,
    reviews: 198,
    initials: 'PS',
    color: '#27AE60',
    bg: 'linear-gradient(135deg, #68D391, #27AE60)',
    available: false,
  },
  {
    name: 'Dr. James Wilson',
    specialty: 'Orthopaedic Surgeon',
    experience: '22 Years',
    rating: 5.0,
    reviews: 421,
    initials: 'JW',
    color: '#6B46C1',
    bg: 'linear-gradient(135deg, #B794F4, #6B46C1)',
    available: true,
  },
];

const DoctorsSection = () => {
  return (
    <section style={{ background: '#F4F7FB', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 24 }}>
          <div>
            <span className="section-tag">Our Doctors</span>
            <h2 className="section-title" style={{ marginTop: 12 }}>
              Meet Our{' '}
              <span style={{ fontStyle: 'italic', color: '#173C63' }}>Expert Team</span>
            </h2>
          </div>
          <Link
            to="/departments"
            className="btn-outline"
            style={{ flexShrink: 0 }}
            aria-label="View all doctors and medical departments"
          >
            View All Doctors <FiArrowRight />
          </Link>
        </div>

        {/* Doctor Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24 }} className="doctors-grid">
          {doctors.map((doctor, i) => (
            <motion.div
              key={i}
              className="card-vitalix"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
            >
              {/* Doctor Photo Area */}
              <div style={{
                height: 220,
                background: doctor.bg,
                display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Decorative pattern */}
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                  backgroundImage: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15) 0%, transparent 60%)',
                }} />
                {/* Avatar */}
                <div style={{
                  width: 100, height: 100, borderRadius: '50%',
                  background: 'rgba(255,255,255,0.2)',
                  border: '4px solid rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 32, fontWeight: 700, color: '#fff',
                  fontFamily: "'Lora', serif",
                  marginBottom: 20,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(10px)',
                  zIndex: 1,
                }}>
                  {doctor.initials}
                </div>
                {/* Availability badge */}
                <div style={{
                  position: 'absolute', top: 16, right: 16,
                  padding: '5px 12px', borderRadius: 50,
                  background: doctor.available ? 'rgba(39,174,96,0.9)' : 'rgba(156,163,175,0.9)',
                  color: '#fff', fontSize: 11, fontWeight: 600,
                  backdropFilter: 'blur(4px)',
                }}>
                  {doctor.available ? '● Available' : '● Busy'}
                </div>
              </div>

              {/* Doctor Info */}
              <div style={{ padding: '20px 24px 24px' }}>
                {/* Name */}
                <h3 style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 17, fontWeight: 700,
                  color: '#0D1B2A',
                  margin: '0 0 4px',
                  lineHeight: 1.2,
                }}>
                  {doctor.name}
                </h3>
                {/* Specialty */}
                <p style={{ fontSize: 13, color: '#6B7A8D', margin: '0 0 12px', fontWeight: 500 }}>
                  {doctor.specialty} · {doctor.experience}
                </p>

                {/* Rating */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                  <div style={{ display: 'flex', gap: 2 }}>
                    {[1,2,3,4,5].map(s => (
                      <FiStar key={s} size={12}
                        style={{ color: '#F59E0B', fill: s <= Math.floor(doctor.rating) ? '#F59E0B' : 'transparent' }}
                      />
                    ))}
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2A' }}>{doctor.rating}</span>
                  <span style={{ fontSize: 12, color: '#9DAAB8' }}>({doctor.reviews} reviews)</span>
                </div>

                {/* Book Now Button */}
                <Link
                  to="/appointments"
                  aria-label={`Book appointment with ${doctor.name}`}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                    width: '100%',
                    padding: '10px 0',
                    borderRadius: 50,
                    background: '#173C63',
                    color: '#fff',
                    fontSize: 13, fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.2s',
                    border: 'none',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#1E4D7B'; e.currentTarget.style.transform = 'translateY(-1px)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#173C63'; e.currentTarget.style.transform = 'none'; }}
                >
                  <FiCalendar size={13} /> Book Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 1024px) { .doctors-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 560px)  { .doctors-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </section>
  );
};

export default DoctorsSection;
