"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { AdminButton } from "@/components/admin/AdminButton";
import { AdminInput } from "@/components/admin/AdminInput";

const ADMIN_SESSION_KEY = "likedrama-admin-session";

function isLocalDevelopmentHost() {
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [canUseMockAdmin, setCanUseMockAdmin] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setCanUseMockAdmin(isLocalDevelopmentHost());
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const enterAdminMode = (isMockAdmin = false) => {
    localStorage.setItem(
      ADMIN_SESSION_KEY,
      JSON.stringify({
        email: "admin@likedrama.mn",
        role: "admin",
        isMockAdmin,
        loggedAt: new Date().toISOString(),
      }),
    );
    router.replace("/admin");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email.trim()) {
      setError("Админ имэйл оруулна уу.");
      return;
    }

    if (!password) {
      setError("Нууц үгээ оруулна уу.");
      return;
    }

    setIsLoading(true);
    await new Promise((resolve) => window.setTimeout(resolve, 600));

    if (
      email.trim().toLowerCase() !== "admin@likedrama.mn" ||
      password !== "admin123"
    ) {
      setError("Админ эрхийн мэдээлэл буруу байна.");
      setIsLoading(false);
      return;
    }

    enterAdminMode(false);
  };

  const handleMockAdmin = () => {
    if (!canUseMockAdmin) {
      setError("Mock админ горим зөвхөн local development орчинд ажиллана.");
      return;
    }

    enterAdminMode(true);
  };

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(249,115,22,0.24),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.1),#000)]" />
      <div className="relative mx-auto flex min-h-screen max-w-5xl items-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid w-full gap-8 lg:grid-cols-[1fr_430px] lg:items-center">
          <section>
            <Link className="text-3xl font-black tracking-wide" href="/">
              Like<span className="text-orange-400">Drama</span>
            </Link>
            <h1 className="mt-10 max-w-2xl text-5xl font-black leading-tight sm:text-6xl">
              Админ удирдлагын самбар.
            </h1>
            <p className="mt-5 max-w-xl leading-8 text-zinc-400">
              Кино, анги, хэрэглэгч, VIP багц болон төлбөрийн mock мэдээллийг
              нэг дороос удирдах туршилтын хэсэг.
            </p>
            <div className="mt-8 rounded-3xl border border-white/10 bg-white/[0.04] p-5">
              <p className="text-sm font-bold text-orange-300">Demo админ</p>
              <p className="mt-2 text-sm text-zinc-300">
                admin@likedrama.mn / admin123
              </p>
              <p className="mt-3 text-xs leading-6 text-zinc-500">
                Түр хөгжүүлэлтийн үед localStorage дээр mock админ горим хадгалж
                админ хуудсуудыг шалгана.
              </p>
            </div>
          </section>

          <section className="rounded-[2rem] border border-white/10 bg-zinc-950/90 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.6)] backdrop-blur sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
              Админ нэвтрэх
            </p>
            <h2 className="mt-3 text-3xl font-black">Эрхээр нэвтрэх</h2>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
              <AdminInput
                label="Имэйл"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="admin@likedrama.mn"
                type="email"
                value={email}
              />
              <AdminInput
                label="Нууц үг"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Нууц үг"
                type="password"
                value={password}
              />

              {error && (
                <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                  {error}
                </p>
              )}

              <AdminButton className="w-full py-3" disabled={isLoading} type="submit">
                {isLoading ? "Шалгаж байна..." : "Админ нэвтрэх"}
              </AdminButton>
            </form>

            {canUseMockAdmin && (
              <button
                className="mt-4 w-full rounded-2xl border border-orange-400/40 bg-orange-500/10 px-4 py-3 text-sm font-bold text-orange-100 transition hover:bg-orange-500/20"
                onClick={handleMockAdmin}
                type="button"
              >
                Хөгжүүлэлтийн mock админ горим
              </button>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
