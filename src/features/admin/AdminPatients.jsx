import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash, FaEdit, FaSearch, FaUserInjured } from 'react-icons/fa';
import { FiUsers, FiActivity, FiHeart, FiDroplet } from 'react-icons/fi';
import { fetchUsers, deleteUserAction } from '../../redux/thunks/userThunks';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminPatients = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await dispatch(deleteUserAction(id)).unwrap();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err || "Failed to delete user");
      }
    }
  };

  const handleEdit = (id) => {
    alert('Edit functionality opened in modal here');
  };

  const allPatients = users.filter(u => u.role === 'patient');

  const formattedPatients = allPatients
    .map(p => ({
      id: p._id,
      name: p.name || 'Unnamed User',
      email: p.email,
      age: p.age || 'N/A',
      phone: p.phone || 'N/A',
      bloodType: p.bloodGroup || 'N/A'
    }))
    .filter(p =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

  const statCards = [
    {
      label: 'Total Patients',
      value: allPatients.length,
      icon: <FiUsers size={20} />,
      color: '#4A90E2',
      bg: 'rgba(74,144,226,0.1)',
      trend: 'Registered users',
    },
    {
      label: 'Patients Today',
      value: 0,
      icon: <FiActivity size={20} />,
      color: '#27AE60',
      bg: 'rgba(39,174,96,0.1)',
      trend: '+12% vs yesterday',
    },
    {
      label: 'Critical Cases',
      value: 0,
      icon: <FiHeart size={20} />,
      color: '#EB5757',
      bg: 'rgba(235,87,87,0.1)',
      trend: 'Needs attention',
    },
    {
      label: 'Blood Types',
      value: new Set(allPatients.map(p => p.bloodGroup).filter(Boolean)).size || '—',
      icon: <FiDroplet size={20} />,
      color: '#8B5CF6',
      bg: 'rgba(139,92,246,0.1)',
      trend: 'Unique groups',
    },
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
            Patient <span style={{ color: '#173C63' }}>Management</span>
          </h1>
          <p style={{ fontSize: 13, color: '#6B7A8D', margin: 0, fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        {/* Search Bar */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          <FaSearch style={{ position: 'absolute', left: 14, color: '#9DAAB8', fontSize: 12, pointerEvents: 'none' }} />
          <input
            type="text"
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              paddingLeft: 38, paddingRight: 16, paddingTop: 10, paddingBottom: 10,
              width: 240,
              background: '#FFFFFF',
              border: '1px solid #E8EDF4',
              borderRadius: 50,
              color: '#0D1B2A',
              fontSize: 13, fontWeight: 500,
              outline: 'none',
              boxShadow: '0 4px 14px rgba(23,60,99,0.06)',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => e.target.style.borderColor = 'rgba(74,144,226,0.5)'}
            onBlur={e => e.target.style.borderColor = '#E8EDF4'}
          />
        </div>
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
                fontSize: 10, fontWeight: 700,
                color: card.color,
                background: card.bg,
                padding: '3px 8px', borderRadius: 50,
                letterSpacing: '0.04em',
              }}>
                ↑ Live
              </span>
            </div>
            <div>
              <div style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 700, color: '#0D1B2A', lineHeight: 1, marginBottom: 4 }}>
                {card.value}
              </div>
              <div style={{ fontSize: 12, fontWeight: 600, color: '#3D4D5C', marginBottom: 2 }}>{card.label}</div>
              <div style={{ fontSize: 11, color: '#6B7A8D' }}>{card.trend}</div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Patients Table */}
      {status === 'loading' ? (
        <div style={{
          background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 16,
          padding: 48, textAlign: 'center',
          boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
        }}>
          <div style={{ fontSize: 14, color: '#4A90E2', fontWeight: 700 }}>Loading Patients...</div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          style={{
            background: '#FFFFFF',
            border: '1px solid #E8EDF4',
            borderRadius: 16,
            overflow: 'hidden',
            boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
          }}
        >
          {/* Table Header Bar */}
          <div style={{
            padding: '20px 28px',
            borderBottom: '1px solid #E8EDF4',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0D1B2A', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(74,144,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90E2' }}>
                <FaUserInjured size={14} />
              </div>
              Patient Records
            </h3>
            <span style={{
              background: 'rgba(74,144,226,0.1)', color: '#4A90E2',
              border: '1px solid rgba(74,144,226,0.2)',
              padding: '4px 14px', borderRadius: 50,
              fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
            }}>
              {formattedPatients.length} Shown
            </span>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF4' }}>
                  {['Name', 'Email', 'Age', 'Phone', 'Blood Type', 'Actions'].map((h, i) => (
                    <th key={i} style={{
                      padding: '14px 20px',
                      fontSize: 11, fontWeight: 700, color: '#6B7A8D',
                      textTransform: 'uppercase', letterSpacing: '0.12em',
                      textAlign: h === 'Actions' ? 'right' : 'left',
                    }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {formattedPatients.map((patient, idx) => (
                  <tr key={patient.id} style={{
                    borderBottom: '1px solid #E8EDF4',
                    transition: 'background 0.15s',
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F4F7FB'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    className="patient-row"
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: 10,
                          background: `hsl(${(idx * 47) % 360}, 60%, 92%)`,
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 13, fontWeight: 700,
                          color: `hsl(${(idx * 47) % 360}, 50%, 40%)`,
                          flexShrink: 0,
                        }}>
                          {patient.name.charAt(0).toUpperCase()}
                        </div>
                        <span style={{ fontWeight: 700, color: '#0D1B2A', fontSize: 13 }}>{patient.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', color: '#6B7A8D', fontSize: 13 }}>{patient.email}</td>
                    <td style={{ padding: '14px 20px', color: '#6B7A8D', fontWeight: 600, fontSize: 13 }}>{patient.age}</td>
                    <td style={{ padding: '14px 20px', color: '#6B7A8D', fontSize: 13 }}>{patient.phone}</td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        background: 'rgba(74,144,226,0.1)',
                        color: '#4A90E2',
                        border: '1px solid rgba(74,144,226,0.2)',
                        padding: '3px 10px', borderRadius: 50,
                        fontSize: 11, fontWeight: 700,
                      }}>
                        {patient.bloodType}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                        <button
                          onClick={() => handleEdit(patient.id)}
                          style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: '#F8FAFC', border: '1px solid #E8EDF4',
                            color: '#6B7A8D', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.color = '#4A90E2'; e.currentTarget.style.borderColor = '#4A90E2'; }}
                          onMouseLeave={e => { e.currentTarget.style.color = '#6B7A8D'; e.currentTarget.style.borderColor = '#E8EDF4'; }}
                          title="Edit"
                        >
                          <FaEdit size={12} />
                        </button>
                        <button
                          onClick={() => handleDelete(patient.id)}
                          style={{
                            width: 32, height: 32, borderRadius: 8,
                            background: 'rgba(235,87,87,0.1)', border: '1px solid rgba(235,87,87,0.15)',
                            color: '#EB5757', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#EB5757'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'rgba(235,87,87,0.1)'; e.currentTarget.style.color = '#EB5757'; }}
                          title="Delete"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {formattedPatients.length === 0 && (
                  <tr>
                    <td colSpan="6" style={{ padding: '48px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: '#9DAAB8' }}>
                        <FaUserInjured size={36} style={{ opacity: 0.2 }} />
                        <p style={{ fontWeight: 700, margin: 0 }}>No patients found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      )}

      <style>{`
        @media (max-width: 1100px) { .admin-stat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .admin-stat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default AdminPatients;
