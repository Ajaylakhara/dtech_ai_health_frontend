import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MainLayout from './layouts/MainLayout';
import AuthLayout from './layouts/AuthLayout';

// Home loaded eagerly (critical path)
import Home from './pages/Home/Home';

// Lazy-loaded Public & Patient Views
const About = lazy(() => import('./pages/About/About'));
const Departments = lazy(() => import('./pages/Departments/Departments'));
const Appointments = lazy(() => import('./pages/Appointments/Appointments'));
const Profile = lazy(() => import('./pages/Profile/Profile'));
const AppointmentForm = lazy(() => import('./pages/Appointments/AppointmentForm'));

// Lazy-loaded Auth Views
const LoginForm = lazy(() => import('./pages/Auth/LoginForm'));
const SignupForm = lazy(() => import('./pages/Auth/SignupForm'));

// Lazy-loaded Dashboard Views
const AdminDashboard = lazy(() => import('./features/admin/AdminDashboard'));
const AdminOverview = lazy(() => import('./features/admin/AdminOverview'));
const AdminPatients = lazy(() => import('./features/admin/AdminPatients'));
const AdminMessages = lazy(() => import('./features/admin/AdminMessages'));
const AdminStatistics = lazy(() => import('./features/admin/AdminStatistics'));
const AdminPayment = lazy(() => import('./features/admin/AdminPayment'));
const AdminSettings = lazy(() => import('./features/admin/AdminSettings'));
const AdminSupport = lazy(() => import('./features/admin/AdminSupport'));
const AdminDoctors = lazy(() => import('./features/admin/AdminDoctors'));
const AdminDepartments = lazy(() => import('./features/admin/AdminDepartments'));
const AdminAppointments = lazy(() => import('./features/admin/AdminAppointments'));

// Premium loading fallback
const LoadingFallback = () => (
  <div style={{
    minHeight: '60vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    fontFamily: "'Inter', sans-serif",
  }}>
    <div
      className="animate-spin-custom"
      style={{
        width: 44,
        height: 44,
        borderRadius: '50%',
        border: '3px solid #E8EDF4',
        borderTopColor: '#173C63',
      }}
    />
    <span style={{ fontSize: 14, color: '#4A5568', fontWeight: 500 }}>Loading…</span>
  </div>
);

const AppRoutes = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const isLoggedIn = !!userInfo;
  const userRole = userInfo?.role;

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* ── Auth Layout (No Navbar/Footer) ── */}
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
        </Route>

        {/* ── Main Layout (Has Navbar & Footer) ── */}
        <Route element={<MainLayout />}>
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/about" element={<About />} />
          <Route path="/departments" element={<Departments />} />
          
          {/* Protected Patient Routes */}
          <Route
            path="/appointments"
            element={
              isLoggedIn && userRole === 'patient' ? (
                <Appointments />
              ) : isLoggedIn ? (
                <Navigate to="/admin-dashboard" replace />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/profile"
            element={
              isLoggedIn ? <Profile /> : <Navigate to="/login" replace />
            }
          />
          <Route
            path="/appointment"
            element={
              isLoggedIn ? <AppointmentForm /> : <Navigate to="/login" replace />
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
              <Navigate to="/" replace />
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
    </Suspense>
  );
};

export default AppRoutes;
