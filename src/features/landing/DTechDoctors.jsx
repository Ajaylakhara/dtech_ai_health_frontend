import { motion } from 'framer-motion';
import { FiStar, FiAward } from 'react-icons/fi';
import Card from '../../components/ui/Card';

const DTechDoctors = () => {
  const doctors = [
    {
      name: 'Dr. Sarah Mitchell',
      specialty: 'Lead Cardiologist',
      rating: '5.0',
      reviews: '250+ reviews',
      image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&auto=format&fit=crop',
    },
    {
      name: 'Dr. Johnathan Doe',
      specialty: 'Senior Neurologist',
      rating: '4.9',
      reviews: '190+ reviews',
      image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=200&auto=format&fit=crop',
    },
    {
      name: 'Dr. Elena Rostova',
      specialty: 'Chief AI Diagnostician',
      rating: '5.0',
      reviews: '310+ reviews',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&auto=format&fit=crop',
    },
    {
      name: 'Dr. Robert Carter',
      specialty: 'Data & Pediatrics',
      rating: '4.8',
      reviews: '145+ reviews',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127d0fc?q=80&w=200&auto=format&fit=crop',
    },
  ];

  return (
    <section id="doctors" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-gradient">
            Verified Professionals
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-snug tracking-tight">
            Consult the <span className="text-gradient">Top Specialists</span>
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Direct access to leading clinicians paired with algorithmic AI analysis.
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {doctors.map((doc, idx) => (
            <Card
              key={idx}
              variant="glass"
              animate={true}
              className="card-hover select-none group flex flex-col gap-5 items-center p-6 text-center h-full"
            >
              <div className="relative w-28 h-28 rounded-[2rem] overflow-hidden border-2 border-white/10 group-hover:border-blue-500/40 group-hover:scale-105 transition-all duration-300">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-[#0B1120]/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1 text-xs font-black text-blue-400">
                  <FiAward className="w-3.5 h-3.5" />
                </div>
              </div>
              <div className="flex flex-col gap-1.5 flex-grow">
                <h3 className="text-lg font-black text-white group-hover:text-blue-400 transition-colors">
                  {doc.name}
                </h3>
                <span className="text-xs font-bold bg-white/5 border border-white/5 text-slate-300 px-3 py-1 rounded-xl w-fit mx-auto">
                  {doc.specialty}
                </span>
                <p className="text-slate-400 font-medium text-xs leading-relaxed mt-2 line-clamp-2">
                  Highly acclaimed and reviewed specialist available for digital or clinical care.
                </p>
              </div>

              {/* Footer rating block */}
              <div className="w-full mt-2 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-slate-400">
                <span className="flex items-center gap-1">
                  <FiStar className="text-yellow-400 fill-yellow-400" /> {doc.rating}
                </span>
                <span className="text-slate-500">{doc.reviews}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DTechDoctors;
