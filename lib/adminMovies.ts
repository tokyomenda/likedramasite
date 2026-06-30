import { movies } from "@/data/movies";
import type { Movie } from "@/types/movie";

export type AdminMovie = Movie & {
  isFeatured: boolean;
  isHd: boolean;
  posterImage?: string;
  backdropImage?: string;
};

export type AdminMovieFormValues = {
  title: string;
  description: string;
  posterUrl: string;
  bannerUrl: string;
  posterImage: string;
  backdropImage: string;
  country: string;
  genre: string;
  year: string;
  rating: string;
  episodes: string;
  isVip: boolean;
  isFeatured: boolean;
  isHd: boolean;
};

export const ADMIN_MOVIES_STORAGE_KEY = "likedrama-admin-movies";

export const emptyAdminMovieForm: AdminMovieFormValues = {
  title: "",
  description: "",
  posterUrl: "",
  bannerUrl: "",
  posterImage: "",
  backdropImage: "",
  country: "",
  genre: "Романс",
  year: new Date().getFullYear().toString(),
  rating: "8.0",
  episodes: "1",
  isVip: false,
  isFeatured: false,
  isHd: true,
};

export function getSeedAdminMovies(): AdminMovie[] {
  return movies.map((movie, index) => ({
    ...movie,
    isFeatured: index < 5,
    isHd: true,
    posterImage: "",
    backdropImage: "",
  }));
}

export function getAdminMoviePoster(movie: AdminMovie) {
  return movie.posterImage || movie.posterUrl;
}

export function getAdminMovieBackdrop(movie: AdminMovie) {
  return movie.backdropImage || movie.bannerUrl;
}

export function slugifyMovieTitle(title: string) {
  const slug = title
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s-]/gu, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return slug || `movie-${Date.now()}`;
}

export function movieToFormValues(movie: AdminMovie): AdminMovieFormValues {
  return {
    title: movie.title,
    description: movie.description,
    posterUrl: movie.posterUrl,
    bannerUrl: movie.bannerUrl,
    posterImage: movie.posterImage ?? "",
    backdropImage: movie.backdropImage ?? "",
    country: movie.country,
    genre: movie.genre,
    year: movie.year.toString(),
    rating: movie.rating.toString(),
    episodes: movie.episodes.toString(),
    isVip: movie.isVip,
    isFeatured: movie.isFeatured,
    isHd: movie.isHd,
  };
}

export function formValuesToMovie(
  values: AdminMovieFormValues,
  existingMovie?: AdminMovie,
): AdminMovie {
  const isVip = values.isVip;
  const title = values.title.trim();
  const posterUrl = values.posterUrl.trim() || values.posterImage;
  const bannerUrl = values.bannerUrl.trim() || values.backdropImage;

  return {
    id: existingMovie?.id ?? slugifyMovieTitle(title),
    title,
    description: values.description.trim(),
    posterUrl,
    bannerUrl,
    posterImage: values.posterImage,
    backdropImage: values.backdropImage,
    country: values.country.trim(),
    genre: values.genre.trim(),
    year: Number(values.year),
    rating: Number(values.rating),
    episodes: Number(values.episodes),
    isVip,
    isFree: !isVip,
    price: isVip ? "VIP" : "Үнэгүй",
    tags: existingMovie?.tags ?? [],
    isFeatured: values.isFeatured,
    isHd: values.isHd,
  };
}

export function loadAdminMovies() {
  const rawMovies = localStorage.getItem(ADMIN_MOVIES_STORAGE_KEY);

  if (!rawMovies) {
    const seedMovies = getSeedAdminMovies();
    saveAdminMovies(seedMovies);
    return seedMovies;
  }

  try {
    const parsedMovies = JSON.parse(rawMovies) as AdminMovie[];
    return parsedMovies.map((movie) => ({
      ...movie,
      isFeatured: Boolean(movie.isFeatured),
      isHd: movie.isHd ?? true,
      posterImage: movie.posterImage ?? "",
      backdropImage: movie.backdropImage ?? "",
    }));
  } catch {
    const seedMovies = getSeedAdminMovies();
    saveAdminMovies(seedMovies);
    return seedMovies;
  }
}

export function saveAdminMovies(nextMovies: AdminMovie[]) {
  localStorage.setItem(ADMIN_MOVIES_STORAGE_KEY, JSON.stringify(nextMovies));
}
