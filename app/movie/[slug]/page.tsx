import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MovieDetailClient } from "@/components/movie/MovieDetailClient";
import {
  getMovieDetail,
  getRecommendedMovies,
  movieComments,
} from "@/data/movieDetails";
import { movies } from "@/data/movies";

type MoviePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return movies.map((movie) => ({
    slug: movie.id,
  }));
}

export async function generateMetadata({
  params,
}: MoviePageProps): Promise<Metadata> {
  const { slug } = await params;
  const movie = movies.find((item) => item.id === slug);

  if (!movie) {
    return {
      title: "Кино олдсонгүй | LikeDrama",
    };
  }

  return {
    title: `${movie.title} | LikeDrama`,
    description: movie.description,
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params;
  const movie = movies.find((item) => item.id === slug);

  if (!movie) {
    notFound();
  }

  return (
    <MovieDetailClient
      comments={movieComments}
      detail={getMovieDetail(movie)}
      movie={movie}
      recommended={getRecommendedMovies(movie)}
    />
  );
}
