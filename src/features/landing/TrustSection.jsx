import { FiShield, FiCheckCircle, FiAward, FiHeart } from 'react-icons/fi';

const partners = [
  { name: 'WHO Partner', icon: '🌍' },
  { name: 'NABH Accredited', icon: '🏥' },
  { name: 'ISO 9001:2015', icon: '✅' },
  { name: 'JCI Certified', icon: '🏆' },
  { name: 'Apollo Network', icon: '💙' },
  { name: 'NABL Lab', icon: '🔬' },
  { name: 'AIIMS Affiliated', icon: '🎓' },
  { name: 'Red Cross Partner', icon: '❤️' },
];

const repeated = [...partners, ...partners];

const TrustSection = () => {
  return (
    <section style={{ background: '#F4F7FB', padding: '36px 0', borderTop: '1px solid #E8EDF4', borderBottom: '1px solid #E8EDF4', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', marginBottom: 20, textAlign: 'center' }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: '#9DAAB8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          Trusted By Leading Health Organisations
        </p>
      </div>

      {/* Marquee */}
      <div style={{ position: 'relative', overflow: 'hidden' }}>
        {/* Fade edges */}
        <div style={{
          position: 'absolute', top: 0, left: 0, bottom: 0, width: 100, zIndex: 2,
          background: 'linear-gradient(to right, #F4F7FB, transparent)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute', top: 0, right: 0, bottom: 0, width: 100, zIndex: 2,
          background: 'linear-gradient(to left, #F4F7FB, transparent)',
          pointerEvents: 'none',
        }} />

        <div
          className="animate-marquee"
          style={{ display: 'flex', alignItems: 'center', gap: 0, width: 'max-content' }}
        >
          {repeated.map((partner, i) => (
            <div
              key={i}
              style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 32px',
                borderRight: '1px solid #E2E8F0',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ fontSize: 20 }}>{partner.icon}</span>
              <span style={{ fontSize: 14, fontWeight: 600, color: '#6B7A8D', letterSpacing: '0.01em' }}>
                {partner.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom trust badges */}
      <div style={{ maxWidth: 1200, margin: '24px auto 0', padding: '0 24px', display: 'flex', justifyContent: 'center', gap: 40, flexWrap: 'wrap' }}>
        {[
          { icon: <FiShield />, text: '100% Secure & Private' },
          { icon: <FiCheckCircle />, text: 'Verified Specialists' },
          { icon: <FiAward />, text: 'Award Winning Care' },
          { icon: <FiHeart />, text: '24/7 Patient Support' },
        ].map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, color: '#6B7A8D', fontSize: 13, fontWeight: 500 }}>
            <span style={{ color: '#173C63', fontSize: 16 }}>{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustSection;
