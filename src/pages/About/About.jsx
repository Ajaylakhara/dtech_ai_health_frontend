import React from "react";
import { FaBullseye, FaEye, FaHandHoldingHeart, FaMicroscope, FaShieldAlt, FaCheck } from "react-icons/fa";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col pt-24 font-sans antialiased overflow-hidden selection:bg-blue-500/30">
      {/* Hero Section */}
      <section className="relative py-24 bg-[#0B1120] text-white overflow-hidden border-b border-white/5">
        <div 
          className="absolute inset-0 opacity-15"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=2053&auto=format&fit=crop")',
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Glow blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/8 rounded-full blur-[100px] pointer-events-none select-none" />
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-purple-500/8 rounded-full blur-[90px] pointer-events-none select-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 uppercase tracking-tight"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            About <span className="text-gradient">DTech AI</span> Pro
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-medium"
          >
            We are a multi-specialty institution committed to providing high-quality healthcare 
            through advanced technology and a patient-first approach.
          </motion.p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-24 relative">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 bg-[#141D2F] border border-white/5 hover:border-blue-500/30 transition-all duration-300"
          >
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'var(--font-title)' }}>Our Mission</h2>
            <div className="mt-8 flex gap-6 items-start">
              <div className="bg-blue-500/10 p-4 rounded-2xl text-blue-400 border border-blue-500/20 flex-shrink-0">
                <FaBullseye size={32} />
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                To offer top-quality healthcare services with a team of highly skilled professionals, 
                ensuring patient safety, satisfaction, and long-term well-being through clinical excellence.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="rounded-3xl p-8 bg-[#141D2F] border border-white/5 hover:border-purple-500/30 transition-all duration-300"
          >
            <h2 className="text-3xl font-extrabold text-white" style={{ fontFamily: 'var(--font-title)' }}>Our Vision</h2>
            <div className="mt-8 flex gap-6 items-start">
              <div className="bg-purple-500/10 p-4 rounded-2xl text-purple-400 border border-purple-500/20 flex-shrink-0">
                <FaEye size={32} />
              </div>
              <p className="text-slate-400 text-lg leading-relaxed">
                To be a leading global healthcare institution known for medical innovation, 
                compassionate care, and setting new benchmarks in medical precision.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 bg-[#0B1120] relative">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-extrabold text-white mb-12" style={{ fontFamily: 'var(--font-title)' }}>Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.55 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#141D2F] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] transition-all duration-300 group cursor-default"
            >
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-gradient-to-tr group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                <FaHandHoldingHeart size={30} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Compassion</h3>
              <p className="text-slate-400 leading-relaxed">
                We prioritize patient care with empathy, respect, and dignity in every interaction.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.55 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#141D2F] p-8 rounded-2xl border border-white/5 hover:border-purple-500/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] transition-all duration-300 group cursor-default"
            >
              <div className="w-16 h-16 bg-purple-500/10 border border-purple-500/20 rounded-2xl flex items-center justify-center text-purple-400 mb-6 group-hover:bg-gradient-to-tr group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                <FaMicroscope size={30} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Innovation</h3>
              <p className="text-slate-400 leading-relaxed">
                We embrace medical advancements to enhance treatments and patient outcomes constantly.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.55 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-[#141D2F] p-8 rounded-2xl border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_30px_rgba(59,130,246,0.12)] transition-all duration-300 group cursor-default"
            >
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:bg-gradient-to-tr group-hover:from-blue-500 group-hover:to-purple-600 group-hover:text-white transition-all duration-300">
                <FaShieldAlt size={30} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Integrity</h3>
              <p className="text-slate-400 leading-relaxed">
                We uphold transparency, trust, and ethical medical practices as our foundational pillars.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#0B1120]">
        <div className="max-w-7xl mx-auto px-6 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#141D2F] rounded-3xl p-12 md:p-20 border border-white/5 flex flex-col lg:flex-row gap-16 items-center"
          >
            <div className="lg:w-1/2">
              <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-8" style={{ fontFamily: 'var(--font-title)' }}>
                Why Choose Us?
              </h2>
              <div className="space-y-4">
                {[
                  "Highly experienced doctors and medical staff",
                  "State-of-the-art facilities with cutting-edge tech",
                  "24/7 emergency and critical care services",
                  "Patient-centered approach with personalized treatments",
                  "Affordable and accessible healthcare for all"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 text-xs">
                      <FaCheck />
                    </div>
                    <span className="text-slate-300 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 w-full h-80 bg-slate-800/40 rounded-2xl border border-white/5 overflow-hidden shadow-inner relative">
               <img 
                src="https://images.unsplash.com/photo-1581056771107-2475d56397a5?q=80&w=2070&auto=format&fit=crop" 
                alt="Hospital Facility" 
                className="w-full h-full object-cover"
               />
               <div className="absolute inset-0 bg-blue-500/10 mix-blend-multiply" />
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
