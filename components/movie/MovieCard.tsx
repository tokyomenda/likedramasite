"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import Link from "next/link";
import type { Movie } from "@/types/movie";
import { Badge } from "@/components/ui/Badge";

type MovieCardProps = {
  movie: Movie;
  rank?: number;
};

export function MovieCard({ movie, rank }: MovieCardProps) {
  const mainBadge = movie.isFree
    ? { label: "Үнэгүй", tone: "green" as const }
    : movie.isVip
      ? { label: "VIP", tone: "gold" as const }
      : { label: movie.price, tone: "orange" as const };

  return (
    <motion.article
      className="group relative min-w-[190px] overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 shadow-[0_18px_45px_rgba(0,0,0,0.28)] transition-colors duration-300 hover:border-orange-400/55 sm:min-w-0"
      whileHover={{
        y: -8,
        scale: 1.035,
        boxShadow: "0 28px 70px rgba(249,115,22,0.26)",
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
    >
      {rank && (
        <div className="absolute -left-1 top-4 z-10 rounded-r-full bg-orange-500 px-3 py-1 text-sm font-black text-white shadow-lg shadow-orange-950/40">
          #{rank}
        </div>
      )}
      <Link aria-label={`${movie.title} дэлгэрэнгүй`} href={`/movie/${movie.id}`}>
        <div className="relative aspect-[2/3] overflow-hidden bg-zinc-900">
          <img
            alt={movie.title}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.09]"
            src={movie.posterUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/32 to-transparent opacity-88" />
          <div className="absolute inset-0 bg-orange-500/0 opacity-0 transition duration-300 group-hover:bg-orange-500/10 group-hover:opacity-100" />
          <div className="absolute inset-0 grid place-items-center bg-black/25 opacity-0 transition duration-300 group-hover:opacity-100">
            <span className="grid h-14 w-14 translate-y-2 place-items-center rounded-full bg-orange-500 text-xl text-white shadow-[0_18px_50px_rgba(249,115,22,0.5)] transition duration-300 group-hover:translate-y-0 group-hover:scale-105">
              ▶
            </span>
          </div>

          <div className="absolute left-3 top-3 max-w-[70%]">
            <Badge className="h-7 px-3 py-0" tone={mainBadge.tone}>
              {mainBadge.label}
            </Badge>
          </div>
        </div>

        <div className="p-4">
          <div>
            <h3 className="line-clamp-2 min-h-12 text-base font-extrabold leading-6 text-white">
              {movie.title}
            </h3>
          </div>
          <p className="mt-2 text-sm font-medium text-zinc-400">{movie.genre}</p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge className="h-8 px-3 py-0" tone="dark">
              ⭐ {movie.rating}
            </Badge>
            <Badge className="h-8 px-3 py-0" tone="dark">
              {movie.episodes} анги
            </Badge>
          </div>
          <div className="mt-4 flex items-center justify-between text-xs font-semibold text-zinc-500">
            <span>{movie.year}</span>
            <span>{movie.country}</span>
          </div>
        </div>
      </Link>

      <button
        aria-label="Дуртайд нэмэх"
        className="absolute right-3 top-3 z-20 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-black/50 text-white opacity-0 shadow-lg shadow-black/25 backdrop-blur transition duration-300 hover:scale-105 hover:border-orange-300 hover:text-orange-200 group-hover:opacity-100"
        type="button"
      >
        ♡
      </button>
    </motion.article>
  );
}
