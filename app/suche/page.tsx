"use client";

import { useState, useMemo } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PodcastCard } from "@/components/PodcastCard";
import { ExpressiveTypography } from "@/components/ExpressiveTypography";
import { MicroInteraction } from "@/lib/micro-interactions";
import { mockPodcasts } from "@/lib/mock-data";
import { Search, TrendingUp } from "lucide-react";

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPodcasts = useMemo(() => {
    if (!searchQuery) return [];

    const query = searchQuery.toLowerCase();
    return mockPodcasts.filter(
      (podcast) =>
        podcast.title.toLowerCase().includes(query) ||
        podcast.description.toLowerCase().includes(query) ||
        podcast.author.toLowerCase().includes(query) ||
        podcast.category.some((cat) => cat.toLowerCase().includes(query))
    );
  }, [searchQuery]);

  const suggestions = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const query = searchQuery.toLowerCase();
    const allTexts = mockPodcasts.flatMap((p) => [
      p.title,
      p.description,
      p.author,
      ...p.category,
    ]);
    return Array.from(
      new Set(
        allTexts.filter((text) =>
          text.toLowerCase().includes(query)
        )
      )
    ).slice(0, 5);
  }, [searchQuery]);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <div className="text-center mb-12">
          <ExpressiveTypography variant="display" gradient className="mb-6">
            Suche
          </ExpressiveTypography>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Finde genau den Podcast, den du suchst
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto mb-16">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Nach Podcasts, Autoren, Kategorien suchen..."
            suggestions={suggestions}
          />
        </div>

        {/* Results */}
        {searchQuery ? (
          <div>
            <div className="flex items-center gap-3 mb-8">
              <Search className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <h2 className="text-2xl font-bold">
                {filteredPodcasts.length} Ergebnis
                {filteredPodcasts.length !== 1 ? "se" : ""} für "{searchQuery}"
              </h2>
            </div>

            {filteredPodcasts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredPodcasts.map((podcast, index) => (
                  <MicroInteraction key={podcast.id} interaction="fadeInUp">
                    <PodcastCard podcast={podcast} index={index} />
                  </MicroInteraction>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <Search className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
                  Keine Ergebnisse gefunden
                </p>
                <p className="text-gray-500 dark:text-gray-500">
                  Versuche andere Suchbegriffe
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <TrendingUp className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-2">
              Beginne mit der Suche
            </p>
            <p className="text-gray-500 dark:text-gray-500">
              Gib einen Suchbegriff ein, um Podcasts zu finden
            </p>
          </div>
        )}
      </section>
    </main>
  );
}

