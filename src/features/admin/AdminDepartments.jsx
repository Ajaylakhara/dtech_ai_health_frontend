import { useSelector, useDispatch } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import DepartmentsTable from './DepartmentsTable';
import { FaPlus } from 'react-icons/fa';
import { useEffect } from 'react';
import { fetchDepartments } from '../../redux/thunks/departmentThunks';

const AdminDepartments = () => {
  const { departments, status } = useSelector((state) => state.departments);
  const { setIsQuickActionOpen, handleEditDepartment } = useOutletContext();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchDepartments());
  }, [dispatch]);

  const onAddDeptClick = () => setIsQuickActionOpen(true);

  return (
    <div className="flex flex-col gap-6 mt-2 relative">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-2xl font-bold">Department Management</h1>
        <button 
          onClick={onAddDeptClick}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
        >
          <FaPlus className="text-xs" /> Add New Department
        </button>
      </div>

      {status === 'loading' ? (
        <div className="text-blue-400 p-8 font-bold">Loading Departments...</div>
      ) : (
        <DepartmentsTable departments={departments} onEdit={handleEditDepartment} />
      )}
    </div>
  );
};

export default AdminDepartments;

