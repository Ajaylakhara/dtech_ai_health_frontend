import { Link } from 'react-router-dom';
import { FaTwitter, FaLinkedin, FaGithub, FaArrowRight } from 'react-icons/fa';
import { FiActivity } from 'react-icons/fi';

const footerLinks = {
  Product: ['Features', 'Solutions', 'Pricing', 'Resources'],
  Support: ['Help Center', 'API Docs', 'Community', 'Privacy Policy'],
};

const Footer = () => (
  <footer className="bg-[#0B1120] pt-20 pb-10 border-t border-white/5 relative overflow-hidden">
    {/* Radial blur for footer background */}
    <div className="absolute inset-0 pointer-events-none select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[100px]" />
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

        {/* Brand */}
        <div className="space-y-6 lg:col-span-1">
          <Link to="/" className="flex items-center gap-3 select-none group">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#3B82F6] to-[#8B5CF6]
              flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-all">
              <FiActivity className="text-white text-xl" />
            </div>
            <span className="text-white text-[22px] font-black tracking-tight select-none">
              DTech<span className="text-gradient"> AI</span>
            </span>
          </Link>
          <p className="text-slate-400 text-[15px] leading-[1.75]">
            Transforming medical excellence through advanced AI-powered healthcare management systems.
          </p>
          {/* Social icons */}
          <div className="flex gap-3">
            {[FaTwitter, FaLinkedin, FaGithub].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label={['Twitter', 'LinkedIn', 'GitHub'][i]}
                className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                  text-slate-400 hover:text-blue-400 hover:bg-blue-500/10 hover:border-blue-500/30
                  transition-all duration-200"
              >
                <Icon size={18} />
              </a>
            ))}
          </div>
        </div>

        {/* Link groups */}
        {Object.entries(footerLinks).map(([group, links]) => (
          <div key={group}>
            <h4 className="text-white font-bold text-base mb-6 select-none">{group}</h4>
            <ul className="space-y-4">
              {links.map((link) => (
                <li key={link}>
                  <Link
                    to="#"
                    className="text-slate-400 text-[15px] hover:text-white hover:translate-x-1
                      transition-all duration-200 inline-flex items-center gap-1 group"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Newsletter */}
        <div>
          <h4 className="text-white font-bold text-base mb-3 select-none">Stay Updated</h4>
          <p className="text-slate-400 text-[15px] mb-5 leading-relaxed">
            Get the latest healthcare tech updates in your inbox.
          </p>
          <form className="relative" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 px-4 text-white text-sm
                placeholder:text-slate-400 focus:outline-none focus:border-blue-500/50
                focus:bg-white/8 transition-all duration-200"
            />
            <button
              type="submit"
              className="absolute right-2 top-2 bottom-2 px-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg
                text-xs font-bold hover:shadow-[0_0_15px_rgba(59,130,246,0.35)] transition-all flex items-center gap-1"
            >
              Join <FaArrowRight className="text-[10px]" />
            </button>
          </form>

          {/* Mini CTA */}
          <div className="mt-6 p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 select-none">
            <p className="text-white text-sm font-bold mb-1">Start your free trial →</p>
            <p className="text-slate-400 text-xs">No credit card required. 14 days free.</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-slate-400 text-sm">© 2026 DTech AI. All rights reserved.</p>
        <div className="flex gap-8 select-none">
          {['Terms', 'Privacy', 'Cookies'].map((link) => (
            <Link
              key={link}
              to="#"
              className="text-slate-400 text-sm hover:text-white transition-colors duration-200"
            >
              {link}
            </Link>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
