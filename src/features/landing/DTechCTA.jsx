import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import Button from '../../components/ui/Button';

const DTechCTA = () => {
  const navigate = useNavigate();

  return (
    <section className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-4xl mx-auto rounded-[2.5rem] p-10 md:p-16 border border-white/5 bg-gradient-to-tr from-blue-500/10 to-purple-600/10 backdrop-blur-3xl shadow-2xl text-center flex flex-col items-center gap-6 select-none relative z-10">
        <span className="text-xs font-black uppercase tracking-widest text-gradient">
          Get Started Today
        </span>
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-snug tracking-tight">
          Ready to <span className="text-gradient">Transform</span> Healthcare?
        </h2>
        <p className="text-slate-400 max-w-xl font-medium leading-relaxed">
          Unlock state-of-the-art diagnostic algorithms and completely encrypted medical SaaS insights instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
          <Button
            variant="primary"
            className="w-full sm:w-auto gap-3 text-base px-8 py-3.5 group select-none"
            onClick={() => navigate('/signup')}
          >
            Get Started Now <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-200" />
          </Button>
          <Button
            variant="glass"
            className="w-full sm:w-auto text-base px-8 py-3.5 select-none"
            onClick={() => navigate('/')}
          >
            Schedule Demo
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DTechCTA;
