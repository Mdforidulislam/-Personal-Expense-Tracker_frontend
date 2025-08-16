import ScrollToTopButton from "@/components/ui/ScrollToTopButton/ScrollToTopButton";
import { NextUiProvider } from "@/lib/providers/NextUIProvider";
import ReduxProvider from "@/redux/ReduxProvider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";
import FacebookPixel from "@/FacebookPixel";

const inter = Inter({
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "ARC (Allied Restoration Contractors)",
  description:
    "Award Winning Service Allied Restoration Contractors, Repairs & Replacement",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4743849065459298"
          crossOrigin="anonymous"
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${inter.variable} antialiased !bg-gray-50`}
      >
        <NextUiProvider>
          <ReduxProvider>
            <>
              <div className="min-h-screen grid grid-rows-[auto_1fr_auto] max-w-[100vw] overflow-hidden">
                <FacebookPixel />
                {children}
              </div>
              <ScrollToTopButton />
              <Toaster />
            </>
          </ReduxProvider>
        </NextUiProvider>
      </body>
    </html>
  );
}
