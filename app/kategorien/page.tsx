"use client";

import { useState } from "react";
import Link from "next/link";
import { ExpressiveTypography } from "@/components/ExpressiveTypography";
import { MicroInteraction } from "@/lib/micro-interactions";
import { ThreeDElement } from "@/components/3DElement";
import { allCategories, mockPodcasts } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { Tag, ArrowRight } from "lucide-react";

export default function CategoriesPage() {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const getCategoryStats = (category: string) => {
    const podcasts = mockPodcasts.filter((p) => p.category.includes(category));
    const episodes = podcasts.reduce((sum, p) => sum + p.episodes.length, 0);
    return { podcasts: podcasts.length, episodes };
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-24">
        <ExpressiveTypography variant="display" gradient className="mb-6">
          Kategorien
        </ExpressiveTypography>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
          Entdecke Podcasts nach Themen - von Programmierung bis Wirtschaft
        </p>
      </section>

      {/* Categories Grid */}
      <section className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allCategories.map((category, index) => {
            const stats = getCategoryStats(category);
            return (
              <MicroInteraction
                key={category}
                interaction="fadeInUp"
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  onHoverStart={() => setHoveredCategory(category)}
                  onHoverEnd={() => setHoveredCategory(null)}
                >
                  <Link href={`/podcast?category=${encodeURIComponent(category)}`}>
                    <ThreeDElement intensity={hoveredCategory === category ? 20 : 10}>
                      <div
                        className={`
                          relative p-8 rounded-3xl border-2 transition-all duration-300 overflow-hidden
                          ${
                            hoveredCategory === category
                              ? "border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
                              : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:border-blue-400 dark:hover:border-blue-500"
                          }
                        `}
                      >
                        {/* Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />

                        <div className="relative z-10">
                          <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600">
                              <Tag className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold">{category}</h3>
                          </div>

                          <div className="space-y-2 mb-6">
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Podcasts
                              </span>
                              <span className="font-bold text-lg">
                                {stats.podcasts}
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span className="text-gray-600 dark:text-gray-400">
                                Episoden
                              </span>
                              <span className="font-bold text-lg">
                                {stats.episodes}
                              </span>
                            </div>
                          </div>

                          <motion.div
                            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-medium"
                            whileHover={{ x: 5 }}
                          >
                            <span>Entdecken</span>
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>
                    </ThreeDElement>
                  </Link>
                </motion.div>
              </MicroInteraction>
            );
          })}
        </div>
      </section>
    </main>
  );
}

