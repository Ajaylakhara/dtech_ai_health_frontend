import { Link } from 'react-router-dom';
import { FiActivity, FiTwitter, FiGithub, FiLinkedin } from 'react-icons/fi';

const DTechFooter = () => {
  return (
    <footer className="relative py-16 px-6 glass border-t border-white/5 select-none overflow-hidden mt-12">
      <div className="absolute top-0 left-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start justify-between gap-12">
        
        {/* Left section: Logo & Mission */}
        <div className="flex flex-col gap-4 max-w-sm">
          <Link to="/" className="flex items-center gap-2 select-none group">
            <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
              <FiActivity className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight text-white select-none">
              DTech<span className="text-gradient font-bold"> AI</span>
            </span>
          </Link>
          <p className="text-sm font-medium text-slate-400 leading-relaxed">
            DTech AI delivers highly robust machine learning predictions and diagnostics for optimal preventative healthcare at the absolute speed of thought.
          </p>
          <div className="flex items-center gap-4 mt-2">
            <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 transition-all">
              <FiTwitter className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 transition-all">
              <FiGithub className="w-5 h-5" />
            </a>
            <a href="#" className="p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 text-slate-300 transition-all">
              <FiLinkedin className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Right sections */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
          <div>
            <h5 className="text-sm font-black text-white tracking-wider uppercase mb-4">Explore</h5>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-slate-400">
              <li><a href="#home" className="hover:text-white transition-colors duration-200">Home</a></li>
              <li><a href="#features" className="hover:text-white transition-colors duration-200">Features</a></li>
              <li><a href="#stats" className="hover:text-white transition-colors duration-200">Stats</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-black text-white tracking-wider uppercase mb-4">Legal</h5>
            <ul className="flex flex-col gap-2.5 text-sm font-semibold text-slate-400">
              <li><a href="#" className="hover:text-white transition-colors duration-200">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors duration-200">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h5 className="text-sm font-black text-white tracking-wider uppercase mb-4">Contact</h5>
            <p className="text-sm font-semibold text-slate-400 leading-relaxed">
              support@dtech-ai.health<br />
              +1 (555) 489-3221
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center text-xs font-semibold text-slate-500">
        &copy; {new Date().getFullYear()} DTech AI Health. Premium SaaS designed for advanced medical insights.
      </div>
    </footer>
  );
};

export default DTechFooter;
