import { motion } from 'framer-motion';
import { FiCheck } from 'react-icons/fi';
import Button from '../../components/ui/Button';

const DTechPricing = () => {
  const plans = [
    {
      name: 'Basic',
      price: '$29',
      period: 'per month',
      desc: 'Essential diagnostics & analytical data tools for individual patients.',
      features: [
        'Routine health analytics',
        '2 AI Diagnoses per month',
        'Basic secure history cloud',
        'Mobile & web view access',
      ],
      recommended: false,
    },
    {
      name: 'Pro',
      price: '$79',
      period: 'per month',
      desc: 'Complete preventative tracking for power users & smaller clinical teams.',
      features: [
        'Infinite health analytics',
        'Unlimited AI Diagnoses',
        'Secure HIPAA-level cloud storage',
        'Direct specialist consultations',
        'Continuous predictive alerts',
      ],
      recommended: true,
    },
    {
      name: 'Enterprise',
      price: '$199',
      period: 'per month',
      desc: 'Uncapped algorithmic computational capacity for enterprise hospitals.',
      features: [
        'Dedicated secure data cluster',
        'Priority computational time',
        'Advanced custom integration API',
        'Team-wide access & permissions',
        '24/7 dedicated platform SLA',
      ],
      recommended: false,
    },
  ];

  return (
    <section id="pricing" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-gradient">
            Flexible Pricing
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-snug tracking-tight">
            Plans for <span className="text-gradient">Every Scale</span>
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Flexible, transparent tiers structured exactly around your medical data processing requirements.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 select-none">
          {plans.map((plan, idx) => (
            <div
              key={idx}
              className={`rounded-[2rem] p-8 flex flex-col justify-between gap-8 backdrop-blur-2xl transition-all duration-300 h-full relative group ${
                plan.recommended
                  ? 'bg-gradient-to-br from-blue-500/10 to-purple-600/10 border-2 border-blue-500/30 shadow-2xl scale-105'
                  : 'bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10'
              }`}
            >
              {plan.recommended && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-black bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
                  Most Popular
                </span>
              )}

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <h3 className="text-2xl font-black text-white group-hover:text-blue-400 transition-all">
                    {plan.name}
                  </h3>
                  <p className="text-xs font-bold text-slate-400">{plan.desc}</p>
                </div>

                <div className="flex items-baseline gap-2 my-2">
                  <span className="text-4xl sm:text-5xl font-black text-white">{plan.price}</span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                    {plan.period}
                  </span>
                </div>

                <div className="h-px bg-white/5 my-1" />

                {/* Feature checklist */}
                <ul className="flex flex-col gap-3.5">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3.5 text-sm font-semibold text-slate-300">
                      <FiCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                variant={plan.recommended ? 'primary' : 'glass'}
                className="w-full mt-4 font-black tracking-wide uppercase text-sm py-3.5"
              >
                Choose {plan.name}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DTechPricing;
