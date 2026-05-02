import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiPlay, FiCheckCircle } from 'react-icons/fi';
import Button from '../../components/ui/Button';

const DTechHero = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative pt-40 pb-20 overflow-hidden px-6">
      {/* Visual Ambient Glows */}
      <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] pointer-events-none select-none" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[120px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex flex-col items-start gap-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            <span className="text-xs font-bold text-blue-400 tracking-wide uppercase select-none">
              AI-Powered Health Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight">
            AI-Powered <br />
            <span className="text-gradient">Health Monitoring</span> System
          </h1>

          <p className="text-base text-slate-400 max-w-xl leading-relaxed">
            DTech AI is the next-generation health analytics and management SaaS. It aggregates, validates, and diagnoses health data instantly with unparalleled accuracy using state-of-the-art AI insights.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-2 w-full sm:w-auto">
            <Button
              variant="primary"
              className="w-full sm:w-auto gap-3 text-base px-8 py-3.5 group select-none"
              onClick={() => navigate('/signup')}
            >
              Get Started <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-all duration-200" />
            </Button>
            <Button
              variant="glass"
              className="w-full sm:w-auto gap-3 text-base px-8 py-3.5 select-none"
              onClick={() => navigate('/')}
            >
              <FiPlay className="w-4 h-4 fill-white" /> Live Demo
            </Button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-3 mt-4">
            <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <FiCheckCircle className="w-4 h-4 text-blue-400" /> Instant Diagnosis
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <FiCheckCircle className="w-4 h-4 text-blue-400" /> Fully Secured Data
            </span>
            <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
              <FiCheckCircle className="w-4 h-4 text-blue-400" /> Modern AI Insights
            </span>
          </div>
        </motion.div>

        {/* Right column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="lg:col-span-6 flex items-center justify-center relative select-none"
        >
          <div className="relative w-full aspect-square max-w-lg lg:max-w-none rounded-[2.5rem] overflow-hidden glass-strong border border-white/10 shadow-2xl backdrop-blur-3xl animate-float p-6 flex flex-col justify-between">
            {/* Mockup content */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center border border-blue-500/30 text-blue-400 font-bold text-lg select-none">
                  AI
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">AI Health Analysis</h4>
                  <p className="text-xs font-bold text-green-400">System online</p>
                </div>
              </div>
              <div className="text-xs bg-blue-500/10 text-blue-400 px-3 py-1.5 rounded-xl border border-blue-500/20 font-bold">
                DTech OS
              </div>
            </div>

            <div className="my-6 p-4 rounded-2xl bg-white/5 border border-white/5 flex flex-col gap-3">
              <div className="flex justify-between text-xs font-bold text-slate-400">
                <span>Data Accuracy</span>
                <span className="text-white">98.6%</span>
              </div>
              <div className="w-full h-2.5 bg-white/5 rounded-full overflow-hidden border border-white/10">
                <div className="w-[98.6%] h-full bg-gradient-to-r from-blue-500 to-purple-500 glow-blue rounded-full" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                <span className="text-xs font-bold text-slate-400 block mb-1">Total Users</span>
                <span className="text-2xl font-black text-white">1.2M+</span>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md">
                <span className="text-xs font-bold text-slate-400 block mb-1">Diagnosis Time</span>
                <span className="text-2xl font-black text-white">&lt; 1s</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DTechHero;
