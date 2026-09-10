import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Jost, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/data";
import CartProvider from "@/context/CartContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import AnnouncementBar from "@/components/AnnouncementBar";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import CartSidebar from "@/components/CartSidebar";
import FavoritesSidebar from "@/components/FavoritesSidebar";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import BackToTop from "@/components/BackToTop";
import LoadingScreen from "@/components/LoadingScreen";
import PageTransitions from "@/components/PageTransitions";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Vibe & Fit | Moda de mujer y deportiva",
    template: "%s | Vibe & Fit",
  },
  description: SITE.description,
  keywords: [
    "moda mujer",
    "ropa deportiva",
    "Vibe & Fit",
    "ropa Ecuador",
    "estilo",
    "deportiva mujer",
  ],
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "Vibe & Fit | Moda de mujer y deportiva",
    description: SITE.description,
    locale: "es_ES",
    images: [
      {
        url: `${SITE.url}/images/1.jpg`,
        width: 1600,
        height: 1000,
        alt: SITE.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Vibe & Fit | Moda de mujer y deportiva",
    description: SITE.description,
    images: [`${SITE.url}/images/1.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/images/logo.png", type: "image/png" }],
    shortcut: "/images/logo.png",
    apple: "/images/logo.png",
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem("vibefit-theme");if(t==="dark"||(!t&&window.matchMedia("(prefers-color-scheme: dark)").matches)){document.documentElement.classList.add("dark");}}catch(e){}})();`;

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4efe9" },
    { media: "(prefers-color-scheme: dark)", color: "#131110" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/images/logo.png`,
    description: SITE.description,
    sameAs: [`https://instagram.com/${SITE.instagram.replace("@", "")}`],
  };

  return (
    <html
      lang="es"
      className={`${playfair.variable} ${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
        <SmoothScroll>
          <CartProvider>
            <FavoritesProvider>
              <AnnouncementBar />
              <Navigation />
              <main>{children}</main>
              <Footer />
              <CartSidebar />
              <FavoritesSidebar />
            </FavoritesProvider>
          </CartProvider>
        </SmoothScroll>
        <CustomCursor />
        <WhatsAppFloat />
        <BackToTop />
        <PageTransitions />
        <LoadingScreen />
      </body>
    </html>
  );
}