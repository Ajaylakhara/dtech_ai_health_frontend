import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import HeroSection from '../../features/landing/HeroSection';
import TrustSection from '../../features/landing/TrustSection';
import StatsSection from '../../features/landing/StatsSection';
import ServicesSection from '../../features/landing/ServicesSection';
import StepsSection from '../../features/landing/StepsSection';
import DoctorsSection from '../../features/landing/DoctorsSection';
import TestimonialsSection from '../../features/landing/TestimonialsSection';
import PricingSection from '../../features/landing/PricingSection';
import CTASection from '../../features/landing/CTASection';
import FAQSection from '../../features/landing/FAQSection';

const Home = () => {
  return (
    <div style={{ width: '100%', background: '#FFFFFF', minHeight: '100vh', fontFamily: "'Inter', sans-serif", overflowX: 'hidden' }}>
      <Navbar />
      <main>
        <HeroSection />
        <TrustSection />
        <StatsSection />
        <ServicesSection />
        <StepsSection />
        <DoctorsSection />
        <TestimonialsSection />
        <PricingSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Home;
