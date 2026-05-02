import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/thunks/authThunks';
import { FaEnvelope, FaLock, FaHospital } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { userInfo, status, error: reduxError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (userInfo) {
      navigate(userInfo.role === 'admin' ? '/admin-dashboard' : '/appointments');
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6 selection:bg-blue-500/30 overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="glass border border-white/10 rounded-[2.5rem] w-full max-w-4xl flex overflow-hidden min-h-[600px] backdrop-blur-3xl shadow-2xl relative z-10">
        
        {/* Left Side - Hero / Visual */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-[#3B82F6]/10 to-[#8B5CF6]/10 border-r border-white/5 p-12 flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#3B82F6]/5 to-transparent backdrop-blur-xl -z-10" />
          <div className="flex flex-col gap-8">
            <Link to="/home" className="flex items-center gap-2 group">
              <div className="p-2.5 rounded-xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6] text-white shadow-lg shadow-blue-500/20 group-hover:scale-110 transition-all duration-300">
                <FaHospital size={20} />
              </div>
              <span className="text-xl font-black tracking-tight text-white select-none">
                DTech<span className="text-gradient font-bold"> AI</span>
              </span>
            </Link>
            <div>
              <h2 className="text-4xl font-black mb-4 leading-tight">
                Modern <span className="text-gradient font-black">AI Healthcare</span> Portal
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Unlock instantaneous data diagnostics and advanced SaaS insights for a complete preventative healthcare system.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium">
            &copy; {new Date().getFullYear()} DTech AI Health. High Fidelity Enterprise Dashboard.
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400 font-medium">Please enter your details to sign in.</p>
          </div>

          {reduxError && (
            <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-400 rounded-2xl text-sm font-bold">
              {reduxError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1 select-none" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all font-semibold text-white placeholder-slate-500 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1 select-none" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all font-semibold text-white placeholder-slate-500 text-base"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={status === 'loading'}
              variant="primary"
              className="w-full py-4 text-base font-black uppercase tracking-wider mt-4"
            >
              {status === 'loading' ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-8 text-center select-none">
            <p className="text-slate-400 font-bold text-sm">
              Don’t have an account?{' '}
              <Link to="/signup" className="text-blue-400 hover:text-blue-300 hover:underline transition-all">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
