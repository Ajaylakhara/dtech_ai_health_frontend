import Navbar from '../../components/layout/Navbar';
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
import DTechFooter from '../../features/landing/DTechFooter';

const Home = () => {
  return (
    <div className="w-full bg-[#0B1120] min-h-screen text-slate-100 flex flex-col font-sans antialiased overflow-hidden selection:bg-blue-500/30">
      <Navbar />
      <main className="flex-grow flex flex-col">
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
      {/* <DTechFooter /> */}
    </div>
  );
};

export default Home;
