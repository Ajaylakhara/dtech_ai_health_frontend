import { FaEdit, FaTrash, FaUserMd } from 'react-icons/fa';
import { useDispatch } from 'react-redux';
import { deleteDoctorAction } from '../../redux/thunks/doctorThunks';
import toast from 'react-hot-toast';

const DoctorsTable = ({ doctors, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await dispatch(deleteDoctorAction(id)).unwrap();
        toast.success('Doctor removed.');
      } catch (err) {
        toast.error('Failed to remove doctor');
      }
    }
  };

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E8EDF4',
      borderRadius: 16,
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(23,60,99,0.04)',
    }}>
      {/* Table Header Bar */}
      <div style={{
        padding: '20px 28px',
        borderBottom: '1px solid #E8EDF4',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <h3 style={{
          fontSize: 15, fontWeight: 700, color: '#0D1B2A', margin: 0,
          display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(74,144,226,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#4A90E2',
          }}>
            <FaUserMd size={14} />
          </div>
          Doctor Records
        </h3>
        <span style={{
          background: 'rgba(74,144,226,0.1)', color: '#4A90E2',
          border: '1px solid rgba(74,144,226,0.2)',
          padding: '4px 14px', borderRadius: 50,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {doctors?.length ?? 0} Total
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF4' }}>
              {['Name', 'Department', 'Specialization', 'Patients', 'Actions'].map((h, i) => (
                <th key={i} style={{
                  padding: '14px 20px',
                  fontSize: 11, fontWeight: 700, color: '#6B7A8D',
                  textTransform: 'uppercase', letterSpacing: '0.12em',
                  textAlign: h === 'Actions' ? 'right' : h === 'Patients' ? 'center' : 'left',
                }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {doctors?.length > 0 ? (
              doctors.map((doctor, idx) => (
                <tr
                  key={doctor._id || idx}
                  style={{ borderBottom: '1px solid #E8EDF4', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F4F7FB'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Name */}
                  <td style={{ padding: '14px 20px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <img
                        src={
                          doctor.userId?.profileImage ||
                          doctor.image ||
                          `https://ui-avatars.com/api/?name=${encodeURIComponent(doctor.userId?.name || 'D')}&background=EBF2FA&color=173C63&bold=true&size=80`
                        }
                        alt={doctor.userId?.name || 'Doctor'}
                        style={{
                          width: 38, height: 38, borderRadius: 10,
                          objectFit: 'cover',
                          border: '2px solid #E8EDF4',
                          flexShrink: 0,
                        }}
                        onError={e => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <div>
                        <p style={{ margin: 0, fontWeight: 700, color: '#0D1B2A', fontSize: 13 }}>
                          {doctor.userId?.name || doctor.doctorName || 'Unknown Doctor'}
                        </p>
                        <p style={{ margin: 0, fontSize: 11, color: '#9DAAB8', marginTop: 1 }}>
                          ID: {doctor._id?.slice(-6).toUpperCase()}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      background: 'rgba(74,144,226,0.08)', color: '#4A90E2',
                      border: '1px solid rgba(74,144,226,0.18)',
                      padding: '4px 10px', borderRadius: 50,
                      fontSize: 11, fontWeight: 700,
                    }}>
                      {doctor.departmentId?.name || 'General'}
                    </span>
                  </td>

                  {/* Specialization */}
                  <td style={{ padding: '14px 20px', color: '#6B7A8D', fontSize: 13, maxWidth: 220 }}>
                    <span style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {doctor.specialization || 'General Practice'}
                    </span>
                  </td>

                  {/* Patients Count */}
                  <td style={{ padding: '14px 20px', textAlign: 'center' }}>
                    <span style={{ fontWeight: 700, color: '#0D1B2A', fontSize: 15 }}>
                      {doctor.patientsCount ?? 0}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => onEdit && onEdit(doctor)}
                        title="Edit"
                        style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: '#F8FAFC', border: '1px solid #E8EDF4',
                          color: '#6B7A8D', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.color = '#4A90E2'; e.currentTarget.style.borderColor = '#4A90E2'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = '#6B7A8D'; e.currentTarget.style.borderColor = '#E8EDF4'; }}
                      >
                        <FaEdit size={12} />
                      </button>
                      <button
                        onClick={() => handleDelete(doctor._id)}
                        title="Delete"
                        style={{
                          width: 32, height: 32, borderRadius: 8,
                          background: 'rgba(235,87,87,0.1)', border: '1px solid rgba(235,87,87,0.15)',
                          color: '#EB5757', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = '#EB5757'; e.currentTarget.style.color = '#fff'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'rgba(235,87,87,0.1)'; e.currentTarget.style.color = '#EB5757'; }}
                      >
                        <FaTrash size={12} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" style={{ padding: '48px 20px', textAlign: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, color: '#9DAAB8' }}>
                    <FaUserMd size={36} style={{ opacity: 0.2 }} />
                    <p style={{ fontWeight: 700, margin: 0 }}>No doctors found. Please add a doctor.</p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DoctorsTable;
