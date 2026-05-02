const SkeletonLoader = ({ className = '', height = 'h-32' }) => {
  return (
    <div className={`shimmer w-full rounded-2xl ${height} ${className}`}></div>
  );
};

export default SkeletonLoader;
