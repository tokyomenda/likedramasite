import { movies } from "@/data/movies";
import type { Episode, Movie, MovieComment, MovieDetail } from "@/types/movie";

const originalTitles: Record<string, string> = {
  "midnight-river": "Midnight River",
  "sun-after-rain": "Sun After Rain",
  "capital-heirs": "Capital Heirs",
  "laughing-cafe": "Laughing Cafe",
  "red-palace": "Secret of the Red Palace",
  "glass-city": "Glass City",
  "island-run": "Island Run",
  "last-letter": "The Last Letter",
  "neon-contract": "Neon Contract",
  "summer-room": "Summer Room",
  "black-stage": "Black Stage",
  "two-bosses": "Two Bosses",
  "sky-border": "Sky Border",
  "moon-market": "Moon Market",
  "golden-road": "Golden Road",
  "silent-alibi": "Silent Alibi",
};

const directors = [
  "Б. Тэмүүлэн",
  "Ким Ха-юн",
  "Ли Со-жин",
  "Жан Вэй",
  "Сато Наоки",
  "А. Энхжин",
];

const castPool = [
  "Н. Ариунаа",
  "Пак Мин-жэ",
  "Ким Юна",
  "Жан Ли",
  "Сато Эми",
  "Б. Мөнх-Эрдэнэ",
  "Ли Хан",
  "Ц. Сарангэрэл",
];

function buildEpisodes(movie: Movie): Episode[] {
  return Array.from({ length: Math.min(movie.episodes, 24) }, (_, index) => {
    const number = index + 1;

    return {
      number,
      title: `${number}-р анги`,
      duration: number % 3 === 0 ? "58 мин" : "46 мин",
      isVipLocked: movie.isVip && number > 2,
    };
  });
}

export function getMovieDetail(movie: Movie): MovieDetail {
  const movieIndex = movies.findIndex((item) => item.id === movie.id);
  const castStart = Math.max(movieIndex, 0) % 4;

  return {
    originalTitle: originalTitles[movie.id] ?? movie.title,
    duration: movie.episodes > 1 ? "Олон ангит" : "124 мин",
    genres: [movie.genre, ...movie.tags.slice(0, 2)],
    director: directors[Math.max(movieIndex, 0) % directors.length],
    cast: castPool.slice(castStart, castStart + 4),
    language: movie.country === "Монгол" ? "Монгол" : "Эх хэл",
    subtitle: "Монгол хадмал",
    resolution: movie.isVip ? "4K" : "1080P",
    status: movie.year >= 2026 ? "Шинэ анги нэмэгдэж байна" : "Бүрэн орсон",
    releaseDate: `${movie.year}.03.${String((movieIndex % 20) + 5).padStart(2, "0")}`,
    trailerUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    episodes: buildEpisodes(movie),
  };
}

export function getRecommendedMovies(movie: Movie): Movie[] {
  const byGenre = movies.filter(
    (item) => item.id !== movie.id && item.genre === movie.genre,
  );
  const fallback = movies.filter((item) => item.id !== movie.id);

  return [...byGenre, ...fallback]
    .filter((item, index, list) => list.findIndex((match) => match.id === item.id) === index)
    .slice(0, 10);
}

export const movieComments: MovieComment[] = [
  {
    id: "comment-1",
    name: "Анужин",
    avatar: "АН",
    rating: 9.5,
    date: "2026.06.18",
    text: "Зураг авалт, хөгжим, уур амьсгал нь үнэхээр premium мэдрэмжтэй болсон байна.",
  },
  {
    id: "comment-2",
    name: "Тэмка",
    avatar: "ТМ",
    rating: 8.8,
    date: "2026.06.21",
    text: "Эхний хоёр ангиас л шууд татагдлаа. Дараагийн ангиудыг хүлээж байна.",
  },
  {
    id: "comment-3",
    name: "Солонго",
    avatar: "СО",
    rating: 9.1,
    date: "2026.06.25",
    text: "Монгол хадмал нь ойлгомжтой, картын мэдээлэл ч цэвэрхэн харагдаж байна.",
  },
];
