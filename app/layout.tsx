import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import ConsentBanner from "@/components/consent-banner";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Site Personnel | Automatisation & IA",
  description: "Le temps, c'est de l'argent. Automatise les deux.",
  generator: "v0.dev",
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
          {children}
          <ConsentBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
