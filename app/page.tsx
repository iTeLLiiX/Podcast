"use client";

import { FullScreenHeader } from "@/components/FullScreenHeader";
import { ExpressiveTypography } from "@/components/ExpressiveTypography";
import { BentoGrid } from "@/components/BentoGrid";
import { ThreeDElement } from "@/components/3DElement";
import { MicroInteraction } from "@/lib/micro-interactions";
import { Headphones, BookOpen, Zap, TrendingUp } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const bentoItems = [
    {
      id: "1",
      content: (
        <div className="h-full flex flex-col justify-between">
          <Headphones className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
          <div>
            <h3 className="text-2xl font-bold mb-2">Neueste Episoden</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Entdecke die neuesten Lern-Podcasts
            </p>
          </div>
        </div>
      ),
      span: { row: 2 },
    },
    {
      id: "2",
      content: (
        <div className="h-full flex flex-col justify-between">
          <BookOpen className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
          <div>
            <h3 className="text-2xl font-bold mb-2">Kategorien</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Lerne nach Themen
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "3",
      content: (
        <div className="h-full flex flex-col justify-between">
          <Zap className="w-12 h-12 text-pink-600 dark:text-pink-400 mb-4" />
          <div>
            <h3 className="text-2xl font-bold mb-2">Beliebt</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Die meistgehörten Podcasts
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "4",
      content: (
        <div className="h-full flex flex-col justify-between">
          <TrendingUp className="w-12 h-12 text-green-600 dark:text-green-400 mb-4" />
          <div>
            <h3 className="text-2xl font-bold mb-2">Trending</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Was gerade angesagt ist
            </p>
          </div>
        </div>
      ),
      span: { col: 2 },
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Full Screen Header mit allen Effekten */}
      <FullScreenHeader
        title="Podcast Lernplattform"
        subtitle="Lerne spielerisch mit modernen Podcasts"
        ctaText="Jetzt starten"
        ctaHref="/podcast"
      />

      {/* Expressive Typography Section */}
      <section className="container mx-auto px-4 py-24">
        <ExpressiveTypography variant="display" gradient>
          Lerne. Höre. Wachse.
        </ExpressiveTypography>
      </section>

      {/* Bento Grid Section */}
      <section className="container mx-auto px-4 py-16">
        <BentoGrid items={bentoItems} />
      </section>

      {/* 3D Element Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="flex justify-center">
          <ThreeDElement intensity={20}>
            <MicroInteraction interaction="hoverGlow">
              <div className="p-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl text-white text-center">
                <h2 className="text-4xl font-bold mb-4">3D Interaktion</h2>
                <p className="text-lg">Bewege die Maus über dieses Element</p>
              </div>
            </MicroInteraction>
          </ThreeDElement>
        </div>
      </section>

      {/* CTA Section mit Micro Interactions */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center">
          <MicroInteraction interaction="fadeInUp">
            <Link
              href="/podcast"
              className="inline-block px-12 py-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full text-white text-xl font-bold hover:shadow-2xl transition-all"
            >
              Alle Podcasts entdecken
            </Link>
          </MicroInteraction>
        </div>
      </section>
    </main>
  );
}

