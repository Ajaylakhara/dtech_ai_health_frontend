import { FaDownload, FaArrowRight } from 'react-icons/fa';

const reports = [
  { id: 1, name: 'Hanah Brown', size: '3.6 Mb', tag: 'AI Analysis', tagColor: '#4A90E2' },
  { id: 2, name: 'Eliza Smith', size: '2.1 Mb', tag: 'Pathology', tagColor: '#27AE60' },
  { id: 3, name: 'Karen McBeth', size: '4.5 Mb', tag: 'AI Insight', tagColor: '#8B5CF6' },
  { id: 4, name: 'John Marston', size: '1.2 Mb', tag: 'General', tagColor: '#F59E0B' },
  { id: 5, name: 'Jim Carr', size: '3.3 Mb', tag: 'Diagnostic', tagColor: '#EB5757' },
];

const ReportsList = () => {
  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E8EDF4',
      borderRadius: 20,
      padding: 24,
      boxShadow: '0 4px 24px rgba(23,60,99,0.04)',
      flex: 1,
      userSelect: 'none',
      display: 'flex', flexDirection: 'column', gap: 20,
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(74,144,226,0.1)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg stroke="#4A90E2" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="15" width="15">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
              <polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/>
              <line x1="16" y1="17" x2="8" y2="17"/>
            </svg>
          </div>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 700, color: '#0D1B2A', margin: 0 }}>
            Recent Reports
          </h2>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 12, fontWeight: 600, color: '#4A90E2',
          background: 'none', border: 'none', cursor: 'pointer',
        }}>
          View All <FaArrowRight style={{ fontSize: 9 }} />
        </button>
      </div>

      {/* List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        {reports.map(report => (
          <div key={report.id} style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            padding: '10px 12px',
            borderRadius: 10,
            borderBottom: '1px solid #E8EDF4',
            transition: 'background 0.2s',
            cursor: 'pointer',
          }}
            onMouseEnter={e => e.currentTarget.style.background = '#F8FAFC'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 12, fontWeight: 700, color: '#9DAAB8', minWidth: 16 }}>{report.id}.</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: '#0D1B2A', marginBottom: 2 }}>{report.name}</div>
                <span style={{
                  fontSize: 10, fontWeight: 700,
                  color: report.tagColor,
                  background: `${report.tagColor}18`,
                  padding: '2px 8px', borderRadius: 50,
                  letterSpacing: '0.04em', textTransform: 'uppercase',
                }}>
                  {report.tag}
                </span>
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 11, fontWeight: 600, color: '#6B7A8D' }}>{report.size}</span>
              <div style={{ display: 'flex', gap: 6 }}>
                <button style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: 'rgba(74,144,226,0.1)',
                  border: '1px solid rgba(74,144,226,0.15)',
                  color: '#4A90E2',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  <FaDownload style={{ fontSize: 10 }} />
                </button>
                <button style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: '#173C63',
                  border: 'none', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                  <FaArrowRight style={{ fontSize: 10 }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportsList;
