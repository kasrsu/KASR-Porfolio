import React from "react";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme_provider";
import { SmoothScrollProvider } from "@/components/smooth_scroll";
import { ScrollProgressBar } from "@/components/ui/scroll_progress_bar";
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
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <SmoothScrollProvider offset={80}>
            <ScrollProgressBar />
            {children}
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
