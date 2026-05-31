import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash, FaCheck, FaTimes, FaCalendarAlt, FaClock, FaUser } from 'react-icons/fa';
import { FiCalendar, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';
import { fetchAllAppointments, updateAppointmentStatus, deleteAppointment } from '../../redux/thunks/appointmentThunks';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const AdminAppointments = () => {
  const dispatch = useDispatch();
  const { appointments, status } = useSelector((state) => state.appointments);
  
  useEffect(() => {
    dispatch(fetchAllAppointments());
  }, [dispatch]);

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await dispatch(updateAppointmentStatus({ id, status: newStatus })).unwrap();
      toast.success(`Appointment ${newStatus}`);
    } catch (err) {
      toast.error(err || 'Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this appointment permanently?')) {
      try {
        await dispatch(deleteAppointment(id)).unwrap();
        toast.success('Appointment removed');
      } catch (err) {
        toast.error(err || 'Failed to delete');
      }
    }
  };

  const total = appointments?.length ?? 0;
  const confirmed = appointments?.filter(a => a.status === 'confirmed').length ?? 0;
  const pending = appointments?.filter(a => a.status === 'pending').length ?? 0;
  const cancelled = appointments?.filter(a => a.status === 'cancelled').length ?? 0;

  const statCards = [
    { label: 'Total Appointments', value: total, icon: <FiCalendar size={20} />, color: '#4A90E2', bg: 'rgba(74,144,226,0.1)', trend: 'Total booked' },
    { label: 'Confirmed', value: confirmed, icon: <FiCheckCircle size={20} />, color: '#27AE60', bg: 'rgba(39,174,96,0.1)', trend: 'Approved sessions' },
    { label: 'Pending Review', value: pending, icon: <FiClock size={20} />, color: '#F59E0B', bg: 'rgba(245,158,11,0.1)', trend: 'Awaiting decision' },
    { label: 'Cancelled', value: cancelled, icon: <FiXCircle size={20} />, color: '#EB5757', bg: 'rgba(235,87,87,0.1)', trend: 'Not fulfilled' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }} className="select-none">

      {/* Page Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <h1 style={{
            fontFamily: "'Lora', serif",
            fontSize: 24, fontWeight: 700,
            color: '#0D1B2A', margin: '0 0 4px',
          }}>
            Appointment <span style={{ color: '#173C63' }}>Management</span>
          </h1>
          <p style={{ fontSize: 13, color: '#6B7A8D', margin: 0, fontWeight: 500 }}>
            {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
        <span style={{
          background: '#173C63', color: '#fff',
          padding: '8px 20px', borderRadius: 50,
          fontSize: 12, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
          boxShadow: '0 4px 14px rgba(23,60,99,0.15)',
        }}>
          {total} Total
        </span>
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

      {/* Appointments Table */}
      {status === 'loading' ? (
        <div style={{
          background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 16,
          padding: 48, textAlign: 'center',
          boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
        }}>
          <div style={{ fontSize: 14, color: '#4A90E2', fontWeight: 700 }}>Loading Appointments...</div>
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
          {/* Table Header */}
          <div style={{
            padding: '20px 28px',
            borderBottom: '1px solid #E8EDF4',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          }}>
            <h3 style={{ fontSize: 15, fontWeight: 700, color: '#0D1B2A', margin: 0, display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(74,144,226,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4A90E2' }}>
                <FaCalendarAlt size={14} />
              </div>
              Appointments List
            </h3>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF4' }}>
                  {['Patient', 'Doctor', 'Date & Time', 'Status', 'Actions'].map((h, i) => (
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
                {appointments?.map((appt) => (
                  <tr key={appt._id}
                    style={{ borderBottom: '1px solid #E8EDF4', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                    className="appt-row"
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                        <div style={{
                          width: 34, height: 34, borderRadius: 10,
                          background: 'rgba(74,144,226,0.1)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          color: '#4A90E2', flexShrink: 0,
                        }}>
                          <FaUser size={12} />
                        </div>
                        <div>
                          <p style={{ margin: 0, fontWeight: 700, color: '#0D1B2A', fontSize: 13 }}>
                            {appt.patientName || appt.patientId?.name || 'Unknown'}
                          </p>
                          <p style={{ margin: 0, fontSize: 11, color: '#9DAAB8' }}>
                            {appt.patientAge ? `${appt.patientAge} years` : ''}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <p style={{ margin: 0, fontWeight: 700, color: '#0D1B2A', fontSize: 13 }}>
                        Dr. {appt.doctorId?.userId?.name || 'Doctor'}
                      </p>
                      <p style={{ margin: 0, fontSize: 11, color: '#6B7A8D' }}>
                        {appt.doctorId?.specialization || appt.specialization}
                      </p>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#344D66', fontSize: 12, fontWeight: 600 }}>
                          <FaCalendarAlt style={{ color: '#4A90E2', fontSize: 10 }} />
                          {new Date(appt.date).toLocaleDateString()}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#9DAAB8', fontSize: 11 }}>
                          <FaClock style={{ fontSize: 10 }} />
                          {appt.time}
                        </div>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        padding: '4px 10px', borderRadius: 50,
                        fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em',
                        ...(appt.status === 'confirmed'
                          ? { background: 'rgba(39,174,96,0.1)', color: '#27AE60', border: '1px solid rgba(39,174,96,0.2)' }
                          : appt.status === 'cancelled'
                          ? { background: 'rgba(235,87,87,0.1)', color: '#EB5757', border: '1px solid rgba(235,87,87,0.2)' }
                          : appt.status === 'completed'
                          ? { background: 'rgba(74,144,226,0.1)', color: '#4A90E2', border: '1px solid rgba(74,144,226,0.2)' }
                          : { background: 'rgba(245,158,11,0.1)', color: '#F59E0B', border: '1px solid rgba(245,158,11,0.2)' }
                        ),
                      }}>
                        {appt.status}
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: 6, justifyContent: 'flex-end' }}>
                        {appt.status === 'pending' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(appt._id, 'confirmed')}
                              style={{
                                width: 30, height: 30, borderRadius: 8,
                                background: 'rgba(39,174,96,0.1)', border: '1px solid rgba(39,174,96,0.15)',
                                color: '#27AE60', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = '#27AE60'; e.currentTarget.style.color = '#fff'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(39,174,96,0.1)'; e.currentTarget.style.color = '#27AE60'; }}
                              title="Confirm"
                            >
                              <FaCheck size={10} />
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appt._id, 'cancelled')}
                              style={{
                                width: 30, height: 30, borderRadius: 8,
                                background: 'rgba(235,87,87,0.1)', border: '1px solid rgba(235,87,87,0.15)',
                                color: '#EB5757', cursor: 'pointer',
                                display: 'flex', alignItems: 'center', justifyContent: 'center',
                                transition: 'all 0.2s',
                              }}
                              onMouseEnter={e => { e.currentTarget.style.background = '#EB5757'; e.currentTarget.style.color = '#fff'; }}
                              onMouseLeave={e => { e.currentTarget.style.background = 'rgba(235,87,87,0.1)'; e.currentTarget.style.color = '#EB5757'; }}
                              title="Cancel"
                            >
                              <FaTimes size={10} />
                            </button>
                          </>
                        )}
                        {appt.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusUpdate(appt._id, 'completed')}
                            style={{
                              width: 30, height: 30, borderRadius: 8,
                              background: 'rgba(74,144,226,0.1)', border: '1px solid rgba(74,144,226,0.15)',
                              color: '#4A90E2', cursor: 'pointer',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                              transition: 'all 0.2s',
                            }}
                            onMouseEnter={e => { e.currentTarget.style.background = '#4A90E2'; e.currentTarget.style.color = '#fff'; }}
                            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(74,144,226,0.1)'; e.currentTarget.style.color = '#4A90E2'; }}
                            title="Mark Completed"
                          >
                            <FaCheck size={10} />
                          </button>
                        )}
                        <button
                          onClick={() => handleDelete(appt._id)}
                          style={{
                            width: 30, height: 30, borderRadius: 8,
                            background: '#F8FAFC', border: '1px solid #E8EDF4',
                            color: '#6B7A8D', cursor: 'pointer',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            transition: 'all 0.2s',
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = '#EB5757'; e.currentTarget.style.borderColor = '#EB5757'; e.currentTarget.style.color = '#fff'; }}
                          onMouseLeave={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = '#E8EDF4'; e.currentTarget.style.color = '#6B7A8D'; }}
                          title="Delete"
                        >
                          <FaTrash size={10} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {(!appointments || appointments.length === 0) && (
                  <tr>
                    <td colSpan="5" style={{ padding: '48px 20px', textAlign: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: '#9DAAB8' }}>
                        <FaCalendarAlt size={36} style={{ opacity: 0.2 }} />
                        <p style={{ fontWeight: 700, margin: 0 }}>No appointments found.</p>
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

export default AdminAppointments;
