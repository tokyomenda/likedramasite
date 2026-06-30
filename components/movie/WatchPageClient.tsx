"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Badge } from "@/components/ui/Badge";
import { MovieSection } from "@/components/movie/MovieSection";
import type { Movie, MovieDetail, Episode } from "@/types/movie";

type WatchPageClientProps = {
  movie: Movie;
  detail: MovieDetail;
  relatedMovies: Movie[];
};

const speeds = [0.75, 1, 1.25, 1.5, 2];
const subtitleOptions = ["Off", "Монгол", "English"];
const qualityOptions = ["Auto", "1080", "720", "480"];

function formatTime(value: number) {
  if (!Number.isFinite(value)) {
    return "00:00";
  }

  const minutes = Math.floor(value / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.floor(value % 60)
    .toString()
    .padStart(2, "0");

  return `${minutes}:${seconds}`;
}

function buildWatchEpisodes(detail: MovieDetail): Episode[] {
  if (detail.episodes.length >= 16) {
    return detail.episodes.slice(0, 16);
  }

  return Array.from({ length: 16 }, (_, index) => {
    const existing = detail.episodes[index];
    const number = index + 1;

    return (
      existing ?? {
        number,
        title: `${number}-р анги`,
        duration: number % 3 === 0 ? "58 мин" : "46 мин",
        isVipLocked: false,
      }
    );
  });
}

export function WatchPageClient({
  movie,
  detail,
  relatedMovies,
}: WatchPageClientProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const hideControlsTimerRef = useRef<number | null>(null);
  const episodes = useMemo(() => buildWatchEpisodes(detail), [detail]);
  const [activeEpisode, setActiveEpisode] = useState(episodes[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [subtitle, setSubtitle] = useState(subtitleOptions[0]);
  const [quality, setQuality] = useState(qualityOptions[0]);
  const [nextCountdown, setNextCountdown] = useState<number | null>(null);
  const [volume, setVolume] = useState(0.78);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [playbackRate, setPlaybackRate] = useState(1);
  const storageKey = `likedrama-watch:${movie.id}:${activeEpisode.number}`;
  const continueWatchingKey = "likedrama-continue-watching";

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.volume = volume;
  }, [volume]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.muted = isMuted;
  }, [isMuted]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    video.playbackRate = playbackRate;
  }, [playbackRate]);

  useEffect(() => {
    if (hideControlsTimerRef.current) {
      window.clearTimeout(hideControlsTimerRef.current);
    }

    if (isPlaying && showControls) {
      hideControlsTimerRef.current = window.setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (hideControlsTimerRef.current) {
        window.clearTimeout(hideControlsTimerRef.current);
      }
    };
  }, [isPlaying, showControls]);

  useEffect(() => {
    const saveInterval = window.setInterval(() => {
      const video = videoRef.current;

      if (!video || !video.duration) {
        return;
      }

      const payload = {
        movieId: movie.id,
        title: movie.title,
        episode: activeEpisode.number,
        posterUrl: movie.posterUrl,
        currentTime: video.currentTime,
        duration: video.duration,
        updatedAt: new Date().toISOString(),
      };

      localStorage.setItem(storageKey, JSON.stringify(payload));

      const rawList = localStorage.getItem(continueWatchingKey);
      const existingList = rawList ? (JSON.parse(rawList) as typeof payload[]) : [];
      const nextList = [
        payload,
        ...existingList.filter((item) => item.movieId !== movie.id),
      ].slice(0, 12);

      localStorage.setItem(continueWatchingKey, JSON.stringify(nextList));
    }, 5000);

    return () => window.clearInterval(saveInterval);
  }, [
    activeEpisode.number,
    continueWatchingKey,
    movie.id,
    movie.posterUrl,
    movie.title,
    storageKey,
  ]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const isTyping =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT";
      const video = videoRef.current;

      if (isTyping || !video) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        if (video.paused) {
          video.play().catch(() => undefined);
        } else {
          video.pause();
        }
        setShowControls(true);
      }

      if (event.code === "ArrowLeft") {
        video.currentTime = Math.max(0, video.currentTime - 10);
        setShowControls(true);
      }

      if (event.code === "ArrowRight") {
        video.currentTime = Math.min(video.duration || 0, video.currentTime + 10);
        setShowControls(true);
      }

      if (event.key.toLowerCase() === "m") {
        setIsMuted((current) => !current);
        setShowControls(true);
      }

      if (event.key.toLowerCase() === "f") {
        const player = playerRef.current;

        if (!player) {
          return;
        }

        if (!document.fullscreenElement) {
          player.requestFullscreen().catch(() => undefined);
        } else {
          document.exitFullscreen().catch(() => undefined);
        }
        setShowControls(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const showPlayerControls = () => {
    setShowControls(true);
  };

  const togglePlayback = async () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    if (video.paused) {
      await video.play().catch(() => undefined);
      setIsPlaying(!video.paused);
      setShowControls(true);
      return;
    }

    video.pause();
    setIsPlaying(false);
    setShowControls(true);
  };

  const handleTimeUpdate = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setCurrentTime(video.currentTime);
    setDuration(video.duration || 0);
    setProgress(video.duration ? (video.currentTime / video.duration) * 100 : 0);
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    setDuration(video.duration || 0);

    const savedPosition = localStorage.getItem(storageKey);

    if (!savedPosition) {
      return;
    }

    const parsed = JSON.parse(savedPosition) as { currentTime?: number };
    const savedTime = parsed.currentTime ?? 0;

    if (savedTime > 5 && savedTime < (video.duration || Infinity) - 5) {
      video.currentTime = savedTime;
      setCurrentTime(savedTime);
      setProgress(video.duration ? (savedTime / video.duration) * 100 : 0);
    }
  };

  const handleSeek = (value: number) => {
    const video = videoRef.current;

    if (!video || !video.duration) {
      setProgress(value);
      return;
    }

    video.currentTime = (value / 100) * video.duration;
    setProgress(value);
  };

  const handleEpisodeSelect = useCallback((episode: Episode) => {
    const video = videoRef.current;

    setNextCountdown(null);
    setActiveEpisode(episode);
    setProgress(0);
    setCurrentTime(0);

    if (video) {
      video.currentTime = 0;
      video.load();
      if (isPlaying) {
        video.play().catch(() => undefined);
      }
    }
  }, [isPlaying]);

  const goToNextEpisode = useCallback(() => {
    const currentIndex = episodes.findIndex(
      (episode) => episode.number === activeEpisode.number,
    );
    const nextEpisode = episodes[(currentIndex + 1) % episodes.length];

    handleEpisodeSelect(nextEpisode);
  }, [activeEpisode.number, episodes, handleEpisodeSelect]);

  useEffect(() => {
    if (nextCountdown === null) {
      return;
    }

    const timer = window.setTimeout(() => {
      setNextCountdown((current) => {
        if (current === null) {
          return null;
        }

        if (current <= 1) {
          window.setTimeout(goToNextEpisode, 0);
          return null;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [goToNextEpisode, nextCountdown]);

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);
    setNextCountdown(5);
  };

  const cancelNextEpisode = () => {
    setNextCountdown(null);
  };

  const toggleFullscreen = async () => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    if (!document.fullscreenElement) {
      await player.requestFullscreen().catch(() => undefined);
      return;
    }

    await document.exitFullscreen().catch(() => undefined);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <main className="pt-20">
        <section className="relative overflow-hidden border-b border-white/10 bg-zinc-950">
          <img
            alt={movie.title}
            className="absolute inset-0 h-full w-full object-cover opacity-20 blur-sm"
            src={movie.bannerUrl}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/82 to-black" />

          <div
            className={`relative mx-auto grid gap-5 px-4 py-6 sm:px-6 lg:px-8 ${
              isTheaterMode
                ? "max-w-[96rem] lg:grid-cols-[1fr_320px]"
                : "max-w-7xl lg:grid-cols-[1fr_360px]"
            }`}
          >
            <motion.div
              className="group overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              ref={playerRef}
              onDoubleClick={toggleFullscreen}
              onMouseMove={showPlayerControls}
            >
              <div className="relative aspect-video bg-black">
                <video
                  className="h-full w-full object-cover"
                  onClick={togglePlayback}
                  onDurationChange={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onTimeUpdate={handleTimeUpdate}
                  onWaiting={() => setIsBuffering(true)}
                  onPlaying={() => setIsBuffering(false)}
                  onCanPlay={() => setIsBuffering(false)}
                  poster={movie.bannerUrl}
                  ref={videoRef}
                  src="/videos/demo.mp4"
                />

                {isBuffering && (
                  <div className="absolute inset-0 grid place-items-center bg-black/25">
                    <div className="h-14 w-14 animate-spin rounded-full border-4 border-white/20 border-t-orange-400" />
                  </div>
                )}

                <button
                  aria-label={isPlaying ? "Түр зогсоох" : "Тоглуулах"}
                  className={`absolute inset-0 m-auto grid h-20 w-20 place-items-center rounded-full bg-orange-500/90 text-3xl text-white shadow-[0_20px_60px_rgba(249,115,22,0.45)] transition duration-300 hover:scale-110 hover:bg-orange-400 ${
                    showControls || !isPlaying ? "opacity-100" : "opacity-0"
                  }`}
                  onClick={togglePlayback}
                  type="button"
                >
                  {isPlaying ? "Ⅱ" : "▶"}
                </button>

                {subtitle !== "Off" && (
                  <div className="pointer-events-none absolute bottom-24 left-1/2 max-w-[80%] -translate-x-1/2 rounded-lg bg-black/70 px-4 py-2 text-center text-sm font-semibold text-white shadow-xl sm:text-base">
                    {subtitle === "Монгол"
                      ? "Энэ бол туршилтын хадмалын мөр юм."
                      : "This is a sample subtitle line."}
                  </div>
                )}

                {nextCountdown !== null && (
                  <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute bottom-6 right-6 w-72 rounded-3xl border border-white/10 bg-black/85 p-5 shadow-2xl backdrop-blur"
                    initial={{ opacity: 0, y: 18 }}
                  >
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
                      Дараагийн анги
                    </p>
                    <h3 className="mt-2 text-lg font-black">
                      {nextCountdown} секундийн дараа эхэлнэ
                    </h3>
                    <div className="mt-4 flex gap-2">
                      <button
                        className="flex-1 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-400"
                        onClick={goToNextEpisode}
                        type="button"
                      >
                        Одоо үзэх
                      </button>
                      <button
                        className="flex-1 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-zinc-200 transition hover:border-orange-400/60"
                        onClick={cancelNextEpisode}
                        type="button"
                      >
                        Цуцлах
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div
                className={`space-y-4 border-t border-white/10 bg-black/92 p-4 transition duration-300 ${
                  showControls || !isPlaying
                    ? "translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-4 opacity-0"
                }`}
              >
                <input
                  aria-label="Явц"
                  className="h-2 w-full accent-orange-500"
                  max="100"
                  min="0"
                  onChange={(event) => handleSeek(Number(event.target.value))}
                  type="range"
                  value={progress}
                />

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-wrap items-center gap-3">
                    <button
                      className="grid h-11 w-11 place-items-center rounded-full bg-orange-500 text-lg font-black text-white transition hover:bg-orange-400"
                      onClick={togglePlayback}
                      type="button"
                    >
                      {isPlaying ? "Ⅱ" : "▶"}
                    </button>
                    <span className="min-w-28 text-sm font-semibold text-zinc-300">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                    <label className="flex items-center gap-2 text-sm font-semibold text-zinc-400">
                      Дуу
                      <input
                        aria-label="Дууны хэмжээ"
                        className="w-24 accent-orange-500"
                        max="1"
                        min="0"
                        onChange={(event) => setVolume(Number(event.target.value))}
                        step="0.01"
                        type="range"
                        value={volume}
                      />
                    </label>
                    <button
                      className="rounded-full border border-white/10 px-3 py-2 text-sm font-bold transition hover:border-orange-400/60 hover:text-orange-300"
                      onClick={() => setIsMuted((current) => !current)}
                      type="button"
                    >
                      {isMuted ? "Дуугүй" : "M"}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      aria-label="Хурд"
                      className="h-10 rounded-full border border-white/10 bg-white/[0.06] px-3 text-sm font-semibold text-white outline-none"
                      onChange={(event) =>
                        setPlaybackRate(Number(event.target.value))
                      }
                      value={playbackRate}
                    >
                      {speeds.map((speed) => (
                        <option className="bg-zinc-950" key={speed} value={speed}>
                          {speed}x
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label="Хадмал"
                      className="h-10 rounded-full border border-white/10 bg-white/[0.06] px-3 text-sm font-semibold text-white outline-none transition hover:border-orange-400/50"
                      onChange={(event) => setSubtitle(event.target.value)}
                      value={subtitle}
                    >
                      {subtitleOptions.map((option) => (
                        <option className="bg-zinc-950" key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <select
                      aria-label="Чанар"
                      className="h-10 rounded-full border border-white/10 bg-white/[0.06] px-3 text-sm font-semibold text-white outline-none transition hover:border-orange-400/50"
                      onChange={(event) => setQuality(event.target.value)}
                      value={quality}
                    >
                      {qualityOptions.map((option) => (
                        <option className="bg-zinc-950" key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                    <button
                      className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                        isTheaterMode
                          ? "border-orange-400 bg-orange-500/15 text-orange-100"
                          : "border-white/10 hover:border-orange-400/60 hover:text-orange-300"
                      }`}
                      onClick={() => setIsTheaterMode((current) => !current)}
                      type="button"
                    >
                      Театр
                    </button>
                    <button
                      className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold transition hover:border-orange-400/60 hover:text-orange-300"
                      onClick={toggleFullscreen}
                      type="button"
                    >
                      Дэлгэц дүүргэх
                    </button>
                    <button
                      className="rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-orange-400"
                      onClick={goToNextEpisode}
                      type="button"
                    >
                      Дараагийн анги
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.aside
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-orange-300">
                    Ангиуд
                  </p>
                  <h2 className="mt-1 text-xl font-black">1-16</h2>
                </div>
                <Badge tone="dark">Одоо: {activeEpisode.number}</Badge>
              </div>

              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                {episodes.map((episode) => (
                  <motion.button
                    className={`grid grid-cols-[72px_1fr] gap-3 rounded-2xl border p-3 text-left transition ${
                      episode.number === activeEpisode.number
                        ? "border-orange-400 bg-orange-500/15"
                        : "border-white/10 bg-black/35 hover:border-orange-400/50 hover:bg-white/[0.07]"
                    }`}
                    key={episode.number}
                    onClick={() => handleEpisodeSelect(episode)}
                    type="button"
                    whileHover={{ y: -3 }}
                  >
                    <span className="grid aspect-video place-items-center rounded-xl bg-zinc-900 text-lg font-black text-orange-200">
                      {episode.number.toString().padStart(2, "0")}
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-bold text-white">
                        {episode.title}
                      </span>
                      <span className="mt-1 block text-xs text-zinc-500">
                        {episode.duration}
                      </span>
                      {episode.isVipLocked && (
                        <span className="mt-2 inline-flex rounded-full bg-yellow-400/15 px-2 py-1 text-[11px] font-bold text-yellow-100">
                          VIP түгжээтэй
                        </span>
                      )}
                    </span>
                  </motion.button>
                ))}
              </div>
            </motion.aside>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <motion.div
            className="max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="flex flex-wrap gap-3">
              <Badge tone="orange">★ {movie.rating}</Badge>
              <Badge tone="dark">{movie.year}</Badge>
              <Badge tone="dark">{movie.country}</Badge>
              {detail.genres.map((genre) => (
                <Badge key={genre} tone="light">
                  {genre}
                </Badge>
              ))}
            </div>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-5xl">
              {movie.title}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-zinc-300">
              {movie.description}
            </p>
          </motion.div>
        </section>

        <div className="pb-14">
          <MovieSection movies={relatedMovies} title="Төстэй кинонууд" />
        </div>
      </main>

      <Footer />
    </div>
  );
}
