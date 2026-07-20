import SkyBackdrop from "@/components/experience/SkyBackdrop";
import Starfield from "@/components/experience/Starfield";
import StoriesProgress from "@/components/experience/StoriesProgress";
import StickyBuyBar from "@/components/experience/StickyBuyBar";
import LiveStoreProvider from "@/components/experience/LiveStoreProvider";
import PurchasePopup from "@/components/experience/PurchasePopup";
import WhatsAppButton from "@/components/WhatsAppButton";

import HeroScene from "@/components/scenes/HeroScene";
import RoomScene from "@/components/scenes/RoomScene";
import DesignsScene from "@/components/scenes/DesignsScene";
import ReadingScene from "@/components/scenes/ReadingScene";
import SetupScene from "@/components/scenes/SetupScene";
import RomanceScene from "@/components/scenes/RomanceScene";
import GiftScene from "@/components/scenes/GiftScene";
import SocialScene from "@/components/scenes/SocialScene";

import CheckoutProvider from "@/components/store/CheckoutProvider";
import ProductBlock from "@/components/store/ProductBlock";
import Bundles from "@/components/store/Bundles";
import Benefits from "@/components/store/Benefits";
import ReviewsWall from "@/components/store/ReviewsWall";
import PaymentTrust from "@/components/store/PaymentTrust";
import Footer from "@/components/store/Footer";

import { brand, pricing } from "@/lib/config";

function ProductLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "superb.choice Crystal Ball Lamp — 3D Laser-Engraved Night Light",
    description:
      "A 3D laser-engraved crystal ball (Moon, Solar System or Lord Shiva) on a warm wooden LED base. USB powered. The aesthetic upgrade your room deserves.",
    brand: { "@type": "Brand", name: brand.name },
    aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "10000", bestRating: "5" },
    offers: {
      "@type": "Offer",
      priceCurrency: "INR",
      price: String(pricing.current),
      availability: "https://schema.org/InStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />;
}

export default function HomePage() {
  return (
    <>
      <ProductLd />

      <LiveStoreProvider>
       <CheckoutProvider>
        {/* Atmosphere */}
        <SkyBackdrop />
        <Starfield />
        <StoriesProgress segments={8} />

        <main className="relative">
          {/* The film — cinematic scenes */}
          <HeroScene />
          <RoomScene />
          <DesignsScene />
          <ReadingScene />
          <SetupScene />
          <RomanceScene />
          <GiftScene />
          <SocialScene />

          {/* The store — single-product commerce */}
          <ProductBlock />
          <Bundles />
          <Benefits />
          <ReviewsWall />
          <PaymentTrust />
        </main>

        <Footer />

        {/* Persistent conversion */}
        <StickyBuyBar />
        <WhatsAppButton />
        <PurchasePopup />
       </CheckoutProvider>
      </LiveStoreProvider>
    </>
  );
}
