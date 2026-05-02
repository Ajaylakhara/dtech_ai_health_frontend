import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import Button from '../../components/ui/Button';

const CTASection = () => (
  <section id="cta" className="w-full py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
    {/* Strong radial glow background */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full
        bg-blue-500/10 blur-[100px]" />
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full
        bg-blue-500/6 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[350px] h-[350px] rounded-full
        bg-purple-500/8 blur-3xl" />
    </div>

    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="max-w-4xl mx-auto text-center relative z-10
        rounded-3xl p-12 md:p-20 border border-white/10"
      style={{
        background:
          'linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(11,17,32,0.85) 50%, rgba(139,92,246,0.07) 100%)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* Top badge */}
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-8
          bg-blue-500/12 text-blue-400 border border-blue-500/25"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
        </span>
        Start Free — No Card Required
      </motion.span>

      {/* Headline */}
      <h2
        className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.15]"
        style={{ fontFamily: 'var(--font-title)' }}
      >
        Ready to Transform{' '}
        <span className="text-gradient">Healthcare?</span>
      </h2>

      {/* Sub-text */}
      <p className="text-slate-400 text-[17px] mb-12 max-w-2xl mx-auto leading-[1.75]">
        Join 450+ hospitals already transforming patient care with our AI-powered platform.
      </p>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/signup">
          <Button variant="primary" className="px-10 py-4 text-base">
            Start Free Trial <FaArrowRight className="text-sm" />
          </Button>
        </Link>
        <Button variant="glass" className="px-10 py-4 text-base">
          Book a Demo
        </Button>
      </div>

      {/* Trust items */}
      <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-400">
        {['✓  14-day free trial', '✓  Full features included', '✓  Cancel anytime'].map((t) => (
          <span key={t} className="text-slate-400 text-sm">{t}</span>
        ))}
      </div>
    </motion.div>
  </section>
);

export default CTASection;
