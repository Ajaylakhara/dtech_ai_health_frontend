import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDoctors } from '../../redux/thunks/doctorThunks';
import { fetchAllAppointments } from '../../redux/thunks/appointmentThunks';
import { fetchDepartments } from '../../redux/thunks/departmentThunks';
import DoctorsForm from '../../components/forms/DoctorsForm/doctorForm';
import AppointmentForm from '../../components/forms/AppointmentForm/AppointmentForm';
import DepartmentForm from '../../components/forms/DepartmentForm/DepartmentForm';
import PatientsForm from '../../components/forms/PatientsForm/PatientsForm';

import Sidebar from './Sidebar';
import Header from './Header';
import DoctorsTable from './DoctorsTable';
import PatientVisitsChart from './PatientVisitsChart';
import ReportsList from './ReportsList';
import CalendarWidget from './CalendarWidget';
import RightSidebar from './RightSidebar';
import TabbedModal from '../../components/ui/TabbedModal';
import { FaPlus } from 'react-icons/fa';

import { useLocation, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);

  // Derive current "context" from path for the Quick Action modal
  const path = location.pathname;
  const currentContext = 
    path.includes('/doctors') ? 'doctors' : 
    path.includes('/patients') ? 'patients' : 
    path.includes('/departments') ? 'departments' : 
    path.includes('/appointments') ? 'appointments' : 'all';

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') return;
    dispatch(fetchDoctors());
    dispatch(fetchAllAppointments());
    dispatch(fetchDepartments());
  }, [dispatch, userInfo]);

  const handleActionSuccess = () => {
    dispatch(fetchDoctors());
    dispatch(fetchAllAppointments());
    dispatch(fetchDepartments());
    setIsQuickActionOpen(false);
    setIsEditModalOpen(false);
    setEditingDepartment(null);
    setEditingDoctor(null);
  };

  const handleEditDepartment = (dept) => {
    setEditingDepartment(dept);
    setIsEditModalOpen(true);
  };

  const handleEditDoctor = (doc) => {
    setEditingDoctor(doc);
    setIsEditModalOpen(true);
  };

  if (!userInfo || userInfo.role !== 'admin') {
    return (
      <div className="min-h-screen bg-[#18191A] flex items-center justify-center">
        <h2 className="text-2xl font-bold text-red-500">Access Denied: Admins Only</h2>
      </div>
    );
  }

  const allQuickActionTabs = [
    {
      id: 'add-doctor',
      label: 'Add Doctor',
      component: <DoctorsForm onSubmit={handleActionSuccess} />,
      tabMatch: 'doctors'
    },
    {
      id: 'add-patient',
      label: 'Add Patient',
      component: <PatientsForm onSuccess={handleActionSuccess} />,
      tabMatch: 'patients'
    },
    {
      id: 'book-appointment',
      label: 'Book Appointment',
      component: <AppointmentForm onSuccess={handleActionSuccess} />,
      tabMatch: 'all' 
    },
    {
      id: 'add-department',
      label: 'Add Department',
      component: <DepartmentForm onSuccess={handleActionSuccess} />,
      tabMatch: 'departments'
    },
  ];

  const quickActionTabs = allQuickActionTabs.filter(tab => {
    if (['doctors', 'patients', 'departments'].includes(currentContext)) {
      return tab.tabMatch === currentContext;
    }
    return tab.tabMatch === 'all' || tab.tabMatch === 'doctors' || tab.tabMatch === 'departments'; // Show more options in overview
  });

  return (
    <div className="flex min-h-screen bg-[#151618] font-sans selection:bg-[#D3F843] selection:text-black">
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header 
          adminName={userInfo?.name} 
          onAddDoctorClick={() => setIsQuickActionOpen(true)} 
        />
        
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto px-1 lg:px-4 pb-8 custom-scrollbar">
           <Outlet context={{ setIsQuickActionOpen, handleEditDepartment, handleEditDoctor }} />
        </div>
      </main>

      {/* Quick Action Modal */}
      <TabbedModal 
        isOpen={isQuickActionOpen} 
        onClose={() => setIsQuickActionOpen(false)} 
        tabs={quickActionTabs}
      />

      {/* Edit Item Modal */}
      <TabbedModal 
        isOpen={isEditModalOpen} 
        onClose={() => {
           setIsEditModalOpen(false);
           setEditingDepartment(null);
           setEditingDoctor(null);
        }} 
        tabs={[
          editingDepartment && {
            id: 'edit-department',
            label: 'Edit Department',
            component: <DepartmentForm initialData={editingDepartment} onSuccess={handleActionSuccess} />,
          },
          editingDoctor && {
            id: 'edit-doctor',
            label: 'Edit Doctor',
            component: <DoctorsForm initialData={editingDoctor} onSubmit={handleActionSuccess} />,
          }
        ].filter(Boolean)}
      />

      {/* Quick global CSS tweaks for scrollbars */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 8px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #2A2B2D; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #333538; }

        /* Force Forms into dark mode styling */
        .dark-form-wrapper input, .dark-form-wrapper select, .dark-form-wrapper textarea {
           background-color: #18191A !important;
           border-color: #333538 !important;
           color: white !important;
        }
        .dark-form-wrapper label {
           color: #8f95a0 !important;
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
