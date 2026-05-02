import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';

const DTechStats = () => {
  const stats = [
    { label: 'Platform Active Users', value: '1.2M+' },
    { label: 'Diagnosis Accuracy', value: '98.6%' },
    { label: 'Specialists Network', value: '12,500+' },
    { label: 'AI Computations Daily', value: '45M+' },
  ];

  return (
    <section id="stats" className="relative py-20 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 select-none">
          {stats.map((stat, idx) => (
            <Card
              key={idx}
              variant="glow"
              animate={true}
              className="p-8 text-center flex flex-col items-center justify-center gap-3 backdrop-blur-xl border border-white/5"
            >
              <h3 className="text-4xl sm:text-5xl font-black tracking-tight text-gradient-blue">
                {stat.value}
              </h3>
              <p className="text-sm font-bold tracking-wide text-slate-400">
                {stat.label}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DTechStats;
