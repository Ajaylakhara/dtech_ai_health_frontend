import { FaArrowRight } from 'react-icons/fa';
import { useSelector } from 'react-redux';

const otherDoctors = [
  { id: 1, name: 'Huston Carr', dept: 'Heart Department', image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=100&auto=format&fit=crop' },
  { id: 2, name: 'Roza Marquez', dept: 'Heart Department', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=100&auto=format&fit=crop' },
  { id: 3, name: 'Jayden Terry', dept: 'Heart Department', image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=100&auto=format&fit=crop' },
  { id: 4, name: 'Kyle Brown', dept: 'Heart Department', image: 'https://images.unsplash.com/photo-1582750433449-648ed127d0fc?q=80&w=100&auto=format&fit=crop' },
];

const RightSidebar = () => {
  const { doctors: apiDoctors } = useSelector((state) => state.doctors);
  const displayDoctors = apiDoctors?.length > 0 ? apiDoctors.slice(0, 4) : otherDoctors;
  const featuredDoctor = displayDoctors[0] || otherDoctors[0];
  const featuredDocName = featuredDoctor.userId?.name || featuredDoctor.name || 'Unknown Doctor';
  const featuredDocImage = featuredDoctor.userId?.profileImage || featuredDoctor.profileImage || featuredDoctor.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=150&auto=format&fit=crop';
  const featuredDocDept = featuredDoctor.specialization || featuredDoctor.dept || 'General Department';

  return (
    <div className="w-[340px] shrink-0 flex flex-col gap-6 selection:bg-blue-500/30">
      
      {/* Top Diagnose Box */}
      <div className="glass border border-white/5 rounded-[2rem] p-6 text-center shadow-2xl relative select-none">
         <p className="text-white text-sm font-bold leading-relaxed mb-6">
           This Patient Is Diagnosed With <span className="text-gradient">Arrhythmias</span><br/>
           And Level Is <span className="text-red-400 font-extrabold uppercase text-xs">High Risk</span>
         </p>
         
         <div className="bg-white/5 rounded-[1.5rem] p-6 border border-white/5 flex flex-col items-center">
            <div className="flex items-center gap-2 text-blue-400 text-xs font-black tracking-wide uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span> Attending Doctor
            </div>
            
            <img src={featuredDocImage} alt={featuredDocName} className="w-24 h-24 rounded-2xl object-cover mb-4 ring-4 ring-white/5 shadow-lg select-none" />
            
            <h3 className="text-white text-lg font-black">{featuredDocName}</h3>
            <p className="text-slate-400 text-xs font-bold mb-1 line-clamp-1 select-none">{featuredDocDept}</p>
            <p className="text-slate-500 text-[10px] font-black uppercase tracking-wider mb-3">Certified Specialist</p>
            <p className="text-white text-base font-black">27 <span className="text-slate-500 font-medium text-sm">y/o</span></p>
         </div>
      </div>

      {/* Blue/Purple Highlights Box */}
      <div className="bg-gradient-to-tr from-blue-500/20 to-purple-600/20 glass border border-blue-500/10 rounded-[2rem] p-6 shadow-2xl text-white select-none">
         <p className="font-bold text-sm mb-6">
           Latest AI Analysis: <span className="font-extrabold text-[15px] text-gradient">Stable Output</span>
         </p>
         
         <div className="flex justify-between items-end">
            <div>
              <p className="font-black text-3xl leading-none tracking-tight">8 Visits</p>
              <p className="font-bold text-xs mt-2 tracking-wide text-slate-400">Track and view the</p>
              <p className="font-bold text-xs tracking-wide text-slate-400">last full report <a href="#" className="underline text-blue-400 font-extrabold">here</a></p>
            </div>
            <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-3 rounded-full text-xs font-black uppercase hover:opacity-90 transition-all shadow-lg select-none">
              Patient Detail
            </button>
         </div>
      </div>

      {/* List of other doctors */}
      <div className="flex flex-col gap-3 relative select-none">
         {displayDoctors.map((doc, idx) => {
            const docName = doc.userId?.name || doc.name || 'Unknown Doctor';
            const docImage = doc.userId?.profileImage || doc.profileImage || doc.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop';
            const docDept = doc.specialization || doc.dept || 'General';

            return (
              <div key={doc._id || doc.id} className="relative flex items-center gap-4 bg-white/5 border border-transparent hover:bg-white/10 hover:border-white/5 p-3.5 rounded-2xl shadow-sm pl-4 pr-5 group transition-all cursor-pointer">
                <img src={docImage} alt={docName} className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex-1 w-0">
                  <h4 className="text-white font-bold text-[15px] truncate">{docName}</h4>
                  <p className="text-slate-400 text-xs font-semibold truncate">{docDept}</p>
                </div>
                <FaArrowRight className="text-slate-500 text-sm group-hover:text-blue-400 group-hover:translate-x-1 transition-all duration-300 shrink-0" />
              </div>
            );
         })}
      </div>

    </div>
  );
};

export default RightSidebar;
