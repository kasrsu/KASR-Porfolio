import React from "react";
import { Inter, JetBrains_Mono, Fira_Code, Source_Code_Pro } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SmoothScrollProvider } from "@/components/SmoothScroll";
import { ScrollProgressBar } from "@/components/ui/ScrollProgressBar";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// Modern terminal/hacker fonts
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  weight: ["300", "400", "500", "600", "700"],
});

const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  variable: "--font-source-code-pro",
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

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
      <body className={`${inter.className} ${jetbrainsMono.variable} ${firaCode.variable} ${sourceCodePro.variable}`}>
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
