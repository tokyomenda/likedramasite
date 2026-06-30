"use client";

import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { WatchPageClient } from "@/components/movie/WatchPageClient";
import { getMovieDetail } from "@/data/movieDetails";
import {
  getRecommendedPublicMovies,
  usePublicMovies,
} from "@/hooks/usePublicMovies";
import { slugifyMovieTitle } from "@/lib/adminMovies";

type PublicWatchResolverProps = {
  slug: string;
};

export function PublicWatchResolver({ slug }: PublicWatchResolverProps) {
  const { isReady, movies } = usePublicMovies();
  const normalizedSlug = decodeURIComponent(slug).trim();
  const movie = movies.find(
    (item) =>
      item.id === normalizedSlug ||
      item.id === slug ||
      slugifyMovieTitle(item.title) === normalizedSlug,
  );

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
              {isReady ? "Үзэх кино олдсонгүй" : "Кино ачаалж байна"}
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
    <WatchPageClient
      detail={getMovieDetail(movie)}
      movie={movie}
      relatedMovies={getRecommendedPublicMovies(movies, movie)}
    />
  );
}
