import { FaCalendarAlt, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useState } from 'react';

const CalendarWidget = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const today = new Date().getDate();
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const monthName = currentMonth.toLocaleString('default', { month: 'long' });
  const year = currentMonth.getFullYear();

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
            <FaCalendarAlt style={{ color: '#4A90E2', fontSize: 14 }} />
          </div>
          <h2 style={{ fontFamily: "'Lora', serif", fontSize: 15, fontWeight: 700, color: '#0D1B2A', margin: 0 }}>
            Calendar
          </h2>
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: 5,
          fontSize: 12, fontWeight: 600, color: '#4A90E2',
          background: 'none', border: 'none', cursor: 'pointer',
        }}>
          Open <FaArrowRight style={{ fontSize: 9 }} />
        </button>
      </div>

      {/* Calendar body */}
      <div style={{
        background: '#F8FAFC',
        borderRadius: 14,
        padding: 18,
        border: '1px solid #E8EDF4',
      }}>
        {/* Month nav */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <button
            onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() - 1))}
            style={{
              width: 26, height: 26, borderRadius: 8,
              background: '#FFFFFF',
              border: '1px solid #E8EDF4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6B7A8D', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <FaChevronLeft style={{ fontSize: 8 }} />
          </button>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#0D1B2A' }}>
            {monthName} {year}
          </span>
          <button
            onClick={() => setCurrentMonth(m => new Date(m.getFullYear(), m.getMonth() + 1))}
            style={{
              width: 26, height: 26, borderRadius: 8,
              background: '#FFFFFF',
              border: '1px solid #E8EDF4',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#6B7A8D', cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            <FaChevronRight style={{ fontSize: 8 }} />
          </button>
        </div>

        {/* Day labels */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 4, textAlign: 'center', marginBottom: 8,
        }}>
          {days.map(d => (
            <div key={d} style={{ fontSize: 9, fontWeight: 700, color: '#9DAAB8', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              {d}
            </div>
          ))}
        </div>

        {/* Dates */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '6px 4px', textAlign: 'center' }}>
          {/* Previous month filler */}
          <div style={{ fontSize: 11, color: '#CBD5E1' }}>29</div>
          <div style={{ fontSize: 11, color: '#CBD5E1' }}>30</div>

          {dates.map(date => {
            const isToday = date === today;
            const hasAppt = [5, 12, 18, 23, 27].includes(date);
            return (
              <div
                key={date}
                style={{
                  width: 26, height: 26,
                  margin: '0 auto',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  borderRadius: 8,
                  fontSize: 11, fontWeight: isToday ? 700 : 600,
                  color: isToday ? '#fff' : hasAppt ? '#4A90E2' : '#6B7A8D',
                  background: isToday ? '#173C63' : 'transparent',
                  boxShadow: isToday ? '0 4px 12px rgba(23,60,99,0.2)' : 'none',
                  cursor: 'pointer',
                  position: 'relative',
                  transition: 'all 0.15s',
                }}
              >
                {date}
                {hasAppt && !isToday && (
                  <span style={{
                    position: 'absolute', bottom: 1,
                    width: 4, height: 4, borderRadius: '50%',
                    background: '#4A90E2',
                  }} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
