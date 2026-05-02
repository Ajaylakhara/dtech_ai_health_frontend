import { motion } from 'framer-motion';

/**
 * GlassCard — Reusable premium glass card.
 * Props:
 *  - children
 *  - className   — extra Tailwind classes
 *  - hover        — enable card-hover lift (default true)
 *  - glowColor    — hex or rgba string for border glow on hover
 *  - padding      — defaults to 'p-6'
 */
const GlassCard = ({
  children,
  className = '',
  hover = true,
  padding = 'p-6',
  delay = 0,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-40px' }}
    transition={{ delay, duration: 0.5, ease: 'easeOut' }}
    whileHover={hover ? { y: -6, scale: 1.02 } : undefined}
    className={`
      glass rounded-2xl border border-white/10
      hover:border-[#22c55e]/35
      hover:shadow-[0_0_28px_rgba(34,197,94,0.16)]
      transition-all duration-300
      ${padding}
      ${className}
    `}
  >
    {children}
  </motion.div>
);

export default GlassCard;
