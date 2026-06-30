"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MovieSection } from "@/components/movie/MovieSection";
import { usePublicMovies } from "@/hooks/usePublicMovies";

export default function MoviesPage() {
  const { movies } = usePublicMovies();

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
            LikeDrama
          </p>
          <h1 className="mt-3 text-4xl font-black">Кинонууд</h1>
          <p className="mt-3 max-w-2xl text-zinc-400">
            Бүх mock болон админаас нэмсэн киног нэг дороос үзэх хэсэг.
          </p>
        </div>
        <div className="-mx-4 sm:-mx-6 lg:-mx-8">
          <MovieSection movies={movies} title="Бүх кино" />
        </div>
      </main>
      <Footer />
    </div>
  );
}
