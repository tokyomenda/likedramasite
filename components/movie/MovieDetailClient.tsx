"use client";

/* eslint-disable @next/next/no-img-element */
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MovieSection } from "@/components/movie/MovieSection";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Movie, MovieComment, MovieDetail } from "@/types/movie";

type MovieDetailClientProps = {
  movie: Movie;
  detail: MovieDetail;
  recommended: Movie[];
  comments: MovieComment[];
};

const fadeUp = {
  hidden: { y: 24, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const myListStorageKey = "likedrama-my-list";

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-zinc-500">
        {label}
      </p>
      <p className="mt-2 text-sm font-semibold text-zinc-100">{value}</p>
    </div>
  );
}

function readMyList() {
  try {
    const rawList = localStorage.getItem(myListStorageKey);
    return rawList ? (JSON.parse(rawList) as string[]) : [];
  } catch {
    return [];
  }
}

export function MovieDetailClient({
  movie,
  detail,
  recommended,
  comments,
}: MovieDetailClientProps) {
  const similarMovies = recommended.slice(0, 4);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isInMyList, setIsInMyList] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsInMyList(readMyList().includes(movie.id));
    }, 0);

    return () => window.clearTimeout(timer);
  }, [movie.id]);

  const toggleMyList = () => {
    const currentList = readMyList();
    const exists = currentList.includes(movie.id);
    const nextList = exists
      ? currentList.filter((id) => id !== movie.id)
      : [...currentList, movie.id];

    localStorage.setItem(myListStorageKey, JSON.stringify(nextList));
    setIsInMyList(!exists);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <img
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover"
            src={movie.bannerUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/78 to-black/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/20" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_32%,rgba(249,115,22,0.18),transparent_34%)]" />

          <div className="relative mx-auto grid min-h-[760px] max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[320px_1fr] lg:px-8">
            <motion.div
              animate="visible"
              className="mx-auto w-64 overflow-hidden rounded-3xl border border-white/15 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.6)] lg:w-full"
              initial="hidden"
              transition={{ duration: 0.55 }}
              variants={fadeUp}
            >
              <img
                alt={movie.title}
                className="aspect-[2/3] h-full w-full object-cover"
                src={movie.posterUrl}
              />
            </motion.div>

            <motion.div
              animate="visible"
              initial="hidden"
              transition={{ duration: 0.55, delay: 0.08 }}
              variants={fadeUp}
            >
              <div className="flex flex-wrap items-center gap-3">
                {movie.isVip && <Badge tone="gold">VIP</Badge>}
                <Badge tone="orange">IMDb {movie.rating}</Badge>
                <Badge tone="dark">{movie.year}</Badge>
                <Badge tone="dark">{movie.country}</Badge>
                <Badge tone="dark">{detail.duration}</Badge>
              </div>

              <h1 className="mt-6 max-w-4xl text-5xl font-black leading-tight sm:text-6xl lg:text-7xl">
                {movie.title}
              </h1>
              <p className="mt-3 text-lg font-semibold text-orange-200">
                {detail.originalTitle}
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {detail.genres.map((genre) => (
                  <Badge key={genre} tone="light">
                    {genre}
                  </Badge>
                ))}
              </div>

              <p className="mt-6 max-w-3xl text-base leading-8 text-zinc-200 sm:text-lg">
                {movie.description}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(249,115,22,0.35)] transition duration-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
                  href={`/watch/${movie.id}`}
                >
                  <span aria-hidden="true">▶</span>
                  Үзэж эхлэх
                </Link>
                <Button
                  className="px-7"
                  onClick={() => setIsTrailerOpen(true)}
                  variant="secondary"
                >
                  Трейлер үзэх
                </Button>
                <Button
                  className="px-7"
                  onClick={toggleMyList}
                  variant={isInMyList ? "primary" : "secondary"}
                >
                  {isInMyList ? "Жагсаалтаас хасах" : "Миний жагсаалт"}
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
          <div className="space-y-10">
            <motion.section
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-black">Киноны мэдээлэл</h2>
              <p className="mt-4 leading-8 text-zinc-300">{movie.description}</p>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem label="Найруулагч" value={detail.director} />
                <InfoItem label="Дүрүүд" value={detail.cast.join(", ")} />
                <InfoItem label="Хэл" value={detail.language} />
                <InfoItem label="Хадмал" value={detail.subtitle} />
                <InfoItem label="Нягтаршил" value={detail.resolution} />
                <InfoItem label="Төлөв" value={detail.status} />
                <InfoItem label="Нээлт" value={detail.releaseDate} />
              </div>
            </motion.section>

            <motion.section
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-300">
                    Ангиуд
                  </p>
                  <h2 className="mt-2 text-2xl font-black">Бүх анги</h2>
                </div>
                <Badge tone="dark">{movie.episodes} анги</Badge>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6">
                {detail.episodes.map((episode) => (
                  <Link
                    href={`/watch/${movie.id}?episode=${episode.number}`}
                    key={episode.number}
                  >
                    <motion.div
                      className={`relative rounded-2xl border p-4 text-left transition ${
                        episode.number === 1
                          ? "border-orange-400 bg-orange-500/18"
                          : "border-white/10 bg-black/30 hover:border-orange-400/50 hover:bg-white/[0.07]"
                      }`}
                      whileHover={{ y: -4 }}
                    >
                      {episode.isVipLocked && (
                        <span className="absolute right-3 top-3 text-xs text-yellow-200">
                          🔒
                        </span>
                      )}
                      <span className="text-lg font-black">
                        {episode.number.toString().padStart(2, "0")}
                      </span>
                      <p className="mt-2 text-sm font-semibold text-zinc-200">
                        {episode.title}
                      </p>
                      <p className="mt-1 text-xs text-zinc-500">
                        {episode.duration}
                      </p>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </motion.section>

            <motion.section
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-black">Трейлер</h2>
              <div className="mt-5 aspect-video overflow-hidden rounded-2xl border border-white/10 bg-zinc-950">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  src={detail.trailerUrl}
                  title={`${movie.title} трейлер`}
                />
              </div>
            </motion.section>

            <section className="-mx-4 sm:-mx-6 lg:-mx-8">
              <MovieSection movies={recommended} title="Санал болгох кинонууд" />
            </section>

            <motion.section
              className="rounded-3xl border border-white/10 bg-white/[0.035] p-5 sm:p-7"
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-300">
                    Сэтгэгдэл
                  </p>
                  <h2 className="mt-2 text-2xl font-black">
                    Үзэгчдийн үнэлгээ
                  </h2>
                </div>
                <Badge tone="gold">★ {movie.rating}</Badge>
              </div>

              <div className="mt-6 space-y-4">
                {comments.map((comment) => (
                  <div
                    className="rounded-2xl border border-white/10 bg-black/30 p-4"
                    key={comment.id}
                  >
                    <div className="flex gap-4">
                      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-orange-500 text-sm font-black">
                        {comment.avatar}
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3 className="font-bold">{comment.name}</h3>
                          <span className="text-sm text-orange-300">
                            ★ {comment.rating}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {comment.date}
                          </span>
                        </div>
                        <p className="mt-2 leading-7 text-zinc-300">
                          {comment.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-black/35 p-4">
                <textarea
                  className="min-h-28 w-full resize-none rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-white outline-none transition placeholder:text-zinc-500 focus:border-orange-400/70"
                  placeholder="Сэтгэгдлээ бичих..."
                />
                <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-2 text-sm text-orange-300">
                    ★ ★ ★ ★ ★
                  </div>
                  <Button className="px-6">Сэтгэгдэл нэмэх</Button>
                </div>
              </div>
            </motion.section>
          </div>

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-black">Холбоотой мэдээлэл</h2>
              <div className="mt-5 grid gap-3">
                <InfoItem label="Улс" value={movie.country} />
                <InfoItem label="Төлбөр" value={movie.price} />
                <InfoItem label="Төрөл" value={movie.genre} />
              </div>
              <button
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border border-orange-400/45 bg-orange-500/10 px-4 py-3 text-sm font-bold text-orange-100 transition hover:bg-orange-500/20"
                onClick={toggleMyList}
                type="button"
              >
                {isInMyList ? "♥ Жагсаалтад нэмсэн" : "♡ Дуртайд нэмэх"}
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-black">Төстэй кино</h2>
              <div className="mt-5 space-y-3">
                {similarMovies.map((similar) => (
                  <Link
                    className="grid grid-cols-[64px_1fr] gap-3 rounded-2xl p-2 transition hover:bg-white/[0.07]"
                    href={`/movie/${similar.id}`}
                    key={similar.id}
                  >
                    <img
                      alt={similar.title}
                      className="h-20 w-16 rounded-xl object-cover"
                      src={similar.posterUrl}
                    />
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 text-sm font-bold">
                        {similar.title}
                      </h3>
                      <p className="mt-1 text-xs text-zinc-500">
                        ★ {similar.rating} · {similar.year}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <h2 className="text-xl font-black">Хуваалцах</h2>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {["f", "x", "in"].map((item) => (
                  <button
                    className="rounded-full border border-white/10 bg-black/30 py-3 text-sm font-black transition hover:border-orange-400/60 hover:text-orange-300"
                    key={item}
                    type="button"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      <AnimatePresence>
        {isTrailerOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-black/86 px-4 text-white backdrop-blur-xl"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
          >
            <button
              aria-label="Трейлер хаах"
              className="absolute inset-0"
              onClick={() => setIsTrailerOpen(false)}
              type="button"
            />
            <motion.section
              animate={{ scale: 1, opacity: 1 }}
              className="relative w-full max-w-5xl overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 shadow-[0_30px_90px_rgba(0,0,0,0.65)]"
              exit={{ scale: 0.96, opacity: 0 }}
              initial={{ scale: 0.96, opacity: 0 }}
            >
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <h2 className="text-xl font-black">{movie.title} трейлер</h2>
                <button
                  aria-label="Хаах"
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-2xl transition hover:bg-white/10"
                  onClick={() => setIsTrailerOpen(false)}
                  type="button"
                >
                  ×
                </button>
              </div>
              <div className="aspect-video bg-black">
                <iframe
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                  src={detail.trailerUrl}
                  title={`${movie.title} трейлер`}
                />
              </div>
            </motion.section>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}
