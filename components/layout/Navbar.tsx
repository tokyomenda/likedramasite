"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";
import { MobileDrawer } from "@/components/layout/MobileDrawer";
import { SearchOverlay } from "@/components/layout/SearchOverlay";

const navLinks = ["Нүүр", "Кино", "Ангилал", "VIP", "Миний кинонууд"];

export function Navbar() {
  const { user, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 z-40 w-full transition duration-500 ${
          isScrolled
            ? "border-b border-white/10 bg-black/78 shadow-2xl shadow-black/35 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            className="text-2xl font-black tracking-wide text-white transition hover:text-orange-100"
            href="/"
            aria-label="LikeDrama нүүр"
          >
            Like<span className="text-orange-400">Drama</span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link, index) => (
              <a
                className={`group relative py-2 text-sm font-semibold transition hover:text-white ${
                  index === 0 ? "text-white" : "text-zinc-300"
                }`}
                href="#"
                key={link}
              >
                {link}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 rounded-full bg-orange-400 transition-all duration-300 ${
                    index === 0 ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <button
              aria-label="Хайх"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-zinc-200 transition hover:border-orange-400/60 hover:bg-orange-500/10 hover:text-white"
              onClick={() => setIsSearchOpen(true)}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
            {user ? (
              <div className="flex items-center gap-2">
                <div className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-bold text-white">
                  {user.name}
                </div>
                <button
                  className="rounded-full border border-orange-400/45 px-4 py-2 text-sm font-bold text-orange-100 transition hover:bg-orange-500/15"
                  onClick={logout}
                  type="button"
                >
                  Гарах
                </button>
              </div>
            ) : (
              <Link
                className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-[0_16px_45px_rgba(249,115,22,0.35)] transition duration-300 hover:bg-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-offset-2 focus:ring-offset-black"
                href="/login"
              >
                Нэвтрэх
              </Link>
            )}
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              aria-label="Хайх"
              className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition hover:bg-white/10"
              onClick={() => setIsSearchOpen(true)}
              type="button"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          <button
            aria-label="Цэс нээх"
            className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-white transition hover:bg-white/10 lg:hidden"
            onClick={() => setIsDrawerOpen(true)}
            type="button"
          >
            <span className="flex flex-col gap-1.5">
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
              <span className="block h-0.5 w-5 rounded-full bg-current" />
            </span>
          </button>
          </div>
        </div>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        links={navLinks}
        onLogout={logout}
        onClose={() => setIsDrawerOpen(false)}
        userName={user?.name}
      />
      <SearchOverlay
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </>
  );
}
