import Layout from "@/components/layout/Layout";
import SEOHead from "@/components/SEOHead";
import OfferBanner from "@/components/home/OfferBanner";
import CitySelector from "@/components/home/CitySelector";
import HeroSection from "@/components/home/HeroSection";
import QuickActions from "@/components/home/QuickActions";
import DiagnosticShowcase from "@/components/home/DiagnosticShowcase";
import ServicesSection from "@/components/home/ServicesSection";
import PartnerLabs from "@/components/home/PartnerLabs";

import WhyChooseSection from "@/components/home/WhyChooseSection";
import AboutPreview from "@/components/home/AboutPreview";
import CTASection from "@/components/home/CTASection";

const Index = () => {
  return (
    <>
      <SEOHead
        title="Pathology Lab & Diagnostic Center Rewa"
        description="Diagnostics Hub Rewa - NABL accredited pathology lab offering 500+ diagnostic tests, blood tests, full body checkups & home sample collection in Rewa, Madhya Pradesh."
        canonical="/"
        keywords="pathology lab rewa, diagnostic center rewa, blood test rewa, NABL lab, home sample collection rewa, full body checkup rewa MP, online blood test booking India, best pathology lab in Rewa MP, diagnostic centers in Rewa Madhya Pradesh, blood test labs in Rewa, pathology labs near me in Rewa, trusted diagnostic lab India"
      />
      <OfferBanner />
      <CitySelector />
      <Layout>
        <HeroSection />
        <DiagnosticShowcase />
        <PartnerLabs />
        <ServicesSection />

        <WhyChooseSection />
        <AboutPreview />
        <CTASection />
      </Layout>
    </>
  );
};

export default Index;
