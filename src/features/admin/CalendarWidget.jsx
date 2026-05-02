import { FaCalendarAlt, FaArrowRight, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const CalendarWidget = () => {
  const days = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);
  
  return (
    <div className="glass border border-white/5 rounded-[2rem] p-6 shadow-2xl flex-1 select-none flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
            <FaCalendarAlt className="text-slate-300" />
          </div>
          <h2 className="text-white text-base font-bold">Calendar</h2>
        </div>
        <button className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-white transition-colors">
          Open <FaArrowRight className="text-[10px]" />
        </button>
      </div>

      <div className="bg-white/5 rounded-3xl p-5 border border-white/5">
        <div className="flex justify-between items-center mb-5">
           <button className="w-7 h-7 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400">
             <FaChevronLeft className="text-[8px]" />
           </button>
           <span className="text-white font-black text-sm select-none">May {new Date().getFullYear()}</span>
           <button className="w-7 h-7 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition-colors text-slate-400">
             <FaChevronRight className="text-[8px]" />
           </button>
        </div>

        <div className="grid grid-cols-7 gap-2 text-center text-[10px] font-black tracking-wider uppercase text-slate-500 mb-3 select-none">
          {days.map(d => <div key={d}>{d}</div>)}
        </div>
        
        <div className="grid grid-cols-7 gap-y-3 gap-x-2 text-center text-xs font-bold text-white select-none">
          <div className="text-slate-600">29</div>
          <div className="text-slate-600">30</div>
          {dates.map(date => {
             const isHighlighted = date === 13;
             return (
               <div 
                  key={date} 
                  className={`w-7 h-7 mx-auto flex items-center justify-center rounded-xl cursor-pointer transition-all ${
                    isHighlighted ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25 scale-110 font-black' : 'hover:bg-white/5 text-slate-300'
                  }`}
               >
                 {date}
               </div>
             )
          })}
        </div>
      </div>
    </div>
  );
};

export default CalendarWidget;
