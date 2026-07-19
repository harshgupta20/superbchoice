import AnnouncementBar from "@/components/AnnouncementBar";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import ProductShowcase from "@/components/ProductShowcase";
import VideoSection from "@/components/VideoSection";
import BeforeAfter from "@/components/BeforeAfter";
import GiftSection from "@/components/GiftSection";
import Testimonials from "@/components/Testimonials";
import InstagramFeed from "@/components/InstagramFeed";
import FAQ from "@/components/FAQ";
import TrustSection from "@/components/TrustSection";
import LimitedOffer from "@/components/LimitedOffer";
import Pricing from "@/components/Pricing";
import PurchasePopup from "@/components/PurchasePopup";
import WhatsAppButton from "@/components/WhatsAppButton";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";
import { brand, pricing } from "@/lib/config";
import { faqs } from "@/lib/data";

// Product + FAQ structured data for rich search results.
function StructuredData() {
  const productLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "superb.choice Moon Lamp — 3D Realistic Moon Light",
    description:
      "A hand-finished 3D Moon Lamp with realistic lunar texture, 16 color modes, touch control and rechargeable USB-C battery. Perfect aesthetic decor and gift.",
    brand: { "@type": "Brand", name: brand.name },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "10000",
      bestRating: "5",
    },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(pricing.current),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }}
      />
    </>
  );
}

export default function HomePage() {
  return (
    <>
      <StructuredData />
      <AnnouncementBar />
      <Navbar />

      <main>
        <Hero />
        <SocialProof />
        <Features />
        <Gallery />
        <ProductShowcase />
        <VideoSection />
        <BeforeAfter />
        <GiftSection />
        <Testimonials />
        <InstagramFeed />
        <FAQ />
        <TrustSection />
        <LimitedOffer />
        <Pricing />
      </main>

      <Footer />

      {/* Floating conversion widgets */}
      <PurchasePopup />
      <WhatsAppButton />
      <StickyCTA />
    </>
  );
}
