import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ExperimentalNav } from "@/components/ExperimentalNav";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { AudioPlayer } from "@/components/AudioPlayer";
import { Chatbot } from "@/components/Chatbot";

export const metadata: Metadata = {
  title: "Podcast Lernplattform",
  description: "Moderne Plattform für Lern-Podcasts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" suppressHydrationWarning>
      <body className="antialiased min-h-screen flex flex-col">
        <SmoothScrollProvider>
          <Header />
          <ExperimentalNav />
          <main className="flex-1 pb-32">
            {children}
          </main>
          <Footer />
          <AudioPlayer />
          <Chatbot />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}

