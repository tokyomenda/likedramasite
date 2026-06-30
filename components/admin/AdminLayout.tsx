"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { AdminTopbar } from "@/components/admin/AdminTopbar";

const ADMIN_SESSION_KEY = "likedrama-admin-session";

const titles: Record<string, string> = {
  "/admin": "Хянах самбар",
  "/admin/movies": "Кинонууд",
  "/admin/movies/new": "Кино нэмэх",
  "/admin/episodes": "Ангиуд",
  "/admin/banners": "Баннер",
  "/admin/users": "Хэрэглэгчид",
  "/admin/vip": "VIP багц",
  "/admin/payments": "Төлбөрүүд",
  "/admin/settings": "Тохиргоо",
};

function isLocalDevelopmentHost() {
  return ["localhost", "127.0.0.1", "::1"].includes(window.location.hostname);
}

function hasValidAdminSession() {
  const rawSession = localStorage.getItem(ADMIN_SESSION_KEY);

  if (!rawSession) {
    return false;
  }

  try {
    const session = JSON.parse(rawSession) as {
      email?: string;
      role?: string;
      isMockAdmin?: boolean;
    };

    const isDemoAdmin =
      session.email === "admin@likedrama.mn" && session.role === "admin";
    const isDevelopmentMockAdmin =
      session.isMockAdmin === true &&
      session.role === "admin" &&
      isLocalDevelopmentHost();

    return isDemoAdmin || isDevelopmentMockAdmin;
  } catch {
    return false;
  }
}

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (isLoginPage) {
        setIsReady(true);
        return;
      }

      if (!hasValidAdminSession()) {
        router.replace("/admin/login");
        return;
      }

      setIsReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [isLoginPage, router]);

  const logout = () => {
    localStorage.removeItem(ADMIN_SESSION_KEY);
    router.replace("/admin/login");
  };

  if (isLoginPage) {
    return children;
  }

  if (!isReady) {
    return (
      <div className="grid min-h-screen place-items-center bg-black text-white">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/15 border-t-orange-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={logout}
      />
      <div className="lg:pl-72">
        <AdminTopbar
          onMenuClick={() => setIsSidebarOpen(true)}
          title={titles[pathname] ?? "Админ"}
        />
        <main className="px-4 py-8 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  );
}
