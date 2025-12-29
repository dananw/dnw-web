import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ThemeProvider } from "@/components/layout/ThemeProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Danan Wijaya - Full Stack Developer",
  description: "Passionate full-stack developer building exceptional web experiences with modern technologies.",
  keywords: ["Full Stack Developer", "Web Developer", "React", "Next.js", "TypeScript"],
  authors: [{ name: "Danan Wijaya" }],
  openGraph: {
    title: "Danan Wijaya - Full Stack Developer",
    description: "Passionate full-stack developer building exceptional web experiences with modern technologies.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Danan Wijaya - Full Stack Developer",
    description: "Passionate full-stack developer building exceptional web experiences with modern technologies.",
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
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-screen bg-background text-foreground">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}