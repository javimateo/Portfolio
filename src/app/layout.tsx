import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import Starfield from "@/components/Starfield";
import Nav from "@/components/Nav";
import LoadingProvider from "@/components/LoadingProvider";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Javier Mateo — Full-Stack Developer",
  description: "Portfolio de Javier Mateo, desarrollador full-stack.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <LoadingProvider>
          <Starfield />
          <Nav />
          <div className="relative z-10 flex min-h-full flex-1 flex-col">
            {children}
          </div>
        </LoadingProvider>
      </body>
    </html>
  );
}
