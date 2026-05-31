import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import DoctorsTable from './DoctorsTable';
import { FaPlus, FaUserMd, FaStethoscope, FaHospital, FaStar } from 'react-icons/fa';
import { FiUserCheck, FiActivity } from 'react-icons/fi';
import { useEffect } from 'react';
import { fetchDoctors } from '../../redux/thunks/doctorThunks';
import { motion } from 'framer-motion';

const AdminDoctors = () => {
  const { doctors, status } = useSelector((state) => state.doctors);
  const { departments } = useSelector((state) => state.departments);
  const { setIsQuickActionOpen, handleEditDoctor } = useOutletContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const onAddDoctorClick = () => setIsQuickActionOpen(true);

  const totalDoctors = doctors?.length ?? 0;
  const uniqueDepts = new Set(doctors?.map(d => d.departmentId?._id).filter(Boolean)).size;
  const specializations = new Set(doctors?.map(d => d.specialization).filter(Boolean)).size;

  const statCards = [
    {
      label: 'Total Doctors',
      value: totalDoctors,
      icon: <FiUserCheck size={20} />,
      color: '#4A90E2',
      bg: 'rgba(74,144,226,0.1)',
      trend: '+3 this month',
    },
    {
      label: 'Departments Covered',
      value: uniqueDepts,
      icon: <FaHospital size={18} />,
      color: '#27AE60',
      bg: 'rgba(39,174,96,0.1)',
      trend: 'Active units',
    },
    {
      label: 'Specializations',
      value: specializations,
      icon: <FaStethoscope size={18} />,
      color: '#8B5CF6',
      bg: 'rgba(139,92,246,0.1)',
      trend: 'Unique fields',
    },
    {
      label: 'Available Today',
      value: totalDoctors,
      icon: <FiActivity size={20} />,
      color: '#F59E0B',
      bg: 'rgba(245,158,11,0.1)',
      trend: 'On-duty staff',
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
            Doctor <span style={{ color: '#173C63' }}>Management</span>
          </h1>
          <p style={{ fontSize: 13, color: '#6B7A8D', margin: 0, fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <button
          onClick={onAddDoctorClick}
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
          <FaPlus size={12} /> Add New Doctor
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

      {/* Doctors Table */}
      {status === 'loading' ? (
        <div style={{
          background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 16,
          padding: 48, textAlign: 'center',
          boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
        }}>
          <div style={{ fontSize: 14, color: '#4A90E2', fontWeight: 700 }}>Loading Doctors...</div>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
        >
          <DoctorsTable doctors={doctors} onEdit={handleEditDoctor} />
        </motion.div>
      )}

      <style>{`
        @media (max-width: 1100px) { .admin-stat-grid { grid-template-columns: repeat(2,1fr) !important; } }
        @media (max-width: 600px)  { .admin-stat-grid { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
};

export default AdminDoctors;
