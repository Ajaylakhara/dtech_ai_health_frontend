import { useState, useEffect } from 'react';
import { FaSearch, FaBell, FaChevronDown } from 'react-icons/fa';
import Adminimg from "../../assets/Images/Adminimg.jpg";
import { motion, AnimatePresence } from 'framer-motion';

const Header = ({ adminName, onAddDoctorClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  // Debounced search simulator
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchValue.trim()) {
        console.log(`Debounced search for: ${searchValue}`);
      }
    }, 500);
    return () => clearTimeout(handler);
  }, [searchValue]);

  const notifications = [
    { id: 1, title: 'System Alert', desc: 'New user registered successfully.' },
    { id: 2, title: 'AI Completion', desc: 'Predictive diagnostic computation complete.' },
    { id: 3, title: 'Database Sync', desc: 'Secure encryption keys refreshed.' },
  ];

  return (
    <header className="flex items-center justify-between py-5 px-6 border-b border-white/5 relative bg-[#0B1120]/60 backdrop-blur-xl">
      {/* Left side: Heading */}
      <div className="flex items-center gap-4">
        <h2 className="text-white text-xl font-black tracking-tight hidden sm:block">
          Enterprise <span className="text-gradient">Management</span>
        </h2>
      </div>

      {/* Right side: Actions, Search, Notifications, Avatar */}
      <div className="flex items-center gap-5">
        <button 
          onClick={onAddDoctorClick}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2.5 rounded-full font-bold text-sm shadow-lg shadow-blue-500/25 hover:opacity-90 transition-all active:scale-95 flex items-center gap-2 select-none"
        >
          Add New <span className="text-xs">+</span>
        </button>

        {/* Debounced Search */}
        <div className="relative hidden md:flex items-center">
          <FaSearch className="absolute left-4 text-slate-500 text-sm select-none" />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search records..."
            className="pl-11 pr-4 py-2.5 w-64 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all font-semibold text-white placeholder-slate-500 text-sm"
          />
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="w-10 h-10 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center text-slate-300 hover:bg-white/10 hover:border-white/20 transition-all relative select-none"
          >
            <FaBell className="text-sm text-slate-300" />
            <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-[1.5px] border-[#0B1120]"></span>
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-3 w-80 glass border border-white/10 rounded-2xl p-5 shadow-2xl backdrop-blur-2xl z-50 text-left select-none"
              >
                <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                  <h4 className="text-sm font-black text-white">Notifications</h4>
                  <span className="text-xs font-bold text-blue-400">3 Unread</span>
                </div>
                <div className="flex flex-col gap-3">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-3 rounded-xl hover:bg-white/5 border border-transparent hover:border-white/5 transition-all duration-300">
                      <h5 className="text-xs font-black text-white">{n.title}</h5>
                      <p className="text-xs font-medium text-slate-400 leading-relaxed mt-1">{n.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Avatar section */}
        <div className="flex items-center gap-3 pl-2 select-none">
          <img src={Adminimg} alt="Admin" className="w-10 h-10 rounded-xl object-cover ring-2 ring-white/5" />
          <div className="hidden md:block text-left">
            <p className="text-white text-sm font-bold leading-tight">{adminName || 'Admin'}</p>
            <p className="text-slate-500 text-[11px] font-medium leading-tight">Platform Specialist</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
