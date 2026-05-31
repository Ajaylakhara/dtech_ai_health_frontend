import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const otherDoctors = [
  { id: 1, name: 'Huston Carr', dept: 'Cardiology', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=100&auto=format&fit=crop' },
  { id: 2, name: 'Roza Marquez', dept: 'Neurology', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop' },
  { id: 3, name: 'Jayden Terry', dept: 'Orthopaedics', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=100&auto=format&fit=crop' },
  { id: 4, name: 'Kyle Brown', dept: 'Paediatrics', image: 'https://images.unsplash.com/photo-1582750433449-648ed127d0fc?q=80&w=100&auto=format&fit=crop' },
];

const RightSidebar = () => {
  const { doctors: apiDoctors } = useSelector(state => state.doctors);
  const displayDoctors = apiDoctors?.length > 0 ? apiDoctors.slice(0, 4) : otherDoctors;
  const featuredDoctor = displayDoctors[0] || otherDoctors[0];
  const featuredDocName = featuredDoctor.userId?.name || featuredDoctor.name || 'Unknown Doctor';
  const featuredDocImage = featuredDoctor.userId?.profileImage || featuredDoctor.profileImage || featuredDoctor.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop';
  const featuredDocDept = featuredDoctor.specialization || featuredDoctor.dept || 'General Department';

  return (
    <div style={{ width: 300, flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>

      {/* Patient Diagnosis Card */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E8EDF4',
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 4px 24px rgba(23,60,99,0.04)',
        textAlign: 'center',
      }}>
        {/* Risk badge */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          padding: '5px 12px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.2)',
          borderRadius: 50,
          marginBottom: 14,
        }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EB5757', display: 'inline-block' }} />
          <span style={{ fontSize: 10, fontWeight: 700, color: '#EB5757', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            High Risk Patient
          </span>
        </div>

        <p style={{ fontSize: 13, color: '#6B7A8D', lineHeight: 1.6, marginBottom: 16 }}>
          Diagnosed with <span style={{ color: '#173C63', fontWeight: 700 }}>Arrhythmias</span> — requires specialist review
        </p>

        {/* Doctor card */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: 14,
          padding: 16,
          border: '1px solid #E8EDF4',
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}>
          <div style={{
            fontSize: 10, fontWeight: 700, color: '#4A90E2',
            letterSpacing: '0.08em', textTransform: 'uppercase',
            marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6,
          }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#4A90E2', display: 'inline-block' }} />
            Attending Doctor
          </div>
          <img
            src={featuredDocImage}
            alt={featuredDocName}
            style={{
              width: 72, height: 72, borderRadius: 14,
              objectFit: 'cover', marginBottom: 10,
              border: '2px solid rgba(74,144,226,0.2)',
              boxShadow: '0 4px 16px rgba(23,60,99,0.1)',
            }}
          />
          <h3 style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 700, color: '#0D1B2A', margin: '0 0 4px' }}>
            {featuredDocName}
          </h3>
          <p style={{ fontSize: 11, color: '#6B7A8D', margin: '0 0 12px', fontWeight: 500 }}>{featuredDocDept}</p>
          <button style={{
            padding: '7px 18px',
            background: '#173C63',
            color: '#fff', border: 'none', borderRadius: 50,
            fontSize: 11, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(23,60,99,0.15)',
          }}>
            View Profile
          </button>
        </div>
      </div>

      {/* AI Analysis Box */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(23,60,99,0.8) 0%, rgba(30,80,128,0.9) 100%)',
        border: '1px solid rgba(74,144,226,0.15)',
        borderRadius: 20,
        padding: 20,
        boxShadow: '0 4px 24px rgba(23,60,99,0.15)',
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: '#9DAAB8', marginBottom: 12 }}>
          Latest AI Analysis:{' '}
          <span style={{ color: '#27AE60', fontWeight: 700 }}>Stable Output</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 28, fontWeight: 700, color: '#FFFFFF', margin: '0 0 4px', lineHeight: 1 }}>
              8 Visits
            </p>
            <p style={{ fontSize: 11, color: '#9DAAB8', margin: 0, lineHeight: 1.5 }}>
              Track last report{' '}
              <a href="#" style={{ color: '#4A90E2', fontWeight: 700, textDecoration: 'underline' }}>here</a>
            </p>
          </div>
          <button style={{
            padding: '8px 16px',
            background: '#fff',
            color: '#173C63',
            border: 'none', borderRadius: 50,
            fontSize: 11, fontWeight: 700, cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
            whiteSpace: 'nowrap',
          }}>
            Patient Detail
          </button>
        </div>
      </div>

      {/* Doctor List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#9DAAB8', letterSpacing: '0.08em', textTransform: 'uppercase', margin: '0 0 4px' }}>
          On-Duty Doctors
        </p>
        {displayDoctors.map((doc) => {
          const docName = doc.userId?.name || doc.name || 'Unknown Doctor';
          const docImage = doc.userId?.profileImage || doc.profileImage || doc.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop';
          const docDept = doc.specialization || doc.dept || 'General';
          return (
            <div key={doc._id || doc.id} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '10px 14px',
              borderRadius: 12,
              background: '#FFFFFF',
              border: '1px solid #E8EDF4',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#F8FAFC'; e.currentTarget.style.borderColor = 'rgba(74,144,226,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#FFFFFF'; e.currentTarget.style.borderColor = '#E8EDF4'; }}
            >
              <img src={docImage} alt={docName} style={{ width: 38, height: 38, borderRadius: 10, objectFit: 'cover', border: '1.5px solid rgba(74,144,226,0.15)', flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ fontSize: 13, fontWeight: 600, color: '#0D1B2A', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{docName}</h4>
                <p style={{ fontSize: 11, color: '#6B7A8D', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{docDept}</p>
              </div>
              <FaArrowRight style={{ color: '#9DAAB8', fontSize: 11, flexShrink: 0 }} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default RightSidebar;
