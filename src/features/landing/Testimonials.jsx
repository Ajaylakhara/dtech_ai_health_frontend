import { motion } from 'framer-motion';
import { FaQuoteLeft, FaStar } from 'react-icons/fa';

const reviews = [
  {
    name: 'Alice Cooper',
    role: 'Treated Area: Cardiac',
    text: 'The facility is state-of-the-art and the staff is completely professional. I never had to wait long to be seen.',
    img: 'https://randomuser.me/api/portraits/women/44.jpg'
  },
  {
    name: 'James Anderson',
    role: 'Surgery Patient',
    text: 'I was nervous about my procedure, but Dr. Mitchell and the team were wonderful. They made me feel safe.',
    img: 'https://randomuser.me/api/portraits/men/32.jpg'
  },
  {
    name: 'Samantha Reed',
    role: 'Annual Checkup',
    text: 'Best hospital experience I have ever had. Everyone operates with a deep sense of care and empathy.',
    img: 'https://randomuser.me/api/portraits/women/68.jpg'
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-[#0A0A0B] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl lg:text-5xl font-black font-title mb-6 text-white tracking-tight">Patient Stories</h2>
          <p className="text-slate-400 max-w-xl mx-auto font-medium">Hear from the people whose lives were changed by our innovative approach to healthcare.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((rev, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -10 }}
              className="glass p-10 rounded-[2.5rem] border-white/5 relative group"
            >
              <FaQuoteLeft className="text-primary/20 text-5xl absolute top-8 left-8" />
              
              <div className="flex gap-1 mb-8 relative z-10">
                {[...Array(5)].map((_, j) => <FaStar key={j} className="text-primary text-xs" />)}
              </div>

              <p className="text-slate-200 text-lg leading-relaxed mb-10 relative z-10 font-medium italic">
                "{rev.text}"
              </p>

              <div className="flex items-center gap-4 relative z-10">
                <img src={rev.img} alt={rev.name} className="w-14 h-14 rounded-full border-2 border-primary/20 grayscale group-hover:grayscale-0 transition-all duration-500" />
                <div>
                  <h4 className="text-white font-black">{rev.name}</h4>
                  <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">{rev.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;


