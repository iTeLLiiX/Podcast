"use client";

import { useState } from "react";
import { ExpressiveTypography } from "@/components/ExpressiveTypography";
import { MicroInteraction } from "@/lib/micro-interactions";
import { motion } from "framer-motion";
import { Upload, FileAudio, Image as ImageIcon, X, CheckCircle2 } from "lucide-react";

export default function UploadPage() {
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [coverFile, setCoverFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const availableCategories = [
    "C#",
    "SQL",
    "Netzwerk",
    "BWL",
    "Programmierung",
    "Datenbank",
    "IT",
    "Grundlagen",
  ];

  const handleAudioUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("audio/")) {
      setAudioFile(file);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setCoverFile(file);
    }
  };

  const toggleCategory = (category: string) => {
    setCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUploading(true);

    // Simuliere Upload
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsUploading(false);
    setUploadSuccess(true);

    // Reset nach 3 Sekunden
    setTimeout(() => {
      setUploadSuccess(false);
      setAudioFile(null);
      setCoverFile(null);
      setTitle("");
      setDescription("");
      setAuthor("");
      setCategories([]);
    }, 3000);
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section mit Anti Design */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <ExpressiveTypography variant="display" className="mb-6">
            Podcast Upload
          </ExpressiveTypography>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Lade deine Podcasts hoch und teile sie mit der Community
          </p>
        </div>

        {/* Upload Form - Anti Design Stil */}
        <MicroInteraction interaction="fadeInUp">
          <motion.form
            onSubmit={handleSubmit}
            className="max-w-4xl mx-auto space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* Audio Upload */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-3">
                Audio-Datei (MP3, OGG)
              </label>
              <div
                className={`
                  relative border-4 border-dashed rounded-3xl p-12 text-center transition-all duration-300
                  ${
                    audioFile
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800/50"
                  }
                `}
              >
                <input
                  type="file"
                  accept="audio/*"
                  onChange={handleAudioUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {audioFile ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto" />
                    <p className="font-semibold">{audioFile.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {(audioFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <FileAudio className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto" />
                    <div>
                      <p className="font-semibold mb-1">Audio-Datei auswählen</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        MP3, OGG oder andere Audio-Formate
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Cover Upload */}
            <div className="relative">
              <label className="block text-sm font-semibold mb-3">
                Cover-Bild (JPG, PNG)
              </label>
              <div
                className={`
                  relative border-4 border-dashed rounded-3xl p-12 text-center transition-all duration-300
                  ${
                    coverFile
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                      : "border-gray-300 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 bg-gray-50 dark:bg-gray-800/50"
                  }
                `}
              >
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleCoverUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                {coverFile ? (
                  <div className="space-y-2">
                    <CheckCircle2 className="w-12 h-12 text-green-600 dark:text-green-400 mx-auto" />
                    <p className="font-semibold">{coverFile.name}</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <ImageIcon className="w-16 h-16 text-gray-400 dark:text-gray-600 mx-auto" />
                    <div>
                      <p className="font-semibold mb-1">Cover-Bild auswählen</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        JPG, PNG oder andere Bildformate
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Metadaten */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2">
                  Titel *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="Podcast-Titel"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">
                  Autor *
                </label>
                <input
                  type="text"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors"
                  placeholder="Autor-Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Beschreibung *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none transition-colors resize-none"
                placeholder="Beschreibe deinen Podcast..."
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-semibold mb-3">
                Kategorien
              </label>
              <div className="flex flex-wrap gap-2">
                {availableCategories.map((category) => (
                  <motion.button
                    key={category}
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toggleCategory(category)}
                    className={`
                      px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                      ${
                        categories.includes(category)
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500"
                      }
                    `}
                  >
                    {category}
                    {categories.includes(category) && " ✓"}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isUploading || uploadSuccess}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`
                w-full py-4 rounded-xl font-bold text-lg transition-all duration-300
                ${
                  uploadSuccess
                    ? "bg-green-600 text-white"
                    : isUploading
                    ? "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white hover:shadow-2xl"
                }
              `}
            >
              {uploadSuccess ? (
                <span className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-6 h-6" />
                  Erfolgreich hochgeladen!
                </span>
              ) : isUploading ? (
                <span className="flex items-center justify-center gap-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Upload className="w-6 h-6" />
                  </motion.div>
                  Wird hochgeladen...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <Upload className="w-6 h-6" />
                  Podcast hochladen
                </span>
              )}
            </motion.button>
          </motion.form>
        </MicroInteraction>
      </section>
    </main>
  );
}

