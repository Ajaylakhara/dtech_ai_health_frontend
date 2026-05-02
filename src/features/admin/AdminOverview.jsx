import { useSelector } from 'react-redux';
import { useOutletContext } from 'react-router-dom';
import DoctorsTable from './DoctorsTable';
import DepartmentsTable from './DepartmentsTable';
import AdminPatients from './AdminPatients';
import PatientVisitsChart from './PatientVisitsChart';
import ReportsList from './ReportsList';
import CalendarWidget from './CalendarWidget';
import RightSidebar from './RightSidebar';
import { FaPlus } from 'react-icons/fa';

const AdminOverview = () => {
  const { doctors } = useSelector((state) => state.doctors);
  const { departments } = useSelector((state) => state.departments);
  const {setIsQuickActionOpen } = useOutletContext();
  const onQuickAddClick = () => setIsQuickActionOpen(true);

  return (
    <div className="flex flex-col xl:flex-row gap-6 mt-2 relative">
      <div className="flex-1 flex flex-col gap-6 max-w-full min-w-0">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-white text-2xl font-bold">Dashboard Overview</h1>
            <button 
              onClick={onQuickAddClick}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-5 py-2 rounded-full font-bold shadow-lg shadow-blue-500/25 flex items-center gap-2 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200"
            >
              <FaPlus className="text-xs" /> Quick Add
            </button>
          </div>
          
          {/* Chart Block */}
          <PatientVisitsChart />
         
         {/* Bottom Block (Reports + Calendar) */}
         <div className="flex flex-col lg:flex-row gap-6">
           <ReportsList />
           <CalendarWidget />
         </div>
      </div>

      {/* Right Section */}
      <RightSidebar />
    </div>
  );
};

export default AdminOverview;

