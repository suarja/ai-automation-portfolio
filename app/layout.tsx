import type React from "react";
import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { FeatureRequestProvider } from "@/contexts/feature-requests-context";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jason Suárez | Développeur full-stack",
  description:
    "Développeur full-stack chez C'CIN et créateur d'applications mobiles. Je prends des produits en charge du besoin à leur mise en production.",
  metadataBase: new URL("https://www.jason-suarez.com"),
  authors: [{ name: "Jason Suarez" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://www.jason-suarez.com",
    siteName: "Jason Suarez",
    title: "Jason Suárez | Développeur full-stack",
    description:
      "Développeur full-stack chez C'CIN et créateur d'applications mobiles.",
    images: [
      {
        url: "/images/og-jason-suarez.png",
        width: 1200,
        height: 630,
        alt: "Jason Suárez, développeur full-stack",
      },
    ],
  },
  alternates: {
    canonical: "https://www.jason-suarez.com",
    languages: {
      fr: "https://www.jason-suarez.com/",
      en: "https://www.jason-suarez.com/en",
      es: "https://www.jason-suarez.com/es",
    },
  },
  twitter: {
    card: "summary_large_image",
    site: "@swarecito",
    creator: "@swarecito",
    title: "Jason Suárez | Développeur full-stack",
    description:
      "Développeur full-stack chez C'CIN et créateur d'applications mobiles.",
    images: ["/images/og-jason-suarez.png"],
  },
  keywords: [
    "développeur full-stack",
    "react developer",
    "typescript",
    "symfony developer",
    "next.js",
    "nestjs",
    "convex",
    "react native",
    "expo",
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
      "Jason Suárez, développeur full-stack",
    "og:locale": "fr_FR",
    "format-detection": "telephone=no",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fafbfd" },
    { media: "(prefers-color-scheme: dark)", color: "#0f0f0f" },
  ],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = requestHeaders.get("x-portfolio-locale") ?? "fr";

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <FeatureRequestProvider>
            <div className="ambient" aria-hidden="true" />
            {children}
          </FeatureRequestProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
