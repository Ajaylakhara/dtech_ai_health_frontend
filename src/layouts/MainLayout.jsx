import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0B1120] text-slate-100 font-sans antialiased overflow-hidden selection:bg-blue-500/30">
      <Navbar />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
