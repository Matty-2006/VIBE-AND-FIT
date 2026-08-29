import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter, Playfair_Display } from "next/font/google";
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

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "ISABEL | Moda femenina",
    template: "%s | ISABEL",
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    url: SITE.url,
    siteName: SITE.name,
    title: "ISABEL | Moda femenina",
    description: SITE.description,
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: "ISABEL | Moda femenina",
    description: SITE.description,
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/images/logo.png" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/images/logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#111111",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`${playfair.variable} ${cormorant.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
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
      </body>
    </html>
  );
}