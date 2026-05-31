import { FaCreditCard, FaMoneyBillWave, FaReceipt } from 'react-icons/fa';
import { FiDollarSign, FiTrendingUp, FiCreditCard, FiCheckCircle } from 'react-icons/fi';
import { motion } from 'framer-motion';

const AdminPayment = () => {
  const statCards = [
    { label: 'Total Revenue', value: '₹0', icon: <FiDollarSign size={20} />, color: '#27AE60', bg: 'rgba(39,174,96,0.1)', trend: 'All time earnings' },
    { label: 'This Month', value: '₹0', icon: <FiTrendingUp size={20} />, color: '#4A90E2', bg: 'rgba(74,144,226,0.1)', trend: 'Monthly earnings' },
    { label: 'Transactions', value: 0, icon: <FiCreditCard size={20} />, color: '#8B5CF6', bg: 'rgba(139,92,246,0.1)', trend: 'Total processed' },
    { label: 'Settled', value: 0, icon: <FiCheckCircle size={20} />, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', trend: 'Completed payments' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{
            fontFamily: "'Lora', serif",
            fontSize: 24, fontWeight: 700,
            color: '#0D1B2A', margin: '0 0 4px',
          }}>
            Payment <span style={{ color: '#173C63' }}>Control</span>
          </h1>
          <p style={{ fontSize: 13, color: '#6B7A8D', margin: 0, fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '10px 20px',
            background: '#173C63',
            color: '#fff', border: 'none', borderRadius: 50,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(23,60,99,0.15)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(23,60,99,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(23,60,99,0.15)'; }}
        >
          <FaReceipt size={12} /> Export Report
        </button>
      </div>

      {/* Stat Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 24 }}
        className="admin-stat-grid">
        {statCards.map((card, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            style={{
              background: '#FFFFFF',
              border: '1px solid #E8EDF4',
              borderRadius: 16,
              padding: '20px',
              boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
              display: 'flex', flexDirection: 'column', gap: 12,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: card.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: card.color,
              }}>
                {card.icon}
              </div>
              <span style={{
                fontSize: 10, fontWeight: 700, color: card.color,
                background: card.bg, padding: '3px 8px', borderRadius: 50, letterSpacing: '0.04em',
              }}>↑ Live</span>
            </div>
            <div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 700, color: '#0D1B2A', lineHeight: 1, marginBottom: 4 }}>{card.value}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3D4D5C', marginBottom: 2 }}>{card.label}</div>
              <div style={{ fontSize: 11, color: '#6B7A8D' }}>{card.trend}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Coming Soon Card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.4 }}
        style={{
          background: '#FFFFFF',
          border: '1px solid #E8EDF4',
          borderRadius: 16,
          padding: '80px 48px',
          boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
          textAlign: 'center',
          position: 'relative', overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', top: -60, right: -60, width: 200, height: 200, background: '#27AE60', borderRadius: '50%', opacity: 0.04 }} />
        <div style={{ position: 'absolute', bottom: -60, left: -60, width: 200, height: 200, background: '#4A90E2', borderRadius: '50%', opacity: 0.04 }} />
        <div style={{
          width: 64, height: 64, borderRadius: 18, background: 'rgba(39,174,96,0.1)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px', color: '#27AE60',
        }}>
          <FaCreditCard size={26} />
        </div>
        <h2 style={{ fontFamily: "'Lora', serif", fontSize: 22, fontWeight: 700, color: '#0D1B2A', margin: '0 0 12px' }}>
          Payment Gateway
        </h2>
        <p style={{ fontSize: 14, color: '#6B7A8D', maxWidth: 480, margin: '0 auto', lineHeight: 1.7, fontWeight: 500 }}>
          Integrate Stripe, PayPal or Razorpay billing transactions within this layout to manage hospital revenue, invoices, and patient payments.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 28 }}>
          <button style={{
            background: '#173C63', color: '#fff', border: 'none',
            padding: '10px 24px', borderRadius: 50,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(23,60,99,0.15)',
          }}>
            Connect Stripe
          </button>
          <button style={{
            background: '#F8FAFC', color: '#173C63', border: '1px solid #E8EDF4',
            padding: '10px 24px', borderRadius: 50,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
          }}>
            View Docs
          </button>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 1100px) { .admin-stat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .admin-stat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default AdminPayment;
