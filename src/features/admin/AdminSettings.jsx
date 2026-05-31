import { useState } from 'react';
import {
  FaSave, FaBell, FaShieldAlt, FaUserCog, FaPalette,
  FaHospital, FaEnvelope, FaPhone, FaGlobe, FaCamera,
  FaKey, FaToggleOn, FaToggleOff, FaCheck,
} from 'react-icons/fa';
import { FiSettings, FiShield, FiBell, FiMonitor, FiUser } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../../assets/MediCare_logo.png';

const navItems = [
  { id: 'general',       icon: <FaUserCog size={14} />,    label: 'General',       desc: 'Hospital profile & info' },
  { id: 'security',      icon: <FaShieldAlt size={14} />,  label: 'Security',      desc: 'Password & access control' },
  { id: 'notifications', icon: <FaBell size={14} />,       label: 'Notifications', desc: 'Alerts & email settings' },
  { id: 'appearance',    icon: <FaPalette size={14} />,    label: 'Appearance',    desc: 'Theme & display options' },
];

const inputStyle = {
  background: '#F8FAFC', border: '1px solid #E8EDF4', borderRadius: 10,
  padding: '11px 16px', color: '#0D1B2A', fontSize: 13, fontWeight: 500,
  outline: 'none', transition: 'border-color 0.2s', width: '100%', boxSizing: 'border-box',
};
const labelStyle = { fontSize: 12, fontWeight: 700, color: '#6B7A8D', marginBottom: 6, display: 'block' };
const cardStyle = {
  background: '#FFFFFF', border: '1px solid #E8EDF4',
  borderRadius: 16, padding: 28,
  boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
};
const sectionTitle = {
  fontFamily: "'Lora', serif", fontSize: 16, fontWeight: 700,
  color: '#0D1B2A', margin: '0 0 20px',
  paddingBottom: 14, borderBottom: '1px solid #E8EDF4',
  display: 'flex', alignItems: 'center', gap: 10,
};

const AdminSettings = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [toggles, setToggles] = useState({
    emailNotif: true, smsAlerts: false,
    apptReminders: true, systemAlerts: true,
    twoFactor: false, sessionLog: true,
  });

  const handleSave = () => toast.success('Settings saved successfully!');
  const flip = (key) => setToggles(prev => ({ ...prev, [key]: !prev[key] }));

  const Toggle = ({ k, label, desc }) => (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 18px', background: '#F8FAFC',
      border: '1px solid #E8EDF4', borderRadius: 12,
    }}>
      <div>
        <div style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2A' }}>{label}</div>
        <div style={{ fontSize: 11, color: '#6B7A8D', marginTop: 3 }}>{desc}</div>
      </div>
      <div
        onClick={() => flip(k)}
        style={{
          width: 44, height: 24, borderRadius: 50,
          background: toggles[k] ? '#27AE60' : '#CBD5E1',
          position: 'relative', cursor: 'pointer',
          transition: 'background 0.25s', flexShrink: 0,
        }}
      >
        <div style={{
          width: 18, height: 18, background: '#fff', borderRadius: '50%',
          position: 'absolute', top: 3,
          left: toggles[k] ? 23 : 3,
          transition: 'left 0.25s',
          boxShadow: '0 1px 4px rgba(0,0,0,0.15)',
        }} />
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0, paddingBottom: 48 }}>

      {/* ── Page Header ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "'Lora', serif", fontSize: 24, fontWeight: 700, color: '#0D1B2A', margin: '0 0 4px' }}>
            System <span style={{ color: '#173C63' }}>Settings</span>
          </h1>
          <p style={{ fontSize: 13, color: '#6B7A8D', margin: 0, fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={handleSave}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '11px 22px', background: '#173C63',
            color: '#fff', border: 'none', borderRadius: 50,
            fontSize: 13, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 14px rgba(23,60,99,0.18)', transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(23,60,99,0.28)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = '0 4px 14px rgba(23,60,99,0.18)'; }}
        >
          <FaSave size={12} /> Save Changes
        </button>
      </div>

      {/* ── Layout: Sidebar + Content ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 20, alignItems: 'start' }}
        className="settings-layout">

        {/* ── Left Sidebar Nav ── */}
        <motion.div
          initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          style={{ ...cardStyle, padding: 16 }}
        >
          <p style={{ fontSize: 10, fontWeight: 700, color: '#9DAAB8', textTransform: 'uppercase', letterSpacing: '0.14em', margin: '0 0 10px 6px' }}>
            Preferences
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {navItems.map(item => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '11px 13px', borderRadius: 11, width: '100%', textAlign: 'left',
                    border: active ? '1px solid rgba(74,144,226,0.22)' : '1px solid transparent',
                    background: active ? 'rgba(74,144,226,0.08)' : 'transparent',
                    color: active ? '#4A90E2' : '#6B7A8D',
                    fontSize: 13, fontWeight: 700, cursor: 'pointer',
                    transition: 'all 0.18s',
                  }}
                  onMouseEnter={e => { if (!active) e.currentTarget.style.background = '#F8FAFC'; }}
                  onMouseLeave={e => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <div style={{
                    width: 32, height: 32, borderRadius: 9, flexShrink: 0,
                    background: active ? 'rgba(74,144,226,0.15)' : '#F4F7FB',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: active ? '#4A90E2' : '#9DAAB8',
                    transition: 'all 0.18s',
                  }}>
                    {item.icon}
                  </div>
                  <div>
                    <div style={{ lineHeight: 1.2 }}>{item.label}</div>
                    <div style={{ fontSize: 10, fontWeight: 500, color: '#9DAAB8', marginTop: 1 }}>{item.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* ── Right Content Panel ── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <AnimatePresence mode="wait">

            {/* ─ General Tab ─ */}
            {activeTab === 'general' && (
              <motion.div key="general"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                {/* Hospital Profile */}
                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(74,144,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90E2' }}>
                      <FaHospital size={14} />
                    </div>
                    Hospital Profile
                  </h2>

                  {/* Avatar Row */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24, padding: '16px 20px', background: '#F8FAFC', borderRadius: 12, border: '1px solid #E8EDF4' }}>
                    <div style={{ position: 'relative', flexShrink: 0 }}>
                      <img src={logo} alt="Hospital Logo" style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 16, border: '3px solid #fff', boxShadow: '0 4px 14px rgba(23,60,99,0.15)' }} />
                      <div style={{
                        position: 'absolute', bottom: -4, right: -4,
                        width: 22, height: 22, borderRadius: '50%',
                        background: '#173C63', border: '2px solid #fff',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: '#fff', cursor: 'pointer',
                      }}>
                        <FaCamera size={9} />
                      </div>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#0D1B2A' }}>Hospital Logo</div>
                      <div style={{ fontSize: 12, color: '#6B7A8D', marginTop: 3 }}>PNG, JPG up to 2MB recommended</div>
                      <button style={{
                        marginTop: 8, padding: '5px 14px', borderRadius: 50,
                        background: 'transparent', border: '1px solid #E8EDF4',
                        fontSize: 11, fontWeight: 700, color: '#6B7A8D', cursor: 'pointer',
                      }}>Upload Image</button>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                    {[
                      { label: 'Hospital Name', icon: <FaHospital size={12} />, type: 'text', value: 'MediCare Health System' },
                      { label: 'Support Email', icon: <FaEnvelope size={12} />, type: 'email', value: 'support@medicare.com' },
                      { label: 'Contact Phone', icon: <FaPhone size={12} />, type: 'text', value: '+91 98765 43210' },
                      { label: 'Website', icon: <FaGlobe size={12} />, type: 'text', value: 'www.medicare.health' },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={labelStyle}>{f.label}</label>
                        <div style={{ position: 'relative' }}>
                          <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#9DAAB8' }}>{f.icon}</span>
                          <input type={f.type} defaultValue={f.value}
                            style={{ ...inputStyle, paddingLeft: 32 }}
                            onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                            onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                          />
                        </div>
                      </div>
                    ))}

                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Address</label>
                      <textarea
                        defaultValue="123 Medical Plaza, Healthcare District, Mumbai — 400001"
                        rows={2}
                        style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                        onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                        onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Timezone</label>
                      <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        <option>IST (GMT+5:30)</option>
                        <option>UTC (GMT+0)</option>
                        <option>EST (GMT-5)</option>
                        <option>PST (GMT-8)</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Language</label>
                      <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        <option>English (US)</option>
                        <option>Hindi</option>
                        <option>Tamil</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Working Hours */}
                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(39,174,96,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#27AE60' }}>
                      <FiSettings size={14} />
                    </div>
                    Working Hours
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
                    {['Monday–Friday', 'Saturday', 'Sunday'].map((day, i) => (
                      <div key={i} style={{ background: '#F8FAFC', border: '1px solid #E8EDF4', borderRadius: 12, padding: '14px 16px' }}>
                        <div style={{ fontSize: 11, fontWeight: 700, color: '#6B7A8D', marginBottom: 10, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{day}</div>
                        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                          <input type="time" defaultValue={i === 2 ? '' : '08:00'}
                            style={{ ...inputStyle, padding: '7px 10px', fontSize: 12, flex: 1 }}
                            onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                            onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                          />
                          <span style={{ color: '#9DAAB8', fontSize: 11 }}>–</span>
                          <input type="time" defaultValue={i === 2 ? '' : '20:00'}
                            style={{ ...inputStyle, padding: '7px 10px', fontSize: 12, flex: 1 }}
                            onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                            onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                          />
                        </div>
                        {i === 2 && (
                          <div style={{ marginTop: 8, fontSize: 11, color: '#EB5757', fontWeight: 700 }}>Closed</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─ Security Tab ─ */}
            {activeTab === 'security' && (
              <motion.div key="security"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(235,87,87,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#EB5757' }}>
                      <FaKey size={14} />
                    </div>
                    Change Password
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
                    {['Current Password', 'New Password', 'Confirm New Password'].map((l, i) => (
                      <div key={i}>
                        <label style={labelStyle}>{l}</label>
                        <input type="password" placeholder="••••••••"
                          style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                          onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                        />
                      </div>
                    ))}
                    <button onClick={() => toast.success('Password updated!')} style={{
                      alignSelf: 'flex-start', padding: '10px 22px', borderRadius: 50,
                      background: '#173C63', color: '#fff', border: 'none',
                      fontSize: 13, fontWeight: 700, cursor: 'pointer',
                      boxShadow: '0 4px 14px rgba(23,60,99,0.15)',
                    }}>
                      Update Password
                    </button>
                  </div>
                </div>

                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(74,144,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90E2' }}>
                      <FaShieldAlt size={14} />
                    </div>
                    Security Controls
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Toggle k="twoFactor" label="Two-Factor Authentication" desc="Require OTP on every admin login" />
                    <Toggle k="sessionLog" label="Session Activity Log" desc="Track all login sessions and IP addresses" />
                  </div>
                </div>

                {/* Active Sessions */}
                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                      <FiMonitor size={14} />
                    </div>
                    Active Sessions
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      { device: 'Chrome on Windows', ip: '103.55.12.4', time: 'Now (Current)', active: true },
                      { device: 'Firefox on Android', ip: '192.168.1.5', time: '2 hours ago', active: false },
                    ].map((s, i) => (
                      <div key={i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '14px 18px', background: '#F8FAFC', border: '1px solid #E8EDF4', borderRadius: 12,
                      }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 9, background: s.active ? 'rgba(39,174,96,0.1)' : 'rgba(107,122,141,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.active ? '#27AE60' : '#6B7A8D' }}>
                            <FiMonitor size={15} />
                          </div>
                          <div>
                            <div style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2A' }}>{s.device}</div>
                            <div style={{ fontSize: 11, color: '#9DAAB8', marginTop: 2 }}>IP {s.ip} · {s.time}</div>
                          </div>
                        </div>
                        {s.active
                          ? <span style={{ fontSize: 10, fontWeight: 700, color: '#27AE60', background: 'rgba(39,174,96,0.1)', padding: '3px 10px', borderRadius: 50 }}>Active</span>
                          : <button onClick={() => toast.success('Session revoked')} style={{ fontSize: 11, fontWeight: 700, color: '#EB5757', background: 'rgba(235,87,87,0.08)', border: '1px solid rgba(235,87,87,0.15)', padding: '4px 12px', borderRadius: 50, cursor: 'pointer' }}>Revoke</button>
                        }
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─ Notifications Tab ─ */}
            {activeTab === 'notifications' && (
              <motion.div key="notifications"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                      <FaBell size={14} />
                    </div>
                    Notification Preferences
                  </h2>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <Toggle k="emailNotif"    label="Email Notifications"  desc="Send appointment confirmations & updates via email" />
                    <Toggle k="smsAlerts"     label="SMS Alerts"           desc="Send SMS reminders to patients and doctors" />
                    <Toggle k="apptReminders" label="Appointment Reminders" desc="24-hour reminder before every scheduled appointment" />
                    <Toggle k="systemAlerts"  label="System Alerts"        desc="Critical system errors and server health notifications" />
                  </div>
                </div>

                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(74,144,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90E2' }}>
                      <FaEnvelope size={14} />
                    </div>
                    Email Configuration
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                    {[
                      { label: 'Sender Name', value: 'MediCare Admin' },
                      { label: 'Reply-To Email', value: 'noreply@medicare.com' },
                    ].map((f, i) => (
                      <div key={i}>
                        <label style={labelStyle}>{f.label}</label>
                        <input type="text" defaultValue={f.value} style={inputStyle}
                          onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                          onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                        />
                      </div>
                    ))}
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label style={labelStyle}>Default Email Signature</label>
                      <textarea rows={3} defaultValue="— MediCare Health System | Compassionate Care, Every Step"
                        style={{ ...inputStyle, resize: 'none', lineHeight: 1.6 }}
                        onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
                        onBlur={e => e.target.style.borderColor = '#E8EDF4'}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ─ Appearance Tab ─ */}
            {activeTab === 'appearance' && (
              <motion.div key="appearance"
                initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
              >
                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(139,92,246,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#8B5CF6' }}>
                      <FaPalette size={14} />
                    </div>
                    Theme Selection
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}>
                    {[
                      { name: 'Light', bg: '#F4F7FB', accent: '#173C63', active: true },
                      { name: 'Dark', bg: '#0D1B2A', accent: '#4A90E2', active: false },
                      { name: 'Ocean Blue', bg: '#EBF4FF', accent: '#1D6FA4', active: false },
                    ].map((theme, i) => (
                      <div key={i} style={{
                        border: theme.active ? '2px solid #4A90E2' : '2px solid #E8EDF4',
                        borderRadius: 14, overflow: 'hidden', cursor: 'pointer',
                        transition: 'border-color 0.2s', position: 'relative',
                      }}
                        onMouseEnter={e => { if (!theme.active) e.currentTarget.style.borderColor = '#CBD5E1'; }}
                        onMouseLeave={e => { if (!theme.active) e.currentTarget.style.borderColor = '#E8EDF4'; }}
                      >
                        <div style={{ height: 64, background: theme.bg, display: 'flex', alignItems: 'flex-end', padding: 10 }}>
                          <div style={{ width: 32, height: 6, borderRadius: 3, background: theme.accent, opacity: 0.6 }} />
                        </div>
                        <div style={{ padding: '10px 12px', background: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: '#0D1B2A' }}>{theme.name}</span>
                          {theme.active && (
                            <div style={{ width: 18, height: 18, borderRadius: '50%', background: '#4A90E2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                              <FaCheck size={9} />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div style={cardStyle}>
                  <h2 style={sectionTitle}>
                    <div style={{ width: 34, height: 34, borderRadius: 9, background: 'rgba(245,158,11,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#F59E0B' }}>
                      <FiMonitor size={14} />
                    </div>
                    Display Options
                  </h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                    <div>
                      <label style={labelStyle}>Sidebar Position</label>
                      <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        <option>Left (Default)</option>
                        <option>Right</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Items Per Page (Tables)</label>
                      <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        <option>10</option>
                        <option>25</option>
                        <option>50</option>
                        <option>100</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Date Format</label>
                      <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        <option>DD/MM/YYYY</option>
                        <option>MM/DD/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>
                    <div>
                      <label style={labelStyle}>Font Size</label>
                      <select style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}>
                        <option>Small (13px)</option>
                        <option>Medium (14px)</option>
                        <option>Large (15px)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) { .settings-layout { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default AdminSettings;
