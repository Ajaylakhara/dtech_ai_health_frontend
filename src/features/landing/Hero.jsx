import { motion } from 'framer-motion';
import { FaPlay, FaArrowRight, FaShieldAlt } from 'react-icons/fa';
// Using high-fidelity cloud assets for better reliability
const heroDoc = "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1200&auto=format&fit=crop";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Text Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-white/10 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary neon-shadow animate-pulse" />
            <span className="text-xs font-bold tracking-wider text-slate-300 uppercase">Next-Gen Healthcare Management</span>
          </motion.div>

          <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] mb-6 font-title tracking-tight">
            Elevate Your <br />
            <span className="text-primary truncate">Hospital</span> Workflow
          </h1>

          <p className="text-gray-400 text-lg lg:text-xl max-w-lg mb-10 leading-relaxed font-light">
            A seamless, AI-powered SaaS platform designed to streamline patient care, manage medical staff, and optimize hospital operations with real-time analytics.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-accent to-secondary text-white font-bold flex items-center justify-center gap-2 shadow-lg shadow-accent/20 transition-all hover:shadow-accent/40"
            >
              Get Started Now <FaArrowRight className="text-sm" />
            </motion.button>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full glass border border-white/10 text-white font-bold flex items-center justify-center gap-3 backdrop-blur-xl hover:bg-white/5 transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                <FaPlay className="text-[10px] ml-0.5" />
              </div>
              Watch Demo
            </motion.button>
          </div>

          <div className="mt-12 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-bg-dark bg-slate-800 overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-bg-dark bg-primary flex items-center justify-center text-bg-dark text-xs font-black">
                +4k
              </div>
            </div>
            <p className="text-slate-400 text-sm font-medium">Trusted by <span className="text-white font-bold">120+ Hospitals</span> worldwide</p>
          </div>
        </motion.div>

        {/* Visual Content */}
        <div className="relative z-0 h-full flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, x: 200, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative"
          >
            {/* Main Image with Glass Container */}
            <div className="relative z-10 glass p-4 rounded-[2.5rem] border-white/5 overflow-hidden">
              <img 
                src={heroDoc} 
                alt="Doctor" 
                className="w-full h-auto rounded-[2rem] object-cover shadow-2xl"
              />
            </div>

            {/* Floating Stats Cards */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 -left-12 z-20 glass p-5 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                  <FaShieldAlt className="text-primary text-xl" />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Active Doctors</p>
                  <p className="text-2xl font-black text-white">2,840</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute -bottom-6 -right-6 z-20 glass p-5 rounded-2xl border-white/10 shadow-2xl backdrop-blur-2xl"
            >
              <div className="flex flex-col gap-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">System Status</p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <p className="text-lg font-black text-white">99.9% Uptime</p>
                </div>
              </div>
            </motion.div>

            {/* Background Decorative Circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-white/5 rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] border border-white/5 rounded-full pointer-events-none" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;


