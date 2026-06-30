"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AdminMovieForm } from "@/components/admin/AdminMovieForm";
import {
  emptyAdminMovieForm,
  formValuesToMovie,
  loadAdminMovies,
  saveAdminMovies,
} from "@/lib/adminMovies";

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

export default function AdminNewMoviePage() {
  const router = useRouter();
  const [values, setValues] = useState(emptyAdminMovieForm);
  const [error, setError] = useState("");

  const saveMovie = () => {
    setError("");

    if (!hasRequiredImages(values)) {
      setError("Постер болон backdrop зураг эсвэл URL оруулна уу.");
      return;
    }

    const nextMovie = formValuesToMovie(values);
    const currentMovies = loadAdminMovies();
    const hasSameId = currentMovies.some((movie) => movie.id === nextMovie.id);

    if (hasSameId) {
      setError("Ижил нэртэй кино байна. Өөр гарчиг оруулна уу.");
      return;
    }

    saveAdminMovies([nextMovie, ...currentMovies]);
    router.push("/admin/movies");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange-300">
            Шинэ кино
          </p>
          <h1 className="mt-2 text-3xl font-black">Кино нэмэх</h1>
        </div>
        <Link
          className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-zinc-100 transition hover:border-orange-400/50 hover:text-white"
          href="/admin/movies"
        >
          Жагсаалт руу буцах
        </Link>
      </div>

      {error && (
        <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
          {error}
        </p>
      )}

      <AdminMovieForm
        onCancel={() => router.push("/admin/movies")}
        onChange={setValues}
        onSubmit={saveMovie}
        submitLabel="Кино хадгалах"
        values={values}
      />
    </div>
  );
}
