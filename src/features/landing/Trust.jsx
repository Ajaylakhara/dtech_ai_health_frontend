import { motion } from 'framer-motion';

const stats = [
  { label: 'Total Patients', value: '1.2M+' },
  { label: 'Hospitals Joined', value: '450+' },
  { label: 'Precision Level', value: '98%' },
  { label: 'Data Security', value: 'AES-256' },
];

const Trust = () => {
  return (
    <section className="py-20 bg-white/5 border-y border-white/5">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div 
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center group"
            >
              <h3 className="text-4xl font-black text-white mb-2 group-hover:text-primary transition-colors">
                {stat.value}
              </h3>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest leading-tight">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Trust;


