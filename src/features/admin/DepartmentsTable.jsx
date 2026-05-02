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
    <div className="bg-[#1E1F21] rounded-[2rem] border border-slate-800 overflow-hidden shadow-2xl">
      <div className="p-8 border-b border-slate-800 flex justify-between items-center">
        <h3 className="text-xl font-bold text-white flex items-center gap-3">
          <FaHospital className="text-blue-400" /> Departments List
        </h3>
        <span className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
          {departments?.length || 0} Total
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-[#18191A] text-slate-400 text-xs font-black uppercase tracking-[0.2em] border-b border-slate-800">
              <th className="px-8 py-5">Image</th>
              <th className="px-8 py-5">Name</th>
              <th className="px-8 py-5">Description</th>
              <th className="px-8 py-5">Fee (₹)</th>
              <th className="px-8 py-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {departments?.map((dept) => (
              <tr key={dept._id} className="group hover:bg-blue-500/5 transition-colors">
                <td className="px-8 py-6">
                  {dept.image ? (
                    <img src={dept.image} alt={dept.name} className="w-12 h-12 rounded-xl object-cover ring-2 ring-slate-800" />
                  ) : (
                    <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center text-slate-500">
                      <FaHospital />
                    </div>
                  )}
                </td>
                <td className="px-8 py-6">
                  <div className="font-bold text-white group-hover:text-blue-400 transition-colors">
                    {dept.name}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="text-slate-400 text-sm max-w-md truncate">
                    {dept.description}
                  </div>
                </td>
                <td className="px-8 py-6">
                  <div className="bg-blue-500/10 text-blue-400 border border-blue-500/20 px-3 py-1 rounded-lg text-xs font-bold inline-block">
                    ₹{dept.consultationFee || 0}
                  </div>
                </td>
                <td className="px-8 py-6 text-right">
                  <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button 
                      onClick={() => onEdit(dept)}
                      className="p-2 bg-slate-800 text-slate-400 hover:text-white rounded-xl transition-all"
                    >
                      <FaEdit size={16} />
                    </button>
                    <button 
                      onClick={() => handleDelete(dept._id)}
                      className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-xl transition-all"
                    >
                      <FaTrash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DepartmentsTable;

