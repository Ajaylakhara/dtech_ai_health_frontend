import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const plans = [
  {
    name: 'Basic Care',
    price: '₹499',
    period: '/month',
    description: 'Perfect for individuals seeking routine healthcare management.',
    features: [
      '2 Consultations per month',
      'Digital Health Records',
      'Lab Result Tracking',
      'Email & SMS Reminders',
      'Basic Health Dashboard',
    ],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Premium Care',
    price: '₹1,299',
    period: '/month',
    description: 'Comprehensive care for families with priority access to specialists.',
    features: [
      'Unlimited Consultations',
      'Priority Appointments',
      'Full Family Coverage (4 members)',
      'Dedicated Care Manager',
      'Home Visit (2 per month)',
      '24/7 Teleconsultation',
      'Advanced Analytics',
    ],
    cta: 'Start Free Trial',
    highlighted: true,
    badge: 'Most Popular',
  },
  {
    name: 'Corporate Care',
    price: '₹4,999',
    period: '/month',
    description: 'Enterprise-grade health solutions for organisations and large families.',
    features: [
      'Up to 20 Employees / Members',
      'Onsite Health Camps',
      'Dedicated Account Manager',
      'Annual Health Check-ups',
      'Mental Health Support',
      'Emergency Response Priority',
    ],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

const PricingSection = () => {
  const [billing, setBilling] = useState('monthly');

  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-tag">Pricing Plans</span>
          <h2 className="section-title" style={{ marginTop: 12, marginBottom: 16 }}>
            Transparent &{' '}
            <span style={{ fontStyle: 'italic', color: '#173C63' }}>Affordable</span> Plans
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto 32px' }}>
            Choose a plan that fits your healthcare needs. No hidden charges, cancel anytime.
          </p>

          {/* Billing toggle */}
          <div style={{
            display: 'inline-flex',
            background: '#F4F7FB',
            borderRadius: 50,
            padding: 4,
            border: '1px solid #E8EDF4',
          }}>
            {['monthly', 'yearly'].map(b => (
              <button
                key={b}
                onClick={() => setBilling(b)}
                style={{
                  padding: '8px 24px',
                  borderRadius: 50,
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  background: billing === b ? '#173C63' : 'transparent',
                  color: billing === b ? '#fff' : '#6B7A8D',
                  transition: 'all 0.25s',
                }}
              >
                {b.charAt(0).toUpperCase() + b.slice(1)}
                {b === 'yearly' && (
                  <span style={{
                    marginLeft: 6,
                    background: 'rgba(39,174,96,0.15)',
                    color: '#27AE60',
                    fontSize: 10,
                    fontWeight: 700,
                    padding: '2px 6px',
                    borderRadius: 4,
                    letterSpacing: '0.05em',
                  }}>
                    -20%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, alignItems: 'start' }} className="pricing-grid">
          {plans.map((plan, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5 }}
              style={{
                borderRadius: 24,
                padding: plan.highlighted ? '36px 32px' : '32px 32px',
                background: plan.highlighted ? '#173C63' : '#fff',
                border: plan.highlighted ? 'none' : '1px solid #E8EDF4',
                boxShadow: plan.highlighted ? '0 20px 60px rgba(23,60,99,0.35)' : '0 4px 24px rgba(23,60,99,0.07)',
                position: 'relative',
                transform: plan.highlighted ? 'scale(1.03)' : 'none',
              }}
            >
              {/* Badge */}
              {plan.badge && (
                <div style={{
                  position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)',
                  background: '#27AE60',
                  color: '#fff',
                  padding: '5px 18px',
                  borderRadius: 50,
                  fontSize: 12, fontWeight: 700,
                  letterSpacing: '0.05em',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(39,174,96,0.35)',
                }}>
                  {plan.badge}
                </div>
              )}

              {/* Plan name */}
              <div style={{ marginBottom: 20 }}>
                <h3 style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 20, fontWeight: 700,
                  color: plan.highlighted ? '#fff' : '#0D1B2A',
                  margin: '0 0 8px',
                }}>
                  {plan.name}
                </h3>
                <p style={{ fontSize: 13, color: plan.highlighted ? 'rgba(255,255,255,0.65)' : '#6B7A8D', margin: 0, lineHeight: 1.5 }}>
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div style={{ marginBottom: 28, display: 'flex', alignItems: 'flex-end', gap: 4 }}>
                <span style={{
                  fontFamily: "'Lora', serif",
                  fontSize: 44, fontWeight: 700,
                  color: plan.highlighted ? '#fff' : '#0D1B2A',
                  lineHeight: 1,
                }}>
                  {billing === 'yearly'
                    ? `₹${Math.round(parseInt(plan.price.replace(/[₹,]/g, '')) * 0.8).toLocaleString('en-IN')}`
                    : plan.price}
                </span>
                <span style={{ fontSize: 14, color: plan.highlighted ? 'rgba(255,255,255,0.6)' : '#9DAAB8', marginBottom: 6, fontWeight: 500 }}>
                  {plan.period}
                </span>
              </div>

              {/* Divider */}
              <div style={{ height: 1, background: plan.highlighted ? 'rgba(255,255,255,0.15)' : '#F0F4F8', marginBottom: 24 }} />

              {/* Features */}
              <ul style={{ listStyle: 'none', margin: '0 0 28px', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                {plan.features.map((feat, j) => (
                  <li key={j} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 14, color: plan.highlighted ? 'rgba(255,255,255,0.85)' : '#3D4D5C' }}>
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%',
                      background: plan.highlighted ? 'rgba(255,255,255,0.15)' : 'rgba(23,60,99,0.08)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0, marginTop: 1,
                    }}>
                      <FiCheck size={11} style={{ color: plan.highlighted ? '#fff' : '#173C63', strokeWidth: 3 }} />
                    </div>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                to="/appointments"
                aria-label={`${plan.cta} - ${plan.name} plan`}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                  width: '100%',
                  padding: '13px 0',
                  borderRadius: 50,
                  background: plan.highlighted ? '#fff' : '#173C63',
                  color: plan.highlighted ? '#173C63' : '#fff',
                  fontSize: 14, fontWeight: 700,
                  textDecoration: 'none',
                  transition: 'all 0.25s',
                  border: 'none',
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = plan.highlighted ? '0 8px 24px rgba(255,255,255,0.3)' : '0 8px 24px rgba(23,60,99,0.3)'; }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                {plan.cta} <FiArrowRight size={14} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .pricing-grid { grid-template-columns: 1fr !important; max-width: 480px; margin: 0 auto; } }
      `}</style>
    </section>
  );
};

export default PricingSection;
