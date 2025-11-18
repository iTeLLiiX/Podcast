"use client";

import { useState, useMemo } from "react";
import { PodcastCard } from "@/components/PodcastCard";
import { SearchBar } from "@/components/SearchBar";
import { CategoryFilter } from "@/components/CategoryFilter";
import { BentoGrid } from "@/components/BentoGrid";
import { ExpressiveTypography } from "@/components/ExpressiveTypography";
import { mockPodcasts, allCategories } from "@/lib/mock-data";
import { Podcast } from "@/types/podcast";
import { Headphones, TrendingUp, Clock, Star } from "lucide-react";

export default function PodcastOverview() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredPodcasts = useMemo(() => {
    let filtered = mockPodcasts;

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (podcast) =>
          podcast.title.toLowerCase().includes(query) ||
          podcast.description.toLowerCase().includes(query) ||
          podcast.author.toLowerCase().includes(query) ||
          podcast.category.some((cat) => cat.toLowerCase().includes(query))
      );
    }

    // Category Filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((podcast) =>
        selectedCategories.some((cat) => podcast.category.includes(cat))
      );
    }

    return filtered;
  }, [searchQuery, selectedCategories]);

  const handleToggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleClearCategories = () => {
    setSelectedCategories([]);
  };

  const bentoItems = [
    {
      id: "stats-1",
      content: (
        <div className="h-full flex flex-col justify-center">
          <Headphones className="w-12 h-12 text-blue-600 dark:text-blue-400 mb-4" />
          <div className="text-4xl font-bold mb-2">{mockPodcasts.length}</div>
          <div className="text-gray-600 dark:text-gray-400">Podcasts</div>
        </div>
      ),
    },
    {
      id: "stats-2",
      content: (
        <div className="h-full flex flex-col justify-center">
          <TrendingUp className="w-12 h-12 text-purple-600 dark:text-purple-400 mb-4" />
          <div className="text-4xl font-bold mb-2">
            {mockPodcasts.reduce((sum, p) => sum + p.episodes.length, 0)}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Episoden</div>
        </div>
      ),
    },
    {
      id: "stats-3",
      content: (
        <div className="h-full flex flex-col justify-center">
          <Clock className="w-12 h-12 text-pink-600 dark:text-pink-400 mb-4" />
          <div className="text-4xl font-bold mb-2">
            {Math.round(
              mockPodcasts.reduce(
                (sum, p) =>
                  sum +
                  p.episodes.reduce((s, e) => s + e.duration, 0),
                0
              ) / 3600
            )}
          </div>
          <div className="text-gray-600 dark:text-gray-400">Stunden</div>
        </div>
      ),
    },
    {
      id: "stats-4",
      content: (
        <div className="h-full flex flex-col justify-center">
          <Star className="w-12 h-12 text-yellow-600 dark:text-yellow-400 mb-4" />
          <div className="text-4xl font-bold mb-2">{allCategories.length}</div>
          <div className="text-gray-600 dark:text-gray-400">Kategorien</div>
        </div>
      ),
      span: { col: 2 },
    },
  ];

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16">
        <ExpressiveTypography variant="h1" gradient className="mb-6">
          Alle Podcasts
        </ExpressiveTypography>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Entdecke unsere Sammlung von Lern-Podcasts
        </p>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            onSearch={setSearchQuery}
            placeholder="Nach Podcasts, Autoren oder Kategorien suchen..."
          />
        </div>

        {/* Stats Bento Grid */}
        <div className="mb-12">
          <BentoGrid items={bentoItems} />
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <CategoryFilter
            categories={allCategories}
            selectedCategories={selectedCategories}
            onToggleCategory={handleToggleCategory}
            onClearAll={handleClearCategories}
          />
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">
              {filteredPodcasts.length} Podcast
              {filteredPodcasts.length !== 1 ? "s" : ""} gefunden
            </h2>
          </div>

          {filteredPodcasts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPodcasts.map((podcast, index) => (
                <PodcastCard key={podcast.id} podcast={podcast} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                Keine Podcasts gefunden
              </p>
              <p className="text-gray-500 dark:text-gray-500">
                Versuche andere Suchbegriffe oder Kategorien
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

