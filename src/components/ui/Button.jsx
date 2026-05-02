import { motion } from 'framer-motion';

const Button = ({
  children,
  variant = 'primary',
  className = '',
  onClick,
  type = 'button',
  disabled = false,
  isLoading = false,
  href,
}) => {
  const base =
    'relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl font-bold tracking-wide transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:pointer-events-none overflow-hidden';

  const variants = {
    primary:
      'bg-gradient-to-r from-[#3B82F6] to-[#8B5CF6] text-white hover:opacity-90 hover:scale-[1.02] shadow-lg shadow-blue-500/20 hover:shadow-purple-500/30',
    secondary:
      'bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/25',
    glass:
      'bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20',
    outline:
      'bg-transparent border-2 border-[#3B82F6] text-[#3B82F6] hover:bg-[#3B82F6] hover:text-white',
    ghost:
      'bg-transparent text-slate-400 hover:text-white hover:bg-white/5',
    danger:
      'bg-red-500 text-white hover:bg-red-600 shadow-lg shadow-red-500/20',
  };

  const Comp = href ? 'a' : motion.button;
  const motionProps = href
    ? {}
    : { whileHover: { y: -2, scale: 1.02 }, whileTap: { scale: 0.97 } };

  return (
    <Comp
      type={href ? undefined : type}
      href={href}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${base} ${variants[variant] || variants.primary} ${className}`}
      {...motionProps}
    >
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 group-hover:translate-x-full"
        aria-hidden
      />
      {isLoading ? (
        <span className="w-5 h-5 border-2 border-current border-t-transparent rounded-full animate-spin" />
      ) : (
        children
      )}
    </Comp>
  );
};

export default Button;
