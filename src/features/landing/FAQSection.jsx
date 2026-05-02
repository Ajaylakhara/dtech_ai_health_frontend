import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaMinus, FaPhoneAlt, FaEnvelope, FaClock } from 'react-icons/fa';
import SectionWrapper, { SectionHeading } from '../../components/ui/SectionWrapper';

const faqs = [
  {
    question: 'Is my data secure with DTech AI?',
    answer:
      'Yes. We are fully HIPAA-compliant, use end-to-end encryption, and run regular third-party security audits. Your health data is never sold or shared.',
  },
  {
    question: 'Can I integrate with existing systems?',
    answer:
      'Absolutely. We provide REST APIs and native integrations with major EHR systems including Epic, Cerner, and Athena — with a dedicated onboarding engineer.',
  },
  {
    question: 'Do you offer 24/7 patient support?',
    answer:
      'Pro and Enterprise plans include 24/7 priority support with a guaranteed response under 2 hours. Basic plan gets business-hour email support.',
  },
  {
    question: 'Is there a free trial available?',
    answer:
      'Yes — every plan starts with a 14-day free trial. No credit card required. You get full access to all Pro features during the trial period.',
  },
  {
    question: 'How do I get started?',
    answer:
      'Click "Start Free Trial", create your account, and follow the quick setup wizard. Most hospitals are fully onboarded within 48 hours.',
  },
  {
    question: 'Can I upgrade or downgrade my plan?',
    answer:
      'Yes, at any time. Plan changes take effect immediately and billing is prorated. No lock-in contracts on monthly plans.',
  },
];

const FAQSection = () => {
  const [open, setOpen] = useState(0);

  return (
    <SectionWrapper id="faq">
      <div className="grid lg:grid-cols-[1fr_1.4fr] gap-14 lg:gap-20 items-start">

        {/* ── Left ───────────────────────────────── */}
        <div>
          <SectionHeading label="FAQ" title="Common Questions" />
          <p className="text-slate-400 mb-8 leading-[1.75] -mt-4">
            Can't find what you're looking for? Our support team is here 24/7.
          </p>

          {/* Help cards */}
          <div className="space-y-4">
            {[
              {
                Icon: FaPhoneAlt,
                color: '#3B82F6',
                title: 'Call Us',
                sub: '+1 (800) 123-4567',
              },
              {
                Icon: FaEnvelope,
                color: '#8B5CF6',
                title: 'Email Support',
                sub: 'support@dtech.ai',
              },
              {
                Icon: FaClock,
                color: '#3B82F6',
                title: 'Response Time',
                sub: 'Under 2 hours (Pro+)',
              },
            ].map(({ Icon, color, title, sub }) => (
              <div
                key={title}
                className="flex items-center gap-4 p-4 rounded-2xl border border-white/8
                  bg-white/4 hover:border-blue-500/25 hover:bg-white/7 transition-all duration-200 cursor-default"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${color}18` }}
                >
                  <Icon style={{ color }} className="text-sm" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm">{title}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          <button className="mt-8 text-sm text-blue-400 font-bold hover:underline flex items-center gap-1">
            Contact Support →
          </button>
        </div>

        {/* ── Accordion ──────────────────────────── */}
        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = open === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-all duration-300 overflow-hidden
                  ${isOpen
                    ? 'border-blue-500/40 bg-blue-500/5'
                    : 'border-white/8 bg-white/3 hover:border-white/15'
                  }`}
              >
                <button
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left focus:outline-none"
                >
                  <span
                    className={`font-semibold text-sm leading-relaxed transition-colors duration-200 ${
                      isOpen ? 'text-white' : 'text-slate-400'
                    }`}
                  >
                    {faq.question}
                  </span>
                  <motion.span
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4 transition-all duration-200
                      ${isOpen ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white' : 'bg-white/10 text-white/50'}`}
                  >
                    {isOpen ? <FaMinus className="text-xs" /> : <FaPlus className="text-xs" />}
                  </motion.span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                    >
                      <p className="px-6 pb-6 text-slate-400 text-sm leading-[1.75]">{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default FAQSection;
