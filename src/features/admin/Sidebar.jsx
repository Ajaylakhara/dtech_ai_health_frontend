import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { FaUserInjured, FaDollarSign, FaCog, FaQuestionCircle, FaUserMd, FaHospital, FaCalendarCheck, FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import { MdMessage, MdQueryStats } from 'react-icons/md';
import logo from '../../assets/MediCare_logo.png';

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const navLinkStyle = ({ isActive }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: '12px 16px',
    borderRadius: 12,
    transition: 'all 0.25s',
    fontWeight: 600,
    fontSize: 14,
    textDecoration: 'none',
    cursor: 'pointer',
    color: isActive ? '#173C63' : '#6B7A8D',
    background: isActive ? 'rgba(23,60,99,0.08)' : 'transparent',
    boxShadow: 'none',
    userSelect: 'none',
  });

  const actionBtn = {
    display: 'flex', alignItems: 'center', gap: 12,
    padding: '12px 16px', borderRadius: 12,
    transition: 'all 0.25s', fontWeight: 600, fontSize: 14,
    color: '#6B7A8D', background: 'transparent',
    border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left',
    userSelect: 'none',
  };

  return (
    <aside style={{
      width: 240,
      background: '#FFFFFF',
      borderRight: '1px solid #E8EDF4',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      paddingTop: 28,
      flexShrink: 0,
      position: 'relative',
      zIndex: 40,
      boxShadow: '4px 0 24px rgba(23,60,99,0.02)'
    }}>

      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '0 24px', marginBottom: 36,
        userSelect: 'none', position: 'relative', zIndex: 1,
      }}>
        <img src={logo} alt="MediCare Logo" style={{ width: 80, height: 80, objectFit: 'contain', flexShrink: 0 }} />
      </div>

      {/* Section label */}
      <div style={{ padding: '0 24px', marginBottom: 8, position: 'relative', zIndex: 1 }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#9DAAB8', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Main Menu
        </span>
      </div>

      {/* Nav Links */}
      <nav style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 4, padding: '0 16px', overflowY: 'auto', position: 'relative', zIndex: 1 }}>
        <NavLink to="/admin-dashboard" end style={navLinkStyle}>
          <MdQueryStats style={{ fontSize: 18, flexShrink: 0 }} />
          <span>Overview</span>
        </NavLink>

        <NavLink to="/admin-dashboard/doctors" style={navLinkStyle}>
          <FaUserMd style={{ fontSize: 16, flexShrink: 0 }} />
          <span>Doctors</span>
        </NavLink>

        <NavLink to="/admin-dashboard/departments" style={navLinkStyle}>
          <FaHospital style={{ fontSize: 16, flexShrink: 0 }} />
          <span>Departments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/patients" style={navLinkStyle}>
          <FaUserInjured style={{ fontSize: 16, flexShrink: 0 }} />
          <span>Patients</span>
        </NavLink>

        <NavLink to="/admin-dashboard/appointments" style={navLinkStyle}>
          <FaCalendarCheck style={{ fontSize: 16, flexShrink: 0 }} />
          <span>Appointments</span>
        </NavLink>

        <NavLink to="/admin-dashboard/messages" style={navLinkStyle}>
          <MdMessage style={{ fontSize: 18, flexShrink: 0 }} />
          <span>Messages</span>
        </NavLink>

        <NavLink to="/admin-dashboard/payment" style={navLinkStyle}>
          <FaDollarSign style={{ fontSize: 16, flexShrink: 0 }} />
          <span>Payment</span>
        </NavLink>

        <NavLink to="/profile" style={navLinkStyle}>
          <FaUserCircle style={{ fontSize: 16, flexShrink: 0 }} />
          <span>Profile</span>
        </NavLink>
      </nav>

      {/* Bottom Actions */}
      <div style={{
        borderTop: '1px solid #E8EDF4',
        padding: '16px 16px 24px',
        display: 'flex', flexDirection: 'column', gap: 2,
        position: 'relative', zIndex: 1,
      }}>
        <span style={{ fontSize: 10, fontWeight: 700, color: '#9DAAB8', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '0 8px', marginBottom: 6 }}>
          Settings
        </span>
        <NavLink to="/admin-dashboard/settings" style={navLinkStyle}>
          <FaCog style={{ fontSize: 16, flexShrink: 0 }} />
          <span>Settings</span>
        </NavLink>
        <NavLink to="/admin-dashboard/support" style={navLinkStyle}>
          <FaQuestionCircle style={{ fontSize: 16, flexShrink: 0 }} />
          <span>Support</span>
        </NavLink>
        <button
          onClick={handleLogout}
          style={{ ...actionBtn, color: '#EB5757', marginTop: 4 }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(235,87,87,0.08)'; e.currentTarget.style.color = '#C92A2A'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#EB5757'; }}
        >
          <FaSignOutAlt style={{ fontSize: 16, flexShrink: 0 }} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
