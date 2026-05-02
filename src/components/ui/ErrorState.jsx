import { FiAlertCircle } from 'react-icons/fi';
import Button from './Button';

const ErrorState = ({ message = "Something went wrong. Please try again.", onRetry, className = "" }) => {
  return (
    <div className={`flex flex-col items-center justify-center p-8 rounded-[2rem] glass border border-red-500/10 text-center ${className}`}>
      <FiAlertCircle className="w-12 h-12 text-red-400 mb-3" />
      <p className="text-slate-300 font-medium mb-4">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Retry Now
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
