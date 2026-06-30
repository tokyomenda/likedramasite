"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Имэйл хаягаа оруулна уу.");
      return;
    }

    if (!password) {
      setError("Нууц үгээ оруулна уу.");
      return;
    }

    setIsLoading(true);

    try {
      await login(email, password, remember);
      router.push("/");
    } catch (loginError) {
      setError(
        loginError instanceof Error
          ? loginError.message
          : "Нэвтрэх үед алдаа гарлаа.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.22),transparent_32%),linear-gradient(180deg,rgba(0,0,0,0.1),#000)]" />
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_460px] lg:items-center">
          <section>
            <Link
              className="text-3xl font-black tracking-wide text-white"
              href="/"
            >
              Like<span className="text-orange-400">Drama</span>
            </Link>
            <h1 className="mt-10 max-w-2xl text-5xl font-black leading-tight sm:text-6xl">
              Дуртай кино, драмагаа үргэлжлүүлэн үзээрэй.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-8 text-zinc-400">
              Нэвтэрснээр үзсэн байрлал, дуртай кино, VIP эрхийн мэдээллээ нэг
              дороос удирдах боломжтой.
            </p>

            <div className="mt-8 grid max-w-xl gap-3 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-bold text-orange-300">
                Туршилтын эрхүүд
              </p>
              <p className="text-sm text-zinc-300">
                demo@likedrama.mn / password123
              </p>
              <p className="text-sm text-zinc-300">
                admin@likedrama.mn / admin123
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-zinc-950/88 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.55)] backdrop-blur sm:p-8">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
                Нэвтрэх
              </p>
              <h2 className="mt-3 text-3xl font-black">Бүртгэлдээ нэвтрэх</h2>
            </div>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
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

              <label className="flex items-center gap-3 text-sm font-semibold text-zinc-300">
                <input
                  checked={remember}
                  className="h-4 w-4 accent-orange-500"
                  onChange={(event) => setRemember(event.target.checked)}
                  type="checkbox"
                />
                Намайг сана
              </label>

              {error && (
                <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-200">
                  {error}
                </p>
              )}

              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </Button>
            </form>

            <p className="mt-6 text-center text-sm text-zinc-400">
              Бүртгэлгүй юу?{" "}
              <Link className="font-bold text-orange-300" href="/register">
                Шинээр бүртгүүлэх
              </Link>
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}
