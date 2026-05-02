import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FaHeartbeat, FaUserInjured, FaDollarSign, FaCog, FaQuestionCircle, FaUserMd, FaHospital, FaCalendarCheck, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { MdMessage, MdQueryStats } from 'react-icons/md';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navLinkClasses = ({ isActive }) =>
    `flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold tracking-wide select-none ${
      isActive
        ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/25'
        : 'text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1'
    }`;

  const actionButtonClasses = "flex items-center gap-4 px-5 py-3.5 rounded-2xl transition-all duration-300 font-bold tracking-wide text-slate-400 hover:bg-white/5 hover:text-white hover:translate-x-1 select-none w-full text-left";

  return (
    <aside className="w-68 bg-[#0B1120] border-r border-white/5 min-h-screen text-slate-300 flex flex-col pt-8 shrink-0 relative z-40 selection:bg-blue-500/30">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 pointer-events-none" />
      
      <div className="flex items-center gap-2 px-8 mb-12 select-none group">
        <div className="p-2.5 rounded-xl bg-gradient-to-tr from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
          <FaHeartbeat className="text-xl" />
        </div>
        <span className="text-white text-xl font-black tracking-tight">DTech<span className="text-gradient font-bold"> AI</span></span>
      </div>

      <nav className="flex-1 flex flex-col gap-2.5 px-4 overflow-y-auto custom-scrollbar relative">
        <NavLink to="/admin-dashboard" end className={navLinkClasses}>
          <span className="flex-shrink-0"><MdQueryStats className="text-xl" /></span>
          <span>Overview</span>
        </NavLink>

        <NavLink to="/admin-dashboard/doctors" className={navLinkClasses}>
          <span className="flex-shrink-0"><FaUserMd className="text-xl" /></span>
          <span>Doctors</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" className={navLinkClasses}>
          <span className="flex-shrink-0"><FaHospital className="text-xl" /></span>
          <span>Departments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/patients" className={navLinkClasses}>
          <span className="flex-shrink-0"><FaUserInjured className="text-xl" /></span>
          <span>Patients</span>
        </NavLink>

        <NavLink to="/admin-dashboard/appointments" className={navLinkClasses}>
          <span className="flex-shrink-0"><FaCalendarCheck className="text-xl" /></span>
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/messages" className={navLinkClasses}>
          <span className="flex-shrink-0"><MdMessage className="text-xl" /></span>
          <span>Messages</span>
        </NavLink>

        <NavLink to="/admin-dashboard/payment" className={navLinkClasses}>
          <span className="flex-shrink-0"><FaDollarSign className="text-xl" /></span>
          <span>Payment</span>
        </NavLink>

        <NavLink to="/profile" className={navLinkClasses}>
          <span className="flex-shrink-0"><FaUserCircle className="text-xl" /></span>
          <span>Profile</span>
        </NavLink>
      </nav>

      <div className="mt-auto px-4 pb-8 flex flex-col gap-2 border-t border-white/5 pt-5 relative">
         <button className={actionButtonClasses}>
          <span className="flex-shrink-0"><FaCog className="text-xl" /></span>
          <span>Settings</span>
        </button>
         <button className={actionButtonClasses}>
          <span className="flex-shrink-0"><FaQuestionCircle className="text-xl" /></span>
          <span>Support</span>
        </button>
         <button onClick={handleLogout} className={`${actionButtonClasses} text-red-400/90 hover:text-red-300 hover:bg-red-500/5`}>
          <span className="flex-shrink-0"><FaSignOutAlt className="text-xl" /></span>
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
