import { movies } from "@/data/movies";

export const adminStats = [
  { label: "Нийт кино", value: movies.length.toString(), detail: "+4 энэ сар" },
  {
    label: "Нийт анги",
    value: movies.reduce((total, movie) => total + movie.episodes, 0).toString(),
    detail: "Бүх mock анги",
  },
  { label: "Нийт хэрэглэгч", value: "18,420", detail: "+312 өнөөдөр" },
  { label: "VIP хэрэглэгч", value: "3,842", detail: "20.8%" },
  { label: "Өнөөдрийн үзэлт", value: "92,118", detail: "+18%" },
  { label: "Нийт орлого", value: "₮48.6M", detail: "Mock тооцоо" },
];

export const adminUsers = [
  {
    id: "u-1001",
    name: "Анужин",
    email: "anujin@example.mn",
    role: "Хэрэглэгч",
    isVip: true,
    joinedDate: "2026.06.01",
    status: "Идэвхтэй",
  },
  {
    id: "u-1002",
    name: "Тэмүүлэн",
    email: "temuulen@example.mn",
    role: "Хэрэглэгч",
    isVip: false,
    joinedDate: "2026.06.07",
    status: "Идэвхтэй",
  },
  {
    id: "u-1003",
    name: "Солонго",
    email: "solongo@example.mn",
    role: "Админ",
    isVip: true,
    joinedDate: "2026.05.18",
    status: "Идэвхтэй",
  },
  {
    id: "u-1004",
    name: "Мөнх-Эрдэнэ",
    email: "munkh@example.mn",
    role: "Хэрэглэгч",
    isVip: false,
    joinedDate: "2026.04.22",
    status: "Түр хаасан",
  },
];

export const adminPayments = [
  {
    id: "TXN-240681",
    user: "Анужин",
    item: "VIP 30 хоног",
    amount: "12,500₮",
    method: "QPay",
    status: "Амжилттай",
    date: "2026.06.30",
  },
  {
    id: "TXN-240682",
    user: "Тэмүүлэн",
    item: "Шөнийн мөрөн",
    amount: "4,900₮",
    method: "Карт",
    status: "Хүлээгдэж буй",
    date: "2026.06.30",
  },
  {
    id: "TXN-240683",
    user: "Солонго",
    item: "VIP 90 хоног",
    amount: "31,500₮",
    method: "SocialPay",
    status: "Амжилттай",
    date: "2026.06.29",
  },
  {
    id: "TXN-240684",
    user: "Мөнх-Эрдэнэ",
    item: "Неон гэрээ",
    amount: "4,900₮",
    method: "QPay",
    status: "Цуцлагдсан",
    date: "2026.06.28",
  },
];

export const vipPlans = [
  {
    id: "vip-30",
    name: "VIP 30",
    duration: "30 хоног",
    price: "12,500₮",
    benefits: ["Бүх VIP кино", "4K чанар", "Заргүй үзэх"],
    active: true,
  },
  {
    id: "vip-90",
    name: "VIP 90",
    duration: "90 хоног",
    price: "31,500₮",
    benefits: ["Улирлын эрх", "Татаж үзэх mock", "Шинэ анги түрүүлж үзэх"],
    active: true,
  },
  {
    id: "vip-year",
    name: "VIP Жил",
    duration: "365 хоног",
    price: "99,000₮",
    benefits: ["Хамгийн хямд багц", "Гэр бүлийн профайл", "Премиум дэмжлэг"],
    active: false,
  },
];

export const heroBanners = movies.slice(0, 5).map((movie, index) => ({
  id: `banner-${movie.id}`,
  imageUrl: movie.bannerUrl,
  title: movie.title,
  description: movie.description,
  watchLink: `/watch/${movie.id}`,
  trailerLink: `/movie/${movie.id}`,
  active: index < 3,
}));

export const recentPurchases = adminPayments.slice(0, 3);
export const recentUsers = adminUsers.slice(0, 3);
