import { useState } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const fullYearData = [
  { name: 'Jan', male: 40, female: 20 }, { name: 'Feb', male: 25, female: 45 },
  { name: 'Mar', male: 20, female: 30 }, { name: 'Apr', male: 30, female: 15 },
  { name: 'May', male: 15, female: 20 }, { name: 'Jun', male: 40, female: 52 },
  { name: 'Jul', male: 20, female: 40 }, { name: 'Aug', male: 35, female: 25 },
  { name: 'Sep', male: 30, female: 22 }, { name: 'Oct', male: 20, female: 40 },
  { name: 'Nov', male: 28, female: 25 }, { name: 'Dec', male: 38, female: 35 }
];
const last30DaysData = [
  { name: 'Week 1', male: 10, female: 8 }, { name: 'Week 2', male: 22, female: 15 },
  { name: 'Week 3', male: 18, female: 25 }, { name: 'Week 4', male: 35, female: 30 },
];
const last7DaysData = [
  { name: 'Mon', male: 3, female: 2 }, { name: 'Tue', male: 5, female: 4 },
  { name: 'Wed', male: 2, female: 6 }, { name: 'Thu', male: 6, female: 3 },
  { name: 'Fri', male: 8, female: 7 }, { name: 'Sat', male: 4, female: 5 },
  { name: 'Sun', male: 7, female: 8 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: '#FFFFFF', border: '1px solid #E8EDF4',
      borderRadius: 12, padding: '10px 16px',
      boxShadow: '0 8px 24px rgba(23,60,99,0.1)',
    }}>
      <p style={{ fontSize: 11, color: '#6B7A8D', marginBottom: 6, fontWeight: 600 }}>{label}</p>
      {payload.map(p => (
        <p key={p.dataKey} style={{ fontSize: 12, fontWeight: 700, color: p.color, margin: '2px 0' }}>
          {p.dataKey === 'male' ? '♂ Male' : '♀ Female'}: <strong>{p.value}</strong>
        </p>
      ))}
    </div>
  );
};

const PatientVisitsChart = () => {
  const [range, setRange] = useState('Yearly');
  const currentData = range === '7 Days' ? last7DaysData : range === '30 Days' ? last30DaysData : fullYearData;

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E8EDF4',
      borderRadius: 20,
      padding: '24px 24px 16px',
      boxShadow: '0 4px 24px rgba(23,60,99,0.04)',
      userSelect: 'none',
    }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: 'rgba(74,144,226,0.1)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg stroke="#4A90E2" fill="none" strokeWidth="2" viewBox="0 0 24 24" height="16" width="16">
                <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/>
                <line x1="23" y1="11" x2="17" y2="11"/>
              </svg>
            </div>
            <h2 style={{ fontFamily: "'Lora', serif", fontSize: 16, fontWeight: 700, color: '#0D1B2A', margin: 0 }}>
              Patient Analytics
            </h2>
          </div>
          {/* Legend */}
          <div style={{ display: 'flex', gap: 10 }}>
            {[{ color: '#4A90E2', label: 'Male' }, { color: '#8B5CF6', label: 'Female' }].map(l => (
              <div key={l.label} style={{
                display: 'flex', alignItems: 'center', gap: 6,
                padding: '4px 10px', borderRadius: 50,
                background: '#F8FAFC',
                border: '1px solid #E8EDF4',
              }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: l.color }} />
                <span style={{ fontSize: 10, fontWeight: 700, color: '#6B7A8D' }}>{l.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Range Filters */}
        <div style={{ display: 'flex', gap: 6 }}>
          {['7 Days', '30 Days', 'Yearly'].map(r => (
            <button
              key={r}
              onClick={() => setRange(r)}
              style={{
                padding: '6px 14px', borderRadius: 8,
                fontSize: 12, fontWeight: 600, cursor: 'pointer',
                border: range === r ? 'none' : '1px solid #E8EDF4',
                background: range === r ? '#173C63' : '#F8FAFC',
                color: range === r ? '#fff' : '#6B7A8D',
                boxShadow: range === r ? '0 4px 12px rgba(23,60,99,0.15)' : 'none',
                transition: 'all 0.2s',
              }}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Chart */}
      <div style={{ height: 220, width: '100%' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 5, right: 20, left: -15, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E8EDF4" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9DAAB8', fontSize: 11, fontWeight: 600 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9DAAB8', fontSize: 11, fontWeight: 600 }} tickCount={5} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="female" stroke="#8B5CF6" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#8B5CF6', stroke: '#FFFFFF', strokeWidth: 2 }} />
            <Line type="monotone" dataKey="male" stroke="#4A90E2" strokeWidth={2.5} dot={false} activeDot={{ r: 5, fill: '#4A90E2', stroke: '#FFFFFF', strokeWidth: 2 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientVisitsChart;
