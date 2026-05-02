import { motion } from 'framer-motion';
import { FiCpu, FiTrendingUp, FiCheckSquare, FiShield } from 'react-icons/fi';
import Card from '../../components/ui/Card';

const DTechFeatures = () => {
  const features = [
    {
      title: 'AI Diagnosis',
      desc: 'Get instantaneous machine learning diagnostics for potential health indicators and early preventative alerts.',
      icon: <FiCpu className="w-6 h-6 text-blue-400" />,
    },
    {
      title: 'Reports & Analytics',
      desc: 'Sophisticated line, scatter, and pie visualizations of your recent health markers and trends over customized dates.',
      icon: <FiTrendingUp className="w-6 h-6 text-purple-400" />,
    },
    {
      title: 'Doctor Recommendation',
      desc: 'Automatically connects users with vetted specialists based on personalized AI health analysis matches.',
      icon: <FiCheckSquare className="w-6 h-6 text-blue-400" />,
    },
    {
      title: 'Secure Data',
      desc: 'Complete privacy with top-tier end-to-end cloud encryption, securing all personal records and histories.',
      icon: <FiShield className="w-6 h-6 text-purple-400" />,
    },
  ];

  return (
    <section id="features" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-gradient">
            Advanced Platform Features
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-snug tracking-tight">
            Comprehensive Medical Care <span className="text-gradient">Accelerated by AI</span>
          </h2>
          <p className="text-slate-400 leading-relaxed font-medium">
            Explore advanced SaaS capabilities designed for optimal medical processing.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <Card
              key={idx}
              variant="glass"
              animate={true}
              className="card-hover select-none group flex flex-col gap-6 items-start h-full p-8"
            >
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 border border-white/5 text-blue-400 group-hover:scale-110 transition-all duration-300">
                {feature.icon}
              </div>
              <div className="flex flex-col gap-2">
                <h3 className="text-xl font-black text-white group-hover:text-blue-400 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-sm font-medium text-slate-400 group-hover:text-slate-300 transition-colors duration-300 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DTechFeatures;
