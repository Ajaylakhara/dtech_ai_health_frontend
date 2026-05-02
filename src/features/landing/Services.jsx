import { motion } from 'framer-motion';
import { FaUserMd, FaHospital, FaMicroscope, FaHeartbeat } from 'react-icons/fa';

const services = [
  {
    title: 'Staff Management',
    desc: 'Optimized scheduling and performance tracking for doctors and nurses.',
    icon: <FaUserMd />,
    color: 'bg-blue-500'
  },
  {
    title: 'Smart Analytics',
    desc: 'Real-time dashboards for hospital capacity and financial health.',
    icon: <FaHeartbeat />,
    color: 'bg-emerald-500'
  },
  {
    title: 'Patient Portal',
    desc: 'Secured medical records access and digital appointment booking.',
    icon: <FaHospital />,
    color: 'bg-primary'
  },
  {
    title: 'Lab Automation',
    desc: 'Automated test results delivery and inventory tracking.',
    icon: <FaMicroscope />,
    color: 'bg-accent'
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h4 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-accent font-black uppercase tracking-widest text-sm mb-4"
          >
            Capabilities
          </motion.h4>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-bg-dark text-4xl lg:text-5xl font-black font-title mb-6"
          >
            All-In-One Healthcare OS
          </motion.h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Replace fragmented legacy systems with a single unified cloud platform built for speed and reliability.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -12 }}
              className="p-10 rounded-[2.5rem] bg-slate-50 hover:bg-white transition-all shadow-sm hover:shadow-2xl border border-slate-100 group"
            >
              <div className={`w-14 h-14 rounded-2xl ${service.color} flex items-center justify-center text-white text-2xl mb-8 group-hover:scale-110 group-hover:rotate-6 transition-transform shadow-lg`}>
                {service.icon}
              </div>
              <h3 className="text-xl font-black text-bg-dark mb-4">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">
                {service.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;


