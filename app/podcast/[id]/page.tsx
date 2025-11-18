"use client";

import { use } from "react";
import { FullScreenHeader } from "@/components/FullScreenHeader";
import { EpisodeList } from "@/components/EpisodeList";
import { ExpressiveTypography } from "@/components/ExpressiveTypography";
import { BlendingImage } from "@/components/BlendingImage";
import { ThreeDElement } from "@/components/3DElement";
import { MicroInteraction } from "@/lib/micro-interactions";
import { mockPodcasts } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";
import { User, Calendar, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function PodcastDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const podcast = mockPodcasts.find((p) => p.id === id);

  if (!podcast) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Podcast nicht gefunden</h1>
          <Link href="/podcast" className="text-blue-600 dark:text-blue-400 hover:underline">
            Zurück zur Übersicht
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Full Screen Header */}
      <FullScreenHeader
        title={podcast.title}
        subtitle={podcast.description}
        imageUrl={podcast.coverImage}
      />

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        {/* Podcast Info Card */}
        <MicroInteraction interaction="fadeInUp">
          <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Cover Image */}
              <ThreeDElement intensity={15}>
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
                  {podcast.coverImage ? (
                    <Image
                      src={podcast.coverImage}
                      alt={podcast.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-white text-4xl font-bold">
                        {podcast.title.charAt(0)}
                      </span>
                    </div>
                  )}
                </div>
              </ThreeDElement>

              {/* Info */}
              <div className="md:col-span-2 space-y-6">
                <div>
                  <ExpressiveTypography variant="h2" className="mb-4">
                    {podcast.title}
                  </ExpressiveTypography>
                  <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                    {podcast.description}
                  </p>
                </div>

                {/* Meta Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <User className="w-5 h-5" />
                    <span className="font-medium">{podcast.author}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Calendar className="w-5 h-5" />
                    <span>{formatDate(podcast.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700 dark:text-gray-300">
                    <Tag className="w-5 h-5" />
                    <div className="flex flex-wrap gap-2">
                      {podcast.category.map((cat) => (
                        <span
                          key={cat}
                          className="px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MicroInteraction>

        {/* Episodes Section */}
        <section>
          <ExpressiveTypography variant="h2" className="mb-8">
            Episoden ({podcast.episodes.length})
          </ExpressiveTypography>
          <EpisodeList episodes={podcast.episodes} podcastId={podcast.id} />
        </section>
      </section>
    </main>
  );
}

