import { useDispatch } from 'react-redux';
import { deleteDepartment } from '../../redux/slices/departmentSlice';
import { FaTrash, FaEdit, FaHospital } from 'react-icons/fa';
import toast from 'react-hot-toast';

const DepartmentsTable = ({ departments, onEdit }) => {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this department?')) {
      const result = await dispatch(deleteDepartment(id));
      if (deleteDepartment.fulfilled.match(result)) {
        toast.success('Department deleted successfully');
      } else {
        toast.error('Failed to delete department');
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
            <FaHospital size={14} />
          </div>
          Departments List
        </h3>
        <span style={{
          background: 'rgba(74,144,226,0.1)', color: '#4A90E2',
          border: '1px solid rgba(74,144,226,0.2)',
          padding: '4px 14px', borderRadius: 50,
          fontSize: 11, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          {departments?.length ?? 0} Total
        </span>
      </div>

      {/* Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E8EDF4' }}>
              {['Image', 'Name', 'Description', 'Fee (₹)', 'Actions'].map((h, i) => (
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
            {departments?.length > 0 ? (
              departments.map((dept, idx) => (
                <tr
                  key={dept._id}
                  style={{ borderBottom: '1px solid #E8EDF4', transition: 'background 0.15s' }}
                  onMouseEnter={e => e.currentTarget.style.background = '#F4F7FB'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                >
                  {/* Image */}
                  <td style={{ padding: '14px 20px' }}>
                    {dept.image ? (
                      <img
                        src={dept.image}
                        alt={dept.name}
                        style={{
                          width: 40, height: 40, borderRadius: 10,
                          objectFit: 'cover',
                          border: '2px solid #E8EDF4',
                        }}
                      />
                    ) : (
                      <div style={{
                        width: 40, height: 40, borderRadius: 10,
                        background: `hsl(${(idx * 53) % 360}, 55%, 92%)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: `hsl(${(idx * 53) % 360}, 50%, 40%)`,
                        fontSize: 16, fontWeight: 700,
                        border: '2px solid #E8EDF4',
                        flexShrink: 0,
                      }}>
                        {dept.name?.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </td>

                  {/* Name */}
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{ fontWeight: 700, color: '#0D1B2A', fontSize: 13 }}>
                      {dept.name}
                    </span>
                  </td>

                  {/* Description */}
                  <td style={{ padding: '14px 20px', color: '#6B7A8D', fontSize: 13, maxWidth: 280 }}>
                    <span style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {dept.description || '—'}
                    </span>
                  </td>

                  {/* Fee */}
                  <td style={{ padding: '14px 20px' }}>
                    <span style={{
                      background: 'rgba(74,144,226,0.08)', color: '#4A90E2',
                      border: '1px solid rgba(74,144,226,0.18)',
                      padding: '4px 10px', borderRadius: 8,
                      fontSize: 11, fontWeight: 700,
                    }}>
                      ₹{dept.consultationFee || 0}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => onEdit(dept)}
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
                        onClick={() => handleDelete(dept._id)}
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
                    <FaHospital size={36} style={{ opacity: 0.2 }} />
                    <p style={{ fontWeight: 700, margin: 0 }}>No departments found.</p>
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

export default DepartmentsTable;
