import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'rgb(23, 60, 99)',
      borderTop: '1px solid rgba(255, 255, 255, 0.08)',
      padding: '48px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '16px',
      width: '100%',
    }} className="footer-minimal">
      {/* Copyright Text */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '14px',
        fontWeight: '500',
        color: 'rgba(255, 255, 255, 0.65)',
        margin: 0,
        textAlign: 'center',
        letterSpacing: '0.02em',
        transition: 'color 0.3s ease',
      }} className="footer-copyright">
        © {currentYear} MediCare Health System. All rights reserved.
      </p>

      {/* Created By Text */}
      <p style={{
        fontFamily: "'Inter', sans-serif",
        fontSize: '13px',
        fontWeight: '400',
        color: 'rgba(255, 255, 255, 0.5)',
        margin: 0,
        textAlign: 'center',
        letterSpacing: '0.02em',
      }}>
        Created by <span style={{ fontWeight: '600', color: 'rgba(255, 255, 255, 0.8)' }}>Ajay Lakhara</span>
      </p>

      {/* Centered Icons */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        marginTop: '4px'
      }}>
        {[
          { icon: <FiGithub size={20} />, href: 'https://github.com/Ajaylakhara', label: 'GitHub' },
          { icon: <FiLinkedin size={20} />, href: 'https://www.linkedin.com/in/ajay-lakhara-9159b0190/', label: 'LinkedIn' },
          { icon: <FiMail size={20} />, href: 'mailto:ajaylakhara748@gmail.com', label: 'Email' },
        ].map((social, index) => (
          <a
            key={index}
            href={social.href}
            target={social.href.startsWith('mailto') ? undefined : '_blank'}
            rel={social.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
            aria-label={social.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.6)',
              textDecoration: 'none',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              cursor: 'pointer',
            }}
            className="footer-icon"
          >
            {social.icon}
          </a>
        ))}
      </div>

      <style>{`
        .footer-minimal {
          background-color: rgb(23, 60, 99) !important;
          border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
        }
        .footer-copyright {
          color: rgba(255, 255, 255, 0.65) !important;
        }
        .footer-minimal:hover .footer-copyright {
          color: #FFFFFF !important;
        }
        .footer-icon {
          color: rgba(255, 255, 255, 0.6) !important;
        }
        .footer-icon:hover {
          color: var(--accent, #4A90E2) !important;
          transform: translateY(-4px) scale(1.15);
        }
      `}</style>
    </footer>
  );
};

export default Footer;


