import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { FaUserPlus, FaCalendarCheck, FaStethoscope, FaHeartbeat } from 'react-icons/fa';
import SectionWrapper, { SectionHeading } from '../../components/ui/SectionWrapper';

const steps = [
  {
    icon: FaUserPlus,
    num: '01',
    title: 'Register',
    desc: 'Create your account and complete your health profile in under 2 minutes.',
    color: '#3B82F6',
  },
  {
    icon: FaCalendarCheck,
    num: '02',
    title: 'Book Appointment',
    desc: 'Browse verified specialists and book a slot that fits your schedule instantly.',
    color: '#8B5CF6',
  },
  {
    icon: FaStethoscope,
    num: '03',
    title: 'Get Treatment',
    desc: 'Consult in-person or via telehealth with our board-certified doctors.',
    color: '#3B82F6',
  },
  {
    icon: FaHeartbeat,
    num: '04',
    title: 'Track Health',
    desc: 'Monitor recovery, access medical history, and receive proactive follow-ups.',
    color: '#8B5CF6',
  },
];

const StepsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <SectionWrapper id="how-it-works" className="relative overflow-hidden">
      {/* BG radial */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-blue-500/4 blur-3xl" />
      </div>

      <SectionHeading
        label="How it works"
        title="Four Steps to Better Care"
        subtitle="From signup to recovery — a seamless experience for every patient."
      />

      <div ref={ref} className="relative">
        {/* Animated connecting line */}
        <div className="hidden lg:block absolute top-[34px] left-[calc(12.5%+32px)] right-[calc(12.5%+32px)] h-[2px] bg-white/5 rounded-full">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1.4, ease: 'easeOut', delay: 0.5 }}
            className="h-full origin-left rounded-full"
            style={{ background: 'linear-gradient(90deg, #3B82F6, #8B5CF6, #3B82F6, #8B5CF6)' }}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.25 + i * 0.15, duration: 0.55, ease: 'easeOut' }}
                className="flex flex-col items-center text-center group"
              >
                {/* Icon circle */}
                <div className="relative mb-8">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center relative z-10
                      transition-all duration-300 group-hover:scale-110"
                    style={{
                      background: `${step.color}18`,
                      border: `1.5px solid ${step.color}35`,
                    }}
                  >
                    <Icon className="text-2xl" style={{ color: step.color }} />
                  </div>
                  {/* Step badge */}
                  <span
                    className="absolute -top-2 -right-2 w-6 h-6 rounded-full text-[11px] font-black
                      flex items-center justify-center text-white shadow-md"
                    style={{ background: step.color }}
                  >
                    {i + 1}
                  </span>
                </div>

                <span className="text-xs font-black tracking-widest mb-2" style={{ color: step.color }}>
                  {step.num}
                </span>
                <h3
                  className="text-white font-black text-xl mb-3 leading-tight"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  {step.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-[200px]">{step.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default StepsSection;
