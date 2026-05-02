import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-accent to-secondary opacity-95" />
      <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-white/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      
      <div className="container max-w-7xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.95 }}
           whileInView={{ opacity: 1, scale: 1 }}
           className="max-w-3xl mx-auto"
        >
          <h2 className="text-5xl lg:text-7xl font-black font-title text-white mb-8 leading-tight">
            Ready to <span className="text-primary truncate">Reinvent</span> Your Clinic?
          </h2>
          <p className="text-white/80 text-xl mb-12 leading-relaxed font-medium">
            Join 12,000+ medical professionals already using our platform to save time and save lives. Get started with a 14-day free trial.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 rounded-full bg-white text-bg-dark font-black text-lg shadow-2xl hover:bg-primary transition-all flex items-center justify-center gap-3"
            >
              Start Free Trial <FaArrowRight className="text-base" />
            </motion.button>
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-12 py-5 rounded-full glass border border-white/30 text-white font-black text-lg backdrop-blur-xl hover:bg-white/10 transition-all"
            >
              Book a Demo
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;


