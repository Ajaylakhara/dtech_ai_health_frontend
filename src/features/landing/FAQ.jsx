import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';

const faqs = [
  {
    q: 'Is my hospital data secure?',
    a: 'Absolutely. We use banking-grade AES-256 encryption and are fully HIPAA compliant to ensure patient privacy is never compromised.'
  },
  {
    q: 'Can we integrate with our existing EMR?',
    a: 'Yes! Our platform offers robust API hooks and native integration for most major EMR systems in the market.'
  },
  {
    q: 'How long does the setup take?',
    a: 'Most clinics are up and running within 48 to 72 hours, depending on the scale of your current data migration.'
  }
];

const FAQ = () => {
  const [open, setOpen] = useState(0);

  return (
    <section className="py-24 bg-white">
      <div className="container max-w-4xl mx-auto px-6">
        <h2 className="text-4xl font-black text-bg-dark text-center mb-16 font-title tracking-tight">Frequently Asked Questions</h2>
        
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-2xl border border-slate-100 bg-slate-50 overflow-hidden">
              <button 
                onClick={() => setOpen(open === i ? -1 : i)}
                className="w-full p-6 flex justify-between items-center text-left hover:bg-slate-100 transition-colors"
              >
                <span className="text-lg font-black text-bg-dark">{faq.q}</span>
                <FaChevronDown className={`text-slate-400 transition-transform ${open === i ? 'rotate-180 text-primary' : ''}`} />
              </button>
              
              <AnimatePresence>
                {open === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-slate-500 font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;


