import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConsentBanner from "@/components/consent-banner";
import { FeatureRequestProvider } from "@/contexts/feature-requests-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jason Suarez | Développeur Fullstack",
  description:
    "Développeur fullstack spécialisé en React, TypeScript et Symfony. Création d'applications web modernes.",
  metadataBase: new URL("https://media.jason-suarez.com"),
  authors: [{ name: "Jason Suarez" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://media.jason-suarez.com",
    siteName: "Jason Suarez",
    title: "Jason Suarez | Développeur Fullstack",
    description:
      "Développeur fullstack - React, TypeScript, Symfony",
    images: [
      {
        url: "/images/og-jason-suarez.png",
        width: 1200,
        height: 630,
        alt: "Jason Suarez – Développeur Fullstack",
      },
    ],
  },
  alternates: {
    canonical: "https://media.jason-suarez.com",
  },
  twitter: {
    card: "summary_large_image",
    site: "@swarecito",
    creator: "@swarecito",
    title: "Jason Suarez | Développeur Fullstack",
    description:
      "Développeur fullstack - React, TypeScript, Symfony",
    images: ["/images/og-jason-suarez.png"],
  },
  keywords: [
    "développeur fullstack",
    "react developer",
    "typescript",
    "symfony developer",
    "next.js",
    "développeur freelance",
    "react native",
    "Jason Suarez",
    "développement web",
    "applications web",
  ],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  category: "Tech & Création Digitale",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "twitter:creator": "@swarecito",
    "instagram:creator": "@swarecito",
    "github:creator": "suarja",
    "linkedin:creator": "https://www.linkedin.com/in/jason-suarez/",
    "og:image:alt":
      "Automatisations IA, agents intelligents et workflows créatifs",
    "og:locale": "fr_FR",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0F0F0F",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <FeatureRequestProvider>
            {children}
            <ConsentBanner />
          </FeatureRequestProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
