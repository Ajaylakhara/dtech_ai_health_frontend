import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCheck, FaArrowRight } from 'react-icons/fa';
import SectionWrapper, { SectionHeading } from '../../components/ui/SectionWrapper';
import Button from '../../components/ui/Button';

const plans = [
  {
    name: 'Basic',
    monthlyPrice: 49,
    yearlyPrice: 39,
    color: '#94A3B8',
    desc: 'For small clinics getting started.',
    features: [
      'Up to 5 doctors',
      '500 appointments/month',
      'Basic patient records',
      'Email support',
      'Standard analytics',
    ],
    cta: 'Get Started',
    popular: false,
  },
  {
    name: 'Pro',
    monthlyPrice: 129,
    yearlyPrice: 99,
    color: '#3B82F6',
    desc: 'For growing hospitals and multi-specialty clinics.',
    features: [
      'Up to 50 doctors',
      'Unlimited appointments',
      'Full EHR + billing',
      'Priority support 24/7',
      'Advanced AI analytics',
      'Telehealth integration',
      'Custom branding',
    ],
    cta: 'Start Free Trial',
    popular: true,
  },
  {
    name: 'Enterprise',
    monthlyPrice: 349,
    yearlyPrice: 279,
    color: '#8B5CF6',
    desc: 'For hospital networks and large healthcare systems.',
    features: [
      'Unlimited doctors',
      'Unlimited everything',
      'Full API access',
      'Dedicated account manager',
      'Custom integrations',
      'SLA guarantee (99.9%)',
      'On-premise option',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
];

const PricingSection = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <SectionWrapper id="pricing">
      <SectionHeading
        label="Pricing"
        title="Simple, Transparent Pricing"
        subtitle="No hidden fees. Upgrade or cancel any time."
      />

      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-14">
        <span className={`text-sm font-semibold transition-colors ${!yearly ? 'text-white' : 'text-slate-400'}`}>
          Monthly
        </span>
        <button
          onClick={() => setYearly(!yearly)}
          aria-label="Toggle billing period"
          className="relative w-14 h-7 rounded-full bg-white/10 border border-white/15
            flex items-center px-1 transition-all duration-300 hover:border-blue-500/50"
        >
          <motion.span
            animate={{ x: yearly ? 28 : 0 }}
            transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 shadow-md"
          />
        </button>
        <span className={`text-sm font-semibold transition-colors ${yearly ? 'text-white' : 'text-slate-400'}`}>
          Yearly
          <span className="ml-2 px-2 py-0.5 rounded-full bg-blue-500/15 text-blue-400 text-[10px] font-black">
            SAVE 20%
          </span>
        </span>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.55 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className={`relative rounded-2xl p-8 border flex flex-col transition-all duration-300
              ${plan.popular
                ? 'bg-[#141D2F] border-blue-500/50 shadow-[0_0_40px_rgba(59,130,246,0.2)]'
                : 'glass border-white/10 hover:border-white/20'
              }`}
          >
            {/* Popular badge */}
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full
                bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-black tracking-wide
                shadow-lg shadow-blue-500/30">
                ✦ Most Popular
              </div>
            )}

            {/* Plan name */}
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-black text-sm"
                style={{ background: `${plan.color}20`, color: plan.color }}
              >
                {plan.name[0]}
              </div>
              <span className="text-white font-black text-xl">{plan.name}</span>
            </div>

            <p className="text-slate-400 text-sm mb-6 leading-relaxed">{plan.desc}</p>

            {/* Price */}
            <div className="mb-8">
              <div className="flex items-end gap-1">
                <span
                  className="text-5xl font-black text-white"
                  style={{ fontFamily: 'var(--font-title)' }}
                >
                  ${yearly ? plan.yearlyPrice : plan.monthlyPrice}
                </span>
                <span className="text-slate-400 text-sm mb-1.5">/month</span>
              </div>
              {yearly && (
                <p className="text-blue-400 text-xs font-bold mt-1">
                  Billed yearly · Save ${(plan.monthlyPrice - plan.yearlyPrice) * 12}/yr
                </p>
              )}
            </div>

            {/* Features */}
            <ul className="space-y-3 mb-8 flex-1">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-3 text-sm">
                  <FaCheck
                    className="mt-0.5 flex-shrink-0 text-xs"
                    style={{ color: plan.color }}
                  />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant={plan.popular ? 'primary' : 'glass'}
              className="w-full py-3.5"
            >
              {plan.cta}
              <FaArrowRight className="text-xs" />
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Footer note */}
      <p className="text-center text-slate-400 text-sm mt-10">
        All plans include a{' '}
        <span className="text-white font-semibold">14-day free trial</span>. No credit card required.
      </p>
    </SectionWrapper>
  );
};

export default PricingSection;
