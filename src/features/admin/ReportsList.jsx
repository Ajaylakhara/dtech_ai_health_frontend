import { FaDownload, FaArrowRight } from 'react-icons/fa';

const reports = [
  { id: 1, name: 'Hanah Brown', size: '3.6 Mb', tag: 'AI Analysis' },
  { id: 2, name: 'Eliza Smith', size: '2.1 Mb', tag: 'Pathology' },
  { id: 3, name: 'Karen McBeth', size: '4.5 Mb', tag: 'AI Insight' },
  { id: 4, name: 'John Marston', size: '1.2 Mb', tag: 'General' },
  { id: 5, name: 'Jim Carr', size: '3.3 Mb', tag: 'Diagnostic' },
];

const ReportsList = () => {
  return (
    <div className="glass border border-white/5 rounded-[2rem] p-6 shadow-2xl flex-1 select-none flex flex-col gap-5">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
            <svg stroke="currentColor" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" className="text-slate-300" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
          </div>
          <h2 className="text-white text-base font-bold">Recent Reports</h2>
        </div>
        <button className="flex items-center gap-2 text-slate-400 font-bold text-xs hover:text-white transition-colors select-none">
          View All <FaArrowRight className="text-[10px]" />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {reports.map((report) => (
          <div key={report.id} className="flex justify-between items-center border-b border-white/5 pb-3.5 last:border-0 last:pb-0 hover:bg-white/5 p-2 rounded-xl transition-all">
            <div className="flex items-center gap-4">
              <span className="text-slate-500 font-bold text-sm">{report.id}.</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-white font-bold text-sm">{report.name}</span>
                <span className="text-[10px] font-black tracking-wide text-gradient uppercase">{report.tag}</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
               <span className="text-slate-400 font-bold text-xs">{report.size}</span>
               <div className="flex gap-2">
                 <button className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/10 flex items-center justify-center hover:bg-blue-500/20 transition-all">
                   <FaDownload className="text-[10px]" />
                 </button>
                 <button className="w-8 h-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white flex items-center justify-center hover:opacity-90 transition-all select-none">
                   <FaArrowRight className="text-[10px]" />
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
