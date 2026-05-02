import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import Button from '../../components/ui/Button';
import SectionWrapper, { SectionHeading } from '../../components/ui/SectionWrapper';

const reviews = [
  {
    id: 1,
    name: 'Alice Cooper',
    role: 'Cardiac Patient',
    rating: 5,
    imgUrl: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Dr. Jenkins and her team were absolutely wonderful. Safe, prepared, and compassionate throughout.',
  },
  {
    id: 2,
    name: 'James Anderson',
    role: 'Surgery Patient',
    rating: 5,
    imgUrl: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'State-of-the-art facility, completely professional staff. My questions were always answered within minutes.',
  },
  {
    id: 3,
    name: 'Samantha Reed',
    role: 'Annual Checkup',
    rating: 4,
    imgUrl: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: "Best hospital experience I've ever had. Everyone operates with a deep sense of care and empathy.",
  },
  {
    id: 4,
    name: 'Michael T.',
    role: 'Neurology Patient',
    rating: 5,
    imgUrl: 'https://randomuser.me/api/portraits/men/85.jpg',
    text: "They don't just treat symptoms — they focus on overall wellness and a complete recovery plan.",
  },
];

const TestimonialsSection = () => {
  const [current, setCurrent] = useState(0);
  const next = useCallback(() => setCurrent((c) => (c + 1) % reviews.length), []);

  useEffect(() => {
    const t = setInterval(next, 4500);
    return () => clearInterval(t);
  }, [next]);

  return (
    <SectionWrapper id="testimonials" className="overflow-hidden">
      <SectionHeading
        label="Patient Stories"
        title="Trusted by Thousands"
        subtitle="Real feedback from patients who experienced the difference."
      />

      {/* Cards */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-10">
        {reviews.map((r, i) => {
          const isActive = i === current;
          return (
            <motion.div
              key={r.id}
              animate={{
                opacity: isActive ? 1 : 0.45,
                scale: isActive ? 1 : 0.96,
                y: isActive ? 0 : 12,
              }}
              transition={{ duration: 0.4 }}
              onClick={() => setCurrent(i)}
              className={`rounded-2xl p-6 border cursor-pointer transition-all duration-300 flex flex-col gap-4
                ${isActive
                  ? 'bg-[#141D2F] border-blue-500/40 shadow-[0_0_28px_rgba(59,130,246,0.18)]'
                  : 'glass border-white/8 hover:border-white/20'
                }`}
            >
              <FaQuoteLeft className="text-blue-500/50 text-xl" />

              <div className="flex gap-1">
                {[...Array(5)].map((_, j) => (
                  <FaStar key={j} className={`text-xs ${j < r.rating ? 'text-amber-400' : 'text-white/10'}`} />
                ))}
              </div>

              <p className="text-slate-400 text-sm leading-relaxed flex-1">"{r.text}"</p>

              <div className="flex items-center gap-3 pt-2 border-t border-white/8">
                <img
                  src={r.imgUrl}
                  alt={r.name}
                  loading="lazy"
                  className="w-10 h-10 rounded-full object-cover border border-white/15"
                />
                <div>
                  <p className="text-white font-bold text-sm">{r.name}</p>
                  <p className="text-slate-400 text-xs">{r.role}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mb-16">
        {reviews.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Testimonial ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === current ? 'w-8 bg-blue-500' : 'w-2 bg-white/20'
            }`}
          />
        ))}
      </div>

      {/* Mid-page CTA */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="rounded-3xl p-10 md:p-14 border border-white/10 text-center relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, rgba(59,130,246,0.07) 0%, rgba(139,92,246,0.07) 100%)',
        }}
      >
        {/* Glow blobs */}
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 -translate-y-1/2 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10">
          <p className="text-slate-400 text-xs uppercase tracking-[0.2em] font-bold mb-4">Start Today</p>
          <h3
            className="text-white text-3xl md:text-4xl font-black mb-6 leading-tight"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            Join 1.2M+ patients already using{' '}
            <span className="text-gradient">DTech AI</span>
          </h3>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button variant="primary" className="px-8 py-3">
              Get Started Free
            </Button>
            <Button variant="glass" className="px-8 py-3">
              Book a Demo
            </Button>
          </div>
        </div>
      </motion.div>
    </SectionWrapper>
  );
};

export default TestimonialsSection;
