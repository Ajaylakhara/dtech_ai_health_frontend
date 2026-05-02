import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaHospital, FaUsers, FaServer } from 'react-icons/fa';
import SectionWrapper, { SectionHeading } from '../../components/ui/SectionWrapper';

const stats = [
  {
    icon: FaUsers,
    value: 1200000,
    display: '1.2M+',
    label: 'Patients Served',
    color: '#3B82F6',
    desc: 'Across partner hospitals worldwide',
  },
  {
    icon: FaHospital,
    value: 450,
    display: '450+',
    label: 'Partner Hospitals',
    color: '#8B5CF6',
    desc: 'Trusted by leading health institutions',
  },
  {
    icon: FaServer,
    value: 99.9,
    display: '99.9%',
    label: 'System Uptime',
    color: '#3B82F6',
    desc: 'Enterprise-grade reliability, 24/7',
  },
];

const CountUp = ({ target, duration = 2200, suffix = '', isFloat = false }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isFloat ? parseFloat(start.toFixed(1)) : Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration, isFloat]);

  return (
    <span ref={ref}>
      {isFloat ? count.toFixed(1) : count.toLocaleString()}
      {suffix}
    </span>
  );
};

const StatsSection = () => (
  <SectionWrapper id="stats">
    <SectionHeading
      label="By the numbers"
      title="Trusted at Scale"
      subtitle="Real numbers from real hospitals using our platform every day."
    />

    <div className="grid md:grid-cols-3 gap-6">
      {stats.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.55 }}
            whileHover={{ y: -6, scale: 1.03 }}
            className="glass rounded-2xl p-8 border border-white/8 text-center
              hover:border-blue-500/30 hover:shadow-[0_0_32px_rgba(59,130,246,0.15)]
              transition-all duration-300 cursor-default group"
          >
            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl mx-auto mb-6 flex items-center justify-center
                transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${stat.color}18` }}
            >
              <Icon className="text-2xl" style={{ color: stat.color }} />
            </div>

            {/* Number */}
            <p
              className="text-5xl md:text-6xl font-black text-white mb-2"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              {stat.label === 'System Uptime' ? (
                <CountUp target={99.9} suffix="%" isFloat />
              ) : stat.label === 'Patients Served' ? (
                <>
                  <CountUp target={1200} suffix="" />
                  <span>K+</span>
                </>
              ) : (
                <CountUp target={stat.value} suffix="+" />
              )}
            </p>

            <p className="text-white font-bold text-lg mb-1">{stat.label}</p>
            <p className="text-slate-400 text-sm leading-relaxed">{stat.desc}</p>

            {/* Accent bar */}
            <div
              className="mt-6 h-0.5 w-14 mx-auto rounded-full transition-all duration-300 group-hover:w-24"
              style={{ background: `linear-gradient(90deg, ${stat.color}, transparent)` }}
            />
          </motion.div>
        );
      })}
    </div>
  </SectionWrapper>
);

export default StatsSection;
