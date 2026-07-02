import type { Metadata } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";
import { Navbar, Footer } from "@/components/layout";
import { cn } from "@/lib/cn";

const sora = Sora({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: {
    template: "%s — SakkolDev",
    default: "SakkolDev — Chen Sakkol · Full-Stack Developer",
  },
  description:
    "Portfolio of Chen Sakkol — Full-Stack Developer building secure, scalable web and mobile apps with Laravel, Spring Boot, React and Next.js.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(sora.variable, inter.variable, "dark")}>
      <body className="antialiased min-h-screen flex flex-col bg-background text-on-background">
        <Navbar />
        <div className="flex-grow">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
