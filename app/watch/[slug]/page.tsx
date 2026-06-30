import type { Metadata } from "next";
import { PublicWatchResolver } from "@/components/movie/PublicWatchResolver";
import { movies } from "@/data/movies";

export function generateStaticParams() {
  return movies.map((movie) => ({
    slug: movie.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps<"/watch/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const movie = movies.find((item) => item.id === slug);

  if (!movie) {
    return {
      title: "Үзэх хуудас | LikeDrama",
    };
  }

  return {
    title: `${movie.title} үзэх | LikeDrama`,
    description: movie.description,
  };
}

export default async function WatchPage({ params }: PageProps<"/watch/[slug]">) {
  const { slug } = await params;

  return <PublicWatchResolver slug={slug} />;
}
