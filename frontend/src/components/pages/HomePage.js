import React from "react";
import MainSection from "../landing-page/main-section/MainSection";
import MainContentBlock from "../landing-page/main-content-block/MainContentBlock";
import ContentSection from "../landing-page/content-section/ContentSection";
import MarketplaceSection from "../landing-page/marketplace-section/MarketplaceSection";
import FAQSection from "../landing-page/faq-section/FAQSection";
import Footer from "../landing-page/footer/Footer";

function HomePage() {

  return (
    <div>
      <MainSection />
      <MainContentBlock />
      <ContentSection />
      <MarketplaceSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default HomePage;
