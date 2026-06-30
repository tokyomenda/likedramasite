import type { Metadata } from "next";
import { PublicMovieDetailResolver } from "@/components/movie/PublicMovieDetailResolver";
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
      title: "Кино | LikeDrama",
    };
  }

  return {
    title: `${movie.title} | LikeDrama`,
    description: movie.description,
  };
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { slug } = await params;

  return <PublicMovieDetailResolver slug={slug} />;
}
