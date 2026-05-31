import { useState, useEffect } from 'react';
import { FaSearch, FaBell } from 'react-icons/fa';
import Adminimg from "../../assets/Images/Adminimg.jpg";
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ adminName, onAddDoctorClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue.trim()) console.log(`Search: ${searchValue}`);
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const notifications = [
    { id: 1, title: 'New Patient Registered', desc: 'A new patient account was created successfully.', dot: '#27AE60' },
    { id: 2, title: 'Appointment Booked', desc: 'Dr. Mitchell has a new appointment at 2:30 PM.', dot: '#4A90E2' },
    { id: 3, title: 'Lab Results Ready', desc: 'Patient John Doe – lab report is ready for review.', dot: '#F59E0B' },
  ];

  return (
    <header style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 24px',
      borderBottom: '1px solid #E8EDF4',
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(16px)',
      WebkitBackdropFilter: 'blur(16px)',
      position: 'relative',
      zIndex: 30,
    }}>
      {/* Left: Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <div>
          <h2 style={{
            fontFamily: "'Lora', serif",
            fontSize: 18, fontWeight: 700,
            color: '#0D1B2A',
            margin: 0, lineHeight: 1.2,
          }}>
            Hospital <span style={{ color: '#173C63' }}>Management</span>
          </h2>
          <p style={{ fontSize: 11, color: '#6B7A8D', margin: 0, fontWeight: 500 }}>
            Admin Dashboard
          </p>
        </div>
      </div>

      {/* Right: Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        {/* Add New Button */}
        <button
          onClick={onAddDoctorClick}
          style={{
            display: 'flex', alignItems: 'center', gap: 7,
            padding: '9px 20px',
            background: '#173C63',
            color: '#fff',
            border: 'none', borderRadius: 50,
            fontSize: 13, fontWeight: 700,
            cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(23,60,99,0.15)',
            transition: 'all 0.2s',
            userSelect: 'none',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-1px)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(23,60,99,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(23,60,99,0.15)'; }}
        >
          Quick Add <span style={{ fontSize: 16, lineHeight: 1 }}>+</span>
        </button>

        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="hidden-mobile">
          <FaSearch style={{
            position: 'absolute', left: 14,
            color: '#9DAAB8', fontSize: 12,
            pointerEvents: 'none',
          }} />
          <input
            type="text"
            value={searchValue}
            onChange={e => setSearchValue(e.target.value)}
            placeholder="Search records..."
            style={{
              paddingLeft: 38, paddingRight: 16,
              paddingTop: 9, paddingBottom: 9,
              width: 220,
              background: '#F8FAFC',
              border: '1px solid #E8EDF4',
              borderRadius: 10,
              color: '#0D1B2A',
              fontSize: 13, fontWeight: 500,
              outline: 'none',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.4)'}
            onBlur={e => e.target.style.borderColor = '#E8EDF4'}
          />
        </div>

        {/* Notifications */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            style={{
              width: 38, height: 38, borderRadius: 10,
              background: '#F8FAFC',
              border: '1px solid #E8EDF4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6B7A8D', cursor: 'pointer', position: 'relative',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#F1F5F9'; e.currentTarget.style.color = '#173C63'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.color = '#6B7A8D'; }}
          >
            <FaBell style={{ fontSize: 14 }} />
            <span style={{
              position: 'absolute', top: 8, right: 8,
              width: 7, height: 7, borderRadius: '50%',
              background: '#EB5757',
              border: '1.5px solid #FFFFFF',
            }} />
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                style={{
                  position: 'absolute', right: 0, top: '100%', marginTop: 10,
                  width: 300,
                  background: '#FFFFFF',
                  border: '1px solid #E8EDF4',
                  borderRadius: 16,
                  padding: 20,
                  boxShadow: '0 20px 60px rgba(23,60,99,0.08)',
                  zIndex: 100,
                }}
              >
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  paddingBottom: 12, marginBottom: 12,
                  borderBottom: '1px solid #E8EDF4',
                }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2A' }}>Notifications</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: '#4A90E2' }}>3 Unread</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {notifications.map(n => (
                    <div key={n.id} style={{
                      padding: '10px 12px', borderRadius: 10,
                      background: '#F8FAFC',
                      border: '1px solid #E8EDF4',
                      display: 'flex', gap: 10, alignItems: 'flex-start',
                      cursor: 'pointer',
                    }}>
                      <div style={{ width: 7, height: 7, borderRadius: '50%', background: n.dot, marginTop: 5, flexShrink: 0 }} />
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#0D1B2A', marginBottom: 2 }}>{n.title}</div>
                        <div style={{ fontSize: 11, color: '#6B7A8D', lineHeight: 1.5 }}>{n.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingLeft: 4, userSelect: 'none' }}>
          <img
            src={Adminimg}
            alt="Admin"
            style={{
              width: 36, height: 36, borderRadius: 10,
              objectFit: 'cover',
              border: '2px solid rgba(74,144,226,0.15)',
            }}
          />
          <div className="hidden-mobile">
            <p style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2A', margin: 0, lineHeight: 1.2 }}>
              {adminName || 'Admin'}
            </p>
            <p style={{ fontSize: 10, color: '#6B7A8D', margin: 0, fontWeight: 500 }}>Administrator</p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
      `}</style>
    </header>
  );
};

export default Header;
