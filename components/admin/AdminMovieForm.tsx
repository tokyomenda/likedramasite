"use client";

/* eslint-disable @next/next/no-img-element */
import {
  ChangeEvent,
  DragEvent,
  FormEvent,
  useRef,
  useState,
} from "react";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";
import { AdminSelect } from "@/components/admin/AdminSelect";
import type { AdminMovieFormValues } from "@/lib/adminMovies";

type AdminMovieFormProps = {
  values: AdminMovieFormValues;
  onChange: (values: AdminMovieFormValues) => void;
  onSubmit: () => void;
  submitLabel: string;
  onCancel?: () => void;
};

type ImageUploadFieldProps = {
  title: string;
  helperText: string;
  imageValue: string;
  urlValue: string;
  onImageChange: (value: string) => void;
  onUrlChange: (value: string) => void;
  previewClassName: string;
};

const genreOptions = [
  "Романс",
  "Драма",
  "Инээдэм",
  "Адал явдал",
  "Гэмт хэрэг",
  "Түүхэн",
  "Уран зөгнөлт",
];

const allowedImageTypes = ["image/jpeg", "image/png", "image/webp"];

function updateBoolean(value: string) {
  return value === "Тийм";
}

function ImageUploadField({
  title,
  helperText,
  imageValue,
  urlValue,
  onImageChange,
  onUrlChange,
  previewClassName,
}: ImageUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const previewSource = imageValue || urlValue;

  const readImageFile = (file?: File) => {
    setError("");

    if (!file) {
      return;
    }

    if (!allowedImageTypes.includes(file.type)) {
      setError("Зөвхөн jpg, jpeg, png, webp зураг оруулна уу.");
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        onImageChange(reader.result);
      }
    };

    reader.onerror = () => {
      setError("Зургийг унших үед алдаа гарлаа.");
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    readImageFile(event.target.files?.[0]);
    event.target.value = "";
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    readImageFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="rounded-3xl border border-white/10 bg-black/25 p-4">
      <div className="flex flex-col gap-4 lg:flex-row">
        <div
          className={`relative grid min-h-48 flex-1 place-items-center overflow-hidden rounded-2xl border border-dashed p-4 text-center transition ${
            isDragging
              ? "border-orange-400 bg-orange-500/10"
              : "border-white/15 bg-white/[0.035]"
          }`}
          onDragLeave={() => setIsDragging(false)}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDrop={handleDrop}
        >
          {previewSource ? (
            <img
              alt={title}
              className={`h-full w-full rounded-xl object-cover ${previewClassName}`}
              src={previewSource}
            />
          ) : (
            <div>
              <p className="font-bold text-white">{title}</p>
              <p className="mt-2 text-sm leading-6 text-zinc-500">{helperText}</p>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col justify-between gap-4">
          <div>
            <p className="text-sm font-bold text-zinc-200">{title}</p>
            <p className="mt-1 text-xs leading-5 text-zinc-500">
              Зургаа чирж оруулах эсвэл файлаа сонгоно уу. Түр local development
              горимд base64/data URL байдлаар хадгална.
            </p>
          </div>

          <input
            accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={handleFileChange}
            ref={inputRef}
            type="file"
          />

          <div className="flex flex-wrap gap-2">
            <AdminButton
              onClick={() => inputRef.current?.click()}
              type="button"
              variant="secondary"
            >
              Зураг сонгох
            </AdminButton>
            {imageValue && (
              <AdminButton
                onClick={() => onImageChange("")}
                type="button"
                variant="danger"
              >
                Upload арилгах
              </AdminButton>
            )}
          </div>

          <AdminInput
            label="URL fallback"
            onChange={(event) => onUrlChange(event.target.value)}
            placeholder="https://..."
            value={urlValue}
          />

          {error && (
            <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export function AdminMovieForm({
  values,
  onChange,
  onSubmit,
  submitLabel,
  onCancel,
}: AdminMovieFormProps) {
  const setField = (
    field: keyof AdminMovieFormValues,
    value: string | boolean,
  ) => {
    onChange({ ...values, [field]: value });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit();
  };

  return (
    <form
      className="rounded-3xl border border-white/10 bg-white/[0.035] p-5"
      onSubmit={handleSubmit}
    >
      <div className="grid gap-4 md:grid-cols-2">
        <AdminInput
          label="Гарчиг"
          onChange={(event) => setField("title", event.target.value)}
          placeholder="Киноны нэр"
          required
          value={values.title}
        />
        <AdminInput
          label="Улс"
          onChange={(event) => setField("country", event.target.value)}
          placeholder="Солонгос"
          required
          value={values.country}
        />
        <AdminSelect
          label="Төрөл"
          onChange={(event) => setField("genre", event.target.value)}
          options={genreOptions}
          value={values.genre || genreOptions[0]}
        />
        <AdminInput
          label="Он"
          min="1900"
          onChange={(event) => setField("year", event.target.value)}
          required
          type="number"
          value={values.year}
        />
        <AdminInput
          label="Үнэлгээ"
          max="10"
          min="0"
          onChange={(event) => setField("rating", event.target.value)}
          required
          step="0.1"
          type="number"
          value={values.rating}
        />
        <AdminInput
          label="Анги"
          min="1"
          onChange={(event) => setField("episodes", event.target.value)}
          required
          type="number"
          value={values.episodes}
        />
        <AdminSelect
          label="VIP эсэх"
          onChange={(event) => setField("isVip", updateBoolean(event.target.value))}
          options={["Үгүй", "Тийм"]}
          value={values.isVip ? "Тийм" : "Үгүй"}
        />
        <AdminSelect
          label="Онцлох эсэх"
          onChange={(event) =>
            setField("isFeatured", updateBoolean(event.target.value))
          }
          options={["Үгүй", "Тийм"]}
          value={values.isFeatured ? "Тийм" : "Үгүй"}
        />
        <AdminSelect
          label="HD эсэх"
          onChange={(event) => setField("isHd", updateBoolean(event.target.value))}
          options={["Тийм", "Үгүй"]}
          value={values.isHd ? "Тийм" : "Үгүй"}
        />
      </div>

      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <ImageUploadField
          helperText="Постер зураг энд харагдана."
          imageValue={values.posterImage}
          onImageChange={(value) => setField("posterImage", value)}
          onUrlChange={(value) => setField("posterUrl", value)}
          previewClassName="aspect-[2/3]"
          title="Постер зураг"
          urlValue={values.posterUrl}
        />
        <ImageUploadField
          helperText="Backdrop зураг энд харагдана."
          imageValue={values.backdropImage}
          onImageChange={(value) => setField("backdropImage", value)}
          onUrlChange={(value) => setField("bannerUrl", value)}
          previewClassName="aspect-video"
          title="Backdrop зураг"
          urlValue={values.bannerUrl}
        />
      </div>

      <label className="mt-4 block">
        <span className="mb-2 block text-sm font-semibold text-zinc-300">
          Тайлбар
        </span>
        <textarea
          className="min-h-32 w-full rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400"
          onChange={(event) => setField("description", event.target.value)}
          placeholder="Киноны товч тайлбар"
          required
          value={values.description}
        />
      </label>

      <div className="mt-5 flex flex-wrap gap-3">
        <AdminButton type="submit">{submitLabel}</AdminButton>
        {onCancel && (
          <AdminButton onClick={onCancel} type="button" variant="secondary">
            Болих
          </AdminButton>
        )}
      </div>
    </form>
  );
}
