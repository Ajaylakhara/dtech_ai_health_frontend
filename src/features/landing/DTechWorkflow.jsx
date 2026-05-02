import { motion } from 'framer-motion';
import { FiUserPlus, FiCalendar, FiActivity, FiFileText } from 'react-icons/fi';

const DTechWorkflow = () => {
  const steps = [
    {
      id: '01',
      title: 'Register Account',
      desc: 'Sign up in seconds. Enter your general health background or integrate your data instantly.',
      icon: <FiUserPlus className="w-6 h-6 text-blue-400" />,
    },
    {
      id: '02',
      title: 'Schedule Appointment',
      desc: 'Book a consultation with top-tier verified medical specialists matching your unique health profile.',
      icon: <FiCalendar className="w-6 h-6 text-purple-400" />,
    },
    {
      id: '03',
      title: 'AI Treatment',
      desc: 'Our advanced machine learning engine assists doctors to generate highly personalized treatments.',
      icon: <FiActivity className="w-6 h-6 text-blue-400" />,
    },
    {
      id: '04',
      title: 'Real-time Results',
      desc: 'Access clean diagnostic summaries, reports, and predictive analytics in a cohesive dashboard.',
      icon: <FiFileText className="w-6 h-6 text-purple-400" />,
    },
  ];

  return (
    <section id="workflow" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-gradient">
            Process & Steps
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-snug tracking-tight">
            How <span className="text-gradient">DTech AI</span> Functions
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            A simplified, highly robust roadmap to getting optimal medical insights.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 select-none">
          {steps.map((step, idx) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="flex flex-col items-start gap-5 p-7 bg-white/5 border border-white/5 rounded-[2rem] hover:bg-white/10 hover:border-white/10 transition-all duration-300 relative group"
            >
              <div className="absolute -top-3 -right-3 text-4xl font-black opacity-10 group-hover:opacity-20 text-blue-400 transition-opacity">
                {step.id}
              </div>
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 border border-white/5 text-blue-400 group-hover:scale-110 transition-all">
                {step.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-all leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DTechWorkflow;
