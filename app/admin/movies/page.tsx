"use client";

/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";
import { AdminMovieForm } from "@/components/admin/AdminMovieForm";
import { AdminSelect } from "@/components/admin/AdminSelect";
import { AdminTable } from "@/components/admin/AdminTable";
import { StatusBadge } from "@/components/admin/StatusBadge";
import {
  type AdminMovie,
  emptyAdminMovieForm,
  formValuesToMovie,
  getAdminMoviePoster,
  loadAdminMovies,
  movieToFormValues,
  saveAdminMovies,
} from "@/lib/adminMovies";

const categories = [
  "Романс",
  "Драма",
  "Инээдэм",
  "Адал явдал",
  "Гэмт хэрэг",
  "Түүхэн",
  "Уран зөгнөлт",
];

function hasRequiredImages(values: {
  posterUrl: string;
  bannerUrl: string;
  posterImage: string;
  backdropImage: string;
}) {
  return (
    Boolean(values.posterUrl.trim() || values.posterImage) &&
    Boolean(values.bannerUrl.trim() || values.backdropImage)
  );
}

export default function AdminMoviesPage() {
  const [adminMovies, setAdminMovies] = useState<AdminMovie[]>([]);
  const [search, setSearch] = useState("");
  const [genreFilter, setGenreFilter] = useState("Бүх төрөл");
  const [statusFilter, setStatusFilter] = useState("Бүх төлөв");
  const [editingMovie, setEditingMovie] = useState<AdminMovie | null>(null);
  const [editValues, setEditValues] = useState(emptyAdminMovieForm);
  const [editError, setEditError] = useState("");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAdminMovies(loadAdminMovies());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const filteredMovies = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return adminMovies.filter((movie) => {
      const matchesSearch =
        !normalizedSearch ||
        movie.title.toLowerCase().includes(normalizedSearch) ||
        movie.country.toLowerCase().includes(normalizedSearch);
      const matchesGenre =
        genreFilter === "Бүх төрөл" || movie.genre === genreFilter;
      const matchesStatus =
        statusFilter === "Бүх төлөв" ||
        (statusFilter === "VIP" && movie.isVip) ||
        (statusFilter === "Үнэгүй" && movie.isFree) ||
        (statusFilter === "Онцлох" && movie.isFeatured) ||
        (statusFilter === "HD" && movie.isHd);

      return matchesSearch && matchesGenre && matchesStatus;
    });
  }, [adminMovies, genreFilter, search, statusFilter]);

  const persistMovies = (nextMovies: AdminMovie[]) => {
    setAdminMovies(nextMovies);
    saveAdminMovies(nextMovies);
  };

  const startEdit = (movie: AdminMovie) => {
    setEditingMovie(movie);
    setEditValues(movieToFormValues(movie));
    setEditError("");
  };

  const saveEdit = () => {
    if (!editingMovie) {
      return;
    }

    if (!hasRequiredImages(editValues)) {
      setEditError("Постер болон backdrop зураг эсвэл URL оруулна уу.");
      return;
    }

    const updatedMovie = formValuesToMovie(editValues, editingMovie);
    const nextMovies = adminMovies.map((movie) =>
      movie.id === editingMovie.id ? updatedMovie : movie,
    );

    persistMovies(nextMovies);
    setEditingMovie(null);
    setEditValues(emptyAdminMovieForm);
    setEditError("");
  };

  const deleteMovie = (movieId: string) => {
    const shouldDelete = window.confirm("Энэ киног устгах уу?");

    if (!shouldDelete) {
      return;
    }

    persistMovies(adminMovies.filter((movie) => movie.id !== movieId));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
        <div className="grid gap-4 md:grid-cols-3">
          <AdminInput
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Кино хайх..."
            value={search}
          />
          <AdminSelect
            onChange={(event) => setGenreFilter(event.target.value)}
            options={["Бүх төрөл", ...categories]}
            value={genreFilter}
          />
          <AdminSelect
            onChange={(event) => setStatusFilter(event.target.value)}
            options={["Бүх төлөв", "VIP", "Үнэгүй", "Онцлох", "HD"]}
            value={statusFilter}
          />
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-full bg-orange-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-orange-400"
          href="/admin/movies/new"
        >
          Кино нэмэх
        </Link>
      </div>

      {editingMovie && (
        <section className="space-y-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
              Засварлах
            </p>
            <h2 className="mt-1 text-2xl font-black">{editingMovie.title}</h2>
          </div>
          {editError && (
            <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
              {editError}
            </p>
          )}
          <AdminMovieForm
            onCancel={() => {
              setEditingMovie(null);
              setEditError("");
            }}
            onChange={setEditValues}
            onSubmit={saveEdit}
            submitLabel="Өөрчлөлт хадгалах"
            values={editValues}
          />
        </section>
      )}

      <AdminTable>
        <thead className="bg-white/[0.04] text-xs uppercase tracking-[0.18em] text-zinc-500">
          <tr>
            <th className="px-5 py-4">Постер</th>
            <th className="px-5 py-4">Нэр</th>
            <th className="px-5 py-4">Төрөл</th>
            <th className="px-5 py-4">Он</th>
            <th className="px-5 py-4">Анги</th>
            <th className="px-5 py-4">Төлөв</th>
            <th className="px-5 py-4">Үйлдэл</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/10">
          {filteredMovies.map((movie) => (
            <tr key={movie.id}>
              <td className="px-5 py-4">
                <img
                  alt={movie.title}
                  className="h-16 w-11 rounded-lg object-cover"
                  src={getAdminMoviePoster(movie)}
                />
              </td>
              <td className="px-5 py-4">
                <div className="font-bold">{movie.title}</div>
                <div className="mt-1 text-xs text-zinc-500">
                  ★ {movie.rating} · {movie.country}
                </div>
              </td>
              <td className="px-5 py-4 text-zinc-300">{movie.genre}</td>
              <td className="px-5 py-4 text-zinc-300">{movie.year}</td>
              <td className="px-5 py-4 text-zinc-300">{movie.episodes}</td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  <StatusBadge>
                    {movie.isVip ? "VIP" : movie.isFree ? "Үнэгүй" : "Идэвхтэй"}
                  </StatusBadge>
                  {movie.isFeatured && <StatusBadge>Онцлох</StatusBadge>}
                  {movie.isHd && <StatusBadge>HD</StatusBadge>}
                </div>
              </td>
              <td className="px-5 py-4">
                <div className="flex flex-wrap gap-2">
                  <AdminButton onClick={() => startEdit(movie)} variant="secondary">
                    Засах
                  </AdminButton>
                  <AdminButton
                    onClick={() =>
                      persistMovies(
                        adminMovies.map((item) =>
                          item.id === movie.id
                            ? { ...item, isFeatured: !item.isFeatured }
                            : item,
                        ),
                      )
                    }
                    variant="secondary"
                  >
                    {movie.isFeatured ? "Онцлохгүй" : "Онцлох"}
                  </AdminButton>
                  <AdminButton
                    onClick={() => deleteMovie(movie.id)}
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

      {filteredMovies.length === 0 && (
        <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-8 text-center text-sm text-zinc-400">
          Кино олдсонгүй.
        </div>
      )}

      <div className="flex justify-end gap-2">
        <AdminButton variant="secondary">Өмнөх</AdminButton>
        <AdminButton variant="secondary">Дараах</AdminButton>
      </div>
    </div>
  );
}
