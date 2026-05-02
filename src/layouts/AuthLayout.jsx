import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex items-center justify-center font-sans antialiased overflow-hidden selection:bg-blue-500/30 p-4">
      <Outlet />
    </div>
  );
};

export default AuthLayout;
