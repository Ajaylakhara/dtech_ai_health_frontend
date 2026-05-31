import { useState } from 'react';
import {
  FaLifeRing, FaQuestionCircle, FaEnvelope, FaBookOpen,
  FaChevronDown, FaChevronUp, FaTicketAlt, FaCommentDots,
} from 'react-icons/fa';
import {
  FiHelpCircle, FiMessageCircle, FiHeadphones,
  FiBook, FiSend, FiAlertCircle,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: 'How do I add a new doctor?',
    a: "Navigate to the Doctors section using the sidebar and click the '+ Add New Doctor' button in the top-right. Fill in the doctor's details in the modal form and submit.",
  },
  {
    q: 'Can I cancel or reschedule an appointment?',
    a: "Yes. Go to Appointments, find the appointment row, and click the red ✕ icon to cancel a pending appointment. Rescheduling requires deleting and rebooking with new date/time.",
  },
  {
    q: 'Where can I view a patient\'s history?',
    a: 'Patient histories are accessible by clicking the edit icon (pencil) in the Patients table. The modal will display all registered information for that patient.',
  },
  {
    q: 'How do I manage hospital departments?',
    a: 'Go to the Departments section. You can add new departments, edit names/fees/descriptions, and remove outdated departments using the actions in each row.',
  },
  {
    q: 'How do I reset an admin password?',
    a: 'Go to Settings → Security tab and use the Change Password form. You can also enable Two-Factor Authentication for additional security.',
  },
  {
    q: 'Is patient data secure?',
    a: 'Yes. All data is encrypted in transit (HTTPS) and at rest. Access is restricted to authenticated admin users. Session logs track every login.',
  },
];

const tickets = [
  { id: '#1024', title: 'Cannot upload doctor profile image', time: '2 hours ago', status: 'Pending',   color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', priority: 'High' },
  { id: '#1023', title: 'Dashboard stats not updating live',  time: '1 day ago',   status: 'Resolved',  color: '#27AE60', bg: 'rgba(39,174,96,0.1)',  priority: 'Medium' },
  { id: '#1022', title: 'Patient report PDF download fails',  time: '2 days ago',  status: 'In Review', color: '#4A90E2', bg: 'rgba(74,144,226,0.1)', priority: 'High' },
  { id: '#1021', title: 'Search filter not working on mobile',time: '3 days ago',  status: 'Resolved',  color: '#27AE60', bg: 'rgba(39,174,96,0.1)',  priority: 'Low' },
];

const cardStyle = {
  background: '#FFFFFF', border: '1px solid #E8EDF4',
  borderRadius: 16, padding: '24px 26px',
  boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
};
const sectionTitle = {
  fontSize: 15, fontWeight: 700, color: '#0D1B2A',
  margin: '0 0 18px', display: 'flex', alignItems: 'center', gap: 10,
};

const AdminSupport = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.subject || !formData.message) {
      toast.error('Please fill in all required fields.');
      return;
    }
    toast.success(`Your ticket has been submitted! We'll respond within 24 hours.`);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const inputStyle = {
    background: '#F8FAFC', border: '1px solid #E8EDF4', borderRadius: 10,
    padding: '11px 16px', color: '#0D1B2A', fontSize: 13, fontWeight: 500,
    outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box',
  };
  const labelStyle = { fontSize: 12, fontWeight: 700, color: '#6B7A8D', marginBottom: 6, display: 'block' };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingBottom: 48 }}>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: 24, fontWeight: 700, color: '#0D1B2A', margin: '0 0 4px' }}>
            Support <span style={{ color: '#173C63' }}>Center</span>
          </h1>
          <p style={{ fontSize: 13, color: '#6B7A8D', margin: 0, fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <button
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 22px', background: '#173C63', color: '#fff',
              border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(23,60,99,0.18)', transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(23,60,99,0.28)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(23,60,99,0.18)'; }}
          >
            <FaEnvelope size={12} /> Contact Support
          </button>
          <button style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', background: '#FFFFFF', color: '#173C63',
            border: '1px solid #E8EDF4', borderRadius: 50, fontSize: 13, fontWeight: 700,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.borderColor = '#173C63'}
            onMouseLeave={e => e.currentTarget.style.borderColor = '#E8EDF4'}
          >
            <FaBookOpen size={12} /> Documentation
          </button>
        </div>
      </div>

      {/* ── Hero Banner ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          background: 'linear-gradient(135deg, #0D1B2A 0%, #1a4a80 100%)',
          borderRadius: 16, padding: '36px 48px',
          marginBottom: 20, position: 'relative', overflow: 'hidden',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}
      >
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: -50, right: -50, width: 200, height: 200, background: 'rgba(255,255,255,0.03)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: -40, right: 120, width: 140, height: 140, background: 'rgba(74,144,226,0.08)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', top: 20, right: 220, width: 60, height: 60, background: 'rgba(39,174,96,0.1)', borderRadius: '50%' }} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            width: 64, height: 64, borderRadius: 18,
            background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#fff', flexShrink: 0,
          }}>
            <FaLifeRing size={28} />
          </div>
          <div>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: '#fff', margin: '0 0 8px' }}>
              How can we help you today?
            </h2>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', margin: 0, lineHeight: 1.7, fontWeight: 500, maxWidth: 520 }}>
              Welcome to the MediCare Admin support hub. Browse FAQs, submit a ticket, or reach out to our team directly for immediate assistance.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, flexShrink: 0 }}>
          {[
            { value: '< 2h', label: 'Avg Response' },
            { value: '98%', label: 'Satisfaction' },
            { value: '24/7', label: 'Support' },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: '#fff', fontFamily: "'Lora', serif" }}>{s.value}</div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, marginTop: 3 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Quick Contact Cards ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 20 }}
        className="support-quick-grid"
      >
        {[
          { icon: <FiHelpCircle size={22} />,    label: 'Help Center',    desc: 'Browse knowledge base',   color: '#4A90E2', bg: 'rgba(74,144,226,0.1)' },
          { icon: <FiMessageCircle size={22} />, label: 'Live Chat',      desc: 'Talk to support team',    color: '#27AE60', bg: 'rgba(39,174,96,0.1)' },
          { icon: <FiHeadphones size={22} />,    label: 'Phone Support',  desc: '+91 98765 00000',         color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)' },
          { icon: <FiBook size={22} />,          label: 'Documentation',  desc: 'Read detailed guides',    color: '#F59E0B', bg: 'rgba(245,158,11,0.1)' },
        ].map((c, i) => (
          <div key={i} style={{
            ...cardStyle, padding: '18px 20px',
            display: 'flex', alignItems: 'center', gap: 14,
            cursor: 'pointer', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = c.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#E8EDF4'; e.currentTarget.style.transform = 'none'; }}
          >
            <div style={{ width: 44, height: 44, borderRadius: 12, background: c.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: c.color, flexShrink: 0 }}>
              {c.icon}
            </div>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2A' }}>{c.label}</div>
              <div style={{ fontSize: 11, color: '#6B7A8D', marginTop: 2 }}>{c.desc}</div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* ── Main Grid: FAQs + Ticket Form ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}
        className="support-main-grid"
      >
        {/* FAQs Accordion */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(74,144,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90E2' }}>
              <FaQuestionCircle size={14} />
            </div>
            Frequently Asked Questions
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} style={{
                  background: '#F8FAFC',
                  border: `1px solid ${isOpen ? '#4A90E2' : '#E8EDF4'}`,
                  borderRadius: 12, overflow: 'hidden',
                  transition: 'border-color 0.2s',
                }}>
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    style={{
                      width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      padding: '13px 16px', background: 'transparent', border: 'none',
                      cursor: 'pointer', textAlign: 'left',
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 700, color: isOpen ? '#173C63' : '#0D1B2A', lineHeight: 1.4 }}>
                      {faq.q}
                    </span>
                    <span style={{ color: isOpen ? '#4A90E2' : '#9DAAB8', flexShrink: 0, marginLeft: 12 }}>
                      {isOpen ? <FaChevronUp size={11} /> : <FaChevronDown size={11} />}
                    </span>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{ padding: '0 16px 14px', fontSize: 12, color: '#6B7A8D', lineHeight: 1.7 }}>
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit a Ticket Form */}
        <div style={cardStyle}>
          <h2 style={sectionTitle}>
            <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
              <FaTicketAlt size={14} />
            </div>
            Submit a Support Ticket
          </h2>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input
                  type="text" placeholder="Admin Name" value={formData.name}
                  onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                  onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                />
              </div>
              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email" placeholder="admin@hospital.com" value={formData.email}
                  onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                  style={inputStyle}
                  onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                  onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Subject <span style={{ color: '#EB5757' }}>*</span></label>
              <input
                type="text" placeholder="Briefly describe your issue…" value={formData.subject}
                onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                onBlur={e => e.target.style.borderColor = '#E8EDF4'}
              />
            </div>

            <div>
              <label style={labelStyle}>Priority</label>
              <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                <option>Low — General question</option>
                <option>Medium — Feature not working</option>
                <option>High — Blocking workflow</option>
                <option>Critical — Data loss / security</option>
              </select>
            </div>

            <div>
              <label style={labelStyle}>Message <span style={{ color: '#EB5757' }}>*</span></label>
              <textarea
                rows={4} placeholder="Describe your issue in detail…" value={formData.message}
                onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                onBlur={e => e.target.style.borderColor = '#E8EDF4'}
              />
            </div>

            <button type="submit" style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              padding: '12px 24px', background: '#173C63', color: '#fff',
              border: 'none', borderRadius: 50, fontSize: 13, fontWeight: 700,
              cursor: 'pointer', boxShadow: '0 4px 14px rgba(23,60,99,0.18)',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(23,60,99,0.28)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(23,60,99,0.18)'; }}
            >
              <FiSend size={13} /> Submit Ticket
            </button>
          </form>
        </div>
      </motion.div>

      {/* ── Recent Tickets Table ── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.4 }}
        style={{
          background: '#FFFFFF', border: '1px solid #E8EDF4',
          borderRadius: 16, overflow: 'hidden',
          boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
        }}
      >
        {/* Header */}
        <div style={{
          padding: '20px 28px', borderBottom: '1px solid #E8EDF4',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0D1B2A', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
              <FiAlertCircle size={16} />
            </div>
            Recent Support Tickets
          </h3>
          <span style={{
            background: 'rgba(74,144,226,0.1)', color: '#4A90E2',
            border: '1px solid rgba(74,144,226,0.2)',
            padding: '4px 14px', borderRadius: 50,
            fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
          }}>
            {tickets.length} Tickets
          </span>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF4' }}>
                {['Ticket ID', 'Issue', 'Priority', 'Submitted', 'Status', 'Action'].map((h, i) => (
                  <th key={i} style={{
                    padding: '13px 20px', fontSize: 11, fontWeight: 700, color: '#6B7A8D',
                    textTransform: 'uppercase', letterSpacing: '0.12em',
                    textAlign: h === 'Action' ? 'right' : 'left',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tickets.map((t, idx) => (
                <tr key={idx}
                  style={{ borderBottom: '1px solid #E8EDF4', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F4F7FB'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: '#4A90E2', fontFamily: 'monospace' }}>{t.id}</span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: '#0D1B2A' }}>{t.title}</span>
                  </td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 50, fontSize: 10, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      ...(t.priority === 'High'   ? { background: 'rgba(235,87,87,0.1)',   color: '#EB5757' }
                        : t.priority === 'Medium' ? { background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }
                        :                           { background: 'rgba(39,174,96,0.1)',   color: '#27AE60' }),
                    }}>
                      {t.priority}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', fontSize: 12, color: '#9DAAB8' }}>{t.time}</td>
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      padding: '4px 12px', borderRadius: 50, fontSize: 10, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.05em',
                      background: t.bg, color: t.color,
                    }}>
                      {t.status}
                    </span>
                  </td>
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <button
                      onClick={() => toast.success(`Opening ticket ${t.id}`)}
                      style={{
                        padding: '6px 14px', borderRadius: 8, cursor: 'pointer',
                        background: '#F8FAFC', border: '1px solid #E8EDF4',
                        fontSize: 11, fontWeight: 700, color: '#6B7A8D',
                        transition: 'all 0.2s', display: 'inline-flex', alignItems: 'center', gap: 5,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#4A90E2'; e.currentTarget.style.borderColor = '#4A90E2'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#6B7A8D'; e.currentTarget.style.borderColor = '#E8EDF4'; }}
                    >
                      <FaCommentDots size={10} /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 1100px) {
          .support-quick-grid { grid-template-columns: repeat(2,1fr) !important; }
          .support-main-grid  { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 600px) {
          .support-quick-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminSupport;
