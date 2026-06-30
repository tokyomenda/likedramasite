"use client";

/* eslint-disable @next/next/no-img-element */
import { motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { MovieSection } from "@/components/movie/MovieSection";
import { Badge } from "@/components/ui/Badge";
import { getEpisodeVideoSource } from "@/lib/adminEpisodes";
import type { Episode, Movie, MovieDetail } from "@/types/movie";

type WatchPageClientProps = {
  movie: Movie;
  detail: MovieDetail;
  relatedMovies: Movie[];
};

type ContinuePayload = {
  movieId: string;
  title: string;
  episode: number;
  posterUrl: string;
  currentTime: number;
  duration: number;
  updatedAt: string;
};

const speeds = [0.75, 1, 1.25, 1.5, 2];
const subtitleOptions = ["Унтраах", "Монгол", "Англи"];
const qualityOptions = ["Автомат", "1080P", "720P", "480P"];
const continueWatchingKey = "likedrama-continue-watching";
const localVideoSource = "/videos/demo.mp4";
const fallbackVideoSource =
  "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4";

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
    const existingEpisode = detail.episodes[index];
    const number = index + 1;

    return (
      existingEpisode ?? {
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
  const [videoSource, setVideoSource] = useState(localVideoSource);
  const [videoLoadFailed, setVideoLoadFailed] = useState(false);

  const currentEpisodeIndex = episodes.findIndex(
    (episode) => episode.number === activeEpisode.number,
  );
  const canGoPrevious = currentEpisodeIndex > 0;
  const canGoNext = currentEpisodeIndex < episodes.length - 1;
  const storageKey = `likedrama-watch:${movie.id}:${activeEpisode.number}`;

  useEffect(() => {
    const requestedEpisode = Number(
      new URLSearchParams(window.location.search).get("episode"),
    );

    if (!requestedEpisode || requestedEpisode === activeEpisode.number) {
      return;
    }

    const nextEpisode = episodes.find(
      (episode) => episode.number === requestedEpisode,
    );

    if (!nextEpisode) {
      return;
    }

    const timer = window.setTimeout(() => {
      setActiveEpisode(nextEpisode);
      setNextCountdown(null);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      setIsBuffering(false);
      setVideoLoadFailed(false);
      setShowControls(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [activeEpisode.number, episodes]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const adminVideoSource = getEpisodeVideoSource(
        movie.id,
        activeEpisode.number,
      );

      setVideoSource(adminVideoSource || localVideoSource);
      setVideoLoadFailed(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [activeEpisode.number, movie.id]);

  const showPlayerControls = () => {
    setShowControls(true);
  };

  const toggleFullscreen = useCallback(async () => {
    const player = playerRef.current;

    if (!player) {
      return;
    }

    if (!document.fullscreenElement) {
      await player.requestFullscreen().catch(() => undefined);
      return;
    }

    await document.exitFullscreen().catch(() => undefined);
  }, []);

  const handleEpisodeSelect = useCallback(
    (episode: Episode, shouldAutoplay = isPlaying) => {
      const video = videoRef.current;

      setActiveEpisode(episode);
      setNextCountdown(null);
      setProgress(0);
      setCurrentTime(0);
      setDuration(0);
      setIsBuffering(false);
      setVideoLoadFailed(false);
      setShowControls(true);

      if (!video) {
        return;
      }

      video.pause();
      video.currentTime = 0;
      video.load();

      if (shouldAutoplay) {
        window.setTimeout(() => {
          video.play().catch(() => undefined);
        }, 80);
      }
    },
    [isPlaying],
  );

  const goToPreviousEpisode = useCallback(() => {
    if (!canGoPrevious) {
      return;
    }

    handleEpisodeSelect(episodes[currentEpisodeIndex - 1]);
  }, [canGoPrevious, currentEpisodeIndex, episodes, handleEpisodeSelect]);

  const goToNextEpisode = useCallback(
    (shouldAutoplay = true) => {
      if (!canGoNext) {
        return;
      }

      handleEpisodeSelect(episodes[currentEpisodeIndex + 1], shouldAutoplay);
    },
    [canGoNext, currentEpisodeIndex, episodes, handleEpisodeSelect],
  );

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
    const video = videoRef.current;

    if (!video || !isPlaying || videoLoadFailed) {
      return;
    }

    window.setTimeout(() => {
      video.play().catch(() => undefined);
    }, 80);
  }, [isPlaying, videoLoadFailed, videoSource]);

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

      const payload: ContinuePayload = {
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
      const existingList = rawList
        ? (JSON.parse(rawList) as ContinuePayload[])
        : [];
      const nextList = [
        payload,
        ...existingList.filter((item) => item.movieId !== movie.id),
      ].slice(0, 12);

      localStorage.setItem(continueWatchingKey, JSON.stringify(nextList));
    }, 5000);

    return () => window.clearInterval(saveInterval);
  }, [activeEpisode.number, movie.id, movie.posterUrl, movie.title, storageKey]);

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
          window.setTimeout(() => goToNextEpisode(true), 0);
          return null;
        }

        return current - 1;
      });
    }, 1000);

    return () => window.clearTimeout(timer);
  }, [goToNextEpisode, nextCountdown]);

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
        toggleFullscreen();
        setShowControls(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleFullscreen]);

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

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setShowControls(true);

    if (canGoNext) {
      setNextCountdown(5);
    }
  };

  const handleVideoError = () => {
    if (videoSource === localVideoSource) {
      setVideoSource(fallbackVideoSource);
      setVideoLoadFailed(false);
      setIsBuffering(true);
      return;
    }

    setIsBuffering(false);
    setIsPlaying(false);
    setShowControls(true);
    setVideoLoadFailed(true);
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
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/85 to-black" />

          <div
            className={`relative mx-auto grid gap-5 px-4 py-6 sm:px-6 lg:px-8 ${
              isTheaterMode
                ? "max-w-[96rem] lg:grid-cols-[1fr_320px]"
                : "max-w-7xl lg:grid-cols-[1fr_360px]"
            }`}
          >
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="group overflow-hidden rounded-3xl border border-white/10 bg-black shadow-[0_30px_100px_rgba(0,0,0,0.55)]"
              initial={{ opacity: 0, y: 18 }}
              onDoubleClick={toggleFullscreen}
              onMouseMove={showPlayerControls}
              ref={playerRef}
              transition={{ duration: 0.45 }}
            >
              <div className="relative aspect-video bg-black">
                <video
                  className="h-full w-full object-cover"
                  onCanPlay={() => setIsBuffering(false)}
                  onClick={togglePlayback}
                  onDurationChange={handleTimeUpdate}
                  onEnded={handleVideoEnded}
                  onError={handleVideoError}
                  onLoadedMetadata={handleLoadedMetadata}
                  onPause={() => setIsPlaying(false)}
                  onPlay={() => setIsPlaying(true)}
                  onPlaying={() => setIsBuffering(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onWaiting={() => setIsBuffering(true)}
                  poster={movie.bannerUrl}
                  ref={videoRef}
                  src={videoSource}
                />

                {videoLoadFailed && (
                  <div className="absolute inset-0 grid place-items-center bg-black/70 px-6 text-center">
                    <div>
                      <p className="text-xl font-black text-white">
                        Видео түр ачаалагдсангүй
                      </p>
                      <p className="mt-2 text-sm text-zinc-400">
                        Түр хүлээгээд дахин оролдоно уу.
                      </p>
                    </div>
                  </div>
                )}

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

                {subtitle !== "Унтраах" && (
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
                      {nextCountdown} секундын дараа эхэлнэ
                    </h3>
                    <div className="mt-4 flex gap-2">
                      <button
                        className="flex-1 rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-400"
                        onClick={() => goToNextEpisode(true)}
                        type="button"
                      >
                        Одоо үзэх
                      </button>
                      <button
                        className="flex-1 rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-zinc-200 transition hover:border-orange-400/60"
                        onClick={() => setNextCountdown(null)}
                        type="button"
                      >
                        Цуцлах
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>

              <div
                className={`space-y-4 border-t border-white/10 bg-black/95 p-4 transition duration-300 ${
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
                    <button
                      className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold text-zinc-200 transition hover:border-orange-400/60 hover:text-orange-300 disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={!canGoPrevious}
                      onClick={goToPreviousEpisode}
                      type="button"
                    >
                      Өмнөх анги
                    </button>
                    <button
                      className="rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-40"
                      disabled={!canGoNext}
                      onClick={() => goToNextEpisode(true)}
                      type="button"
                    >
                      Дараагийн анги
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
                      {isMuted ? "Дуугүй" : "Дуу"}
                    </button>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <select
                      aria-label="Хурд"
                      className="h-10 rounded-full border border-white/10 bg-white/[0.06] px-3 text-sm font-semibold text-white outline-none transition hover:border-orange-400/50"
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
                      Театр горим
                    </button>
                    <button
                      className="rounded-full border border-white/10 px-4 py-2 text-sm font-bold transition hover:border-orange-400/60 hover:text-orange-300"
                      onClick={toggleFullscreen}
                      type="button"
                    >
                      Дэлгэц дүүргэх
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.aside
              animate={{ opacity: 1, x: 0 }}
              className="rounded-3xl border border-white/10 bg-white/[0.04] p-4 lg:max-h-[calc(100vh-8rem)] lg:overflow-y-auto"
              initial={{ opacity: 0, x: 18 }}
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
                        ? "border-orange-400 bg-orange-500/15 shadow-[0_16px_38px_rgba(249,115,22,0.16)]"
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
            viewport={{ once: true, amount: 0.2 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="flex flex-wrap gap-3">
              <Badge tone="orange">★ {movie.rating}</Badge>
              <Badge tone="dark">{movie.year}</Badge>
              <Badge tone="dark">{movie.country}</Badge>
              <Badge tone="dark">{activeEpisode.number}-р анги</Badge>
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
