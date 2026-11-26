import type { Metadata, Viewport } from "next";
import {
  Manrope,
  DM_Sans,
  DM_Serif_Display,
  Plus_Jakarta_Sans,
} from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dmsans",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

/* DM Serif Display — the elegant serif used for hall headlines in the design */
const dmSerif = DM_Serif_Display({
  variable: "--font-dmserif",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

/* Plus Jakarta Sans — chips, prices, tags & the giant footer watermark */
const jakarta = Plus_Jakarta_Sans({
  variable: "--font-pjs",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Tayo Restaurant & Hall — Somali Cuisine in Mogadishu",
  description:
    "Taste the warmth of Somali cuisine. Tayo Restaurant serves authentic Somali favorites daily at Rugsan Mall, Mogadishu — and Tayo Hall hosts weddings and celebrations for up to 400 guests.",
  keywords: [
    "Tayo Restaurant",
    "Somali food",
    "Mogadishu restaurant",
    "Rugsan Mall",
    "Tayo Hall",
    "wedding venue Mogadishu",
    "Somali cuisine",
  ],
  icons: { icon: "/tayo-icon.svg" },
  openGraph: {
    title: "Tayo Restaurant & Hall — Taste the Warmth of Somali Cuisine",
    description:
      "Authentic Somali favorites served daily at Rugsan Mall, Mogadishu. Weddings & events at Tayo Hall.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#8b0f16",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${manrope.variable} ${dmSans.variable} ${dmSerif.variable} ${jakarta.variable} font-body antialiased bg-white text-ink`}
      >
        {children}
      </body>
    </html>
  );
}
