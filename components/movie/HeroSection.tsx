"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Movie } from "@/types/movie";
import { SubscriptionModal } from "@/components/layout/SubscriptionModal";
import { TrailerModal } from "@/components/layout/TrailerModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

type HeroSectionProps = {
  movies: Movie[];
};

export function HeroSection({ movies }: HeroSectionProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [isSubscriptionOpen, setIsSubscriptionOpen] = useState(false);
  const featuredMovies = useMemo(() => movies.slice(0, 5), [movies]);
  const movie = featuredMovies[activeIndex] ?? featuredMovies[0];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((currentIndex) => (currentIndex + 1) % featuredMovies.length);
    }, 6000);

    return () => window.clearInterval(timer);
  }, [featuredMovies.length]);

  const goToPrevious = () => {
    setActiveIndex((currentIndex) =>
      currentIndex === 0 ? featuredMovies.length - 1 : currentIndex - 1,
    );
  };

  const goToNext = () => {
    setActiveIndex((currentIndex) => (currentIndex + 1) % featuredMovies.length);
  };

  return (
    <section className="relative min-h-[740px] overflow-hidden bg-black" id="vip">
      <AnimatePresence mode="wait">
        <motion.img
          alt={movie.title}
          animate={{ opacity: 1, scale: 1.08 }}
          className="absolute inset-0 h-full w-full object-cover"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0, scale: 1 }}
          key={movie.id}
          src={movie.bannerUrl}
          transition={{ duration: 1.1, ease: "easeOut" }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/74 to-black/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-black/25" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_45%,rgba(249,115,22,0.2),transparent_35%)]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent" />

      <div className="relative mx-auto flex min-h-[740px] max-w-7xl flex-col justify-center gap-10 px-4 pb-24 pt-28 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="max-w-3xl drop-shadow-[0_18px_60px_rgba(0,0,0,0.65)]">
          <motion.div
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-wrap items-center gap-3"
            initial={{ y: 16, opacity: 0 }}
            key={`${movie.id}-badges`}
            transition={{ duration: 0.45 }}
          >
            <Badge tone="orange">Онцлох кино</Badge>
            {movie.isVip && <Badge tone="gold">VIP</Badge>}
            <Badge tone="dark">{movie.country}</Badge>
            <Badge tone="gold">★ {movie.rating}</Badge>
            <Badge tone="light">{movie.year}</Badge>
          </motion.div>

          <motion.h1
            animate={{ y: 0, opacity: 1 }}
            className="mt-6 max-w-3xl text-5xl font-black leading-tight text-white sm:text-6xl lg:text-7xl"
            initial={{ y: 28, opacity: 0 }}
            key={`${movie.id}-title`}
            transition={{ duration: 0.55, delay: 0.08 }}
          >
            {movie.title}
          </motion.h1>
          <motion.p
            animate={{ y: 0, opacity: 1 }}
            className="mt-5 max-w-2xl text-base leading-8 text-zinc-200/95 sm:text-lg"
            initial={{ y: 24, opacity: 0 }}
            key={`${movie.id}-description`}
            transition={{ duration: 0.55, delay: 0.18 }}
          >
            {movie.description}
          </motion.p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Badge tone="light">{movie.genre}</Badge>
            <Badge tone="light">{movie.episodes} анги</Badge>
            {movie.tags.map((tag) => (
              <Badge key={tag} tone="dark">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-7 py-3 text-sm font-semibold text-white shadow-[0_18px_55px_rgba(249,115,22,0.42)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
              href={`/watch/${movie.id}`}
            >
              <span aria-hidden="true">▶</span>
              Үзэж эхлэх
            </Link>
            <Button
              className="px-7 hover:-translate-y-0.5"
              onClick={() => setIsTrailerOpen(true)}
              variant="secondary"
            >
              Трейлер үзэх
            </Button>
          </div>
        </div>

        <motion.div
          animate={{ opacity: 1, x: 0, y: 0 }}
          className="w-full max-w-sm rounded-[2rem] border border-orange-200/25 bg-gradient-to-br from-orange-300 via-orange-500 to-orange-700 p-1 shadow-[0_0_80px_rgba(249,115,22,0.48)] lg:mr-4"
          initial={{ opacity: 0, x: 28, y: 18 }}
          transition={{ duration: 0.6, delay: 0.25, ease: "easeOut" }}
          whileHover={{
            scale: 1.04,
            boxShadow: "0 0 95px rgba(249,115,22,0.62)",
          }}
        >
          <div className="relative overflow-hidden rounded-[1.75rem] bg-black/86 p-6 backdrop-blur-2xl">
            <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-orange-300/30 blur-2xl" />
            <div className="absolute -bottom-12 left-6 h-28 w-28 rounded-full bg-yellow-300/20 blur-2xl" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-orange-100">
                  30 хоног · бүх кино
                </p>
                <button
                  className="mt-2 text-left text-3xl font-black text-white transition hover:text-orange-100"
                  onClick={() => setIsSubscriptionOpen(true)}
                  type="button"
                >
                  Багц авах
                </button>
              </div>
              <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-orange-400 text-2xl shadow-[0_18px_40px_rgba(249,115,22,0.42)]">
                ♛
              </div>
            </div>

            <div className="relative mt-8">
              <p className="text-5xl font-black tracking-tight text-white">
                12,500₮
              </p>
              <p className="mt-3 text-sm font-semibold text-orange-100/90">
                Төлбөр төлөх · 30 хоног
              </p>
            </div>

            <button
              className="relative mt-7 w-full rounded-full bg-white px-5 py-3 text-sm font-black text-zinc-950 shadow-[0_18px_40px_rgba(255,255,255,0.16)] transition duration-300 hover:-translate-y-0.5 hover:bg-orange-50 hover:shadow-[0_18px_50px_rgba(255,255,255,0.24)]"
              onClick={() => setIsSubscriptionOpen(true)}
              type="button"
            >
              Энд дарна уу
            </button>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex w-[min(92vw,80rem)] -translate-x-1/2 items-center justify-between gap-4">
        <div className="flex gap-2">
          {featuredMovies.map((featuredMovie, index) => (
            <button
              aria-label={`${index + 1}-р онцлох кино`}
              className={`h-2.5 rounded-full shadow-lg transition-all duration-300 ${
                index === activeIndex
                  ? "w-9 bg-orange-400 shadow-orange-500/35"
                  : "w-2.5 bg-white/35 hover:bg-white/70"
              }`}
              key={featuredMovie.id}
              onClick={() => setActiveIndex(index)}
              type="button"
            />
          ))}
        </div>

        <div className="flex gap-3">
          <button
            aria-label="Өмнөх кино"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 text-white shadow-xl shadow-black/25 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-orange-400/60 hover:bg-orange-500/20"
            onClick={goToPrevious}
            type="button"
          >
            ‹
          </button>
          <button
            aria-label="Дараагийн кино"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/15 bg-black/40 text-white shadow-xl shadow-black/25 backdrop-blur transition duration-300 hover:-translate-y-0.5 hover:border-orange-400/60 hover:bg-orange-500/20"
            onClick={goToNext}
            type="button"
          >
            ›
          </button>
        </div>
      </div>
      <TrailerModal
        isOpen={isTrailerOpen}
        onClose={() => setIsTrailerOpen(false)}
        title={movie.title}
      />
      <SubscriptionModal
        isOpen={isSubscriptionOpen}
        onClose={() => setIsSubscriptionOpen(false)}
      />
    </section>
  );
}
