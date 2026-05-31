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
import TabbedModal from '../../components/ui/TabbedModal';

import { useLocation, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState(null);
  const [editingDoctor, setEditingDoctor] = useState(null);

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
      <div style={{ minHeight: '100vh', background: '#F4F7FB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: 24, fontWeight: 700, color: '#EB5757' }}>Access Denied: Admins Only</h2>
      </div>
    );
  }

  const allQuickActionTabs = [
    { id: 'add-doctor', label: 'Add Doctor', component: <DoctorsForm onSubmit={handleActionSuccess} />, tabMatch: 'doctors' },
    { id: 'add-patient', label: 'Add Patient', component: <PatientsForm onSuccess={handleActionSuccess} />, tabMatch: 'patients' },
    { id: 'book-appointment', label: 'Book Appointment', component: <AppointmentForm onSuccess={handleActionSuccess} />, tabMatch: 'all' },
    { id: 'add-department', label: 'Add Department', component: <DepartmentForm onSuccess={handleActionSuccess} />, tabMatch: 'departments' },
  ];

  const quickActionTabs = allQuickActionTabs.filter(tab => {
    if (['doctors', 'patients', 'departments'].includes(currentContext)) {
      return tab.tabMatch === currentContext;
    }
    return tab.tabMatch === 'all' || tab.tabMatch === 'doctors' || tab.tabMatch === 'departments';
  });

  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#F4F7FB',
        fontFamily: "'Inter', sans-serif",
        outline: 'none',
        border: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
        <Header adminName={userInfo?.name} onAddDoctorClick={() => setIsQuickActionOpen(true)} />
        
        {/* Scrollable Content */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '24px 24px 48px',
          background: '#F4F7FB',
        }}
          className="admin-scrollbar"
        >
          <Outlet context={{ setIsQuickActionOpen, handleEditDepartment, handleEditDoctor }} />
        </div>
      </main>

      {/* Quick Action Modal */}
      <TabbedModal isOpen={isQuickActionOpen} onClose={() => setIsQuickActionOpen(false)} tabs={quickActionTabs} />

      {/* Edit Item Modal */}
      <TabbedModal
        isOpen={isEditModalOpen}
        onClose={() => { setIsEditModalOpen(false); setEditingDepartment(null); setEditingDoctor(null); }}
        tabs={[
          editingDepartment && { id: 'edit-department', label: 'Edit Department', component: <DepartmentForm initialData={editingDepartment} onSuccess={handleActionSuccess} /> },
          editingDoctor && { id: 'edit-doctor', label: 'Edit Doctor', component: <DoctorsForm initialData={editingDoctor} onSubmit={handleActionSuccess} /> }
        ].filter(Boolean)}
      />

      <style>{`
        .admin-scrollbar::-webkit-scrollbar { width: 6px; }
        .admin-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .admin-scrollbar::-webkit-scrollbar-thumb { background: rgba(23,60,99,0.15); border-radius: 10px; }
        .admin-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(23,60,99,0.25); }
      `}</style>
    </div>
  );
};

export default AdminDashboard;
