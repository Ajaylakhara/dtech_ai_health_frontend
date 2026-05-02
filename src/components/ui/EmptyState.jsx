import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ message = "No data available", className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 rounded-[2rem] glass border border-white/5 text-center ${className}`}>
      <FiInbox className="w-12 h-12 text-slate-500 mb-3 animate-pulse" />
      <p className="text-slate-400 font-medium">{message}</p>
    </div>
  );
};

export default EmptyState;
