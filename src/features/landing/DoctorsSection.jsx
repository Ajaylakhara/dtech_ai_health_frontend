import { useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { FaStar, FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import Badge from '../../components/ui/Badge';
import SectionWrapper, { SectionHeading } from '../../components/ui/SectionWrapper';

const doctors = [
  {
    id: 1,
    name: 'Dr. Rahul Malhotra',
    role: 'Senior Cardiologist',
    patients: '2.5k+',
    rating: '4.9',
    experience: '15 yrs',
    imgUrl: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop',
    available: true,
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    role: 'Chief Neurologist',
    patients: '1.8k+',
    rating: '4.8',
    experience: '12 yrs',
    imgUrl: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=800&auto=format&fit=crop',
    available: true,
  },
  {
    id: 3,
    name: 'Dr. Priya Mehta',
    role: 'Pediatric Specialist',
    patients: '3.2k+',
    rating: '4.9',
    experience: '10 yrs',
    imgUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=800&auto=format&fit=crop',
    available: false,
  },
];

// ── Parallax tilt wrapper ─────────────────────────────────────────────────────
const TiltCard = ({ children, className = '' }) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-60, 60], [8, -8]);
  const rotateY = useTransform(x, [-60, 60], [-8, 8]);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };
  const reset = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const DoctorsSection = () => {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + doctors.length) % doctors.length);
  const next = () => setIdx((i) => (i + 1) % doctors.length);

  return (
    <SectionWrapper id="doctors">
      {/* Header row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <SectionHeading label="Medical Experts" title="Meet Our Specialists" />
        <div className="flex gap-3 mb-4 md:mb-0">
          {[{ fn: prev, Icon: FaArrowLeft }, { fn: next, Icon: FaArrowRight }].map(({ fn, Icon }, i) => (
            <button
              key={i}
              onClick={fn}
              aria-label={i === 0 ? 'Previous doctor' : 'Next doctor'}
              className="w-14 h-14 rounded-xl glass border border-white/10 text-white
                hover:border-blue-500/50 hover:text-blue-400 hover:shadow-[0_0_16px_rgba(59,130,246,0.25)]
                transition-all duration-200 flex items-center justify-center"
            >
              <Icon className="text-base" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {doctors.map((doc, i) => (
          <TiltCard key={doc.id} className="h-full">
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55 }}
              className="bg-[#141D2F] rounded-2xl overflow-hidden border border-white/8
                hover:border-blue-500/30 hover:shadow-[0_0_28px_rgba(59,130,246,0.14)]
                transition-all duration-300 h-full flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={doc.imgUrl}
                  alt={doc.name}
                  loading="lazy"
                  className="w-full h-full object-cover object-top transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#141D2F] via-[#141D2F]/20 to-transparent" />

                {/* Badges */}
                <div className="absolute top-3 right-3">
                  <Badge variant={doc.available ? 'success' : 'danger'} ping={doc.available}>
                    {doc.available ? 'Available' : 'Busy'}
                  </Badge>
                </div>
                <div className="absolute top-3 left-3 flex items-center gap-1.5 px-2.5 py-1.5 glass rounded-full border border-white/10">
                  <FaCheckCircle className="text-blue-400 text-xs" />
                  <span className="text-white text-[11px] font-bold">Verified</span>
                </div>
              </div>

              {/* Info */}
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-white font-black text-[17px] mb-0.5" style={{ fontFamily: 'var(--font-title)' }}>
                  {doc.name}
                </h3>
                <p className="text-blue-400 text-sm font-semibold mb-5">{doc.role}</p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-2 mb-5">
                  {[['Patients', doc.patients], ['Rating', doc.rating], ['Exp', doc.experience]].map(([k, v]) => (
                    <div key={k} className="bg-white/5 rounded-xl p-3 text-center border border-white/5">
                      <p className="text-white font-bold text-sm">{v}</p>
                      <p className="text-slate-400 text-[10px] mt-0.5">{k}</p>
                    </div>
                  ))}
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, j) => (
                    <FaStar
                      key={j}
                      className={`text-xs ${j < Math.floor(parseFloat(doc.rating)) ? 'text-amber-400' : 'text-white/10'}`}
                    />
                  ))}
                  <span className="text-slate-400 text-xs ml-1">{doc.rating}</span>
                </div>

                <button
                  className="mt-auto w-full py-3 rounded-xl font-bold text-sm transition-all duration-200
                    bg-gradient-to-r from-blue-500 to-purple-600 text-white
                    hover:shadow-[0_0_20px_rgba(59,130,246,0.45)] hover:scale-[1.02] active:scale-95"
                >
                  Book Appointment
                </button>
              </div>
            </motion.div>
          </TiltCard>
        ))}
      </div>

      {/* Carousel dots */}
      <div className="flex justify-center gap-2 mt-10">
        {doctors.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            aria-label={`Go to doctor ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === idx ? 'w-8 bg-blue-500' : 'w-2 bg-white/25'
            }`}
          />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default DoctorsSection;
