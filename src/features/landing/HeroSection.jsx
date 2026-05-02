import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaPlay, FaArrowRight, FaChartLine, FaBell } from 'react-icons/fa';
import { HiOutlineUserGroup } from 'react-icons/hi';
import Button from '../../components/ui/Button';

// ─── Animated blob ────────────────────────────────────────────────────────────
const Blob = ({ className }) => (
  <div className={`absolute rounded-full blur-[80px] opacity-20 animate-blob ${className}`} />
);

// ─── Floating glass card ──────────────────────────────────────────────────────
const FloatingCard = ({ className, delay = 0, animClass = 'animate-float', children }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.7, ease: 'easeOut' }}
    className={`absolute glass-strong rounded-2xl p-4 shadow-2xl text-white z-20 ${animClass} ${className}`}
  >
    {children}
  </motion.div>
);

const HeroSection = () => {
  // Scroll progress bar
  useEffect(() => {
    const bar = document.createElement('div');
    bar.id = 'scroll-progress';
    document.body.appendChild(bar);

    const update = () => {
      const scrolled = window.scrollY;
      const total = document.body.scrollHeight - window.innerHeight;
      bar.style.width = `${(scrolled / total) * 100}%`;
    };
    window.addEventListener('scroll', update);

    return () => {
      window.removeEventListener('scroll', update);
      bar.remove();
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#0B1120]">
      {/* Gradient blobs */}
      <Blob className="w-[520px] h-[520px] bg-blue-500 top-[-80px] -left-40" />
      <Blob className="w-[420px] h-[420px] bg-purple-600 bottom-0 right-[-80px]" />
      <Blob className="w-[300px] h-[300px] bg-blue-700 top-1/2 left-1/2" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 grid lg:grid-cols-2 gap-16 items-center">

        {/* ── LEFT — Copy ─────────────────────────────────── */}
        <div className="text-center lg:text-left">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-7
              bg-blue-500/10 border border-blue-500/30 text-blue-400 text-sm font-bold"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            AI-Powered Health Monitoring System
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.65 }}
            className="text-5xl md:text-6xl lg:text-[70px] font-black text-white leading-[1.18] mb-7 tracking-tight"
            style={{ fontFamily: 'var(--font-title)' }}
          >
            Elevate Your{' '}
            <span className="text-gradient">Healthcare</span>{' '}
            with DTech AI
          </motion.h1>

          {/* Sub-text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-slate-400 text-[17px] md:text-xl mb-10 max-w-lg mx-auto lg:mx-0 leading-[1.75]"
          >
            AI-powered system for managing patients, doctors, appointments and analytics — all in one place.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
          >
            <Link to="/signup">
              <Button variant="primary" className="px-8 py-4 text-[15px] group">
                Get Started <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button variant="glass" className="px-8 py-4 text-[15px]">
              <span className="w-9 h-9 rounded-full bg-white/10 border border-white/15 flex items-center justify-center flex-shrink-0">
                <FaPlay className="text-xs ml-0.5" />
              </span>
              Watch Demo
            </Button>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.65, duration: 0.5 }}
            className="flex items-center gap-5 mt-10 justify-center lg:justify-start"
          >
            <div className="flex -space-x-3">
              {['44', '32', '68', '85'].map((id) => (
                <img
                  key={id}
                  src={`https://randomuser.me/api/portraits/men/${id}.jpg`}
                  alt="user"
                  loading="lazy"
                  className="w-10 h-10 rounded-full border-2 border-[#0B1120] object-cover"
                />
              ))}
            </div>
            <p className="text-sm text-slate-400">
              <span className="text-white font-bold">1.2M+</span> patients already trust us
            </p>
          </motion.div>
        </div>

        {/* ── RIGHT — Doctor Visual ─────────────────────── */}
        <div className="relative flex justify-center items-end h-[520px] lg:h-[620px]">
          {/* Background glow */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 blur-3xl" />

          {/* Doctor card */}
          <motion.div
            initial={{ opacity: 0, x: 80, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-72 sm:w-80 h-full rounded-3xl overflow-hidden
              glass border border-white/10 shadow-2xl"
          >
            <img
              src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
              alt="Senior Doctor"
              loading="lazy"
              className="w-full h-full object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent" />

            {/* Doctor name tag */}
            <div className="absolute bottom-4 left-3 right-3 glass rounded-2xl p-4 border border-white/10">
              <p className="text-white font-bold text-sm">Dr. Sarah Jenkins</p>
              <p className="text-slate-400 text-xs mt-0.5">Senior Cardiologist</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                </span>
                <span className="text-blue-400 text-xs font-semibold">Available Now</span>
              </div>
            </div>
          </motion.div>

          {/* Floating Analytics */}
          <FloatingCard className="top-10 -left-6 lg:-left-20 w-48" delay={0.75} animClass="animate-float">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <FaChartLine className="text-blue-400 text-xs" />
              </div>
              <span className="text-xs font-bold text-white">Analytics</span>
            </div>
            <div className="flex items-end gap-1 h-12">
              {[30, 55, 40, 70, 50, 85, 65].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-sm bg-gradient-to-t from-blue-500 to-purple-500"
                  style={{ height: `${h}%`, opacity: 0.55 + i * 0.06 }}
                />
              ))}
            </div>
            <p className="text-blue-400 text-xs font-bold mt-2">+24% this week</p>
          </FloatingCard>

          {/* Floating Patient Counter */}
          <FloatingCard className="top-36 -right-6 lg:-right-18 w-42" delay={0.9} animClass="animate-float-delay">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
                <HiOutlineUserGroup className="text-purple-400 text-sm" />
              </div>
              <span className="text-xs font-bold text-white">Patients</span>
            </div>
            <p className="text-3xl font-black text-white">1.2M+</p>
            <p className="text-slate-400 text-xs mt-0.5">Served globally</p>
          </FloatingCard>

          {/* Floating Notification */}
          <FloatingCard className="bottom-32 -left-6 lg:-left-20 w-52" delay={1.05} animClass="animate-float-slow">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                <FaBell className="text-purple-400 text-sm" />
              </div>
              <div>
                <p className="text-white text-xs font-bold">New Appointment</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Dr. Chen — 2:30 PM Today</p>
              </div>
            </div>
          </FloatingCard>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
