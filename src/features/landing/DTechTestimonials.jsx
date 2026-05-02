import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi';
import Card from '../../components/ui/Card';

const DTechTestimonials = () => {
  const testimonials = [
    {
      name: 'Eleanor Vance',
      title: 'Healthcare Executive',
      review: 'The AI diagnostic output was instantaneous and remarkably precise. DTech AI has completely changed how our clinic interacts with predictive metrics.',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=100&auto=format&fit=crop',
    },
    {
      name: 'Marcus Brody',
      title: 'Patient & Researcher',
      review: 'The dashboard’s data visualizations are stunning. It makes keeping track of complex health data effortless and incredibly visually engaging.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=100&auto=format&fit=crop',
    },
    {
      name: 'Theresa Mayne',
      title: 'Cardiology Specialist',
      review: 'Its deep algorithmic scanning allows me to identify preventative trends early on, making treatment times much more proactive.',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=100&auto=format&fit=crop',
    },
  ];

  return (
    <section id="testimonials" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-gradient">
            Social Proof
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-snug tracking-tight">
            Loved by <span className="text-gradient">Clinicians & Patients</span>
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            See why leading medical organizations choose DTech AI for analytical health insights.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 select-none">
          {testimonials.map((test, idx) => (
            <Card
              key={idx}
              variant="dark"
              animate={true}
              className="card-hover select-none group flex flex-col justify-between gap-6 p-8 h-full bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/5 transition-all duration-300"
            >
              <div className="flex flex-col gap-4">
                <div className="flex gap-1 text-blue-400">
                  <FiStar className="w-4 h-4 fill-blue-400" />
                  <FiStar className="w-4 h-4 fill-blue-400" />
                  <FiStar className="w-4 h-4 fill-blue-400" />
                  <FiStar className="w-4 h-4 fill-blue-400" />
                  <FiStar className="w-4 h-4 fill-blue-400" />
                </div>
                <p className="text-slate-300 font-medium text-sm leading-relaxed italic group-hover:text-white transition-colors">
                  &ldquo;{test.review}&rdquo;
                </p>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <img
                  src={test.avatar}
                  alt={test.name}
                  className="w-11 h-11 rounded-xl object-cover ring-2 ring-white/5 select-none"
                />
                <div>
                  <h4 className="text-sm font-black text-white group-hover:text-blue-400 transition-colors">
                    {test.name}
                  </h4>
                  <p className="text-xs font-bold text-slate-500">{test.title}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DTechTestimonials;
