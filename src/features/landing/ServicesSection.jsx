import { motion } from 'framer-motion';
import {
  FaCalendarCheck, FaUserInjured, FaUserMd,
  FaFileInvoiceDollar, FaPills, FaChartBar, FaArrowRight,
} from 'react-icons/fa';
import SectionWrapper, { SectionHeading } from '../../components/ui/SectionWrapper';

const services = [
  {
    icon: FaCalendarCheck,
    title: 'Appointments',
    desc: 'Smart scheduling with automated reminders and intelligent conflict resolution.',
    color: '#3B82F6',
  },
  {
    icon: FaUserInjured,
    title: 'Patient Management',
    desc: 'Complete patient profiles, EHR records, and real-time status tracking.',
    color: '#8B5CF6',
  },
  {
    icon: FaUserMd,
    title: 'Doctors & Staff',
    desc: 'Manage staff, shifts, specializations, and performance metrics seamlessly.',
    color: '#3B82F6',
  },
  {
    icon: FaFileInvoiceDollar,
    title: 'Billing & Finance',
    desc: 'Automated invoicing, insurance claims processing, and payment tracking.',
    color: '#8B5CF6',
  },
  {
    icon: FaPills,
    title: 'Pharmacy',
    desc: 'Inventory management, prescription tracking, and dispensing workflows.',
    color: '#3B82F6',
  },
  {
    icon: FaChartBar,
    title: 'Analytics',
    desc: 'AI-driven insights, custom dashboards, and exportable performance reports.',
    color: '#8B5CF6',
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 36 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

const ServicesSection = () => (
  <SectionWrapper id="services">
    <SectionHeading
      label="What we offer"
      title="Everything Your Hospital Needs"
      subtitle="Integrated modules built for modern, high-efficiency healthcare workflows."
    />

    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
    >
      {services.map((s) => {
        const Icon = s.icon;
        return (
          <motion.div
            key={s.title}
            variants={item}
            whileHover={{ scale: 1.03, y: -8 }}
            className="group relative rounded-2xl p-7 cursor-pointer overflow-hidden
              bg-[#141D2F] border border-white/8
              hover:border-blue-500/35 hover:shadow-[0_0_28px_rgba(59,130,246,0.14)]
              transition-all duration-300"
          >
            {/* Top colour line on hover */}
            <div
              className="absolute top-0 left-0 w-full h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: `linear-gradient(90deg, transparent, ${s.color}, transparent)` }}
            />

            {/* Corner accent */}
            <div
              className="absolute -top-12 -right-12 w-24 h-24 rounded-full opacity-0 group-hover:opacity-10 transition-all duration-500 blur-xl"
              style={{ background: s.color }}
            />

            {/* Icon */}
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center mb-5
                transition-transform duration-300 group-hover:scale-110"
              style={{ background: `${s.color}18` }}
            >
              <Icon className="text-2xl" style={{ color: s.color }} />
            </div>

            <h3
              className="text-white font-bold text-xl mb-3 leading-snug"
              style={{ fontFamily: 'var(--font-title)' }}
            >
              {s.title}
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">{s.desc}</p>

            <div
              className="flex items-center gap-2 text-sm font-bold transition-all duration-300"
              style={{ color: s.color }}
            >
              Learn more
              <FaArrowRight className="text-xs group-hover:translate-x-2 transition-transform duration-200" />
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  </SectionWrapper>
);

export default ServicesSection;
