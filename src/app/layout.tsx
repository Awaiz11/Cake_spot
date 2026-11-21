import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Playfair_Display, Plus_Jakarta_Sans, Pinyon_Script } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const pinyon = Pinyon_Script({
  subsets: ["latin"],
  variable: "--font-script-alt",
  display: "swap",
  weight: "400",
});

export const metadata: Metadata = {
  title: "Cake Spot — Custom Cakes & Boutique Patisserie, Lahore",
  description:
    "Handcrafted custom cakes in Lahore. Teddy bear cakes, anniversary cakes, milestone birthdays and fully bespoke themes — baked to order. 4.9★ from 570+ reviews.",
  keywords: [
    "Cake Spot",
    "custom cakes Lahore",
    "teddy bear cake Lahore",
    "anniversary cake Lahore",
    "birthday cake delivery Lahore",
    "cakespot.pk",
  ],
  openGraph: {
    title: "Cake Spot — Custom Cakes Lahore",
    description:
      "Bespoke cakes crafted in Lahore for birthdays, anniversaries and milestones. Send your cake idea on WhatsApp.",
    url: "https://cakespot.pk",
    siteName: "Cake Spot",
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "https://images.pexels.com/photos/30668691/pexels-photo-30668691.jpeg?auto=compress&cs=tinysrgb&w=1200",
        width: 1200,
        height: 900,
        alt: "Teddy bear birthday cake by Cake Spot, Lahore",
      },
    ],
  },
  alternates: { canonical: "/" },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "Cake Spot",
  description:
    "Custom cake boutique in Lahore — teddy bear cakes, anniversary cakes, milestone birthdays and fully bespoke theme cakes, baked to order.",
  url: "https://cakespot.pk",
  telephone: "+923072445458",
  email: "cakespot.pk@gmail.com",
  priceRange: "PKR 3,000 – PKR 28,000",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Block K, Gulberg III",
    addressLocality: "Lahore",
    addressRegion: "Punjab",
    addressCountry: "PK",
  },
  openingHours: "Mo-Su 07:00-02:00",
  areaServed: "Lahore",
  sameAs: ["https://www.instagram.com/cakespot.pk", "https://www.facebook.com/cakespot.pk/"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    reviewCount: "570",
    bestRating: "5",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable} ${pinyon.variable}`}>
      <body className="grain bg-cream text-ink antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </body>
    </html>
  );
}
