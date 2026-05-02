import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa';
// Using premium cloud portraits for visual excellence
const doc1 = "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop";
const doc2 = "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop";

const doctors = [
  {
    name: 'Dr. Sarah Mitchell',
    role: 'Chief Surgeon',
    image: doc1,
    rating: 4.9,
    status: 'Online'
  },
  {
    name: 'Dr. James Wilson',
    role: 'Cardiologist',
    image: doc2,
    rating: 4.8,
    status: 'In Surgery'
  },
  {
    name: 'Dr. Elena Rossi',
    role: 'Neurologist',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?q=80&w=300&auto=format&fit=crop',
    rating: 5.0,
    status: 'Available'
  }
];

const Doctors = () => {
  return (
    <section className="py-24 bg-[#0A0A0B]">
      <div className="container max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <h2 className="text-4xl lg:text-5xl font-black font-title mb-6 tracking-tight">
              Powered by <span className="text-primary truncate">Experts</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Our platform is trusted by the world's most innovative medical professionals to deliver superior healthcare.
            </p>
          </div>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="px-8 py-4 rounded-full glass border border-white/10 text-white font-bold hover:bg-white/5 transition-all w-fit"
          >
            Meet the Team
          </motion.button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {doctors.map((doc, i) => (
            <motion.div 
              key={doc.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ scale: 1.02 }}
              className="group relative"
            >
              <div className="relative z-10 glass p-3 rounded-[2.5rem] border-white/5 overflow-hidden transition-all group-hover:border-primary/20">
                <div className="relative h-[400px] rounded-[2rem] overflow-hidden">
                  <img 
                    src={doc.image} 
                    alt={doc.name} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-dark/90 via-transparent to-transparent opacity-80" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 rounded-full glass border border-white/10 flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${doc.status === 'Online' || doc.status === 'Available' ? 'bg-emerald-400' : 'bg-red-400'} animate-pulse`} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-white">{doc.status}</span>
                  </div>
                </div>

                <div className="mt-8 p-4 pt-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-2xl font-black text-white">{doc.name}</h3>
                    <div className="flex items-center gap-1 text-primary">
                      <FaStar className="text-xs" />
                      <span className="text-sm font-black">{doc.rating}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">{doc.role}</p>
                </div>
              </div>
              
              {/* Back Glow */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4/5 h-4/5 bg-accent/10 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Doctors;


