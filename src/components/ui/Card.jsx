import { motion } from 'framer-motion';

const Card = ({ 
  children, 
  className = '', 
  variant = 'glass',
  animate = true 
}) => {
  const baseStyles = "rounded-[2rem] p-6 overflow-hidden transition-all duration-300";
  
  const variants = {
    glass: "glass border border-white/8 shadow-2xl shadow-black/20 backdrop-blur-md",
    dark: "bg-[#141D2F] border border-white/5 shadow-xl",
    glow: "bg-[#0B1120] border border-[#3B82F6]/30 shadow-lg shadow-[#3B82F6]/10",
  };

  const Wrapper = animate ? motion.div : 'div';
  const animationProps = animate ? {
    initial: { opacity: 0, y: 15 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  } : {};

  return (
    <Wrapper
      className={`${baseStyles} ${variants[variant] || variants.glass} ${className}`}
      {...animationProps}
    >
      {children}
    </Wrapper>
  );
};

export default Card;
