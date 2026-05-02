import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import DoctorsTable from './DoctorsTable';
import { FaPlus } from 'react-icons/fa';
import { useEffect } from 'react';
import { fetchDoctors } from '../../redux/thunks/doctorThunks';

const AdminDoctors = () => {
  const { doctors, status } = useSelector((state) => state.doctors);
  const { setIsQuickActionOpen, handleEditDoctor } = useOutletContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDoctors());
  }, [dispatch]);

  const onAddDoctorClick = () => setIsQuickActionOpen(true);

  return (
    <div className="flex flex-col gap-6 mt-2 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl font-bold">Doctor Management</h1>
        <button 
          onClick={onAddDoctorClick}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          <FaPlus className="text-xs" /> Add New Doctor
        </button>
      </div>

      {status === 'loading' ? (
        <div className="text-blue-400 p-8 font-bold">Loading Doctors...</div>
      ) : (
        <DoctorsTable doctors={doctors} onEdit={handleEditDoctor} />
      )}
    </div>
  );
};

export default AdminDoctors;

