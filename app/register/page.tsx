"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (name.trim().length < 2) {
      setError("Нэрээ хамгийн багадаа 2 тэмдэгтээр оруулна уу.");
      return;
    }

    if (!email.includes("@")) {
      setError("Зөв имэйл хаяг оруулна уу.");
      return;
    }

    if (password.length < 6) {
      setError("Нууц үг хамгийн багадаа 6 тэмдэгт байх ёстой.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Нууц үг давхцахгүй байна.");
      return;
    }

    setIsLoading(true);

    try {
      await register({ name, email, password });
      router.push("/");
    } catch (registerError) {
      setError(
        registerError instanceof Error
          ? registerError.message
          : "Бүртгүүлэх үед алдаа гарлаа.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.22),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.1),#000)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_480px] lg:items-center">
          <section>
            <Link
              className="text-3xl font-black tracking-wide text-white"
              href="/"
            >
              Like<span className="text-orange-400">Drama</span>
            </Link>
            <h1 className="mt-10 max-w-2xl text-5xl font-black leading-tight sm:text-6xl">
              LikeDrama-д тавтай морил.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400">
              Үнэгүй болон VIP кинонуудыг нэг дороос үзэх mock бүртгэлээ үүсгээд
              шууд эхлүүлээрэй.
            </p>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-zinc-950/88 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
                Бүртгүүлэх
              </p>
              <h2 className="mt-3 text-3xl font-black">Шинэ бүртгэл үүсгэх</h2>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">Нэр</span>
                <input
                  className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400"
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Таны нэр"
                  type="text"
                  value={name}
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">Имэйл</span>
                <input
                  className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400"
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Имэйл хаяг"
                  type="email"
                  value={email}
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  Нууц үг
                </span>
                <input
                  className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400"
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Нууц үг"
                  type="password"
                  value={password}
                />
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-zinc-300">
                  Нууц үг давтах
                </span>
                <input
                  className="mt-2 h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400"
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Нууц үгээ дахин оруулна уу"
                  type="password"
                  value={confirmPassword}
                />
              </label>

              {error && (
                <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                  {error}
                </p>
              )}

              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? "Бүртгэж байна..." : "Бүртгүүлэх"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Бүртгэлтэй юу?{" "}
              <Link className="font-bold text-orange-300" href="/login">
                Нэвтрэх
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
