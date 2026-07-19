import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const display = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  weight: ["500", "600", "700", "800"],
});

const SITE_URL = "https://superbchoice.example";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "superb.choice — Moon Lamp | Bring the Moon Into Your Room",
    template: "%s | superb.choice",
  },
  description:
    "The viral 3D Moon Lamp loved by 10,000+ customers. Realistic lunar texture, 16 warm-to-cool colors, touch control & rechargeable battery. Free shipping, Cash on Delivery & 7-day replacement. Order today — 50% OFF.",
  keywords: [
    "moon lamp",
    "3d moon lamp",
    "moon light",
    "bedroom decor",
    "aesthetic room lamp",
    "gift for couples",
    "night lamp",
    "superb.choice",
  ],
  authors: [{ name: "superb.choice" }],
  creator: "superb.choice",
  applicationName: "superb.choice",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: "superb.choice",
    title: "Moon Lamp — Bring the Moon Into Your Room | superb.choice",
    description:
      "Turn any room into an aesthetic, cozy escape. Realistic 3D Moon Lamp with 16 colors & touch control. 50% OFF today + Free Shipping & COD.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Moon Lamp — Bring the Moon Into Your Room | superb.choice",
    description:
      "The viral Moon Lamp loved by 10,000+ customers. 50% OFF today + Free Shipping & Cash on Delivery.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  category: "shopping",
};

export const viewport = {
  themeColor: "#090909",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  colorScheme: "dark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable}`}>
      <body className="bg-night-950 font-sans antialiased">{children}</body>
    </html>
  );
}
