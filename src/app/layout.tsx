import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sandra Wrapped | 60 Años de Magia",
  description: "Una experiencia cinematográfica para celebrar 60 años de una vida extraordinaria.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  openGraph: {
    title: "Sandra Wrapped",
    description: "60 Años de Magia y Recuerdos",
    type: "website",
    images: ["/og-image.jpg"], // Placeholder for potential future share image
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="bg-black">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black overflow-hidden select-none`}
      >
        {children}
      </body>
    </html>
  );
}
