"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { FormEvent, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { Button } from "@/components/ui/Button";

type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
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
      onClose();
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
    <AnimatePresence>
      {isOpen && (
        <motion.div
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-[70] grid place-items-center bg-black/82 px-4 text-white backdrop-blur-xl"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
        >
          <button
            aria-label="Нэвтрэх цонх хаах"
            className="absolute inset-0"
            onClick={onClose}
            type="button"
          />
          <motion.section
            animate={{ y: 0, opacity: 1 }}
            className="relative w-full max-w-md rounded-[2rem] border border-white/10 bg-zinc-950 p-6 shadow-[0_30px_90px_rgba(0,0,0,0.6)]"
            exit={{ y: 20, opacity: 0 }}
            initial={{ y: 20, opacity: 0 }}
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.24em] text-orange-300">
                  Нэвтрэх
                </p>
                <h2 className="mt-2 text-3xl font-black">Бүртгэлдээ нэвтрэх</h2>
              </div>
              <button
                aria-label="Хаах"
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-2xl transition hover:bg-white/10"
                onClick={onClose}
                type="button"
              >
                ×
              </button>
            </div>

            <form className="mt-7 space-y-4" onSubmit={handleSubmit}>
              <input
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400"
                onChange={(event) => setEmail(event.target.value)}
                placeholder="Имэйл хаяг"
                type="email"
                value={email}
              />
              <input
                className="h-12 w-full rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-400"
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Нууц үг"
                type="password"
                value={password}
              />
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
                <p className="rounded-2xl border border-red-400/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
                  {error}
                </p>
              )}

              <Button className="w-full" disabled={isLoading} type="submit">
                {isLoading ? "Нэвтэрч байна..." : "Нэвтрэх"}
              </Button>
            </form>

            <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm text-zinc-300">
              <p className="font-bold text-orange-300">Demo эрх</p>
              <p className="mt-2">demo@likedrama.mn / password123</p>
              <p>admin@likedrama.mn / admin123</p>
            </div>

            <p className="mt-5 text-center text-sm text-zinc-400">
              Бүртгэлгүй юу?{" "}
              <Link className="font-bold text-orange-300" href="/register">
                Бүртгүүлэх
              </Link>
            </p>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
