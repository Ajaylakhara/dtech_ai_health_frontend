import { FaCheck, FaArrowRight, FaEdit, FaTrash } from 'react-icons/fa';
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
    <div className="bg-[#1E1F21] rounded-[2rem] p-6 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
      <div className="grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_auto] gap-4 mb-4 px-6 text-sm font-bold text-white uppercase tracking-wider">
        <div>Name</div>
        <div>Department</div>
        <div>Problems Treated</div>
        <div className="text-center">Patients Attend</div>
        <div></div>
      </div>
      
      <div className="flex flex-col gap-3 relative z-10">
        {doctors?.length > 0 ? (
           doctors.map((doctor, index) => (
            <div 
              key={doctor._id || index} 
              className={`grid grid-cols-[1.5fr_1fr_1.5fr_0.8fr_auto] gap-4 items-center px-6 py-4 rounded-full transition-all group ${
                index === 0 ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white border border-blue-500/30 shadow-lg shadow-blue-500/5 relative z-20 scale-[1.01]' : 'bg-[#18191A] text-slate-300 hover:bg-[#252628]'
              }`}
            >
              {/* Highlight Backdrop for active */}
              {index === 0 && (
                <div className="absolute inset-0 bg-blue-500/10 -z-10 rounded-full blur-xl scale-110"></div>
              )}

              <div className="flex items-center gap-4">
                <img 
                  src={doctor.userId?.profileImage || doctor.image || 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=100&auto=format&fit=crop'} 
                  alt={doctor.userId?.name || 'Doctor'} 
                  className={`w-11 h-11 rounded-full object-cover ring-2 ${index === 0 ? 'ring-blue-500/30' : 'ring-slate-700'}`} 
                />
                <div>
                  <p className={`font-bold text-[15px] ${index === 0 ? 'text-white' : 'text-white'}`}>
                    {doctor.userId?.name || doctor.doctorName || 'Unknown Doctor'}
                  </p>
                  <p className={`text-[11px] font-medium mt-0.5 ${index === 0 ? 'text-slate-400' : 'text-slate-500'}`}>
                    ID: {doctor._id?.slice(-6).toUpperCase()}
                  </p>
                </div>
              </div>
              
              <div className={`font-bold text-[13px] ${index === 0 ? 'text-blue-400 font-bold' : 'text-slate-400'}`}>
                {doctor.departmentId?.name || 'General'}
              </div>

              <div className={`font-medium text-[13px] line-clamp-1 pr-4 ${index === 0 ? 'text-slate-300' : 'text-slate-400'}`}>
                {doctor.specialization || 'General Practice'}
              </div>
              
              <div className={`font-black text-[16px] text-center ${index === 0 ? 'text-white' : 'text-white'}`}>
                {doctor.patientsCount}
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-2 justify-end">
                <button onClick={() => onEdit && onEdit(doctor)} className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${index === 0 ? 'bg-blue-500/15 text-blue-400 hover:bg-blue-500/25' : 'bg-[#2A2B2D] text-blue-400 hover:bg-blue-500 hover:text-white'}`}>
                   <FaEdit className="text-sm" />
                </button>
                <button onClick={() => handleDelete(doctor._id)} className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${index === 0 ? 'bg-red-500/20 text-red-600 hover:bg-red-600 hover:text-white' : 'bg-[#2A2B2D] text-red-500 hover:bg-red-500 hover:text-white'}`}>
                   <FaTrash className="text-sm" />
                </button>
              </div>
            </div>
           ))
        ) : (
          <div className="text-center py-8 text-slate-500 font-semibold">No doctors found. Please add a doctor.</div>
        )}
      </div>
    </div>
  );
};

export default DoctorsTable;

