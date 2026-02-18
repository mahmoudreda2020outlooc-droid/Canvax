import type { Metadata } from "next";
import { Outfit, Playfair_Display } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { ThemeProvider } from "@/context/ThemeContext";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CanVax | Premium Art Prints",
  description: "Discover exclusive classic, modern, and famous art prints.",
  icons: {
    icon: "/story-img.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${playfair.variable}`}>
        <ThemeProvider>
          <LanguageProvider>
            <CartProvider>
              <Navbar />
              {children}
              <Footer />
            </CartProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
