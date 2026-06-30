"use client";

import { useEffect, useMemo, useState } from "react";
import { ADMIN_MOVIES_STORAGE_KEY, type AdminMovie } from "@/lib/adminMovies";
import { movies as mockMovies } from "@/data/movies";
import type { Movie } from "@/types/movie";

function adminMovieToPublicMovie(movie: AdminMovie): Movie {
  return {
    id: movie.id,
    title: movie.title,
    description: movie.description,
    posterUrl: movie.posterImage || movie.posterUrl,
    bannerUrl: movie.backdropImage || movie.bannerUrl,
    genre: movie.genre,
    year: movie.year,
    rating: movie.rating,
    isVip: movie.isVip,
    isFree: movie.isFree,
    price: movie.price,
    episodes: movie.episodes,
    country: movie.country,
    tags: movie.tags ?? [],
  };
}

function readStoredAdminMovies() {
  const rawMovies = localStorage.getItem(ADMIN_MOVIES_STORAGE_KEY);

  if (!rawMovies) {
    return [];
  }

  try {
    const parsedMovies = JSON.parse(rawMovies) as AdminMovie[];
    return parsedMovies.map(adminMovieToPublicMovie);
  } catch {
    return [];
  }
}

function mergeMovies(localMovies: Movie[]) {
  const mergedMovies = new Map<string, Movie>();

  mockMovies.forEach((movie) => {
    mergedMovies.set(movie.id, movie);
  });

  localMovies.forEach((movie) => {
    mergedMovies.set(movie.id, movie);
  });

  const localIds = new Set(localMovies.map((movie) => movie.id));
  const localFirst = localMovies.filter(
    (movie, index, list) =>
      list.findIndex((item) => item.id === movie.id) === index,
  );
  const mockRest = mockMovies.filter((movie) => !localIds.has(movie.id));

  return [...localFirst, ...mockRest].map((movie) => mergedMovies.get(movie.id) ?? movie);
}

export function usePublicMovies() {
  const [localMovies, setLocalMovies] = useState<Movie[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadMovies = () => {
      setLocalMovies(readStoredAdminMovies());
      setIsReady(true);
    };

    const timer = window.setTimeout(loadMovies, 0);

    const handleStorage = (event: StorageEvent) => {
      if (event.key === ADMIN_MOVIES_STORAGE_KEY) {
        loadMovies();
      }
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const movies = useMemo(() => mergeMovies(localMovies), [localMovies]);

  return { isReady, movies };
}

export function getPublicMovieSections(movies: Movie[]) {
  return [
    { title: "Үргэлжлүүлэн үзэх", movies: movies.slice(1, 9) },
    { title: "Тренд", movies: movies.slice(0, 10) },
    { title: "Топ 10", movies: movies.slice(0, 10), showRank: true },
    {
      title: "Шинэ бүтээлүүд",
      movies: movies.filter((movie) => movie.year >= 2025),
    },
    {
      title: "Хятад драма",
      movies: movies.filter((movie) => movie.country === "Хятад"),
    },
    {
      title: "Солонгос драма",
      movies: movies.filter((movie) => movie.country === "Солонгос"),
    },
    { title: "Романс", movies: movies.filter((movie) => movie.genre === "Романс") },
    {
      title: "Инээдэм",
      movies: movies.filter((movie) => movie.genre === "Инээдэм"),
    },
    {
      title: "Гэмт хэрэг",
      movies: movies.filter((movie) => movie.genre === "Гэмт хэрэг"),
    },
    { title: "Зөвхөн VIP", movies: movies.filter((movie) => movie.isVip) },
    { title: "Танд санал болгох", movies: movies.slice(8, 16) },
  ];
}

export function getRecommendedPublicMovies(allMovies: Movie[], movie: Movie) {
  const byGenre = allMovies.filter(
    (item) => item.id !== movie.id && item.genre === movie.genre,
  );
  const fallback = allMovies.filter((item) => item.id !== movie.id);

  return [...byGenre, ...fallback]
    .filter(
      (item, index, list) =>
        list.findIndex((match) => match.id === item.id) === index,
    )
    .slice(0, 10);
}
