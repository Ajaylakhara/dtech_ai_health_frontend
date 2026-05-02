import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Public & Patient Views
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Departments from './pages/Departments/Departments';
import Appointments from './pages/Appointments/Appointments';
import Profile from './pages/Profile/Profile';
import AppointmentForm from './pages/Appointments/AppointmentForm';

// Auth Views
import LoginForm from './pages/Auth/LoginForm';
import SignupForm from './pages/Auth/SignupForm';

// Dashboard Views
import AdminDashboard from './features/admin/AdminDashboard';
import AdminOverview from './features/admin/AdminOverview';
import AdminPatients from './features/admin/AdminPatients';
import AdminMessages from './features/admin/AdminMessages';
import AdminStatistics from './features/admin/AdminStatistics';
import AdminPayment from './features/admin/AdminPayment';
import AdminSettings from './features/admin/AdminSettings';
import AdminSupport from './features/admin/AdminSupport';
import AdminDoctors from './features/admin/AdminDoctors';
import AdminDepartments from './features/admin/AdminDepartments';
import AdminAppointments from './features/admin/AdminAppointments';

const AppRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isLoggedIn = !!userInfo;
  const userRole = userInfo?.role;

  return (
    <Routes>
      {/* ── Auth Layout (No Navbar/Footer) ── */}
      <Route element={<AuthLayout />}>
        <Route path="/" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
      </Route>

      {/* ── Main Layout (Has Navbar & Footer) ── */}
      <Route element={<MainLayout />}>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/departments" element={<Departments />} />
        
        {/* Protected Patient Routes */}
        <Route
          path="/appointments"
          element={
            isLoggedIn && userRole === 'patient' ? (
              <Appointments />
            ) : (
              <Navigate to="/home" replace />
            )
          }
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? <Profile /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/appointment"
          element={
            isLoggedIn ? <AppointmentForm /> : <Navigate to="/" replace />
          }
        />
      </Route>

      {/* Legacy Redirect */}
      <Route
        path="/user-dashboard"
        element={<Navigate to="/appointments" replace />}
      />

      {/* ── Dashboard Layout (Has Sidebar & Topbar) ── */}
      <Route
        path="/admin-dashboard"
        element={
          isLoggedIn && userRole === 'admin' ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/home" replace />
          )
        }
      >
        <Route index element={<AdminOverview />} />
        <Route path="doctors" element={<AdminDoctors />} />
        <Route path="departments" element={<AdminDepartments />} />
        <Route path="patients" element={<AdminPatients />} />
        <Route path="appointments" element={<AdminAppointments />} />
        <Route path="messages" element={<AdminMessages />} />
        <Route path="statistics" element={<AdminStatistics />} />
        <Route path="payment" element={<AdminPayment />} />
        <Route path="settings" element={<AdminSettings />} />
        <Route path="support" element={<AdminSupport />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
