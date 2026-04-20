import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  axes: ["opsz", "SOFT"],
});

const siteUrl = "https://samueldascaluphotography.ro";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Samuel Dascalu — Photography & Videography",
    template: "%s · Samuel Dascalu",
  },
  description:
    "Photography and videography by Samuel Dascalu. Weddings, portraits, events, and commercial work across Romania and beyond.",
  keywords: [
    "photography Romania",
    "videography Romania",
    "wedding photographer",
    "portrait photographer",
    "Samuel Dascalu",
  ],
  authors: [{ name: "Samuel Dascalu" }],
  creator: "Samuel Dascalu",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Samuel Dascalu — Photography & Videography",
    description:
      "Photography and videography by Samuel Dascalu. Weddings, portraits, events, and commercial work.",
    siteName: "Samuel Dascalu Photography",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Dascalu — Photography & Videography",
    description:
      "Photography and videography by Samuel Dascalu. Weddings, portraits, events, and commercial work.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${fraunces.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-[color:var(--cream)] text-[color:var(--ink)]">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
