import { useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { FaChevronDown } from 'react-icons/fa';

const fullYearData = [
  { name: 'Jan', male: 40, female: 20 },
  { name: 'Feb', male: 25, female: 45 },
  { name: 'Mar', male: 20, female: 0 },
  { name: 'Apr', male: 30, female: -5 },
  { name: 'May', male: 15, female: 20 },
  { name: 'Jun', male: 40, female: 52 },
  { name: 'Jul', male: 20, female: 40 },
  { name: 'Aug', male: -5, female: 25 },
  { name: 'Sep', male: 30, female: 22 },
  { name: 'Oct', male: 20, female: 40 },
  { name: 'Nov', male: -5, female: 25 },
  { name: 'Dec', male: 38, female: 35 }
];

const last30DaysData = [
  { name: 'Week 1', male: 10, female: 8 },
  { name: 'Week 2', male: 22, female: 15 },
  { name: 'Week 3', male: 18, female: 25 },
  { name: 'Week 4', male: 35, female: 30 },
];

const last7DaysData = [
  { name: 'Mon', male: 3, female: 2 },
  { name: 'Tue', male: 5, female: 4 },
  { name: 'Wed', male: 2, female: 6 },
  { name: 'Thu', male: 6, female: 3 },
  { name: 'Fri', male: 8, female: 7 },
  { name: 'Sat', male: 4, female: 5 },
  { name: 'Sun', male: 7, female: 8 },
];

const PatientVisitsChart = () => {
  const [range, setRange] = useState('Yearly');
  
  const currentData = range === '7 Days' ? last7DaysData : range === '30 Days' ? last30DaysData : fullYearData;

  return (
    <div className="glass border border-white/5 rounded-[2rem] p-6 pt-8 pb-4 shadow-2xl relative select-none">
      <div className="flex justify-between items-center mb-8 px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300 text-xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="8.5" cy="7" r="4"></circle><line x1="20" y1="8" x2="20" y2="14"></line><line x1="23" y1="11" x2="17" y2="11"></line></svg>
            <h2 className="text-white text-base font-bold">Patient Analytics</h2>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6]"></div>
               <span className="text-slate-400 text-[10px] font-bold">Male</span>
             </div>
             <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
               <div className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]"></div>
               <span className="text-slate-400 text-[10px] font-bold">Female</span>
             </div>
          </div>
        </div>
        
        {/* Interactive Filters */}
        <div className="flex gap-2">
          {['7 Days', '30 Days', 'Yearly'].map((r) => (
            <button
              key={r}
              onClick={() => setRange(r)}
              className={`text-xs px-3.5 py-1.5 rounded-xl border transition-all font-bold select-none ${
                range === r 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white border-transparent shadow-md' 
                  : 'bg-white/5 border-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[220px] w-full mt-4 relative -left-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={currentData} margin={{ top: 5, right: 30, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1f2937" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
              tickCount={5}
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#0B1120', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px' }}
              itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
            />
            <Line 
               type="monotone" 
               dataKey="female" 
               stroke="#8B5CF6" 
               strokeWidth={2.5} 
               dot={false}
               activeDot={{ r: 6, fill: "#8B5CF6", stroke: "#0B1120", strokeWidth: 2 }}
            />
            <Line 
               type="monotone" 
               dataKey="male" 
               stroke="#3B82F6" 
               strokeWidth={2.5} 
               dot={false}
               activeDot={{ r: 6, fill: "#3B82F6", stroke: "#0B1120", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PatientVisitsChart;
