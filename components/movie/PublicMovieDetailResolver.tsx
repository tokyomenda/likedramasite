"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MovieDetailClient } from "@/components/movie/MovieDetailClient";
import { getMovieDetail, movieComments } from "@/data/movieDetails";
import {
  getRecommendedPublicMovies,
  usePublicMovies,
} from "@/hooks/usePublicMovies";

type PublicMovieDetailResolverProps = {
  slug: string;
};

export function PublicMovieDetailResolver({
  slug,
}: PublicMovieDetailResolverProps) {
  const { isReady, movies } = usePublicMovies();
  const movie = movies.find((item) => item.id === slug);

  if (!movie) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <main className="mx-auto grid min-h-[70vh] max-w-3xl place-items-center px-4 pt-28 text-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
              LikeDrama
            </p>
            <h1 className="mt-3 text-4xl font-black">
              {isReady ? "Кино олдсонгүй" : "Кино ачаалж байна"}
            </h1>
            <p className="mt-4 text-zinc-400">
              {isReady
                ? "Админ жагсаалт эсвэл mock мэдээлэлд энэ кино алга байна."
                : "Түр хүлээнэ үү."}
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <MovieDetailClient
      comments={movieComments}
      detail={getMovieDetail(movie)}
      movie={movie}
      recommended={getRecommendedPublicMovies(movies, movie)}
    />
  );
}
