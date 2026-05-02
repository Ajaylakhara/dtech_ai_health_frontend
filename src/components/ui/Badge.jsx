import { motion } from 'framer-motion';

const Badge = ({ 
  children, 
  variant = 'success', 
  className = '',
  ping = false
}) => {
  const variants = {
    success: 'bg-green-500/10 text-green-400 border-green-500/20',
    warning: 'bg-orange-500/10 text-orange-400 border-orange-500/20',
    danger: 'bg-red-500/10 text-red-400 border-red-500/20',
    info: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
    purple: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    premium: 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-none'
  };

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${variants[variant]} ${className}`}>
      {ping && (
        <span className="relative flex h-2 w-2">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${
            variant === 'success' ? 'bg-green-500' : 
            variant === 'purple' ? 'bg-purple-500' : 'bg-current'
          }`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${
            variant === 'success' ? 'bg-green-500' : 
            variant === 'purple' ? 'bg-purple-500' : 'bg-current'
          }`} />
        </span>
      )}
      {children}
    </div>
  );
};

export default Badge;
