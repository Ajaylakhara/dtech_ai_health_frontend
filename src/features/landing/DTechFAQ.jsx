import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlus, FiMinus } from 'react-icons/fi';

const DTechFAQ = () => {
  const faqs = [
    {
      question: 'What sets DTech AI Health apart from other systems?',
      answer: 'DTech AI Health directly merges instantaneous AI-powered screening and machine learning diagnostics with deep cloud-secure patient analytics for completely seamless operational tracking.',
    },
    {
      question: 'Is my personal data completely secured?',
      answer: 'Yes, your data is completely encrypted and stored behind rigorous HIPAA-compliant cloud security measures, ensuring comprehensive end-to-end user privacy.',
    },
    {
      question: 'Can I directly consult with the specialist network?',
      answer: 'Yes! DTech AI matches patient analytical data directly to specialized vetted clinicians for fast preventative follow-up calls or direct consultations.',
    },
    {
      question: 'Does it support real-time data integrations?',
      answer: 'The Pro and Enterprise plans allow live data pipelines or continuous health tracker integrations for instantaneous diagnostic alerts.',
    },
  ];

  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section id="faq" className="relative py-24 px-6 overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[140px] pointer-events-none select-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-16 select-none">
        {/* Header */}
        <div className="flex flex-col items-center text-center gap-4 max-w-2xl mx-auto">
          <span className="text-xs font-black uppercase tracking-widest text-gradient">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white leading-snug tracking-tight">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-slate-400 font-medium leading-relaxed">
            Quickly learn how DTech AI processes and secures your high fidelity diagnostic pipelines.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div
                key={idx}
                className={`glass border transition-all duration-300 rounded-[1.5rem] p-6 cursor-pointer ${
                  isOpen
                    ? 'bg-white/5 border-white/12 shadow-xl'
                    : 'bg-white/[0.02] border-white/5 hover:bg-white/5 hover:border-white/10'
                }`}
                onClick={() => setActiveIdx(isOpen ? null : idx)}
              >
                <div className="flex justify-between items-center gap-4">
                  <h4 className="text-base sm:text-lg font-black text-white group-hover:text-blue-400 transition-colors">
                    {faq.question}
                  </h4>
                  <div className="p-2 rounded-xl bg-white/5 text-slate-400">
                    {isOpen ? <FiMinus className="w-5 h-5 text-blue-400" /> : <FiPlus className="w-5 h-5" />}
                  </div>
                </div>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="pt-4 text-sm font-medium text-slate-400 leading-relaxed border-t border-white/5 mt-4 select-text">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DTechFAQ;
