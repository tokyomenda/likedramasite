import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WatchPageClient } from "@/components/movie/WatchPageClient";
import { getMovieDetail, getRecommendedMovies } from "@/data/movieDetails";
import { movies } from "@/data/movies";

type WatchPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return movies.map((movie) => ({
    slug: movie.id,
  }));
}

export async function generateMetadata({
  params,
}: WatchPageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = movies.find((item) => item.id === slug);

  if (!movie) {
    return {
      title: "Үзэх хуудас олдсонгүй | LikeDrama",
    };
  }

  return {
    title: `${movie.title} үзэх | LikeDrama`,
    description: movie.description,
  };
}

export default async function WatchPage({ params }: WatchPageProps) {
  const { slug } = await params;
  const movie = movies.find((item) => item.id === slug);

  if (!movie) {
    notFound();
  }

  return (
    <WatchPageClient
      detail={getMovieDetail(movie)}
      movie={movie}
      relatedMovies={getRecommendedMovies(movie)}
    />
  );
}
