import { motion } from 'framer-motion';
import SectionWrapper from '../../components/ui/SectionWrapper';

const logos = [
  { name: 'Apollo', color: '#3B82F6' },
  { name: 'Fortis', color: '#8B5CF6' },
  { name: 'AIIMS', color: '#3B82F6' },
  { name: 'Max', color: '#8B5CF6' },
  { name: 'Manipal', color: '#3B82F6' },
  { name: 'Narayana', color: '#8B5CF6' },
];

const TrustSection = () => (
  <SectionWrapper className="py-12 border-y border-white/5">
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center text-slate-400 text-xs font-bold uppercase tracking-[0.2em] mb-10"
    >
      Trusted by 1,000+ Healthcare Institutions
    </motion.p>

    <div className="flex flex-wrap items-center justify-center gap-5 lg:gap-10">
      {logos.map((logo, i) => (
        <motion.div
          key={logo.name}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.07, duration: 0.4 }}
          whileHover={{ scale: 1.08, y: -2 }}
          className="group cursor-pointer"
        >
          <div
            className="h-12 px-7 rounded-xl border border-white/8 bg-white/4
              flex items-center justify-center
              grayscale group-hover:grayscale-0
              group-hover:border-blue-500/30 group-hover:bg-white/8
              transition-all duration-350"
          >
            <span
              className="font-black text-lg text-slate-400 group-hover:text-white
                tracking-wide transition-colors duration-300"
            >
              {logo.name}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  </SectionWrapper>
);

export default TrustSection;
