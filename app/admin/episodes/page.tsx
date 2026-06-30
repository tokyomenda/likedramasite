"use client";

import { ChangeEvent, DragEvent, useEffect, useMemo, useRef, useState } from "react";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import { getMovieDetail } from "@/data/movieDetails";
import {
  emptyAdminEpisodeForm,
  formValuesToEpisode,
  loadAdminEpisodes,
  saveAdminEpisodes,
  type AdminEpisodeFormValues,
  type AdminEpisodeVideo,
} from "@/lib/adminEpisodes";
import { loadAdminMovies, type AdminMovie } from "@/lib/adminMovies";

function isMp4File(file: File) {
  return file.type === "video/mp4" || file.name.toLowerCase().endsWith(".mp4");
}

export default function AdminEpisodesPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [movies, setMovies] = useState<AdminMovie[]>([]);
  const [episodes, setEpisodes] = useState<AdminEpisodeVideo[]>([]);
  const [formValues, setFormValues] =
    useState<AdminEpisodeFormValues>(emptyAdminEpisodeForm);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const loadedMovies = loadAdminMovies();
      const firstMovie = loadedMovies[0];

      setMovies(loadedMovies);
      setEpisodes(loadAdminEpisodes());
      setFormValues({
        ...emptyAdminEpisodeForm,
        movieId: firstMovie?.id ?? "",
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const selectedMovie = movies.find((movie) => movie.id === formValues.movieId);

  const tableEpisodes = useMemo(() => {
    if (!selectedMovie) {
      return [];
    }

    const defaultEpisodes = getMovieDetail(selectedMovie).episodes
      .slice(0, 16)
      .map<AdminEpisodeVideo>((episode) => ({
        movieId: selectedMovie.id,
        number: episode.number,
        title: episode.title,
        duration: episode.duration,
        videoUrl: "",
        videoSource: "",
        videoFileName: "",
        subtitleUrl: "",
        isVipLocked: episode.isVipLocked,
        isPublished: true,
      }));
    const savedEpisodes = episodes.filter(
      (episode) => episode.movieId === selectedMovie.id,
    );
    const byNumber = new Map<number, AdminEpisodeVideo>();

    defaultEpisodes.forEach((episode) => byNumber.set(episode.number, episode));
    savedEpisodes.forEach((episode) => byNumber.set(episode.number, episode));

    return Array.from(byNumber.values()).sort((a, b) => a.number - b.number);
  }, [episodes, selectedMovie]);

  const updateField = (
    field: keyof AdminEpisodeFormValues,
    value: string | boolean,
  ) => {
    setFormValues((current) => ({ ...current, [field]: value }));
  };

  const readMp4File = (file?: File) => {
    setError("");

    if (!file) {
      return;
    }

    if (!isMp4File(file)) {
      setError("Зөвхөн MP4 видео файл оруулна уу.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setFormValues((current) => ({
          ...current,
          videoSource: reader.result as string,
          videoFileName: file.name,
        }));
      }
    };

    reader.onerror = () => {
      setError("Видео файлыг унших үед алдаа гарлаа.");
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    readMp4File(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    readMp4File(event.dataTransfer.files?.[0]);
  };

  const saveEpisode = () => {
    setError("");

    if (!formValues.movieId) {
      setError("Кино сонгоно уу.");
      return;
    }

    if (!formValues.videoUrl.trim() && !formValues.videoSource) {
      setError("Video URL эсвэл MP4 файл оруулна уу.");
      return;
    }

    const nextEpisode = formValuesToEpisode(formValues);
    const nextEpisodes = [
      nextEpisode,
      ...episodes.filter(
        (episode) =>
          !(
            episode.movieId === nextEpisode.movieId &&
            episode.number === nextEpisode.number
          ),
      ),
    ];

    setEpisodes(nextEpisodes);
    saveAdminEpisodes(nextEpisodes);
  };

  const deleteEpisode = (movieId: string, number: number) => {
    const shouldDelete = window.confirm("Энэ ангийн видео мэдээллийг устгах уу?");

    if (!shouldDelete) {
      return;
    }

    const nextEpisodes = episodes.filter(
      (episode) => !(episode.movieId === movieId && episode.number === number),
    );

    setEpisodes(nextEpisodes);
    saveAdminEpisodes(nextEpisodes);
  };

  return (
    <div className="space-y-6">
      <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-5">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-zinc-300">
              Кино сонгох
            </span>
            <select
              className="h-11 w-full rounded-2xl border border-white/10 bg-zinc-950 px-4 text-sm text-white outline-none transition focus:border-orange-400"
              onChange={(event) => updateField("movieId", event.target.value)}
              value={formValues.movieId}
            >
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>
                  {movie.title}
                </option>
              ))}
            </select>
          </label>
          <AdminInput
            label="Анги дугаар"
            onChange={(event) => updateField("number", event.target.value)}
            placeholder="1"
            type="number"
            value={formValues.number}
          />
          <AdminInput
            label="Гарчиг"
            onChange={(event) => updateField("title", event.target.value)}
            placeholder="1-р анги"
            value={formValues.title}
          />
          <AdminInput
            label="Хугацаа"
            onChange={(event) => updateField("duration", event.target.value)}
            placeholder="46 мин"
            value={formValues.duration}
          />
          <AdminInput
            label="Video URL"
            onChange={(event) => updateField("videoUrl", event.target.value)}
            placeholder="/videos/demo.mp4"
            value={formValues.videoUrl}
          />
          <AdminInput
            label="Subtitle URL"
            onChange={(event) => updateField("subtitleUrl", event.target.value)}
            placeholder="/subtitles/demo.vtt"
            value={formValues.subtitleUrl}
          />
          <AdminSelect
            label="VIP түгжээ"
            onChange={(event) =>
              updateField("isVipLocked", event.target.value === "Тийм")
            }
            options={["Үгүй", "Тийм"]}
            value={formValues.isVipLocked ? "Тийм" : "Үгүй"}
          />
          <AdminSelect
            label="Publish эсэх"
            onChange={(event) =>
              updateField("isPublished", event.target.value === "Нийтлэх")
            }
            options={["Нийтлэх", "Ноорог"]}
            value={formValues.isPublished ? "Нийтлэх" : "Ноорог"}
          />
        </div>

        <div
          className={`mt-5 rounded-3xl border border-dashed p-5 transition ${
            isDragging
              ? "border-orange-400 bg-orange-500/10"
              : "border-white/15 bg-black/25"
          }`}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDrop={handleDrop}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-bold text-white">MP4 видео файл</p>
              <p className="mt-1 text-sm text-zinc-500">
                Файлаа энд чирж оруулах эсвэл сонгоно уу. Түр localStorage-д
                data URL байдлаар хадгална.
              </p>
              {formValues.videoFileName && (
                <p className="mt-3 text-sm font-semibold text-orange-300">
                  Сонгосон файл: {formValues.videoFileName}
                </p>
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                accept=".mp4,video/mp4"
                className="hidden"
                onChange={handleFileChange}
                ref={fileInputRef}
                type="file"
              />
              <AdminButton
                onClick={() => fileInputRef.current?.click()}
                type="button"
                variant="secondary"
              >
                MP4 сонгох
              </AdminButton>
              {formValues.videoSource && (
                <AdminButton
                  onClick={() =>
                    setFormValues((current) => ({
                      ...current,
                      videoSource: "",
                      videoFileName: "",
                    }))
                  }
                  type="button"
                  variant="danger"
                >
                  Файл арилгах
                </AdminButton>
              )}
            </div>
          </div>
        </div>

        {error && (
          <p className="mt-4 rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
            {error}
          </p>
        )}

        <AdminButton className="mt-5" onClick={saveEpisode}>
          Анги хадгалах
        </AdminButton>
      </div>

      <AdminTable>
        <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-zinc-500">
          <tr>
            <th className="px-5 py-4">Дугаар</th>
            <th className="px-5 py-4">Гарчиг</th>
            <th className="px-5 py-4">Хугацаа</th>
            <th className="px-5 py-4">Видео</th>
            <th className="px-5 py-4">VIP</th>
            <th className="px-5 py-4">Төлөв</th>
            <th className="px-5 py-4">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {tableEpisodes.map((episode) => (
            <tr key={`${episode.movieId}-${episode.number}`}>
              <td className="px-5 py-4 font-bold">{episode.number}</td>
              <td className="px-5 py-4 text-zinc-300">{episode.title}</td>
              <td className="px-5 py-4 text-zinc-300">{episode.duration}</td>
              <td className="px-5 py-4">
                <StatusBadge>
                  {episode.videoSource || episode.videoUrl ? "Видео байна" : "Хоосон"}
                </StatusBadge>
              </td>
              <td className="px-5 py-4">
                <StatusBadge>{episode.isVipLocked ? "VIP" : "Идэвхтэй"}</StatusBadge>
              </td>
              <td className="px-5 py-4">
                <StatusBadge>{episode.isPublished ? "Нийтэлсэн" : "Ноорог"}</StatusBadge>
              </td>
              <td className="px-5 py-4">
                <div className="flex gap-2">
                  <AdminButton
                    onClick={() =>
                      setFormValues({
                        movieId: episode.movieId,
                        number: episode.number.toString(),
                        title: episode.title,
                        duration: episode.duration,
                        videoUrl: episode.videoUrl,
                        videoSource: episode.videoSource,
                        videoFileName: episode.videoFileName,
                        subtitleUrl: episode.subtitleUrl,
                        isVipLocked: episode.isVipLocked,
                        isPublished: episode.isPublished,
                      })
                    }
                    variant="secondary"
                  >
                    Засах
                  </AdminButton>
                  <AdminButton
                    onClick={() => deleteEpisode(episode.movieId, episode.number)}
                    variant="danger"
                  >
                    Устгах
                  </AdminButton>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </AdminTable>
    </div>
  );
}
