import { motion } from 'framer-motion';

const Skeleton = ({ className = '' }) => (
  <div className={`bg-slate-700/20 overflow-hidden relative ${className}`}>
    <motion.div
      animate={{
        x: ['-100%', '100%']
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: 'linear'
      }}
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
    />
  </div>
);

const Loader = ({ variant = 'default', className = '' }) => {
  if (variant === 'card') {
    return (
      <div className={`glass rounded-[2rem] p-6 space-y-4 ${className}`}>
        <Skeleton className="h-48 w-full rounded-2xl" />
        <Skeleton className="h-6 w-3/4 rounded-lg" />
        <Skeleton className="h-4 w-full rounded-lg" />
        <Skeleton className="h-4 w-1/2 rounded-lg" />
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-center py-12 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="w-12 h-12 border-4 border-[#D3F843]/20 border-t-[#D3F843] rounded-full"
      />
    </div>
  );
};

export default Loader;
