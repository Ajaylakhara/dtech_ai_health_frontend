import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash, FaEdit, FaSearch } from 'react-icons/fa';
import { fetchUsers, deleteUserAction } from '../../redux/thunks/userThunks';
import toast from 'react-hot-toast';

const AdminPatients = () => {
  const dispatch = useDispatch();
  const { users, status } = useSelector((state) => state.users);
  
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    // Fetch users every time we navigate to this page so the list is always fresh
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to permanently delete this user?")) {
      try {
        await dispatch(deleteUserAction(id)).unwrap();
        toast.success("User deleted successfully");
      } catch (err) {
        toast.error(err || "Failed to delete user");
      }
    }
  };

  const handleEdit = (id) => {
    alert('Edit functionality opened in modal here');
  };

  if (status === 'loading') return <div className="text-blue-400 p-8 font-bold">Loading Patients...</div>;

  // Derive subset of patients from raw admin Redux array
  const formattedPatients = users
    .filter(u => u.role === 'patient')
    .map(p => ({
        id: p._id,
        name: p.name || 'Unnamed User',
        email: p.email,
        age: p.age || 'N/A',
        phone: p.phone || 'N/A',
        bloodType: p.bloodGroup || 'N/A'
    }))
    .filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.email.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="flex flex-col gap-6 mt-2">
      <div className="bg-[#1E1F21] rounded-[2rem] p-8 shadow-[0_15px_40px_rgba(0,0,0,0.3)]">
        <div className="flex justify-between items-center mb-8">
           <h1 className="text-white text-2xl font-bold">Patient Management</h1>
           
           <div className="relative">
              <input 
                type="text" 
                placeholder="Search patients..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-[#18191A] border border-slate-700/50 rounded-full py-2.5 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-blue-500 w-64 transition-colors"
              />
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-700/50">
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Name</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Email</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Age</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Phone</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm">Blood</th>
                <th className="pb-4 pt-2 px-4 text-slate-400 font-bold text-sm text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formattedPatients.map(patient => (
                <tr key={patient.id} className="border-b border-slate-700/30 hover:bg-[#252628] transition-colors group">
                  <td className="py-4 px-4">
                     <span className="text-white font-bold">{patient.name}</span>
                  </td>
                  <td className="py-4 px-4 text-slate-400">{patient.email}</td>
                  <td className="py-4 px-4 text-slate-400 font-medium">{patient.age}</td>
                  <td className="py-4 px-4 text-slate-400">{patient.phone}</td>
                  <td className="py-4 px-4">
                     <span className="bg-blue-500/10 px-3 py-1 rounded-full text-blue-400 font-bold text-xs border border-blue-500/20">{patient.bloodType}</span>
                  </td>
                  <td className="py-4 px-4 flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                     <button onClick={() => handleEdit(patient.id)} className="w-8 h-8 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors">
                       <FaEdit className="text-sm" />
                     </button>
                     <button onClick={() => handleDelete(patient.id)} className="w-8 h-8 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-colors">
                       <FaTrash className="text-sm" />
                     </button>
                  </td>
                </tr>
              ))}
              {formattedPatients.length === 0 && (
                 <tr>
                    <td colSpan="6" className="py-8 text-center text-slate-500">No patients found.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPatients;

