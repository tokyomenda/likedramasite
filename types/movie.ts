export type Movie = {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  genre: string;
  year: number;
  rating: number;
  isVip: boolean;
  isFree: boolean;
  price: string;
  episodes: number;
  country: string;
  tags: string[];
};

export type Episode = {
  number: number;
  title: string;
  duration: string;
  isVipLocked: boolean;
};

export type MovieDetail = {
  originalTitle: string;
  duration: string;
  genres: string[];
  director: string;
  cast: string[];
  language: string;
  subtitle: string;
  resolution: "1080P" | "4K";
  status: string;
  releaseDate: string;
  trailerUrl: string;
  episodes: Episode[];
};

export type MovieComment = {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  date: string;
  text: string;
};
