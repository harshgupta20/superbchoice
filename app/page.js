import SkyBackdrop from "@/components/experience/SkyBackdrop";
import Starfield from "@/components/experience/Starfield";
import StoriesProgress from "@/components/experience/StoriesProgress";
import StickyBuyBar from "@/components/experience/StickyBuyBar";
import WhatsAppButton from "@/components/WhatsAppButton";

import HeroScene from "@/components/scenes/HeroScene";
import RoomScene from "@/components/scenes/RoomScene";
import ColorsScene from "@/components/scenes/ColorsScene";
import ReadingScene from "@/components/scenes/ReadingScene";
import SetupScene from "@/components/scenes/SetupScene";
import RomanceScene from "@/components/scenes/RomanceScene";
import GiftScene from "@/components/scenes/GiftScene";
import SocialScene from "@/components/scenes/SocialScene";
import OfferScene from "@/components/scenes/OfferScene";

import { brand, pricing } from "@/lib/config";

function ProductLd() {
  const ld = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "superb.choice Moon Lamp — 3D Realistic Moon Light",
    description:
      "A handcrafted 3D Moon Lamp with realistic lunar texture, 16 colors, touch control and rechargeable USB-C battery. The aesthetic upgrade your room deserves.",
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

      {/* Atmosphere */}
      <SkyBackdrop />
      <Starfield />
      <StoriesProgress segments={9} />

      {/* The film — 9 cinematic scenes */}
      <main className="relative">
        <HeroScene />
        <RoomScene />
        <ColorsScene />
        <ReadingScene />
        <SetupScene />
        <RomanceScene />
        <GiftScene />
        <SocialScene />
        <OfferScene />
      </main>

      {/* Persistent conversion */}
      <StickyBuyBar />
      <WhatsAppButton />
    </>
  );
}
