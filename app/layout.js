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
    default: "superb.choice — Bring The Moon Home 🌙",
    template: "%s | superb.choice",
  },
  description:
    "Own your own moon. A handcrafted 3D Moon Lamp with a warm, dreamy glow, 16 colors and touch control. Loved by 10,000+. Fast free shipping & 7-day replacement — 56% OFF tonight.",
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
    title: "Bring The Moon Home 🌙 | superb.choice",
    description:
      "An immersive Moon Lamp experience. Turn any room into magic — 16 colors, touch control, dreamy glow. 56% OFF tonight + Fast Free Shipping.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bring The Moon Home 🌙 | superb.choice",
    description:
      "Own your own moon. Loved by 10,000+. 56% OFF tonight + Fast Free Shipping.",
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
