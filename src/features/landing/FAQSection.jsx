import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiPlus, FiMinus } from 'react-icons/fi';

const faqs = [
  {
    question: 'How do I book an appointment online?',
    answer: "Booking is simple. Click the 'Book Appointment' button, choose your preferred specialist and department, select an available date and time, and confirm with your details. You'll receive an instant confirmation via email and SMS.",
  },
  {
    question: 'Can I consult with a doctor via video call?',
    answer: 'Yes! We offer teleconsultation services for all our registered patients. Once your appointment is confirmed, you will receive a secure video link to connect with your doctor from the comfort of your home.',
  },
  {
    question: 'Are my health records kept private and secure?',
    answer: 'Absolutely. All patient data is encrypted and stored on HIPAA-compliant secure servers. Only authorised medical staff can access your records, and you have full control over who can view your information.',
  },
  {
    question: 'What insurance plans do you accept?',
    answer: 'We are empanelled with all major insurance providers including Star Health, HDFC ERGO, Niva Bupa, Bajaj Allianz, and government schemes like PMJAY. Contact our billing team to verify your specific plan coverage.',
  },
  {
    question: 'How do I access my test reports and prescriptions?',
    answer: 'All lab reports, prescriptions, and visit summaries are available on your personal health dashboard within 24 hours. You can download, print, or share them directly from your account.',
  },
  {
    question: 'What are your emergency services and operating hours?',
    answer: 'Our Emergency Department operates 24 hours a day, 7 days a week, 365 days a year. Routine OPD hours are 8 AM – 8 PM. For emergencies, call our hotline: +1 (800) 123-4567.',
  },
];

const FAQItem = ({ faq, index }) => {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
      style={{
        border: `1px solid ${open ? 'rgba(23,60,99,0.2)' : '#E8EDF4'}`,
        borderRadius: 14,
        overflow: 'hidden',
        background: open ? 'rgba(23,60,99,0.02)' : '#fff',
        transition: 'all 0.3s',
        boxShadow: open ? '0 4px 20px rgba(23,60,99,0.07)' : 'none',
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', background: 'none', border: 'none',
          padding: '22px 24px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          cursor: 'pointer', textAlign: 'left', gap: 16,
        }}
      >
        <span style={{
          fontFamily: "'Lora', serif",
          fontSize: 16, fontWeight: 600,
          color: open ? '#173C63' : '#0D1B2A',
          lineHeight: 1.4, flex: 1,
        }}>
          {faq.question}
        </span>
        <div style={{
          width: 32, height: 32, borderRadius: '50%',
          background: open ? '#173C63' : '#F4F7FB',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
          transition: 'all 0.3s',
        }}>
          {open
            ? <FiMinus size={14} style={{ color: '#fff' }} />
            : <FiPlus size={14} style={{ color: '#173C63' }} />
          }
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              padding: '0 24px 22px',
              fontSize: 14, color: '#6B7A8D',
              lineHeight: 1.75,
              borderTop: '1px solid #F0F4F8',
              paddingTop: 16,
            }}>
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const FAQSection = () => {
  return (
    <section style={{ background: '#FFFFFF', padding: '96px 24px' }}>
      <div style={{ maxWidth: 800, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-tag">FAQ</span>
          <h2 className="section-title" style={{ marginTop: 12, marginBottom: 16 }}>
            Frequently Asked{' '}
            <span style={{ fontStyle: 'italic', color: '#173C63' }}>Questions</span>
          </h2>
          <p className="section-subtitle" style={{ margin: '0 auto' }}>
            Everything you need to know about our services, appointments, and patient care.
          </p>
        </div>

        {/* FAQ Items */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>

        {/* Still have questions */}
        <div style={{
          marginTop: 48,
          padding: '32px',
          background: '#F4F7FB',
          borderRadius: 20,
          textAlign: 'center',
          border: '1px solid #E8EDF4',
        }}>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 18, fontWeight: 700, color: '#0D1B2A', margin: '0 0 8px' }}>
            Still have questions?
          </p>
          <p style={{ fontSize: 14, color: '#6B7A8D', margin: '0 0 20px', lineHeight: 1.6 }}>
            Our support team is available 24/7 to assist you with any questions.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
            <a href="tel:+18001234567" className="btn-primary" style={{ fontSize: 14 }}>
              📞 Call Us Now
            </a>
            <a href="mailto:support@medicare.com" className="btn-outline" style={{ fontSize: 14 }}>
              ✉ Send an Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
