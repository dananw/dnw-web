import type { Metadata } from "next";
import { Fraunces, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dananwijaya.vercel.app"),
  title: "Danan Wijaya - Full Stack Developer",
  description:
    "Top Rated full-stack developer with 10+ years of experience, helping startups and enterprises ship scalable web platforms across e-commerce, SaaS, and fintech.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Danan Wijaya" }],
  openGraph: {
    title: "Danan Wijaya - Full Stack Developer",
    description:
      "Top Rated full-stack developer with 10+ years of experience, helping startups and enterprises ship scalable web platforms across e-commerce, SaaS, and fintech.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danan Wijaya - Full Stack Developer",
    description:
      "Top Rated full-stack developer with 10+ years of experience, helping startups and enterprises ship scalable web platforms across e-commerce, SaaS, and fintech.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${manrope.variable} ${fraunces.variable} ${jetbrainsMono.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col bg-background text-foreground">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}