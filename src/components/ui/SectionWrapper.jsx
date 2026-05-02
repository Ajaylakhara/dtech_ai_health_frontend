import { motion } from 'framer-motion';

// ── Label badge + heading + subtitle ─────────────────────────────────────────
export const SectionHeading = ({ label, title, subtitle }) => (
  <div className="text-center mb-14">
    {label && (
      <motion.p
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="inline-block px-4 py-1.5 rounded-full mb-5 text-xs font-bold uppercase tracking-widest
          bg-blue-500/10 text-blue-400 border border-blue-500/25"
      >
        {label}
      </motion.p>
    )}
    <motion.h2
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.08 }}
      className="text-4xl md:text-5xl font-black text-white leading-[1.15] mb-5 tracking-tight"
      style={{ fontFamily: 'var(--font-title)' }}
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.18 }}
        className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

// ── Section wrapper ───────────────────────────────────────────────────────────
const SectionWrapper = ({ children, className = '', id }) => (
  <section
    id={id}
    className={`w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 relative ${className}`}
  >
    {children}
  </section>
);

export default SectionWrapper;
