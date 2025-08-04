import React from "react";
import { Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "./globals.css";
// Remove SCSS import temporarily to avoid conflicts
// import "../styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Anusara Esberger - Data Scientist & ML Engineer Portfolio",
  description:
    "Portfolio showcasing data science projects, machine learning expertise, and professional experience.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
          <SmoothScrollProvider offset={80}>
            <ScrollProgressBar />
            {children}
          </SmoothScrollProvider>
      </body>
    </html>
  );
}
