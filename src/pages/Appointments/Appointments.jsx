import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyAppointments, deleteAppointment } from '../../redux/thunks/appointmentThunks';
import { Link } from 'react-router-dom';
import { FaCalendarPlus, FaTrash, FaClock, FaUserMd, FaHeartbeat, FaInfoCircle, FaCalendarCheck } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Modal from '../../components/ui/Modal';
import AppointmentForm from './AppointmentForm';

const Appointments = () => {
  const dispatch = useDispatch();
  const { appointments, status, error } = useSelector((state) => state.appointments);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchMyAppointments());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      dispatch(deleteAppointment(id));
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Confirmed': 
        return { bg: 'rgba(39,174,96,0.1)', text: '#27AE60', dot: '#27AE60' };
      case 'Pending': 
        return { bg: 'rgba(242,201,76,0.1)', text: '#D4A316', dot: '#F2C94C' };
      case 'Cancelled': 
        return { bg: 'rgba(235,87,87,0.1)', text: '#EB5757', dot: '#EB5757' };
      case 'Rejected': 
        return { bg: 'rgba(130,130,130,0.1)', text: '#4F4F4F', dot: '#828282' };
      default: 
        return { bg: 'rgba(74,144,226,0.1)', text: '#173C63', dot: '#4A90E2' };
    }
  };

  const stats = {
    total: appointments?.length || 0,
    confirmed: appointments?.filter(a => a.status === 'Confirmed').length || 0,
    pending: appointments?.filter(a => a.status === 'Pending').length || 0,
  };

  return (
    <div style={{ width: '100%', background: '#F4F7FB', minHeight: '100vh', fontFamily: "'Inter', sans-serif", padding: '120px 24px 80px', position: 'relative' }}>
      {/* Background Blob */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '500px', background: 'linear-gradient(180deg, #FFFFFF 0%, #F4F7FB 100%)', zIndex: 0 }} />

      <div style={{ maxWidth: 1000, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        
        {/* Header Block */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 24 }}>
            <div>
              <span style={{ 
                display: 'inline-block', padding: '6px 14px', background: 'rgba(74,144,226,0.1)', color: '#4A90E2', 
                borderRadius: 50, fontSize: 12, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 12 
              }}>
                Patient Dashboard
              </span>
              <h1 style={{ fontFamily: "'Lora', serif", fontSize: 'clamp(2rem, 3.5vw, 2.5rem)', fontWeight: 700, color: '#0D1B2A', margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>
                My Scheduled <span style={{ fontStyle: 'italic', color: '#173C63' }}>Consultations</span>
              </h1>
              <p style={{ fontSize: 15, color: '#6B7A8D', maxWidth: 600, margin: 0, lineHeight: 1.6 }}>
                Manage your consults, check real-time status updates, and connect with doctors.
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="book-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 28px', background: '#173C63', color: '#FFF',
                borderRadius: 50, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s', boxShadow: '0 8px 24px rgba(23,60,99,0.15)'
              }}
            >
              <FaCalendarPlus size={16} /> Book New Appointment
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        {appointments?.length > 0 && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 24, marginBottom: 40 }}>
            <div style={{ background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(23,60,99,0.04)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#6B7A8D', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>All Bookings</span>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#0D1B2A', fontFamily: "'Lora', serif" }}>{stats.total}</span>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(23,60,99,0.04)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#27AE60', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Confirmed</span>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#0D1B2A', fontFamily: "'Lora', serif" }}>{stats.confirmed}</span>
            </div>
            <div style={{ background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 24, padding: 24, display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(23,60,99,0.04)' }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#D4A316', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 8 }}>Pending</span>
              <span style={{ fontSize: 36, fontWeight: 800, color: '#0D1B2A', fontFamily: "'Lora', serif" }}>{stats.pending}</span>
            </div>
          </div>
        )}

        {status === 'loading' && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 0' }}>
            <div style={{ width: 40, height: 40, borderBottom: '2px solid #173C63', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p style={{ color: '#6B7A8D', fontWeight: 500, marginTop: 16, fontSize: 14 }}>Fetching your appointments...</p>
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {error && (
          <div style={{ background: 'rgba(235,87,87,0.05)', borderLeft: '4px solid #EB5757', color: '#EB5757', padding: 20, borderRadius: 16, marginBottom: 32, fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 12 }}>
            <FaInfoCircle size={18} /> <span>{error}</span>
          </div>
        )}

        {status === 'succeeded' && appointments.length === 0 && (
          <div style={{ background: '#FFFFFF', borderRadius: 32, padding: '80px 40px', textAlign: 'center', border: '1px solid #E8EDF4', boxShadow: '0 24px 80px rgba(23,60,99,0.05)' }}>
            <div style={{ width: 80, height: 80, borderRadius: 24, background: 'rgba(23,60,99,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <FaCalendarCheck size={32} color="#173C63" />
            </div>
            <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0D1B2A', marginBottom: 12, fontFamily: "'Lora', serif" }}>No Scheduled Consults</h2>
            <p style={{ fontSize: 15, color: '#6B7A8D', maxWidth: 460, margin: '0 auto 32px', lineHeight: 1.6 }}>
              You haven't scheduled any medical consultations yet. Book one now to get quick attention from our health practitioners.
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="book-btn"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, padding: '14px 32px', background: '#173C63', color: '#FFF',
                borderRadius: 50, fontSize: 15, fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.2s'
              }}
            >
              <FaCalendarPlus size={16} /> Schedule a Consult Now
            </button>
          </div>
        )}

        {/* List of appointments */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          {appointments.map((appt) => {
            const conf = getStatusConfig(appt.status);
            return (
              <div
                key={appt._id}
                className="appt-card"
                style={{
                  background: '#FFFFFF', border: '1px solid #E8EDF4', borderRadius: 24, padding: 32,
                  display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 24,
                  boxShadow: '0 4px 24px rgba(23,60,99,0.04)', transition: 'all 0.3s', position: 'relative', overflow: 'hidden'
                }}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: conf.dot }} />
                
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <span style={{ padding: '6px 12px', borderRadius: 50, background: conf.bg, color: conf.text, fontSize: 12, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: conf.dot }} />
                      {appt.status}
                    </span>
                    <span style={{ color: '#6B7A8D', fontSize: 13, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6 }}>
                      <FaClock size={12} color="#9DAAB8" />
                      Scheduled on {new Date(appt.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0D1B2A', fontFamily: "'Lora', serif", marginBottom: 16 }}>
                    {appt.specialization} Consultation
                  </h3>
                  
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#3D4D5C', fontWeight: 600 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(23,60,99,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaUserMd size={14} color="#173C63" />
                      </div>
                      {appt.doctorId?.userId?.name || 'Assigned Specialist'}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14, color: '#3D4D5C', fontWeight: 600 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 10, background: 'rgba(39,174,96,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FaCalendarCheck size={14} color="#27AE60" />
                      </div>
                      {new Date(appt.appointmentDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })} at {appt.appointmentTime}
                    </div>
                  </div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                  {appt.status === 'Pending' && (
                    <button
                      onClick={() => handleDelete(appt._id)}
                      className="cancel-btn"
                      style={{
                        padding: 12, background: 'transparent', border: '1px solid transparent', color: '#EB5757',
                        borderRadius: 12, cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', justifyContent: 'center'
                      }}
                      title="Cancel Appointment"
                    >
                      <FaTrash size={16} />
                    </button>
                  )}
                  {appt.status === 'Confirmed' && (
                    <div style={{ padding: '10px 16px', background: 'rgba(39,174,96,0.05)', border: '1px solid rgba(39,174,96,0.1)', color: '#27AE60', borderRadius: 12, fontSize: 13, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#27AE60', animation: 'pulse 2s infinite' }} />
                      Ready
                      <style>{`@keyframes pulse { 0% { opacity: 1; transform: scale(1); } 50% { opacity: 0.5; transform: scale(1.5); } 100% { opacity: 1; transform: scale(1); } }`}</style>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        title="Schedule a Consultation"
      >
        <AppointmentForm 
          onSuccess={() => {
            setIsModalOpen(false);
            dispatch(fetchMyAppointments());
          }} 
        />
      </Modal>

      <style>{`
        .book-btn:hover {
          background: #1E4D7B !important;
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(23,60,99,0.25) !important;
        }
        .cancel-btn:hover {
          background: rgba(235,87,87,0.05) !important;
          border-color: rgba(235,87,87,0.1) !important;
        }
        .appt-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(23,60,99,0.08) !important;
          border-color: rgba(23,60,99,0.1) !important;
        }
        @media (max-width: 768px) {
          .appt-card {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
          }
          .cancel-btn {
            width: 100%;
            border: 1px solid rgba(235,87,87,0.2) !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Appointments;
