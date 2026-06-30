"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CategoryPills } from "@/components/movie/CategoryPills";
import { HeroSection } from "@/components/movie/HeroSection";
import { MovieSection } from "@/components/movie/MovieSection";
import { categories } from "@/data/movies";
import { getPublicMovieSections, usePublicMovies } from "@/hooks/usePublicMovies";

export default function Home() {
  const { movies } = usePublicMovies();
  const featuredMovies = movies.slice(0, 5);
  const movieSections = getPublicMovieSections(movies);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <main>
        <HeroSection movies={featuredMovies} />
        <div className="-mt-14 space-y-12 pb-16 sm:space-y-14">
          <CategoryPills categories={categories} />
          {movieSections.map((section) => (
            <MovieSection
              key={section.title}
              movies={section.movies}
              showRank={section.showRank}
              title={section.title}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
}
