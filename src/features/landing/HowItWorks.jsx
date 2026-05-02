import { motion } from 'framer-motion';

const steps = [
  {
    title: 'Cloud Integration',
    desc: 'Sync your existing patient database to our secure cloud in minutes.',
    num: '01'
  },
  {
    title: 'Invite Your Team',
    desc: 'Send magic links to doctors and nurses with automated role assignments.',
    num: '02'
  },
  {
    title: 'Go Live',
    desc: 'Start booking appointments and tracking real-time hospital analytics.',
    num: '03'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 bg-[#0A0A0B] overflow-hidden">
      <div className="container max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black font-title mb-6">How It Works</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium">Simple setup. Powerful results. Here is how we transform your hospital workflow.</p>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-24">
          {/* Progress Line */}
          <div className="hidden md:block absolute top-[15%] left-[10%] right-[10%] h-[2px] bg-white/5 z-0" />
          
          {steps.map((step, i) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full glass border border-white/10 flex items-center justify-center text-white font-black text-xl mb-8 group-hover:border-primary transition-colors neon-shadow">
                {step.num}
              </div>
              <h3 className="text-2xl font-black text-white mb-4">{step.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;


