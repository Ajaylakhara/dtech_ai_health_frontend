import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../redux/thunks/authThunks';
import { FaUser, FaEnvelope, FaLock, FaHospital } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'patient',
  });
  const { userInfo, status, error: reduxError } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    dispatch(register({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      role: formData.role,
    }));
  };

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        navigate(userInfo.role === 'admin' ? '/admin-dashboard' : '/appointments');
      }, 1500);
    }
  }, [userInfo, navigate]);

  return (
    <div className="min-h-screen bg-[#0B1120] flex items-center justify-center p-6 selection:bg-blue-500/30 overflow-hidden relative">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="glass border border-white/10 rounded-[2.5rem] w-full max-w-5xl flex overflow-hidden min-h-[600px] backdrop-blur-3xl shadow-2xl relative z-10">
        
        {/* Left Side - Form */}
        <div className="w-full lg:w-1/2 p-10 md:p-14 flex flex-col justify-center">
          <div className="mb-8">
            <h2 className="text-3xl font-black text-white mb-2">Join the Future.</h2>
            <p className="text-slate-400 font-medium">Create your DTech AI account today.</p>
          </div>

          {reduxError && (
            <div className="mb-6 p-4 bg-red-500/10 border-l-4 border-red-500 text-red-400 rounded-2xl text-sm font-bold animate-shake">
              {reduxError}
            </div>
          )}
          {userInfo && (
            <div className="mb-6 p-4 bg-green-500/10 border-l-4 border-green-500 text-green-400 rounded-2xl text-sm font-bold">
              Welcome aboard! Registration successful. Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Full Name</label>
              <div className="relative">
                <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all font-semibold text-white placeholder-slate-500 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Email Address</label>
              <div className="relative">
                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all font-semibold text-white placeholder-slate-500 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all font-semibold text-white placeholder-slate-500 text-base"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-300 ml-1">Confirm Password</label>
              <div className="relative">
                <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/60 transition-all font-semibold text-white placeholder-slate-500 text-base"
                  required
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-4">
              <Button
                type="submit"
                disabled={status === 'loading'}
                variant="primary"
                className="w-full py-4 text-base font-black uppercase tracking-wider"
              >
                {status === 'loading' ? 'Creating Account...' : 'Get Started'}
              </Button>
            </div>
          </form>

          <div className="mt-8 text-center select-none">
            <p className="text-slate-400 font-bold text-sm">
              Already a member?{' '}
              <Link to="/" className="text-blue-400 hover:text-blue-300 hover:underline transition-all">
                Login here
              </Link>
            </p>
          </div>
        </div>

        {/* Right Side - Hero / Visual */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-tr from-[#3B82F6]/10 to-[#8B5CF6]/10 border-l border-white/5 p-12 flex-col justify-between text-white relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-[#8B5CF6]/5 to-transparent backdrop-blur-xl -z-10" />
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
                Empowering <span className="text-gradient font-black">Healthcare.</span>
              </h2>
              <p className="text-slate-400 font-medium leading-relaxed">
                Unlock instantaneous data diagnostics and advanced SaaS insights for a complete preventative healthcare system.
              </p>
            </div>
          </div>
          <div className="text-xs text-slate-500 font-medium leading-relaxed">
            All your information is secured by enterprise-grade cloud encryption and industry standards.
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
