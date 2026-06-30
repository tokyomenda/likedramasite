import type { Movie } from "@/types/movie";

export const categories = [
  "Романс",
  "Драма",
  "Инээдэм",
  "Адал явдал",
  "Гэмт хэрэг",
  "Түүхэн",
  "Уран зөгнөлт",
];

export const movies: Movie[] = [
  {
    id: "midnight-river",
    title: "Шөнийн мөрөн",
    description:
      "Нууц даалгавраар эргэн ирсэн мөрдөгч хотын хамгийн гүн далд хэрэгтэй нүүр тулна.",
    posterUrl:
      "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=1800&q=80",
    genre: "Гэмт хэрэг",
    year: 2026,
    rating: 9.4,
    isVip: true,
    isFree: false,
    price: "4,900₮",
    episodes: 12,
    country: "Солонгос",
    tags: ["триллер", "мөрдлөг", "шинэ"],
  },
  {
    id: "sun-after-rain",
    title: "Борооны дараах нар",
    description:
      "Санаандгүй уулзалт хоёр өөр амьдралыг нэгэн дулаан хайрын түүх болгон өөрчилнө.",
    posterUrl:
      "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    genre: "Романс",
    year: 2025,
    rating: 8.8,
    isVip: false,
    isFree: true,
    price: "Үнэгүй",
    episodes: 16,
    country: "Япон",
    tags: ["хайр", "сэтгэл", "өдөр тутам"],
  },
  {
    id: "capital-heirs",
    title: "Нийслэлийн өв залгамжлагчид",
    description:
      "Эрх мэдэл, гэр бүлийн өрсөлдөөн, хайр дурлал нэгэн тансаг ертөнцөд огтлолцоно.",
    posterUrl:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=1800&q=80",
    genre: "Драма",
    year: 2026,
    rating: 9.1,
    isVip: true,
    isFree: false,
    price: "6,900₮",
    episodes: 20,
    country: "Солонгос",
    tags: ["элит", "гэр бүл", "өрсөлдөөн"],
  },
  {
    id: "laughing-cafe",
    title: "Инээдэг кафе",
    description:
      "Дампуурах дөхсөн жижиг кафе хамгийн хөгжилтэй багийн хүчээр шинэ амьдрал олно.",
    posterUrl:
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=80",
    genre: "Инээдэм",
    year: 2024,
    rating: 8.2,
    isVip: false,
    isFree: true,
    price: "Үнэгүй",
    episodes: 10,
    country: "Монгол",
    tags: ["найзууд", "кафе", "хөнгөн"],
  },
  {
    id: "red-palace",
    title: "Улаан ордны нууц",
    description:
      "Эртний хаант улсын ордонд нуусан захидал бүхний хувь заяаг өөрчилж эхэлнэ.",
    posterUrl:
      "https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=1800&q=80",
    genre: "Түүхэн",
    year: 2025,
    rating: 8.9,
    isVip: true,
    isFree: false,
    price: "5,900₮",
    episodes: 24,
    country: "Хятад",
    tags: ["хаант улс", "нууц", "тулаан"],
  },
  {
    id: "glass-city",
    title: "Шилэн хот",
    description:
      "Ирээдүйн хотод нэг инженер системийн цаадах худлыг илрүүлэхээр эрсдэлтэй зам сонгоно.",
    posterUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1800&q=80",
    genre: "Уран зөгнөлт",
    year: 2026,
    rating: 9.0,
    isVip: true,
    isFree: false,
    price: "7,900₮",
    episodes: 8,
    country: "Америк",
    tags: ["ирээдүй", "технологи", "нууц"],
  },
  {
    id: "island-run",
    title: "Арлын зугталт",
    description:
      "Шуурганд тасарсан арал дээр үлдсэн баг аврагдах ганц боломжийн төлөө тэмцэнэ.",
    posterUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1800&q=80",
    genre: "Адал явдал",
    year: 2024,
    rating: 8.6,
    isVip: false,
    isFree: false,
    price: "3,900₮",
    episodes: 14,
    country: "Тайланд",
    tags: ["арал", "амьд үлдэх", "баг"],
  },
  {
    id: "last-letter",
    title: "Сүүлчийн захидал",
    description:
      "Мартагдсан захидлууд нэгэн гэр бүлийн олон жилийн шархыг эдгээх аялал эхлүүлнэ.",
    posterUrl:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=700&q=80&sat=-60",
    bannerUrl:
      "https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=1800&q=80",
    genre: "Драма",
    year: 2023,
    rating: 8.4,
    isVip: false,
    isFree: true,
    price: "Үнэгүй",
    episodes: 6,
    country: "Япон",
    tags: ["гэр бүл", "дурсамж", "уянга"],
  },
  {
    id: "neon-contract",
    title: "Неон гэрээ",
    description:
      "Шөнийн хотын хамгийн чадварлаг зуучлагч буруу гэрээнд гарын үсэг зурна.",
    posterUrl:
      "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?auto=format&fit=crop&w=1800&q=80",
    genre: "Гэмт хэрэг",
    year: 2026,
    rating: 8.7,
    isVip: true,
    isFree: false,
    price: "4,900₮",
    episodes: 10,
    country: "Хонконг",
    tags: ["мафи", "хот", "эрсдэл"],
  },
  {
    id: "summer-room",
    title: "Зуны өрөө",
    description:
      "Далайн эргийн жижиг буудалд цугласан танихгүй хүмүүс нэг зуны турш өөрсдийгөө олно.",
    posterUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80",
    genre: "Романс",
    year: 2025,
    rating: 8.3,
    isVip: false,
    isFree: true,
    price: "Үнэгүй",
    episodes: 12,
    country: "Солонгос",
    tags: ["зун", "далай", "хайр"],
  },
  {
    id: "black-stage",
    title: "Хар тайз",
    description:
      "Алдарт жүжигчний алга бололт театрын ертөнцийн төгс дүр эсгэлтийг нураана.",
    posterUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330?auto=format&fit=crop&w=1800&q=80",
    genre: "Драма",
    year: 2026,
    rating: 9.2,
    isVip: true,
    isFree: false,
    price: "5,900₮",
    episodes: 16,
    country: "Их Британи",
    tags: ["театр", "нууц", "од"],
  },
  {
    id: "two-bosses",
    title: "Хоёр захирал",
    description:
      "Нэг оффист хоёр дарга, нэг том төсөл, дуусашгүй хөгтэй өрсөлдөөн эхэлнэ.",
    posterUrl:
      "https://images.unsplash.com/photo-1497032205916-ac775f0649ae?auto=format&fit=crop&w=700&q=80&sat=-20",
    bannerUrl:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1800&q=80",
    genre: "Инээдэм",
    year: 2024,
    rating: 8.0,
    isVip: false,
    isFree: false,
    price: "2,900₮",
    episodes: 18,
    country: "Монгол",
    tags: ["оффис", "ажил", "өрсөлдөөн"],
  },
  {
    id: "sky-border",
    title: "Тэнгэрийн хил",
    description:
      "Хилчдийн баг цасан шуурга, хуучин өш хонзон, цаг хугацаатай уралдана.",
    posterUrl:
      "https://images.unsplash.com/photo-1518709268805-4e9042af2176?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1800&q=80",
    genre: "Адал явдал",
    year: 2025,
    rating: 8.5,
    isVip: true,
    isFree: false,
    price: "4,900₮",
    episodes: 9,
    country: "Монгол",
    tags: ["уул", "аврал", "баг"],
  },
  {
    id: "moon-market",
    title: "Сарны зах",
    description:
      "Зөвхөн шөнө нээгддэг зах дээр нэг охин гэр бүлийнхээ ид шидийн өвийг олж мэднэ.",
    posterUrl:
      "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1800&q=80",
    genre: "Уран зөгнөлт",
    year: 2026,
    rating: 8.9,
    isVip: true,
    isFree: false,
    price: "6,900₮",
    episodes: 12,
    country: "Япон",
    tags: ["ид шид", "сар", "гэр бүл"],
  },
  {
    id: "golden-road",
    title: "Алтан зам",
    description:
      "Эртний газрын зураг гурван аялагчийг мартагдсан эзэнт гүрний мөрөөр хөтөлнө.",
    posterUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80&sat=-30",
    bannerUrl:
      "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1800&q=80",
    genre: "Түүхэн",
    year: 2023,
    rating: 8.1,
    isVip: false,
    isFree: true,
    price: "Үнэгүй",
    episodes: 22,
    country: "Турк",
    tags: ["аялал", "газрын зураг", "эзэнт гүрэн"],
  },
  {
    id: "silent-alibi",
    title: "Чимээгүй гэрч",
    description:
      "Ярих чадвараа алдсан гэрч хамгийн аюултай хэргийн цорын ганц түлхүүр болно.",
    posterUrl:
      "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=700&q=80",
    bannerUrl:
      "https://images.unsplash.com/photo-1478720568477-152d9b164e26?auto=format&fit=crop&w=1800&q=80",
    genre: "Гэмт хэрэг",
    year: 2025,
    rating: 8.6,
    isVip: false,
    isFree: false,
    price: "3,900₮",
    episodes: 11,
    country: "Солонгос",
    tags: ["гэрч", "шүүх", "нууц"],
  },
];

export const featuredMovie = movies[0];
export const featuredMovies = movies.slice(0, 5);

export const movieSections = [
  { title: "Үргэлжлүүлэн үзэх", movies: movies.slice(1, 9) },
  { title: "Тренд", movies: movies.slice(0, 10) },
  { title: "Топ 10", movies: movies.slice(0, 10), showRank: true },
  { title: "Шинэ бүтээлүүд", movies: movies.filter((movie) => movie.year >= 2025) },
  { title: "Хятад драма", movies: movies.filter((movie) => movie.country === "Хятад") },
  { title: "Солонгос драма", movies: movies.filter((movie) => movie.country === "Солонгос") },
  { title: "Романс", movies: movies.filter((movie) => movie.genre === "Романс") },
  { title: "Инээдэм", movies: movies.filter((movie) => movie.genre === "Инээдэм") },
  { title: "Гэмт хэрэг", movies: movies.filter((movie) => movie.genre === "Гэмт хэрэг") },
  { title: "Зөвхөн VIP", movies: movies.filter((movie) => movie.isVip) },
  { title: "Танд санал болгох", movies: movies.slice(8, 16) },
];
