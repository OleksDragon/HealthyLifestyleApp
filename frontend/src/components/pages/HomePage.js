import React from "react";
import MainSection from "../landing-page/main-section/MainSection";
import MainContentBlock from "../landing-page/main-content-block/MainContentBlock";
import ContentSection from "../landing-page/content-section/ContentSection";
import MarketplaceSection from "../landing-page/marketplace-section/MarketplaceSection";
import FAQSection from "../landing-page/faq-section/FAQSection";
import Footer from "../landing-page/footer/Footer";
import Bubble from "../landing-page/animated-background/Bubble";

function HomePage() {
  return (
    <div>
      <MainSection />
      <div className="bubbles-container between-sections">
        <Bubble className="bubble-2" />
      </div>
      <MainContentBlock />
      <div className="bubbles-container between-sections">
        <Bubble className="bubble-4" />
      </div>
      <ContentSection />
      <MarketplaceSection />
      <FAQSection />
      <Footer />
    </div>
  );
}

export default HomePage;
